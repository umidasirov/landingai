import { motion, useScroll, useTransform } from 'motion/react';
import { Brain, Cpu, Zap, Network, Bot, Sparkles } from 'lucide-react@0.487.0';

export function AIParticlesBackground() {
  const { scrollYProgress } = useScroll();
  
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [360, 0]);

  const icons = [
    { Icon: Brain, color: 'text-purple-400', delay: 0 },
    { Icon: Cpu, color: 'text-cyan-400', delay: 0.5 },
    { Icon: Zap, color: 'text-pink-400', delay: 1 },
    { Icon: Network, color: 'text-blue-400', delay: 1.5 },
    { Icon: Bot, color: 'text-violet-400', delay: 2 },
    { Icon: Sparkles, color: 'text-fuchsia-400', delay: 2.5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating gradient orbs that move with scroll */}
      <motion.div
        style={{ opacity: opacity1, rotate: rotate1 }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-10"
      />
      <motion.div
        style={{ opacity: opacity2, rotate: rotate2 }}
        className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-cyan-600 rounded-full filter blur-3xl opacity-10"
      />

      {/* Floating AI Icons */}
      {icons.map(({ Icon, color, delay }, index) => (
        <motion.div
          key={index}
          className="absolute hidden lg:block"
          style={{
            left: `${15 + (index * 15)}%`,
            top: `${20 + (index * 12)}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 8,
            delay: delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="p-3 bg-gradient-to-br from-purple-900/20 to-transparent backdrop-blur-sm border border-purple-500/20 rounded-xl">
            <Icon className={color} size={28} />
          </div>
        </motion.div>
      ))}

      {/* Animated grid pattern */}
      <motion.div
        style={{ opacity: opacity1 }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(168, 85, 247, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </motion.div>

      {/* Scanning line effect */}
      <motion.div
        animate={{
          y: ['0%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-20"
      />
    </div>
  );
}
