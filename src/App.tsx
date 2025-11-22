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
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { TypingEffect } from './components/TypingEffect';
import Register from './components/register';
import "./App.css"
import { CountdownTimer } from './components/ui/CountdownTimer';
export default function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <ScrollProgress />
        {/* <DigitalRain /> */}
        <AIParticlesBackground />

        {/* Container: full-screen, flex column */}
        <div className="min-h-screen flex flex-col bg-black text-white antialiased">

          {/* NAVBAR */}

          {/* MAIN CONTENT */}
          <div className="flex-1">
            <Routes>
              <Route path="/register/:id" element={<Register />} />

              <Route
                path="/"
                element={
                  <main className="flex-1 w-full">
                    <Navigation />
                    <HeroSection />
                    <ScrollReveal direction="up">
                      <AboutSection />
                    </ScrollReveal>
                    <ScrollReveal direction="up" delay={0.04}>
                      <SpeakersSection />
                    </ScrollReveal>
                    {/* <ScrollReveal direction="up" delay={0.04}>
                      <ScheduleSection />
                    </ScrollReveal> */}
                    <ScrollReveal direction="up" delay={0.04}>
                      <LocationSection />
                    </ScrollReveal>
                    <ScrollReveal direction="up">
                      <SponsorsSection />
                    </ScrollReveal>
                    <Footer />
                  </main>
                }
              />
            </Routes>
          </div>

          {/* FOOTER doim pastda */}
        </div>
      </BrowserRouter>
    </ModalProvider>
  );
}