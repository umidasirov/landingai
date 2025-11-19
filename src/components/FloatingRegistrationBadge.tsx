import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react@0.487.0';
import { RegistrationModal } from './RegistrationModal';

export function FloatingRegistrationBadge() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show badge after scrolling 50% of viewport
      if (scrollPosition > windowHeight * 0.5 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="fixed right-6 bottom-6 z-40"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(168, 85, 247, 0.3)',
                  '0 0 40px rgba(168, 85, 247, 0.6)',
                  '0 0 20px rgba(168, 85, 247, 0.3)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="relative bg-gradient-to-r from-purple-600 to-cyan-500 rounded-2xl p-1"
            >
              <div className="bg-black rounded-xl p-4 pr-12">
                {/* Close Button */}
                <button
                  onClick={handleDismiss}
                  className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>

                {/* Content */}
                <div className="flex items-start gap-3">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <Sparkles className="text-yellow-400" size={24} />
                  </motion.div>
                  <div>
                    <div className="text-sm mb-1">
                      <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        100% FREE
                      </span>
                    </div>
                    <p className="text-white text-sm mb-3">
                      Join AI Conference 2025
                    </p>
                    <motion.button
                      onClick={() => setIsModalOpen(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg text-white text-sm flex items-center justify-center gap-2"
                    >
                      <Sparkles size={14} />
                      Register Now
                    </motion.button>
                  </div>
                </div>

                {/* Animated Border Glow */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-50 pointer-events-none"
                  animate={{
                    background: [
                      'linear-gradient(0deg, rgba(168, 85, 247, 0.2), rgba(34, 211, 238, 0.2))',
                      'linear-gradient(180deg, rgba(168, 85, 247, 0.2), rgba(34, 211, 238, 0.2))',
                      'linear-gradient(360deg, rgba(168, 85, 247, 0.2), rgba(34, 211, 238, 0.2))',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Registration Modal */}
      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
