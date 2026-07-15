"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { User } from "firebase/auth";

interface InnerCircleHeroProps {
  user: User | null;
  onJoinWaitlist: () => void;
}

const principles = ["CREATE", "MARKET", "SELL", "BUILD"];

export default function InnerCircleHero({ user, onJoinWaitlist }: InnerCircleHeroProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

      {/* Technical Design/Construction Grid Overlay (Spector Style, 4% Opacity) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute inset-0 z-10 pointer-events-none" 
      >
        {/* Square Grid */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '65px 65px',
          }}
        />
        {/* Geometric Diagonal Construction Lines */}
        <svg className="w-full h-full stroke-white/10 stroke-[0.5px] fill-none">
          <line x1="0" y1="0" x2="100%" y2="100%" />
          <line x1="100%" y1="0" x2="0" y2="100%" />
          <line x1="25%" y1="0" x2="25%" y2="100%" />
          <line x1="75%" y1="0" x2="75%" y2="100%" />
          <line x1="0" y1="50%" x2="100%" y2="50%" />
        </svg>
      </motion.div>

      {/* Main Container */}
      <div className="relative w-full h-full z-20 px-6 md:px-12 flex flex-col justify-between pt-24 pb-8 md:pt-0">
        
        {/* CENTER VISUAL ANCHOR: MAIN HEADLINE (Two-line layout with horizontal offset) */}
        <div className="flex-grow flex flex-col justify-center items-start md:pl-16">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }} 
            className="text-[11vw] md:text-[6.3vw] font-black leading-[0.82] tracking-[-0.05em] uppercase text-left relative z-20 selection:bg-white selection:text-black font-sans w-full max-w-5xl select-none flex flex-col gap-2 md:gap-3"
          >
            {/* Asymmetric layout: top line shifted right, second line shifted left */}
            <span className="block md:pl-[20%]">The School of</span>
            <span className="block text-white md:pl-[8%] md:whitespace-nowrap flex items-center gap-4">
              <span>Modern Content.</span>
              
              {/* Technical Registration Mark Device */}
              <div className="inline-flex items-center gap-2.5 relative top-[3px]">
                <motion.svg
                  whileHover="hover"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="#F3D7A7"
                  strokeWidth="0.8"
                  className="inline-block"
                >
                  {/* Center Circle (Scales on hover) */}
                  <motion.circle 
                    cx="16" 
                    cy="16" 
                    r="6" 
                    variants={{
                      hover: { scale: 1.15 }
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Crosshairs (Extend slightly on hover) */}
                  <motion.line 
                    x1="6" y1="16" x2="26" y2="16" 
                    variants={{
                      hover: { x1: 4, x2: 28 }
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.line 
                    x1="16" y1="6" x2="16" y2="26" 
                    variants={{
                      hover: { y1: 4, y2: 28 }
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Outer registration ticks */}
                  <line x1="16" y1="2" x2="16" y2="5" />
                  <line x1="16" y1="27" x2="16" y2="30" />
                  <line x1="2" y1="16" x2="5" y2="16" />
                  <line x1="27" y1="16" x2="30" y2="16" />
                </motion.svg>
                <span className="text-[7px] font-mono tracking-[0.25em] text-[#F3D7A7]/60 relative top-[-1px]">REG / 02</span>
              </div>
            </span>
          </motion.h1>
        </div>

        {/* MOBILE STACKED EDITORIAL FLOW (Visible on screens < 768px) */}
        <div className="md:hidden flex flex-col w-full gap-8 text-left select-none font-['Helvetica',_sans-serif] mt-4 mb-4">
          
          {/* Top Info Grid */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex flex-col">
              <span className="text-[8px] tracking-[0.2em] text-white/40 uppercase">From the House of</span>
              <span className="text-[12px] font-black tracking-[0.15em] text-white mt-0.5 uppercase">Blade Media</span>
              <span className="text-[8px] tracking-[0.15em] text-white/30 mt-1 uppercase">Delhi, India / Est. 2026</span>
            </div>
            <div className="flex flex-col items-end text-right font-black tracking-[0.15em] text-[9px] text-white/80">
              <span>CREATE // MARKET</span>
              <span>SELL // BUILD</span>
            </div>
          </div>

          {/* Technical Identification Code */}
          <div className="flex flex-col border-l border-[#F3D7A7]/20 pl-4 py-1">
            <span className="text-[9px] font-mono tracking-[0.25em] text-[#F3D7A7]/70">[ BIC–26–C02 ]</span>
            <span className="text-[9px] font-bold tracking-[0.2em] text-white mt-1 uppercase">Independent School /</span>
            <span className="text-[9px] tracking-[0.2em] text-white/50 uppercase">For the Internet</span>
            <span className="text-[11px] font-black tracking-[0.15em] text-[#F3D7A7] uppercase mt-0.5">Economy.</span>
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
          className="absolute top-[24%] left-[8vw] pointer-events-auto flex flex-col text-left font-['Helvetica',_sans-serif] uppercase select-none"
        >
          <span className="text-[8px] md:text-[9px] tracking-[0.25em] text-white/40">From the House of</span>
          <span className="text-[15px] md:text-[18px] font-black tracking-[0.15em] text-white mt-1.5 mb-2.5">Blade Media</span>
          <span className="text-[8px] md:text-[9px] tracking-[0.2em] text-white/40">Delhi, India / Est. 2026</span>
        </motion.div>

        {/* MIDDLE LEFT: Technical Document Code - Relocated to create balance */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute top-[44%] left-[8vw] z-20 pointer-events-auto select-none font-['Helvetica',_sans-serif]"
        >
          <span className="text-[9px] font-mono tracking-[0.35em] text-[#F3D7A7]/60">
            [ BIC–26–C02 ]
          </span>
        </motion.div>

        {/* UPPER RIGHT: Vertical stacked list (Numbered operating principles) - Moved inwards (74% across viewport) */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="absolute top-[18%] left-[74%] pointer-events-auto flex gap-4 select-none font-['Helvetica',_sans-serif]"
        >
          <div className="w-[1.2px] bg-gradient-to-b from-[#F3D7A7]/80 to-transparent self-stretch my-[-4px]" />
          <div className="flex flex-col gap-2.5 text-left select-none">
            {principles.map((word, index) => {
              const isHovered = hoveredIndex === index;
              const isAnyHovered = hoveredIndex !== null;
              return (
                <div 
                  key={word}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="flex items-center gap-4 cursor-pointer transition-all duration-300"
                  style={{
                    opacity: !isAnyHovered ? 1 : isHovered ? 1 : 0.45
                  }}
                >
                  <span 
                    className="text-[8px] font-mono tracking-widest transition-colors duration-300 w-5"
                    style={{
                      color: isHovered ? "#F3D7A7" : "rgba(243, 215, 167, 0.5)"
                    }}
                  >
                    {`0${index + 1}`}
                  </span>
                  <span 
                    className="text-[15px] md:text-[17px] font-black tracking-[0.18em] transition-colors duration-300"
                    style={{
                      color: isHovered ? "#F3D7A7" : "#FFFFFF"
                    }}
                  >
                    {word}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* LOWER LEFT: Simplified metadata */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="absolute bottom-[22%] left-[8vw] pointer-events-auto flex flex-col text-left font-['Helvetica',_sans-serif] uppercase select-none"
        >
          <span className="text-[8px] md:text-[9px] tracking-[0.25em] text-white/50">Independent School /</span>
          <span className="text-[9px] md:text-[10px] tracking-[0.25em] text-white/80 mt-0.5 font-bold">For the Internet</span>
          <span className="text-[13px] md:text-[15px] font-black tracking-[0.2em] text-[#F3D7A7] mt-1.5">Economy.</span>
        </motion.div>

        {/* LOWER RIGHT: Admissions Catalog & CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="absolute bottom-[26%] right-12 pointer-events-auto flex flex-col text-left font-['Helvetica',_sans-serif] select-none"
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
            {/* Horizontal expanding underline */}
            <div className="relative w-full h-[1px] bg-white/20 mt-1 overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-1/3 bg-white group-hover:bg-[#F3D7A7] group-hover:w-full transition-all duration-300" />
            </div>
          </button>
        </motion.div>

        {/* BOTTOM LEFT: Philosophy print statement - Rotated vertically along the left edge */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute left-6 bottom-[18%] origin-bottom-left -rotate-90 z-20 pointer-events-auto text-[8px] md:text-[9px] font-bold uppercase tracking-[0.3em] text-white select-none whitespace-nowrap"
        >
          For those building on the internet. <span className="text-[#F3D7A7] ml-1">↗</span>
        </motion.div>

      </div>
    </section>
  );
}
