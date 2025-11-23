
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useModal } from "../context/context";
import { CountdownTimer } from "./ui/CountdownTimer";
import { Footer } from "./Footer";
import { Link } from "react-router-dom";



const ContestContent = ({
  agree,
  setAgree,
  loading,
  navigate,
}: {
  agree: boolean;
  setAgree: (v: boolean) => void;
  loading: boolean;
  navigate: (n: number) => void;
}) => (
  <div className="text-center topp space-y-6">
    <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl p-6 border border-purple-500/30">
      <h3 className="text-2xl font-bold text-white mb-4">Contest Yo'nalishi</h3>
      <p className="text-gray-300 mb-6">
        Quyidagi ijtimoiy tarmoq sahifalarimizga obuna bo'ling va <br />
        keyingi qadamlar haqida xabardor bo'ling.
      </p>
      <div className="flex justify-center gap-4 mt-6">
        <a
          href="https://t.me/digitalgeneration_uz"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition text-white font-semibold flex items-center gap-2"
        >
          <i className="fab fa-telegram-plane"></i>Telegram
        </a>
        <a
          href="https://www.instagram.com/dguzbekistan"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 transition text-white font-semibold flex items-center gap-2"
        >
          <i className="fab fa-instagram"></i>Instagram
        </a>
      </div>
    </div>
    <div className="box2">
      <label className="flex items-center justify-center gap-2 cursor-pointer">
        <input
          className="boxx"
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        Shartlarni to'liq bajardingizmi?
      </label>
    </div>
    <div className="flex justify-center gap-3 mt-6">
      <button
        type="button"
        disabled={loading || !agree}
        onClick={() => {
          if (agree) window.location.href = "https://raqamliavlod.uz/";
        }}
        className={`flex-1 px-4 py-3 rounded-xl transition font-semibold ${loading || !agree ? "btn-disabled" : "btn-enabled"
          }`}
      >
        {loading ? "Tasdiqlanmoqda..." : "Ro'yxatdan o'tish"}
      </button>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="px-6 py-3 rounded-xl border border-white/10 text-sm hover:bg-white/5 transition"
      >
        Bekor qilish
      </button>
    </div>
  </div>
);

// ========== ASOSIY KOMPONENT ==========

const DIRECTION_ALIASES: Record<string, string> = {
  "robo-sumo": "robo-sumo", // robo-sumo o'z yo'nalishi
  rsumo: "rsumo", // rsumo o'z yo'nalishi
  rfutbol: "rfutbol",
  robofutbol: "rfutbol",
  fixtirolar: "fixtirolar",
  ixtirolar: "ixtirolar",
  contest: "contest",
  ai: "ai",
};

const TEAM_DIRECTIONS = ["rfutbol"];
const NO_FORM_DIRECTIONS = ["contest"];

const SEATS_DEFAULT: Record<string, number> = {
  ai: 60,
  "robo-sumo": 30, // robo-sumo uchun
  rsumo: 30, // rsumo uchun
  contest: 40,
  rfutbol: 24,
  ixtirolar: 20,
  fixtirolar: 20,
};



