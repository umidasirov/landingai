import React, { useState, useEffect } from 'react';
import { GiftsList } from './GiftList';
import box from '../assets/cart.png';

const shadowColors = [
  'rgba(255, 215, 0, 0.5)',
  'rgba(168, 85, 247, 0.5)',
  'rgba(59, 130, 246, 0.5)',
  'rgba(236, 72, 153, 0.5)',
];

export default function Karobka({ f }: { f: any[] }) {
  const [gifts, setGifts] = useState<any[]>([]);

  useEffect(() => {
    setGifts(f);
  }, [f]);

  const rows = Math.ceil(Math.sqrt(gifts.length));
  const pyramidGifts = gifts.slice(0, rows * (rows + 1) / 2);

  return (
    <div className="relative w-full py-8 px-2 sm:py-12 sm:px-4">
      <style>{`
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px var(--glow-color);
          }
          50% {
            box-shadow: 0 0 40px var(--glow-color);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>

      <div className="relative max-w-full sm:max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl mb-4 text-white">
           Ishtirokchilar yutib olishi mumkin sovg'alar
          </h2>
        </div>
        <div
          className="flex flex-col items-center p-4 sm:p-8 rounded-3xl border border-purple-500/30 
             bg-black/20 backdrop-blur-xl"
        >
          <div className="flex flex-col items-center mb-8 sm:mb-16">
            {Array.from({ length: rows }).map((_, row) => {
              const itemsInRow = row + 1;
              const startIdx = (row * (row + 1)) / 2;
              const endIdx = startIdx + itemsInRow;
              const rowGifts = pyramidGifts.slice(startIdx, endIdx);

              return (
                <div key={row} className="flex flex-wrap gap-2 sm:gap-4 justify-center mb-2 sm:mb-4">
                  
                  {rowGifts.map((gift, idx) => {
                    const glowColor = shadowColors[(startIdx + idx) % shadowColors.length];

                    return (
                      <div
                        key={`${gift.type}-${startIdx + idx}`}
                        className="relative flex flex-col items-center p-2 sm:p-3 rounded-lg backdrop-blur-lg transition-all duration-300 group hover:scale-110"
                        style={{
                          animation: 'float 2s ease-in-out infinite',
                        } as React.CSSProperties}
                      >
                        <div className="flex items-center justify-center">
                          {gift.image ? (
                            <img
                              src={gift.image}
                              alt={gift.type}
                              className="object-contain w-40 h-40 sm:w-82 sm:h-72 p-1"
                              style={{
                                filter: 'drop-shadow(0 0 228px rgba(13, 4, 218, 0.4))',
                              }}
                            />
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
