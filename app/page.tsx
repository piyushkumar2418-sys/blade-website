"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, Variants, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Users, Zap, Target, Lock } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import DrawingCanvas from "@/components/DrawingCanvas";
import Scene3D from "@/components/Scene3D";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

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
        <div className="absolute bottom-5 left-5 z-40">
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
  const navButtonOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  const toggleMode = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      className="relative overflow-x-hidden transition-colors duration-1000"
    >
      <CustomCursor />
      <DrawingCanvas color={isAgency ? "#F3D7A7" : "#000000"} />
      <Scene3D />

      <nav className="fixed top-0 w-full z-[100] flex justify-between items-center px-8 py-8 mix-blend-difference">
        <div className="flex flex-col">
          <span className="text-white text-lg font-bold tracking-tighter uppercase cursor-pointer" onClick={() => setSiteMode("agency")}>Blade</span>
          <span className="text-white/40 text-[8px] uppercase tracking-[0.4em]">{isAgency ? "Agency" : "Institution"}</span>
        </div>
        <motion.button onClick={toggleMode} style={{ opacity: navButtonOpacity }} className={`px-8 py-3 border rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${isAgency ? "border-white/20 text-white hover:bg-white hover:text-black" : "border-black/20 text-black hover:bg-black hover:text-white"}`}>
          {isAgency ? "The Inner Circle" : "Back to Media"}
        </motion.button>
      </nav>

      <AnimatePresence mode="wait">
        {isAgency ? (
          <motion.div
            key="agency"
            initial={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.6, ease: "circOut" }}
          >
            {/* HERO - Full Opacity */}
            <section className="h-screen w-full flex flex-col justify-center items-center text-center relative overflow-hidden isolate">
              <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0">
                <source src="/hero-bg.mp4?v=4" type="video/mp4" />
              </video>
              <div className="relative z-20 px-4">
                <h1 className="text-[14vw] md:text-[11vw] font-bold leading-[0.8] tracking-[-0.05em] uppercase mb-8 text-white mix-blend-difference">
                  Growth,<br/>engineered.
                </h1>
                <p className="text-white/60 text-[10px] md:text-[12px] uppercase tracking-[0.6em] font-bold mix-blend-difference">Blade Media Agency</p>
              </div>
            </section>

            {/* AGENCY STATEMENT - Restored Width */}
            <section className="min-h-screen py-24 px-6 md:px-24 border-t border-white/5 relative z-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start max-w-[1400px] mx-auto relative z-30">
                <div className="md:sticky md:top-32" ref={philosophyLeftRef}>
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12">
                    <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold">The Visionary</span>
                    <h2 className="text-5xl md:text-7xl font-bold leading-[0.85] tracking-tighter uppercase text-white">Systematized <br/> Visual <br/> Dominance.</h2>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={isPhilosophyLeftInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.2 }} className="mt-16 md:mt-24">
                    <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-[1.5] tracking-tight text-white/60">
                      <span className="text-white font-bold">Blade</span> exists in a space where consistency matters more than claims. Across creators and brands, it has built a reputation for delivering content that not only performs in the moment, but continues to hold value as platforms, trends, and audiences evolve.
                    </p>
                    <motion.div initial={{ width: 0 }} animate={isPhilosophyLeftInView ? { width: "80px" } : {}} transition={{ delay: 0.6, duration: 1.5 }} className="h-[1px] bg-[#F3D7A7]/40 mt-10" />
                  </motion.div>
                </div>
                <div className="max-w-xs md:max-w-md ml-auto">
                  <div className="aspect-[3/4] w-full mb-10 overflow-hidden border border-white/10 grayscale">
                    <img src="/piyush.png" alt="Portrait" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-base md:text-lg leading-relaxed mb-6 italic text-white/70">
                    "We didn't learn content from a syllabus; we decoded it through an early obsession. Years spent dissecting retention, mastering the hook, and understanding the silent mechanics of distribution."
                  </p>
                  <div className="text-[#F3D7A7] italic text-2xl font-bold">— Piyush</div>
                </div>
              </div>
            </section>

            {/* AGENCY GALLERY */}
            <section className="py-32 px-6 md:px-12 relative z-20">
              <div className="max-w-[1400px] mx-auto w-full relative z-30 space-y-40">
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
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="text-black bg-white"
          >
            {/* HERO */}
            <section className="min-h-screen w-full flex flex-col justify-center px-6 md:px-24 pt-32">
              <span className="text-[#F3D7A7] font-bold uppercase tracking-[0.4em] text-xs mb-6">Established 2026</span>
              <h1 className="text-[10vw] font-bold leading-[0.85] tracking-tighter uppercase mb-12">
                The Modern School <br/> of Content <br/> Economics.
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
                <p className="text-2xl md:text-3xl text-black/60 leading-tight max-w-2xl">
                  A 60-day intensive cohort designed to transform skilled builders into high-leverage business owners. 
                  <span className="text-black block mt-4 font-bold italic">No lectures. Only execution.</span>
                </p>
                <div className="flex justify-end">
                  <button className="px-12 py-6 bg-black text-white rounded-full font-bold uppercase tracking-widest text-[10px] flex items-center gap-4 hover:bg-[#F3D7A7] hover:text-black transition-all">
                    Apply for Admission <ArrowUpRight size={16}/>
                  </button>
                </div>
              </div>
            </section>

            {/* CURRICULUM PILLARS */}
            <section className="py-32 px-6 md:px-24 border-t border-black/5 bg-[#F9F9F9]">
              <div className="max-w-[1400px] mx-auto">
                <div className="flex justify-between items-center mb-24">
                  <h2 className="text-4xl font-bold uppercase tracking-tighter">The Four Pillars</h2>
                  <span className="text-black/30 text-[10px] uppercase font-mono tracking-widest">Architectural Overview — Batch 01</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
                  {[
                    { title: "The Craft", desc: "Retention engineering and high-end video synthesis." },
                    { title: "The Offer", desc: "Niche selection and framing value as a high-leverage asset." },
                    { title: "The Engine", desc: "Cold outreach systems and high-ticket sales psychology." },
                    { title: "The Scale", desc: "Building team moats and delivery systems for ₹1L+ months." }
                  ].map((pillar, i) => (
                    <div key={i} className="bg-white p-12 border border-black/5 hover:border-[#F3D7A7] transition-all group cursor-default">
                      <span className="text-[10px] font-bold text-black/20 block mb-8 group-hover:text-[#F3D7A7]">0{i+1}</span>
                      <h3 className="text-2xl font-bold uppercase mb-4 tracking-tight">{pillar.title}</h3>
                      <p className="text-black/50 text-sm leading-relaxed">{pillar.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* PHILOSOPHY */}
            <section className="py-32 px-6 md:px-24">
              <div className="max-w-4xl">
                <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-12">We don’t teach. <br/> We build.</h2>
                <p className="text-2xl text-black/60 leading-relaxed mb-12">
                  The internet doesn't reward those with the most information; it rewards those with the best systems. 
                  Blade Inner Circle is an interactive ecosystem for those who refuse to consume and choose to transform.
                </p>
                <div className="flex flex-wrap gap-12">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#F9F9F9] flex items-center justify-center border border-black/5"><Users size={16}/></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest">10 Members Per Batch</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#F9F9F9] flex items-center justify-center border border-black/5"><Zap size={16}/></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Active Execution Model</span>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* FOOTER - Full Opacity */}
      <footer className="h-screen flex flex-col justify-center items-center text-center px-6 relative z-20">
        <h2 className={`text-5xl md:text-[8vw] font-bold tracking-tighter uppercase mb-12 ${isAgency ? "text-white" : "text-black"}`}>
          {isAgency ? "Ready to scale?" : "Stay Ahead."}
        </h2>
        <motion.a whileHover={{ scale: 1.05 }} href="https://calendly.com/piyushkumar2418/30min" target="_blank" className={`px-12 py-6 border rounded-full font-bold uppercase text-[10px] tracking-widest mx-auto block ${isAgency ? "border-[#F3D7A7] text-[#F3D7A7] hover:bg-[#F3D7A7] hover:text-black" : "border-black text-black hover:bg-black hover:text-white"}`}> 
          {isAgency ? "Secure a Session" : "Request Admission"} 
        </motion.a>
        <div className={`mt-12 text-[9px] uppercase tracking-[0.6em] font-bold ${isAgency ? "text-white/30" : "text-black/30"}`}>© 2026 Blade {isAgency ? "Media" : "Inner Circle"}</div>
      </footer>
    </motion.main>
  );
}