export default function Register(): JSX.Element {
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
  const noForm = NO_FORM_DIRECTIONS.includes(eventKey);

  const block: BlockType | undefined =
    blocks.find(
      (b) =>
        String(b.id) === eventKey ||
        b.link === `/register/${eventKey}` ||
        (b.link && b.link.endsWith(eventKey))
    ) ?? blocks[0];
  const eventTitle = block?.title ?? "Ro'yxat";
  const eventDesc = block?.desc ?? "";
  const eventImage = block?.image ?? "";

  // ========== DINAMIK RASM TANLASH ==========
  const giftImage = DIRECTION_IMAGES[eventKey] || rfootbol;

  // ========== TEKSHIRISH UCHUN (Keyinchalik o'chirish mumkin) ==========
  console.log("🔍 Yo'nalish tekshiruvi:");
  console.log("URL dan olingan:", detected);
  console.log("Haqiqiy yo'nalish:", eventKey);
  console.log("Tanlangan rasm:", giftImage);
  // ====================================================================

  const seatsTotal = SEATS_DEFAULT[eventKey] ?? 50;
  const [seatsLeft, setSeatsLeft] = useState<number>(seatsTotal);
  const firstNameRef = useRef<HTMLInputElement | null>(null);

  const [mainForm, setMainForm] = useState<PersonData & { direction: string }>({
    first_name: "",
    last_name: "",
    phone_number: "",
    birth_date: "",
    tg_username: "",
    study_place: "",
    region: "",
    district: "",
    direction: eventKey,
  });

  const [partnerForm, setPartnerForm] = useState<PersonData>({
    first_name: "",
    last_name: "",
    phone_number: "",
    birth_date: "",
    tg_username: "",
    study_place: "",
    region: "",
    district: "",
  });

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [mainRegionId, setMainRegionId] = useState<number | null>(null);
  const mainTumanlar = mainRegionId
    ? (tumanlar as Tuman[]).filter((t) => t.region_id === mainRegionId)
    : [];

  const [partnerRegionId, setPartnerRegionId] = useState<number | null>(null);
  const partnerTumanlar = partnerRegionId
    ? (tumanlar as Tuman[]).filter((t) => t.region_id === partnerRegionId)
    : [];

  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  const handleMainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMainForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePartnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPartnerForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMainRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const regionId = e.target.value ? Number(e.target.value) : null;
    const selectedViloyat = (viloyatlar as Viloyat[]).find(
      (v) => v.id === regionId
    );
    setMainRegionId(regionId);
    setMainForm((prev) => ({
      ...prev,
      region: selectedViloyat?.name_uz || "",
      district: "",
    }));
  };

  const handleMainDistrictChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const tumanId = e.target.value ? Number(e.target.value) : null;
    const selectedTuman = (tumanlar as Tuman[]).find((t) => t.id === tumanId);
    setMainForm((prev) => ({
      ...prev,
      district: selectedTuman?.name_uz || "",
    }));
  };

  const handlePartnerRegionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const regionId = e.target.value ? Number(e.target.value) : null;
    const selectedViloyat = (viloyatlar as Viloyat[]).find(
      (v) => v.id === regionId
    );
    setPartnerRegionId(regionId);
    setPartnerForm((prev) => ({
      ...prev,
      region: selectedViloyat?.name_uz || "",
      district: "",
    }));
  };

  const handlePartnerDistrictChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const tumanId = e.target.value ? Number(e.target.value) : null;
    const selectedTuman = (tumanlar as Tuman[]).find((t) => t.id === tumanId);
    setPartnerForm((prev) => ({
      ...prev,
      district: selectedTuman?.name_uz || "",
    }));
  };

  const sendData = (): RegisterPayload => {
    const data: RegisterPayload = {
      first_name: mainForm.first_name.trim(),
      last_name: mainForm.last_name.trim(),
      phone_number: mainForm.phone_number.trim(),
      birth_date: mainForm.birth_date,
      study_place: mainForm.study_place.trim(),
      region: mainForm.region.trim(),
      district: mainForm.district.trim(),
      direction: mainForm.direction || eventKey,
    };
    if (needsPartner) {
      data.partner_data = {
        first_name: partnerForm.first_name.trim(),
        last_name: partnerForm.last_name.trim(),
        phone_number: partnerForm.phone_number.trim(),
        birth_date: partnerForm.birth_date,
        study_place: partnerForm.study_place.trim(),
        region: partnerForm.region.trim(),
        district: partnerForm.district.trim(),
      };
    }
    return data;
  };

  function validate(): string | null {
    if (!mainForm.first_name.trim()) return "Ismingizni kiriting.";
    if (!mainForm.phone_number.trim()) return "Telefon raqamingizni kiriting.";
    
    if (needsPartner) {
      if (!partnerForm.first_name.trim()) return "Sherigingiz ismini kiriting.";
      if (!partnerForm.phone_number.trim())
        return "Sherigingiz telefon raqamini kiriting.";
    }
    return null;
  }

  

  return (
    <section className="bg-black relative z-50">
      <div className="mtop max-w-6xl mx-auto text-white py-10 p-[20px] px-4 m-auto flex flex-col items-center justify-center">
        <Link to="/">
          <img src={logo} className="logoo" alt="Logo" />
        </Link>
        <div className="mb-5 w-full flex flex-col flex-wrap gap-8">
          <div className="text-center">
            <p className="text-purple-200 font-bold textp">
              Ishtirokchilar yutib olishi mumkin bo'lgan sovg'alar
            </p>
          </div>
          <img className="imagess" src={giftImage} alt="Sovg'alar" />
        </div>
      </div>
      <div className="footerr">
        <Footer />
      </div>
    </section>
  );
}
