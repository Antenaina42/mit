'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { Lightbulb, Award, Handshake, Shield } from 'lucide-react'

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const AnimatedCounter = ({ target, suffix = "", duration = 2000 }: { target: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTime: number | null = null
          let animationFrame: number

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = timestamp - startTime
            const percentage = Math.min(progress / duration, 1)
            
            // easeOutExpo easing function
            const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage)
            
            setCount(Math.floor(target * easeOut))

            if (progress < duration) {
              animationFrame = requestAnimationFrame(animate)
            } else {
              setCount(target)
            }
          }

          animationFrame = requestAnimationFrame(animate)
          if (ref.current) {
            observer.unobserve(ref.current)
          }
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [target, duration])

  return (
    <div ref={ref} className="text-5xl font-bold gradient-text-blue mb-2">
      {count}{suffix}
    </div>
  )
}

const stats = [
  { target: 8, suffix: '+', label: "Années d'Expérience" },
  { target: 150, suffix: '+', label: 'Projets Réalisés' },
  { target: 80, suffix: '+', label: 'Clients Satisfaits' },
  { target: 12, suffix: '+', label: 'Pays Desservis' }
]

const values = [
  { icon: Lightbulb, title: 'Innovation', desc: 'Nous repoussons les limites grâce aux technologies de pointe' },
  { icon: Award, title: 'Excellence', desc: "Une qualité d'exception dans chaque ligne de code" },
  { icon: Handshake, title: 'Partenariat', desc: 'Votre succès est notre réussite' },
  { icon: Shield, title: 'Fiabilité', desc: 'Des livraisons rigoureuses, toujours dans les temps' }
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal animation
      gsap.fromTo(headerRef.current?.children ? Array.from(headerRef.current.children) : [], 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          }
        }
      )

      // Stats counters reveal animation
      gsap.fromTo(statsRef.current?.children ? Array.from(statsRef.current.children) : [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
          }
        }
      )

      // Glass cards reveal animation
      gsap.fromTo(valuesRef.current?.children ? Array.from(valuesRef.current.children) : [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 80%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="section-padding text-slate-900 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header Section */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-24">
          <span className="text-[#0EA5FF] text-sm font-medium tracking-widest uppercase mb-6 block">
            QUI SOMMES-NOUS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Pas Seulement des Développeurs.<br />
            <span className="gradient-text-blue">Des Architectes Digitaux.</span>
          </h2>
          <p className="text-slate-600 max-w-3xl text-lg leading-relaxed">
            Basée à Madagascar, M-It LevelUp est une agence digitale d'excellence dédiée à la transformation globale des entreprises. Nous allions design artistique et ingénierie de pointe pour créer des expériences web évolutives et immersives qui subliment votre marque et propulsent vos résultats.
          </p>
        </div>

        {/* Animated Counters Grid */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-32">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              <span className="text-slate-600 font-medium mt-2">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Core Values Glass Cards */}
        <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, idx) => {
            const Icon = value.icon
            return (
              <motion.div 
                key={idx}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass rounded-2xl p-8 flex flex-col items-start"
              >
                <div className="w-14 h-14 rounded-xl bg-[#0EA5FF]/10 flex items-center justify-center mb-6">
                  <Icon size={28} color="#0EA5FF" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
