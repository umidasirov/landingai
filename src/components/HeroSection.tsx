import { useState, useMemo } from 'react';
import { Sparkles, ArrowRight, Users, Cpu, Brain, Zap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { RegistrationModal } from './RegistrationModal';
import { useModal } from '../context/context';
import { CountdownTimer } from './ui/CountdownTimer';

export function HeroSection() {
  const { showRegister, setShowRegister } = useModal();

  const particles = useMemo(
    () =>
      [...Array(20)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 2,
      })),
    []
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://www.sercansolmaz.com/content/images/2025/02/DALL-E-2025-02-10-00.30.24---A-16_9-cover-image-with-a-deep-midnight-blue-gradient-background.-Overlay-an-abstract-neural-network-or-circuit-board-pattern-in-neon-blue-and-purple-.webp"
          alt="AI Neural Network"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />
      </div>

      {/* Floating Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-40 animate-floatSoft"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600 rounded-full filter blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: '1s' }}
      />

      {/* Floating AI Icons */}
      {[{ icon: Brain, top: '25%', left: '33%', from: 'purple', to: 'transparent', border: 'purple-500/30' },
      { icon: Cpu, top: '66%', left: '25%', from: 'cyan', to: 'transparent', border: 'cyan-500/30' },
      { icon: Zap, top: '33%', left: '66%', from: 'pink', to: 'transparent', border: 'pink-500/30' }]
        .map(({ icon: Icon, top, left, from, to, border }, i) => (
          <div key={i} className="absolute hidden md:block" style={{ top, left }}>
            <div className={`p-4 bg-gradient-to-br from-${from}-600/20 to-${to} backdrop-blur-sm border ${border} rounded-2xl animate-floatSoft`}>
              <Icon className={`text-${from}-400`} size={40} />
            </div>
          </div>
        ))
      }

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="flex items-center justify-center gap-2 mb-6 opacity-80">
          <Sparkles className="text-cyan-400" size={20} />
          <span className="text-cyan-400 uppercase tracking-wider">Toshkent, O‘zbekiston</span>
          <Sparkles className="text-cyan-400" size={20} />
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-8xl mb-6">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            AI Konferensiya
          </span>
          <br />
          <span className="text-white">2025</span>
        </h1>

        <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-4">
          Sun’iy intellektning kelajagi. Global mutaxassislar.
          <br />
          <span className="text-purple-400">Inqilobiy yangiliklar.</span>
        </p>

        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          Sun’iy intellekt sohasidagi yetakchi fikr egalari bilan uch kun davomida zamonaviy yondashuvlar,
          yangi tadqiqotlar va kelajak texnologiyasini shakllantiradigan innovatsion yechimlar bilan tanishing.
        </p>

        <CountdownTimer targetDate="2025-11-29T00:00:00" />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full max-w-md mx-auto sm:max-w-none">
          <button
            onClick={() => setShowRegister(true)}
            className="w-full sm:w-64 px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full text-white flex items-center justify-center gap-2 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/80 transition-transform duration-200 transform hover:scale-105 active:scale-95 relative overflow-hidden group"
          >
            <Sparkles size={20} />
            Ro‘yxatdan o‘tish
            <ArrowRight size={20} />
          </button>

          <button
            onClick={() => document.getElementById('speakers')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-64 px-8 py-4 border-2 border-purple-500 rounded-full text-white flex items-center justify-center gap-2 hover:bg-purple-500/10 transition-colors backdrop-blur-sm"
          >
            <Users size={20} />
            Spikerlarni ko‘rish
          </button>
        </div>

      </div>

      {/* Scroll Indicator */}
      {/* <div className="animate-blob absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center pt-2 animate-bounce">
          <div className="w-1 h-2 bg-purple-400 rounded-full" />
        </div>
      </div> */}

      {/* Registration modal */}
      <RegistrationModal isOpen={showRegister} onClose={() => setShowRegister(false)} />
    </section>
  );
}
