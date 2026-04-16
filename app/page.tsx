"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, Variants, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Users, Zap, ShieldCheck, Target, Globe, Cpu, BookOpen, GraduationCap, Microscope, Landmark } from "lucide-react";
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
const WorkItem = ({ work, aspect, index }: { work: any; aspect: string, index: number }) => {
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
  
  // FIXED: Button starts at opacity 1 and only fades after significant scroll (20% of page)
  const navButtonOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

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
      style={{ transition: "background-color 0.8s ease" }}
    >
      <CustomCursor />
      
      <AnimatePresence>
        {isAgency && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <DrawingCanvas color="#F3D7A7" />
             <Scene3D />
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed top-0 w-full z-[150] flex justify-between items-center px-8 py-8 mix-blend-difference">
        <div className="cursor-pointer" onClick={() => setSiteMode("agency")}>
          <img src={isAgency ? "/blade-logo.png" : "/inner-circle-logo.png"} alt="Logo" className="h-8 md:h-10 w-auto object-contain" />
        </div>
        <motion.button 
          onClick={toggleMode} 
          style={{ opacity: navButtonOpacity }}
          className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all border shadow-sm ${
            isAgency 
            ? "border-white/20 text-white bg-white/5 hover:bg-white hover:text-black" 
            : "border-black/20 text-black bg-black/5 hover:bg-black hover:text-white"
          }`}
        >
          {isAgency ? "The Inner Circle" : "Exit to Agency"}
        </motion.button>
      </nav>

      <AnimatePresence mode="wait">
        {isAgency ? (
          <motion.div key="agency" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* --- AGENCY HERO --- */}
            <section className="h-screen w-full flex flex-col justify-center items-center text-center relative overflow-hidden bg-black">
              <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-70">
                <source src="/hero-bg.mp4?v=4" type="video/mp4" />
              </video>
              <div className="relative z-20 px-4">
                <h1 className="text-[14vw] md:text-[11vw] font-bold leading-[0.8] tracking-[-0.05em] uppercase mb-8 text-white">Growth,<br/>engineered.</h1>
                <p className="text-[#F3D7A7] text-[10px] md:text-[12px] uppercase tracking-[0.8em] font-bold">Blade Media</p>
              </div>
            </section>

            {/* --- AGENCY PHILOSOPHY --- */}
            <section className="min-h-screen py-32 px-6 md:px-24 border-t border-white/5 relative z-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start max-w-[1440px] mx-auto text-left">
                <div className="md:sticky md:top-32" ref={philosophyLeftRef}>
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12">
                    <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold">The Visionary</span>
                    <h2 className="text-5xl md:text-8xl font-bold leading-[0.85] tracking-tighter uppercase text-white mb-16">Systematized <br/> Visual <br/> Dominance.</h2>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={isPhilosophyLeftInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.2 }}>
                    <p className="text-white/70 text-xl md:text-2xl lg:text-3xl font-medium leading-[1.4] tracking-tight">
                      <span className="text-white font-bold">Blade</span> exists in a space where consistency matters more than claims. Delivered content that holds value as platforms, trends, and audiences evolve.
                    </p>
                    <div className="h-[1px] bg-[#F3D7A7]/40 mt-12 w-24" />
                  </motion.div>
                </div>
                <div className="max-w-xs md:max-w-md ml-auto">
                  <div className="aspect-[3/4] w-full mb-10 overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
                    <img src="/piyush.png" className="w-full h-full object-cover" alt="Piyush" />
                  </div>
                  <p className="text-white/60 text-lg italic font-light leading-relaxed">"We decoded content through an early obsession. Mastering the silent mechanics of distribution."</p>
                  <div className="text-[#F3D7A7] italic text-2xl font-bold mt-8">— Piyush</div>
                </div>
              </div>
            </section>

            {/* --- AGENCY GALLERIES --- */}
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
          <motion.div key="innerCircle" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} className="text-black bg-white min-h-screen">
            
            {/* HERO: INSTITUTIONAL SCHOOL THEME */}
            <header className="h-[90vh] flex flex-col justify-center px-6 md:px-24 border-b border-black/5">
              <div className="flex items-center gap-4 mb-8">
                <Landmark size={20} className="text-[#F3D7A7]" />
                <span className="text-[#F3D7A7] font-bold uppercase tracking-[0.5em] text-[10px]">Academic Year 2026</span>
              </div>
              <h1 className="text-[10vw] font-bold leading-[0.85] tracking-tighter uppercase mb-16 italic">
                A School for <br/> The Sovereign <br/> Operator.
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-end">
                <p className="text-3xl md:text-4xl text-black/90 leading-tight font-medium">
                  An execution-first institution designed to transform raw creative potential into engineered digital dominance. <span className="block mt-8 font-black text-[#F3D7A7]">Theoretical learning ends here. Building begins.</span>
                </p>
                <div className="flex justify-end">
                  <button className="w-full md:w-auto px-16 py-8 bg-black text-white rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-6 hover:bg-[#F3D7A7] hover:text-black transition-all">Request Admission <ArrowUpRight size={20}/></button>
                </div>
              </div>
            </header>

            {/* AUTHENTICITY & JOURNEY */}
            <section className="py-40 px-6 md:px-24 grid grid-cols-1 md:grid-cols-2 gap-32 border-b border-black/5">
                <div className="space-y-12">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 block mb-12">The Pedagogy</span>
                    <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.9]">Extracted from <br/> <span className="text-black/30">the trenches.</span></h2>
                    <p className="text-2xl text-black/60 leading-relaxed font-light">
                      I started at 13. Every system taught inside the Inner Circle was decoded through years of unmentored experimentation. We don't teach from textbooks; we share the silent physics of a scaling media agency.
                    </p>
                </div>
                <div className="bg-[#F9F9F9] p-16 border border-black/5 flex flex-col justify-center">
                    <Microscope size={48} className="mb-12 text-[#F3D7A7]" strokeWidth={1} />
                    <h3 className="text-3xl font-bold uppercase tracking-tighter mb-6">Authentic <br/> Intelligence.</h3>
                    <p className="text-black/50 leading-relaxed">The curriculum is a living document. We share the frameworks currently driving growth for Blade Media's portfolio of global creators.</p>
                </div>
            </section>

            {/* VISITING FACULTY / EXPERTS */}
            <section className="py-40 px-6 md:px-24 bg-white">
                <div className="max-w-[1440px] mx-auto text-left mb-24">
                   <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter">Visiting <br/><span className="text-[#F3D7A7]">Practitioners.</span></h2>
                   <p className="text-xl text-black/40 uppercase tracking-widest mt-8 font-bold">Industry experts integrated into the build cycle.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                   {[
                     { h: "Strategy Architects", p: "Engineers of audience retention and viral synthesis." },
                     { h: "Sales Operators", p: "High-ticket closing partners managing 7-figure pipelines." },
                     { h: "Scale Specialists", p: "Operational experts in team moats and delivery automation." }
                   ].map((item, i) => (
                     <div key={i} className="p-12 border border-black/5 hover:border-[#F3D7A7] transition-all group">
                        <GraduationCap size={24} className="mb-8 text-black/20 group-hover:text-[#F3D7A7] transition-colors" />
                        <h4 className="text-xl font-bold uppercase mb-4 tracking-tighter">{item.h}</h4>
                        <p className="text-black/50 text-sm leading-relaxed">{item.p}</p>
                     </div>
                   ))}
                </div>
            </section>

            {/* PILLARS: PROGRAM STRUCTURE */}
            <section className="py-40 px-6 md:px-24 bg-[#F9F9F9] border-y border-black/5">
                <div className="flex justify-between items-end mb-24 pb-8 border-b border-black/10">
                    <h2 className="text-4xl font-bold uppercase tracking-tighter text-black">Architectural Core</h2>
                    <span className="text-black text-[10px] font-bold tracking-[0.4em] uppercase">8-Week Execution Cycle</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 bg-black/10 border border-black/10">
                    {[
                      { t: "The Synthesis", d: "Retention engineering and the silent mechanics of video fundamentals.", w: "01" },
                      { t: "The Asset", d: "Niche selection and framing value as a high-leverage asset.", w: "02" },
                      { t: "The Engine", d: "Automated outreach systems and high-ticket sales psychology.", w: "03" },
                      { t: "The Scale", d: "Building team moats and delivery systems for ₹1L+ months.", w: "04" }
                    ].map((p, i) => (
                        <div key={i} className="bg-white p-12 hover:bg-[#F3D7A7]/5 transition-all group cursor-default">
                            <span className="text-[10px] font-bold text-black/20 block mb-12 group-hover:text-[#F3D7A7]">PHASE {p.w}</span>
                            <h3 className="text-2xl font-bold uppercase mb-6 tracking-tight leading-none">{p.t}</h3>
                            <p className="text-black/50 text-sm leading-relaxed">{p.d}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* THE MASTERY PROMISE */}
            <section className="py-40 px-6 md:px-24 text-center max-w-6xl mx-auto">
                <Target size={48} className="mx-auto mb-12 text-[#F3D7A7]" strokeWidth={1} />
                <h2 className="text-4xl md:text-8xl font-bold uppercase tracking-tighter leading-[0.8] mb-12">The Definitive <br/> Agency <br/> Ecosystem.</h2>
                <p className="text-2xl text-black/60 leading-relaxed font-light">
                  Blade Inner Circle is not about learning how to build an agency—it's about entering the environment that already built one. This is the synthesis of art, engineering, and commerce.
                </p>
                <div className="grid grid-cols-3 gap-12 mt-32 pt-16 border-t border-black/5">
                   <div>
                      <h4 className="text-4xl font-bold tracking-tighter uppercase mb-2">10</h4>
                      <p className="text-[10px] uppercase tracking-widest text-black/40">Architects / Batch</p>
                   </div>
                   <div>
                      <h4 className="text-4xl font-bold tracking-tighter uppercase mb-2">1:1</h4>
                      <p className="text-[10px] uppercase tracking-widest text-black/40">Founder Access</p>
                   </div>
                   <div>
                      <h4 className="text-4xl font-bold tracking-tighter uppercase mb-2">60</h4>
                      <p className="text-[10px] uppercase tracking-widest text-black/40">Days of Execution</p>
                   </div>
                </div>
            </section>

            {/* ADMISSION PANEL */}
            <section className="py-40 px-6 md:px-24 grid grid-cols-1 md:grid-cols-2 gap-32">
              <div className="max-w-xl">
                <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-[0.8] mb-12">We don’t teach.<br/><span className="text-[#F3D7A7]">We build.</span></h2>
                <p className="text-xl text-black/60 leading-relaxed mb-16">
                   Admission is strictly reserved for those ready to trade passive consumption for active operation. Every seat is vetted for skill potential.
                </p>
              </div>
              <div className="bg-black text-white p-16 flex flex-col justify-between rounded-sm shadow-2xl">
                 <h3 className="text-4xl font-bold uppercase tracking-tighter leading-[0.8]">Entry via <br/> Admission</h3>
                 <p className="text-white/40 text-sm uppercase tracking-[0.4em] leading-relaxed mb-12">
                    Batch 01 applications are handled through private assessment. Specialists and builders only.
                 </p>
                 <button className="w-full py-6 border border-white/20 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all">Start Application</button>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="h-screen flex flex-col justify-center items-center text-center px-6 relative z-20">
        <h2 className={`text-6xl md:text-[9vw] font-bold tracking-tighter uppercase mb-16 ${isAgency ? "text-white" : "text-black"}`}>{isAgency ? "Ready to scale?" : "Stay Ahead."}</h2>
        <motion.a whileHover={{ scale: 1.05 }} href="https://calendly.com/piyushkumar2418/30min" target="_blank" className={`px-16 py-8 border rounded-full font-bold uppercase text-xs tracking-widest transition-all duration-500 ${isAgency ? "border-[#F3D7A7] text-[#F3D7A7] hover:bg-[#F3D7A7] hover:text-black" : "border-black text-black hover:bg-black hover:text-white shadow-2xl"}`}> {isAgency ? "Secure a Session" : "Request Admission"} </motion.a>
        <div className={`absolute bottom-10 text-[9px] uppercase tracking-[0.8em] font-bold ${isAgency ? "text-white/20" : "text-black/20"}`}>© 2026 Blade Media Group</div>
      </footer>
    </motion.main>
  );
}