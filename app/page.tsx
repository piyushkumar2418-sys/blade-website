"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import CustomCursor from "../components/CustomCursor";
import DrawingCanvas from "../components/DrawingCanvas";
import Scene3D from "../components/Scene3D";
import { useRef } from "react";

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

  return (
    <motion.main 
      ref={containerRef}
      style={{ background }}
      className="relative min-h-[600vh] text-white overflow-x-hidden"
    >
      <CustomCursor />
      <DrawingCanvas />
      <Scene3D />

      {/* FILM GRAIN */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-[60] flex justify-between items-center px-12 py-10 mix-blend-difference">
        <div className="font-bold tracking-tighter text-2xl" style={{ fontFamily: 'Helvetica-Bold' }}>
          BLADE
        </div>
        <button className="px-8 py-3 border border-white/20 rounded-full text-[10px] uppercase tracking-widest hover:border-[#F3D7A7] transition-all" style={{ fontFamily: 'Helvetica-Bold' }}>
          Inner Circle
        </button>
      </nav>

      {/* SECTION 1: HERO */}
      <section className="h-screen flex flex-col justify-center items-center text-center relative z-10 px-4">
        <motion.div style={{ y: useTransform(scrollYProgress, [0, 0.1], [0, -50]), opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]) }}>
          <h1 className="text-[14vw] md:text-[11vw] font-bold leading-[0.8] tracking-[-0.05em] uppercase mb-8" style={{ fontFamily: 'Helvetica-Bold' }}>
            Growth,<br/>engineered.
          </h1>
          <p className="text-white/40 text-[12px] md:text-[14px] uppercase tracking-[0.6em] mb-16" style={{ fontFamily: 'Helvetica-Light' }}>Blade Media</p>
          <motion.button whileHover={{ scale: 1.05, letterSpacing: "0.5em" }} className="flex items-center gap-4 mx-auto border-b border-white/40 pb-2 hover:border-[#F3D7A7] transition-all group">
            <span className="text-[10px] uppercase tracking-[0.4em]">View Our Work</span>
            <ArrowUpRight size={14} />
          </motion.button>
        </motion.div>
      </section>

      {/* SECTION 2: THE MONOLITH */}
      <section className="min-h-screen py-48 px-6 md:px-24 border-t border-white/5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start max-w-[1400px] mx-auto">
          <motion.div style={{ opacity: useTransform(scrollYProgress, [0.1, 0.15, 0.45, 0.5], [0, 1, 1, 0]) }} className="md:sticky md:top-48">
            <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] mb-8 block" style={{ fontFamily: 'Helvetica-Light' }}>The Visionary</span>
            <h2 className="text-6xl md:text-8xl font-bold leading-[0.85] tracking-tighter uppercase" style={{ fontFamily: 'Helvetica-Bold' }}>Systematized <br/> Visual <br/> Dominance.</h2>
          </motion.div>
          <div className="space-y-64 pt-12">
            <motion.div style={{ opacity: useTransform(scrollYProgress, [0.15, 0.25], [0, 1]) }} className="max-w-md">
              {/* STYLED PLACEHOLDER FOR FOUNDER PHOTO */}
              <div className="aspect-[3/4] bg-white/5 w-full mb-16 overflow-hidden border border-white/10 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-700">
                 <div className="text-[10px] uppercase tracking-[0.5em] text-white/20">Image Pending</div>
              </div>
              <p className="text-white/60 text-xl md:text-2xl leading-relaxed mb-8" style={{ fontFamily: 'Helvetica-Light' }}>
                We didn't learn content from a syllabus; we decoded it through an early obsession. It began at thirteen, experimentation replacing mentorship. Years spent dissecting retention, mastering the hook, and understanding the silent mechanics of distribution.
              </p>
              <div className="flex items-center gap-4 text-[#F3D7A7] italic text-2xl" style={{ fontFamily: 'Selba-Script' }}>— The Founder&apos;s Path</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WORK GRID */}
      <section className="min-h-screen py-32 px-6 md:px-24 bg-black/20 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-24">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter" style={{ fontFamily: 'Helvetica-Bold' }}>Selected <br/> Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
            <motion.div whileHover={{ y: -10 }} className="md:col-span-7 group cursor-pointer">
              <div className="aspect-[16/10] bg-white/5 overflow-hidden mb-6 relative border border-white/5">
                <div className="w-full h-full bg-[#111] group-hover:scale-105 transition-transform duration-700" />
              </div>
              <h4 className="text-xl font-bold uppercase mb-1" style={{ fontFamily: 'Helvetica-Bold' }}>Visual Identity</h4>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: INNER CIRCLE REVEAL */}
      <section className="h-screen flex flex-col justify-center items-center text-center relative z-10 px-6">
        <motion.div 
          className="flex flex-col items-center"
          style={{ 
            opacity: useTransform(scrollYProgress, [0.75, 0.82, 0.88, 0.92], [0, 1, 1, 0])
          }}
        >
          <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-widest mb-4" style={{ fontFamily: 'Helvetica-Bold' }}>
            INNER CIRCLE
          </h2>
          <p className="max-w-xl mx-auto text-[#F3D7A7]/60 text-lg md:text-xl mb-12" style={{ fontFamily: 'Kanila' }}>
            The evolution of the creative mind. A high-level execution program.
          </p>
        </motion.div>
      </section>

      {/* SECTION 5: CALL BOOKING */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl"
        >
          <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.8em] mb-8 block" style={{ fontFamily: 'Helvetica-Light' }}>
            Available for Partnership
          </span>
          <h2 className="text-5xl md:text-[8vw] font-bold leading-[0.9] tracking-tighter uppercase mb-16" style={{ fontFamily: 'Helvetica-Bold' }}>
            Ready to <br/> scale?
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <motion.a 
              href="https://calendly.com/YOUR_LINK" 
              target="_blank"
              whileHover={{ scale: 1.05, backgroundColor: "#F3D7A7", color: "#000" }}
              className="px-12 py-6 border border-[#F3D7A7] text-[#F3D7A7] rounded-full flex items-center gap-4 transition-colors"
            >
              <Calendar size={20} />
              <span className="text-xs uppercase tracking-[0.3em] font-bold" style={{ fontFamily: 'Helvetica-Bold' }}>
                Secure a Session
              </span>
            </motion.a>
          </div>
        </motion.div>

        <footer className="absolute bottom-12 w-full flex justify-between px-12 text-[8px] uppercase tracking-[0.5em] text-white/20">
          <div>© 2026 Blade Media</div>
          <div>Growth, Engineered.</div>
        </footer>
      </section>
    </motion.main>
  );
}