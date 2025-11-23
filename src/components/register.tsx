import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, useLocation, NavLink, Link } from 'react-router-dom';
import { useModal } from '../context/context';
import regions from '../locate/regions.json';
import districts from '../locate/districts.json';
import { GiftsList } from './GiftList';
// import { CountdownTimer } from './ui/CountdownTimer';
import { SuspendedGiftBox } from './GiftReveal';
import { PrizesSection } from './t';
import pdf from "../assets/pdf.pdf"
type Params = { id?: string };


import { motion } from 'framer-motion';
import Karobka from './Karobka';

interface CountdownTimerProps {
    targetDate: string;
}

function CountdownTimer({ targetDate }: CountdownTimerProps) {
    const calculateTimeLeft = () => {
        const difference = new Date(targetDate).getTime() - new Date().getTime();
        let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    const timeItems = [
        { label: 'Kun', value: timeLeft.days },
        { label: 'Soat', value: timeLeft.hours },
        { label: 'Daqiqa', value: timeLeft.minutes },
        { label: 'Soniya', value: timeLeft.seconds },
    ];

    return (
        <div className="flex justify-center gap-3">
            {timeItems.map((item) => (
                <motion.div
                    key={item.label}
                    className="bg-purple-900/40 border border-purple-500/50 rounded-xl p-3 flex flex-col items-center w-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-white font-bold text-lg">
                        {item.value.toString().padStart(2, '0')}
                    </span>
                    <span className="text-xs text-purple-300 mt-1">{item.label}</span>
                </motion.div>
            ))}
        </div>
    );
}




















type BlockType = {
    id: number | string;
    title: string;
    desc?: string;
    image?: string;
    size?: 'small' | 'large';
    link?: string;
    gifts?: string[];
};

type PersonPayload = {
    first_name: string;
    last_name?: string;
    middle_name?: string;
    phone_number: string;
    birth_date?: string;
    email: string;
    study_place?: string;
    region?: string;
    district?: string;
    about?: string;
    gender?: string;
    telegram_username?: string;
};

type RegisterPayload = PersonPayload & {
    direction: string;
    eventKey?: string;
    friend_data?: PersonPayload | null;
};

const DIRECTION_ALIASES: Record<string, string> = {
    rfutbol: 'rfutbol',
    rsumo: 'rsumo',
    fixtirolar: 'fixtirolar',
    ixtirolar: 'ixtirolar',
    contest: 'contest',
    ai: 'ai',
};

const SEATS_DEFAULT: Record<string, number> = {
    ai: 60,
    robosumo: 30,
    contest: 40,
    robofutbol: 24,
    ixtirolar: 20,
};
const TEAM_DIRECTIONS = ["rfutbol"];


export default function Register(): JSX.Element {
    const { setShowSubscribe } = useModal();
    const [agree, setAgree] = useState(false);
    const { id } = useParams<Params>();
    const location = useLocation();
    const navigate = useNavigate();
    const { blocks = [] as BlockType[] } = useModal();

    const detected = (id || location.pathname.split("/").pop() || "ai")
        .toString()
        .toLowerCase();
    const eventKey = DIRECTION_ALIASES[detected] ?? detected;
    const needsPartner = TEAM_DIRECTIONS.includes(eventKey);
    const block: BlockType | undefined =
        blocks.find(
            (b) =>
                String(b.id) === eventKey ||
                b.link === `/register/${eventKey}` ||
                (b.link && b.link.endsWith(eventKey))
        ) ?? blocks[0];

    const eventTitle = block?.title ?? 'Ro‘yxat';
    const eventDesc = block?.desc ?? '';
    const eventImage = block?.image ?? '';
    const eventGifts = block?.gifts ?? [];

    const seatsTotal = SEATS_DEFAULT[eventKey] ?? 50;
    const [seatsLeft, setSeatsLeft] = useState<number>(seatsTotal);

    const firstNameRef = useRef<HTMLInputElement | null>(null);






    // Main person form
    const [form, setForm] = useState<RegisterPayload>({
        first_name: '',
        last_name: '',
        middle_name: '',
        phone_number: '',
        birth_date: '',
        email: '',
        study_place: '',
        region: '',
        district: '',
        about: '',
        gender: '',
        telegram_username: '',
        direction: eventKey,
        eventKey,
        friend_data: null,
    });

    // Friend form (only for robofutbol)
    const [friendForm, setFriendForm] = useState<PersonPayload>({
        first_name: '',
        last_name: '',
        middle_name: '',
        phone_number: '',
        birth_date: '',
        email: '',
        study_place: '',
        region: '',
        district: '',
        about: '',
        gender: '',
        telegram_username: '',
    });

    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // subscription modal state & pending payload
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
    const [pendingPayload, setPendingPayload] = useState<any>(null);

    useEffect(() => {
        firstNameRef.current?.focus();
    }, []);

    function setField<K extends keyof RegisterPayload>(key: K, value: RegisterPayload[K]) {
        setForm((s) => ({ ...s, [key]: value }));
    }
    function setFriendField<K extends keyof PersonPayload>(key: K, value: PersonPayload[K]) {
        setFriendForm((s) => ({ ...s, [key]: value }));
    }

    function validate(): string | null {
        if (!form.first_name?.trim()) return "Ism kiritilsin.";
        if (!form.last_name?.trim()) return "Familiya kiritilsin.";
        if (!form.middle_name?.trim()) return "Otasining ismi kiritilsin.";
        if (!form.gender) return "Jins tanlang.";
        if (!form.phone_number?.trim()) return "Telefon raqam kiritilsin.";
        if (!form.birth_date) return "Tug‘ilgan sana kiritilsin.";
        if (!form.study_place?.trim()) return "O‘qish joyi kiritilsin.";
        if (!form.region?.trim()) return "Hudud kiritilsin.";
        if (!form.district?.trim()) return "Tuman kiritilsin.";
        if (!form.about?.trim()) return "Qisqacha ma'lumot kiritilsin.";
        if (eventKey === "rfutbol") {
            if (!friendForm.first_name?.trim()) return "Do‘stingizning ismi kiritilsin.";
            if (!friendForm.last_name?.trim()) return "Do‘stingizning familiyasi kiritilsin.";
            if (!friendForm.middle_name?.trim()) return "Do‘stingizning otasining ismi kiritilsin.";
            if (!friendForm.gender) return "Do‘stingizning jinsini tanlang.";
            if (!friendForm.phone_number?.trim()) return "Do‘stingizning telefon raqami kiritilsin.";
            if (!friendForm.birth_date) return "Do‘stingizning tug‘ilgan sanasi kiritilsin.";
            if (!friendForm.study_place?.trim()) return "Do‘stingizning o‘qish joyi kiritilsin.";
            if (!friendForm.region?.trim()) return "Do‘stingizning hududi kiritilsin.";
            if (!friendForm.district?.trim()) return "Do‘stingizning tumani kiritilsin.";
            if (!friendForm.about?.trim()) return "Do‘stingiz haqida qisqacha ma'lumot kiritilsin.";
        }
        return null;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        const v = validate();
        if (v) {
            setError(v);
            return;
        }
        if (seatsLeft <= 0) {
            setError("Kechirasiz, bu yo‘nalishda joylar tugagan.");
            return;
        }

        let payload: any = { ...form, direction: eventKey };
        if (eventKey === "rfutbol") {
            payload.friend_data = { ...friendForm };
        }


        // Remove empty strings
        Object.keys(payload).forEach((k) => {
            if (payload[k] === "") payload[k] = null;
        });
        if (payload.friend) {
            Object.keys(payload.friend).forEach((k) => {
                if (payload.friend[k] === "") payload.friend[k] = null;
            });
        }

        console.log("to'g'ridan-to'g'ri yuborish", payload);
        // to'g'ridan-to'g'ri yuborish
        await sendRegistration(payload);
    }


    async function sendRegistration(payload: any) {
        if (!payload) return;
        setShowSubscriptionModal(false);
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('https://aiday.infinite-co.uz/register/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const text = await res.text().catch(() => '');
            let data: any = null;
            try { data = text ? JSON.parse(text) : null; } catch { data = text; }

            if (!res.ok) {
                const serverMsg =
                    (data && (data.detail || data.message || data.errors)) ||
                    (typeof data === 'string' ? data : `Server xatosi: ${res.status}`);
                const errStr = typeof serverMsg === 'object' ? JSON.stringify(serverMsg) : String(serverMsg);
                setError(errStr);
                return;
            }

            setSeatsLeft((s) => Math.max(0, s - 1));
            setDone(true);
            const successMsg = (data && (data.message || data.detail)) || 'Ro‘yxatdan muvaffaqiyatli o‘tdingiz!';
            setSuccessMessage(successMsg);
        } catch (err) {
            setError((err as Error).message || 'Yuborishda xatolik yuz berdi.');
        } finally {
            setLoading(false);
            setPendingPayload(null);
        }
    }
    function ormatDate(dateString: string) {
        const date = new Date(dateString);
        const days = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
        const dayName = days[date.getDay()];
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${dayName}, ${day}-${month}-${year}`;
    }


    return (
        <div className="min-h-screen text-white py-10 p-[20px] px-4 flex flex-col items-center justify-center" style={{ zIndex: 50 }}>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 z-10 w-full">
                <aside className="lg:col-span-1 rounded-l-2xl overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg flex flex-col">
                    <div className="w-full flex-1 min-h-0 bg-gray-700">
                        {eventImage ? (
                            <img src={eventImage} alt={eventTitle} className="w-full h-full object-cover block" />
                        ) : (
                            <div className="w-full h-48 flex items-center justify-center text-gray-500">
                                Rasm mavjud emas
                            </div>
                        )}
                    </div>

                    <div className="p-6 bg-gradient-to-br from-purple-950/60 via-black/60 to-blue-950/60 rounded-2xl shadow-xl backdrop-blur-md border border-white/10 flex flex-col gap-4">

                        {/* Countdown */}

                        {/* Event Title */}
                        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-300 to-blue-300 text-gray-100 bg-clip-text">
                            {eventTitle}
                        </h1>

                        {/* Event Description */}
                        <p className="text-gray-300 mb-4 text-sm leading-relaxed">{eventDesc}</p>

                        {/* Gift message */}
                        <CountdownTimer targetDate={block.date} />

                        <div className="mt-2 px-4 py-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white text-sm font-medium rounded-xl shadow-md text-center">
                            {ormatDate(block.date)}
                        </div>


                        <button onClick={() => navigate('/')} className='mt-2 w-full py-3 rounded-xl px-6 text-white font-semibold transition bg-purple-600 hover:bg-purple-500'><i className="fa-solid fa-arrow-left"></i> Asosiy menyuga o'tish</button>
                    </div>
                </aside>

                <main className="lg:col-span-2 bg-gray-900 rounded-2xl p-6 shadow-2xl z-20">
                    {done ? (
                        <div style={{ border: 0 }} className="text-center space-y-6 rounded-2xl p-8 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 animate-fadeIn">
                            {/* Animated check mark */}
                            <div className="flex justify-center border-lg border-0 rounded-full w-24 h-24 mx-auto bg-gradient-to-tr from-green-500 to-green-400 shadow-lg items-center">
                                <svg className="w-20 h-20 text-green-400 animate-bounce border-2 rounded-full" style={{ borderBlockColor: 'green', border: '2px solid' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            {/* Motivational heading */}
                            <h2 className="text-4xl md:text-5xl text-white-100 font-extrabold text-white tracking-wide drop-shadow-lg animate-pulse">
                                Tabriklaymiz! Siz muvaffaqiyatli ro‘yxatdan o‘tdingiz.
                            </h2>

                            {/* Success message */}
                            <p className="text-gray-400 text-sm md:text-xl max-w-2xl mx-auto">
                                {successMessage || 'Siz muvaffaqiyatli ro‘yxatdan o‘tdingiz!'}
                                Yangilik va e’lonlarni ijtimoiy tarmoqlardagi sahifalarimiz orqali kuzatib boring. 🎉
                            </p>

                            {/* Motivational quote */}
                            {/* <p className="text-yellow-300 font-semibold italic text-md md:text-lg">
                                "Harakat qilgan kishi, orzusiga yaqinlashadi!" ✨
                            </p> */}

                            {/* Social links with icons */}
                            <div className="flex justify-center gap-6 mt-4">
                                <a
                                    href="https://t.me/digitalgeneration_uz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 shadow-lg transition transform hover:scale-105 text-white font-semibold"
                                >
                                    <i className="fab fa-telegram-plane text-2xl"></i>
                                    Telegram
                                </a>

                                <a
                                    href="https://www.instagram.com/dguzbekistan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-6 py-3 rounded-xl bg-pink-500 hover:bg-pink-400 shadow-lg transition transform hover:scale-105 text-white font-semibold"
                                >
                                    <i className="fab fa-instagram text-2xl"></i>
                                    Instagram
                                </a>
                            </div>

                            {/* Return button with icon */}
                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={() => navigate('/')}
                                    className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 shadow-2xl text-white font-bold text-lg transform hover:scale-105 transition"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3l9 9-9 9" />
                                    </svg>
                                    Bosh sahifaga
                                </button>
                            </div>

                            {/* Confetti animation */}
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="w-full h-full animate-confetti"></div>
                            </div>
                        </div>

                    ) : (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 id="register-heading" className="text-xl font-semibold">
                                    {eventTitle} — Ro‘yxatdan o‘tish
                                </h2>
                                <a href={pdf} download className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                                    <button className='mt-2 w-full py-3 rounded-xl px-6 text-white font-semibold transition bg-purple-600 hover:bg-purple-500'>
                                        Nizomni yuklab olish <i className='fa-solid fa-download'></i>
                                    </button>
                                </a>
                            </div>
                            {
                                block.link === "/register/contest" ? (
                                    <div className="lg:col-span-2 bg-gray-900 rounded-2xl p-4 sm:p-6 md:p-8">
                                        <form id="form" className="space-y-4">
                                            <div className="text-center topp space-y-6">
                                                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl p-4 sm:p-6 md:p-8 border border-purple-500/30">
                                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">Contest Yo'nalishi</h3>
                                                    <p className="text-gray-300 mb-6 text-sm sm:text-base md:text-lg">
                                                        Quyidagi ijtimoiy tarmoq sahifalarimizga obuna bo'ling va <br />
                                                        keyingi qadamlar haqida xabardor bo'ling.
                                                    </p>
                                                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                                                        <a
                                                            href="https://t.me/digitalgeneration_uz"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition text-white font-semibold flex items-center justify-center gap-2"
                                                        >
                                                            <i className="fab fa-telegram-plane"></i> Telegram
                                                        </a>
                                                        <a
                                                            href="https://www.instagram.com/dguzbekistan"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="px-6 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 transition text-white font-semibold flex items-center justify-center gap-2"
                                                        >
                                                            <i className="fab fa-instagram"></i> Instagram
                                                        </a>
                                                    </div>
                                                </div>

                                                {/* Checkbox */}
                                                <div className="box2">
                                                    <label className="flex items-center justify-center gap-2 cursor-pointer">
                                                        <input
                                                            className="boxx"
                                                            type="checkbox"
                                                            checked={agree}
                                                            onChange={(e) => setAgree(e.target.checked)}
                                                        />{" "}
                                                        Shartlarni to'liq bajardingizmi?
                                                    </label>
                                                </div>

                                                {/* Buttons */}
                                                <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
                                                    <a
                                                        href={agree ? "https://online.raqamliavlod.uz/" : "#"}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`flex-1 px-4 py-3 rounded-xl text-center hover:bg-purple-500 transition font-semibold ${!agree ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600"}`}
                                                    >
                                                        {loading
                                                            ? "Yuborilmoqda..."
                                                            : needsPartner
                                                                ? "Jamoani ro'yxatdan o'tkazish"
                                                                : "Ro'yxatdan o'tish"}
                                                    </a>

                                                    <button
                                                        type="button"
                                                        className="px-6 py-3 rounded-xl border border-white/10 text-sm hover:bg-white/5 transition"
                                                    >
                                                        Bekor qilish
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>


                                ) : (
                                    <form id="form" onSubmit={handleSubmit} className="space-y-4" aria-labelledby="register-heading">
                                        {error && <div className="text-sm text-red-700">{error}</div>}
                                        {/* Main person fields */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <label className="block">
                                                <span className="text-sm text-gray-300">Ism</span>
                                                <input ref={firstNameRef} type="text" value={form.first_name} onChange={e => setField('first_name', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                                            </label>
                                            <label className="block">
                                                <span className="text-sm text-gray-300">Familiya</span>
                                                <input type="text" value={form.last_name} onChange={e => setField('last_name', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                                            </label>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <label className="block">
                                                <span className="text-sm text-gray-300">Otasining ismi</span>
                                                <input type="text" value={form.middle_name} onChange={e => setField('middle_name', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                                            </label>
                                            <label className="block">
                                                <span className="text-sm text-gray-300">Jins</span>
                                                <select style={{ border: '1px solid white' }} value={form.gender} onChange={e => setField('gender', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3">
                                                    <option value="" className='bg-gray-900'>Tanlang</option>
                                                    <option value="male" className='bg-gray-900'>Erkak</option>
                                                    <option value="female" className='bg-gray-900'>Ayol</option>
                                                </select>
                                            </label>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <label className="block">
                                                <span className="text-sm text-gray-300">Telefon</span>
                                                <input type="tel" value={form.phone_number} onChange={e => setField('phone_number', e.target.value)} placeholder='+998(12)-345-67-89' required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                                            </label>
                                            <label className="block">
                                                <span className="text-sm text-gray-300">Telegram username</span>
                                                <input type="text" value={form.telegram_username} placeholder='@username' onChange={e => setField('telegram_username', e.target.value)} className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                                            </label>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <label className="block">
                                                <span className="text-sm text-gray-300">Tug‘ilgan sana</span>
                                                <input type="date" value={form.birth_date} onChange={e => setField('birth_date', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                                            </label>
                                            <label className="block">
                                                <span className="text-sm text-gray-300">Ta'lim / O‘qish joyi</span>
                                                <input type="text" value={form.study_place} onChange={e => setField('study_place', e.target.value)} required placeholder='Maktab, Litsey, Universitet nomi' className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                                            </label>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-sm mb-2">Viloyat</label>
                                                <select
                                                    value={form.region}
                                                    onChange={e => {
                                                        setField('region', e.target.value);
                                                        setField('district', '');
                                                    }}
                                                    className="w-full p-3 rounded-lg font-semibold shadow focus:outline-none"
                                                    style={{
                                                        color: '#fff',
                                                        border: '1px solid white'
                                                    }}
                                                    required
                                                >
                                                    <option value="" className='bg-gray-900'>Viloyatni tanlang</option>
                                                    {regions.map(region => (
                                                        <option key={region.id} className='bg-gray-900' value={region.id}>
                                                            {region.name_uz}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm mb-2">Tuman</label>
                                                <select
                                                    value={form.district}
                                                    onChange={e => setField('district', e.target.value)}
                                                    className="w-full p-3 rounded-lg font-semibold shadow focus:outline-none"
                                                    style={{
                                                        color: '#fff',
                                                        border: '1px solid white'
                                                    }}
                                                    required
                                                    disabled={!form.region}
                                                >
                                                    <option value="" className='bg-gray-900'>Tumanni tanlang</option>
                                                    {districts
                                                        .filter(d => String(d.region_id) === String(form.region))
                                                        .map(district => (
                                                            <option key={district.id} value={district.name_uz} className='bg-gray-900'>
                                                                {district.name_uz}
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <label className="block">
                                                <span className="text-sm text-gray-300">Email</span>
                                                <input type="email" placeholder='example@gmail.com' value={form.email} onChange={e => setField('email', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                                            </label>
                                            <label className="block">
                                                <span className="text-sm text-gray-300">Yo'nalish</span>
                                                <select
                                                    value={form.direction}
                                                    onChange={e => {
                                                        setField('direction', e.target.value);
                                                        navigate(`/register/${e.target.value}`);
                                                    }}
                                                    required
                                                    className="mt-1 w-full border rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border border-purple-700 px-4 py-3 font-semibold shadow focus:outline-none"
                                                    style={{ background: 'transparent', color: 'white', border: '1px solid white' }} // Qo'shimcha inline style
                                                >
                                                    <option value="ai" className='bg-gray-900'>Sun'iy intelekt</option>
                                                    <option value="fixtirolar" className='bg-gray-900'>Foydali ixtirolar</option>
                                                    <option value="rfutbol" className='bg-gray-900'>Robo futbol</option>
                                                    <option value="rsumo" className='bg-gray-900'>Robo sumo</option>
                                                </select>
                                            </label>
                                        </div>
                                        <label className="block">
                                            <span className="text-sm text-gray-300">Qisqacha ma'lumot</span>
                                            <textarea value={form.about} onChange={e => setField('about', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" rows={3} />
                                        </label>
                                        {/* Friend form only for robofutbol */}
                                        {eventKey === "rfutbol" && (
                                            <div className="mt-8 p-4 rounded-xl border border-purple-500/30 bg-purple-900/10">
                                                <h3 className="text-lg font-bold mb-2 text-purple-300">2-ishtirokchi ma'lumotlari</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <label className="block">
                                                        <span className="text-sm text-gray-300">Ism</span>
                                                        <input type="text" value={friendForm.first_name} onChange={e => setFriendField('first_name', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                                                    </label>
                                                    <label className="block">
                                                        <span className="text-sm text-gray-300">Familiya</span>
                                                        <input type="text" value={friendForm.last_name} onChange={e => setFriendField('last_name', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                                                    </label>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <label className="block">
                                                        <span className="text-sm text-gray-300">Otasining ismi</span>
                                                        <input type="text" value={friendForm.middle_name} onChange={e => setFriendField('middle_name', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                                                    </label>
                                                    <label className="block">
                                                        <span className="text-sm text-gray-300">Jins</span>
                                                        <select value={friendForm.gender} onChange={e => setFriendField('gender', e.target.value)} required style={{ border: '1px solid white' }} className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3">
                                                            <option value="" className='bg-gray-900'>Tanlang</option>
                                                            <option value="male" className='bg-gray-900'>Erkak</option>
                                                            <option value="female" className='bg-gray-900'>Ayol</option>
                                                        </select>
                                                    </label>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <label className="block">
                                                        <span className="text-sm text-gray-300">Telefon</span>
                                                        <input type="tel" value={friendForm.phone_number} onChange={e => setFriendField('phone_number', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                                                    </label>
                                                    <label className="block">
                                                        <span className="text-sm text-gray-300">Telegram username</span>
                                                        <input type="text" value={friendForm.telegram_username} onChange={e => setFriendField('telegram_username', e.target.value)} className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                                                    </label>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <label className="block">
                                                        <span className="text-sm text-gray-300">Tug‘ilgan sana</span>
                                                        <input type="date" value={friendForm.birth_date} onChange={e => setFriendField('birth_date', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                                                    </label>
                                                    <label className="block">
                                                        <span className="text-sm text-gray-300">Ta'lim / O‘qish joyi</span>
                                                        <input type="text" value={friendForm.study_place} onChange={e => setFriendField('study_place', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                                                    </label>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="block text-sm mb-2">Viloyat</label>
                                                        <select
                                                            value={friendForm.region}
                                                            onChange={e => {
                                                                setFriendField('region', e.target.value);
                                                                setFriendField('district', '');
                                                            }}
                                                            className="w-full p-3 rounded-lg font-semibold shadow focus:outline-none"
                                                            style={{
                                                                color: '#fff',
                                                                border: '1px solid white'
                                                            }}
                                                            required
                                                        >
                                                            <option value="" className='bg-gray-900'>Viloyatni tanlang</option>
                                                            {regions.map(region => (
                                                                <option key={region.id} className='bg-gray-900' value={region.id}>
                                                                    {region.name_uz}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm mb-2">Tuman</label>
                                                        <select
                                                            value={friendForm.district}
                                                            onChange={e => setFriendField('district', e.target.value)}
                                                            className="w-full p-3 rounded-lg font-semibold shadow focus:outline-none"
                                                            style={{
                                                                color: '#fff',
                                                                border: '1px solid white'
                                                            }}
                                                            required
                                                            disabled={!friendForm.region}
                                                        >
                                                            <option value="" className='bg-gray-900'>Tumanni tanlang</option>
                                                            {districts
                                                                .filter(d => String(d.region_id) === String(friendForm.region))
                                                                .map(district => (
                                                                    <option key={district.id} value={district.name_uz} className='bg-gray-900'>
                                                                        {district.name_uz}
                                                                    </option>
                                                                ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <label className="block">
                                                    <span className="text-sm text-gray-300">Email</span>
                                                    <input type="email" value={friendForm.email} onChange={e => setFriendField('email', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                                                </label>
                                                <label className="block">
                                                    <span className="text-sm text-gray-300">Qisqacha ma'lumot</span>
                                                    <textarea value={friendForm.about} onChange={e => setFriendField('about', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" rows={3} />
                                                </label>
                                            </div>
                                        )}
                                        <h2 className="text-center">
                                            To'liq ro'yxatdan o'tish uchun <br /> bizning ijtimoiy
                                            tarmoq sahifalarimizga ham obuna bo'ling. 👇
                                        </h2>
                                        <div className="flex justify-center gap-4 mt-4">
                                            <a
                                                href="https://t.me/digitalgeneration_uz"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-5 py-3 rounded-lg bg-blue-500 hover:bg-blue-400 transition text-white font-semibold flex items-center gap-2 shadow-lg"
                                            >
                                                <i className="fab fa-telegram-plane text-lg"></i>
                                                Telegram
                                            </a>
                                            <a
                                                href="https://www.instagram.com/dguzbekistan"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-5 py-3 rounded-lg bg-pink-500 hover:bg-pink-400 transition text-white font-semibold flex items-center gap-2 shadow-lg"
                                            >
                                                <i className="fab fa-instagram text-lg"></i>Instagram
                                            </a>
                                        </div>
                                        <div>
                                            <div className="box2 text-center mt-6">
                                                <label className="flex items-center justify-center mt-8 gap-2 cursor-pointer" style={{marginTop:'20px'}}>
                                                    <input
                                                        className="boxx"
                                                        type="checkbox"
                                                        checked={agree}
                                                        onChange={(e) => setAgree(e.target.checked)}
                                                    />
                                                    Shartlarni to'liq bajardingizmi?
                                                </label>
                                            </div>
                                            <div className="flex buttonSend gap-3 mt-6">
                                                <button
                                                    type="submit"
                                                    disabled={loading || !agree}

                                                    className={`flex-1 px-4 py-3 rounded-xl  hover:bg-purple-500 disabled:opacity-60 transition font-semibold ${loading || !agree ? "btn-disabled bg-purple-400 cursor-not-allowed" : "btn-enabled bg-purple-600"
                                                        }`}
                                                >
                                                    {loading
                                                        ? "Yuborilmoqda..."
                                                        : needsPartner
                                                            ? "Jamoani ro'yxatdan o'tkazish"
                                                            : "Ro'yxatdan o'tish"}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => navigate(-1)}
                                                    className="px-4 cansell py-3 rounded-xl border border-white/10 text-sm hover:bg-white/5 transition"
                                                >
                                                    Bekor qilish
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                )

                            }
                        </div>
                    )}
                </main>
            </div>

            <div style={{ marginTop: '30px', width: '80%', marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px', zIndex: 50 }}>
                {/* <PrizesSection gifts={block.gifts}/> */}
                <Karobka f={block} />
            </div>

            {/* Gifts Section */}

        </div>
    );
}