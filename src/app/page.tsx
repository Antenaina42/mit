'use client';

import { useState } from 'react';
import SmoothScroll from '@/components/providers/SmoothScroll';
import LoadingScreen from '@/components/sections/LoadingScreen';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Process from '@/components/sections/Process';
import Projects from '@/components/sections/Projects';
import TechStack from '@/components/sections/TechStack';
import AISection from '@/components/sections/AISection';
import Testimonials from '@/components/sections/Testimonials';
import Statistics from '@/components/sections/Statistics';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/layout/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      <SmoothScroll>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <WhyChooseUs />
          <Process />
          <Projects />
          <TechStack />
          <AISection />
          <Testimonials />
          <Statistics />
          <CTA />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
