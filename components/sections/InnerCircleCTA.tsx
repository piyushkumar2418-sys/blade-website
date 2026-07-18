"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ShieldCheck, Zap, Award, Lock 
} from "lucide-react";
import { useRouter } from "next/navigation";

// 3D Parallax Tilt Card Component
const InteractiveStatCard = ({ stat }: { stat: { icon: React.ReactNode; label: string; desc: string } }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate distance from center of the card
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Map to a max rotation of 12 degrees
    const rX = -(mouseY / height) * 12;
    const rY = (mouseX / width) * 12;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
      className="p-10 bg-[#0a0a0a] border border-white/5 hover:border-[#F3D7A7]/20 hover:bg-[#111111] transition-all duration-300 group text-left relative overflow-hidden"
    >
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="mb-6 text-[#F3D7A7] group-hover:scale-110 transition-transform duration-300 text-left"
      >
        {stat.icon}
      </div>
      <h4 
        style={{ transform: "translateZ(20px)" }}
        className="text-sm font-bold uppercase tracking-widest leading-tight mb-3 text-white text-left"
      >
        {stat.label}
      </h4>
      <p 
        style={{ transform: "translateZ(10px)" }}
        className="text-[10px] text-white/40 uppercase tracking-[0.2em] leading-relaxed text-left"
      >
        {stat.desc}
      </p>
      
      {/* Decorative hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-radial-gradient from-[#F3D7A7] to-transparent pointer-events-none" />
    </motion.div>
  );
};

interface InnerCircleCTAProps {
  onJoinWaitlist: () => void;
}

const InnerCircleCTA = ({ onJoinWaitlist }: InnerCircleCTAProps) => {
  const router = useRouter();

  const founderStats = [
    { icon: <ShieldCheck size={24} />, label: "Proven Results", desc: "No guesswork. We only use steps that already work." },
    { icon: <Zap size={24} />, label: "Fast Progress", desc: "Go from learning to running a real business in 60 days." },
    { icon: <Award size={24} />, label: "Job Opportunities", desc: "Direct hiring for our best students." },
    { icon: <Lock size={24} />, label: "Real Checklists", desc: "Get the same templates we used for 2.5 Billion+ views." },
  ];

  return (
    <>
      <section 
        className="bg-[#050505] text-left relative z-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 text-left">
          {founderStats.map((stat, idx) => (
            <InteractiveStatCard key={idx} stat={stat} />
          ))}
        </div>
      </section>

      {/* CURRICULUM SECTION */}
      <section 
        className="py-24 px-6 md:px-24 bg-[#050505] text-left relative z-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        {/* Glow backdrop */}
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-[#F3D7A7]/5 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto text-left relative z-10">
          <div className="bg-white/[0.01] border border-white/10 hover:border-[#F3D7A7]/25 rounded-[3.5rem] p-10 md:p-16 relative overflow-hidden text-left flex flex-col md:flex-row items-center gap-12 min-h-[500px] shadow-2xl backdrop-blur-3xl transition-all duration-500">
            {/* Background details */}
            <div className="absolute top-16 right-[35%] w-12 h-12 border border-[#F3D7A7]/10 rounded-full hidden md:block text-left" />
            
            <div className="flex-1 space-y-8 relative z-10 text-left">
              <div className="space-y-4 text-left">
                <span className="text-[#F3D7A7] text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block text-left">What you will learn</span>
                <h2 className="text-white text-5xl md:text-[72px] font-bold uppercase tracking-tight leading-[0.85] mb-8 text-left">
                  The exact systems <br /> behind ₹3Cr+ in <br /> revenue.
                </h2>
              </div>
              <p className="text-white/40 text-lg md:text-xl font-medium max-w-xl leading-relaxed mb-10 text-left">
                We have broken down how to start your agency into five simple steps. No wasting time, just doing the work.
              </p>
              <motion.button 
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => router.prefetch("/curriculum")}
                onClick={() => router.push("/curriculum")}
                className="bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-[#F3D7A7] transition-all duration-300 flex items-center gap-4 shadow-xl text-left"
              >
                View Full Prospectus <ArrowRight size={20}/>
              </motion.button>
            </div>

            <div className="flex flex-row md:flex-col gap-6 relative z-10 text-left">
              <div className="bg-black/50 border border-white/5 rounded-[30px] p-8 w-40 md:w-52 text-center flex flex-col justify-center items-center shadow-xl text-left backdrop-blur-md">
                 <span className="text-white text-5xl font-bold block tracking-tighter mb-1 text-left">60</span>
                 <span className="text-[#F3D7A7] text-[10px] font-bold uppercase tracking-[0.3em] block text-left">Days</span>
              </div>
              <div className="bg-black/50 border border-white/5 rounded-[30px] p-8 w-40 md:w-52 text-center flex flex-col justify-center items-center shadow-xl text-left backdrop-blur-md">
                 <span className="text-white text-5xl font-bold block tracking-tighter mb-1 text-left">5</span>
                 <span className="text-[#F3D7A7] text-[10px] font-bold uppercase tracking-[0.3em] block text-left">Phases</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REAL PREMIUM FOOTER */}
      <footer 
        className="bg-black text-white border-t border-white/5 py-24 md:py-32 px-6 md:px-24 relative z-20 text-left"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-start">
          {/* Left Column */}
          <div className="md:col-span-7 flex flex-col text-left space-y-10">
            <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-[-0.05em] leading-none text-white text-left font-sans">
              Stop Consuming.<br />Start Operating.
            </h2>
            
            <motion.button 
              whileHover={{ scale: 1.01 }} 
              whileTap={{ scale: 0.99 }}
              onClick={onJoinWaitlist}
              className="flex items-center justify-between w-full max-w-md px-8 py-6 bg-white text-black font-bold uppercase text-[10px] tracking-[0.2em] transition-all duration-300 hover:bg-[#F3D7A7]"
            >
              <span>Apply for Cohort 02</span>
              <span className="text-sm">→</span>
            </motion.button>

            <div className="text-left font-sans">
              <span className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-bold block mb-1">Admissions Intake:</span>
              <span className="text-[#F3D7A7] text-sm font-bold tracking-wider">
                August 2026 Intake Now Active
              </span>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-5 grid grid-cols-2 gap-8 w-full md:pl-12">
            {/* Sub-column 1: Navigation */}
            <div className="flex flex-col gap-4 text-left font-sans text-[11px] uppercase tracking-[0.15em] font-bold text-white/50">
              <span className="text-white/20 text-[9px] tracking-[0.2em] font-bold mb-2">School</span>
              <a href="/curriculum" className="hover:text-white transition-colors">Curriculum</a>
              <a href="/apply/register" className="hover:text-white transition-colors">Apply Now</a>
              <a href="/apply/login" className="hover:text-white transition-colors">Sign In</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            </div>

            {/* Sub-column 2: Socials */}
            <div className="flex flex-col gap-4 text-left font-sans text-[11px] uppercase tracking-[0.15em] font-bold text-white/50">
              <span className="text-white/20 text-[9px] tracking-[0.2em] font-bold mb-2">Connect</span>
              <a href="https://www.instagram.com/blade.media_/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">Instagram <span className="text-[9px] opacity-60">↗</span></a>
              <a href="https://wa.me/917082176274" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">WhatsApp <span className="text-[9px] opacity-60">↗</span></a>
            </div>

            {/* Bottom row: Location & Legal */}
            <div className="text-left text-white/40 text-[11px] mt-16 leading-relaxed font-sans uppercase tracking-wider">
              <span className="text-white/20 text-[9px] tracking-[0.2em] font-bold block mb-1">HQ</span>
              <span>New Delhi</span> <br />
              <span className="font-bold text-white/20 text-[10px] tracking-[0.2em]">India, Asia</span>
            </div>
          </div>
        </div>
        
        {/* Copyright row */}
        <div className="max-w-[1400px] mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] uppercase tracking-[0.6em] text-white/10 font-mono">
          <span>© 2026 Blade // Institutional Access</span>
          <span>Stop Consuming. Start Operating.</span>
        </div>
      </footer>
    </>
  );
};

export default InnerCircleCTA;
