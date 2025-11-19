import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // Smoother, less CPU usage
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Top Progress Bar (very light) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Circular Progress Indicator (optimized) */}
      <div className="fixed bottom-6 left-6 z-40 hidden lg:block">
        <svg width="60" height="60" className="transform -rotate-90">
          {/* Background Circle */}
          <circle
            cx="30"
            cy="30"
            r="25"
            stroke="rgba(168, 85, 247, 0.15)"
            strokeWidth="4"
            fill="none"
          />

          {/* Progress Circle */}
          <motion.circle
            cx="30"
            cy="30"
            r="25"
            stroke="url(#scrollGradient)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            style={{ pathLength: scrollYProgress }}
          />
          
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>

        {/* AI Text (optimized) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-xs bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          style={{ opacity: scrollYProgress }}
        >
          AI
        </motion.div>
      </div>
    </>
  );
}
