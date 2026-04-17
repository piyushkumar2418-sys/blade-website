"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, Variants, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Zap, Users, Target, Laptop, LineChart, Landmark, Microscope, GraduationCap } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import DrawingCanvas from "@/components/DrawingCanvas";
import Scene3D from "@/components/Scene3D";

// --- ANIMATION VARIANTS (EXACT REPLICATION) ---
const cardVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

// --- WORK ITEM COMPONENT (FRAMER LOGIC) ---
const WorkItem = ({ work, aspect, index }: { work: any; aspect: string, index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative flex justify-center items-center overflow-hidden pt-5 -mb-[120px]"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: false, amount: 0.8 }}
    >
      {/* The Splash Background Effect */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          background: `linear-gradient(306deg, #F3D7A7, #000000)`,
          clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`
        }}
      />

      <motion.div 
        variants={cardVariants}
        style={{ transformOrigin: "10% 60%" }}
        className={`relative z-10 w-full max-w-[500px] ${aspect} bg-[#0a0a0a] rounded-[20px] overflow-hidden shadow-2xl border border-white/5`}
      >
        <motion.a 
          href={work.link} 
          target="_blank"
          onMouseEnter={() => { setIsHovered(true); videoRef.current?.play().catch(() => null); }}
          onMouseLeave={() => { setIsHovered(false); videoRef.current?.pause(); if(videoRef.current) videoRef.current.currentTime = 0; }}
          className="block w-full h-full cursor-none"
        >
          <img src={work.img} alt={work.title} className={`absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
          <video ref={videoRef} key={work.video} src={work.video} loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-30" />
          <div className="absolute bottom-10 left-10 z-40 text-left">
            <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.3em] block mb-2 font-bold">{work.category}</span>
            <h4 className="text-xl font-bold uppercase tracking-tight text-white">{work.title}</h4>
          </div>
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

// --- SECTION LABEL FOR BIC ---
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="h-[1px] w-8 bg-[#F3D7A7]" />
    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/40">{children}</span>
  </div>
);

export default function Home() {
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
    { title: "Dynamic Flow", category: "Reel", link: "https://www.instagram.com/DKTmhQqqF6M/", video: "/preview7.mp4", img: "/thumb7.jpg" },
    { title: "Retention Edit", category: "Reel", link: "https://www.instagram.com/DTIgqVyjVcJ/", video: "/preview8.mp4", img: "/thumb8.jpeg" },
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
        <motion.button 
          onClick={toggleMode} 
          style={{ opacity: navButtonOpacity }}
          className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all border shadow-sm ${
            isAgency 
            ? "border-white/20 text-white bg-white/5 hover:bg-white hover:text-black" 
            : "border-black text-black bg-black/5 hover:bg-black hover:text-white"
          }`}
        >
          {isAgency ? "The Inner Circle" : "Exit to Agency"}
        </motion.button>
      </nav>

      <AnimatePresence mode="wait">
        {isAgency ? (
          <motion.div key="agency" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* HERO */}
            <section className="h-screen w-full flex flex-col justify-center items-center text-center relative overflow-hidden bg-black">
              <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-70">
                <source src="/hero-bg.mp4?v=4" type="video/mp4" />
              </video>
              <div className="relative z-20 px-4">
                <h1 className="text-[14vw] md:text-[11vw] font-bold leading-[0.8] tracking-[-0.05em] uppercase mb-8 text-white">Growth,<br/>engineered.</h1>
                <p className="text-[#F3D7A7] text-[10px] md:text-[12px] uppercase tracking-[0.8em] font-bold">Blade Media</p>
              </div>
            </section>

            {/* PHILOSOPHY */}
            <section className="min-h-screen py-32 px-6 md:px-24 border-t border-white/5 relative z-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start max-w-[1440px] mx-auto text-left">
                <div className="md:sticky md:top-32" ref={philosophyLeftRef}>
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12">
                    <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold">The Visionary</span>
                    <h2 className="text-5xl md:text-8xl font-bold leading-[0.85] tracking-tighter uppercase text-white mb-16">Systematized <br/> Visual <br/> Dominance.</h2>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={isPhilosophyLeftInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.2 }}>
                    <p className="text-white/70 text-xl md:text-2xl lg:text-3xl font-medium leading-[1.4] tracking-tight">
                      <span className="text-white font-bold">Blade</span> exists in a space where consistency matters more than claims. Across creators and brands, it has built a reputation for delivering content that not only performs in the moment.
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

            {/* POP-UP VIDEO GALLERIES (THE FRAMER EFFECT) */}
            <section className="py-32 px-6 md:px-12 relative z-20 bg-black">
              <div className="max-w-[1400px] mx-auto w-full flex flex-col items-center">
                <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tighter mb-32 text-white">Selected Productions</h2>
                <div className="w-full space-y-[150px] pb-[200px]">
                  {youtubeWorks.map((work, i) => ( 
                    <WorkItem key={i} work={work} aspect="aspect-video" index={i} /> 
                  ))}
                </div>

                <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tighter mb-32 mt-64 text-[#F3D7A7]">Viral Originals</h2>
                <div className="w-full space-y-[150px] pb-[200px]">
                  {verticalWorks.map((work, i) => ( 
                    <WorkItem key={i} work={work} aspect="aspect-[9/16]" index={i} /> 
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          /* --- INNER CIRCLE SIDE --- */
          <motion.div key="innerCircle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-black bg-white min-h-screen">
             <section className="h-screen flex flex-col justify-center px-6 md:px-24 border-b border-black/5">
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-[0.5em] font-bold mb-8 block text-black/40">Blade Inner Circle</motion.span>
              <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-[12vw] md:text-[8vw] font-bold leading-[0.85] tracking-tighter uppercase mb-12">The School of <br/> Modern Content.</motion.h1>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                <p className="text-2xl md:text-4xl text-black/60 leading-tight font-medium max-w-2xl">Build your agency. <br/> From skill to first income.</p>
                <div className="flex flex-col items-start md:items-end gap-6">
                  <span className="text-[#F3D7A7] font-bold uppercase tracking-[0.3em] text-[10px] border border-[#F3D7A7]/30 px-4 py-2">Cohort 01 — Applications Open</span>
                  <button onClick={() => window.location.href = "/apply"} className="bg-black text-white px-12 py-6 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#F3D7A7] hover:text-black transition-all flex items-center gap-4">Apply for Admission <ArrowUpRight size={18}/></button>
                </div>
              </div>
            </section>

            <section className="py-32 px-6 md:px-24 max-w-7xl text-left">
              <SectionLabel>Institutional Thesis</SectionLabel>
              <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.9] mb-12">Theoretical learning is a trap. <br/> <span className="text-black/20">This is an execution lab.</span></h2>
              <p className="text-xl md:text-3xl text-black/60 leading-relaxed font-light max-w-4xl">Blade Inner Circle is a 2-month intensive for those who refuse to be passive. We deploy systems. You are entering a room where revenue is the only metric.</p>
            </section>

            <section className="py-32 px-6 md:px-24 bg-[#F9F9F9] border-y border-black/5 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-12">Extracted from <br/> the trenches.</h2>
                <div className="space-y-12">
                  <div>
                    <h4 className="text-xl font-bold uppercase mb-4 text-black">Zero Theory</h4>
                    <p className="text-black/50 leading-relaxed">Everything decoded over thousands of hours of client work at Blade Media. We share the mechanics that courses don't know exist.</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold uppercase mb-4 text-black">High Stakes</h4>
                    <p className="text-black/50 leading-relaxed">Designed to move you from amateur creator to agency operator in 60 days.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-32 px-6 md:px-24 text-left">
              <SectionLabel>The Ledger</SectionLabel>
              <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-20 text-center text-black">Tangible Assets.</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { icon: <Target />, t: "Skill Moat", d: "Mastery over retention and editing fundamentals." },
                  { icon: <Laptop />, t: "Service Engine", d: "A high-ticket offer that clients actually need." },
                  { icon: <Users />, t: "Client Pipeline", d: "A repeatable system for acquisition." },
                  { icon: <LineChart />, t: "Income Path", d: "A clear trajectory to ₹1L/month." }
                ].map((item, i) => (
                  <div key={i} className="p-10 border border-black/5 hover:border-[#F3D7A7] transition-all text-left group">
                    <div className="text-[#F3D7A7] mb-6">{item.icon}</div>
                    <h3 className="text-xl font-bold uppercase mb-4 text-black">{item.t}</h3>
                    <p className="text-sm text-black/40 leading-relaxed">{item.d}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="py-32 px-6 md:px-24 bg-black text-white text-left">
              <SectionLabel>The 60-Day Build</SectionLabel>
              <div className="space-y-24 mt-20 text-left">
                {[
                  { p: "Phase 01", t: "Foundation & Synthesis", d: "Stripping away amateur habits. Mastering the silent physics of content and niche selection." },
                  { p: "Phase 02", t: "Asset Architecture", d: "Building your offer and framing your skill as a high-leverage liquid asset." },
                  { p: "Phase 03", t: "The Acquisition Engine", d: "Deploying outreach systems and mastering the psychology of high-ticket sales." },
                  { p: "Phase 04", t: "Scale & Leverage", d: "Client delivery systems, team moats, and removing yourself from the fulfillment loop." }
                ].map((phase, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-white/10 pb-16">
                    <span className="md:col-span-2 font-mono text-[#F3D7A7] text-sm">{phase.p}</span>
                    <h3 className="md:col-span-4 text-3xl font-bold uppercase tracking-tighter">{phase.t}</h3>
                    <p className="md:col-span-6 text-white/40 text-lg leading-relaxed font-light">{phase.d}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="py-32 px-6 md:px-24 grid grid-cols-1 md:grid-cols-3 gap-1 bg-black/5 text-left">
              {[
                { i: <Zap />, h: "Live Sprints", d: "Weekly interactive builds where we solve real-world agency bottlenecks in real-time." },
                { i: <Target />, h: "Hot Seats", d: "Your systems and outreach put under the microscope for surgical feedback." },
                { i: <ShieldCheck />, h: "Execution Logs", d: "Daily accountability and tracking to ensure you are building." }
              ].map((item, i) => (
                <div key={i} className="p-12 bg-white border border-black/5 text-left">
                  <div className="text-[#F3D7A7] mb-8">{item.i}</div>
                  <h4 className="font-bold uppercase mb-4 text-black">{item.h}</h4>
                  <p className="text-sm text-black/40">{item.d}</p>
                </div>
              ))}
            </section>

            <section className="py-32 px-6 md:px-24 bg-white text-left">
              <div className="max-w-4xl">
                <SectionLabel>The Founder</SectionLabel>
                <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.9] mb-12 text-black">I didn't have a mentor. <br/> I had deadlines.</h2>
                <p className="text-xl md:text-2xl text-black/60 leading-relaxed font-light mb-8">I started at 13. I learned content and agency building by failing until I didn't. The Inner Circle exists to build the room I didn't have—a place of raw truth and engineered results.</p>
              </div>
            </section>

            <section className="py-40 px-6 md:px-24 text-center border-t border-black/5">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter mb-12 text-black">Admission <br/> is Earned.</h2>
                <p className="text-black/40 text-lg uppercase tracking-widest mb-16 italic text-sm">Entry is restricted to 10 architects per batch.</p>
                <button onClick={() => window.location.href = "/apply"} className="bg-black text-white px-20 py-8 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#F3D7A7] hover:text-black transition-all shadow-2xl">Apply Now</button>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="h-[50vh] flex flex-col justify-center items-center text-center px-6 relative z-20">
        {isAgency && (
          <>
            <h2 className="text-6xl md:text-[9vw] font-bold tracking-tighter uppercase mb-16 text-white">Ready to scale?</h2>
            <motion.a whileHover={{ scale: 1.05 }} href="https://calendly.com/piyushkumar2418/30min" target="_blank" className="px-16 py-8 border border-[#F3D7A7] text-[#F3D7A7] rounded-full font-bold uppercase text-xs tracking-widest transition-all duration-500 hover:bg-[#F3D7A7] hover:text-black shadow-2xl">Secure a Session</motion.a>
          </>
        )}
        <div className={`absolute bottom-10 text-[9px] uppercase tracking-[0.8em] font-bold ${isAgency ? "text-white/20" : "text-black/20"}`}>© 2026 Blade</div>
      </footer>
    </motion.main>
  );
}