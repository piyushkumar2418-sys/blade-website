"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, Play } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import DrawingCanvas from "@/components/DrawingCanvas";
import Scene3D from "@/components/Scene3D";
import { useRef } from "react";

// --- HOVER VIDEO COMPONENT (VERTICAL 9:16) ---
const WorkItem = ({ work }: { work: any }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <motion.a 
      href={work.link} 
      target="_blank"
      whileHover={{ y: -8 }} 
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => {
        videoRef.current?.pause();
        if (videoRef.current) videoRef.current.currentTime = 0;
      }}
      className="group relative block aspect-[9/16] bg-[#0a0a0a] border border-white/5 overflow-hidden rounded-lg shadow-2xl"
    >
      <video 
        ref={videoRef}
        src={work.video}
        loop 
        muted 
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-20" />
      <div className="absolute bottom-6 left-6 z-30 text-left">
        <span className="text-[#F3D7A7] text-[9px] uppercase tracking-[0.3em] block mb-2 font-bold">{work.category}</span>
        <h4 className="text-lg md:text-xl font-bold uppercase tracking-tight leading-tight">{work.title}</h4>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
        <div className="w-16 h-16 rounded-full border border-[#F3D7A7]/40 flex items-center justify-center backdrop-blur-md bg-white/5">
          <Play fill="#F3D7A7" className="text-[#F3D7A7] ml-1" size={24} />
        </div>
      </div>
    </motion.a>
  );
};

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const background = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], ["#000000", "#050505", "#0a0904", "#0f0d06"]);

  // --- UPDATED DATA WITH YOUR LINKS ---
  const works = [
    { 
      title: "Visual Dominance", 
      category: "Reel", 
      link: "https://www.instagram.com/reel/DDrxL2CMYCB/", 
      video: "/preview5.mp4" 
    },
    { 
      title: "Editorial Series", 
      category: "Content Creator", 
      link: "https://www.instagram.com/katemackz/", 
      video: "/preview6.mp4" 
    },
    { 
      title: "Dynamic Flow", 
      category: "Cinematic", 
      link: "https://www.instagram.com/reel/DKTmhQqqF6M/", 
      video: "/preview7.mp4" 
    },
    { 
      title: "Retention Edit", 
      category: "Strategy", 
      link: "https://www.instagram.com/reel/DTIgqVyjVcJ/", 
      video: "/preview8.mp4" 
    },
  ];

  return (
    <motion.main ref={containerRef} style={{ background }} className="relative min-h-[800vh] text-white overflow-x-hidden">
      <CustomCursor />
      <DrawingCanvas />
      <Scene3D />

      <div className="fixed inset-0 pointer-events-none z-[5] opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <nav className="fixed top-0 w-full z-[100] flex justify-between items-center px-8 py-6 mix-blend-difference">
        <img src="/blade-logo.png" alt="Blade Media" className="h-8 md:h-12 w-auto object-contain" />
        <button className="px-6 py-2 border border-white/20 rounded-full text-[9px] uppercase tracking-widest hover:border-[#F3D7A7] transition-all font-bold">Inner Circle</button>
      </nav>

      {/* HERO SECTION */}
      <section className="h-screen flex flex-col justify-center items-center text-center relative z-20 px-4">
        <motion.div 
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]),
            y: useTransform(scrollYProgress, [0, 0.1], [0, -50])
          }}
        >
          <h1 className="text-[14vw] md:text-[11vw] font-bold leading-[0.8] tracking-[-0.05em] uppercase mb-8" style={{ filter: 'drop-shadow(0 0 30px rgba(243, 215, 167, 0.2))' }}>
            Growth,<br/>
            <span className="relative inline-block">
              engineered.
              <motion.span animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className="absolute inset-0 blur-3xl bg-[#F3D7A7]/20 -z-10 rounded-full" />
            </span>
          </h1>
          <p className="text-white/40 text-[10px] md:text-[12px] uppercase tracking-[0.6em]">Blade Media</p>
        </motion.div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="min-h-screen py-24 px-6 md:px-24 border-t border-white/5 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start max-w-[1400px] mx-auto text-left relative z-30">
          <div className="md:sticky md:top-32 relative z-40">
            <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold">The Visionary</span>
            <h2 className="text-5xl md:text-7xl font-bold leading-[0.85] tracking-tighter uppercase text-white">Systematized <br/> Visual <br/> Dominance.</h2>
          </div>
          <div className="max-w-xs md:max-w-md ml-auto relative z-40">
            <div className="aspect-[3/4] w-full mb-10 overflow-hidden border border-white/10 bg-[#111] shadow-2xl">
               <img src="/piyush.png" alt="Piyush" className="w-full h-full object-cover grayscale" />
            </div>
            <div className="text-[#F3D7A7] italic text-2xl font-bold">— Piyush</div>
          </div>
        </div>
      </section>

      {/* VERTICAL GRID SECTION */}
      <section className="min-h-screen py-24 px-6 md:px-12 bg-black/20 relative z-20">
        <div className="max-w-[1400px] mx-auto w-full relative z-30">
          <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tighter mb-12 text-left">Selected Productions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {works.map((work, i) => (
              <WorkItem key={i} work={work} />
            ))}
          </div>
        </div>
      </section>

      {/* INNER CIRCLE */}
      <section className="h-screen flex flex-col justify-center items-center text-center relative z-20 px-6">
        <div className="relative z-30 flex flex-col items-center">
          <img src="/inner-circle-logo.png" alt="Inner Circle" className="w-64 md:w-[400px] h-auto mb-2 object-contain" />
          <span className="text-[#F3D7A7] text-[10px] md:text-xs uppercase tracking-[0.6em] font-bold mb-6">Coming Soon</span>
          <p className="max-w-xl mx-auto text-white/40 text-[9px] md:text-[10px] italic tracking-[0.2em] uppercase">The evolution of the creative mind.</p>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="h-screen flex flex-col justify-center items-center px-6 relative z-20 text-center">
          <div className="relative z-30">
            <h2 className="text-5xl md:text-[7vw] font-bold tracking-tighter uppercase mb-12 text-white">Ready to <br/> scale?</h2>
            <a href="https://calendly.com/piyushkumar2418/30min" target="_blank" className="px-10 py-5 border border-[#F3D7A7] text-[#F3D7A7] rounded-full flex items-center gap-4 hover:bg-[#F3D7A7] hover:text-black transition-all mx-auto w-fit font-bold uppercase text-xs">
              <Calendar size={18} />
              <span>Secure a Session</span>
            </a>
          </div>
          <footer className="absolute bottom-10 w-full text-[9px] uppercase tracking-[0.6em] text-white/30 z-30">© 2026 Blade Media</footer>
      </section>
    </motion.main>
  );
}