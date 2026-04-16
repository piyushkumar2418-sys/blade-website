"use client";
import { motion, useScroll, useTransform, useInView, Variants, AnimatePresence } from "framer-motion";
import { Play, Lock } from "lucide-react";
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
  const [siteMode, setSiteMode] = useState<"agency" | "innerCircle">("agency");
  const containerRef = useRef(null);
  const philosophyLeftRef = useRef(null);
  const isPhilosophyLeftInView = useInView(philosophyLeftRef, { once: true, margin: "-20%" });
  
  const { scrollYProgress } = useScroll({ target: containerRef });
  const isAgency = siteMode === "agency";

  // Navigation Button Fade Logic
  const navButtonOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // Toggle Function
  const toggleMode = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setSiteMode(isAgency ? "innerCircle" : "agency"), 300);
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
      className="relative overflow-x-hidden transition-colors duration-700"
    >
      <CustomCursor />
      <DrawingCanvas color={isAgency ? "#F3D7A7" : "#000000"} />
      <Scene3D />

      {/* --- NAV --- */}
      <nav className="fixed top-0 w-full z-[100] flex justify-between items-center px-8 py-8 mix-blend-difference">
        <img 
          src={isAgency ? "/blade-logo.png" : "/inner-circle-logo.png"} 
          alt="Logo" 
          className="h-8 md:h-10 w-auto object-contain cursor-pointer"
          onClick={() => setSiteMode("agency")}
        />
        <motion.button 
          onClick={toggleMode}
          style={{ opacity: navButtonOpacity }}
          className={`px-6 py-2 border rounded-full text-[9px] uppercase tracking-widest font-bold transition-all ${
            isAgency 
            ? "border-white/20 text-white hover:border-[#F3D7A7]" 
            : "border-black/20 text-black hover:bg-black hover:text-white"
          }`}
        >
          {isAgency ? "Inner Circle" : "Back to Agency"}
        </motion.button>
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={siteMode}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8 }}
        >
          {/* --- HERO SECTION --- */}
          <section className="h-screen w-full flex flex-col justify-center items-center text-center relative overflow-hidden isolate">
            {isAgency && (
              <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-80">
                <source src="/hero-bg.mp4?v=4" type="video/mp4" />
              </video>
            )}
            <div className={`absolute inset-0 z-10 ${isAgency ? "bg-black/40" : "bg-white/0"}`} />
            <div className="relative z-20 px-4 select-none">
              <h1 className={`text-[14vw] md:text-[11vw] font-bold leading-[0.8] tracking-[-0.05em] uppercase mb-8 transition-colors duration-700 ${isAgency ? "text-white mix-blend-difference" : "text-black"}`}>
                {isAgency ? <>Growth,<br/>engineered.</> : <>The Elite<br/>Collective.</>}
              </h1>
              <p className={`text-[10px] md:text-[12px] uppercase tracking-[0.6em] font-bold ${isAgency ? "text-white/60" : "text-black/40"}`}>
                {isAgency ? "Blade Media Agency" : "Blade Inner Circle"}
              </p>
            </div>
          </section>

          {/* --- DUAL CONTENT SECTION --- */}
          <section className={`min-h-screen py-24 px-6 md:px-24 border-t relative z-20 transition-colors duration-700 ${isAgency ? "border-white/5" : "border-black/5"}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start max-w-[1400px] mx-auto relative z-30">
              
              {/* LEFT COLUMN: HEADING + STATEMENT (BOX AREA) */}
              <div className="md:sticky md:top-32" ref={philosophyLeftRef}>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12">
                  <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold">
                    {isAgency ? "The Visionary" : "The Membership"}
                  </span>
                  <h2 className={`text-5xl md:text-7xl font-bold leading-[0.85] tracking-tighter uppercase transition-colors duration-700 ${isAgency ? "text-white" : "text-black"}`}>
                    {isAgency ? <>Systematized <br/> Visual <br/> Dominance.</> : <>Architecting <br/> Creative <br/> Alpha.</>}
                  </h2>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isPhilosophyLeftInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-16 md:mt-24"
                >
                  <p className={`text-xl md:text-2xl lg:text-3xl font-medium leading-[1.5] tracking-tight max-w-lg ${isAgency ? "text-white/60" : "text-black/60"}`}>
                    {isAgency ? (
                      <>
                        <span className="text-white">Blade</span> exists in a space where consistency 
                        matters more than claims. Across creators and brands, it has built a 
                        reputation for delivering content that not only performs in the moment.
                      </>
                    ) : (
                      <>
                        A private ecosystem for those who refuse to be average. <span className="text-black font-bold">Inner Circle</span> is where elite strategy meets raw creative power for the future of media.
                      </>
                    )}
                  </p>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={isPhilosophyLeftInView ? { width: "80px" } : {}}
                    transition={{ delay: 0.6, duration: 1.5 }}
                    className="h-[1px] bg-[#F3D7A7]/40 mt-10"
                  />
                </motion.div>
              </div>

              {/* RIGHT COLUMN: MEDIA + QUOTE */}
              <div className="max-w-xs md:max-w-md ml-auto">
                <motion.div initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className={`aspect-[3/4] w-full mb-10 overflow-hidden border ${isAgency ? "border-white/10" : "border-black/10"}`}>
                   <img 
                    src={isAgency ? "/piyush.png" : "/inner-circle-exclusive.png"} 
                    alt="Piyush" 
                    className={`w-full h-full object-cover transition-all duration-1000 ${isAgency ? "grayscale" : "contrast-110"}`} 
                   />
                </motion.div>
                <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className={`text-base md:text-lg leading-relaxed mb-6 italic ${isAgency ? "text-white/70" : "text-black/70"}`}>
                  {isAgency 
                    ? "\"We didn't learn content from a syllabus; we decoded it through an early obsession. Years spent dissecting retention.\"" 
                    : "\"The greatest leverage in 2026 is a mind that can synthesize high art and viral data into inevitability.\""}
                </motion.p>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-[#F3D7A7] italic text-2xl font-bold">— Piyush</motion.div>
              </div>
            </div>
          </section>

          {/* --- MODE-SPECIFIC GALLERY/SECTION --- */}
          {isAgency ? (
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
          ) : (
            <section className="py-32 px-6 bg-[#f9f9f9] text-black border-y border-black/5">
              <div className="max-w-4xl mx-auto text-center">
                <Lock className="mx-auto mb-8 text-[#F3D7A7]" size={48} />
                <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8">Access is Earned.</h3>
                <p className="text-black/40 uppercase tracking-widest text-xs mb-12">Applications Opening Soon for Q3 2026</p>
                <button className="bg-black text-white px-12 py-5 rounded-full font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-[#F3D7A7] hover:text-black transition-all shadow-xl">
                  Join the Waitlist
                </button>
              </div>
            </section>
          )}
        </motion.div>
      </AnimatePresence>

      {/* --- CTA --- */}
      <section className="h-screen flex flex-col justify-center items-center px-6 relative z-20 text-center">
          <h2 className={`text-5xl md:text-[8vw] font-bold tracking-tighter uppercase mb-12 transition-colors duration-700 ${isAgency ? "text-white" : "text-black"}`}>
            {isAgency ? "Ready to scale?" : "Stay Ahead."}
          </h2>
          <motion.a 
            whileHover={{ scale: 1.05 }} 
            href="#" 
            className={`px-12 py-6 border rounded-full font-bold uppercase text-xs mx-auto block transition-all ${
              isAgency ? "border-[#F3D7A7] text-[#F3D7A7]" : "border-black text-black"
            }`}
          > 
            {isAgency ? "Secure a Session" : "Inquire for Entry"} 
          </motion.a>
          <footer className={`absolute bottom-10 w-full text-[9px] uppercase tracking-[0.6em] z-30 transition-colors duration-700 ${isAgency ? "text-white/30" : "text-black/30"}`}>
            © 2026 Blade {isAgency ? "Media" : "Inner Circle"}
          </footer>
      </section>
    </motion.main>
  );
}