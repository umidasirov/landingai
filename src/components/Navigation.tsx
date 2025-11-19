import { useState } from 'react';
import { Menu, X, UserPlus } from 'lucide-react@0.487.0';
import { motion, AnimatePresence } from 'framer-motion';
import { RegistrationModal } from './RegistrationModal';
import { useModal } from '../context/context';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { showRegister, setShowRegister } = useModal();
  const [language, setLanguage] = useState('EN');

  const navLinks = ['About', 'Speakers', 'Schedule', 'Location', 'Sponsors', 'Contact'];
  const languages = ['EN'];

  const scrollToSection = (section: string) => {
    const id = section.toLowerCase();
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const scrollToSectionMobile = (section: string) => {
    setIsMenuOpen(false);
    // wait for menu close animation
    setTimeout(() => {
      const id = section.toLowerCase();
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 350);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-purple-500/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-400 rounded-lg flex items-center justify-center">
                <span className="text-white">AI</span>
              </div>
              <div>
                <div className="text-white">AI Conference</div>
                <div className="text-xs text-purple-400">2025</div>
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.button
                key={link}
                whileHover={{ scale: 1.05, color: '#a78bfa' }}
                onClick={() => scrollToSection(link)}
                className="text-gray-300 hover:text-purple-400 transition-colors cursor-pointer"
              >
                {link}
              </motion.button>
            ))}
          </div>

          {/* Right side: language + CTA (desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex gap-2 bg-purple-900/30 rounded-full p-1">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1 rounded-full transition-all ${
                    language === lang ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <motion.button
              onClick={() => setShowRegister(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full text-white flex items-center gap-2 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80 transition-shadow"
            >
              <UserPlus size={18} />
              Register Free
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 border-t border-purple-500/20"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollToSectionMobile(link)}
                  className="block w-full text-left text-gray-300 hover:text-purple-400 py-2"
                >
                  {link}
                </button>
              ))}

              <div className="flex gap-2 py-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1 rounded-full ${
                      language === lang ? 'bg-purple-600 text-white' : 'bg-purple-900/30 text-gray-400'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setShowRegister(true);
                  setIsMenuOpen(false);
                }}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full text-white flex items-center justify-center gap-2"
              >
                <UserPlus size={18} />
                Register Free
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <RegistrationModal isOpen={showRegister} onClose={() => setShowRegister(false)} />
    </motion.nav>
  );
}
