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

  return (
    <section
      id="manzil"
      className="relative py-24 lg:py-32 bg-gradient-to-b from-black via-purple-950/10 to-black overflow-hidden"
    >
      {/* Fon Grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(168,85,247,0.5) 2px, transparent 2px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sarlavha */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-purple-900/30 border border-purple-500/50 rounded-full text-purple-400 mb-6">
            Sovg'alar
          </div>
          <h2 className="text-4xl lg:text-5xl mb-4 text-white">
            Ushbu sovg'alardan {" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              birini yutib olishingiz mumkin
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Shoshiling, joylar soni <span className='bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent'>cheklangan!!!</span>
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <img
            src={gifts?.img}
            alt=""
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl object-contain"
          />
        </div>

      </div>
    </section>
  );
}
