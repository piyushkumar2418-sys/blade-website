"use client";
import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const SprintProtocol = () => {
  return (
    <section 
      id="section-curriculum"
      className="py-24 bg-[#050505] text-white overflow-hidden relative flex flex-col justify-center items-center"
      style={{
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
        backgroundSize: '16px 16px',
      }}
    >
      {/* Cursive Font and Glassy metallic styling with bright yellowish golden */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
        
        .font-cursive {
          font-family: 'Dancing Script', cursive;
        }

        .rich-gold-text {
          color: #FFC800;
          text-shadow: 0 0 10px rgba(255, 200, 0, 0.35);
        }

        .glassy-card {
          background: rgba(10, 10, 12, 0.45);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.09);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.03);
        }

        .glassy-card:hover {
          border-color: rgba(255, 200, 0, 0.35);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.45), 0 0 25px rgba(255, 200, 0, 0.1);
        }

        .glassy-panel {
          background: rgba(5, 5, 7, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        @keyframes sweep {
          0% { left: -100%; }
          30% { left: 130%; }
          100% { left: 130%; }
        }

        .animate-sweep::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.35),
            transparent
          );
          animation: sweep 3.5s infinite linear;
        }
      `}} />

      {/* Rich Golden Ambient Glows */}
      <div className="absolute top-1/4 left-[-10%] w-[400px] h-[400px] bg-[#FFC800]/2 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[400px] h-[400px] bg-[#FFC800]/2 rounded-full blur-[140px] pointer-events-none" />

      {/* Centered layout block */}
      <div className="w-full max-w-5xl px-6 relative z-10 flex flex-col items-center">
        
        {/* SECTION HEADER */}
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#FFC800] rounded-full animate-pulse" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-white/40">BIC | COHORT 02</span>
            <span className="w-1.5 h-1.5 bg-[#FFC800]/40 rounded-full" />
          </div>
          
          <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tighter text-white leading-none whitespace-nowrap select-none font-sans">
            What You&apos;ll <span className="font-cursive text-[#FFC800] font-normal lowercase tracking-normal mx-0.5 pr-0.5 inline-block transform -rotate-3" style={{ textTransform: 'none', textShadow: '0 0 10px rgba(255, 200, 0, 0.4)' }}>learn</span> in this Cohort
          </h2>
        </div>
        {/* ========================================================
            CARD 1: ADVANCED VIDEO EDITING (TOP FULL-WIDTH)
           ======================================================== */}
        <div className="w-full glassy-card rounded-2xl p-6 md:p-8 relative overflow-hidden mb-6 flex flex-col lg:flex-row justify-between items-stretch gap-6 transition-all duration-300">
          
          {/* Left Column: Title & Description */}
          <div className="lg:w-1/2 flex flex-col justify-between items-start relative z-10 py-1">
            <div className="space-y-4">
              
              {/* Title with gradient number matching reference style */}
              <h3 className="text-2xl md:text-3xl font-bold tracking-tighter text-white leading-none font-sans flex items-center gap-3">
                <span className="text-4xl md:text-5xl font-black bg-gradient-to-br from-white via-[#FFC800] to-[#FFC800]/20 bg-clip-text text-transparent select-none font-sans">1</span>
                <span>Advanced Video Editing</span>
              </h3>
              
              <p className="text-white/60 text-xs font-normal leading-relaxed font-sans max-w-md">
                Master the end-to-end blueprint of modern content creation and business. Learn everything from advanced video editing and social media growth, to marketing, PR, client acquisition, freelancing, and agency scaling.
              </p>
            </div>

            {/* Pill-shaped Curriculum Button in bright yellowish golden with looping sheen, breathing & scaling effects */}
            <motion.a 
              href="/curriculum.pdf" 
              download="Blade_Inner_Circle_Curriculum.pdf"
              animate={{ 
                scale: [1, 1.02, 1],
                boxShadow: [
                  "0 4px 10px rgba(255,200,0,0.15)",
                  "0 8px 25px rgba(255,200,0,0.35)",
                  "0 4px 10px rgba(255,200,0,0.15)"
                ]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="animate-sweep inline-flex items-center justify-center gap-2 bg-[#FFC800] hover:bg-[#FFF5CC] text-black px-7 py-3 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 select-none mt-6 overflow-hidden relative shadow-lg"
            >
              <span>Download Curriculum</span>
              <Download size={12} className="stroke-[2.5] animate-bounce" style={{ animationDuration: '2s' }} />
            </motion.a>
          </div>

          {/* Right Column: Visual List & Floating Logos */}
          <div className="lg:w-1/2 flex flex-col justify-between relative min-h-[200px]">
            
            {/* Floating Logos Ae, Pr, Resolve */}
            <div className="absolute -top-3 right-6 flex gap-2.5 z-20">
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.2, rotate: -4 }}
                className="w-9 h-9 bg-[#00005c] border border-[#0000a3]/50 rounded-lg flex items-center justify-center shadow-md font-sans text-xs font-bold text-[#3fa9f5] select-none cursor-pointer"
                title="After Effects"
              >
                Ae
              </motion.div>
              <motion.div 
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.2, rotate: 4 }}
                className="w-9 h-9 bg-[#1e003c] border border-[#3c0078]/50 rounded-lg flex items-center justify-center shadow-md font-sans text-xs font-bold text-[#ea76ff] select-none cursor-pointer"
                title="Premiere Pro"
              >
                Pr
              </motion.div>
              <motion.div 
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.2, rotate: -3 }}
                className="w-9 h-9 bg-black border border-white/10 rounded-lg flex items-center justify-center shadow-md cursor-pointer"
                title="DaVinci Resolve"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-red-500 via-green-500 to-blue-500 animate-spin" style={{ animationDuration: '8s' }} />
              </motion.div>
            </div>

            {/* Glassy Topics Panel - Words Only, Compact */}
            <div className="w-full glassy-panel rounded-xl p-5 mt-8 flex-1 flex flex-col justify-center space-y-2.5 shadow-inner">
              <div className="space-y-2 text-xs md:text-[13px] font-bold text-white/80 font-sans tracking-tight">
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>A → Z of Video Editing</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>Advanced Motion Graphics in Adobe After Effects</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>Advanced Color Grading in DaVinci Resolve</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================
            3-COLUMN GRID FOR OTHER 3 MODULES
           ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch">
          
          {/* CARD 2: SOCIAL MEDIA GROWTH */}
          <div className="glassy-card rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between transition-all duration-300">
            
            {/* Top Area: Title */}
            <div className="space-y-3 relative z-10">
              {/* Title with gradient number */}
              <h4 className="text-xl font-bold tracking-tighter text-white font-sans leading-none flex items-center gap-2">
                <span className="text-3xl font-black bg-gradient-to-br from-white via-[#FFC800] to-[#FFC800]/20 bg-clip-text text-transparent select-none">2</span>
                <span>Social Media Growth</span>
              </h4>
            </div>

            {/* Glassy Topics Panel - Words Only */}
            <div className="w-full glassy-panel rounded-lg p-4 my-4 flex-1 flex flex-col justify-center space-y-2 shadow-inner">
              <div className="space-y-2 text-[11px] md:text-xs font-bold text-white/80 font-sans tracking-tight">
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>Content Planning & Packaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>Scripting</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>Storytelling</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>SEO</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>Basics of Cinematography</span>
                </div>
              </div>
            </div>

            {/* Subtle graphic background representing Social Media Growth */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,80 Q25,60 50,80 T100,60 L100,100 L0,100 Z" fill="none" stroke="white" strokeWidth="0.5" />
              </svg>
            </div>
          </div>

          {/* CARD 3: FREELANCING & AGENCY BUILDING */}
          <div className="glassy-card rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between transition-all duration-300">
            
            {/* Top Area: Title */}
            <div className="space-y-3 relative z-10">
              {/* Title with gradient number */}
              <h4 className="text-xl font-bold tracking-tighter text-white font-sans leading-none flex items-center gap-2">
                <span className="text-3xl font-black bg-gradient-to-br from-white via-[#FFC800] to-[#FFC800]/20 bg-clip-text text-transparent select-none">3</span>
                <span>Freelancing & Agency Building</span>
              </h4>
            </div>

            {/* Glassy Topics Panel - Words Only */}
            <div className="w-full glassy-panel rounded-lg p-4 my-4 flex-1 flex flex-col justify-center space-y-2 shadow-inner">
              <div className="space-y-2 text-[11px] md:text-xs font-bold text-white/80 font-sans tracking-tight">
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>How, where & when to reach out to clients?</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>Basics of Marketing</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>How to Negotiate Prices?</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>How to Scale an Agency?</span>
                </div>
              </div>
            </div>

            {/* Subtle glow background */}
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#FFC800]/5 rounded-full blur-xl pointer-events-none" />
          </div>

          {/* CARD 4: AI CREATIVE STUDIO (WITH PREMIUM VIOLET GRADIENT NEW BADGE) */}
          <div className="glassy-card rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between transition-all duration-300">
            
            {/* Sticker Type Purple capsule badge with gradient text */}
            <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-0.5 bg-[#4c1d95]/20 border border-[#6d28d9]/50 rounded-full shadow-[0_0_15px_rgba(109,40,217,0.2)] z-20 select-none transform rotate-3">
              <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 text-[#a78bfa] fill-current animate-pulse">
                <path d="M12 2L15 9H22L17 14L19 21L12 17L5 21L7 14L2 9H9L12 2Z" />
              </svg>
              <span className="text-[7.5px] font-black uppercase tracking-[0.2em] bg-gradient-to-r from-[#d8b4fe] via-[#f472b6] to-[#f472b6] bg-clip-text text-transparent">
                New
              </span>
            </div>

            {/* Top Area: Title & Description */}
            <div className="space-y-3 relative z-10">
              <h4 className="text-xl font-bold tracking-tighter text-white font-sans leading-none flex items-center gap-2">
                <span className="text-3xl font-black bg-gradient-to-br from-white via-[#FFC800] to-[#FFC800]/20 bg-clip-text text-transparent select-none">4</span>
                <span>Introducing the <span className="font-serif italic text-white/90">AI Creative Studio</span></span>
              </h4>
              
              <p className="text-white/60 text-[11px] font-normal leading-relaxed font-sans mt-3">
                Unleash your creativity with cutting-edge AI tools for design, content, and video.
              </p>
            </div>

            {/* Glowing Squares / AI Icons representation stacked at the bottom */}
            <div className="flex justify-center items-center gap-3 mt-6 mb-2 relative z-10 py-2">
              <div className="relative w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shadow-lg hover:border-blue-400/40 transition-colors">
                <span className="text-lg">🤖</span>
              </div>
              <div className="relative w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shadow-lg hover:border-purple-400/40 transition-colors">
                <span className="text-lg">✨</span>
              </div>
              <div className="relative w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shadow-lg hover:border-[#FFC800]/40 transition-colors">
                <span className="text-lg">🌀</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default SprintProtocol;
