import { motion, useInView } from 'framer-motion';
import { Brain, Cpu, Network, Zap, Users, Globe, Award, Calendar } from 'lucide-react@0.487.0';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useRef, useEffect, useState } from 'react';

export function AboutSection() {
  const features = [
    { icon: Brain, text: 'AI & Machine Learning' },
    { icon: Network, text: 'Neural Networks' },
    { icon: Cpu, text: 'Deep Learning' },
    { icon: Zap, text: 'Breakthrough Research' },
  ];

  const stats = [
    { icon: Users, value: 500, suffix: '+', label: 'AI Experts' },
    { icon: Globe, value: 40, suffix: '+', label: 'Countries' },
    { icon: Award, value: 50, suffix: '+', label: 'Sessions' },
    { icon: Calendar, value: 3, suffix: '', label: 'Days' },
  ];

  function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
      if (isInView) {
        let start = 0;
        const end = value;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);

        return () => clearInterval(timer);
      }
    }, [isInView, value]);

    return <span ref={ref}>{count}{suffix}</span>;
  }

  return (
    <section id="about" className="relative py-24 lg:py-32 bg-black overflow-hidden">
      {/* Animated Background Waves */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{
            x: [0, 100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600/30 via-transparent to-cyan-600/30"
          style={{
            backgroundSize: '200% 100%',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-purple-900/30 border border-purple-500/50 rounded-full text-purple-400 mb-6"
            >
              About Conference
            </motion.div>

            <h2 className="text-4xl lg:text-5xl mb-6 text-white">
              The Future of{' '}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Artificial Intelligence
              </span>
            </h2>

            <p className="text-gray-400 mb-6">
              AI Conference 2025 brings together the world's leading experts, researchers, and innovators
              in artificial intelligence. Over three transformative days, explore the latest breakthroughs
              in machine learning, neural networks, and cognitive computing.
            </p>

            <p className="text-gray-400 mb-8">
              Network with industry pioneers, discover cutting-edge solutions, and gain insights into
              how AI is reshaping industries from healthcare to finance, robotics to natural language
              processing.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 p-4 bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-purple-500/20 rounded-xl backdrop-blur-sm group hover:border-purple-500/50 transition-all"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-shadow">
                    <feature.icon className="text-white" size={20} />
                  </div>
                  <span className="text-gray-300">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: 'spring' }}
                  className="text-center"
                >
                  <div className="mb-2 flex justify-center">
                    <div className="p-3 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 rounded-full border border-purple-500/30">
                      <stat.icon className="text-cyan-400" size={24} />
                    </div>
                  </div>
                  <div className="text-3xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Image with Effects */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl opacity-20 blur-3xl" />

            {/* Image Container */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-purple-500/30 backdrop-blur-sm">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1756908992154-c8a89f5e517f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwaG9sb2dyYW0lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MzQ4NTgzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Futuristic AI Technology"
                className="w-full h-full object-cover"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full opacity-30 blur-2xl"
            />
            <motion.div
              animate={{
                y: [0, 20, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-full opacity-30 blur-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
