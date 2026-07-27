'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

const row1 = [
  { name: 'Next.js', icon: '▲' },
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Node.js', icon: '🟩' },
  { name: 'Laravel', icon: '🔴' },
  { name: 'PHP', icon: '🐘' },
  { name: 'MySQL', icon: '🐬' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Supabase', icon: '🟢' },
  { name: 'Firebase', icon: '🔥' },
]

const row2 = [
  { name: 'Docker', icon: '🐳' },
  { name: 'TailwindCSS', icon: '🌊' },
  { name: 'Prisma', icon: '◭' },
  { name: 'Cloudflare', icon: '☁️' },
  { name: 'AWS', icon: '🌩️' },
  { name: 'Google Cloud', icon: '☁️' },
  { name: 'Stripe', icon: '💳' },
  { name: 'OpenAI', icon: '🧠' },
  { name: 'Claude', icon: '🤖' },
  { name: 'Gemini', icon: '✨' },
]

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )
    }
  }, [])

  return (
    <section 
      id="tech" 
      ref={sectionRef} 
      className="relative section-padding overflow-hidden"
    >
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-gradient-to-tr from-[#0EA5FF]/5 to-[#00E5FF]/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div ref={headerRef} className="text-center mb-20">
          <span className="inline-block text-[#0EA5FF] uppercase tracking-widest font-bold text-sm mb-4">
            TECHNOLOGIES
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
            Propulsé Par<br />
            <span className="gradient-text-blue">des Technologies Modernes</span>
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto flex flex-col gap-8">
          {/* Edge gradients */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

          {/* Row 1 */}
          <div className="flex overflow-hidden group">
            <div className="flex gap-4 animate-marquee group-hover:[animation-play-state:paused]">
              {[...row1, ...row1, ...row1].map((tech, idx) => (
                <motion.div
                  key={`${tech.name}-${idx}`}
                  whileHover={{ scale: 1.05 }}
                  className="glass flex items-center gap-3 px-6 py-3 rounded-xl whitespace-nowrap hover:border-[#0EA5FF]/30 transition-colors duration-300 shadow-[0_0_15px_rgba(14,165,255,0)] hover:shadow-[0_0_15px_rgba(14,165,255,0.15)]"
                >
                  <span className="text-xl">{tech.icon}</span>
                  <span className="text-slate-900 font-medium">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex overflow-hidden group">
            <div className="flex gap-4 animate-marquee-reverse group-hover:[animation-play-state:paused]">
              {[...row2, ...row2, ...row2].map((tech, idx) => (
                <motion.div
                  key={`${tech.name}-${idx}`}
                  whileHover={{ scale: 1.05 }}
                  className="glass flex items-center gap-3 px-6 py-3 rounded-xl whitespace-nowrap hover:border-[#0EA5FF]/30 transition-colors duration-300 shadow-[0_0_15px_rgba(14,165,255,0)] hover:shadow-[0_0_15px_rgba(14,165,255,0.15)]"
                >
                  <span className="text-xl">{tech.icon}</span>
                  <span className="text-slate-900 font-medium">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
