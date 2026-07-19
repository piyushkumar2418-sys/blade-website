"use client";
import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

// Original Brand-Colored SVGs
const InstagramLogo = () => (
  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <defs>
      <linearGradient id="instagram-grad" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="#405DE6" />
        <stop offset="25%" stopColor="#833AB4" />
        <stop offset="50%" stopColor="#C13584" />
        <stop offset="75%" stopColor="#E1306C" />
        <stop offset="100%" stopColor="#F77737" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#instagram-grad)" strokeWidth="2.5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="url(#instagram-grad)" strokeWidth="2.5" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="url(#instagram-grad)" strokeWidth="2.5" />
  </svg>
);

const YouTubeLogo = () => (
  <svg className="w-5 h-5 fill-current text-[#FF0000]" viewBox="0 0 24 24">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const LinkedInLogo = () => (
  <svg className="w-5 h-5 fill-current text-[#0A66C2]" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

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
            CARD 1: ATTENTION PSYCHOLOGY (TOP FULL-WIDTH)
           ======================================================== */}
        <div className="w-full glassy-card rounded-2xl p-6 md:p-8 relative overflow-hidden mb-6 flex flex-col lg:flex-row justify-between items-stretch gap-6 transition-all duration-300">
          
          {/* Left Column: Title & Description */}
          <div className="lg:w-1/2 flex flex-col justify-between items-start relative z-10 py-1">
            <div className="space-y-4">
              
              {/* Title with gradient number matching reference style */}
              <h3 className="text-2xl md:text-3xl font-bold tracking-tighter text-white leading-none font-sans flex items-center gap-3">
                <span className="text-4xl md:text-5xl font-black bg-gradient-to-br from-white via-[#FFC800] to-[#FFC800]/20 bg-clip-text text-transparent select-none">1</span>
                <span>Attention psychology</span>
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
            
            {/* Floating Logos (Continuous Floating and Interactive Tilt) */}
            <div className="absolute -top-3 right-6 flex gap-2.5 z-20">
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.2, rotate: -4 }}
                className="w-9 h-9 bg-white/[0.02] border border-white/10 rounded-lg flex items-center justify-center shadow-md hover:border-[#FFC800]/50 hover:bg-[#000]/40 transition-colors cursor-pointer"
                title="Instagram"
              >
                <InstagramLogo />
              </motion.div>
              <motion.div 
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.2, rotate: 4 }}
                className="w-9 h-9 bg-white/[0.02] border border-white/10 rounded-lg flex items-center justify-center shadow-md hover:border-[#FF0000]/40 hover:bg-[#000]/40 transition-colors cursor-pointer"
                title="YouTube"
              >
                <YouTubeLogo />
              </motion.div>
              <motion.div 
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.2, rotate: -3 }}
                className="w-9 h-9 bg-white/[0.02] border border-white/10 rounded-lg flex items-center justify-center shadow-md hover:border-[#0A66C2]/40 hover:bg-[#000]/40 transition-colors cursor-pointer"
                title="LinkedIn"
              >
                <LinkedInLogo />
              </motion.div>
            </div>

            {/* Glassy Topics Panel - Words Only, Compact */}
            <div className="w-full glassy-panel rounded-xl p-5 mt-8 flex-1 flex flex-col justify-center space-y-2.5 shadow-inner">
              <div className="space-y-2 text-xs md:text-[13px] font-bold text-white/80 font-sans tracking-tight">
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>A → Z of Hook engineering & packaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>Audience Behaviour & virality psychology</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>Retention Strategy & video structuring</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>Storytelling & narrative architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>Content Strategy & market positioning</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================
            2x2 GRID FOR OTHER 4 MODULES (SAME SIZES, COMPACT)
           ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-stretch">
          
          {/* CARD 2: CLIENT ACQUISITION */}
          <div className="glassy-card rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between transition-all duration-300">
            
            {/* Top Area: Title */}
            <div className="space-y-3 relative z-10">
              <div className="flex justify-between items-start">
                
                {/* Title with gradient number matching reference style */}
                <h4 className="text-xl font-bold tracking-tighter text-white font-sans leading-none flex items-center gap-2">
                  <span className="text-3xl font-black bg-gradient-to-br from-white via-[#FFC800] to-[#FFC800]/20 bg-clip-text text-transparent select-none">2</span>
                  <span>Client Acquisition</span>
                </h4>
                
                {/* Floating Logos (Continuous Floating and Interactive Tilt) */}
                <div className="flex gap-1.5">
                  <motion.span 
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="w-7 h-7 rounded bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer overflow-hidden hover:border-[#FF8200]/40" 
                    title="Apollo"
                  >
                    <img src="/logos/apollo-logo.jpg" alt="Apollo" className="w-full h-full object-contain p-0.5" />
                  </motion.span>
                  <motion.span 
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ duration: 4.1, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    className="w-7 h-7 rounded bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer overflow-hidden hover:border-[#FF7A59]/40" 
                    title="HubSpot"
                  >
                    <img src="/logos/hubspot-logo.jpg" alt="HubSpot" className="w-full h-full object-contain p-0.5" />
                  </motion.span>
                  <motion.span 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.2, rotate: 4 }}
                    className="w-7 h-7 rounded bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer overflow-hidden hover:border-[#FF02F0]/40" 
                    title="ClickUp"
                  >
                    <img src="/logos/clickup-logo.svg" alt="ClickUp" className="w-full h-full object-contain p-0.5" />
                  </motion.span>
                </div>
              </div>
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
                  <span>Basics of Marketing & positioning</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>How to negotiate high-ticket prices?</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>SOPs for seamless client onboarding & delivery</span>
                </div>
              </div>
            </div>

          </div>

          {/* CARD 3: CONTENT OPERATIONS */}
          <div className="glassy-card rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between transition-all duration-300">
            
            {/* Top Area: Title */}
            <div className="space-y-3 relative z-10">
              <div className="flex justify-between items-start">
                
                {/* Title with gradient number matching reference style */}
                <h4 className="text-xl font-bold tracking-tighter text-white font-sans leading-none flex items-center gap-2">
                  <span className="text-3xl font-black bg-gradient-to-br from-white via-[#FFC800] to-[#FFC800]/20 bg-clip-text text-transparent select-none">3</span>
                  <span>Content Operations</span>
                </h4>
                
                {/* Floating Logos (Continuous Floating and Interactive Tilt) */}
                <div className="flex gap-1.5">
                  <motion.span 
                    animate={{ y: [0, -3.5, 0] }}
                    transition={{ duration: 3.3, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.2, rotate: -4 }}
                    className="w-7 h-7 rounded bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer overflow-hidden hover:border-white" 
                    title="Notion"
                  >
                    <img src="/logos/notion-logo.png" alt="Notion" className="w-full h-full object-contain p-0.5 scale-110" />
                  </motion.span>
                  <motion.span 
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 3.9, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="w-7 h-7 rounded bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer overflow-hidden hover:border-[#FF1E82]/40" 
                    title="Frame.io"
                  >
                    <img src="/logos/frameio-logo.webp" alt="Frame.io" className="w-full h-full object-contain scale-120" />
                  </motion.span>
                  <motion.span 
                    animate={{ y: [0, -4.5, 0] }}
                    transition={{ duration: 4.3, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.2, rotate: -3 }}
                    className="w-7 h-7 rounded bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer overflow-hidden hover:border-[#36C5F0]/40" 
                    title="Slack"
                  >
                    <img src="/logos/slack-logo.png" alt="Slack" className="w-full h-full object-contain p-0.5 scale-110" />
                  </motion.span>
                </div>
              </div>
            </div>

            {/* Glassy Topics Panel - Words Only */}
            <div className="w-full glassy-panel rounded-lg p-4 my-4 flex-1 flex flex-col justify-center space-y-2 shadow-inner">
              <div className="space-y-2 text-[11px] md:text-xs font-bold text-white/80 font-sans tracking-tight">
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>How to build standard operating procedures (SOPs)?</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>Workflow architecture & automated task boards</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>How to hire, manage & scale remote editing teams?</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>Setting up seamless review & approval automation</span>
                </div>
              </div>
            </div>

          </div>

          {/* CARD 4: FOUNDER THINKING */}
          <div className="glassy-card rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between transition-all duration-300">
            
            {/* Top Area: Title */}
            <div className="space-y-3 relative z-10">
              
              {/* Title with gradient number matching reference style */}
              <h4 className="text-xl font-bold tracking-tighter text-white font-sans leading-none flex items-center gap-2">
                <span className="text-3xl font-black bg-gradient-to-br from-white via-[#FFC800] to-[#FFC800]/20 bg-clip-text text-transparent select-none">4</span>
                <span>Founder Thinking</span>
              </h4>
            </div>

            {/* Glassy Topics Panel - Words Only */}
            <div className="w-full glassy-panel rounded-lg p-4 my-4 flex-1 flex flex-col justify-center space-y-2 shadow-inner">
              <div className="space-y-2 text-[11px] md:text-xs font-bold text-white/80 font-sans tracking-tight">
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>How to overcome imposter syndrome & perfectionism?</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>Objective decision-making frameworks for founders</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>Psychology of pricing & making your first dollar online</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>Conquering anxiety & building launch-day momentum</span>
                </div>
                
                {/* Pulsing Gold Launch Status */}
                <div className="flex items-center gap-1.5 pt-1.5 border-t border-white/5 mt-1">
                  <span className="w-1.5 h-1.5 bg-[#FFC800] rounded-full animate-ping" />
                  <span className="text-[9px] font-sans font-black tracking-[0.25em] text-[#FFC800] block drop-shadow-[0_0_10px_rgba(255,200,0,0.4)]">
                    READY TO LAUNCH
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* CARD 5: AI CREATIVE STUDIO (SAME SIZE AS COMPANIONS, WITH NEW BADGE) */}
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

            {/* Top Area: Title */}
            <div className="space-y-3 relative z-10">
              <div className="flex justify-between items-start">
                
                {/* Title with gradient number matching reference style */}
                <h4 className="text-xl font-bold tracking-tighter text-white font-sans leading-none flex items-center gap-2">
                  <span className="text-3xl font-black bg-gradient-to-br from-white via-[#FFC800] to-[#FFC800]/20 bg-clip-text text-transparent select-none">5</span>
                  <span>AI Creative Studio</span>
                </h4>
                
                {/* Floating Logos (Continuous Floating and Interactive Tilt) */}
                <div className="flex gap-1.5 pr-12">
                  <motion.span 
                    animate={{ y: [0, -3.2, 0] }}
                    transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.2, rotate: -4 }}
                    className="w-7 h-7 rounded bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer overflow-hidden hover:border-[#D7FF28]/45" 
                    title="Higgsfield"
                  >
                    <img src="/logos/higgsfield-logo.webp" alt="Higgsfield" className="w-full h-full object-cover" />
                  </motion.span>
                  <motion.span 
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="w-7 h-7 rounded bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer overflow-hidden hover:shadow-[0_0_8px_rgba(158,122,255,0.4)]" 
                    title="Gemini"
                  >
                    <img src="/logos/gemini-logo.webp" alt="Gemini" className="w-full h-full object-contain scale-115" />
                  </motion.span>
                  <motion.span 
                    animate={{ y: [0, -4.8, 0] }}
                    transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.2, rotate: -3 }}
                    className="w-7 h-7 rounded bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer overflow-hidden hover:border-[#D97706]/45" 
                    title="Claude"
                  >
                    <img src="/logos/claude-logo.jpg" alt="Claude" className="w-full h-full object-contain p-0.5" />
                  </motion.span>
                </div>
              </div>
            </div>

            {/* Glassy Topics Panel - Words Only (Reference aligned) */}
            <div className="w-full glassy-panel rounded-lg p-4 my-4 flex-1 flex flex-col justify-center space-y-2 shadow-inner">
              <div className="space-y-2 text-[11px] md:text-xs font-bold text-white/80 font-sans tracking-tight">
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>Neural video generation & motion tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>Multimodal AI scripting & advanced ideation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>Voice cloning & digital avatar synthesis</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FFC800] font-black select-none">+</span>
                  <span>AI prompt engineering for creative scale</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default SprintProtocol;
