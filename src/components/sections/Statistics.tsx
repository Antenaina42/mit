'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const STATS = [
  { value: 150, label: 'Projets', suffix: '+' },
  { value: 80, label: 'Clients', suffix: '+' },
  { value: 500, label: 'Lignes de Code', suffix: 'K+' },
  { value: 12, label: 'Pays', suffix: '+' },
  { value: 10, label: 'Cafés', suffix: 'K+' },
  { value: 300, label: 'Déploiements', suffix: '+' },
];

export default function Statistics() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (gridRef.current) {
      const children = gridRef.current.children;
      gsap.fromTo(children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative bg-transparent py-24 overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-[url('/mesh-bg.png')] opacity-10 mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] via-transparent to-[#F8FAFC] pointer-events-none" />
      
      {/* Top Divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] line-glow opacity-50" style={{ background: 'linear-gradient(90deg, transparent, rgba(14, 165, 255, 0.5), transparent)' }} />

      <div className="container-custom mx-auto relative z-10">
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12">
          {STATS.map((stat, index) => (
            <StatCounter key={index} target={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] line-glow opacity-50" style={{ background: 'linear-gradient(90deg, transparent, rgba(14, 165, 255, 0.5), transparent)' }} />
    </section>
  );
}

function StatCounter({ target, suffix, label }: { target: number, suffix: string, label: string }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();
          
          const updateCounter = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            if (elapsedTime < duration) {
              const progress = elapsedTime / duration;
              // ease out quad
              const easeOut = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(target * easeOut));
              requestAnimationFrame(updateCounter);
            } else {
              setCount(target);
            }
          };
          
          requestAnimationFrame(updateCounter);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={counterRef} className="flex flex-col items-center justify-center text-center p-4">
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text-blue mb-3">
        {count}{suffix}
      </div>
      <div className="text-sm text-slate-600 uppercase tracking-wider font-medium">
        {label}
      </div>
    </div>
  );
}
