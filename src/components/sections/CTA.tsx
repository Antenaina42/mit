'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/contact@m-itlevelup.com", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error(error);
      alert("Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-fade-in',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    // Canvas particle system
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasCtx = canvas.getContext('2d');
    if (!canvasCtx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5 - 0.5; // Slight upward drift
        this.opacity = Math.random() * 0.8 + 0.2;
        const colors = ['#0EA5FF', '#3B82F6', '#00E5FF', '#0284C7'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas!.width) this.x = 0;
        if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        if (this.y < 0) this.y = canvas!.height;
      }

      draw() {
        if (!canvasCtx) return;
        canvasCtx.beginPath();
        canvasCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        canvasCtx.fillStyle = this.color;
        canvasCtx.globalAlpha = this.opacity;
        canvasCtx.fill();
      }
    }

    const init = () => {
      particles = [];
      // Reduced particle count from 150 to 80 for better performance
      for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!canvasCtx || !canvas) return;
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      canvasCtx.globalCompositeOperation = 'lighter';
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      ctx.revert();
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative w-full py-32 md:py-48 overflow-hidden bg-transparent min-h-[80vh] text-slate-900">
      {/* Cinematic Gradient Background */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(14, 165, 255, 0.15) 0%, transparent 60%),
            radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0, 229, 255, 0.15) 0%, transparent 50%)
          `
        }}
      />
      
      {/* Particles Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div className="container-custom relative z-10">
        
        <div className="text-center mb-16 contact-fade-in">
          <p className="uppercase tracking-widest text-[#0EA5FF] font-semibold mb-4 text-sm">
            CONTACTEZ-NOUS
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Prêt à <span className="gradient-text-blue">Démarrer ?</span>
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Discutons de votre projet et voyons comment nous pouvons vous aider à atteindre vos objectifs avec des solutions numériques sur mesure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 max-w-6xl mx-auto">
          
          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-8 contact-fade-in">
            <div className="glass p-8 rounded-2xl h-full flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-8">Informations</h3>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0EA5FF]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-[#0EA5FF]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Email</h4>
                    <a href="mailto:contact@m-itlevelup.com" className="text-slate-600 hover:text-[#0EA5FF] transition-colors">
                      contact@m-itlevelup.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0EA5FF]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-[#0EA5FF]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Téléphone & WhatsApp</h4>
                    <a href="https://wa.me/261345403898" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-[#0EA5FF] transition-colors">
                      +261 34 54 038 98
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0EA5FF]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[#0EA5FF]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Localisation</h4>
                    <p className="text-slate-600">
                      Madagascar
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form or Success Message */}
          <div className="lg:col-span-3 contact-fade-in">
            {isSubmitted ? (
              <div className="glass p-8 md:p-12 rounded-2xl flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                <div className="w-20 h-20 rounded-full bg-[#25D366]/10 flex items-center justify-center mb-6">
                  <CheckCircle className="text-[#25D366] w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Merci de votre confiance !</h3>
                <p className="text-slate-600 text-lg mb-8 max-w-md">
                  Votre message a bien été envoyé. Notre équipe vous répondra dans les plus brefs délais.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="btn-ghost"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form 
                ref={formRef}
                onSubmit={handleSubmit}
                className="glass p-8 md:p-10 rounded-2xl flex flex-col gap-6"
              >
                <input type="hidden" name="_subject" value="Nouveau contact depuis le site web M-It LevelUp !" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-slate-900">Nom Complet *</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name" 
                      required 
                      disabled={isSubmitting}
                      placeholder="Jean Dupont"
                      className="w-full bg-white/50 border border-black/5 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0EA5FF]/50 transition-all disabled:opacity-50"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-900">Adresse Email *</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email" 
                      required 
                      disabled={isSubmitting}
                      placeholder="jean@exemple.com"
                      className="w-full bg-white/50 border border-black/5 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0EA5FF]/50 transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-sm font-medium text-slate-900">Sujet *</label>
                  <input 
                    type="text" 
                    id="subject"
                    name="subject" 
                    required 
                    disabled={isSubmitting}
                    placeholder="Comment pouvons-nous vous aider ?"
                    className="w-full bg-white/50 border border-black/5 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0EA5FF]/50 transition-all disabled:opacity-50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-medium text-slate-900">Message *</label>
                  <textarea 
                    id="message"
                    name="message" 
                    required 
                    disabled={isSubmitting}
                    rows={5}
                    placeholder="Parlez-nous de votre projet, vos objectifs, etc."
                    className="w-full bg-white/50 border border-black/5 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0EA5FF]/50 transition-all resize-none disabled:opacity-50"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary w-full md:w-auto self-start mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? 'Envoi en cours...' : 'Envoyer le Message'}</span>
                  {!isSubmitting && <Send size={18} />}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
