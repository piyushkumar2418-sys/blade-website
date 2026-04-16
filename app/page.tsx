"use client";
import { motion, useScroll, useTransform, useInView, Variants } from "framer-motion";
import { Play } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import DrawingCanvas from "@/components/DrawingCanvas";
import Scene3D from "@/components/Scene3D";
import { useRef, useState } from "react";

// --- ANIMATION VARIANTS ---
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
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
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { delay: index * 0.1, duration: 0.6 } 
        }
      }}
    >
      <motion.a 
        href={work.link} 
        target="_blank"
        onMouseEnter={() => { setIsHovered(true); videoRef.current?.play().catch(() => null); }}
        onMouseLeave={() => { setIsHovered(false); videoRef.current?.pause(); if(videoRef.current) videoRef.current.currentTime = 0; }}
        className={`group relative block ${aspect} bg-[#0a0a0a] border border-white/5 overflow-hidden rounded-sm shadow-2xl`}
      >
        <img 
          src={work.img} 
          alt={work.title}
          className={`absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        />
        <video 
          ref={videoRef}
          key={work.video}
          src={work.video}
          loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover z-10"
        />
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
  const containerRef = useRef(null);
  const philosophyLeftRef = useRef(null);
  const isPhilosophyLeftInView = useInView(philosophyLeftRef, { once: true, margin: "-20%" });
  
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Navigation Button Fade Logic
  const navButtonOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

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
    <motion.main ref={containerRef} className="relative bg-black text-white overflow-x-hidden">
      <CustomCursor />
      <DrawingCanvas />
      <Scene3D />

      {/* --- NAV --- */}
      <nav className="fixed top-0 w-full z-[100] flex justify-between items-center px-8 py-8 mix-blend-difference">
        {/* Restored to original scale */}
        <img src="/blade-logo.png" alt="Blade Media" className="h-8 md:h-10 w-auto object-contain" />
        <motion.button 
          style={{ opacity: navButtonOpacity }}
          className="px-6 py-2 border border-white/20 rounded-full text-[9px] uppercase tracking-widest font-bold"
        >
          Inner Circle
        </motion.button>
      </nav>

      {/* --- HERO --- */}
      <section className="h-screen w-full flex flex-col justify-center items-center text-center relative overflow-hidden bg-black isolate">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-80">
          <source src="/hero-bg.mp4?v=4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 z-10" />
        <motion.div className="relative z-20 px-4 select-none" style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]), y: useTransform(scrollYProgress, [0, 0.1], [0, -50]) }}>
          <h1 className="text-[14vw] md:text-[11vw] font-bold leading-[0.8] tracking-[-0.05em] uppercase mb-8 text-white mix-blend-difference">Growth,<br/>engineered.</h1>
          <p className="text-white/60 text-[10px] md:text-[12px] uppercase tracking-[0.6em] font-bold mix-blend-difference">Blade Media</p>
        </motion.div>
      </section>

      {/* --- DUAL CONTENT SECTION --- */}
      <section className="min-h-screen py-24 px-6 md:px-24 border-t border-white/5 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start max-w-[1400px] mx-auto relative z-30">
          
          {/* LEFT COLUMN: NEW PREMIUM STATEMENT */}
          <div className="md:sticky md:top-32" ref={philosophyLeftRef}>
            <motion.span 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={fadeUp} 
              className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] mb-8 block font-bold"
            >
              The Philosophy
            </motion.span>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isPhilosophyLeftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-white/60 text-xl md:text-2xl lg:text-3xl font-medium leading-[1.5] tracking-tight max-w-lg">
                <span className="text-white">Blade</span> exists in a space where consistency 
                matters more than claims. Across creators and brands, it has built a 
                reputation for delivering content that not only performs in the moment, 
                but continues to hold value as platforms, trends, and audiences evolve.
              </p>
              
              <motion.div 
                initial={{ width: 0 }}
                animate={isPhilosophyLeftInView ? { width: "80px" } : {}}
                transition={{ delay: 0.6, duration: 1.5, ease: "easeInOut" }}
                className="h-[1px] bg-[#F3D7A7]/40 mt-10"
              />
            </motion.div>
          </div>

          {/* RIGHT COLUMN: ORIGINAL VISIONARY CONTENT */}
          <div className="max-w-xs md:max-w-md ml-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12">
              <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold">The Visionary</span>
              <h2 className="text-5xl md:text-7xl font-bold leading-[0.85] tracking-tighter uppercase text-white">Systematized <br/> Visual <br/> Dominance.</h2>
            </motion.div>

            <motion.div initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className="aspect-[3/4] w-full mb-10 overflow-hidden border border-white/10">
               <img src="/piyush.png" alt="Piyush" className="w-full h-full object-cover grayscale" />
            </motion.div>

            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-white/70 text-base md:text-lg leading-relaxed mb-6 italic">
              "We didn&apos;t learn content from a syllabus; we decoded it through an early obsession. Years spent dissecting retention, mastering the hook, and understanding the silent mechanics of distribution."
            </motion.p>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-[#F3D7A7] italic text-2xl font-bold">— Piyush</motion.div>
          </div>
        </div>
      </section>

      {/* --- GALLERY --- */}
      <section className="py-32 px-6 md:px-12 bg-black/20 relative z-20">
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

      {/* --- INNER CIRCLE --- */}
      <section className="min-h-screen py-32 flex flex-col justify-center items-center text-center relative z-[40] px-6 bg-black border-y border-white/5">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-[50] flex flex-col items-center">
          <div className="w-64 md:w-[500px] mb-8">
            <img src="/inner-circle-logo.png" alt="Inner Circle" className="w-full h-auto object-contain" />
          </div>
          <span className="text-[#F3D7A7] text-[10px] md:text-xs uppercase tracking-[0.6em] font-bold mb-6">Coming Soon</span>
          <p className="max-w-xl mx-auto text-white/40 text-[9px] md:text-[10px] italic tracking-[0.2em] uppercase">The evolution of the creative mind.</p>
        </motion.div>
      </section>

      {/* --- CTA --- */}
      <section className="h-screen flex flex-col justify-center items-center px-6 relative z-20 text-center">
          <h2 className="text-5xl md:text-[8vw] font-bold tracking-tighter uppercase mb-12 text-white text-center">Ready to scale?</h2>
          <motion.a 
            whileHover={{ scale: 1.05 }} 
            href="https://calendly.com/piyushkumar2418/30min" 
            target="_blank" 
            className="px-12 py-6 border border-[#F3D7A7] text-[#F3D7A7] rounded-full font-bold uppercase text-xs mx-auto block"
          > Secure a Session </motion.a>
          <footer className="absolute bottom-10 w-full text-[9px] uppercase tracking-[0.6em] text-white/30 z-30">© 2026 Blade Media</footer>
      </section>
    </motion.main>
  );
}