import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail } from 'lucide-react@0.487.0';
import logo from "../assets/logo.png";
import { FaTelegramPlane } from 'react-icons/fa';
export function Footer() {
  const socialLinks = [
    {
      icon: Facebook,
      href: "http://facebook.com/digitalgeneration.uz",
      color: "hover:text-pink-500",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/dguzbekistan",
      color: "hover:text-pink-500",
    },
    {
      icon: FaTelegramPlane,
      href: "https://t.me/digitalgeneration_uz",
      color: "hover:text-red-600",
    },
    {
      icon: Youtube,
      href: "http://youtube.com/DigitalGenerationUzbekistan",
      color: "hover:text-red-600",
    },
  ];

  const footerLinks = {
    Bosh: ["Haqida", "Manzil", "Homiylar", "Bog'lanish"],
    // Resources: ["Blog", "News", "Press Kit", "Media"],
    "Yo'nalish": [
      <a href="/register/rsumo" rel="noopener noreferrer">
        Robo Sumo
      </a>,
      <a href="/register/contest" rel="noopener noreferrer">
        DG Contest
      </a>,

      <a href="/register/rfutbol" rel="noopener noreferrer">
        Robo Futbol
      </a>,

      <a href="/register/fixtirolar" rel="noopener noreferrer">
        Foydali ixtirolar
      </a>,
    ],
    Nizom: [
      <a
        href="/pdf.pdf"
        target="_blank" // yangi tabda ochadi
        rel="noopener noreferrer"
      >
        Nizomni ko‘rish
      </a>,
    ],
  };

  return (
    <footer
      id="bog‘lanish"
      className="relative bg-black border-t border-purple-500/20 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600 rounded-full filter blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gapp mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-8 mb-4"
            >
              <div className="w-12 h-12 from-purple-600 to-cyan-400 rounded-lg flex items-center justify-center">
                <span className="text-white"><img src={logo} alt="" /></span>
              </div>
              <div>
                <div className="text-white">Raqamli avlod</div>
              </div>
            </motion.div>
            <p className="text-gray-400 mb-6">
              Texnologiya va innovatsiyalar rivojlanishi uchun platforma. Yosh ixtirochilar va muhandislarni qo'llab-quvvatlash.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5 }}
                      className="text-gray-400 hover:text-purple-400 transition-colors inline-block"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className={`w-10 h-10 bg-purple-900/30 border border-purple-500/30 rounded-full flex items-center justify-center text-gray-400 ${social.color} transition-colors`}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-gray-500 text-sm text-center md:text-right">
            <p>© 2025 AI Day. All rights reserved.</p>
            <p className="text-xs mt-1">
              Created by{" "}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-purple-400"
              >
              
              </motion.span>{" "}
              INFINITE CO
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
