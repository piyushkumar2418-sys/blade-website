"use client";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Play } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import DrawingCanvas from "@/components/DrawingCanvas";
import Scene3D from "@/components/Scene3D";
import { useRef, useState } from "react";

// --- ANIMATION CONSTANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

// --- STAGGERED WORK ITEM ---
const WorkItem = ({ work, aspect, index }: { work: any; aspect: string, index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.a 
      ref={ref}
      href={work.link} 
      target="_blank"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
      }}
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
      <motion.img 
        src={work.img} 
        alt={work.title}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
      />
      <video 
        ref={videoRef}
        key={work.video}
        src={work.video}
        loop muted playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-10 scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent z-30 opacity-60 group-hover:opacity-90 transition-opacity" />
      <div className="absolute bottom-5 left-5 z-40 text-left">
        <span className="text-[#F3D7A7] text-[8px] uppercase tracking-[0.3em] block mb-2 font-bold opacity-70 group-hover:opacity-100 transition-opacity">{work.category}</span>
        <h4 className="text-sm md:text-lg font-bold uppercase tracking-tighter leading-tight text-white">{work.title}</h4>
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
    { title: "Visual Dominance", category: "Reel", link: "https://www.instagram.com/reel/DDrxL2CMYCB/", video: "/preview5.mp4", img: "/thumb5.webp" },
    { title: "Editorial Series", category: "Reel", link: "https://www.instagram.com/katemackz/", video: "/preview6.mp4", img: "/thumb6.webp" },
    { title: "Dynamic Flow", category: "Reel", link: "https://www.instagram.com/DKTmhQqqF6M/", video: "/preview7.mp4", img: "/thumb7.jpg" },
    { title: "Retention Edit", category: "Reel", link: "https://www.instagram.com/DTIgqVyjVcJ/", video: "/preview8.mp4", img: "/thumb8.jpeg" },
  ];

  return (
    <motion.main ref={containerRef} style={{ background }} className="relative min-h-[1000vh] text-white overflow-x-hidden">
      <CustomCursor />
      <DrawingCanvas />
      <Scene3D />

      <nav className="fixed top-0 w-full z-[100] flex justify-between items-center px-8 py-6 mix-blend-difference">
        <motion.img initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} src="/blade-logo.png" alt="Blade Media" className="h-8 md:h-12 w-auto object-contain" />
        <motion.button initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="px-6 py-2 border border-white/20 rounded-full text-[9px] uppercase tracking-widest hover:border-[#F3D7A7] transition-all font-bold">Inner Circle</motion.button>
      </nav>

      {/* --- HERO --- */}
      <section className="h-screen w-full flex flex-col justify-center items-center text-center relative overflow-hidden bg-black isolate">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0">
          <source src="/hero-bg.mp4?v=3" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20 z-10" />

        <motion.div 
          className="relative z-20 px-4"
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]),
            scale: useTransform(scrollYProgress, [0, 0.1], [1, 1.1])
          }}
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-[14vw] md:text-[11vw] font-bold leading-[0.8] tracking-[-0.05em] uppercase mb-8 text-white mix-blend-difference"
          >
            Growth,<br/>engineered.
          </motion.h1>
        </motion.div>
      </section>

      {/* --- FOUNDER SECTION --- */}
      <section className="min-h-screen py-24 px-6 md:px-24 border-t border-white/5 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start max-w-[1400px] mx-auto relative z-30">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:sticky md:top-32">
            <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold">The Visionary</span>
            <h2 className="text-5xl md:text-7xl font-bold leading-[0.85] tracking-tighter uppercase text-white">Systematized <br/> Visual <br/> Dominance.</h2>
          </motion.div>
          
          <div className="max-w-xs md:max-w-md ml-auto">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="aspect-[3/4] w-full mb-10 overflow-hidden border border-white/10"
            >
               <img src="/piyush.png" alt="Piyush" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </motion.div>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-white/70 text-base md:text-lg leading-relaxed mb-6 italic">
              "We didn&apos;t learn content from a syllabus; we decoded it through an early obsession. Years spent dissecting retention, mastering the hook, and understanding the silent mechanics of distribution."
            </motion.p>
          </div>
        </div>
      </section>

      {/* --- PRODUCTIONS GALLERY --- */}
      <section className="min-h-screen py-32 px-6 md:px-12 bg-black/20 relative z-20">
        <div className="max-w-[1400px] mx-auto w-full relative z-30 space-y-40">
          
          <div>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-2xl md:text-4xl font-bold uppercase tracking-tighter mb-12">Selected Productions</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {youtubeWorks.map((work, i) => (
                <WorkItem key={i} work={work} aspect="aspect-video" index={i} />
              ))}
            </div>
          </div>

          <div>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-2xl md:text-4xl font-bold uppercase tracking-tighter mb-12">Viral Originals</motion.h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {verticalWorks.map((work, i) => (
                <WorkItem key={i} work={work} aspect="aspect-[9/16]" index={i} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- CTA --- */}
      <section className="h-screen flex flex-col justify-center items-center px-6 relative z-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-[7vw] font-bold tracking-tighter uppercase mb-12 text-white"
          >
            Ready to scale?
          </motion.h2>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://calendly.com/piyushkumar2418/30min" 
            target="_blank" 
            className="px-10 py-5 border border-[#F3D7A7] text-[#F3D7A7] rounded-full font-bold uppercase text-xs hover:bg-[#F3D7A7] hover:text-black transition-all"
          >
            Secure a Session
          </motion.a>
          <footer className="absolute bottom-10 w-full text-[9px] uppercase tracking-[0.6em] text-white/30 z-30">© 2026 Blade Media</footer>
      </section>
    </motion.main>
  );
}