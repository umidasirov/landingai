import React from "react";
import { GiftsList } from "./GiftsList"; // eski componentni ishlatamiz
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function PrizesSection({ gifts }: { gifts: any[] }) {
  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-black via-purple-950/10 to-black overflow-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-purple-900/30 border border-purple-500/50 rounded-full text-purple-400 mb-6">
            Yutish mumkin bo‘lgan sovg‘alar
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
            Tanishing{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Prizlar bilan
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Musobaqada yutib olish mumkin bo‘lgan barcha sovg‘alar!
          </p>
        </div>

        {/* Gifts Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {gifts.map((gift, idx) => {
            const isIphone = gift.type === "iphone";

            return (
              <div
                key={gift.type + idx}
                className="group relative cursor-pointer w-full h-full"
              >
                {/* Neon Frame */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />

                {/* Card */}
                <div className="relative bg-gradient-to-b from-gray-900 to-black border border-purple-500/30 rounded-2xl overflow-hidden backdrop-blur-sm group-hover:border-purple-500/60 transition-all hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden flex items-center justify-center p-4">
                    <ImageWithFallback
                      src={gift.image}
                      alt={gift.type}
                      className="object-contain transform transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-4 text-center">
                    <h3 className="text-white font-semibold text-lg mb-1">{gift.type}</h3>
                    <p className="text-gray-400 text-sm">{gift.description}</p>
                    <p className="mt-2 text-yellow-300 font-bold">{gift.count} ta</p>
                  </div>

                  {/* Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
