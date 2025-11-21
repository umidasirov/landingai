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

type RegisterPayload = {
    first_name: string;
    last_name?: string;
    phone_number: string;
    birth_date?: string;
    email: string;
    study_place?: string;
    region?: string;
    district?: string;
    direction: string;
    eventKey: string;
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

    const [form, setForm] = useState<RegisterPayload>({
        first_name: '',
        last_name: '',
        phone_number: '',
        birth_date: '',
        email: '',
        study_place: '',
        region: '',
        district: '',
        direction: eventKey,
        eventKey,
    });

    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        firstNameRef.current?.focus();
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') navigate(-1);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    function setField<K extends keyof RegisterPayload>(key: K, value: RegisterPayload[K]) {
        setForm((s) => ({ ...s, [key]: value }));
    }

    function canonicalDirection(value: string) {
        const k = (value || '').toLowerCase();
        return DIRECTION_ALIASES[k] ?? k ?? eventKey;
    }

    function validate(): string | null {
        if (!form.first_name.trim()) return "To'liq ism kiritilsin.";
        if (!form.phone_number.trim()) return "Telefon raqam kiritilsin.";
        if (!form.email.trim()) return "Email kiritilsin.";
        if (!/^\S+@\S+\.\S+$/.test(form.email)) return 'Yaroqli email kiriting.';
        return null;
    }

    // ...existing code...
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

        // Build minimal payload (serverga ortiqcha maydon yubormaymiz)
        const minimalPayload: Partial<RegisterPayload> = {
            first_name: form.first_name.trim(),
            last_name: form.last_name?.trim() || undefined,
            phone_number: form.phone_number.trim(),
            birth_date: form.birth_date || undefined,
            email: form.email.trim(),
            study_place: form.study_place?.trim() || undefined,
            region: form.region?.trim() || undefined,
            district: form.district?.trim() || undefined,
            direction: canonicalDirection(form.direction || eventKey),
        };

        // remove undefined keys
        const payload = Object.fromEntries(
            Object.entries(minimalPayload).filter(([_, v]) => v !== undefined && v !== '')
        );

        console.debug('POST payload ->', payload);

        setLoading(true);
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

            // Always log raw server response for debugging
            console.info('register response status:', res.status, 'body:', data ?? text);

            if (!res.ok) {
                // show server-provided validation errors if any
                const serverMsg =
                    (data && (data.detail || data.message || data.errors)) ||
                    (typeof data === 'string' ? data : `Server xatosi: ${res.status}`);
                const errStr = typeof serverMsg === 'object' ? JSON.stringify(serverMsg) : String(serverMsg);
                setError(errStr);
                // quick alert for visibility during testing
                window.alert('Server error: ' + errStr);
                return;
            }

            // success
            setSeatsLeft((s) => Math.max(0, s - 1));
            setDone(true);
            const successMsg = (data && (data.message || data.detail)) || 'Ro‘yxatdan muvaffaqiyatli o‘tdingiz!';
            setSuccessMessage(successMsg);
            window.alert(successMsg);
        } catch (err) {
            console.error('Network/Fetch error:', err);
            setError((err as Error).message || 'Yuborishda xatolik yuz berdi.');
            window.alert('Network error: ' + ((err as Error).message || 'Unknown'));
        } finally {
            setLoading(false);
        }
    }
    // ...existing code...


    const giftIcon = (name: string) => (
        <svg className="w-6 h-6 text-purple-400 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 11V6a5 5 0 0 1 10 0v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 12v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    return (
        <div className="min-h-screen bg-black text-white py-10 px-4 relative z-50">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                <aside className="lg:col-span-1 rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg flex flex-col">
                    <div className="w-full flex-1 min-h-0 bg-gray-700">
                        {eventImage ? (
                            <img src={eventImage} alt={eventTitle} className="w-full h-full object-cover block" />
                        ) : (
                            <div className="w-full h-48 flex items-center justify-center text-gray-500">Rasm mavjud emas</div>
                        )}
                    </div>

                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-2">{eventTitle}</h1>
                        <p className="text-gray-300 mb-4 text-sm">{eventDesc}</p>

                        <div className="flex items-center justify-between mb-4">
                            <div className="text-sm text-gray-300">
                                Joylar cheklangan:
                                <span className="ml-2 font-semibold text-white">{seatsLeft}</span>
                                <span className="text-gray-400"> / {seatsTotal}</span>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${seatsLeft > 10 ? 'bg-green-800/40 text-green-300' : seatsLeft > 0 ? 'bg-yellow-900/40 text-yellow-300' : 'bg-red-900/40 text-red-300'}`}>
                                {seatsLeft > 10 ? 'Mavjud' : seatsLeft > 0 ? 'So‘nggi joylar' : 'Tugagan'}
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="text-sm text-gray-300 mb-2 font-medium">Sovg'alar</div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {eventGifts.length ? (
                                    eventGifts.map((g, i) => (
                                        <div key={i} className="flex items-center gap-2 p-2 bg-black/30 rounded-lg border border-white/6">
                                            <div className="flex items-center justify-center w-10 h-10 bg-purple-900/20 rounded-md">
                                                {giftIcon(g)}
                                            </div>
                                            <div className="text-xs sm:text-sm text-gray-200">{g}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-sm text-gray-500">Sovg'alar mavjud emas</div>
                                )}
                            </div>
                        </div>

                        <div className="text-sm text-gray-300 italic mb-2">
                            Ro‘yxatdan o‘tganlar orasidan sovg'alardan birini yutib olishingiz mumkin!
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition text-sm"
                            >
                                Orqaga
                            </button>

                            <a href="#form" className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition text-sm">
                                Ro‘yxatdan o‘tish
                            </a>
                        </div>
                    </div>
                </aside>

                <main className="lg:col-span-2 bg-gray-900 rounded-2xl p-6 shadow-lg">
                    {done ? (
                        <div className="text-center space-y-6">
                            <div className="flex justify-center">
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
                            <h2 id="register-heading" className="text-xl font-semibold">{eventTitle} — Ro‘yxatdan o‘tish</h2>

                            {error && <div className="text-sm text-red-700">{error}</div>}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <label className="block">
                                    <span className="text-sm text-gray-300">Ism</span>
                                    <input
                                        ref={firstNameRef}
                                        type="text"
                                        value={form.first_name}
                                        onChange={(e) => setField('first_name', e.target.value)}
                                        className="mt-1 w-full rounded-md bg-gray-800 border border-white/6 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                                        required
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-sm text-gray-300">Familiya</span>
                                    <input
                                        type="text"
                                        value={form.last_name}
                                        onChange={(e) => setField('last_name', e.target.value)}
                                        className="mt-1 w-full rounded-md bg-gray-800 border border-white/6 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                                    />
                                </label>
                            </div>

                            <label className="block">
                                <span className="text-sm text-gray-300">Telefon</span>
                                <input
                                    type="tel"
                                    value={form.phone_number}
                                    onChange={(e) => setField('phone_number', e.target.value)}
                                    placeholder="+998901234567"
                                    className="mt-1 w-full rounded-md bg-gray-800 border border-white/6 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                                    required
                                />
                            </label>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <label className="block">
                                    <span className="text-sm text-gray-300">Tug‘ilgan sana</span>
                                    <input
                                        type="date"
                                        value={form.birth_date}
                                        onChange={(e) => setField('birth_date', e.target.value)}
                                        className="mt-1 w-full rounded-md bg-gray-800 border border-white/6 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-sm text-gray-300">Ta'lim / O‘qish joyi</span>
                                    <input
                                        type="text"
                                        value={form.study_place}
                                        onChange={(e) => setField('study_place', e.target.value)}
                                        className="mt-1 w-full rounded-md bg-gray-800 border border-white/6 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                                    />
                                </label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <label className="block">
                                    <span className="text-sm text-gray-300">Hudud</span>
                                    <input
                                        type="text"
                                        value={form.region}
                                        onChange={(e) => setField('region', e.target.value)}
                                        className="mt-1 w-full rounded-md bg-gray-800 border border-white/6 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-sm text-gray-300">Tuman</span>
                                    <input
                                        type="text"
                                        value={form.district}
                                        onChange={(e) => setField('district', e.target.value)}
                                        className="mt-1 w-full rounded-md bg-gray-800 border border-white/6 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                                    />
                                </label>
                            </div>

                            <label className="block">
                                <span className="text-sm text-gray-300">Yo‘nalish (slug yoki avtomatik)</span>
                                <input
                                    type="text"
                                    value={form.direction}
                                    onChange={(e) => setField('direction', e.target.value)}
                                    placeholder="masalan: rsumo, rfutbol, ai"
                                    className="mt-1 w-full rounded-md bg-gray-800 border border-white/6 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                                />
                            </label>

                            <label className="block">
                                <span className="text-sm text-gray-300">Email</span>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setField('email', e.target.value)}
                                    className="mt-1 w-full rounded-md bg-gray-800 border border-white/6 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                                    required
                                />
                            </label>

                            <div className="flex items-center gap-3 mt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 px-4 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-60 transition font-semibold"
                                >
                                    {loading ? 'Yuborilmoqda...' : 'Ro‘yxatdan o‘tish'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="px-4 py-3 rounded-lg border border-white/10 text-sm hover:bg-white/5 transition"
                                >
                                    Bekor qilish
                                </button>
                            </div>
                        </form>
                    )}
                </main>
            </div>
        </div>
    );
}