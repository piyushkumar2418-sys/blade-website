"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, MessageCircle, 
  ShieldCheck, Zap, Award, Lock, Terminal 
} from "lucide-react";
import { useRouter } from "next/navigation";

const InstagramIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

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

      {/* FINAL CTA */}
      <section 
        className="py-60 px-6 md:px-24 text-center bg-[#050505] relative overflow-hidden z-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        {/* Subtle decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F3D7A7]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-32">
          <div className="space-y-12 text-center">
            <span className="text-white/20 text-[10px] font-bold uppercase tracking-[1em] block">Final Briefing</span>
            <h2 className="text-6xl md:text-[100px] font-bold uppercase tracking-tighter leading-[0.8] text-white text-center">
              The next step <br/> is to take action.
            </h2>
          </div>
          
          <div className="flex flex-col items-center gap-20 text-center">
            <p className="text-white/40 text-sm md:text-base max-w-md uppercase tracking-[0.4em] leading-relaxed font-medium text-center">
              Submit your admission portfolio for the August 2026 intake.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={onJoinWaitlist} 
              className="bg-[#F3D7A7] text-black px-20 py-8 rounded-full font-bold uppercase tracking-[0.4em] text-[11px] hover:shadow-[0_0_40px_rgba(243,215,167,0.25)] transition-all duration-300 flex items-center gap-4 group cursor-none"
            >
              Apply for Cohort 02
              <Terminal size={14} className="group-hover:scale-110 transition-transform" />
            </motion.button>
          </div>

          <div className="pt-40 text-center space-y-16">
            <div className="flex items-center justify-center gap-12">
              <a href="https://wa.me/917082176274" target="_blank" className="text-white/20 hover:text-white transition-all group">
                <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.instagram.com/bladeinnercircle/" target="_blank" className="text-white/20 hover:text-white transition-all group">
                <InstagramIcon size={24} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
            <div className="space-y-4">
              <p className="text-[9px] font-bold uppercase tracking-[1.2em] text-white/30">Stop Consuming. Start Operating.</p>
              <p className="text-[8px] font-bold uppercase tracking-[0.6em] text-white/10">© 2026 Blade // Institutional Access</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InnerCircleCTA;
