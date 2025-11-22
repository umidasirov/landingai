import { SubscriptionModal } from './SubscribeModal';
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useModal } from '../context/context';

type Params = { id?: string };

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
    friend?: PersonPayload | null;
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

export default function Register(): JSX.Element {
    const { setShowSubscribe } = useModal();

    const { id } = useParams<Params>();
    const location = useLocation();
    const navigate = useNavigate();
    const { blocks = [] as BlockType[] } = useModal();

    const detected = (id || location.pathname.split('/').pop() || 'ai').toString().toLowerCase();
    const eventKey = DIRECTION_ALIASES[detected] ?? detected;

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
        friend: null,
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
        if (!form.email?.trim()) return "Email kiritilsin.";
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
            if (!friendForm.email?.trim()) return "Do‘stingizning emaili kiritilsin.";
            if (!friendForm.birth_date) return "Do‘stingizning tug‘ilgan sanasi kiritilsin.";
            if (!friendForm.study_place?.trim()) return "Do‘stingizning o‘qish joyi kiritilsin.";
            if (!friendForm.region?.trim()) return "Do‘stingizning hududi kiritilsin.";
            if (!friendForm.district?.trim()) return "Do‘stingizning tumani kiritilsin.";
            if (!friendForm.about?.trim()) return "Do‘stingiz haqida qisqacha ma'lumot kiritilsin.";
        }
        return null;
    }

    function handleSubmit(e: React.FormEvent) {
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

        let payload: any = {
            ...form,
            direction: eventKey,
        };
        if (eventKey === "rfutbol") {
            payload.friend = { ...friendForm };
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

        setPendingPayload(payload);
        setShowSubscriptionModal(true);
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

    return (
        <div className="min-h-screen text-white py-10 p-[20px] px-4 flex flex-col items-center justify-center">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                <aside className="lg:col-span-1 rounded-l-2xl overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg flex flex-col">
                    <div className="w-full flex-1 min-h-0 bg-gray-700">
                        {eventImage ? (
                            <img src={eventImage} alt={eventTitle} className="w-full h-full object-cover block" />
                        ) : (
                            <div className="w-full h-48 flex items-center justify-center text-gray-500">Rasm mavjud emas</div>
                        )}
                    </div>

                    <div className="p-6 bg-gradient-to-br from-purple-950/60 via-black/60 to-blue-950/60 rounded-2xl shadow-xl backdrop-blur-md border border-white/10">

                        <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-300 to-blue-300 text-gray-100 bg-clip-text">
                            {eventTitle}
                        </h1>

                        <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                            {eventDesc}
                        </p>

                        {/* Seats */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="text-sm text-gray-300">
                                ⚠ Joylar soni cheklangan!!!
                            </div>

                            <div
                                className={`px-3 py-1 rounded-full text-xs font-medium shadow-md
            ${seatsLeft > 10
                                        ? 'bg-green-900/40 text-green-300 border border-green-700/40'
                                        : seatsLeft > 0
                                            ? 'bg-yellow-900/40 text-yellow-300 border border-yellow-700/40'
                                            : 'bg-red-900/40 text-red-300 border border-red-700/40'
                                    }`}
                            >
                                {seatsLeft > 10 ? 'Mavjud' : seatsLeft > 0 ? 'So‘nggi joylar' : 'Tugagan'}
                            </div>
                        </div>

                        {/* Gifts */}
                        <div className="mb-5">
                            <div className="text-sm text-gray-200 mb-3 font-semibold">
                                🎁 Sovg‘alar
                            </div>
                        </div>

                        <div className="text-sm text-center text-yellow-300 font-semibold italic mb-4 bg-yellow-900/20 py-2 rounded-lg border border-yellow-700/30 shadow-md">
                            🎉 Ro‘yxatdan o‘tganlar orasidan <span className="text-yellow-200 underline">sovg‘alardan birini</span> yutib olishingiz mumkin!
                        </div>

                    </div>

                </aside>

                <main className="lg:col-span-2 bg-gray-900 rounded-2xl p-6 shadow-2xl z-50">
                    {done ? (
                        <div className="text-center space-y-6 rounded-r-lg ">
                            <div className="flex justify-center rounded-r-lg ">
                                <svg className="w-16 h-16 text-green-400 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-white">Rahmat! 🎉</h2>
                            <p className="text-gray-300 text-lg">{successMessage}</p>
                            <p className="text-gray-400 text-sm">
                                Siz muvaffaqiyatli ro‘yxatdan o‘tdingiz. Yangiliklar va sovg‘alar haqida birinchi bo‘lib xabar topish uchun bizni kuzatib boring!
                            </p>

                            <div className="flex justify-center gap-4 mt-4">
                                <a
                                    href="https://t.me/digitalgeneration_uz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative px-5 py-3 rounded-lg bg-blue-500 hover:bg-blue-400 transition text-white font-semibold flex items-center gap-2 shadow-lg"
                                >
                                    <i className="fab fa-telegram-plane text-lg"></i>
                                    Telegram
                                </a>

                                <a
                                    href="https://www.instagram.com/dguzbekistan?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative px-5 py-3 rounded-lg bg-pink-500 hover:bg-pink-400 transition text-white font-semibold flex items-center gap-2 shadow-lg"
                                >
                                    <i className="fab fa-instagram text-lg"></i>
                                    Instagram
                                </a>
                            </div>


                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={() => navigate('/')}
                                    className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 transition text-white font-semibold shadow-md flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3l9 9-9 9" />
                                    </svg>
                                    Bosh sahifaga
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form id="form" onSubmit={handleSubmit} className="space-y-4" aria-labelledby="register-heading">
                            <h2 id="register-heading" className="text-xl font-semibold">
                                {eventTitle} — Ro‘yxatdan o‘tish
                            </h2>
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
                                    <select style={{border:'1px solid blue'}} value={form.gender} onChange={e => setField('gender', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3">
                                        <option value="">Tanlang</option>
                                        <option value="male">Erkak</option>
                                        <option value="female">Ayol</option>
                                    </select>
                                </label>
                            </div>
                            <label className="block">
                                <span className="text-sm text-gray-300">Telefon</span>
                                <input type="tel" value={form.phone_number} onChange={e => setField('phone_number', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                            </label>
                            <label className="block">
                                <span className="text-sm text-gray-300">Telegram username</span>
                                <input type="text" value={form.telegram_username} onChange={e => setField('telegram_username', e.target.value)} className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                            </label>
                            <label className="block">
                                <span className="text-sm text-gray-300">Tug‘ilgan sana</span>
                                <input type="date" value={form.birth_date} onChange={e => setField('birth_date', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                            </label>
                            <label className="block">
                                <span className="text-sm text-gray-300">Ta'lim / O‘qish joyi</span>
                                <input type="text" value={form.study_place} onChange={e => setField('study_place', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <label className="block">
                                    <span className="text-sm text-gray-300">Hudud</span>
                                    <input type="text" value={form.region} onChange={e => setField('region', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                                </label>
                                <label className="block">
                                    <span className="text-sm text-gray-300">Tuman</span>
                                    <input type="text" value={form.district} onChange={e => setField('district', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                                </label>
                            </div>
                            <label className="block">
                                <span className="text-sm text-gray-300">Email</span>
                                <input type="email" value={form.email} onChange={e => setField('email', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                            </label>
                            <label className="block">
                                <span className="text-sm text-gray-300">Qisqacha ma'lumot</span>
                                <textarea value={form.about} onChange={e => setField('about', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" rows={3} />
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
                                    style={{ background: 'transparent', color: 'white', border: '1px solid blue' }} // Qo'shimcha inline style
                                >
                                    <option value="" className="text-black bg-white" style={{ background: 'black' }}>Tanlang</option>
                                    <option value="ai">Sun'iy intelekt</option>
                                    <option value="contest">DG Contest</option>
                                    <option value="fixtirolar">Foydali ixtirolar</option>
                                    <option value="rfutbol">Robo futbol</option>
                                    <option value="rsumo">Robo sumo</option>
                                </select>
                            </label>
                            {/* Friend form only for robofutbol */}
                            {eventKey === "rfutbol" && (
                                <div className="mt-8 p-4 rounded-xl border border-purple-500/30 bg-purple-900/10">
                                    <h3 className="text-lg font-bold mb-2 text-purple-300">Do‘stingiz ma'lumotlari</h3>
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
                                            <select value={friendForm.gender} style={{border:'1px solid blue'}} onChange={e => setFriendField('gender', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3">
                                                <option value="">Tanlang</option>
                                                <option value="male">Erkak</option>
                                                <option value="female">Ayol</option>
                                            </select>
                                        </label>
                                    </div>
                                    <label className="block">
                                        <span className="text-sm text-gray-300">Telefon</span>
                                        <input type="tel" value={friendForm.phone_number} onChange={e => setFriendField('phone_number', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                                    </label>
                                    <label className="block">
                                        <span className="text-sm text-gray-300">Telegram username</span>
                                        <input type="text" value={friendForm.telegram_username} onChange={e => setFriendField('telegram_username', e.target.value)} className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                                    </label>
                                    <label className="block">
                                        <span className="text-sm text-gray-300">Tug‘ilgan sana</span>
                                        <input type="date" value={friendForm.birth_date} onChange={e => setFriendField('birth_date', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                                    </label>
                                    <label className="block">
                                        <span className="text-sm text-gray-300">Ta'lim / O‘qish joyi</span>
                                        <input type="text" value={friendForm.study_place} onChange={e => setFriendField('study_place', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <label className="block">
                                            <span className="text-sm text-gray-300">Hudud</span>
                                            <input type="text" value={friendForm.region} onChange={e => setFriendField('region', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                                        </label>
                                        <label className="block">
                                            <span className="text-sm text-gray-300">Tuman</span>
                                            <input type="text" value={friendForm.district} onChange={e => setFriendField('district', e.target.value)} required className="mt-1 w-full rounded-xl bg-white text-black border border-gray-300 px-4 py-3" />
                                        </label>
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
                            <div className="flex items-center gap-3 mt-2">
                                <button type="submit" disabled={loading} className="flex-1 px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-60 transition font-semibold">
                                    {loading ? 'Yuborilmoqda...' : 'Ro‘yxatdan o‘tish'}
                                </button>
                                <button type="button" onClick={() => navigate(-1)} className="px-4 py-3 rounded-xl border border-white/10 text-sm hover:bg-white/5 transition">
                                    Bekor qilish
                                </button>
                            </div>
                        </form>
                    )}
                </main>
            </div>

            {/* Gifts Section */}
            {/* <div className="mb-8 mt-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {block.gifts?.map((gift: any, idx: number) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-700/30 to-purple-900/30 rounded-xl border border-purple-500/20 shadow-lg hover:scale-105 transition-transform"
                        >
                            <div className="w-16 h-16 mb-2 flex items-center justify-center rounded-lg bg-black/40">
                                {gift.image ? (
                                    <img src={gift.image} alt={gift.name} className="w-10 h-10 object-contain" />
                                ) : (
                                    giftIcon(gift.name)
                                )}
                            </div>
                            <div className="text-white text-sm font-semibold">{gift.name}</div>
                            {gift.count !== undefined && <div className="text-gray-300 text-xs">{gift.count}x</div>}
                        </div>
                    ))}
                </div>
            </div> */}

            {/* Subscription modal */}
            <SubscriptionModal
                open={showSubscriptionModal}
                onClose={() => setShowSubscriptionModal(false)}
                formData={pendingPayload}
                onSubmit={(data) => sendRegistration(data)}
            />
        </div>
    );
}