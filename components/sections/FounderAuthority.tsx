"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const FounderAuthority = () => {
  return (
    <section className="bg-black py-28 px-6 md:px-24 text-white text-left border-b border-white/5 relative overflow-hidden z-20">
      
      {/* MONOSPACE DECORATIVE GRID LINES */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 bottom-0 left-[15%] w-[1px] bg-white/[0.03]" />
        <div className="absolute top-0 bottom-0 left-[40%] w-[1px] bg-white/[0.03]" />
        <div className="absolute top-0 bottom-0 left-[65%] w-[1px] bg-white/[0.03]" />
        <div className="absolute top-0 bottom-0 left-[85%] w-[1px] bg-white/[0.03]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* TOP ROW: ASYMMETRICAL EDITORIAL GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* ========================================================
              LEFT COLUMN: PORTRAIT & TYPOGRAPHIC TEXTURE
             ======================================================== */}
          <div className="lg:col-span-5 relative w-full flex flex-col justify-start">
            
            {/* Giant Background Typographic Texture */}
            <div className="absolute -top-12 -left-8 flex flex-col space-y-2 select-none pointer-events-none z-0">
              <span className="font-sans font-black text-white/[0.015] text-[100px] leading-none tracking-tighter">BUILD</span>
              <span className="font-sans font-black text-white/[0.015] text-[100px] leading-none tracking-tighter">SYSTEMS</span>
              <span className="font-sans font-black text-white/[0.015] text-[100px] leading-none tracking-tighter">CONTENT</span>
              <span className="font-sans font-black text-white/[0.015] text-[100px] leading-none tracking-tighter">EXECUTION</span>
            </div>

            {/* Smiling Natural Portrait */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative z-10 w-full aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] bg-neutral-950 overflow-hidden border border-white/10 rounded-2xl group shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            >
              <Image 
                src="/piyush.png" 
                alt="Piyush - Smiling natural portrait" 
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-102"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Micro-Details Under the Image */}
            <div className="mt-4 flex justify-between items-center font-mono text-[9px] text-white/30 uppercase tracking-widest px-1">
              <span>IMG_REF: PY_PORTRAIT_RAW</span>
              <span>COORD: 28.6139° N, 77.2090° E</span>
              <span>V_NO: 3.1.2</span>
            </div>
            
          </div>

          {/* ========================================================
              RIGHT COLUMN: EDITORIAL COPY & LEAD HEADLINE
             ======================================================== */}
          <div className="lg:col-span-7 space-y-12">
            
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-[0.35em] text-[#FFC800] uppercase block">
                From the Desk of the Founder
              </span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-none font-sans">
                Built inside the industry.
              </h2>
            </div>

            <div className="space-y-6 text-white/70 text-base md:text-[17px] leading-relaxed font-light font-sans max-w-2xl">
              <p>
                Blade Inner Circle wasn&apos;t created after reading business books or theoretical frameworks. It was built while scaling creators, working with brands, building campaigns, fixing mistakes, testing systems, and figuring out what actually works.
              </p>
              <p>
                Every framework inside this curriculum comes from projects we&apos;ve already executed—not concepts we&apos;ve only discussed. Everything here was earned.
              </p>
            </div>

            <div className="h-[1px] w-full bg-white/10" />

            {/* SECTION: THE WORK */}
            <div className="space-y-8">
              <div className="flex justify-between items-center font-mono text-[10px] text-white/40 uppercase tracking-widest">
                <span>SECTION_03 // EVIDENCE</span>
                <span>STATUS: VERIFIED</span>
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white font-sans uppercase">
                THE WORK.
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-2">
                
                {/* EVIDENCE BLOCK 1: VIEWS GENERATED */}
                <div className="space-y-3 p-6 bg-zinc-950/40 border border-white/5 rounded-2xl flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tighter font-sans block">
                      700M+
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-[#FFC800] uppercase block">
                      Views Generated
                    </span>
                  </div>
                  <p className="text-white/50 text-xs leading-relaxed font-sans pt-2">
                    Organic reach generated across client channels using hook engineering and high-retention video architectures.
                  </p>
                </div>

                {/* EVIDENCE BLOCK 2: THE JOURNEY TIMELINE */}
                <div className="space-y-3 p-6 bg-zinc-950/40 border border-white/5 rounded-2xl flex flex-col justify-between">
                  <span className="text-[10px] font-mono tracking-widest text-[#FFC800] uppercase block">
                    THE JOURNEY
                  </span>
                  
                  <div className="flex items-center justify-between font-mono text-[10px] text-white/60 py-2 w-full">
                    <span>AGE 13</span>
                    <span className="text-white/30">→</span>
                    <span>FREELANCE CLIENT</span>
                    <span className="text-white/30">→</span>
                    <span>AGENCY SCALE</span>
                    <span className="text-white/30">→</span>
                    <span>BIC</span>
                  </div>

                  <p className="text-white/50 text-xs leading-relaxed font-sans pt-1">
                    A sequence built entirely on execution—moving from solo freelancing, to scaling agency infrastructure, to codifying the curriculum.
                  </p>
                </div>

              </div>

              {/* EVIDENCE BLOCK 3: BRANDS WORKED WITH */}
              <div className="p-6 bg-zinc-950/40 border border-white/5 rounded-2xl space-y-4">
                <span className="text-[10px] font-mono tracking-widest text-[#FFC800] uppercase block">
                  Brands & Partners
                </span>
                
                <div className="flex flex-wrap items-center gap-x-8 gap-y-6 pt-2 opacity-60">
                  {/* PepsiCo Styled Wordmark */}
                  <span className="text-lg font-black tracking-tighter font-sans text-white select-none">PEPSICO</span>
                  {/* AJIO Styled Wordmark */}
                  <span className="text-lg font-serif tracking-widest font-bold text-white select-none">AJIO</span>
                  {/* Pantaloons Wordmark */}
                  <span className="text-lg font-sans tracking-wide font-extrabold text-white select-none">PANTALOONS</span>
                  {/* Tanmay Bhat Wordmark */}
                  <span className="text-lg font-sans tracking-tight font-black text-white select-none">TANMAY BHAT</span>
                  {/* Nikhil Kamath Wordmark */}
                  <span className="text-lg font-sans tracking-[0.15em] font-light text-white select-none uppercase">Nikhil Kamath</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        <div className="h-[1px] w-full bg-white/5 my-20" />

        {/* ========================================================
            BOTTOM ROW: VISUAL STORYTELLING (THE WORKSPACE STACK)
           ======================================================== */}
        <div className="space-y-8">
          <div className="flex justify-between items-center font-mono text-[10px] text-white/40 uppercase tracking-widest">
            <span>ACTIVE WORKSPACE // WORKFLOW MOCKUPS</span>
            <span>SYSTEM_STABLE: OK</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            
            {/* STACK PANEL 1: NOTION SOP */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-zinc-950 border border-white/10 rounded-xl p-4 font-mono text-[10px] text-white/70 shadow-2xl h-44 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="font-bold text-[#FFC800]">Notion // Content_Ops</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
                  </div>
                </div>
                <div className="space-y-1.5 text-white/60 text-[9px]">
                  <div>[x] Hook Engineering Templates v2.1</div>
                  <div>[x] Client SOP Outbound Pipeline</div>
                  <div>[ ] Script Review: Tanmay Bhat (V3)</div>
                  <div>[ ] Review Ads ROAS Analytics (weekly)</div>
                </div>
              </div>
              <div className="text-white/30 text-[8px] text-right">LAST_EDIT: 2 MINS AGO</div>
            </motion.div>

            {/* STACK PANEL 2: META ADS MANAGER */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-zinc-950 border border-white/10 rounded-xl p-4 font-mono text-[10px] text-white/70 shadow-2xl h-44 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="font-bold text-white">Meta_Ads // Campaign_Ops</span>
                  <span className="text-[#FFC800] text-[8px] px-1 bg-[#FFC800]/10 border border-[#FFC800]/20 rounded">LIVE</span>
                </div>
                <div className="space-y-2 text-white/60 text-[9px] pt-1">
                  <div className="flex justify-between">
                    <span>Campaign:</span>
                    <span className="text-white font-bold">Acquisition_BIC_v2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ROAS (Avg):</span>
                    <span className="text-green-400 font-bold">4.82x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CPA:</span>
                    <span className="text-white">₹321.40</span>
                  </div>
                </div>
              </div>
              <div className="text-white/30 text-[8px] text-right">ACTIVE_BUDGET: STABLE</div>
            </motion.div>

            {/* STACK PANEL 3: PREMIERE PRO VIDEO TIMELINE */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-zinc-950 border border-white/10 rounded-xl p-4 font-mono text-[10px] text-white/70 shadow-2xl h-44 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="font-bold text-white">Premiere // Hook_Edit</span>
                  <span className="text-white/40 text-[8px]">00:14:02</span>
                </div>
                {/* Visual Audio Tracks */}
                <div className="space-y-1 pt-1.5">
                  <div className="flex gap-0.5 h-3">
                    <span className="w-8 bg-[#8B5CF6]/50 rounded-sm" />
                    <span className="w-16 bg-[#8B5CF6]/80 rounded-sm" />
                    <span className="w-12 bg-amber-500/50 rounded-sm" />
                  </div>
                  <div className="flex gap-0.5 h-3">
                    <span className="w-12 bg-[#FFC800]/60 rounded-sm" />
                    <span className="w-24 bg-green-500/40 rounded-sm" />
                  </div>
                  <div className="flex gap-0.5 h-3">
                    <span className="w-20 bg-sky-500/40 rounded-sm" />
                    <span className="w-16 bg-sky-500/60 rounded-sm" />
                  </div>
                </div>
              </div>
              <div className="text-white/30 text-[8px] text-right">AUDIO_T1: MIXED</div>
            </motion.div>

            {/* STACK PANEL 4: GOOGLE DOCS / SCRIPT FRAMEWORK */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-zinc-950 border border-white/10 rounded-xl p-4 font-mono text-[10px] text-white/70 shadow-2xl h-44 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="font-bold text-white">GDoc // attention_psyc.md</span>
                  <span className="text-white/30 text-[8px]">V3.4</span>
                </div>
                <div className="space-y-1.5 text-white/50 text-[8px] leading-relaxed">
                  <div># HOOK (0-3s): [Visual: Zoom shot of analytics]</div>
                  <div># BODY (4-30s): Explain the retention paradox...</div>
                  <div># CTA (30-45s): Direct response to application...</div>
                </div>
              </div>
              <div className="text-white/30 text-[8px] text-right">SAVED_TO_CLOUD</div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default FounderAuthority;
