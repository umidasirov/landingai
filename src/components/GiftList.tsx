import React from "react";

const shadowColors = [
    "rgba(156, 39, 176, 0.25)", // purple
    "rgba(33, 150, 243, 0.25)", // blue
    "rgba(255, 193, 7, 0.25)",  // yellow
    "rgba(244, 67, 54, 0.25)",  // red
    "rgba(76, 175, 80, 0.25)",  // green
    "rgba(255, 87, 34, 0.25)",  // orange
];

export function GiftsList({ gifts }: { gifts: any[] }) {
    return (
        <div className="flex flex-wrap gap-8 justify-center w-full relative" style={{ zIndex: 10 }}>
            {gifts.map((gift, idx) => {
                const shadowColor = shadowColors[idx % shadowColors.length];
                const isIphone = gift.type === "iphone";
                return (
                    <div
                        key={gift.type}
                        className={`
                            relative flex flex-col items-center p-8 rounded-3xl
                            border-4 border-white/30 bg-white/10 backdrop-blur-lg
                            transition-all duration-500 group
                            ${isIphone ? "hover:scale-110 hover:-translate-y-4" : "hover:scale-105 hover:-translate-y-2"}
                        `}
                        style={{
                            minWidth: isIphone ? 260 : 200,
                            maxWidth: isIphone ? 360 : 280,
                            flex: "1 1 220px",
                            zIndex: 10,
                            border: isIphone ? "2px solid gold" : "1px solid #6d28d9",
                            boxShadow: isIphone
                                ? "0 0 60px 20px gold, 0 4px 32px 0 #fff"
                                : `0 4px 32px 0 ${shadowColor}`,
                        }}
                    >
                        {/* Анимация glow при hover для iPhone */}
                        {isIphone && (
                            <div className="absolute inset-0 rounded-3xl pointer-events-none animate-pulse"
                                 style={{
                                     boxShadow: "0 0 80px 20px gold, 0 0 40px 10px #fff",
                                     opacity: 0.7,
                                 }} />
                        )}
                        {/* Количество */}
                        <div className="absolute top-4 right-4">
                            <span className={`px-4 py-2 rounded-full font-bold text-xs shadow-lg border ${isIphone ? "bg-yellow-300 text-black border-yellow-500" : "bg-purple-600 text-white border-purple-800"}`}>
                                {gift.count} ta
                            </span>
                        </div>
                        {/* Картинка */}
                        <div className={`flex items-center justify-center mb-3 rounded-xl bg-white/30 border-2 border-white shadow-lg ${isIphone ? "w-32 h-32" : "w-20 h-20"}`}>
                            {gift.image ? (
                                <img
                                    src={gift.image}
                                    alt={gift.type}
                                    className={`object-contain ${isIphone ? "w-28 h-28 animate-bounce" : "w-16 h-16"}`}
                                    style={isIphone ? { filter: "drop-shadow(0 0 24px gold)" } : {}}
                                />
                            ) : (
                                <span className="text-4xl">🎁</span>
                            )}
                        </div>
                        {/* Название */}
                        <div className={`font-bold text-lg mb-1 text-white ${isIphone ? "tracking-widest text-yellow-300 text-2xl" : ""}`}>
                            {isIphone ? "iPhone 17" : gift.type}
                        </div>
                        {/* Описание */}
                        <div className="text-gray-200 text-xs mb-2 text-center">{gift.description}</div>
                        {/* Hover message + анимация */}
                        <div
                            className={`
                                absolute inset-0 flex items-center justify-center
                                opacity-0 group-hover:opacity-100
                                transition-opacity duration-500
                                pointer-events-none
                            `}
                            style={{
                                boxShadow: isIphone
                                    ? "0 0 120px 40px gold"
                                    : `0 0 80px 20px ${shadowColor}`,
                                borderRadius: "1.5rem",
                            }}
                        >
                            <span className={`
                                px-6 py-3 rounded-xl font-bold text-lg
                                bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500
                                text-white shadow-2xl animate-bounce
                                ${isIphone ? "text-2xl" : ""}
                            `}>
                                Meni olishing mumkin!
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}