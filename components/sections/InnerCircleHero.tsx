"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { User } from "firebase/auth";

interface InnerCircleHeroProps {
  user: User | null;
  onJoinWaitlist: () => void;
}

export default function InnerCircleHero({ user, onJoinWaitlist }: InnerCircleHeroProps) {
  // Interactive Cursor-Reactive Spotlight Glow
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    
    const handleMouseLeave = () => {
      setMousePos({ x: -1000, y: -1000 });
    };

    const element = heroRef.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
    }
    
    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="h-screen bg-[#030303] text-white flex flex-col justify-center px-6 md:px-24 border-b border-white/5 text-left relative overflow-hidden transition-all duration-300"
      style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }}
    >
      {/* Golden spotlight that tracks the mouse */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-60 md:opacity-100"
        style={{
          background: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, rgba(243, 215, 167, 0.08), transparent 80%)`,
        }}
      />

      <div className="flex justify-between items-start mb-8 text-left relative z-10">
        <motion.span 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-xs uppercase tracking-[0.5em] font-bold block text-white/45 text-left"
        >
          Blade Inner Circle
        </motion.span>
      </div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.2, duration: 0.8 }} 
        className="text-[13vw] md:text-[9.5vw] font-black leading-[0.82] tracking-[-0.07em] uppercase mb-6 text-left relative z-10 selection:bg-white selection:text-black"
      >
        The School of <br/> Modern Content.
      </motion.h1>

      {/* August Intake tag placed directly below the main title */}
      <div className="flex relative z-10 text-left mb-12">
        <span className="text-[#F3D7A7] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] border border-[#F3D7A7]/30 bg-[#F3D7A7]/5 px-4 py-2 rounded-sm text-left backdrop-blur-md">
          August 2026 Intake // Cohort 02 Waitlist
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 text-left relative z-10">
        <p className="text-2xl md:text-4xl text-white/60 leading-tight font-medium max-w-2xl text-left">
          Build your agency. <br /> From skill to first income.
        </p>
        
        <div className="flex flex-col items-start md:items-end gap-6 text-left">
          <button 
            onClick={onJoinWaitlist} 
            className="bg-white text-black px-12 py-6 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#F3D7A7] hover:scale-105 transition-all duration-300 flex items-center gap-4 shadow-2xl text-left group cursor-none"
          >
            Request waitlist entry 
            <Terminal size={16} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
