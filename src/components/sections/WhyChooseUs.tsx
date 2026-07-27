'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const comparisonData = [
  { left: 'Délais de livraison longs', right: 'Cycles de développement rapides' },
  { left: 'Technologies obsolètes', right: 'Stack technologique de pointe' },
  { left: 'Aucune intégration IA', right: "Solutions propulsées par l'IA" },
  { left: 'Évolutivité limitée', right: 'Conçu pour une évolutivité infinie' },
  { left: 'Support basique', right: 'Support dédié 24/7' },
  { left: 'Frais cachés', right: 'Tarification transparente' },
  { left: 'Basé sur des templates', right: 'Code 100% sur mesure' },
  { left: 'Solution générique', right: 'Sur mesure selon vos besoins' }
]

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null)
  const rowsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    if (sectionRef.current) {
      gsap.fromTo(
        rowsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      )
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <p className="text-[#0EA5FF] uppercase tracking-widest font-semibold mb-4 text-sm md:text-base">
            POURQUOI M-IT LEVELUP
          </p>
          <h2 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            La Différence Est<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5FF] to-[#00E5FF]">
              Dans les Détails
            </span>
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Headers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 mb-8 px-4">
            <div className="text-center md:text-right md:pr-12">
              <h3 className="text-xl md:text-2xl font-medium text-slate-500">Agence Traditionnelle</h3>
            </div>
            <div className="text-center md:text-left md:pl-12">
              <h3 className="text-xl md:text-2xl font-bold text-[#0EA5FF] drop-shadow-[0_0_15px_rgba(14,165,255,0.3)]">
                M-It LevelUp
              </h3>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block absolute left-1/2 top-20 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#0EA5FF] to-transparent shadow-[0_0_15px_rgba(14,165,255,0.8)] z-0" />

          {/* Rows */}
          <div className="space-y-4 md:space-y-6">
            {comparisonData.map((row, index) => (
              <motion.div 
                key={index}
                ref={(el) => { rowsRef.current[index] = el; }}
                whileHover={{ scale: 1.02 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-0 relative z-10"
              >
                {/* Left side */}
                <div className="glass rounded-xl md:rounded-r-none md:border-r-0 p-5 md:p-6 flex items-center justify-between md:pr-12 transition-colors">
                  <span className="text-slate-500 font-medium text-base md:text-lg">{row.left}</span>
                  <X className="w-5 h-5 md:w-6 md:h-6 text-red-500/50 flex-shrink-0 ml-4" />
                </div>
                
                {/* Right side */}
                <div className="glass border-[#0EA5FF]/30 shadow-[inset_0_0_20px_rgba(14,165,255,0.05)] rounded-xl md:rounded-l-none md:border-l-0 p-5 md:p-6 flex items-center gap-4 md:pl-12 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Check className="w-5 h-5 md:w-6 md:h-6 text-[#00E5FF] flex-shrink-0 relative z-10" />
                  <span className="text-slate-900 font-semibold text-base md:text-lg relative z-10">{row.right}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
