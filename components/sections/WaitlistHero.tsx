"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface WaitlistHeroProps {
  onJoinWaitlist: () => void;
}

export default function WaitlistHero({ onJoinWaitlist }: WaitlistHeroProps) {
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
      className="min-h-[90vh] bg-[#020202] text-white flex flex-col justify-center items-center text-center px-6 md:px-24 border-b border-white/5 relative overflow-hidden transition-all duration-300 pt-32 pb-24"
      style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }}
    >
      {/* Golden soft spotlight aura */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-50 md:opacity-80"
        style={{
          background: `radial-gradient(circle 500px at ${mousePos.x}px ${mousePos.y}px, rgba(243, 215, 167, 0.04), transparent 80%)`,
        }}
      />

      {/* Monospaced Active Status Ticker */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="mb-8 flex items-center gap-3 border border-white/5 bg-black/60 px-4 py-1.5 rounded-full font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#F3D7A7]/80"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10B981]" />
        <span>STATUS: COHORT 01 IN OPERATIONS // COHORT 02 WAITLIST ACTIVE</span>
      </motion.div>

      {/* High-Impact Subtitle Ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-[9px] md:text-[10px] font-mono tracking-[0.4em] text-white/30 mb-6 uppercase"
      >
        YOUR DEGREE IS OUTDATED. YOUR PORTFOLIO IS IRRELEVANT.
      </motion.div>

      {/* Mixed serif/sans-serif Main Title */}
      <motion.h1 
        initial={{ y: 30, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }} 
        className="text-[12vw] md:text-[7.5vw] font-bold leading-[0.88] tracking-tight uppercase text-center relative z-10 selection:bg-white selection:text-black font-sans mb-10"
      >
        The School of <br/>
        <span className="font-serif italic font-normal text-[#F3D7A7] lowercase tracking-normal normal-case">modern content.</span>
      </motion.h1>

      {/* August Intake tag with gold border glow */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        className="flex justify-center relative z-10 text-center mb-10"
      >
        <span className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#F3D7A7]/5 border border-[#F3D7A7]/25 rounded-full text-[#F3D7A7] text-[10px] font-bold uppercase tracking-[0.25em] shadow-[0_0_35px_rgba(243,215,167,0.08)] backdrop-blur-md transition-all duration-300 hover:border-[#F3D7A7]/40 hover:shadow-[0_0_45px_rgba(243,215,167,0.15)] hover:scale-102">
          August 2026 Intake | Waitlist Live
        </span>
      </motion.div>

      {/* Tagline describing operator mindset */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl text-white/40 text-xs md:text-sm leading-relaxed mb-12 font-mono relative z-10 uppercase tracking-widest"
      >
        The modern editor is no longer a tool-renderer. They are builder-marketer-operators who command high-ticket retainers. Build real projects, master AI workflows, and earn placement.
      </motion.p>

      {/* Centered waitlist CTA button */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        className="flex justify-center relative z-10"
      >
        <button 
          onClick={onJoinWaitlist} 
          className="bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#F3D7A7] hover:scale-105 hover:shadow-[0_0_40px_rgba(243,215,167,0.2)] transition-all duration-300 flex items-center gap-4 shadow-2xl cursor-pointer"
        >
          <span>Join the Waitlist</span>
          <ArrowRight size={16} />
        </button>
      </motion.div>
    </section>
  );
}
