'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'ConstructionPro CRM',
    description: 'Gestion de projet complète et suivi client pour les entreprises du bâtiment',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    gradient: 'from-[#1e3a5f] to-[#0EA5FF]',
  },
  {
    id: 2,
    title: 'AutoFleet Manager',
    description: 'Gestion globale de parc automobile avec suivi GPS',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    gradient: 'from-[#1a1a2e] to-[#3B82F6]',
  },
  {
    id: 3,
    title: 'LuxeStay Booking',
    description: 'Système de réservation hôtelière haut de gamme avec disponibilité en temps réel',
    tags: ['Next.js', 'Supabase', 'Stripe', 'TailwindCSS'],
    gradient: 'from-[#2d1b4e] to-[#00E5FF]',
  },
  {
    id: 4,
    title: 'IslandTours Platform',
    description: 'Plateforme de découverte touristique et de réservation pour Madagascar',
    tags: ['React', 'Laravel', 'MySQL', 'Google Maps'],
    gradient: 'from-[#0d3b2e] to-[#0EA5FF]',
  },
  {
    id: 5,
    title: 'EnterprisFlow ERP',
    description: 'Système ERP d\'entreprise complet à architecture multi-modules',
    tags: ['TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    gradient: 'from-[#2a1f0d] to-[#3B82F6]',
  },
  {
    id: 6,
    title: 'EduConnect',
    description: 'Gestion scolaire numérique avec portails élèves et parents',
    tags: ['Next.js', 'Firebase', 'React Native'],
    gradient: 'from-[#1b2d3e] to-[#00E5FF]',
  },
  {
    id: 7,
    title: 'MedTrack Pro',
    description: 'Gestion des patients et système de dossiers médicaux',
    tags: ['React', 'Node.js', 'PostgreSQL', 'HIPAA'],
    gradient: 'from-[#2d1521] to-[#0EA5FF]',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Cards Staggered Reveal
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const leftColumnProjects = projects.filter((_, i) => i % 2 === 0);
  const rightColumnProjects = projects.filter((_, i) => i % 2 !== 0);

  const ProjectCard = ({ project, index, isRightColumn }: { project: any; index: number; isRightColumn: boolean }) => (
    <motion.div
      ref={(el) => {
        const globalIndex = isRightColumn ? index * 2 + 1 : index * 2;
        cardsRef.current[globalIndex] = el;
      }}
      className="glass rounded-2xl overflow-hidden flex flex-col group"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className={`relative h-[300px] w-full bg-gradient-to-br ${project.gradient} overflow-hidden flex items-center justify-center p-8`}>
        <motion.div 
          className="absolute inset-0 bg-black/20"
          whileHover={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[2px]" />
        
        <motion.h3 
          className="relative text-3xl md:text-4xl font-bold text-white text-center z-10 opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out drop-shadow-lg"
        >
          {project.title}
        </motion.h3>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-slate-900 mb-3">{project.title}</h3>
        <p className="text-slate-600 text-lg mb-6 flex-grow">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag: string, i: number) => (
            <span 
              key={i} 
              className="px-3 py-1 text-sm text-slate-600 glass rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

      </div>
    </motion.div>
  );

  return (
    <section id="projects" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background glowing orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0EA5FF]/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#3B82F6]/10 rounded-full blur-[150px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

      <div className="container-custom relative z-10">
        <div ref={headerRef} className="mb-20 md:mb-32 max-w-3xl">
          <p className="text-[#0EA5FF] font-bold tracking-widest uppercase mb-4 flex items-center gap-3 text-sm">
            <span className="w-8 h-[2px] bg-[#0EA5FF] inline-block" />
            NOS RÉALISATIONS
          </p>
          <h2 className="text-6xl md:text-8xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-8">
            Projets <br />
            <span className="gradient-text-blue">Phares</span>
          </h2>
          <p className="text-slate-600 text-xl md:text-2xl max-w-2xl leading-relaxed">
            Des solutions concrètes pour des entreprises réelles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col gap-8">
            {leftColumnProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} isRightColumn={false} />
            ))}
          </div>
          
          <div className="flex flex-col gap-8 md:mt-24">
            {rightColumnProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} isRightColumn={true} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
