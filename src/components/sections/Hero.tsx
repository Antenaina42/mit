'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Brain, Code, Gauge, BarChart, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(14, 165, 255, 0.4)'; // #0EA5FF blue
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(titleRef.current.children, 
          { y: 40, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out', delay: 0.2 }
        );
      }
      
      if (subtitleRef.current && ctaRef.current) {
        gsap.fromTo([subtitleRef.current, ctaRef.current],
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: 'power3.out', delay: 0.8 }
        );
      }

      gsap.to(sectionRef.current, {
        opacity: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30; // Max 15 deg
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    setMousePos({ x, y });
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden gradient-mesh-animated text-slate-900 pt-20 pb-20"
      onMouseMove={handleMouseMove}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none"
      />

      <div className="container-custom relative z-10 w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side (60% -> 7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-8">
          
          <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full w-fit">
            <span className="text-sm font-medium">🚀 Architectes Digitaux de Madagascar</span>
          </div>

          <div ref={titleRef} className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none">
            <div className="block pb-2">Créer.</div>
            <div className="block pb-2">Innover.</div>
            <div className="block gradient-text-blue">Évoluer.</div>
          </div>

          <p ref={subtitleRef} className="text-lg text-slate-600 max-w-xl opacity-0">
            Nous créons des sites web, logiciels métiers, solutions IA et applications mobiles de classe mondiale pour les entreprises qui veulent croître plus vite.
          </p>

          <div ref={ctaRef} className="flex flex-col space-y-8 opacity-0">
            <div className="flex flex-wrap items-center gap-4">
              <a href="#contact" className="btn-primary flex items-center space-x-2 bg-[#0EA5FF] hover:bg-[#3B82F6] text-white px-8 py-4 rounded-full font-medium transition-all">
                <span>Démarrer Votre Projet</span>
                <ArrowRight size={20} />
              </a>
              <button 
                onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-chatbot')); }}
                className="btn-ghost glass hover:bg-[#0EA5FF]/10 text-[#0EA5FF] px-8 py-4 rounded-full font-medium transition-all flex items-center space-x-2 border border-[#0EA5FF]/30"
              >
                <Sparkles size={20} />
                <span>Discuter avec Pounie IA</span>
              </button>
            </div>

            <div className="flex items-center gap-8 pt-4 border-t border-black/[0.05]">
              <div className="flex flex-col">
                <span className="text-2xl font-bold">150+</span>
                <span className="text-sm text-slate-600">Projets</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">80+</span>
                <span className="text-sm text-slate-600">Clients</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">12+</span>
                <span className="text-sm text-slate-600">Pays</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side (40% -> 5 cols) */}
        <div className="hidden lg:block lg:col-span-5 relative h-[600px] perspective-[1000px]">
          <div 
            className="absolute inset-0 w-full h-full transition-transform duration-200 ease-out flex items-center justify-center"
            style={{ 
              transform: `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* 1. Analytics Dashboard */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="absolute top-10 right-0 w-64 glass p-4 rounded-2xl animate-float-slow"
              style={{ transform: 'translateZ(60px)' }}
            >
              <div className="flex items-center space-x-2 mb-4 text-[#0EA5FF]">
                <BarChart size={20} />
                <span className="font-semibold text-sm">Tableau de Bord</span>
              </div>
              <div className="flex items-end space-x-2 h-20">
                <div className="w-1/4 bg-white/[0.1] rounded-t-sm h-[40%]"></div>
                <div className="w-1/4 bg-[#0EA5FF] rounded-t-sm h-[70%]"></div>
                <div className="w-1/4 bg-[#00E5FF] rounded-t-sm h-[90%]"></div>
                <div className="w-1/4 bg-white/[0.1] rounded-t-sm h-[50%]"></div>
              </div>
            </motion.div>

            {/* 2. AI Engine */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="absolute bottom-20 right-10 w-48 glass p-6 rounded-2xl animate-float"
              style={{ transform: 'translateZ(100px)' }}
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="p-4 bg-[#3B82F6]/20 rounded-full animate-pulse">
                  <Brain size={32} className="text-[#3B82F6]" />
                </div>
                <span className="font-semibold text-sm">Moteur IA</span>
              </div>
            </motion.div>

            {/* 3. Mobile App */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-80 glass p-2 rounded-[2rem] animate-float-delayed"
              style={{ transform: 'translateZ(40px)' }}
            >
              <div className="w-full h-full glass rounded-[1.5rem] p-4 flex flex-col">
                <div className="w-12 h-1 bg-black/10 rounded-full mx-auto mb-4"></div>
                <div className="flex-1 space-y-3">
                  <div className="w-full h-20 bg-gradient-to-br from-[#0EA5FF] to-[#3B82F6] rounded-xl opacity-80"></div>
                  <div className="w-full h-8 bg-white/5 rounded-md"></div>
                  <div className="w-3/4 h-8 bg-white/5 rounded-md"></div>
                </div>
              </div>
            </motion.div>

            {/* 4. Code */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="absolute top-0 left-10 w-56 glass p-4 rounded-xl animate-float"
              style={{ transform: 'translateZ(80px)' }}
            >
              <div className="flex items-center space-x-2 mb-3">
                <Code size={16} className="text-[#00E5FF]" />
                <span className="text-xs font-mono text-slate-600">app.tsx</span>
              </div>
              <div className="space-y-2 font-mono text-[10px] text-slate-700">
                <div><span className="text-[#0EA5FF]">const</span> app = <span className="text-[#00E5FF]">() =&gt;</span> {'{'}</div>
                <div className="pl-4">return &lt;LevelUp /&gt;</div>
                <div>{'}'}</div>
              </div>
            </motion.div>

            {/* 5. Performance */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="absolute bottom-0 left-1/4 w-40 glass p-4 rounded-full aspect-square flex flex-col items-center justify-center animate-float-slow"
              style={{ transform: 'translateZ(120px)' }}
            >
              <Gauge size={32} className="text-[#00E5FF] mb-2" />
              <span className="text-2xl font-bold">99<span className="text-sm">%</span></span>
              <span className="text-[10px] text-slate-600 uppercase tracking-wider">Performance</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
