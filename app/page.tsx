"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Calendar, Play } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import DrawingCanvas from "@/components/DrawingCanvas";
import Scene3D from "@/components/Scene3D";
import { useRef } from "react";

// --- HOVER VIDEO COMPONENT (YT FORMAT) ---
const WorkItem = ({ work }: { work: any }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <motion.a 
      href={work.link} 
      target="_blank"
      whileHover={{ scale: 1.02 }} 
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => {
        videoRef.current?.pause();
        if (videoRef.current) videoRef.current.currentTime = 0;
      }}
      className="group relative block aspect-video bg-[#0a0a0a] border border-white/5 overflow-hidden shadow-2xl"
    >
      {/* YT THUMBNAIL */}
      <img 
        src={work.img} 
        alt={work.title}
        className="absolute inset-0 w-full h-full object-cover z-10 group-hover:opacity-0 transition-opacity duration-700 ease-in-out" 
      />
      
      {/* PREVIEW VIDEO */}
      <video 
        ref={videoRef}
        src={work.video}
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 z-20" />
      <div className="absolute bottom-6 left-6 z-30 text-left">
        <span className="text-[#F3D7A7] text-[9px] uppercase tracking-[0.3em] block mb-2 font-bold">{work.category}</span>
        <h4 className="text-xl md:text-2xl font-bold uppercase leading-tight tracking-tighter">{work.title}</h4>
      </div>
      
      {/* PLAY BUTTON HINT */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
        <div className="w-20 h-20 rounded-full border border-[#F3D7A7]/30 flex items-center justify-center backdrop-blur-md bg-white/5">
          <Play fill="#F3D7A7" className="text-[#F3D7A7] ml-1" size={32} />
        </div>
      </div>
    </motion.a>
  );
};

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const background = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8, 1],
    ["#000000", "#050505", "#0a0904", "#0f0d06"] 
  );

  // --- YOUR UPDATED YT WORK DATA ---
  const works = [
    { 
      title: "Bill Gates x Nikhil Kamath", 
      category: "Long Form Editorial", 
      link: "https://youtu.be/YY7J1pHfSyY", 
      img: "https://i.ytimg.com/vi/YY7J1pHfSyY/maxresdefault.jpg", // Bill Gates Thumbnail
      video: "/preview1.mp4" 
    },
    { 
      title: "Money with Swabi", 
      category: "Finance Strategy", 
      link: "https://www.youtube.com/@Moneywithswabi/videos", 
      img: "https://i.ytimg.com/vi/NQvveKioHCw/maxresdefault.jpg", // Swabi Thumbnail
      video: "/preview2.mp4" 
    },
    { 
      title: "Be Your Own Bartender", 
      category: "Cinematic Lifestyle", 
      link: "https://youtu.be/i7uwh0CzfRM", 
      img: "https://i.ytimg.com/vi/i7uwh0CzfRM/maxresdefault.jpg", // Bartender Thumbnail
      video: "/preview3.mp4" 
    },
  ];

  return (
    <motion.main ref={containerRef} style={{ background }} className="relative min-h-[700vh] text-white overflow-x-hidden">
      <CustomCursor />
      <DrawingCanvas />
      <Scene3D />

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-[60] flex justify-between items-center px-12 py-10 mix-blend-difference">
        <img src="/blade-logo.png" alt="Blade Media" className="h-10 md:h-16 w-auto object-contain" />
        <button className="px-10 py-4 border border-white/20 rounded-full text-[11px] uppercase tracking-widest hover:border-[#F3D7A7] transition-all font-bold">Inner Circle</button>
      </nav>

      {/* HERO */}
      <section className="h-screen flex flex-col justify-center items-center text-center relative z-10 px-4">
        <motion.div style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]) }}>
          <h1 className="text-[14vw] md:text-[11vw] font-bold leading-[0.8] tracking-[-0.05em] uppercase mb-8">Growth,<br/>engineered.</h1>
          <p className="text-white/40 text-[12px] md:text-[14px] uppercase tracking-[0.6em] mb-16">Blade Media</p>
        </motion.div>
      </section>

      {/* FOUNDER SECTION (Piyush) */}
      <section className="min-h-screen py-48 px-6 md:px-24 border-t border-white/5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start max-w-[1400px] mx-auto text-left">
          <div className="md:sticky md:top-48">
            <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] mb-8 block font-bold">The Visionary</span>
            <h2 className="text-6xl md:text-8xl font-bold leading-[0.85] tracking-tighter uppercase">Systematized <br/> Visual <br/> Dominance.</h2>
          </div>
          <div className="space-y-64 pt-12">
            <div className="max-w-md">
              <div className="aspect-[3/4] w-full mb-16 overflow-hidden border border-white/10 bg-[#111]">
                 <img src="/piyush.png" alt="Piyush" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <p className="text-white/60 text-xl leading-relaxed mb-8">
                We didn&apos;t learn content from a syllabus; we decoded it through an early obsession. Years spent dissecting retention, mastering the hook, and understanding the silent mechanics of distribution.
              </p>
              <div className="text-[#F3D7A7] italic text-2xl">— Piyush</div>
            </div>
          </div>
        </div>
      </section>

      {/* YT WORK GALLERY (LANDSCAPE) */}
      <section className="min-h-screen py-32 px-6 md:px-24 bg-black/20 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-24 text-left">Selected <br/> Productions</h2>
          <div className="flex flex-col gap-12">
            {works.map((work, i) => (
              <WorkItem key={i} work={work} />
            ))}
          </div>
        </div>
      </section>

      {/* INNER CIRCLE REVEAL */}
      <section className="h-screen flex flex-col justify-center items-center text-center relative z-10 px-6">
        <img src="/inner-circle-logo.png" alt="Inner Circle" className="w-80 md:w-[550px] h-auto mb-2 object-contain" />
        <p className="max-w-2xl mx-auto text-[#F3D7A7]/60 text-sm italic tracking-widest uppercase">The evolution of the creative mind. A high-level execution program.</p>
      </section>

      {/* CALL BOOKING */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 relative z-10 text-center">
          <h2 className="text-5xl md:text-[8vw] font-bold leading-[0.9] tracking-tighter uppercase mb-16">Ready to <br/> scale?</h2>
          <a href="https://calendly.com/piyushkumar2418/30min" target="_blank" className="px-14 py-7 border border-[#F3D7A7] text-[#F3D7A7] rounded-full flex items-center gap-4 hover:bg-[#F3D7A7] hover:text-black transition-all">
            <Calendar size={22} />
            <span className="text-sm uppercase tracking-[0.3em] font-bold">Secure a Session</span>
          </a>
          <footer className="mt-32 text-[9px] uppercase tracking-[0.6em] text-white/30">© 2026 Blade Media • Growth, Engineered.</footer>
      </section>
    </motion.main>
  );
}