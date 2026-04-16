"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, Variants, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Users, Zap, Target, Lock, ChevronRight } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import DrawingCanvas from "@/components/DrawingCanvas";
import Scene3D from "@/components/Scene3D";

// --- ANIMATION VARIANTS ---
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

// --- WORK ITEM COMPONENT ---
const WorkItem: React.FC<{ work: any; aspect: string, index: number }> = ({ work, aspect, index }) => {
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
        className={`group relative block ${aspect} bg-[#0a0a0a] border border-white/5 overflow-hidden rounded-sm shadow-2xl`}
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

export default function Home() {
  const [siteMode, setSiteMode] = useState<"agency" | "innerCircle">("agency");
  const containerRef = useRef(null);
  const philosophyLeftRef = useRef(null);
  const isPhilosophyLeftInView = useInView(philosophyLeftRef, { once: true, margin: "-20%" });
  
  const { scrollYProgress } = useScroll({ target: containerRef });
  const isAgency = siteMode === "agency";
  
  // High-performance smooth scroll to top on toggle
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
    { title: "Retention Edit", category: "Reel", link: "https://www.instagram.com/DTIgqVyjVcJ/", video: "/preview8.jpeg", img: "/thumb8.jpeg" },
  ];

  return (
    <motion.main 
      ref={containerRef} 
      animate={{ backgroundColor: isAgency ? "#000000" : "#ffffff" }}
      className="relative overflow-x-hidden selection:bg-[#F3D7A7] selection:text-black"
      style={{ transition: "background-color 0.8s cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      <CustomCursor />
      <DrawingCanvas color={isAgency ? "#F3D7A7" : "#000000"} />
      <Scene3D />

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-[100] flex justify-between items-center px-8 py-8">
        <div className="flex flex-col select-none cursor-pointer" onClick={() => setSiteMode("agency")}>
          <span className={`text-2xl font-black tracking-tighter uppercase leading-none ${isAgency ? 'text-white' : 'text-black'}`}>Blade</span>
          <span className={`text-[8px] uppercase tracking-[0.5em] font-bold ${isAgency ? 'text-[#F3D7A7]' : 'text-black/40'}`}>
            {isAgency ? "Agency" : "Institution"}
          </span>
        </div>
        <button 
          onClick={toggleMode}
          className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all border ${
            isAgency 
            ? "border-white/20 text-white hover:bg-white hover:text-black" 
            : "border-black/20 text-black hover:bg-black hover:text-white"
          }`}
        >
          {isAgency ? "The Inner Circle" : "Exit to Agency"}
        </button>
      </nav>

      <AnimatePresence mode="wait">
        {isAgency ? (
          <motion.div
            key="agency"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* HERO - PURE VIDEO, NO HAZE */}
            <section className="h-screen w-full flex flex-col justify-center items-center text-center relative overflow-hidden bg-black">
              <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-100">
                <source src="/hero-bg.mp4?v=4" type="video/mp4" />
              </video>
              <div className="relative z-20 px-4">
                <motion.h1 
                  initial={{ y: 30, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  className="text-[14vw] md:text-[11vw] font-bold leading-[0.8] tracking-[-0.05em] uppercase mb-8 text-white"
                >
                  Growth,<br/>engineered.
                </motion.h1>
                <p className="text-[#F3D7A7] text-[10px] md:text-[12px] uppercase tracking-[0.8em] font-bold">The Strategic Media Partner</p>
              </div>
            </section>

            {/* AGENCY PHILOSOPHY - FULL WIDTH TEXT */}
            <section className="min-h-screen py-32 px-6 md:px-24 border-t border-white/5 relative z-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start max-w-[1440px] mx-auto text-left">
                <div className="md:sticky md:top-32" ref={philosophyLeftRef}>
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12">
                    <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold">The Visionary</span>
                    <h2 className="text-5xl md:text-8xl font-bold leading-[0.85] tracking-tighter uppercase text-white mb-16">Systematized <br/> Visual <br/> Dominance.</h2>
                  </motion.div>
                  
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={isPhilosophyLeftInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.2 }}>
                    <p className="text-white/70 text-xl md:text-2xl lg:text-3xl font-medium leading-[1.4] tracking-tight">
                      <span className="text-white font-bold">Blade</span> exists in a space where consistency 
                      matters more than claims. Across creators and brands, it has built a 
                      reputation for delivering content that not only performs in the moment, 
                      but continues to hold value as platforms, trends, and audiences evolve.
                    </p>
                    <div className="h-[1px] bg-[#F3D7A7]/40 mt-12 w-24" />
                  </motion.div>
                </div>

                <div className="max-w-xs md:max-w-md ml-auto">
                  <div className="aspect-[3/4] w-full mb-10 overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
                    <img src="/piyush.png" className="w-full h-full object-cover" alt="Piyush" />
                  </div>
                  <p className="text-white/60 text-lg italic font-light leading-relaxed">
                    "We didn't learn content from a syllabus; we decoded it through an early obsession. Years spent dissecting retention, mastering the hook, and understanding the silent mechanics of distribution."
                  </p>
                  <div className="text-[#F3D7A7] italic text-2xl font-bold mt-8">— Piyush</div>
                </div>
              </div>
            </section>

            {/* SELECTED WORKS */}
            <section className="py-32 px-6 md:px-12 relative z-20">
              <div className="max-w-[1400px] mx-auto w-full space-y-48">
                <div>
                  <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tighter mb-12">Selected Productions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {youtubeWorks.map((work, i) => ( <WorkItem key={i} work={work} aspect="aspect-video" index={i} /> ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tighter mb-12 text-[#F3D7A7]">Viral Originals</h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {verticalWorks.map((work, i) => ( <WorkItem key={i} work={work} aspect="aspect-[9/16]" index={i} /> ))}
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          /* --- INNER CIRCLE (INSTITUTION) MODE --- */
          <motion.div
            key="innerCircle"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-black bg-white min-h-screen pt-40 px-6 md:px-24"
          >
            {/* INSTITUTION HERO */}
            <header className="max-w-[1440px] mx-auto text-left mb-32">
              <span className="text-[#F3D7A7] font-bold uppercase tracking-[0.5em] text-[10px] mb-8 block">Cohort 01 Admissions Open</span>
              <h1 className="text-[9vw] md:text-[10vw] font-bold leading-[0.85] tracking-tighter uppercase mb-16">
                The Modern School <br/> of Content <br/> Economics.
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-end border-b border-black/10 pb-20">
                <p className="text-3xl md:text-4xl text-black/90 leading-tight font-medium">
                  A 60-day intensive cohort designed to transform skilled builders into high-leverage business owners. 
                  <span className="block mt-8 font-black text-black">No lectures. Only execution.</span>
                </p>
                <div className="flex justify-end">
                  <button className="w-full md:w-auto px-16 py-8 bg-black text-white rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-6 hover:bg-[#F3D7A7] hover:text-black transition-all">
                    Request Admission <ArrowUpRight size={20}/>
                  </button>
                </div>
              </div>
            </header>

            {/* THE FOUR PILLARS */}
            <section className="py-32 max-w-[1440px] mx-auto">
                <div className="flex justify-between items-end mb-16 border-l-2 border-[#F3D7A7] pl-8">
                    <h2 className="text-4xl font-bold uppercase tracking-tighter">The Pillars of Mastery</h2>
                    <span className="text-black/30 text-xs font-mono mb-1 tracking-widest uppercase">01 / ARCHITECTURE</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-1 bg-black/5 border border-black/5">
                    {[
                      { t: "The Craft", d: "Retention engineering & advanced content synthesis." },
                      { t: "The Offer", d: "Niche selection & framing value as a liquid asset." },
                      { t: "The Engine", d: "Automated outreach & high-ticket sales psychological." },
                      { t: "The Scale", d: "Building team moats & high-volume delivery systems." }
                    ].map((p, i) => (
                        <div key={i} className="bg-white p-12 hover:bg-[#F9F9F9] transition-all group cursor-default">
                            <span className="text-[10px] font-bold text-[#F3D7A7] mb-8 block">0{i+1}</span>
                            <h3 className="text-2xl font-bold uppercase mb-6 leading-tight">{p.t}</h3>
                            <p className="text-black/50 text-sm leading-relaxed">{p.d}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CORE PHILOSOPHY */}
            <section className="py-32 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 border-t border-black/5">
                <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.8]">We don't teach.<br/><span className="text-[#F3D7A7]">We build.</span></h2>
                <div>
                  <p className="text-2xl text-black/60 leading-relaxed mb-12">
                    Information is a commodity. Systems are an asset. Blade Inner Circle is an interactive environment for those who refuse to consume and choose to transform.
                  </p>
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-6 pb-6 border-b border-black/5">
                      <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center"><Users size={18}/></div>
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-widest">Small Cohorts</h4>
                        <p className="text-[10px] text-black/40 uppercase">10 seats per batch for maximum density</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center"><Zap size={18}/></div>
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-widest">Execution Metrics</h4>
                        <p className="text-[10px] text-black/40 uppercase">Tracking outputs, not video watch time</p>
                      </div>
                    </div>
                  </div>
                </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MASTER FOOTER --- */}
      <footer className="h-screen flex flex-col justify-center items-center text-center px-6 relative z-20">
        <motion.h2 
          whileInView={{ opacity: 1, y: 0 }} 
          initial={{ opacity: 0, y: 20 }}
          className={`text-6xl md:text-[9vw] font-bold tracking-tighter uppercase mb-16 ${isAgency ? "text-white" : "text-black"}`}
        >
          {isAgency ? "Ready to scale?" : "Stay Ahead."}
        </motion.h2>
        <motion.a 
          whileHover={{ scale: 1.05 }} 
          href="https://calendly.com/piyushkumar2418/30min" 
          target="_blank"
          className={`px-16 py-8 border rounded-full font-bold uppercase text-xs tracking-widest transition-all duration-500 ${
            isAgency 
            ? "border-[#F3D7A7] text-[#F3D7A7] hover:bg-[#F3D7A7] hover:text-black" 
            : "border-black text-black hover:bg-black hover:text-white shadow-2xl"
          }`}
        > 
          {isAgency ? "Secure a Session" : "Request Admission"} 
        </motion.a>
        <div className={`absolute bottom-10 text-[9px] uppercase tracking-[0.8em] font-bold ${isAgency ? "text-white/20" : "text-black/20"}`}>
          © 2026 Blade {isAgency ? "Media Group" : "Inner Circle"}
        </div>
      </footer>
    </motion.main>
  );
}