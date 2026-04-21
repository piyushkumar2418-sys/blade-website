"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useInView, Variants, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Zap, Award, Eye, ArrowRight, TrendingUp, BarChart3, Binary, Play } from "lucide-react";
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
    { name: "Amazon", url: "/amazon.jpg" },
    { name: "Flipkart", url: "/flipkart.jpg" },
    { name: "Bajaj", url: "https://companieslogo.com/img/orig/BAJAJ-AUTO.NS_BIG-afa2b58c.png" },
    { name: "Reliance", url: "/reliance.png" },
    { name: "Nykaa", url: "/nykaa.png" },
    { name: "Pantaloons", url: "/pantaloons.svg" },
    { name: "Mirchi", url: "/mirchi.jpg" },
    { name: "WTF", url: "/wtf.svg" },
    { name: "ThriveStack", url: "/thrivestack.jpg" },
    { name: "SuperYou", url: "/superyou.jpg" },
    { name: "ActorsTruth", url: "/actorstruth.png" },
    { name: "FamApp", url: "/fampay.png" },
  ];
  const doubledLogos = [...logos, ...logos];
  return (
    <div className="relative w-full overflow-hidden py-24 bg-black/50 border-y border-white/5">
      <motion.div 
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex gap-12 items-center px-12"
      >
        {doubledLogos.map((logo, i) => (
          <div key={i} className="flex-shrink-0 flex items-center justify-center p-6 bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-3xl min-w-[180px] h-[80px]">
            <img src={logo.url} alt={logo.name} className="h-10 w-auto object-contain" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const ProcessStep = ({ number, title, desc }: { number: string, title: string, desc: string }) => (
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-6 text-left">
    <div className="text-6xl font-bold text-white/5 text-left">{number}</div>
    <h3 className="text-2xl font-bold uppercase tracking-tight text-white text-left">{title}</h3>
    <p className="text-white/40 leading-relaxed text-xl font-light text-left">{desc}</p>
  </motion.div>
);

export default function Home() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const [siteMode, setSiteMode] = useState<"agency" | "innerCircle">("agency");
  const containerRef = useRef(null);
  const philosophyLeftRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const isAgency = siteMode === "agency";
  const navButtonOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const toggleMode = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setSiteMode(isAgency ? "innerCircle" : "agency");
  };

  const youtubeWorks = [
    { title: "Nikhil Kamath", category: "YouTube", link: "https://youtu.be/YY7J1pHfSyY", video: "/preview1.mp4", img: "/thumb1.jpg" },
    { title: "Money with Swabi", category: "YouTube", link: "https://www.youtube.com/@Moneywithswabi/videos", video: "/preview2.mp4", img: "/thumb2.jpg" },
    { title: "Podcast", category: "Podcast", link: "https://youtu.be/i7uwh0CzfRM", video: "/preview3.mp4", img: "/thumb3.jpg" },
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
      className="relative overflow-x-hidden selection:bg-[#F3D7A7] selection:text-black font-['Helvetica',_sans-serif]"
    >
      <CustomCursor />
      {isAgency && ( <> <DrawingCanvas color="#F3D7A7" /> <Scene3D /> </> )}

      {/* PREMIUM GLOBAL HEADER */}
      <motion.header 
        style={{ opacity: navButtonOpacity }}
        className="fixed top-0 left-0 right-0 z-[100] px-6 py-8 flex justify-center pointer-events-none"
      >
        <div className="max-w-7xl w-full flex items-center justify-between bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full px-10 py-4 shadow-[0_30px_60px_rgba(0,0,0,0.8)] pointer-events-auto relative overflow-hidden group">
          <div className="flex items-center gap-12">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-white font-black text-2xl tracking-tighter italic hover:scale-110 transition-transform">B.</button>
            <nav className="hidden lg:flex items-center gap-10">
              {['Process', 'Solutions', 'Edits'].map((label) => (
                <a key={label} href={`#section_${label.toLowerCase()}`} className="text-white/40 hover:text-[#F3D7A7] text-[11px] font-bold uppercase tracking-[0.4em] transition-all">{label}</a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={toggleMode} className="bg-white/5 border border-white/10 px-8 py-3 rounded-full text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white/10 transition-all">
              {isAgency ? "The Inner Circle" : "Exit to Agency"}
            </button>
            <motion.a whileHover={{ scale: 1.05 }} href="https://calendly.com/piyushkumar2418/30min" target="_blank" className="bg-[#F3D7A7] text-black px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-xl">
              {isAgency ? "contact us" : "Apply Now"}
            </motion.a>
          </div>
        </div>
      </motion.header>

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
                </div>
                <div className="space-y-32 text-left">
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-left">
                    <h3 className="text-3xl font-bold uppercase tracking-tight text-white mb-6 text-left">Institutional Credibility</h3>
                    <p className="text-white/40 leading-relaxed text-xl font-light text-left">We don&apos;t just edit videos. We build visual infrastructure for the world&apos;s most influential voices.</p>
                  </motion.div>
                </div>
              </div>
            </section>

            <LogoMarquee />

            {/* PROCESS SECTION */}
            <section id="section_process" className="py-32 px-6 md:px-24 border-t border-white/5 relative z-20">
              <div className="max-w-[1400px] mx-auto">
                <div className="mb-24 text-left">
                  <SectionLabel>The Protocol</SectionLabel>
                  <h2 className="text-6xl md:text-9xl font-bold uppercase tracking-[-0.06em] leading-[0.8] text-white text-left">Engineered <br/> Velocity.</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <ProcessStep number="01" title="Strategic Synthesis" desc="We deconstruct your brand architecture to find the high-leverage content hooks." />
                  <ProcessStep number="02" title="Systemic Execution" desc="Our institutional editing engine processes your vision into premium visual assets." />
                  <ProcessStep number="03" title="Capital Extraction" desc="Deployment across all platforms with systems designed for maximum retention and growth." />
                </div>
              </div>
            </section>

            {/* GALLERIES */}
            <section id="section_edits" className="py-32 px-6 md:px-12 relative z-20">
              <div className="max-w-[1400px] mx-auto w-full space-y-48">
                <div className="text-left">
                  <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-[-0.06em] mb-12 text-white text-left">Selected Productions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    {youtubeWorks.map((work, i) => ( <WorkItem key={i} work={work} aspect="aspect-video" index={i} /> ))}
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

            {/* FOUNDER AUTHORITY SECTION */}
            <section className="bg-white py-32 px-6 md:px-24 text-black text-left border-b border-black/5">
              <div className="flex flex-col md:flex-row items-center gap-20 md:gap-32 mb-28">
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-[4/5] bg-[#F9F9F9] overflow-hidden grayscale group border border-black/5">
                    <img src="/piyush.png" alt="Founder" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute bottom-8 left-8 z-20">
                      <span className="bg-black text-[#F3D7A7] text-[9px] font-bold uppercase tracking-[0.4em] px-4 py-2">System Architect</span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 text-left">
                  <div className="space-y-10 text-left">
                    <div className="text-left">
                      <SectionLabel>Founding Methodology</SectionLabel>
                      <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-[-0.06em] leading-[0.85] text-left">The Practitioner’s <br /> Ledger.</h2>
                    </div>
                    <p className="text-black/60 text-xl leading-relaxed max-w-lg font-light text-left">Blade Inner Circle is the distilled output of 5 years of market execution. We don&apos;t teach what we think — we teach what we have proven at scale.</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10 border border-black/10 text-left">
                {founderStats.map((stat, idx) => (
                  <div key={idx} className="p-10 bg-white hover:bg-[#F9F9F9] transition-all duration-500 group text-left">
                    <div className="mb-6 text-[#F3D7A7] transition-colors duration-500 text-left">{stat.icon}</div>
                    <h4 className="text-sm font-bold uppercase tracking-widest leading-tight mb-3 text-left">{stat.label}</h4>
                    <p className="text-[10px] text-black/30 uppercase tracking-[0.2em] text-left">{stat.desc}</p>
                  </div>
                ))}
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
