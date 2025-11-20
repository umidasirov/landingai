import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SpeakersSection } from './components/SpeakersSection';
import { ScheduleSection } from './components/ScheduleSection';
import { LocationSection } from './components/LocationSection';
import { SponsorsSection } from './components/SponsorsSection';
import { Footer } from './components/Footer';
import { AIParticlesBackground } from './components/AIParticlesBackground';
import { ScrollReveal } from './components/ScrollReveal';
import { DigitalRain } from './components/DigitalRain';
import { ScrollProgress } from './components/ScrollProgress';
import { ModalProvider } from './context/context';
import { RegistrationModal } from './components/RegistrationModal';
import { BrowserRouter, Link } from 'react-router-dom';
import "./App.css"
export default function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
      <div className="min-h-screen bg-black text-white antialiased overflow-x-hidden">
        <ScrollProgress />
        {/* <DigitalRain /> */}
        <RegistrationModal />
        <AIParticlesBackground />
        <Navigation />
        <main className="relative z-10">
          <HeroSection />
          <ScrollReveal direction="up">
            <RegistrationCard />
          </ScrollReveal>
          <ScrollReveal direction="up">
            <AboutSection />
          </ScrollReveal>
          <ScrollReveal direction="scale" delay={0.2}>
            <SpeakersSection />
          </ScrollReveal>
          <ScrollReveal direction="left" delay={0.1}>
            <ScheduleSection />
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <LocationSection />
          </ScrollReveal>
          <ScrollReveal direction="scale">
            <SponsorsSection />
          </ScrollReveal>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
    </ModalProvider>
  );
}
import { Cpu, Zap, Users, Globe, Award } from 'lucide-react';

const directions = [
  {
    name: 'Robo Football',
    icon: Cpu,
    path: '/register/robofutbol',
    description: "Robotlar bilan futbol jangolari. Texnologiya va sportning mukammal uyg'unligi",
    features: ['Innovatsion texnologiyalar', 'Professional mentorlik', "Qimmatli sovg'alar"],
  },
  {
    name: 'Robo Sumo',
    icon: Zap,
    path: '/register/robosumo',
    description: "Robotlarning kuch sinov kurashi. Dohiy g'oyalar va qattiq raqobat",
    features: ['Innovatsion texnologiyalar', 'Professional mentorlik', "Qimmatli sovg'alar"],
  },
  {
    name: 'Foydali Ixtirolar',
    icon: Globe,
    path: '/register/ixtirolar',
    description: "Hayotni soddalashtiradigan aqli ixtirolar. Yangi g'oyalarni amalga oshiring",
    features: ['Innovatsion texnologiyalar', 'Professional mentorlik', "Qimmatli sovg'alar"],
  },
];

export function RegistrationCard() {
  return (
    <div className="px-4 py-10 bg-gray-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {directions.map((dir) => {
          const Icon = dir.icon;

          return (
            <div
              key={dir.name}
              className="bg-gray-800 text-white rounded-3xl p-6 shadow-2xl flex flex-col hover:scale-105 transition-transform duration-300"
            >
              {/* Icon */}
              <div className="w-20 h-20 mb-4 flex items-center justify-center bg-gray-700 rounded-full shadow-lg transition-transform duration-300 hover:scale-110">
                <Icon size={36} className="text-purple-400" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-2 text-center">{dir.name}</h3>

              {/* Description */}
              <p className="text-gray-300 text-center mb-4">{dir.description}</p>

              {/* Features */}
              <ul className="mb-6 list-disc list-inside text-gray-400 space-y-1">
                {dir.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              {/* Button */}
              <Link
                to={dir.path}
                className="mt-auto bg-purple-600 hover:bg-purple-500 text-white py-2 px-4 rounded-lg text-center font-semibold transition-colors duration-300"
              >
                Hozir qo'shilish →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
