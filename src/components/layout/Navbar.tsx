'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'À Propos', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projets', href: '#projects' },
  { name: 'Tech', href: '#tech' },
  { name: 'IA', href: '#ai' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Opacity change past hero
      if (currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    // Smooth scroll
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId) || document.querySelector(href);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuVariants = {
    hidden: { opacity: 0, y: '-100%' },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: 'circOut' as const,
        when: 'beforeChildren' as const,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: '-100%',
      transition: { duration: 0.3, ease: 'circIn' as const }
    }
  };

  const linkItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' as const }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : '-100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-2xl border-b border-black/[0.05] shadow-[0_4px_30px_rgba(0,0,0,0.1)]' 
            : 'bg-white/80 backdrop-blur-xl border-b border-black/[0.05]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => handleNavClick(e, 'body')} // simple scroll to top fallback
            className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center"
          >
            M-It<span className="text-[#0EA5FF] ml-1">LevelUp</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-slate-700 hover:text-slate-900 transition-colors text-sm font-medium animated-underline relative"
              >
                {link.name}
              </a>
            ))}
            
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-primary"
            >
              <span>Démarrer un Projet</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-slate-700 hover:text-slate-900 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-30 bg-white/98 backdrop-blur-3xl flex flex-col justify-center items-center h-screen w-full md:hidden"
          >
            <div className="flex flex-col items-center space-y-8 w-full px-6">
              {navLinks.map((link) => (
                <motion.a
                  variants={linkItemVariants}
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-slate-900 text-3xl font-bold tracking-tight hover:text-[#0EA5FF] transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a 
                variants={linkItemVariants}
                href="#contact" 
                onClick={(e) => handleNavClick(e, '#contact')}
                className="btn-primary mt-8 text-lg px-8 py-4"
              >
                <span>Démarrer un Projet</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
