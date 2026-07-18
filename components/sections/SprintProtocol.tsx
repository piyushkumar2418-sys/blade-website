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
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// HubSpot Orange
const HubSpotLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#FF7A59]" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
    <line x1="12" y1="9.5" x2="12" y2="4.5" />
    <line x1="13.77" y1="13.02" x2="18.1" y2="15.52" />
    <line x1="10.23" y1="13.02" x2="5.9" y2="15.52" />
    <circle cx="12" cy="3" r="2" fill="currentColor" />
    <circle cx="19.5" cy="16.5" r="2" fill="currentColor" />
    <circle cx="4.5" cy="16.5" r="2" fill="currentColor" />
  </svg>
);

// Apollo Orange/Gold
const ApolloLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#FF8200]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.5s4 4.5 4 10.5c0 1.5-.5 3-1.5 4.5L12 21.5l-2.5-4c-1-1.5-1.5-3-1.5-4.5 0-6 4-10.5 4-10.5z" />
    <path d="M9 14.5h6" />
  </svg>
);

// Zoho Colored blocks
const ZohoLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <rect x="2" y="2" width="9" height="9" fill="#E21A22" rx="1.5" />
    <rect x="13" y="2" width="9" height="9" fill="#00A2E8" rx="1.5" />
    <rect x="2" y="13" width="9" height="9" fill="#8DC63F" rx="1.5" />
    <rect x="13" y="13" width="9" height="9" fill="#FBB040" rx="1.5" />
  </svg>
);

// Notion B&W
const NotionLogo = () => (
  <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
    <path d="M4.46 2.587c.228-.093.593-.162.998-.162h11.968c.552 0 .979.162 1.344.471.28.243.376.544.376 1.054v14.484c0 .543-.16.924-.469 1.206-.293.267-.732.392-1.25.392H4.992c-.443 0-.829-.092-1.156-.37-.323-.272-.47-.648-.47-1.228V4.025c0-.606.196-1.077.56-1.344.184-.136.326-.188.534-.094zm1.536 2.385v12.247c0 .193.076.368.21.459.088.062.24.116.483.116h8.796c.264 0 .42-.054.512-.116.12-.08.204-.266.204-.459V6.012c0-.23-.084-.403-.204-.492a.684.684 0 0 0-.512-.093H6.688c-.243 0-.395.031-.483.093-.134.089-.21.262-.21.492zm2.007 1.48c0-.256.126-.411.378-.411h1.365l3.227 4.962V5.98h1.666c.252 0 .378.155.378.411v6.786c0 .257-.126.411-.378.411h-1.253L8.381 8.358v4.819H6.713c-.252 0-.378-.154-.378-.411V6.452z"/>
  </svg>
);

// Frame.io Hot Pink
const FrameioLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#FF1E82] fill-current">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-4h-2V9h2V7c0-1.66 1.34-3 3-3h2v2h-2c-.55 0-1 .45-1 1v2h3v2h-3v4z" />
  </svg>
);

// Slack Multi-colored
const SlackLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52-2.523 2.528 2.528 0 0 1 2.522 2.523v2.52h-2.522zm1.26 0a2.528 2.528 0 0 1-2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.042a2.528 2.528 0 0 1-2.522 2.52H8.822a2.528 2.528 0 0 1-2.52-2.52v-5.042z" fill="#36C5F0"/>
    <path d="M8.822 5.043a2.528 2.528 0 0 1 2.52-2.522 2.528 2.528 0 0 1 2.522 2.522v2.52h-2.522zm0 1.26a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.52 2.522H3.78a2.528 2.528 0 0 1-2.52-2.522V8.822a2.528 2.528 0 0 1 2.52-2.52h5.043z" fill="#2EB67D"/>
    <path d="M18.958 8.822a2.528 2.528 0 0 1 2.522-2.52 2.528 2.528 0 0 1 2.52 2.52v2.522h-2.52zm-1.26 0a2.528 2.528 0 0 1-2.52 2.52H10.13a2.528 2.528 0 0 1-2.522-2.52V3.78a2.528 2.528 0 0 1 2.522-2.52h5.047a2.528 2.528 0 0 1 2.52 2.52v5.042z" fill="#ECB22E"/>
    <path d="M15.178 18.958a2.528 2.528 0 0 1-2.52 2.522 2.528 2.528 0 0 1-2.522-2.522v-2.52h2.522zm0-1.26a2.528 2.528 0 0 1-2.52 2.52H10.13a2.528 2.528 0 0 1-2.522-2.52V10.13a2.528 2.528 0 0 1 2.522-2.52h5.047a2.528 2.528 0 0 1 2.52 2.52v5.047z" fill="#E01E5A"/>
  </svg>
);

// Higgsfield Neon Yellow-Green
const HiggsfieldLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#D7FF28]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 4c3 0 4 3 4 8s1 8 4 8 M16 4c-3 0-4 3-4 8s-1 8-4 8" />
  </svg>
);

// Gemini AI Gradient
const GeminiLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
    <defs>
      <linearGradient id="gemini-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#9E7AFF" />
        <stop offset="50%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#FF7A59" />
      </linearGradient>
    </defs>
    <path d="M12 2c0 5.5-4.5 10-10 10 5.5 0 10 4.5 10 10 0-5.5 4.5-10 10-10-5.5 0-10-4.5-10-10z" fill="url(#gemini-grad)" />
  </svg>
);

