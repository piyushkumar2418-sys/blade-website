"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const FounderAuthority = () => {
  return (
    <section className="bg-black py-36 px-6 md:px-24 lg:px-32 text-white relative overflow-hidden border-b border-white/5 z-20">
      
      {/* Subtle Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='noise'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noise)'/></svg>")`
        }}
      />

      {/* Ambient background lighting behind the hero portrait to separate it naturally */}
      <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#FFC800]/5 via-transparent to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* ========================================================
              LEFT SIDE (40%): EDITORIAL COPY & LEAD HEADLINE
             ======================================================== */}
          <div className="lg:col-span-5 text-left space-y-10">
            
            {/* Editorial Heavy Typography */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-[0.35em] text-[#FFC800] uppercase block">
                The Foundation
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-[54px] font-black tracking-tight text-white leading-[1.05] font-sans">
                The Classroom <br />
                Came After <br />
                The Work.
              </h2>
            </div>

            {/* Description Copy (Used Exactly) */}
            <p className="text-white/60 text-sm md:text-[15px] leading-relaxed font-sans max-w-md pt-2">
              Before there was a curriculum, there were campaigns. Before there were lectures, there were client calls, edits at 2 a.m., failed experiments, and projects that taught us what actually works. Blade Inner Circle is simply a structured version of everything those years taught us.
            </p>

            {/* Premium Gold Outlined CTA Button */}
            <div className="pt-2">
              <button className="bg-black hover:bg-white/[0.03] text-[#FFC800] hover:text-[#FFD333] border border-[#FFC800]/30 hover:border-[#FFC800] font-sans font-bold text-[10px] md:text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(255,200,0,0.03)] hover:shadow-[0_4px_20px_rgba(255,200,0,0.12)]">
                See What You&apos;ll Learn
              </button>
            </div>

            {/* Separator Divider */}
            <div className="h-[1px] w-full bg-white/10 max-w-md" />

            {/* Elegant Statistic Blocks (Blade Media & Measurable Work Only) */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 pt-4 max-w-md">
              
              <div className="space-y-1">
                <span className="text-2xl md:text-3xl font-bold tracking-tight text-white font-sans block">
                  700M+
                </span>
                <span className="text-[9px] font-mono tracking-wider text-white/40 uppercase block">
                  Views Generated
                </span>
              </div>
              
              <div className="space-y-1">
                <span className="text-2xl md:text-3xl font-bold tracking-tight text-white font-sans block">
                  3Cr+
                </span>
                <span className="text-[9px] font-mono tracking-wider text-white/40 uppercase block">
                  Revenue Generated
                </span>
              </div>
              
              <div className="space-y-1">
                <span className="text-2xl md:text-3xl font-bold tracking-tight text-white font-sans block">
                  6+ Years
                </span>
                <span className="text-[9px] font-mono tracking-wider text-white/40 uppercase block">
                  Building
                </span>
              </div>
              
              <div className="space-y-1">
                <span className="text-base md:text-lg font-bold tracking-wider text-[#FFC800] font-mono uppercase block leading-none pt-1">
                  Blade Media
                </span>
                <span className="text-[8px] font-mono tracking-wider text-white/40 uppercase block">
                  Content & Marketing Agency
                </span>
              </div>

            </div>

          </div>

          {/* ========================================================
              RIGHT SIDE (60%): SINGLE HERO PORTRAIT WITH DEPTH & LIGHTING
             ======================================================== */}
          <div className="lg:col-span-7 w-full flex items-center justify-center lg:justify-end relative">
            
            {/* Subtle soft lighting radial behind the card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-[#FFC800]/5 via-transparent to-transparent rounded-full blur-[80px] pointer-events-none" />

            {/* Vertical Portrait Hero Frame */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm md:max-w-md aspect-[3/4.2] overflow-hidden rounded-[2.5rem] z-10 shadow-[0_30px_100px_rgba(0,0,0,0.95)] border border-white/5 group"
            >
              <Image
                src="/leaders/founder.jpeg"
                alt="Piyush - Curriculum Creator"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover object-top select-none filter brightness-[0.92] transition-transform duration-1000 group-hover:scale-[1.01]"
                priority
              />
              
              {/* Soft Vignette & Shadow Blends inside the Luxury Card */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.4))] pointer-events-none" />

              {/* Edge Reflection Overlay */}
              <div className="absolute inset-[1px] rounded-[2.5rem] border border-white/10 pointer-events-none opacity-40" />

              {/* Understated Bottom Overlay Label */}
              <div className="absolute bottom-8 left-8 text-left z-20 select-none">
                <span className="text-[10px] font-mono tracking-[0.3em] text-[#FFC800] uppercase block mb-1">
                  Blade Media
                </span>
                <span className="text-white font-bold text-xl md:text-2xl tracking-tight block">
                  Piyush
                </span>
                <span className="text-white/40 font-mono text-[9px] uppercase tracking-wider block mt-0.5">
                  Founder & Curriculum Creator
                </span>
              </div>

            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default FounderAuthority;
