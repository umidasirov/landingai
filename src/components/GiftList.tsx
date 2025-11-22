import React from "react";

const shadowColors = [
    "#9C27B0", // purple
    "#2196F3", // blue
    "#FFC107", // yellow
    "#F44336", // red
    "#4CAF50", // green
    "#FF5722", // orange
];

export function GiftsList({ gifts }: { gifts: any[] }) {
    return (
        <div className="flex flex-wrap gap-8 justify-center w-full relative" style={{ zIndex: 10 }}>
            {gifts.map((gift, idx) => {
                const isIphone = gift.type === "iphone";
                const glowColor = shadowColors[idx % shadowColors.length];

                return (
                    <div
                        key={gift.type + idx}
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
                        }}
                    >
                        {/* Glow background */}
                        <div
                            className="absolute inset-0 rounded-3xl pointer-events-none"
                            style={{
                                "--glow-color": glowColor,
                                animation: "glow 2s ease-in-out infinite",
                            } as React.CSSProperties}
                        />

                        {/* Count */}
                        <div className="absolute top-4 right-4">
                            <span className={`px-4 py-2 rounded-full font-bold text-xs shadow-lg border ${isIphone ? "bg-yellow-300 text-black border-yellow-500" : "bg-purple-600 text-white border-purple-800"}`}>
                                {gift.count} ta
                            </span>
                        </div>

                        {/* Image */}
                        {/* Image */}
                        <div className={`flex items-center justify-center mb-3 rounded-xl border-2 border-white shadow-lg ${isIphone ? "w-50 h-50" : "w-40 h-40"}`}>
                            {gift.image ? (
                                <img
                                    src={gift.image}
                                    alt={gift.type}
                                    className={`object-contain`}
                                    style={{
                                        width:"100%",
                                        filter: isIphone ? "drop-shadow(0 0 24px gold)" : undefined
                                    }}
                                />
                            ) : (
                                <span className="text-4xl">🎁</span>
                            )}
                        </div>


                        {/* Name */}
                        <div className={`font-bold text-lg mb-1 text-white ${isIphone ? "tracking-widest text-yellow-300 text-2xl" : ""}`}>
                            {isIphone ? "iPhone 17" : gift.type}
                        </div>

                        {/* Description */}
                        <div className="text-gray-200 text-xs mb-2 text-center">{gift.description}</div>
                    </div>
                );
            })}
        </div>
    );
}

