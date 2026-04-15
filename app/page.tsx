"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, Play } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import DrawingCanvas from "@/components/DrawingCanvas";
import Scene3D from "@/components/Scene3D";
import { useRef, useState } from "react";

// --- UNIVERSAL WORK COMPONENT ---
const WorkItem = ({ work, aspect }: { work: any; aspect: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a 
      href={work.link} 
      target="_blank"
      whileHover={{ y: -8 }} 
      onMouseEnter={() => {
        setIsHovered(true);
        videoRef.current?.play().catch(() => null);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        videoRef.current?.pause();
        if (videoRef.current) videoRef.current.currentTime = 0;
      }}
      className={`group relative block ${aspect} bg-[#0a0a0a] border border-white/5 overflow-hidden rounded-lg shadow-2xl`}
    >
      {/* THE VIDEO LAYER */}
      <video 
        ref={videoRef}
        key={work.video} // Forces reload when you push new assets
        src={work.video}
        poster={work.img || ""}
        loop muted playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      />
      
      {/* FALLBACK/STATIC IMAGE LAYER */}
      {!isHovered && work.img && (
        <img 
          src={work.img} 
          className="absolute inset-0 w-full h-full object-cover z-20" 
          alt={work.title} 
        />
      )}

      {/* OVERLAY & TEXT */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent z-30" />
      <div className="absolute bottom-4 left-4 z-40 text-left">
        <span className="text-[#F3D7A7] text-[8px] uppercase tracking-[0.2em] block mb-1 font-bold">{work.category}</span>
        <h4 className="text-sm md:text-base font-bold uppercase tracking-tight leading-tight text-white">{work.title}</h4>
      </div>
      
      {/* PLAY ICON ON HOVER */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
        <div className="w-12 h-12 rounded-full border border-[#F3D7A7]/40 flex items-center justify-center backdrop-blur-md bg-white/5">
          <Play fill="#F3D7A7" className="text-[#F3D7A7] ml-0.5" size={20} />
        </div>
      </div>
    </motion.a>
  );
};

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const background = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], ["#000000", "#050505", "#0a0904", "#0f0d06"]);

  const youtubeWorks = [
    { title: "Nikhil Kamath", category: "YouTube", link: "https://youtu.be/YY7J1pHfSyY", video: "/preview1.mp4", img: "https://i.ytimg.com/vi/YY7J1pHfSyY/maxresdefault.jpg" },
    { title: "Money with Swabi", category: "YouTube", link: "https://www.youtube.com/@Moneywithswabi/videos", video: "/preview2.mp4", img: "https://i.ytimg.com/vi/NQvveKioHCw/maxresdefault.jpg" },
    { title: "Podcast", category: "Podcast", link: "https://youtu.be/i7uwh0CzfRM", video: "/preview3.mp4", img: "https://i.ytimg.com/vi/i7uwh0CzfRM/maxresdefault.jpg" },
  ];

  const verticalWorks = [
    { title: "Visual Dominance", category: "Reel", link: "https://www.instagram.com/reel/DDrxL2CMYCB/", video: "/preview5.mp4" },
    { title: "Editorial Series", category: "Reel", link: "https://www.instagram.com/katemackz/", video: "/preview6.mp4" },
    { title: "Dynamic Flow", category: "Reel", link: "https://www.instagram.com/DKTmhQqqF6M/", video: "/preview7.mp4" },
    { title: "Retention Edit", category: "Reel", link: "https://www.instagram.com/DTIgqVyjVcJ/", video: "/preview8.mp4" },
  ];

  return (
    <motion.main ref={containerRef} style={{ background }} className="relative min-h-[1000vh] text-white overflow-x-hidden">
      <CustomCursor />
      <DrawingCanvas />
      <Scene3D />

      <nav className="fixed top-0 w-full z-[100] flex justify-between items-center px-8 py-6 mix-blend-difference">
        <img src="/blade-logo.png" alt="Blade Media" className="h-8 md:h-12 w-auto object-contain" />
        <button className="px-6 py-2 border border-white/20 rounded-full text-[9px] uppercase tracking-widest hover:border-[#F3D7A7] transition-all font-bold">Inner Circle</button>
      </nav>

      {/* --- HERO --- */}
      <section className="h-screen flex flex-col justify-center items-center text-center relative z-20">
        <h1 className="text-[14vw] md:text-[11vw] font-bold leading-[0.8] tracking-[-0.05em] uppercase mb-8" style={{ filter: 'drop-shadow(0 0 30px rgba(243, 215, 167, 0.2))' }}>
          Growth,<br/><span className="relative">engineered.<motion.span animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className="absolute inset-0 blur-3xl bg-[#F3D7A7]/20 -z-10 rounded-full" /></span>
        </h1>
        <p className="text-white/40 text-[10px] md:text-[12px] uppercase tracking-[0.6em]">Blade Media</p>
      </section>

      {/* --- FOUNDER SECTION (FIXED TEXT) --- */}
      <section className="min-h-screen py-24 px-6 md:px-24 border-t border-white/5 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start max-w-[1400px] mx-auto text-left relative z-30">
          <div className="md:sticky md:top-32">
            <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold">The Visionary</span>
            <h2 className="text-5xl md:text-7xl font-bold leading-[0.85] tracking-tighter uppercase text-white">Systematized <br/> Visual <br/> Dominance.</h2>
          </div>
          <div className="max-w-xs md:max-w-md ml-auto relative z-40">
            <div className="aspect-[3/4] w-full mb-10 overflow-hidden border border-white/10 bg-[#111] shadow-2xl">
               <img src="/piyush.png" alt="Piyush" className="w-full h-full object-cover grayscale" />
            </div>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6 italic">
              "We didn&apos;t learn content from a syllabus; we decoded it through an early obsession. Years spent dissecting retention, mastering the hook, and understanding the silent mechanics of distribution."
            </p>
            <div className="text-[#F3D7A7] italic text-2xl font-bold">— Piyush</div>
          </div>
        </div>
      </section>

      {/* --- DUAL GRID GALLERY --- */}
      <section className="min-h-screen py-24 px-6 md:px-12 bg-black/20 relative z-20">
        <div className="max-w-[1400px] mx-auto w-full relative z-30 space-y-32">
          
          {/* LANDSCAPE PRODUCTIONS */}
          <div>
            <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tighter mb-12">Selected Productions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {youtubeWorks.map((work, i) => (
                <WorkItem key={i} work={work} aspect="aspect-video" />
              ))}
            </div>
          </div>

          {/* VERTICAL REELS */}
          <div>
            <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tighter mb-12">Viral Originals</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {verticalWorks.map((work, i) => (
                <WorkItem key={i} work={work} aspect="aspect-[9/16]" />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- INNER CIRCLE --- */}
      <section className="h-screen flex flex-col justify-center items-center text-center relative z-20 px-6">
        <div className="relative z-30 flex flex-col items-center">
          <img src="/inner-circle-logo.png" alt="Inner Circle" className="w-64 md:w-[400px] h-auto mb-2 object-contain" />
          <span className="text-[#F3D7A7] text-[10px] md:text-xs uppercase tracking-[0.6em] font-bold mb-6">Coming Soon</span>
          <p className="max-w-xl mx-auto text-white/40 text-[9px] md:text-[10px] italic tracking-[0.2em] uppercase">The evolution of the creative mind.</p>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="h-screen flex flex-col justify-center items-center px-6 relative z-20 text-center">
          <div className="relative z-30">
            <h2 className="text-5xl md:text-[7vw] font-bold tracking-tighter uppercase mb-12 text-white">Ready to <br/> scale?</h2>
            <a href="https://calendly.com/piyushkumar2418/30min" target="_blank" className="px-10 py-5 border border-[#F3D7A7] text-[#F3D7A7] rounded-full font-bold uppercase text-xs flex items-center gap-4 hover:bg-[#F3D7A7] hover:text-black transition-all">
              <span>Secure a Session</span>
            </a>
          </div>
          <footer className="absolute bottom-10 w-full text-[9px] uppercase tracking-[0.6em] text-white/30 z-30">© 2026 Blade Media</footer>
      </section>
    </motion.main>
  );
}