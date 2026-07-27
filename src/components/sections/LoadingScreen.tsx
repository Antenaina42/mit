'use client'

import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'

interface LoadingScreenProps {
  onComplete?: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  
  // Canvas Particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height
    
    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    window.addEventListener('resize', resize)
    
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      
      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.5 + 0.1
      }
      
      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.x > width) this.x = 0
        if (this.x < 0) this.x = width
        if (this.y > height) this.y = 0
        if (this.y < 0) this.y = height
      }
      
      draw() {
        if (!ctx) return
        ctx.fillStyle = `rgba(14, 165, 255, ${this.opacity})` // #0EA5FF
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    
    const particles = Array.from({ length: 60 }, () => new Particle())
    let animationFrameId: number
    
    const render = () => {
      ctx.clearRect(0, 0, width, height)
      particles.forEach(p => {
        p.update()
        p.draw()
      })
      animationFrameId = requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])
  
  // Animations and loading logic
  useEffect(() => {
    const tl = gsap.timeline()
    
    // 1. Reveal logo letters
    if (logoRef.current) {
      const chars = Array.from(logoRef.current.children)
      tl.fromTo(
        chars,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.08, 
          ease: 'power3.out' 
        }
      )
    }
    
    // 2. Fade in tagline
    if (taglineRef.current) {
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.4'
      )
    }
    
    // 3. Counter 0 to 100
    const counterObj = { val: 0 }
    gsap.to(counterObj, {
      val: 100,
      duration: 2.5,
      ease: 'power1.inOut',
      onUpdate: () => {
        setProgress(Math.round(counterObj.val))
      },
      onComplete: () => {
        // 4. Exit Animation
        gsap.to(containerRef.current, {
          yPercent: -100,
          opacity: 0,
          duration: 1.2,
          ease: 'power4.inOut',
          delay: 0.2, // short pause at 100%
          onComplete: () => {
            if (onComplete) onComplete()
          }
        })
      }
    })
  }, [onComplete])

  const logoText = "M-It LevelUp"

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F8FAFC] overflow-hidden"
    >
      {/* Background Particles */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none"
      />
      
      {/* Glowing Horizontal Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[25%] left-[-100%] w-[200%] h-[1px] bg-gradient-to-r from-transparent via-[#0EA5FF] to-transparent opacity-20 animate-[slideRight_4s_linear_infinite]" />
        <div className="absolute top-[75%] right-[-100%] w-[200%] h-[1px] bg-gradient-to-l from-transparent via-[#00E5FF] to-transparent opacity-20 animate-[slideLeft_5s_linear_infinite]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 
          ref={logoRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter flex space-x-[2px] mb-6 drop-shadow-[0_0_20px_rgba(14,165,255,0.4)]"
        >
          {logoText.split('').map((char, i) => (
            <span 
              key={i} 
              className={char === ' ' ? 'w-4 md:w-6' : 'text-slate-900'}
            >
              {char}
            </span>
          ))}
        </h1>
        
        <p 
          ref={taglineRef}
          className="text-slate-600 text-sm md:text-base lg:text-lg font-light tracking-[0.3em] uppercase mb-16 opacity-0"
        >
          Nous Construisons le Futur du Digital.
        </p>

        {/* Loading Bar & Counter */}
        <div className="flex flex-col items-center w-64 md:w-80">
          <div className="text-[#0EA5FF] font-mono text-4xl font-light mb-4 drop-shadow-[0_0_10px_rgba(14,165,255,0.8)]">
            {progress}%
          </div>
          <div className="w-full h-[2px] bg-white/[0.08] rounded-full overflow-hidden relative">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#0EA5FF] to-[#00E5FF] shadow-[0_0_15px_#0EA5FF]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(50%); }
        }
        @keyframes slideLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  )
}
