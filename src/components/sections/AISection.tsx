'use client'

import { useEffect, useRef } from 'react'
import { Bot, Workflow, FileSearch, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function AISection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Canvas animation
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    let animationFrameId: number
    
    // Set canvas size
    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      canvas.width = rect?.width || 400
      canvas.height = rect?.height || 400
    }
    
    resize()
    window.addEventListener('resize', resize)
    
    class Node {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      baseRadius: number
      angle: number
      
      constructor(width: number, height: number) {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.baseRadius = Math.random() * 2 + 2
        this.radius = this.baseRadius
        this.angle = Math.random() * Math.PI * 2
      }
      
      update(width: number, height: number) {
        this.x += this.vx
        this.y += this.vy
        
        if (this.x < 0 || this.x > width) this.vx *= -1
        if (this.y < 0 || this.y > height) this.vy *= -1
        
        // Pulse
        this.angle += 0.05
        this.radius = this.baseRadius + Math.sin(this.angle) * 1.5
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = '#0EA5FF'
        ctx.shadowBlur = 15
        ctx.shadowColor = '#0EA5FF'
        ctx.fill()
        ctx.shadowBlur = 0 // Reset shadow for lines
      }
    }
    
    const nodes: Node[] = Array.from({ length: 25 }, () => new Node(canvas.width, canvas.height))
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Update nodes
      nodes.forEach(node => node.update(canvas.width, canvas.height))
      
      // Draw connections
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            const alpha = 1 - dist / 100
            ctx.strokeStyle = `rgba(14, 165, 255, ${alpha * 0.3})`
            ctx.stroke()
          }
        }
      }
      
      // Draw nodes
      nodes.forEach(node => node.draw(ctx))
      
      animationFrameId = requestAnimationFrame(render)
    }
    
    render()

    // Scroll Animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    })

    if (headerRef.current) {
      tl.fromTo(headerRef.current.children, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
      )
    }
    
    if (canvasRef.current) {
      tl.fromTo(canvasRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
        '-=0.4'
      )
    }

    if (cardsRef.current) {
      tl.fromTo(cardsRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        '-=0.6'
      )
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const capabilities = [
    {
      icon: <Bot size={32} className="text-[#00E5FF]" />,
      title: 'Chatbots IA',
      description: 'Agents conversationnels intelligents qui comprennent le contexte et fournissent des réponses quasi humaines pour le support client.'
    },
    {
      icon: <Workflow size={32} className="text-[#00E5FF]" />,
      title: 'Automatisation des Flux',
      description: 'Automatisez les tâches répétitives et les processus métier grâce à des flux de travail intelligents guidés par l\'IA.'
    },
    {
      icon: <FileSearch size={32} className="text-[#00E5FF]" />,
      title: 'IA Documentaire',
      description: 'Extrayez des informations clés des documents, factures et contrats grâce au traitement documentaire avancé.'
    },
    {
      icon: <TrendingUp size={32} className="text-[#00E5FF]" />,
      title: 'Analyses Prédictives',
      description: 'Prédictions et analyses basées sur les données pour prendre des décisions stratégiques plus éclairées.'
    }
  ]

  return (
    <section id="ai" ref={sectionRef} className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0EA5FF]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div ref={headerRef} className="max-w-3xl mb-16 md:mb-24">
          <p className="text-[#0EA5FF] tracking-widest uppercase font-semibold mb-4 text-sm md:text-base">
            INTELLIGENCE ARTIFICIELLE
          </p>
          <h2 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight mb-6">
            Solutions <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5FF] to-[#00E5FF]">
              Propulsées par l'IA
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl">
            Exploitez la puissance de l'intelligence artificielle pour automatiser, prédire et innover.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="w-full aspect-square md:h-[500px] glass rounded-3xl overflow-hidden relative flex items-center justify-center">
            <canvas 
              ref={canvasRef} 
              className="w-full h-full block"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#F8FAFC] via-transparent to-[#F8FAFC]/20 pointer-events-none" />
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((cap, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4, borderColor: 'rgba(0, 229, 255, 0.3)' }}
                className="glass rounded-2xl p-6 transition-colors duration-300"
              >
                <div className="mb-4 glass w-14 h-14 rounded-xl flex items-center justify-center">
                  {cap.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mt-4">{cap.title}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
