'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Globe,
  AppWindow,
  Smartphone,
  Building2,
  Database,
  Users,
  Brain,
  Zap,
  Cloud,
  Palette,
  Plug,
  Wrench,
  Server,
  Search,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'Sites Web Sur Mesure',
    description: 'Des sites web réactifs et captivants qui convertissent',
  },
  {
    icon: AppWindow,
    title: 'Applications Web',
    description: 'Des applications web évolutives basées sur des technologies modernes',
  },
  {
    icon: Smartphone,
    title: 'Applications Mobiles',
    description: 'Applications mobiles natives et multi-plateformes',
  },
  {
    icon: Building2,
    title: 'Logiciels Métier',
    description: 'Solutions sur mesure adaptées à vos opérations',
  },
  {
    icon: Database,
    title: 'Systèmes ERP',
    description: "Solutions de planification des ressources d'entreprise",
  },
  {
    icon: Users,
    title: 'Solutions CRM',
    description: 'Outils de gestion de la relation client',
  },
  {
    icon: Brain,
    title: 'Intégrations IA',
    description: "Automation intelligente grâce à l'intelligence artificielle",
  },
  {
    icon: Zap,
    title: 'Automatisation',
    description: 'Optimisez vos processus et boostez votre efficacité',
  },
  {
    icon: Cloud,
    title: 'Solutions Cloud',
    description: 'Infrastructure cloud évolutive et déploiement',
  },
  {
    icon: Palette,
    title: 'Design UI/UX',
    description: 'Des interfaces élégantes appréciées de vos utilisateurs',
  },
  {
    icon: Plug,
    title: 'Développement API',
    description: 'APIs robustes et intégrations de systèmes',
  },
  {
    icon: Wrench,
    title: 'Maintenance',
    description: 'Accompagnement continu et optimisation',
  },
  {
    icon: Server,
    title: 'Hébergement',
    description: "Solutions d'hébergement rapides et fiables",
  },
  {
    icon: Search,
    title: 'SEO',
    description: 'Améliorez votre positionnement et générez du trafic qualifié',
  },
  {
    icon: ShieldCheck,
    title: 'Cybersécurité',
    description: 'Protégez vos actifs numériques et vos données',
  },
  {
    icon: MessageSquare,
    title: 'Conseil & Stratégie',
    description: 'Expertise technique et accompagnement stratégique',
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.services-header',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-header',
            start: 'top 85%',
          },
        }
      )

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" className="section-padding relative overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="services-header max-w-3xl mb-16">
          <p className="text-[#0EA5FF] uppercase tracking-widest text-sm font-semibold mb-4">
            NOS SERVICES
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Des Services Qui <br />
            <span className="gradient-text-blue">Accélèrent la Croissance</span>
          </h2>
          <p className="text-slate-600 text-lg md:text-xl">
            Des solutions digitales complètes pour les entreprises de toute taille.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                className="glass rounded-2xl p-6 cursor-pointer"
                whileHover={{ 
                  scale: 1.02, 
                  y: -4,
                  borderColor: 'rgba(14, 165, 255, 0.3)'
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div className="bg-[#0EA5FF]/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <Icon size={28} color="#0EA5FF" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mt-4">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
