"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useInView, Variants, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Zap, Award, Eye, ArrowRight, TrendingUp, Shield, Target, Rocket, BarChart3, Binary, Lock, ShieldCheck, MessageCircle } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import DrawingCanvas from "@/components/DrawingCanvas";
import Scene3D from "@/components/Scene3D";
import { useSite } from "@/context/SiteContext";
import { useAuth } from "@/context/AuthContext";

// --- ANIMATION VARIANTS ---
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const InstagramIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);


const SectionLabel = ({ children, light = false, gold = false }: { children: React.ReactNode, light?: boolean, gold?: boolean }) => (
  <div className="flex items-center gap-4 mb-8 text-left">
    <div className={`h-[1px] w-8 ${gold ? 'bg-[#F3D7A7]' : light ? 'bg-white/20' : 'bg-black/20'}`} />
    <span className={`text-[10px] font-bold uppercase tracking-[0.4em] ${gold ? 'text-[#F3D7A7]' : light ? 'text-white/40' : 'text-black/40'}`}>{children}</span>
  </div>
);

const WorkItem = ({ work, aspect, index, autoplay = false }: { work: any, aspect: string, index: number, autoplay?: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // For autoplay items, play as soon as they come into view
  React.useEffect(() => {
    if (autoplay && isInView && videoRef.current) {
      videoRef.current.play().catch(() => null);
    }
  }, [autoplay, isInView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.6 } }
      }}
    >
      <motion.a 
        href={work.link} 
        target="_blank"
        onMouseEnter={() => { if (!autoplay) { setIsHovered(true); videoRef.current?.play().catch(() => null); } }}
        onMouseLeave={() => { if (!autoplay) { setIsHovered(false); videoRef.current?.pause(); if(videoRef.current) videoRef.current.currentTime = 0; } }}
        className={`group relative block ${aspect} bg-[#0a0a0a] border border-white/5 overflow-hidden rounded-sm shadow-2xl cursor-none`}
      >
        {/* Thumbnail — hidden for autoplay items */}
        {!autoplay && (
          <img src={work.img} alt={work.title} className={`absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
        )}
        <video ref={videoRef} key={work.video} src={work.video} loop muted playsInline autoPlay={autoplay} className="absolute inset-0 w-full h-full object-cover z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-30" />
        <div className="absolute bottom-5 left-5 z-40 text-left">
          <span className="text-[#F3D7A7] text-[8px] uppercase tracking-[0.3em] block mb-1 font-bold">{work.category}</span>
          <h4 className="text-sm md:text-base font-bold uppercase tracking-tight text-white">{work.title}</h4>
        </div>
      </motion.a>
    </motion.div>
  );
};

const LogoMarquee = () => {
  const logos = [
    { name: "Amazon", url: "/amazon.jpg" },
    { name: "Flipkart", url: "/flipkart.jpg" },
    { name: "Bajaj", url: "https://companieslogo.com/img/orig/BAJAJ-AUTO.NS_BIG-afa2b58c.png" },
    { name: "Reliance", url: "/reliance.png" },
    { name: "Nykaa", url: "/nykaa.png" },
    { name: "Pantaloons", url: "/pantaloons.svg" },
    { name: "Mirchi", url: "/mirchi.jpg" },
    { name: "WTF", url: "/wtf.jpg" },
    { name: "ThriveStack", url: "/thrivestack.jpg" },
    { name: "SuperYou", url: "/superyou.jpg" },
    { name: "ActorsTruth", url: "/actorstruth.png" },
    { name: "FamApp", url: "/fampay.png" },
  ];

  const doubledLogos = [...logos, ...logos];

  return (
    <div className="relative w-full overflow-hidden py-24 bg-black/50 border-y border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 mb-16 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="h-[1px] w-8 bg-[#F3D7A7]" />
            <h3 className="text-white text-xl md:text-3xl font-bold uppercase tracking-tighter">Trusted by <span className="text-[#F3D7A7]">Industry Leaders</span></h3>
         </div>
         <div className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold hidden md:block">Institutional Network</div>
      </div>
      
      <div className="flex whitespace-nowrap overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black to-transparent z-10" />

        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 md:gap-12 items-center px-12"
        >
          {doubledLogos.map((logo, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 flex items-center justify-center p-4 md:p-6 bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-2xl md:rounded-3xl hover:bg-white/[0.12] hover:border-white/[0.2] transition-all duration-500 group cursor-pointer"
              style={{ minWidth: '180px', height: '80px' }}
            >
              <img 
                src={logo.url} 
                alt={logo.name} 
                className="h-8 md:h-10 w-auto max-w-[140px] object-contain transition-all duration-500 group-hover:scale-110"
                onError={(e) => {
                   (e.target as any).style.display = 'none';
                   const parent = (e.target as any).parentElement;
                   const span = document.createElement('span');
                   span.innerText = logo.name;
                   span.className = "text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]";
                   parent.appendChild(span);
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default function Home() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const { mode, toggleMode } = useSite();
  const isAgency = mode === "agency";
  const containerRef = useRef(null);
  const philosophyLeftRef = useRef(null);
  const isPhilosophyLeftInView = useInView(philosophyLeftRef, { once: true, margin: "-20%" });
  
  const { scrollYProgress } = useScroll({ target: containerRef });
  const navButtonOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const handleToggle = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    toggleMode();
  };

  const youtubeWorks = [
    { title: "Nikhil Kamath", category: "Storytelling", link: "https://youtu.be/YY7J1pHfSyY", video: "/preview1.mp4", img: "/thumb1.jpg" },
    { title: "Money with Swabi", category: "Infotainment", link: "https://www.youtube.com/@Moneywithswabi/videos", video: "/preview2.mp4", img: "/thumb2.jpg" },
    { title: "Right Now With Rohan", category: "Podcast", link: "https://youtu.be/i7uwh0CzfRM", video: "/preview3.mp4", img: "/thumb3.jpg" },
  ];

  const verticalWorks = [
    { title: "Visual Dominance", category: "Retention", link: "https://www.instagram.com/reel/DDrxL2CMYCB/", video: "/preview5.mp4", img: "/thumb5.webp" },
    { title: "Editorial Series", category: "Vlog Edit", link: "https://www.instagram.com/katemackz/", video: "/preview6.mp4", img: "/thumb6.webp" },
    { title: "Dynamic Flow", category: "Motion Graphics", link: "https://www.instagram.com/DKTmhQqqF6M/", video: "/preview7.mp4", img: "/thumb7.jpg" },
    { title: "Retention Edit", category: "Viral Edit", link: "https://www.instagram.com/DTIgqVyjVcJ/", video: "/preview8.mp4", img: "/thumb8.jpeg" },
  ];

  const founderStats = [
    { icon: <Eye size={18} />, label: "2.5B+ Views Generated", desc: "Market-wide reach across primary channels." },
    { icon: <TrendingUp size={18} />, label: "₹3Cr+ Revenue Built Through Content", desc: "Capital generated through visual systems." },
    { icon: <Award size={18} />, label: "Worked With Leading Creators & Brands", desc: "Strategic partner for top-tier creators." },
    { icon: <Zap size={18} />, label: "5+ Years of Execution Experience", desc: "Applied experience in high-ticket markets." },
  ];

  const sprintPhases = [
    { phase: "01", title: "Foundation", desc: "Deconstructing your current output. Removing inefficiencies. Setting the institutional baseline." },
    { phase: "02", title: "Synthesis", desc: "Mastering the Blade methodology. Building your proprietary content frameworks." },
    { phase: "03", title: "Infrastructure", desc: "Setting up your high-ticket editing engine and distribution systems." },
    { phase: "04", title: "Velocity", desc: "Execution under pressure. Scaling output without losing premium positioning." },
    { phase: "05", title: "Monetization", desc: "Converting views into capital. Building the high-ticket sales funnel." },
  ];

  return (
    <motion.main 
      ref={containerRef} 
      animate={{ backgroundColor: isAgency ? "#000000" : "#ffffff" }}
      className="relative overflow-x-hidden selection:bg-[#F3D7A7] selection:text-black"
      style={{ transition: "background-color 0.8s ease" }}
    >
      <CustomCursor />
      
      {isAgency && (
        <>
          <DrawingCanvas color="#F3D7A7" />
          <Scene3D />
        </>
      )}

      {/* SEPARATE LOGO & TOGGLE FROM HEADER */}
      <div className="fixed top-6 left-6 md:top-8 md:left-8 z-[110] pointer-events-auto">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-90"
        >
          <img src="/blade-logo.png" alt="Blade Logo" className="w-full h-full object-contain brightness-0 invert" />
        </button>
      </div>

      <div className="fixed top-6 right-6 md:top-8 md:right-8 z-[110] pointer-events-auto flex items-center gap-2 md:gap-3">
        <button 
          onClick={handleToggle} 
          className={`px-4 py-2.5 md:px-6 md:py-3 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.1em] transition-all hover:scale-105 active:scale-95 ${
            isAgency 
            ? "bg-white/5 border border-white/10 text-white hover:bg-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)]" 
            : "bg-black/5 border border-black/10 text-black hover:bg-black/10 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.05)]"
          }`}
        >
          {isAgency ? "The Inner Circle" : "Exit To Agency"}
        </button>

        {!isAgency && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.push(user ? "/dashboard" : "/apply/login")}
            className="px-4 py-2.5 md:px-6 md:py-3 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.1em] transition-all hover:scale-105 active:scale-95 bg-black text-white border border-black/10 shadow-xl flex items-center gap-2"
          >
            {user ? (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Profile
              </>
            ) : "Sign In"}
          </motion.button>
        )}
      </div>

      {/* COMPACT PREMIUM HEADER (NAV ONLY) - AGENCY ONLY */}
      {isAgency && (
        <motion.header 
          style={{ opacity: navButtonOpacity }}
          className="fixed bottom-8 md:top-8 md:bottom-auto left-0 right-0 z-[100] px-6 flex justify-center pointer-events-none font-['Helvetica',_sans-serif]"
        >
          <div className="flex items-center gap-1.5 md:gap-2 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-full p-1 md:p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto relative group">
            <nav className="flex items-center gap-0.5 md:gap-1 px-1 md:px-2">
              {[
                { label: 'Process', id: 'section_process' },
                { label: 'Solutions', id: 'section_solutions' },
                { label: 'Edits', id: 'section_edits' }
              ].map((item) => (
                <a 
                  key={item.label} 
                  href={`#${item.id}`}
                  className="px-3 md:px-5 py-2 md:py-2.5 text-white/50 hover:text-white text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] transition-all duration-300 rounded-full hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center">
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://calendly.com/piyushkumar2418/30min" 
                target="_blank"
                className="bg-[#F3D7A7] text-black px-5 md:px-8 py-3 md:py-3.5 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-[0.05em] hover:shadow-[0_0_30px_rgba(243,215,167,0.3)] transition-all shadow-xl whitespace-nowrap"
              >
                contact us
              </motion.a>
            </div>
          </div>
        </motion.header>
      )}

      <AnimatePresence mode="wait">
        {isAgency ? (
          <motion.div key="agency" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* HERO */}
            <section className="h-screen w-full flex flex-col justify-center items-center text-center relative overflow-hidden bg-black">
              <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-70">
                <source src="/hero-bg.mp4?v=4" type="video/mp4" />
              </video>
              <div className="relative z-20 px-4 text-center">
                <h1 className="text-[14vw] md:text-[11vw] font-bold leading-[0.8] tracking-[-0.06em] uppercase mb-8 text-white text-center">Growth,<br/>engineered.</h1>
                <p className="text-[#F3D7A7] text-[10px] md:text-[12px] uppercase tracking-[0.8em] font-bold text-center">Blade Media</p>
              </div>
            </section>

            {/* PHILOSOPHY */}
            <section className="min-h-screen py-32 px-6 md:px-24 border-t border-white/5 relative z-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start max-w-[1440px] mx-auto text-left">
                <div className="md:sticky md:top-32" ref={philosophyLeftRef}>
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12 text-left">
                    <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold text-left">The Visionary</span>
                    <h2 className="text-5xl md:text-8xl font-bold leading-[0.85] tracking-[-0.06em] uppercase text-white mb-16 text-left">Systematized <br/> Visual <br/> Dominance.</h2>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
                    <p className="text-white/70 text-xl md:text-2xl lg:text-3xl font-medium leading-[1.4] tracking-tight text-left">
                      <span className="text-white font-bold">Blade</span> exists in a space where consistency matters more than claims. Delivered content that holds value as audiences evolve.
                    </p>
                    <div className="h-[1px] bg-[#F3D7A7]/40 mt-12 w-24" />
                  </motion.div>
                </div>
                <div className="max-w-xs md:max-w-md ml-auto text-left group">
                  <div className="relative aspect-[4/5] w-full mb-10 overflow-hidden bg-black border border-white/10 shadow-2xl">
                    {/* Main Image */}
                    <img 
                      src="/piyush.png" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                      alt="Piyush" 
                    />
                    
                    {/* Founder Label */}
                    <div className="absolute bottom-6 left-6 z-20">
                      <div className="bg-black/80 backdrop-blur-md px-6 py-3 border border-white/20 flex items-center gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#F3D7A7] animate-pulse" />
                        <div className="flex flex-col">
                          <span className="text-[11px] text-white font-bold uppercase tracking-[0.2em]">Piyush</span>
                          <span className="text-[9px] text-[#F3D7A7] font-medium uppercase tracking-[0.1em]">Founder- Blade Media</span>
                        </div>
                      </div>
                    </div>

                    {/* Gradient Overlay for better label readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <p className="text-white/60 text-lg font-light leading-relaxed text-left">&quot;We decoded content through an early obsession. Mastering the silent mechanics of distribution.&quot;</p>
                  <div className="text-[#F3D7A7] text-2xl font-bold mt-8 text-left">— Piyush</div>
                </div>
              </div>
            </section>

            {/* LOGO MARQUEE */}
            <LogoMarquee />

            {/* PROCESS SECTION */}
            <section id="section_process" className="py-32 px-6 md:px-24 border-t border-white/5 relative z-20">
              <div className="max-w-[1400px] mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12 text-left">
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                    <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold text-left">The Blade System</span>
                    <h2 className="text-5xl md:text-8xl font-bold leading-[0.85] tracking-[-0.06em] uppercase text-white text-left">
                      How we<br/>operate.
                    </h2>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="max-w-sm text-left">
                    <p className="text-white/40 text-lg leading-relaxed text-left">
                      We become your remote content engine. You focus on your brand — we handle everything from raw footage to distribution-ready assets.
                    </p>
                    <div className="mt-8 inline-flex items-center gap-4 px-6 py-3 border border-[#F3D7A7]/30 rounded-full">
                      <div className="w-2 h-2 rounded-full bg-[#F3D7A7] animate-pulse" />
                      <span className="text-[#F3D7A7] font-bold uppercase tracking-widest text-[10px]">90–120 Videos / Month</span>
                    </div>
                  </motion.div>
                </div>

                {/* Steps Grid */}
                <div className="relative text-left">
                  {/* 3D Background Glows */}
                  <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#F3D7A7]/10 rounded-full blur-[120px] pointer-events-none" />
                  <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#F3D7A7]/5 rounded-full blur-[120px] pointer-events-none" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 text-left">
                    {[
                      { num: "01", title: "Onboard & Audit", desc: "We decode your existing content, audience data, and brand positioning. A full teardown before we build.", time: "Week 1–2" },
                      { num: "02", title: "Build The System", desc: "Content frameworks, editorial calendars, style guides. We engineer the repeatable machine before we touch the timeline.", time: "Week 2–3" },
                      { num: "03", title: "High-Velocity Output", desc: "90–120 production-ready assets per month. Short-form, long-form, platform-native. Your brand, everywhere.", time: "Ongoing" },
                    ].map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.15 }}
                        whileHover={{ 
                          y: -10,
                          rotateX: 2,
                          rotateY: -2,
                          transition: { duration: 0.3 }
                        }}
                        className="p-10 md:p-12 group bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-2xl hover:border-[#F3D7A7]/50 hover:bg-white/[0.08] transition-all duration-500 shadow-2xl relative overflow-hidden text-left"
                        style={{ perspective: "1000px" }}
                      >
                        {/* 3D Inner Glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F3D7A7]/5 rounded-full blur-3xl group-hover:bg-[#F3D7A7]/10 transition-colors duration-700" />
                        
                        <div className="text-[80px] leading-none font-bold text-[#F3D7A7]/20 group-hover:text-[#F3D7A7]/40 transition-colors duration-700 mb-8 select-none tracking-tighter italic text-left">
                          {step.num}
                        </div>
                        <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-6 group-hover:text-[#F3D7A7] transition-colors duration-300 text-left">
                          {step.title}
                        </h3>
                        <p className="text-white/70 text-base leading-relaxed mb-12 font-medium text-left">
                          {step.desc}
                        </p>
                        <div className="pt-8 border-t border-white/10 text-left">
                          <span className="text-[#F3D7A7] text-[11px] font-bold uppercase tracking-[0.4em] px-4 py-2 bg-white/5 rounded-full border border-white/5">
                            {step.time}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Team + Big Number */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative text-left">
                  {/* 3D Depth Orb behind Stat */}
                  <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-[#F3D7A7]/10 rounded-full blur-[100px] pointer-events-none z-0" />
                  
                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative z-10 text-left">
                    <span className="text-[#F3D7A7] text-[11px] uppercase tracking-[0.4em] font-bold block mb-10 pl-2 border-l-2 border-[#F3D7A7] text-left">Your Dedicated Remote Team</span>
                    <div className="grid grid-cols-2 gap-4 text-left">
                      {['Senior Editors', 'Content Strategists', 'Motion Designers', 'Script Writers', 'Project Managers', 'QA Reviewers'].map((role, i) => (
                        <motion.div 
                          key={i} 
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(243, 215, 167, 0.05)" }}
                          className="flex items-center gap-4 px-6 py-5 bg-white/[0.03] backdrop-blur-md border border-white/[0.08] hover:border-[#F3D7A7]/40 transition-all duration-300 group rounded-xl text-left"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-[#F3D7A7]/30 group-hover:bg-[#F3D7A7] group-hover:shadow-[0_0_8px_#F3D7A7] transition-all duration-300" />
                          <span className="text-white/60 group-hover:text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300">{role}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-right relative z-10">
                    <div className="relative inline-block">
                      <div className="text-[90px] md:text-[140px] font-bold leading-none tracking-[-0.06em] text-white drop-shadow-[0_10px_30px_rgba(243,215,167,0.15)] text-right">
                        10,000<span className="text-[#F3D7A7]">+</span>
                      </div>
                      <div className="absolute -inset-4 bg-[#F3D7A7]/5 blur-2xl rounded-full -z-10 animate-pulse" />
                    </div>
                    <p className="text-white/60 text-[12px] md:text-[14px] uppercase tracking-[0.6em] font-bold mt-4 pr-2 text-right">Videos Produced</p>
                    
                    <motion.a
                      href="https://calendly.com/piyushkumar2418/30min"
                      target="_blank"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 0 40px rgba(243, 215, 167, 0.2)"
                      }}
                      className="inline-flex items-center gap-4 mt-16 px-12 py-6 bg-transparent border border-[#F3D7A7]/50 text-[#F3D7A7] rounded-full font-bold uppercase text-[11px] tracking-[0.3em] hover:bg-[#F3D7A7] hover:text-black hover:border-[#F3D7A7] transition-all duration-500 shadow-xl"
                    >
                      book a discovery call <ArrowUpRight size={16} />
                    </motion.a>
                  </motion.div>
                </div>

              </div>
            </section>

            {/* SOLUTIONS SECTION */}
            <section id="section_solutions" className="py-32 px-6 md:px-24 bg-black border-t border-white/5 relative z-20 overflow-hidden text-left">
              {/* 3D Depth Glows */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F3D7A7]/5 rounded-full blur-[160px] pointer-events-none" />

              <div className="max-w-[1400px] mx-auto relative z-10 text-left">
                <div className="mb-24 text-left">
                  <SectionLabel light>Solutions</SectionLabel>
                  <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tight leading-[0.85] text-white text-left">Strategic <br /><span className="text-[#F3D7A7]">Impact.</span></h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  {[
                    { 
                      title: "Short-Form Mastery", 
                      desc: "Engineered for retention. We ideate, script, and post-produce high-fidelity vertical content that commands attention across TikTok, Reels, and Shorts.",
                      icon: <Rocket size={24} className="text-[#F3D7A7]" />
                    },
                    { 
                      title: "High-Level Repurposing", 
                      desc: "Building content flywheels. We deconstruct your long-form assets (Podcasts, Keynotes, Webinars) into a month's worth of distribution-ready highlights.",
                      icon: <TrendingUp size={24} className="text-[#F3D7A7]" />
                    },
                    { 
                      title: "Digital Assets", 
                      desc: "Best-in-class launch videos, B2B trailers, and brand stories. We craft compelling visual narratives that build anticipation and drive conversions.",
                      icon: <Award size={24} className="text-[#F3D7A7]" />
                    },
                    { 
                      title: "Creative Direction", 
                      desc: "Beyond editing. We become your remote brains, providing the strategic roadmap to ensure your content aligns with your premium positioning.",
                      icon: <Target size={24} className="text-[#F3D7A7]" />
                    }
                  ].map((solution, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      whileHover={{ 
                        scale: 1.02,
                        rotateX: 1,
                        rotateY: -1,
                        transition: { duration: 0.3 }
                      }}
                      className="bg-white/[0.05] backdrop-blur-xl border border-white/10 p-12 md:p-16 space-y-8 rounded-3xl hover:border-[#F3D7A7]/50 hover:bg-white/[0.08] transition-all duration-500 group shadow-2xl text-left"
                      style={{ perspective: "1000px" }}
                    >
                      <div className="p-5 bg-[#F3D7A7]/10 w-fit rounded-2xl border border-[#F3D7A7]/20 group-hover:bg-[#F3D7A7] transition-all duration-500 text-left">
                        {React.cloneElement(solution.icon as React.ReactElement<any>, { 
                          className: "text-[#F3D7A7] group-hover:text-black transition-colors duration-500" 
                        })}
                      </div>
                      <h3 className="text-3xl font-bold uppercase tracking-tight text-white group-hover:text-[#F3D7A7] transition-colors duration-300 text-left">{solution.title}</h3>
                      <p className="text-white/70 leading-relaxed text-lg font-medium text-left">{solution.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* GALLERIES */}
            <section id="section_edits" className="py-32 px-6 md:px-12 relative z-20 text-left">
              <div className="max-w-[1400px] mx-auto w-full space-y-48">
                <div className="text-left">
                  <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-[-0.06em] mb-12 text-white text-left">Selected Productions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {youtubeWorks.map((work, i) => ( <WorkItem key={i} work={work} aspect="aspect-video" index={i} /> ))}
                  </div>
                </div>
                <div className="text-left">
                  <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-[-0.06em] mb-12 text-[#F3D7A7] text-left">Viral Originals</h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                    {verticalWorks.map((work, i) => ( <WorkItem key={i} work={work} aspect="aspect-[9/16]" index={i} autoplay={true} /> ))}
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          /* --- INNER CIRCLE SIDE --- */
          <motion.div key="innerCircle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-black bg-white min-h-screen">
            
            <section className="h-screen flex flex-col justify-center px-6 md:px-24 border-b border-black/5 text-left">
              <div className="flex justify-between items-start mb-8 text-left">
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-[0.5em] font-bold block text-black/40 text-left">Blade Inner Circle</motion.span>
                <div className="px-4 py-2 border border-black/10 bg-black/5 text-black font-bold uppercase tracking-[0.3em] text-[10px] text-left">
                  May 2026 Intake
                </div>
              </div>
              <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-[12vw] md:text-[8vw] font-bold leading-[0.85] tracking-[-0.06em] uppercase mb-12 text-left">The School of <br/> Modern Content.</motion.h1>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 text-left">
                <p className="text-2xl md:text-4xl text-black/60 leading-tight font-medium max-w-2xl text-left">Build your agency. <br/> From skill to first income.</p>
                <div className="flex flex-col items-start md:items-end gap-6 text-left">
                  <span className="text-[#F3D7A7] font-bold uppercase tracking-[0.3em] text-[10px] border border-[#F3D7A7]/30 px-4 py-2 text-left">Cohort 01 — Applications Open</span>
                  <button onClick={() => router.push(user ? "/apply/register" : "/apply/login")} className="bg-black text-white px-12 py-6 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#F3D7A7] hover:text-black transition-all flex items-center gap-4 shadow-2xl text-left">Apply now <ArrowUpRight size={18}/></button>
                </div>
              </div>
            </section>

            {/* THE CONTENT CRISIS */}
            <section className="py-32 px-6 md:px-24 bg-black text-white text-left">
              <div className="max-w-7xl mx-auto text-left">
                <SectionLabel light>The Industry Crisis</SectionLabel>
                <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tight leading-[0.85] mb-20 text-left">The creator economy <br /> <span className="text-white/20">is built on sand.</span></h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                   <div className="space-y-8 p-12 border border-white/10 bg-white/5 rounded-2xl text-left">
                      <h4 className="text-[#F3D7A7] text-sm font-bold uppercase tracking-widest text-left">The Amateur Trap</h4>
                      <ul className="space-y-4 text-white/40 text-lg text-left">
                        <li className="flex items-center gap-3 text-left"><span className="text-red-500">✕</span> Guessing what works</li>
                        <li className="flex items-center gap-3 text-left"><span className="text-red-500">✕</span> Zero leverage in workflow</li>
                        <li className="flex items-center gap-3 text-left"><span className="text-red-500">✕</span> Relying on algorithm luck</li>
                        <li className="flex items-center gap-3 text-left"><span className="text-red-500">✕</span> Low-ticket, commodity mindset</li>
                      </ul>
                   </div>
                   <div className="space-y-8 p-12 border border-[#F3D7A7]/30 bg-[#F3D7A7]/5 rounded-2xl text-left">
                      <h4 className="text-[#F3D7A7] text-sm font-bold uppercase tracking-widest text-left">The Blade Protocol</h4>
                      <ul className="space-y-4 text-[#F3D7A7] text-lg text-left">
                        <li className="flex items-center gap-3 text-left"><span className="text-green-500">✓</span> Institutional systems</li>
                        <li className="flex items-center gap-3 text-left"><span className="text-green-500">✓</span> High-velocity infrastructure</li>
                        <li className="flex items-center gap-3 text-left"><span className="text-green-500">✓</span> Predictable growth mechanics</li>
                        <li className="flex items-center gap-3 text-left"><span className="text-green-500">✓</span> High-ticket capital extraction</li>
                      </ul>
                   </div>
                </div>
              </div>
            </section>

            <section className="py-32 px-6 md:px-24 max-w-7xl text-left border-b border-black/5 mx-auto">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start text-left">
                <div className="pr-0 md:pr-12 text-left">
                   <SectionLabel>Institutional Thesis</SectionLabel>
                   <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-[-0.06em] leading-[0.9] mb-12 text-left">Theoretical learning is a trap. <br/> <span className="text-black/20">This is an execution lab.</span></h2>
                   <p className="text-xl md:text-2xl text-black/60 leading-relaxed font-light text-left">Blade Inner Circle is a 2-month intensive for those who refuse to be passive. We deploy systems. Revenue is the only metric.</p>
                </div>
                <div className="grid grid-cols-1 gap-px bg-black/10 border border-black/10 text-left">
                  <div className="bg-white p-8 md:p-12 text-left">
                    <h4 className="text-xl font-bold uppercase mb-4 text-black text-left">Zero Theory</h4>
                    <p className="text-black/50 leading-relaxed text-sm md:text-base text-left">Everything decoded over thousands of hours of client work at Blade Media. We share the silent mechanics.</p>
                  </div>
                  <div className="bg-white p-8 md:p-12 border-t border-black/10 text-left">
                    <h4 className="text-xl font-bold uppercase mb-4 text-black text-left">High Stakes</h4>
                    <p className="text-black/50 leading-relaxed text-sm md:text-base text-left">Designed to move you from amateur creator to agency operator in 60 days.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* THE SPRINT PROTOCOL - TACTICAL REDESIGN */}
            <section className="py-40 px-6 md:px-24 bg-[#050505] text-white overflow-hidden relative">
              {/* DATA OVERLAY GRID */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#F3D7A7 1px, transparent 1px), linear-gradient(90deg, #F3D7A7 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
              
              <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex items-center gap-6 mb-16">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-[#F3D7A7] rounded-full animate-pulse" />
                    <div className="w-1.5 h-1.5 bg-[#F3D7A7]/40 rounded-full" />
                    <div className="w-1.5 h-1.5 bg-[#F3D7A7]/20 rounded-full" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-[#F3D7A7]">Institutional Protocol v2.6</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
                  <div className="space-y-10">
                    <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-[0.8] mb-8">
                      Master the <br/> <span className="text-white/20">Market DNA.</span>
                    </h2>
                    <p className="text-white/50 text-lg leading-relaxed max-w-lg font-light">
                      The Inner Circle is a 60-day operational sprint designed to transition you from a spectator to a high-value operator.
                    </p>
                    
                    <div className="flex flex-wrap gap-8 pt-8">
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#F3D7A7]">Mode of Delivery</p>
                        <p className="text-sm font-bold uppercase">Google Meet / Zoom (Live)</p>
                      </div>
                      <div className="w-[1px] h-10 bg-white/10 hidden md:block" />
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#F3D7A7]">Outcome Standard</p>
                        <p className="text-sm font-bold uppercase">Guaranteed Placement</p>
                      </div>
                    </div>
                  </div>

                  {/* INTERACTIVE 3D STATUS CARD */}
                  <motion.div 
                    initial={{ rotateY: 20, rotateX: 10 }}
                    whileHover={{ rotateY: 0, rotateX: 0 }}
                    className="relative group cursor-crosshair"
                  >
                    <div className="absolute inset-0 bg-[#F3D7A7]/20 blur-[100px] rounded-full group-hover:bg-[#F3D7A7]/40 transition-colors" />
                    <div className="relative bg-black/40 border border-white/10 p-12 md:p-16 backdrop-blur-3xl rounded-[2rem] space-y-12 shadow-2xl">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Active System</p>
                          <h4 className="text-xl font-bold uppercase tracking-tight">The 60-Day Sprint</h4>
                        </div>
                        <div className="bg-[#F3D7A7] text-black text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Live Operations</div>
                      </div>

                      <div className="space-y-8">
                        <div className="h-[1px] w-full bg-white/5 relative">
                          <motion.div 
                            animate={{ left: ["0%", "100%", "0%"] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[-1px] w-20 h-[3px] bg-[#F3D7A7] shadow-[0_0_15px_#F3D7A7]"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                          <div>
                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-2">Phase 01</p>
                            <p className="text-xs font-bold uppercase text-white/80">Skill Moat Built</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-2">Phase 02</p>
                            <p className="text-xs font-bold uppercase text-white/80">Infra Deployed</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-2">Phase 03</p>
                            <p className="text-xs font-bold uppercase text-white/80">Revenue Extraction</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-2">Phase 04</p>
                            <p className="text-xs font-bold uppercase text-white/80">System Scaling</p>
                          </div>
                        </div>
                      </div>

                      <button onClick={() => router.push("/curriculum")} className="w-full py-5 bg-white text-black font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-[#F3D7A7] transition-all">
                        Analyze Full Prospectus
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* BOTTOM PROTOCOL GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
                  <div className="p-12 space-y-6 hover:bg-white/[0.02] transition-colors group">
                    <Zap className="text-[#F3D7A7] group-hover:scale-110 transition-transform" size={24} />
                    <h5 className="text-sm font-bold uppercase tracking-widest">Direct Access</h5>
                    <p className="text-xs leading-relaxed text-white/40 uppercase tracking-wider">All sessions are live via Google Meet. Direct line to instructors for 1:1 strategy correction.</p>
                  </div>
                  <div className="p-12 space-y-6 hover:bg-white/[0.02] transition-colors group border-x border-white/5">
                    <Award className="text-[#F3D7A7] group-hover:scale-110 transition-transform" size={24} />
                    <h5 className="text-sm font-bold uppercase tracking-widest">Verified Pipeline</h5>
                    <p className="text-xs leading-relaxed text-white/40 uppercase tracking-wider">Guaranteed placement for high-performing operators within the Blade Media network.</p>
                  </div>
                  <div className="p-12 space-y-6 hover:bg-white/[0.02] transition-colors group">
                    <Lock className="text-[#F3D7A7] group-hover:scale-110 transition-transform" size={24} />
                    <h5 className="text-sm font-bold uppercase tracking-widest">Proprietary SOPs</h5>
                    <p className="text-xs leading-relaxed text-white/40 uppercase tracking-wider">Unlock the exact systems used to generate 2.5B+ views and ₹3Cr+ in market capital.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* FOUNDER AUTHORITY SECTION */}
            <section className="bg-white py-32 px-6 md:px-24 text-black text-left border-b border-black/5">
              <div className="flex flex-col md:flex-row items-center gap-20 md:gap-32 mb-28 text-left">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="w-full md:w-1/2 text-left">
                  <div className="relative aspect-[4/5] bg-[#F9F9F9] overflow-hidden grayscale group border border-black/5 text-left">
                    <img src="/piyush.png" alt="Founder" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 text-left" />
                    <div className="absolute bottom-8 left-8 z-20 text-left">
                      <div className="bg-black px-6 py-3 border border-[#F3D7A7]/30 flex flex-col text-left">
                        <span className="text-white text-[11px] font-bold uppercase tracking-[0.2em] text-left">Piyush</span>
                        <span className="text-[#F3D7A7] text-[9px] font-medium uppercase tracking-[0.1em] text-left">Founder- Blade Media</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
                <div className="w-full md:w-1/2 text-left">
                  <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-10 text-left">
                    <div className="text-left">
                      <SectionLabel>Founding Methodology</SectionLabel>
                      <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-[-0.06em] leading-[0.85] text-left">The Practitioner’s <br /> Ledger.</h2>
                    </div>
                    <p className="text-black/60 text-xl leading-relaxed max-w-lg font-light text-left">Blade Inner Circle is the distilled output of 5 years of market execution. We don&apos;t teach what we think — we teach what we have proven at scale.</p>
                    
                    <div className="grid grid-cols-2 gap-6 mt-12 text-left">
                       <div className="p-6 border border-black/5 bg-[#F9F9F9] space-y-2 text-left">
                          <BarChart3 size={20} className="text-[#F3D7A7] text-left" />
                          <h5 className="text-[10px] font-bold uppercase tracking-widest text-black/40 text-left">Market Reach</h5>
                          <p className="text-xl font-bold text-left">2.5B+ Views</p>
                       </div>
                       <div className="p-6 border border-black/5 bg-[#F9F9F9] space-y-2 text-left">
                          <Binary size={20} className="text-[#F3D7A7] text-left" />
                          <h5 className="text-[10px] font-bold uppercase tracking-widest text-black/40 text-left">Capital Extraction</h5>
                          <p className="text-xl font-bold text-left">₹3Cr+ Built</p>
                       </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10 border border-black/10 text-left">
                {founderStats.map((stat, idx) => (
                  <motion.div key={idx} className="p-10 bg-white hover:bg-[#F9F9F9] transition-all duration-500 group text-left">
                    <div className="mb-6 text-[#F3D7A7] transition-colors duration-500 text-left">{stat.icon}</div>
                    <h4 className="text-sm font-bold uppercase tracking-widest leading-tight mb-3 text-left">{stat.label}</h4>
                    <p className="text-[10px] text-black/30 uppercase tracking-[0.2em] text-left">{stat.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* CURRICULUM SECTION - MIRROR IMAGE BUT DOWNSIZED */}
            <section className="py-24 px-6 md:px-24 bg-white text-left">
              <div className="max-w-[1280px] mx-auto text-left">
                <div className="bg-black rounded-[60px] p-10 md:p-16 relative overflow-hidden text-left flex flex-col md:flex-row items-center gap-12 min-h-[500px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)]">
                  
                  {/* Decorative Circle */}
                  <div className="absolute top-16 right-[35%] w-12 h-12 border border-[#F3D7A7]/20 rounded-full hidden md:block text-left" />

                  {/* Content */}
                  <div className="flex-1 space-y-8 relative z-10 text-left">
                    <div className="space-y-4 text-left">
                      <span className="text-[#F3D7A7] text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block text-left">What you will learn</span>
                      <h2 className="text-white text-5xl md:text-[72px] font-bold uppercase tracking-tight leading-[0.85] mb-8 text-left">
                        The exact systems <br /> behind ₹3Cr+ in <br /> revenue.
                      </h2>
                    </div>
                    <p className="text-white/30 text-lg md:text-xl font-medium max-w-xl leading-relaxed mb-10 text-left">
                      We&apos;ve deconstructed the entire agency journey into five easy-to-follow phases. No fluff, just execution.
                    </p>
                    <button 
                      onClick={() => router.push("/curriculum")}
                      className="bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-[#F3D7A7] transition-all flex items-center gap-4 shadow-xl text-left"
                    >
                      Explore Full Prospectus <ArrowRight size={20}/>
                    </button>
                  </div>

                  {/* Stats Cards */}
                  <div className="flex flex-row md:flex-col gap-6 relative z-10 text-left">
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-[30px] p-8 w-40 md:w-52 text-center flex flex-col justify-center items-center shadow-xl text-left">
                       <span className="text-white text-5xl font-bold block tracking-tighter mb-1 text-left">60</span>
                       <span className="text-[#F3D7A7] text-[10px] font-bold uppercase tracking-[0.3em] block text-left">Days</span>
                    </div>
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-[30px] p-8 w-40 md:w-52 text-center flex flex-col justify-center items-center shadow-xl text-left">
                       <span className="text-white text-5xl font-bold block tracking-tighter mb-1 text-left">5</span>
                       <span className="text-[#F3D7A7] text-[10px] font-bold uppercase tracking-[0.3em] block text-left">Phases</span>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* FINAL CTA - REDESIGNED FOR BIC */}
            <section className="py-60 px-6 md:px-24 text-center bg-black relative overflow-hidden">
              {/* ACCENT GLOW */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F3D7A7]/5 blur-[120px] rounded-full pointer-events-none" />
              
              <div className="max-w-4xl mx-auto relative z-10 space-y-16">
                <div className="space-y-6 text-center">
                  <span className="text-[#F3D7A7] text-[10px] font-bold uppercase tracking-[0.8em] block text-center">Final Briefing</span>
                  <h2 className="text-6xl md:text-[120px] font-bold uppercase tracking-tighter leading-[0.8] text-white text-center">
                    Proof <br/> <span className="text-white/20 text-center">of work.</span>
                  </h2>
                </div>
                
                <div className="flex flex-col items-center gap-12 text-center">
                  <p className="text-white/40 text-sm md:text-base max-w-md uppercase tracking-widest leading-relaxed font-medium text-center">
                    The difference between an amateur and an operator is execution. Secure your position in the May 2026 intake.
                  </p>
                  
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push(user ? "/dashboard" : "/apply/login")} 
                    className="bg-[#F3D7A7] text-black px-16 py-8 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_20px_50px_rgba(243,215,167,0.1)]"
                  >
                    Apply For Access
                  </motion.button>
                </div>

                <div className="pt-40 text-center space-y-12">
                  <div className="flex items-center justify-center gap-10">
                    <a href="https://wa.me/917082176274" target="_blank" className="p-5 border border-white/10 rounded-full text-white/40 hover:text-[#F3D7A7] hover:border-[#F3D7A7]/30 transition-all group backdrop-blur-sm">
                      <MessageCircle size={22} className="group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="https://www.instagram.com/bladeinnercircle/" target="_blank" className="p-5 border border-white/10 rounded-full text-white/40 hover:text-[#F3D7A7] hover:border-[#F3D7A7]/30 transition-all group backdrop-blur-sm">
                      <InstagramIcon size={22} className="group-hover:scale-110 transition-transform" />
                    </a>
                  </div>
                  <div className="space-y-6">
                    <p className="text-[11px] font-bold uppercase tracking-[1em] text-white/60">Stop Consuming. Start Operating.</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30">© 2026 Blade // Institutional Access</p>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {isAgency && (
        <footer className="h-[50vh] flex flex-col justify-center items-center text-center px-6 relative z-20">
          <h2 className="text-6xl md:text-[9vw] font-bold tracking-[-0.06em] uppercase mb-16 text-white text-center">Ready to scale?</h2>
          <motion.a 
            whileHover={{ scale: 1.05 }} 
            href="https://calendly.com/piyushkumar2418/30min" 
            target="_blank" 
            className="px-16 py-8 border border-[#F3D7A7] text-[#F3D7A7] rounded-full font-bold uppercase text-xs tracking-widest transition-all duration-500 hover:bg-[#F3D7A7] hover:text-black shadow-2xl"
          >
            book a discovery call
          </motion.a>
          <div className="absolute bottom-10 text-[9px] uppercase tracking-[0.8em] font-bold text-center text-white/20">© 2026 Blade</div>
        </footer>
      )}

      {!isAgency && <div className="h-20 bg-black" />}
    </motion.main>
  );
}
