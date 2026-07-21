"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const FounderAuthority = () => {
  return (
    <section 
      className="bg-[#030303] py-24 px-6 md:px-24 text-white relative overflow-hidden border-b border-white/5"
      style={{
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    >
      {/* Background glow effects */}
      <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-gradient-to-tr from-[#1b3d30]/10 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-gradient-to-bl from-[#FFC800]/5 to-transparent rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Understated Section Header */}
        <div className="mb-10 flex flex-col items-start">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#FFC800] rounded-full animate-pulse" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-white/40">Curriculum Director</span>
          </div>
        </div>

        {/* Central Asymmetrical Card Container - Inspired by Achal Bassamboo Kellogg Reference */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full bg-[#0c1612] border border-[#1b3d30]/30 rounded-[2rem] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
        >
          
          {/* Decorative Corner Coordinate Accent */}
          <div className="absolute top-4 right-6 font-mono text-[8px] text-white/20 uppercase tracking-widest pointer-events-none">
            REF // BIC_OP_SYS_2026
          </div>

          {/* Left Side: Content & Credentials */}
          <div className="w-full md:w-3/5 text-left flex flex-col justify-center relative z-10">
            
            <div className="space-y-1">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-sans">
                Brand Building & Growth Systems
              </h2>
              <p className="text-base md:text-lg text-white/60 font-sans font-light">
                by Piyush
              </p>
            </div>

            {/* Separator line */}
            <div className="w-full h-[1px] bg-white/10 my-5" />

            {/* Designation/Credentials */}
            <div className="space-y-1">
              <p className="text-xs md:text-sm text-[#FFC800] font-bold tracking-wider font-mono uppercase">
                Founder at Blade Media & Creator Economy Strategist
              </p>
            </div>

            {/* Overview Section */}
            <div className="mt-8 space-y-2">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-white/40 uppercase block">
                OVERVIEW
              </span>
              <p className="text-white/80 text-sm md:text-base leading-relaxed font-light font-sans max-w-xl">
                Master the systems of hook engineering, brand psychology, and scalable content distribution that generated 700M+ views across top brands.
              </p>
            </div>

            {/* Brand Badges/Chips in bottom-left (Northwestern/Stanford style) */}
            <div className="flex flex-wrap gap-2.5 mt-8">
              <div className="bg-white text-black px-4 py-1.5 rounded-full text-[9px] font-sans font-black tracking-wider uppercase flex items-center justify-center shadow-sm select-none">
                PEPSICO
              </div>
              <div className="bg-white text-black px-4 py-1.5 rounded-full text-[9px] font-sans font-serif font-extrabold tracking-widest uppercase flex items-center justify-center shadow-sm select-none">
                AJIO
              </div>
              <div className="bg-[#1c3d5a] text-white px-4 py-1.5 rounded-full text-[9px] font-sans font-bold tracking-wide uppercase flex items-center justify-center shadow-sm border border-white/5 select-none">
                PANTALOONS
              </div>
              <div className="bg-[#111] text-[#FFC800] px-4 py-1.5 rounded-full text-[9px] font-mono tracking-wider uppercase flex items-center justify-center shadow-sm border border-white/10 select-none">
                TANMAY BHAT
              </div>
            </div>

          </div>

          {/* Right Side: Portrait with Dashed Circular Outline Overlay */}
          <div className="w-full md:w-2/5 flex items-center justify-center relative min-h-[280px] md:min-h-[340px]">
            
            {/* Dashed Circular Outline (Kellogg Reference Style) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-72 md:h-72 border border-dashed border-[#1b3d30]/40 rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-56 md:h-56 border border-dashed border-[#FFC800]/10 rounded-full pointer-events-none" />

            {/* Smiling Portrait */}
            <div className="relative w-56 h-70 md:w-64 md:h-80 aspect-[4/5] overflow-hidden z-10 rounded-2xl">
              <Image 
                src="/leaders/founder.jpeg" 
                alt="Piyush - Smiling Portrait" 
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="w-full h-full object-cover object-top"
                priority
              />
              {/* Soft overlay gradient to blend image borders into dark background */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1612] via-transparent to-transparent pointer-events-none" />
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default FounderAuthority;
