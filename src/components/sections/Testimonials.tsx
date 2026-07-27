'use client';

import React, { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ROW1_TESTIMONIALS = [
  {
    quote: "M-It LevelUp a transformé l'ensemble de notre présence numérique. Les résultats ont dépassé toutes nos attentes.",
    name: "Jean-Pierre R.",
    role: "CEO",
    company: "MadaConstruct",
    initials: "JP"
  },
  {
    quote: "Leur intégration de l'IA nous a fait gagner 40 heures par semaine de traitement manuel.",
    name: "Sarah M.",
    role: "COO",
    company: "TechVentures",
    initials: "SM"
  },
  {
    quote: "La meilleure équipe de développement avec laquelle nous ayons travaillé. Point final.",
    name: "David K.",
    role: "Founder",
    company: "IslandTours",
    initials: "DK"
  },
  {
    quote: "Notre système de réservation hôtelière a augmenté nos revenus de 300 % en 6 mois.",
    name: "Marie L.",
    role: "Director",
    company: "LuxeStay Hotels",
    initials: "ML"
  },
  {
    quote: "Professionnels, innovants et toujours en avance sur leur temps.",
    name: "Ahmed B.",
    role: "CTO",
    company: "AfriLogistics",
    initials: "AB"
  },
  {
    quote: "Ils ne se contentent pas de créer des logiciels, ils élaborent des solutions qui transforment les entreprises.",
    name: "Claudia R.",
    role: "VP",
    company: "EduGlobal",
    initials: "CR"
  }
];

const ROW2_TESTIMONIALS = [
  {
    quote: "Un souci du détail incroyable et une qualité de design époustouflante.",
    name: "Thomas N.",
    role: "Marketing Director",
    company: "GreenBuild",
    initials: "TN"
  },
  {
    quote: "Notre système ERP est désormais la colonne vertébrale de nos opérations. Impeccable.",
    name: "Patricia W.",
    role: "COO",
    company: "MadaManufacture",
    initials: "PW"
  },
  {
    quote: "Du concept au déploiement en un temps record. Vraiment impressionnant.",
    name: "Rajesh S.",
    role: "Founder",
    company: "AutoFleet",
    initials: "RS"
  },
  {
    quote: "L'application mobile qu'ils ont conçue affiche une note de 4,9 étoiles sur les deux stores.",
    name: "Lisa C.",
    role: "Product Manager",
    company: "HealthConnect",
    initials: "LC"
  },
  {
    quote: "M-It LevelUp est notre arme secrète pour la transformation numérique.",
    name: "François D.",
    role: "CEO",
    company: "MadaTech Solutions",
    initials: "FD"
  },
  {
    quote: "Un support et une maintenance exceptionnels. Ils traitent notre produit comme le leur.",
    name: "Nina K.",
    role: "Director",
    company: "SchoolSmart",
    initials: "NK"
  }
];

// Duplicate for infinite scroll
const MARQUEE_ROW1 = [...ROW1_TESTIMONIALS, ...ROW1_TESTIMONIALS];
const MARQUEE_ROW2 = [...ROW2_TESTIMONIALS, ...ROW2_TESTIMONIALS];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden bg-transparent py-32">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0EA5FF]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container-custom mx-auto mb-20">
        <div ref={headerRef} className="text-center max-w-3xl mx-auto">
          <p className="uppercase tracking-widest text-[#0EA5FF] font-semibold text-sm mb-4">TÉMOIGNAGES</p>
          <h2 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Ce Que Nos <br />
            <span className="gradient-text-blue">Clients Disent</span>
          </h2>
        </div>
      </div>

      <div className="relative flex flex-col gap-8 overflow-hidden group">
        {/* Gradient overlays for smooth fading edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

        {/* Row 1 */}
        <div className="flex gap-6 animate-marquee w-max hover:[animation-play-state:paused]">
          {MARQUEE_ROW1.map((testimonial, idx) => (
            <TestimonialCard key={`row1-${idx}`} testimonial={testimonial} />
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex gap-6 animate-marquee-reverse w-max hover:[animation-play-state:paused]">
          {MARQUEE_ROW2.map((testimonial, idx) => (
            <TestimonialCard key={`row2-${idx}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: any }) {
  return (
    <div className="glass rounded-2xl p-8 min-w-[400px] w-[400px] flex flex-col justify-between transition-all duration-300 hover:bg-white/40 hover:-translate-y-2 group cursor-pointer relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#0EA5FF]/10 blur-[50px] rounded-full group-hover:bg-[#0EA5FF]/20 transition-all duration-500 pointer-events-none" />
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-[#0EA5FF] text-[#0EA5FF]" />
        ))}
      </div>
      <p className="text-slate-600 text-lg italic mb-8 flex-grow leading-relaxed">
        "{testimonial.quote}"
      </p>
      
      <div className="flex items-center gap-4 mt-auto">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0EA5FF] to-[#3B82F6] flex items-center justify-center text-white font-bold text-lg border border-white/20">
          {testimonial.initials}
        </div>
        <div>
          <h4 className="text-slate-900 font-semibold">{testimonial.name}</h4>
          <p className="text-sm text-slate-600">{testimonial.role}, {testimonial.company}</p>
        </div>
      </div>
    </div>
  );
}
