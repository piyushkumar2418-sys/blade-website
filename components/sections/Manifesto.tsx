"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Manifesto = () => {
  return (
    <section 
      className="py-64 px-6 md:px-24 bg-[#030303] relative overflow-hidden border-b border-white/5"
      style={{
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Premium organic glassmorphic gradient glows (matching Reference 2) */}
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-gradient-to-tr from-[#F3D7A7]/10 to-[#8B5CF6]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[#F3D7A7]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          
          {/* LEFT COLUMN: MANIFESTO TEXT */}
          <div className="lg:col-span-7 space-y-16 text-left">
            <div className="inline-flex items-center gap-4 text-left">
              <span className="text-[10px] font-bold tracking-[0.4em] text-white/30 uppercase text-left">Our Core Belief // 2026</span>
              <div className="h-[1px] w-12 bg-white/10" />
            </div>
            
            <h2 className="text-6xl md:text-[100px] font-bold uppercase tracking-tight leading-[0.85] text-white text-left">
              the <br/> architecture <br/> of <span className="font-serif italic font-normal text-[#F3D7A7] lowercase tracking-normal normal-case">results.</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/40 leading-relaxed font-light max-w-xl text-left">
              Learning just theories doesn&apos;t help you in the real world. We give you real tools that help you make real money.
            </p>
          </div>

          {/* RIGHT COLUMN: DYNAMIC ORB AND FLOATING SPECS (matching Reference 2 layout) */}
          <div className="lg:col-span-5 relative min-h-[500px] flex items-center justify-center">
            
            {/* The Floating Spec Orb */}
            <motion.div 
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="w-[280px] h-[280px] md:w-[350px] md:h-[350px] relative z-10 mix-blend-screen opacity-90 filter saturate-150"
            >
              <Image 
                src="/bic-orb.png" 
                alt="BIC Spec Orb" 
                fill 
                className="object-contain"
              />
            </motion.div>

            {/* Spec 01: Setup */}
            <div className="absolute top-10 left-[-20px] md:left-[-40px] max-w-[160px] z-20 text-left">
              <span className="text-[10px] font-bold text-[#F3D7A7] block tracking-[0.2em] mb-2 font-mono">01 / SETUP</span>
              <p className="text-[10px] text-white/50 leading-relaxed uppercase tracking-wider font-semibold">
                We set up working business systems directly into your daily routine.
              </p>
              {/* Diagonal Connector Line */}
              <div className="w-12 h-[1px] bg-[#F3D7A7]/20 mt-3 origin-left rotate-[25deg] hidden md:block" />
            </div>

            {/* Spec 02: Speed */}
            <div className="absolute bottom-10 left-[-10px] md:left-[-30px] max-w-[160px] z-20 text-left">
              <span className="text-[10px] font-bold text-[#F3D7A7] block tracking-[0.2em] mb-2 font-mono">02 / SPEED</span>
              <p className="text-[10px] text-white/50 leading-relaxed uppercase tracking-wider font-semibold">
                We help you build a solid business that can grow fast without breaking down.
              </p>
              {/* Diagonal Connector Line */}
              <div className="w-12 h-[1px] bg-[#F3D7A7]/20 mt-3 origin-left rotate-[-25deg] hidden md:block" />
            </div>

            {/* Spec 03: High Quality */}
            <div className="absolute right-[-10px] md:right-[-20px] top-[40%] max-w-[160px] z-20 text-left">
              <span className="text-[10px] font-bold text-[#F3D7A7] block tracking-[0.2em] mb-2 font-mono">03 / QUALITY</span>
              <p className="text-[10px] text-white/50 leading-relaxed uppercase tracking-wider font-semibold">
                You get the exact same methods that the top 0.1% of creators use.
              </p>
              {/* Connector Line */}
              <div className="w-12 h-[1px] bg-[#F3D7A7]/20 mt-3 origin-right rotate-[180deg] hidden md:block" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Manifesto;
