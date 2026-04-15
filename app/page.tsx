"use client";
import { motion, useScroll, useTransform, useInView, Variants, AnimatePresence } from "framer-motion";
import { Play, ArrowUpRight } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import DrawingCanvas from "@/components/DrawingCanvas";
import Scene3D from "@/components/Scene3D";
import { useRef, useState, useEffect } from "react";

// --- RAVI-STYLE TEXT REVEAL ---
const TextReveal = ({ children, className }: { children: string, className?: string }) => {
  return (
    <div className={`overflow-hidden leading-[0.85] ${className}`}>
      <motion.span
        initial={{ y: "100%", rotate: 5 }}
        whileInView={{ y: 0, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="block origin-left"
      >
        {children}
      </motion.span>
    </div>
  );
};

// --- CINEMATIC WORK ITEM ---
const WorkItem = ({ work, aspect, index }: { work: any; aspect: string, index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const container = useRef(null);
  const isInView = useInView(container, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={container}
      className="relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.a 
        href={work.link} 
        target="_blank"
        onMouseEnter={() => { setIsHovered(true); videoRef.current?.play(); }}
        onMouseLeave={() => { setIsHovered(false); videoRef.current?.pause(); if(videoRef.current) videoRef.current.currentTime = 0; }}
        className={`group relative block ${aspect} bg-[#070707] overflow-hidden rounded-[2px]`}
      >
        {/* PARALLAX IMAGE EFFECT */}
        <motion.img 
          src={work.img} 
          alt={work.title}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute inset-0 w-full h-full object-cover z-20 ${isHovered ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}
        />
        <video 
          ref={videoRef}
          src={work.video}
          loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover z-10 brightness-110"
        />

        {/* MASKED DETAILS OVERLAY */}
        <div className="absolute inset-0 bg-black/20 z-30 group-hover:bg-transparent transition-colors duration-700" />
        <div className="absolute top-6 right-6 z-40 opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-500">
           <ArrowUpRight className="text-[#F3D7A7]" size={32} strokeWidth={1} />
        </div>
        
        <div className="absolute bottom-8 left-8 z-40">
          <motion.span className="text-[#F3D7A7] text-[9px] uppercase tracking-[0.4em] block mb-3 font-bold">{work.category}</motion.span>
          <h4 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white leading-none">{work.title}</h4>
        </div>
      </motion.a>
    </motion.div>
  );
};

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Custom Parallax for Background Elements
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

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
    <motion.main ref={containerRef} className="relative min-h-[1000vh] bg-black text-white selection:bg-[#F3D7A7] selection:text-black">
      <CustomCursor />
      <DrawingCanvas />
      
      {/* --- FLOATING 3D BACKGROUND --- */}
      <motion.div style={{ y }} className="fixed inset-0 pointer-events-none z-0">
        <Scene3D />
      </motion.div>

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-[100] flex justify-between items-center px-10 py-10 mix-blend-difference">
        <img src="/blade-logo.png" alt="Blade Media" className="h-10 w-auto grayscale brightness-200" />
        <div className="flex gap-10">
           <button className="text-[10px] uppercase tracking-widest font-bold border-b border-transparent hover:border-white transition-all">Archive</button>
           <button className="text-[10px] uppercase tracking-widest font-bold border-b border-transparent hover:border-[#F3D7A7] transition-all text-[#F3D7A7]">Contact</button>
        </div>
      </nav>

      {/* --- HERO: THE RAVI START --- */}
      <section className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden isolate">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-60">
          <source src="/hero-bg.mp4?v=3" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 z-10" />

        <div className="relative z-20 text-center mix-blend-difference">
          <TextReveal className="text-[16vw] md:text-[13vw] font-bold tracking-[-0.07em]">GROWTH,</TextReveal>
          <TextReveal className="text-[16vw] md:text-[13vw] font-bold tracking-[-0.07em] -mt-[4vw]">ENGINEERED.</TextReveal>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="mt-12 flex flex-col items-center"
          >
             <div className="w-[1px] h-24 bg-white/20 relative">
                <motion.div 
                  animate={{ top: ["0%", "100%", "0%"] }} 
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-0 w-[1px] h-10 bg-[#F3D7A7]" 
                />
             </div>
             <span className="mt-4 text-[9px] uppercase tracking-[0.8em] font-medium text-white/40">Scroll to Explore</span>
          </motion.div>
        </div>
      </section>

      {/* --- FOUNDER: THE VISIONARY --- */}
      <section className="min-h-screen py-40 px-6 md:px-24 relative z-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-32 items-end">
          <div className="md:sticky md:top-40 h-fit">
            <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.6em] mb-6 block font-bold">The Visionary</span>
            <TextReveal className="text-6xl md:text-8xl font-bold tracking-tighter uppercase">SYSTEMATIZED</TextReveal>
            <TextReveal className="text-6xl md:text-8xl font-bold tracking-tighter uppercase -mt-2">VISUAL</TextReveal>
            <TextReveal className="text-6xl md:text-8xl font-bold tracking-tighter uppercase -mt-2 text-[#F3D7A7]">DOMINANCE.</TextReveal>
          </div>
          
          <div className="relative">
            <motion.div 
               style={{ y: useTransform(scrollYProgress, [0.1, 0.3], [100, -100]) }}
               className="aspect-[3/4] w-full mb-16 overflow-hidden bg-[#111]"
            >
               <img src="/piyush.png" alt="Piyush" className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-1000" />
            </motion.div>
            <p className="text-white/60 text-xl md:text-2xl leading-[1.4] tracking-tight max-w-lg">
              "We didn’t learn content from a syllabus; we decoded it through obsession. Years spent dissecting retention, mastering the hook, and understanding the silent mechanics of distribution."
            </p>
          </div>
        </div>
      </section>

      {/* --- PRODUCTION GALLERY --- */}
      <section className="py-40 px-6 md:px-12 bg-[#050505] relative z-20">
        <div className="max-w-[1600px] mx-auto space-y-60">
          
          <div>
            <div className="flex justify-between items-end mb-20 border-b border-white/10 pb-10">
               <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">Selected Productions</h2>
               <span className="text-white/30 text-xs font-mono">01 — 03</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {youtubeWorks.map((work, i) => (
                <WorkItem key={i} work={work} aspect="aspect-video" index={i} />
              ))}
            </div>
          </div>

          <div>
             <div className="flex justify-between items-end mb-20 border-b border-white/10 pb-10">
               <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-[#F3D7A7]">Viral Originals</h2>
               <span className="text-white/30 text-xs font-mono">04 — 08</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {verticalWorks.map((work, i) => (
                <WorkItem key={i} work={work} aspect="aspect-[9/16]" index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA: FINAL SCALE --- */}
      <section className="h-screen flex flex-col justify-center items-center px-6 relative z-20 text-center">
          <TextReveal className="text-7xl md:text-[10vw] font-bold tracking-tighter uppercase mb-16">READY TO SCALE?</TextReveal>
          
          <motion.a 
            href="https://calendly.com/piyushkumar2418/30min" 
            target="_blank"
            whileHover={{ scale: 1.05 }}
            className="group relative px-16 py-8 border border-white/20 rounded-full overflow-hidden"
          >
            <motion.div 
              className="absolute inset-0 bg-[#F3D7A7] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]" 
            />
            <span className="relative z-10 text-[11px] uppercase tracking-[0.4em] font-bold group-hover:text-black transition-colors">Secure a Session</span>
          </motion.a>
          
          <footer className="absolute bottom-10 w-full text-[9px] uppercase tracking-[0.8em] text-white/20 font-bold">
            © 2026 BLADE MEDIA — ALL RIGHTS RESERVED
          </footer>
      </section>
    </motion.main>
  );
}