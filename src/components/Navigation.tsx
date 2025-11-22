import { useState } from 'react';
import { Menu, X, UserPlus } from 'lucide-react@0.487.0';
import { RegistrationModal } from './RegistrationModal';
import { useModal } from '../context/context';
import { Link } from 'react-router-dom';
import logo from "../assets/dg.png";
export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { showRegister, setShowRegister } = useModal();
  const [language, setLanguage] = useState('EN');

  const navLinks = ['Musobaqalar', 'Nutqchilar', 'Manzil', 'Homiylar', 'Bog‘lanish'];
  const languages = ['EN'];

  const scrollToSection = (section: string) => {
    const id = section.toLowerCase();
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const scrollToSectionMobile = (section: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const id = section.toLowerCase();
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-purple-500/20 transition-all ">
      <div className="px-20 px-8 sss">
        <div className=" mx-auto flex items-center justify-between h-20">

          {/* Logo */}
          <div className="cursor-pointer flex items-center gap-2">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-12" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link}
                onClick={() => scrollToSection(link)}
                className="text-gray-300 transition-colors duration-200 cursor-pointer"
              >
                {link}
              </div>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden backdrop-blur-lg bg-black/30 border-t border-purple-500/20 transition-all duration-300">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <div
                key={link}
                onClick={() => scrollToSectionMobile(link)}
                className="block w-full text-left text-gray-300 hover:text-purple-400 py-2 transition-colors duration-200"
              >
                {link}
              </div>
            ))}
          </div>
        </div>
      )}


    </nav>
  );
}
