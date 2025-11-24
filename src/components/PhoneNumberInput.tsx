import React from "react";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function PhoneNumberInput({ value, onChange, error }: PhoneInputProps) {
  // Telefon raqamni avtomatik formatlash
  const formatUzPhone = (input: string) => {
    // faqat raqamlarni olib qolamiz
    const digits = input.replace(/\D/g, "");

    // +998 dan boshqasini qabul qilmaymiz
    if (!digits.startsWith("998")) {
      return "+998 ";
    }

    // qolganlarini formatlash
    let out = "+998 ";

    // 998 XX XXX XX XX
    if (digits.length > 3) out += digits.slice(3, 5);
    if (digits.length > 5) out += " " + digits.slice(5, 8);
    if (digits.length > 8) out += " " + digits.slice(8, 10);
    if (digits.length > 10) out += " " + digits.slice(10, 12);

    return out.trim();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatUzPhone(e.target.value);
    onChange(formatted);
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-gray-300 mb-2">Telefon</span>

      <input
        type="tel"
        value={value}
        onChange={handleChange}
        placeholder="+998 90 123 45 67"
        className="px-4 py-3 border rounded-xl w-full focus:ring-2 focus:ring-blue-500 outline-none"
        maxLength={17}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
