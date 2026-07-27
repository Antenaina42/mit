'use client';

import React, { useEffect, useRef } from 'react';
import { Search, FileText, Palette, Code, TestTube2, Rocket, HeadphonesIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: Search,
    title: 'Découverte',
    description: 'Compréhension de votre vision et de vos objectifs',
  },
  {
    icon: FileText,
    title: 'Planification',
    description: 'Stratégie, architecture et feuille de route',
  },
  {
    icon: Palette,
    title: 'Design',
    description: 'Création d\'expériences UI/UX d\'exception',
  },
  {
    icon: Code,
    title: 'Développement',
    description: 'Développement avec des technologies de pointe',
  },
  {
    icon: TestTube2,
    title: 'Tests',
    description: 'Assurance qualité rigoureuse',
  },
  {
    icon: Rocket,
    title: 'Déploiement',
    description: 'Lancement fluide et mise en production',
  },
  {
    icon: HeadphonesIcon,
    title: 'Support',
    description: 'Maintenance continue et accompagnement',
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        '.process-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );

      // Stagger reveal steps
      gsap.fromTo(
        stepsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 0.4, // Initial opacity for dimmed state
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: 'top 75%',
          },
        }
      );

      // As user scrolls the page vertically, highlight steps progressively
      // We will map the vertical scroll progress of the container to highlight steps
      const totalSteps = stepsRef.current.length;
      
      gsap.to(stepsRef.current, {
        opacity: 1,
        stagger: 0.1,
        boxShadow: '0 0 30px rgba(14, 165, 255, 0.2)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: 1,
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-padding text-slate-900" ref={containerRef}>
      <div className="container-custom">
        <div className="process-header mb-16 text-center lg:text-left">
          <p className="process-title uppercase tracking-widest text-[#0EA5FF] font-semibold mb-4 text-sm">
            NOTRE MÉTHODE
          </p>
          <h2 className="process-title text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Notre <br />
            <span className="gradient-text-blue">
              Processus Éprouvé
            </span>
          </h2>
        </div>

        {/* Desktop: 7-column grid, Tablet: scrollable, Mobile: vertical */}
        <div
          ref={scrollContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) stepsRef.current[index] = el;
                }}
                className="flex flex-col items-center relative transition-opacity duration-300"
              >
                {/* Number Badge */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0EA5FF] to-[#00E5FF] flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(14,165,255,0.5)] z-10">
                  {index + 1}
                </div>

                {/* Connector Line (Desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-[1.2rem] left-[50%] w-full h-px bg-gradient-to-r from-[#0EA5FF]/60 to-[#00E5FF]/60 -z-10" />
                )}

                {/* Card */}
                <motion.div
                  whileHover={{ scale: 1.03, borderColor: 'rgba(14, 165, 255, 0.3)' }}
                  className="mt-4 p-6 w-full glass rounded-xl flex flex-col items-center text-center transition-colors min-h-[200px]"
                >
                  <div className="mb-4 w-14 h-14 rounded-full bg-[#0EA5FF]/10 flex items-center justify-center">
                    <Icon className="text-[#0EA5FF]" size={28} />
                  </div>
                  <h3 className="text-base font-semibold mb-2 text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
