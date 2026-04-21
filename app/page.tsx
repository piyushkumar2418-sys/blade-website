"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useInView, Variants, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Zap, Award, Eye, ArrowRight, TrendingUp, Shield, Target, Rocket, BarChart3, Binary, Lock } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import DrawingCanvas from "@/components/DrawingCanvas";
import Scene3D from "@/components/Scene3D";
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

const SectionLabel = ({ children, light = false }: { children: React.ReactNode, light?: boolean }) => (
  <div className="flex items-center gap-4 mb-8 text-left">
    <div className={`h-[1px] w-8 ${light ? 'bg-white/20' : 'bg-[#F3D7A7]'}`} />
    <span className={`text-[10px] font-bold uppercase tracking-[0.4em] ${light ? 'text-white/40' : 'text-black/40'}`}>{children}</span>
  </div>
);

const WorkItem = ({ work, aspect, index }: { work: any, aspect: string, index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

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
        onMouseEnter={() => { setIsHovered(true); videoRef.current?.play().catch(() => null); }}
        onMouseLeave={() => { setIsHovered(false); videoRef.current?.pause(); if(videoRef.current) videoRef.current.currentTime = 0; }}
        className={`group relative block ${aspect} bg-[#0a0a0a] border border-white/5 overflow-hidden rounded-sm shadow-2xl cursor-none`}
      >
        <img src={work.img} alt={work.title} className={`absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
        <video ref={videoRef} key={work.video} src={work.video} loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-10" />
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
    { name: "Amazon", url: "https://www.pngmart.com/files/15/Amazon-Logo-White-PNG-Image.png" },
    { name: "Flipkart", url: "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png" },
    { name: "Bajaj", url: "https://companieslogo.com/img/orig/BAJAJ-AUTO.NS_BIG-afa2b58c.png" },
    { name: "Reliance", url: "/logos/reliance_digital.png" },
    { name: "Nykaa", url: "https://companieslogo.com/img/orig/NYKAA.NS_BIG-d299a0e1.png" },
    { name: "Pantaloons", url: "/logos/pantaloons.png" },
    { name: "Mirchi", url: "/mirchi.svg" },
    { name: "WTF", url: "/logos/wtf.jpg" },
    { name: "ThriveStack", url: "/thrivestack.svg" },
    { name: "SuperYou", url: "/logos/superyou.png" },
    { name: "ActorsTruth", url: "/logos/actorstruth.jpg" },
    { name: "FamApp", url: "/logos/famapp.png" },
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
              className="flex-shrink-0 flex items-center justify-center bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-2xl md:rounded-3xl hover:bg-white/[0.12] hover:border-white/[0.2] transition-all duration-500 group cursor-pointer overflow-hidden"
              style={{ minWidth: '180px', height: '80px' }}
            >
              <img 
                src={logo.url} 
                alt={logo.name} 
                className="h-full w-full object-contain p-4 md:p-6 transition-all duration-500 group-hover:scale-110"
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
  const [siteMode, setSiteMode] = useState<"agency" | "innerCircle">("agency");
  const containerRef = useRef(null);
  const philosophyLeftRef = useRef(null);
  const isPhilosophyLeftInView = useInView(philosophyLeftRef, { once: true, margin: "-20%" });
  
  const { scrollYProgress } = useScroll({ target: containerRef });
  const isAgency = siteMode === "agency";
  const navButtonOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const toggleMode = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setSiteMode(isAgency ? "innerCircle" : "agency");
  };

  const youtubeWorks = [
    { title: "Nikhil Kamath", category: "YouTube", link: "https://youtu.be/YY7J1pHfSyY", video: "/preview1.mp4", img: "https://i.ytimg.com/vi/YY7J1pHfSyY/maxresdefault.jpg" },
    { title: "Money with Swabi", category: "YouTube", link: "https://www.youtube.com/@Moneywithswabi/videos", video: "/preview2.mp4", img: "https://i.ytimg.com/vi/NQvveKioHCw/maxresdefault.jpg" },
    { title: "Podcast", category: "Podcast", link: "https://youtu.be/i7uwh0CzfRM", video: "/preview3.mp4", img: "https://i.ytimg.com/vi/i7uwh0CzfRM/maxresdefault.jpg" },
  ];

  const verticalWorks = [
    { title: "Visual Dominance", category: "Reel", link: "https://www.instagram.com/reel/DDrxL2CMYCB/", video: "/preview5.mp4", img: "/thumb5.webp" },
    { title: "Editorial Series", category: "Reel", link: "https://www.instagram.com/katemackz/", video: "/preview6.mp4", img: "/thumb6.webp" },
    { title: "Dynamic Flow", category: "Reel", link: "https://www.instagram.com/DKTmhQqqF6M/", video: "/preview7.jpg", img: "/thumb7.jpg" },
    { title: "Retention Edit", category: "Reel", link: "https://www.instagram.com/DTIgqVyjVcJ/", video: "/preview8.mp4", img: "/thumb8.jpeg" },
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

      {/* --- MASTER NAVIGATION --- */}
      <nav className={`fixed top-0 w-full z-[150] flex justify-between items-center px-8 py-8 ${isAgency ? 'mix-blend-difference' : ''}`}>
        <div className="cursor-pointer" onClick={() => setSiteMode("agency")}>
          <img src={isAgency ? "/blade-logo.png" : "/bic-black.png"} alt="Logo" className="h-8 md:h-10 w-auto object-contain" />
        </div>
        
        <div className="flex items-center gap-6">
          <motion.button 
            onClick={toggleMode} 
            style={{ opacity: navButtonOpacity }}
            className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all border shadow-sm ${
              isAgency 
              ? "border-white/20 text-white bg-white/5 hover:bg-white hover:text-black shadow-none" 
              : "border-black text-black bg-transparent hover:bg-black hover:text-white"
            }`}
          >
            {isAgency ? "The Inner Circle" : "Exit to Agency"}
          </motion.button>

          {user && !isAgency ? (
            <button 
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-3 px-4 py-3 border border-black/10 text-black hover:border-black/30 rounded-sm transition-all"
            >
              <div className="w-2 h-2 rounded-full bg-[#F3D7A7] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest">{profile?.name || "My Profile"}</span>
            </button>
          ) : (
            !isAgency && (
              <button 
                onClick={() => router.push("/apply/login")}
                className="text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors"
              >
                Sign In
              </button>
            )
          )}
        </div>
      </nav>

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
                <div className="max-w-xs md:max-w-md ml-auto text-left">
                  <div className="aspect-[3/4] w-full mb-10 overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
                    <img src="/piyush.png" className="w-full h-full object-cover" alt="Piyush" />
                  </div>
                  <p className="text-white/60 text-lg font-light leading-relaxed text-left">&quot;We decoded content through an early obsession. Mastering the silent mechanics of distribution.&quot;</p>
                  <div className="text-[#F3D7A7] text-2xl font-bold mt-8 text-left">— Piyush</div>
                </div>
              </div>
            </section>

            {/* LOGO MARQUEE */}
            <LogoMarquee />

            {/* GALLERIES */}
            <section className="py-32 px-6 md:px-12 relative z-20">
              <div className="max-w-[1400px] mx-auto w-full space-y-48">
                <div className="text-left">
                  <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-[-0.06em] mb-12 text-white text-left">Selected Productions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {youtubeWorks.map((work, i) => ( <WorkItem key={i} work={work} aspect="aspect-video" index={i} /> ))}
                  </div>
                </div>
                <div className="text-left">
                  <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-[-0.06em] mb-12 text-[#F3D7A7] text-left">Viral Originals</h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {verticalWorks.map((work, i) => ( <WorkItem key={i} work={work} aspect="aspect-[9/16]" index={i} /> ))}
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          /* --- INNER CIRCLE SIDE --- */
          <motion.div key="innerCircle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-black bg-white min-h-screen">
            
            <section className="h-screen flex flex-col justify-center px-6 md:px-24 border-b border-black/5 text-left">
              <div className="flex justify-between items-start mb-8">
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-[0.5em] font-bold block text-black/40 text-left">Blade Inner Circle</motion.span>
                <div className="px-4 py-2 border border-black/10 bg-black/5 text-black font-bold uppercase tracking-[0.3em] text-[10px]">
                  May 2026 Batch
                </div>
              </div>
              <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-[12vw] md:text-[8vw] font-bold leading-[0.85] tracking-[-0.06em] uppercase mb-12 text-left">The School of <br/> Modern Content.</motion.h1>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 text-left">
                <p className="text-2xl md:text-4xl text-black/60 leading-tight font-medium max-w-2xl text-left">Build your agency. <br/> From skill to first income.</p>
                <div className="flex flex-col items-start md:items-end gap-6">
                  <span className="text-[#F3D7A7] font-bold uppercase tracking-[0.3em] text-[10px] border border-[#F3D7A7]/30 px-4 py-2 text-left">Cohort 01 — Applications Open</span>
                  <button onClick={() => router.push(user ? "/apply/register" : "/apply/login")} className="bg-black text-white px-12 py-6 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#F3D7A7] hover:text-black transition-all flex items-center gap-4 shadow-2xl">Apply now <ArrowUpRight size={18}/></button>
                </div>
              </div>
            </section>

            {/* THE CONTENT CRISIS */}
            <section className="py-32 px-6 md:px-24 bg-black text-white">
              <div className="max-w-7xl mx-auto">
                <SectionLabel light>The Industry Crisis</SectionLabel>
                <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tight leading-[0.85] mb-20 text-left">The creator economy <br /> <span className="text-white/20">is built on sand.</span></h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-8 p-12 border border-white/10 bg-white/5 rounded-2xl">
                      <h4 className="text-[#F3D7A7] text-sm font-bold uppercase tracking-widest">The Amateur Trap</h4>
                      <ul className="space-y-4 text-white/40 text-lg">
                        <li className="flex items-center gap-3"><span className="text-red-500">✕</span> Guessing what works</li>
                        <li className="flex items-center gap-3"><span className="text-red-500">✕</span> Zero leverage in workflow</li>
                        <li className="flex items-center gap-3"><span className="text-red-500">✕</span> Relying on algorithm luck</li>
                        <li className="flex items-center gap-3"><span className="text-red-500">✕</span> Low-ticket, commodity mindset</li>
                      </ul>
                   </div>
                   <div className="space-y-8 p-12 border border-[#F3D7A7]/30 bg-[#F3D7A7]/5 rounded-2xl">
                      <h4 className="text-[#F3D7A7] text-sm font-bold uppercase tracking-widest">The Blade Protocol</h4>
                      <ul className="space-y-4 text-[#F3D7A7] text-lg">
                        <li className="flex items-center gap-3"><span className="text-green-500">✓</span> Institutional systems</li>
                        <li className="flex items-center gap-3"><span className="text-green-500">✓</span> High-velocity infrastructure</li>
                        <li className="flex items-center gap-3"><span className="text-green-500">✓</span> Predictable growth mechanics</li>
                        <li className="flex items-center gap-3"><span className="text-green-500">✓</span> High-ticket capital extraction</li>
                      </ul>
                   </div>
                </div>
              </div>
            </section>

            <section className="py-32 px-6 md:px-24 max-w-7xl text-left border-b border-black/5">
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

            {/* THE SPRINT STRUCTURE */}
            <section className="py-32 px-6 md:px-24 bg-white border-b border-black/5">
              <div className="max-w-7xl mx-auto">
                <SectionLabel>The 60-Day Sprint</SectionLabel>
                <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight leading-[0.85] mb-24 text-left">From Theory to <br /> <span className="text-black/20">Capital Extraction.</span></h2>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                   {sprintPhases.map((phase, idx) => (
                     <div key={idx} className="space-y-6 group text-left">
                        <div className="text-4xl font-bold text-black/10 group-hover:text-black transition-colors duration-500 text-left">{phase.phase}</div>
                        <div className="h-[2px] w-full bg-black/5 relative overflow-hidden">
                           <div className="absolute inset-0 bg-[#F3D7A7] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
                        </div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-left">{phase.title}</h4>
                        <p className="text-[12px] text-black/40 leading-relaxed uppercase tracking-wider text-left">{phase.desc}</p>
                     </div>
                   ))}
                </div>
              </div>
            </section>

            {/* FOUNDER AUTHORITY SECTION */}
            <section className="bg-white py-32 px-6 md:px-24 text-black text-left border-b border-black/5">
              <div className="flex flex-col md:flex-row items-center gap-20 md:gap-32 mb-28">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="w-full md:w-1/2">
                  <div className="relative aspect-[4/5] bg-[#F9F9F9] overflow-hidden grayscale group border border-black/5">
                    <img src="/piyush.png" alt="Founder" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute bottom-8 left-8 z-20">
                      <span className="bg-black text-[#F3D7A7] text-[9px] font-bold uppercase tracking-[0.4em] px-4 py-2">System Architect</span>
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
                          <BarChart3 size={20} className="text-[#F3D7A7]" />
                          <h5 className="text-[10px] font-bold uppercase tracking-widest text-black/40">Market Reach</h5>
                          <p className="text-xl font-bold">2.5B+ Views</p>
                       </div>
                       <div className="p-6 border border-black/5 bg-[#F9F9F9] space-y-2 text-left">
                          <Binary size={20} className="text-[#F3D7A7]" />
                          <h5 className="text-[10px] font-bold uppercase tracking-widest text-black/40">Capital Extraction</h5>
                          <p className="text-xl font-bold">₹3Cr+ Built</p>
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
            <section className="py-24 px-6 md:px-24 bg-white">
              <div className="max-w-[1280px] mx-auto">
                <div className="bg-black rounded-[60px] p-10 md:p-16 relative overflow-hidden text-left flex flex-col md:flex-row items-center gap-12 min-h-[500px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)]">
                  
                  {/* Decorative Circle */}
                  <div className="absolute top-16 right-[35%] w-12 h-12 border border-[#F3D7A7]/20 rounded-full hidden md:block" />

                  {/* Content */}
                  <div className="flex-1 space-y-8 relative z-10">
                    <div className="space-y-4">
                      <span className="text-[#F3D7A7] text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block">What you will learn</span>
                      <h2 className="text-white text-5xl md:text-[72px] font-bold uppercase tracking-tight leading-[0.85] mb-8">
                        The exact systems <br /> behind ₹3Cr+ in <br /> revenue.
                      </h2>
                    </div>
                    <p className="text-white/30 text-lg md:text-xl font-medium max-w-xl leading-relaxed mb-10">
                      We&apos;ve deconstructed the entire agency journey into five easy-to-follow phases. No fluff, just execution.
                    </p>
                    <button 
                      onClick={() => router.push("/curriculum")}
                      className="bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-[#F3D7A7] transition-all flex items-center gap-4 shadow-xl"
                    >
                      Explore Full Prospectus <ArrowRight size={20}/>
                    </button>
                  </div>

                  {/* Stats Cards */}
                  <div className="flex flex-row md:flex-col gap-6 relative z-10">
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-[30px] p-8 w-40 md:w-52 text-center flex flex-col justify-center items-center shadow-xl">
                       <span className="text-white text-5xl font-bold block tracking-tighter mb-1">60</span>
                       <span className="text-[#F3D7A7] text-[10px] font-bold uppercase tracking-[0.3em] block">Days</span>
                    </div>
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-[30px] p-8 w-40 md:w-52 text-center flex flex-col justify-center items-center shadow-xl">
                       <span className="text-white text-5xl font-bold block tracking-tighter mb-1">5</span>
                       <span className="text-[#F3D7A7] text-[10px] font-bold uppercase tracking-[0.3em] block">Phases</span>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-40 px-6 md:px-24 text-center border-t border-black/5">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-[-0.06em] mb-12 text-black text-center">Proof of work <br/> beats theory.</h2>
                <button onClick={() => router.push(user ? "/apply/register" : "/apply/login")} className="bg-black text-white px-20 py-8 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#F3D7A7] hover:text-black transition-all shadow-2xl">Apply now</button>
              </div>
            </section>

            <footer className="py-20 px-6 text-center border-t border-black/5 bg-[#F9F9F9]">
              <p className="text-[10px] font-bold uppercase tracking-[0.8em] text-black/20 text-center">Stop Consuming. Start Operating.</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="h-[50vh] flex flex-col justify-center items-center text-center px-6 relative z-20">
        {isAgency && (
          <>
            <h2 className="text-6xl md:text-[9vw] font-bold tracking-[-0.06em] uppercase mb-16 text-white text-center">Ready to scale?</h2>
            <motion.a whileHover={{ scale: 1.05 }} href="https://calendly.com/piyushkumar2418/30min" target="_blank" className="px-16 py-8 border border-[#F3D7A7] text-[#F3D7A7] rounded-full font-bold uppercase text-xs tracking-widest transition-all duration-500 hover:bg-[#F3D7A7] hover:text-black shadow-2xl">Secure a Session</motion.a>
          </>
        )}
        <div className={`absolute bottom-10 text-[9px] uppercase tracking-[0.8em] font-bold text-center ${isAgency ? "text-white/20" : "text-black/20"}`}>© 2026 Blade</div>
      </footer>
    </motion.main>
  );
}
