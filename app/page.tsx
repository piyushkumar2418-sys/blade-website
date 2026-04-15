"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Calendar, Play } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import DrawingCanvas from "@/components/DrawingCanvas";
import Scene3D from "@/components/Scene3D";
import { useRef } from "react";

// --- HOVER VIDEO COMPONENT ---
const WorkItem = ({ work }: { work: any }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <motion.a 
      href={work.link} 
      target="_blank"
      whileHover={{ y: -5 }} 
      onMouseEnter={() => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => console.log("Playback blocked"));
        }
      }}
      onMouseLeave={() => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
      className="group relative block aspect-video bg-[#0a0a0a] border border-white/5 overflow-hidden rounded-sm"
    >
      <img 
        src={work.img} 
        alt={work.title}
        className="absolute inset-0 w-full h-full object-cover z-10 group-hover:opacity-0 transition-opacity duration-500 ease-in-out" 
      />
      
      <video 
        ref={videoRef}
        src={work.video}
        poster={work.img}
        loop 
        muted 
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      >
        <source src={work.video} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-70 z-20" />
      <div className="absolute bottom-3 left-3 z-30 text-left">
        <span className="text-[#F3D7A7] text-[7px] md:text-[8px] uppercase tracking-[0.2em] block mb-1 font-bold">{work.category}</span>
        <h4 className="text-[10px] md:text-sm font-bold uppercase tracking-tight leading-none">{work.title}</h4>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-all scale-50">
        <Play fill="#F3D7A7" className="text-[#F3D7A7]" size={40} />
      </div>
    </motion.a>
  );
};

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const background = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], ["#000000", "#050505", "#0a0904", "#0f0d06"]);

  const works = [
    { 
      title: "Nikhil Kamath", 
      category: "Long Form Editorial", 
      link: "https://youtu.be/YY7J1pHfSyY", 
      img: "https://i.ytimg.com/vi/YY7J1pHfSyY/maxresdefault.jpg", 
      video: "/preview1.mp4" 
    },
    { 
      title: "Money with Swabi", 
      category: "Finance Strategy", 
      link: "https://www.youtube.com/@Moneywithswabi/videos", 
      img: "https://i.ytimg.com/vi/NQvveKioHCw/maxresdefault.jpg", 
      video: "/preview2.mp4" 
    },
    { 
      title: "Podcast", 
      category: "Right Now With Rohan", 
      link: "https://youtu.be/i7uwh0CzfRM", 
      img: "https://i.ytimg.com/vi/i7uwh0CzfRM/maxresdefault.jpg", 
      video: "/preview3.mp4" 
    },
  ];

  return (
    <motion.main ref={containerRef} style={{ background }} className="relative min-h-[700vh] text-white overflow-x-hidden">
      <CustomCursor />
      <DrawingCanvas />
      <Scene3D />

      <div className="fixed inset-0 pointer-events-none z-[5] opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <nav className="fixed top-0 w-full z-[100] flex justify-between items-center px-8 py-6 mix-blend-difference">
        <img src="/blade-logo.png" alt="Blade Media" className="h-8 md:h-12 w-auto object-contain" />
        <button className="px-6 py-2 border border-white/20 rounded-full text-[9px] uppercase tracking-widest hover:border-[#F3D7A7] transition-all font-bold">
          Inner Circle
        </button>
      </nav>

      {/* SECTION 1: HERO WITH GLOW */}
      <section className="h-screen flex flex-col justify-center items-center text-center relative z-20 px-4">
        <motion.div 
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]),
            y: useTransform(scrollYProgress, [0, 0.1], [0, -50])
          }}
        >
          <h1 
            className="text-[14vw] md:text-[11vw] font-bold leading-[0.8] tracking-[-0.05em] uppercase mb-8 transition-all duration-1000"
            style={{ 
              filter: 'drop-shadow(0 0 30px rgba(243, 215, 167, 0.15))',
              textShadow: '0 0 50px rgba(243, 215, 167, 0.1)'
            }}
          >
            Growth,<br/>
            <span className="relative inline-block">
              engineered.
              <motion.span 
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 blur-[80px] bg-[#F3D7A7]/20 -z-10 rounded-full"
              />
            </span>
          </h1>
          <p className="text-white/40 text-[10px] md:text-[12px] uppercase tracking-[0.6em]">Blade Media</p>
        </motion.div>
      </section>

      {/* SECTION 2: THE FOUNDER */}
      <section className="min-h-screen py-24 px-6 md:px-24 border-t border-white/5 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start max-w-[1400px] mx-auto text-left relative z-30">
          <motion.div 
            style={{ opacity: useTransform(scrollYProgress, [0.1, 0.15, 0.45, 0.5], [0, 1, 1, 0]) }} 
            className="md:sticky md:top-32 relative z-40"
          >
            <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold">The Visionary</span>
            <h2 className="text-5xl md:text-7xl font-bold leading-[0.85] tracking-tighter uppercase text-white">
              Systematized <br/> Visual <br/> Dominance.
            </h2>
          </motion.div>
          
          <div className="max-w-xs md:max-w-md ml-auto relative z-40">
            <div className="aspect-[3/4] w-full mb-10 overflow-hidden border border-white/10 bg-[#111] shadow-2xl">
               <img src="/piyush.png" alt="Piyush" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6 italic">
              "We didn&apos;t learn content from a syllabus; we decoded it through an early obsession. Years spent dissecting retention, mastering the hook, and understanding the silent mechanics of distribution."
            </p>
            <div className="text-[#F3D7A7] italic text-2xl font-bold">— Piyush</div>
          </div>
        </div>
      </section>

      {/* SECTION 3: PRODUCTIONS */}
      <section className="min-h-screen flex flex-col justify-center py-24 px-4 md:px-12 bg-black/20 relative z-20">
        <div className="max-w-[1200px] mx-auto w-full relative z-30">
          <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tighter mb-12 text-left">Selected Productions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {works.map((work, i) => (
              <WorkItem key={i} work={work} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: INNER CIRCLE */}
      <section className="h-screen flex flex-col justify-center items-center text-center relative z-20 px-6">
        <div className="relative z-30 flex flex-col items-center">
          <img src="/inner-circle-logo.png" alt="Inner Circle" className="w-64 md:w-[400px] h-auto mb-2 object-contain" />
          <span className="text-[#F3D7A7] text-[10px] md:text-xs uppercase tracking-[0.6em] font-bold mb-6">Coming Soon</span>
          <p className="max-w-xl mx-auto text-white/40 text-[9px] md:text-[10px] italic tracking-[0.2em] uppercase">
            The evolution of the creative mind.
          </p>
        </div>
      </section>

      {/* SECTION 5: CTA */}
      <section className="h-screen flex flex-col justify-center items-center px-6 relative z-20 text-center">
          <div className="relative z-30">
            <h2 className="text-5xl md:text-[7vw] font-bold leading-[0.9] tracking-tighter uppercase mb-12 text-white">
              Ready to <br/> scale?
            </h2>
            <a href="https://calendly.com/piyushkumar2418/30min" target="_blank" className="px-10 py-5 border border-[#F3D7A7] text-[#F3D7A7] rounded-full flex items-center gap-4 hover:bg-[#F3D7A7] hover:text-black transition-all mx-auto w-fit">
              <Calendar size={18} />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Secure a Session</span>
            </a>
          </div>
          <footer className="absolute bottom-10 w-full text-[9px] uppercase tracking-[0.6em] text-white/30 z-30">
            © 2026 Blade Media • Growth, Engineered.
          </footer>
      </section>
    </motion.main>
  );
}