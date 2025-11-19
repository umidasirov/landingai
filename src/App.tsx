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
import { FloatingRegistrationBadge } from './components/FloatingRegistrationBadge';
import { DigitalRain } from './components/DigitalRain';
import { ScrollProgress } from './components/ScrollProgress';
import { ModalProvider } from './context/context';
import { RegistrationModal } from './components/RegistrationModal';
export default function App() {
  return (
    <ModalProvider>
    <div className="min-h-screen bg-black text-white antialiased overflow-x-hidden">
      <ScrollProgress />
      <DigitalRain />
      <RegistrationModal/>
      <AIParticlesBackground />
      <Navigation />
      <FloatingRegistrationBadge />
      <main className="relative z-10">
        <HeroSection />
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
    </ModalProvider>
  );
}
