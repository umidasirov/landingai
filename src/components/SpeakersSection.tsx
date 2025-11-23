import { Linkedin, Twitter } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import imgAll from '../assets/gifts/asosiy.png';
export function MainGifts() {
  return (
    <section id="sovg'alar" className="relative py-24 lg:py-32 bg-gradient-to-b from-black via-purple-950/10 to-black overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10"
           style={{
             backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)`,
             backgroundSize: '50px 50px'
           }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-purple-900/30 border border-purple-500/50 rounded-full text-purple-400 mb-6">
            <span>IT Haftaligi: Sovg‘alar Sizni Kutmoqda</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
            IT Haftaligi { ' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
               Sovrinlari
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Ushbu IT haftaligida ishtirok eting va yangi tajribalar orttiring. Yoqimli sovg‘alarga ega bo'lish esa  sizning ishtirokingiz va faoliyatingizga bog‘liq
          </p>
        </div>

        {/* Speakers Grid */}
        <div className="flex justify-center items-center">
          <img src={imgAll} alt="" />
        </div>
      </div>
    </section>
  );
}