// Claude Terracotta Orange
const ClaudeLogo = () => (
  <svg viewBox="0 0 16 16" className="w-5 h-5 text-[#D97706] fill-current">
    <path d="m3.127 10.604 3.135-1.76.053-.153-.053-.085H6.11l-.525-.032-1.791-.048-1.554-.065-1.505-.08-.38-.081L0 7.832l.036-.234.32-.214.455.04 1.009.069 1.513.105 1.097.064 1.626.17h.259l.036-.105-.089-.065-.068-.064-1.566-1.062-1.695-1.121-.887-.646-.48-.327-.243-.306-.104-.67.435-.48.585.04.15.04.593.456 1.267.981 1.654 1.218.242.202.097-.068.012-.049-.109-.181-.9-1.626-.96-1.655-.428-.686-.113-.411a2 2 0 0 1-.068-.484l.496-.674L4.446 0l.662.089.279.242.411.94.666 1.48 1.033 2.014.302.597.162.553.06.17h.105v-.097l.085-1.134.157-1.392.154-1.792.052-.504.25-.605.497-.327.387.186.319.456-.045.294-.19 1.23-.37 1.93-.243 1.29h.142l.161-.16.654-.868 1.097-1.372.484-.545.565-.601.363-.287h.686l.505.751-.226.775-.707.895-.585.759-.839 1.13-.524.904.048.072.125-.012 1.897-.403 1.024-.186 1.223-.21.553.258.06.263-.218.536-1.307.323-1.533.307-2.284.54-.028.02.032.04 1.029.098.44.024h1.077l2.005.15.525.346.315.424-.053.323-.807.411-3.631-.863-.872-.218h-.12v.073l.726.71 1.331 1.202 1.667 1.55.084.383-.214.302-.226-.032-1.464-1.101-.565-.497-1.28-1.077h-.084v.113l.295.432 1.557 2.34.08.718-.112.234-.404.141-.444-.08-.911-1.28-.94-1.44-.759-1.291-.093.053-.448 4.821-.21.246-.484.186-.403-.307-.214-.496.214-.98.258-1.28.21-1.016.19-1.263.112-.42-.008-.028-.092.012-.953 1.307-1.448 1.957-1.146 1.227-.274.109-.477-.247.045-.44.266-.39 1.586-2.018.956-1.25.617-.723-.004-.105h-.036l-4.212z"/>
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
                    className="w-5.5 h-5.5 rounded bg-white/[0.01] border border-white/10 flex items-center justify-center cursor-pointer hover:border-[#FF8200]/40" 
                    title="Apollo"
                  >
                    <ApolloLogo />
                  </motion.span>
                  <motion.span 
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ duration: 4.1, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    className="w-5.5 h-5.5 rounded bg-white/[0.01] border border-white/10 flex items-center justify-center cursor-pointer hover:border-[#FF7A59]/40" 
                    title="HubSpot"
                  >
                    <HubSpotLogo />
                  </motion.span>
                  <motion.span 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.2, rotate: 4 }}
                    className="w-5.5 h-5.5 rounded bg-white/[0.01] border border-white/10 flex items-center justify-center cursor-pointer hover:border-[#E21A22]/40" 
                    title="Zoho CRM"
                  >
                    <ZohoLogo />
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
                    className="w-5.5 h-5.5 rounded bg-white/[0.01] border border-white/10 flex items-center justify-center cursor-pointer hover:border-white" 
                    title="Notion"
                  >
                    <NotionLogo />
                  </motion.span>
                  <motion.span 
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 3.9, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="w-5.5 h-5.5 rounded bg-white/[0.01] border border-white/10 flex items-center justify-center cursor-pointer hover:border-[#FF1E82]/40" 
                    title="Frame.io"
                  >
                    <FrameioLogo />
                  </motion.span>
                  <motion.span 
                    animate={{ y: [0, -4.5, 0] }}
                    transition={{ duration: 4.3, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.2, rotate: -3 }}
                    className="w-5.5 h-5.5 rounded bg-white/[0.01] border border-white/10 flex items-center justify-center cursor-pointer hover:border-[#36C5F0]/40" 
                    title="Slack"
                  >
                    <SlackLogo />
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
                    className="w-5.5 h-5.5 rounded bg-white/[0.01] border border-white/10 flex items-center justify-center cursor-pointer hover:border-[#D7FF28]/45" 
                    title="Higgsfield"
                  >
                    <HiggsfieldLogo />
                  </motion.span>
                  <motion.span 
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="w-5.5 h-5.5 rounded bg-white/[0.01] border border-white/10 flex items-center justify-center cursor-pointer hover:shadow-[0_0_8px_rgba(158,122,255,0.4)]" 
                    title="Gemini"
                  >
                    <GeminiLogo />
                  </motion.span>
                  <motion.span 
                    animate={{ y: [0, -4.8, 0] }}
                    transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.2, rotate: -3 }}
                    className="w-5.5 h-5.5 rounded bg-white/[0.01] border border-white/10 flex items-center justify-center cursor-pointer hover:border-[#D97706]/45" 
                    title="Claude"
                  >
                    <ClaudeLogo />
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
