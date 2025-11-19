import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Users, Cpu, Brain, Zap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { RegistrationModal } from './RegistrationModal';
import { useModal } from '../context/context';
import { CountdownTimer } from './ui/CountdownTimer';

export function HeroSection() {
  const { showRegister, setShowRegister } = useModal();

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  const rotateAnimation = {
    rotate: [0, 360],
    transition: {
      duration: 30,
      repeat: Infinity,
      ease: 'linear',
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1664526936810-ec0856d31b92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMG5ldXJhbCUyMG5ldHdvcmslMjBmdXR1cmlzdGljfGVufDF8fHx8MTc2MzQ4NTgzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="AI Neural Network"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Rotating Neural Network Effect */}
      <motion.div
        animate={rotateAnimation}
        className="absolute inset-0 opacity-20"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, transparent 20%, rgba(168, 85, 247, 0.1) 40%, transparent 60%)',
        }}
      />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600 rounded-full filter blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: '1s' }}
      />

      {/* AI Neural Network Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        {[...Array(8)].map((_, i) => (
          <motion.line
            key={i}
            x1={`${Math.random() * 100}%`}
            y1={`${Math.random() * 100}%`}
            x2={`${Math.random() * 100}%`}
            y2={`${Math.random() * 100}%`}
            stroke="url(#lineGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </svg>

      {/* Floating AI Icons */}
      <motion.div
        className="absolute top-1/4 left-1/3 hidden md:block"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="p-4 bg-gradient-to-br from-purple-600/20 to-transparent backdrop-blur-sm border border-purple-500/30 rounded-2xl">
          <Brain className="text-purple-400" size={40} />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-1/4 hidden md:block"
        animate={{
          y: [0, 25, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="p-4 bg-gradient-to-br from-cyan-600/20 to-transparent backdrop-blur-sm border border-cyan-500/30 rounded-2xl">
          <Cpu className="text-cyan-400" size={40} />
        </div>
      </motion.div>

      <motion.div
        className="absolute top-2/3 left-1/4 hidden lg:block"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="p-4 bg-gradient-to-br from-pink-600/20 to-transparent backdrop-blur-sm border border-pink-500/30 rounded-2xl">
          <Zap className="text-pink-400" size={40} />
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Sparkles className="text-cyan-400" size={20} />
          <span className="text-cyan-400 uppercase tracking-wider">Tashkent, Uzbekistan</span>
          <Sparkles className="text-cyan-400" size={20} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl lg:text-8xl mb-6"
        >
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            AI Conference
          </span>
          <br />
          <span className="text-white">2025</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-4"
        >
          Future of Intelligence. Global Experts.
          <br />
          <span className="text-purple-400">Breakthrough Innovations.</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          Join the leading minds in artificial intelligence for three days of cutting-edge insights,
          groundbreaking research, and innovative solutions shaping tomorrow's technology landscape.
        </motion.p>
        <CountdownTimer targetDate="2025-11-29T00:00:00" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => setShowRegister(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full text-white flex items-center gap-2 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/80 transition-shadow relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles size={20} />
              Register Free
              <ArrowRight size={20} />
            </span>
          </motion.button>

          <motion.button
            onClick={() => document.getElementById('speakers')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-purple-500 rounded-full text-white flex items-center gap-2 hover:bg-purple-500/10 transition-colors backdrop-blur-sm"
          >
            <Users size={20} />
            View Speakers
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-purple-400 rounded-full" />
        </motion.div>
      </motion.div>

      {/* Registration modal rendered via portal */}
      <RegistrationModal isOpen={showRegister} onClose={() => setShowRegister(false)} />
    </section>
  );
}