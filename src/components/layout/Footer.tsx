'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';


import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (footerRef.current) {
      gsap.fromTo(footerRef.current.querySelectorAll('.footer-col'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          }
        }
      );
    }
  }, []);

  return (
    <footer ref={footerRef} className="glass-strong border-t border-slate-200 bg-white/80 backdrop-blur-2xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[300px] bg-[#0EA5FF]/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="container-custom mx-auto py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Brand & Social */}
          <div className="footer-col flex flex-col gap-6">
            <div className="text-3xl font-bold tracking-tight">
              <span className="text-slate-900">M-It </span>
              <span className="text-[#0EA5FF]">LevelUp</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
              Création d'expériences numériques d'exception, d'automatisation IA et de solutions d'entreprise évolutives pour propulser votre croissance.
            </p>
          </div>

          {/* Column 2: Company */}
          <div className="footer-col">
            <h4 className="text-slate-900 font-semibold mb-6 text-lg">Entreprise</h4>
            <ul className="flex flex-col gap-4">
              <FooterLink href="#">À Propos</FooterLink>
              <FooterLink href="#">Services</FooterLink>
              <FooterLink href="#">Projets</FooterLink>
              <FooterLink href="#">Carrières</FooterLink>
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div className="footer-col">
            <h4 className="text-slate-900 font-semibold mb-6 text-lg">Solutions</h4>
            <ul className="flex flex-col gap-4">
              <FooterLink href="#">Développement Web</FooterLink>
              <FooterLink href="#">Applications Mobiles</FooterLink>
              <FooterLink href="#">IA & Automatisation</FooterLink>
              <FooterLink href="#">Solutions Cloud</FooterLink>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div className="footer-col">
            <h4 className="text-slate-900 font-semibold mb-6 text-lg">Contact</h4>
            <ul className="flex flex-col gap-4 text-slate-600 text-sm mb-8">
              <li>
                <a href="mailto:contact@m-itlevelup.com" className="hover:text-slate-900 transition-colors">contact@m-itlevelup.com</a>
              </li>
              <li>+261 34 54 038 98</li>
              <li>Antananarivo, Madagascar</li>
            </ul>

            <h4 className="text-slate-900 font-semibold mb-4 text-sm">Restez Informé</h4>
            <form className="flex w-full group" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Entrez votre email" 
                className="bg-white/50 border border-slate-300 border-r-0 rounded-l-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-colors w-full"
              />
              <button 
                type="submit"
                className="bg-[#0EA5FF] text-white px-5 rounded-r-xl font-medium hover:bg-[#3B82F6] transition-colors flex items-center justify-center shadow-[0_0_15px_rgba(14,165,255,0.3)] hover:shadow-[0_0_25px_rgba(14,165,255,0.5)]"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-col relative pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent line-glow" />
          
          <p className="mx-auto text-center md:mx-0 md:text-left">© {new Date().getFullYear()} M-It LevelUp. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}



function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <li>
      <a 
        href={href} 
        className="text-slate-600 hover:text-[#0EA5FF] transition-colors text-sm animated-underline inline-block"
      >
        {children}
      </a>
    </li>
  );
}
