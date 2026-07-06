"use client";
import React from "react";
import { motion } from "framer-motion";
import { Zap, Award, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

const SprintProtocol = () => {
  const router = useRouter();
  
  return (
    <section 
      className="py-40 px-6 md:px-24 bg-[#050505] text-white overflow-hidden relative"
      style={{
        backgroundImage: 'radial-gradient(rgba(243, 215, 167, 0.08) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Ambient decorative glow */}
      <div className="absolute top-1/2 left-[-10%] w-[500px] h-[500px] bg-[#8B5CF6]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-6 mb-16">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 bg-[#F3D7A7] rounded-full animate-pulse" />
            <div className="w-1.5 h-1.5 bg-[#F3D7A7]/40 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#F3D7A7]/20 rounded-full" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-[#F3D7A7]">Our Program Guidelines</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="space-y-10">
            <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-[0.8] mb-8">
              The Sprint <br/> <span className="text-white/20">Protocol.</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed max-w-lg font-light">
              The Inner Circle is a 60-day intensive training program. We help you go from just watching content to running a real business.
            </p>
            
            <div className="flex flex-wrap gap-8 pt-8">
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#F3D7A7]">Class Format</p>
                <p className="text-sm font-bold uppercase">Google Meet / Zoom (Live)</p>
              </div>
              <div className="w-[1px] h-10 bg-white/10 hidden md:block" />
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#F3D7A7]">What You Get</p>
                <p className="text-sm font-bold uppercase">Executive Placements</p>
              </div>
            </div>
          </div>

          {/* INTERACTIVE 3D STATUS CARD */}
          <motion.div 
            initial={{ rotateY: 20, rotateX: 10 }}
            whileHover={{ rotateY: 0, rotateX: 0 }}
            className="relative group cursor-crosshair"
          >
            <div className="absolute inset-0 bg-[#F3D7A7]/15 blur-[120px] rounded-full group-hover:bg-[#F3D7A7]/25 transition-colors" />
            <div className="relative bg-[#050505]/50 border border-white/10 hover:border-[#F3D7A7]/20 p-12 md:p-16 backdrop-blur-3xl rounded-[2.5rem] space-y-12 shadow-2xl transition-all duration-500">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">How It Works</p>
                  <h4 className="text-xl font-bold uppercase tracking-tight">The 60-Day Program</h4>
                </div>
                <div className="bg-[#F3D7A7] text-black text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Live Classes</div>
              </div>
 
              <div className="space-y-8">
                <div className="h-[1px] w-full bg-white/5 relative">
                  <motion.div 
                    animate={{ left: ["0%", "100%", "0%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-1px] w-20 h-[3px] bg-[#F3D7A7] shadow-[0_0_15px_#F3D7A7]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-2 font-mono">Phase 01</p>
                    <p className="text-xs font-bold uppercase text-white/80">Learn the Fundamentals</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-2 font-mono">Phase 02</p>
                    <p className="text-xs font-bold uppercase text-white/80">Build your Offer & Brand</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-2 font-mono">Phase 03</p>
                    <p className="text-xs font-bold uppercase text-white/80">Land your First Clients</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-2 font-mono">Phase 04</p>
                    <p className="text-xs font-bold uppercase text-white/80">Scale & Systemize</p>
                  </div>
                </div>
              </div>

              <motion.button 
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => router.prefetch("/curriculum")}
                onClick={() => router.push("/curriculum")} 
                className="w-full py-5 bg-white text-black font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-[#F3D7A7] transition-all rounded-xl"
              >
                View Full Prospectus
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM PROTOCOL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-12 space-y-6 bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-[#F3D7A7]/20 rounded-3xl transition-all duration-500 group shadow-lg">
            <Zap className="text-[#F3D7A7] group-hover:scale-110 transition-transform" size={24} />
            <h5 className="text-sm font-bold uppercase tracking-widest">Live Mentorship</h5>
            <p className="text-xs leading-relaxed text-white/40 uppercase tracking-wider">All training is delivered live by active operators. You receive 1-on-1 feedback, strategic audits, and direct support to accelerate your career.</p>
          </div>
          <div className="p-12 space-y-6 bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-[#F3D7A7]/20 rounded-3xl transition-all duration-500 group shadow-lg">
            <Award className="text-[#F3D7A7] group-hover:scale-110 transition-transform" size={24} />
            <h5 className="text-sm font-bold uppercase tracking-widest">Placement Pipeline</h5>
            <p className="text-xs leading-relaxed text-white/40 uppercase tracking-wider">Every operator is positioned for paid internships, jobs, and contract opportunities within Blade Media and our partner companies, agencies, and global creators.</p>
          </div>
          <div className="p-12 space-y-6 bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 hover:border-[#F3D7A7]/20 rounded-3xl transition-all duration-500 group shadow-lg">
            <Lock className="text-[#F3D7A7] group-hover:scale-110 transition-transform" size={24} />
            <h5 className="text-sm font-bold uppercase tracking-widest">Operating Systems</h5>
            <p className="text-xs leading-relaxed text-white/40 uppercase tracking-wider">Get access to the proprietary templates and frameworks refined over 7 years of scaling brands—driving 2.5 Billion+ views and ₹3Cr+ in client revenue.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SprintProtocol;
