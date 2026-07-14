"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { User } from "firebase/auth";

interface InnerCircleHeroProps {
  user: User | null;
  onJoinWaitlist: () => void;
}

const words = ["CREATE", "MARKET", "SELL", "BUILD"];

export default function InnerCircleHero({ user, onJoinWaitlist }: InnerCircleHeroProps) {
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  return (
    <section 
      className="h-screen w-full text-white relative overflow-hidden transition-all duration-300 bg-[#050505]"
    >
      {/* Background Video (Preserved Exactly) */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-100"
      >
        <source src="/bic_bg_final.mp4" type="video/mp4" />
      </video>

      {/* Bottom fade out to blend with the next section (Preserved Exactly) */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-10" />

      {/* Subtle Design Grid Overlay (Spector Style, 5% Opacity) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute inset-0 z-10 pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '55px 55px',
        }}
      />

      {/* Main Container */}
      <div className="relative w-full h-full z-20 px-6 md:px-12 flex flex-col justify-between pt-24 pb-8 md:pt-0">
        
        {/* CENTER VISUAL ANCHOR: MAIN HEADLINE */}
        <div className="flex-grow flex flex-col justify-center items-start md:pl-16">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }} 
            className="text-[12vw] md:text-[6.8vw] font-black leading-[0.82] tracking-[-0.05em] uppercase text-left relative z-20 selection:bg-white selection:text-black font-sans w-full max-w-4xl select-none"
          >
            The School of <br/> Modern Content.
          </motion.h1>
        </div>

        {/* MOBILE STACKED EDITORIAL FLOW (Visible on screens < 768px) */}
        <div className="md:hidden flex flex-col w-full gap-8 text-left select-none font-['Helvetica',_sans-serif] mt-4 mb-4">
          
          {/* Top Info Grid */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex flex-col">
              <span className="text-[8px] tracking-[0.2em] text-white/40 uppercase">From the House of</span>
              <span className="text-[10px] font-bold tracking-[0.15em] text-white mt-0.5 uppercase">Blade Media</span>
              <span className="text-[8px] tracking-[0.15em] text-white/30 mt-1 uppercase">Delhi / Est. 2026</span>
            </div>
            <div className="flex flex-col items-end text-right font-black tracking-[0.15em] text-[9px] text-white/80">
              <span>CREATE // MARKET</span>
              <span>SELL // BUILD</span>
            </div>
          </div>

          {/* Technical Identification Code */}
          <div className="flex flex-col border-l border-[#F3D7A7]/20 pl-4 py-1">
            <span className="text-[9px] font-mono tracking-[0.25em] text-[#F3D7A7]">BIC–26–C02</span>
            <span className="text-[9px] font-bold tracking-[0.2em] text-white mt-1 uppercase">Independent School</span>
            <span className="text-[9px] tracking-[0.2em] text-white/50 uppercase">For the Internet Economy</span>
          </div>

          {/* Admissions Catalogue & CTA */}
          <div className="flex items-end justify-between border-t border-white/5 pt-6">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold tracking-[0.2em] text-[#F3D7A7] uppercase">02 / Admissions</span>
              <span className="text-[9px] tracking-[0.15em] text-white/60 mt-0.5 uppercase">August 2026 Intake</span>
            </div>
            <button 
              onClick={onJoinWaitlist}
              className="text-[#F3D7A7] border-b border-[#F3D7A7]/30 pb-0.5 text-[11px] font-bold tracking-[0.2em] uppercase flex items-center gap-1 cursor-none"
            >
              <span>Apply</span>
              <span className="inline-block">↗</span>
            </button>
          </div>

          {/* Philosophy Statement */}
          <div className="text-[8px] font-bold tracking-[0.2em] text-white/30 uppercase">
            For those building on the internet.
          </div>

        </div>

      </div>

      {/* DESKTOP ASYMMETRIC CANVAS DISTRIBUTION (Visible on screens >= 768px) */}
      <div className="hidden md:block absolute inset-0 z-20 pointer-events-none">
        
        {/* UPPER LEFT: Institutional Metadata */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute top-24 left-12 pointer-events-auto flex flex-col text-left font-['Helvetica',_sans-serif] uppercase select-none"
        >
          <span className="text-[8px] tracking-[0.25em] text-white/40">From the House of</span>
          <span className="text-[10px] font-bold tracking-[0.2em] text-white mt-1">Blade Media</span>
          <div className="h-[1px] w-6 bg-white/10 my-3" />
          <span className="text-[8px] tracking-[0.2em] text-white/40">Delhi, India</span>
          <span className="text-[8px] tracking-[0.2em] text-white/40 mt-0.5">Est. 2026</span>
        </motion.div>

        {/* UPPER RIGHT: Vertical Typography stacked list */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="absolute top-24 right-12 pointer-events-auto flex gap-4 select-none font-['Helvetica',_sans-serif]"
        >
          <div className="w-[1px] bg-gradient-to-b from-[#F3D7A7]/80 to-transparent self-stretch" />
          <div className="flex flex-col gap-1.5 text-left font-black tracking-[0.18em] text-[13px]">
            {words.map((word) => (
              <span 
                key={word}
                onMouseEnter={() => setHoveredWord(word)}
                onMouseLeave={() => setHoveredWord(null)}
                className="cursor-pointer transition-all duration-300"
                style={{
                  color: hoveredWord === word ? "#F3D7A7" : "#FFFFFF",
                  opacity: hoveredWord === null ? 1 : hoveredWord === word ? 1 : 0.35
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </motion.div>

        {/* LOWER LEFT: Technical catalog code */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="absolute bottom-24 left-12 pointer-events-auto flex flex-col text-left font-['Helvetica',_sans-serif] uppercase select-none"
        >
          <span className="text-[10px] font-mono tracking-[0.35em] text-[#F3D7A7]">BIC–26–C02</span>
          <div className="h-[1px] w-6 bg-[#F3D7A7]/20 my-3" />
          <span className="text-[9px] font-bold tracking-[0.25em] text-white">Independent School</span>
          <span className="text-[9px] tracking-[0.22em] text-white/50 mt-0.5">For the Internet Economy</span>
        </motion.div>

        {/* LOWER RIGHT: Admissions Catalog & CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="absolute bottom-24 right-12 pointer-events-auto flex flex-col text-left font-['Helvetica',_sans-serif] select-none"
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#F3D7A7]">02 / Admissions</span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/60 mt-1">August 2026</span>
          
          <button
            onClick={onJoinWaitlist}
            className="mt-4 flex flex-col items-start group cursor-none w-max pointer-events-auto"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white group-hover:text-[#F3D7A7] transition-colors duration-300 flex items-center gap-1">
              <span>Apply</span>
              <span className="inline-block group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">↗</span>
            </span>
            <div className="h-[1px] w-8 bg-white group-hover:bg-[#F3D7A7] group-hover:w-16 transition-all duration-300 mt-1" />
          </button>
        </motion.div>

        {/* BOTTOM LEFT: Philosophy print statement */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-12 pointer-events-auto text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 font-['Helvetica',_sans-serif] select-none"
        >
          For those building <br /> on the internet.
        </motion.div>

      </div>
    </section>
  );
}
