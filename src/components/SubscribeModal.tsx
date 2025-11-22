import { useState } from "react";

interface SubscriptionModalProps {
  open: boolean;
  onClose: () => void;
  formData: any; // formdagi ma'lumotlar (ism, email va hokazo)
  onSubmit: (data: any) => void; // serverga yuborish funksiyasi
}

export function SubscriptionModal({ open, onClose, formData, onSubmit }: SubscriptionModalProps) {
  const [subscribed, setSubscribed] = useState({ instagram: false, telegram: false });

  const handleSubscribe = (platform: "instagram" | "telegram", url: string) => {
    window.open(url, "_blank");
    setSubscribed((prev) => ({ ...prev, [platform]: true }));
  };

  const allSubscribed = subscribed.instagram && subscribed.telegram;

  const handleSubmit = () => {
    if (allSubscribed) {
      onSubmit(formData); // form ma'lumotlarini serverga yuborish
      onClose(); // modalni yopish
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        zIndex: 1000,
      }}
    >
      <div className="bg-gray-900 w-1/5 rounded-2xl p-8 max-w-md text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Ro‘yxatdan o‘tishdan oldin
        </h2>

        <p className="text-gray-300 text-sm mb-6">
          Hurmatli foydalanuvchi, sahifalarga <span className="text-purple-400"> obuna</span> bo‘ling.
        </p>

        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={() =>
              handleSubscribe("instagram", "https://www.instagram.com/dguzbekistan")
            }
            className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 font-semibold transition ${
              subscribed.instagram ? "opacity-60" : "hover:opacity-90"
            }`}
          >
            Instagram-ga obuna bo‘lish
            {subscribed.instagram && <span className="ml-2 text-green-400">✔</span>}
          </button>

          <button
            onClick={() =>
              handleSubscribe("telegram", "https://t.me/digitalgeneration_uz")
            }
            className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-blue-600 font-semibold transition ${
              subscribed.telegram ? "opacity-60" : "hover:opacity-90"
            }`}
          >
            Telegram-ga obuna bo‘lish
            {subscribed.telegram && <span className="ml-2 text-green-400">✔</span>}
          </button>
        </div>

        <button
          disabled={!allSubscribed}
          onClick={handleSubmit}
          className={`mt-2 w-full py-3 rounded-xl text-white font-semibold transition ${
            allSubscribed
              ? "bg-purple-600 hover:bg-purple-500"
              : "bg-gray-700 cursor-not-allowed"
          }`}
        >
          Ro‘yxatdan o‘tish
        </button>
      </div>
    </div>
  );
}
