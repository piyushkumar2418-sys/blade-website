"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { User } from "firebase/auth";
import Image from "next/image";

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
      className="h-screen bg-[#030303] text-white flex flex-col justify-center items-center text-center px-6 md:px-24 border-b border-white/5 relative overflow-hidden transition-all duration-300 pt-20"
      style={{
        backgroundImage: 'radial-gradient(rgba(243, 215, 167, 0.08) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Premium Glassmorphic Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#F3D7A7]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#8B5CF6]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Golden spotlight that tracks the mouse */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-60 md:opacity-100"
        style={{
          background: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, rgba(243, 215, 167, 0.05), transparent 80%)`,
        }}
      />

      {/* Floating 3D Orb Graphic in center background */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.35, scale: 1, y: [0, -20, 0] }}
        transition={{ 
          opacity: { duration: 1.5 },
          scale: { duration: 1.5 },
          y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute w-[350px] h-[350px] md:w-[600px] md:h-[600px] z-0 pointer-events-none mix-blend-screen"
      >
        <Image 
          src="/bic-orb.png" 
          alt="BIC Orb" 
          fill 
          className="object-contain filter saturate-150"
        />
      </motion.div>

      {/* Main bold title */}
      <motion.h1 
        initial={{ y: 30, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }} 
        className="text-[12vw] md:text-[7vw] font-black leading-[0.82] tracking-[-0.07em] uppercase text-center relative z-10 selection:bg-white selection:text-black font-sans"
      >
        The School of <br/> Modern Content.
      </motion.h1>

      {/* August Intake tag placed directly below the title, with solid curved background & glow */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        className="flex justify-center relative z-10 text-center mt-8 mb-16"
      >
        <span className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#F3D7A7]/10 border border-[#F3D7A7]/30 rounded-full text-[#F3D7A7] text-[11px] font-bold uppercase tracking-[0.25em] shadow-[0_0_35px_rgba(243,215,167,0.12)] backdrop-blur-md transition-all duration-300 hover:border-[#F3D7A7]/50 hover:shadow-[0_0_45px_rgba(243,215,167,0.25)] hover:scale-102">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F3D7A7] animate-pulse" />
          August 2026 Intake | Applications Open
        </span>
      </motion.div>

      {/* Centered waitlist CTA button */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        className="flex justify-center relative z-10"
      >
        <button 
          onClick={onJoinWaitlist} 
          className="bg-[#F3D7A7] text-black px-12 py-5.5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white hover:text-black hover:scale-105 hover:shadow-[0_0_40px_rgba(243,215,167,0.25)] transition-all duration-300 flex items-center gap-4 shadow-2xl group cursor-none"
        >
          <span>Apply for August Intake</span>
          <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
        </button>
      </motion.div>
    </section>
  );
}
