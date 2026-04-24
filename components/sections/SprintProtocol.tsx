"use client";
import React from "react";
import { motion } from "framer-motion";
import { Zap, Award, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

const SprintProtocol = () => {
  const router = useRouter();
  
  return (
    <section className="py-40 px-6 md:px-24 bg-[#050505] text-white overflow-hidden relative">
      {/* DATA OVERLAY GRID */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#F3D7A7 1px, transparent 1px), linear-gradient(90deg, #F3D7A7 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-6 mb-16">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 bg-[#F3D7A7] rounded-full animate-pulse" />
            <div className="w-1.5 h-1.5 bg-[#F3D7A7]/40 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#F3D7A7]/20 rounded-full" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-[#F3D7A7]">Institutional Protocol v2.6</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="space-y-10">
            <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-[0.8] mb-8">
              Master the <br/> <span className="text-white/20">Market DNA.</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed max-w-lg font-light">
              The Inner Circle is a 60-day operational sprint designed to transition you from a spectator to a high-value operator.
            </p>
            
            <div className="flex flex-wrap gap-8 pt-8">
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#F3D7A7]">Mode of Delivery</p>
                <p className="text-sm font-bold uppercase">Google Meet / Zoom (Live)</p>
              </div>
              <div className="w-[1px] h-10 bg-white/10 hidden md:block" />
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#F3D7A7]">Outcome Standard</p>
                <p className="text-sm font-bold uppercase">Guaranteed Placement</p>
              </div>
            </div>
          </div>

          {/* INTERACTIVE 3D STATUS CARD */}
          <motion.div 
            initial={{ rotateY: 20, rotateX: 10 }}
            whileHover={{ rotateY: 0, rotateX: 0 }}
            className="relative group cursor-crosshair"
          >
            <div className="absolute inset-0 bg-[#F3D7A7]/20 blur-[100px] rounded-full group-hover:bg-[#F3D7A7]/40 transition-colors" />
            <div className="relative bg-black/40 border border-white/10 p-12 md:p-16 backdrop-blur-3xl rounded-[2rem] space-y-12 shadow-2xl">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Active System</p>
                  <h4 className="text-xl font-bold uppercase tracking-tight">The 60-Day Sprint</h4>
                </div>
                <div className="bg-[#F3D7A7] text-black text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Live Operations</div>
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
                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-2">Phase 01</p>
                    <p className="text-xs font-bold uppercase text-white/80">Skill Moat Built</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-2">Phase 02</p>
                    <p className="text-xs font-bold uppercase text-white/80">Infra Deployed</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-2">Phase 03</p>
                    <p className="text-xs font-bold uppercase text-white/80">Revenue Extraction</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-2">Phase 04</p>
                    <p className="text-xs font-bold uppercase text-white/80">System Scaling</p>
                  </div>
                </div>
              </div>

              <motion.button 
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => router.prefetch("/curriculum")}
                onClick={() => router.push("/curriculum")} 
                className="w-full py-5 bg-white text-black font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-[#F3D7A7] transition-all"
              >
                Analyze Full Prospectus
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM PROTOCOL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
          <div className="p-12 space-y-6 hover:bg-white/[0.02] transition-colors group">
            <Zap className="text-[#F3D7A7] group-hover:scale-110 transition-transform" size={24} />
            <h5 className="text-sm font-bold uppercase tracking-widest">Direct Access</h5>
            <p className="text-xs leading-relaxed text-white/40 uppercase tracking-wider">All sessions are live via Google Meet. Direct line to instructors for 1:1 strategy correction.</p>
          </div>
          <div className="p-12 space-y-6 hover:bg-white/[0.02] transition-colors group border-x border-white/5">
            <Award className="text-[#F3D7A7] group-hover:scale-110 transition-transform" size={24} />
            <h5 className="text-sm font-bold uppercase tracking-widest">Verified Pipeline</h5>
            <p className="text-xs leading-relaxed text-white/40 uppercase tracking-wider">Guaranteed placement for high-performing operators within the Blade Media network.</p>
          </div>
          <div className="p-12 space-y-6 hover:bg-white/[0.02] transition-colors group">
            <Lock className="text-[#F3D7A7] group-hover:scale-110 transition-transform" size={24} />
            <h5 className="text-sm font-bold uppercase tracking-widest">Proprietary SOPs</h5>
            <p className="text-xs leading-relaxed text-white/40 uppercase tracking-wider">Unlock the exact systems used to generate 2.5B+ views and ₹3Cr+ in market capital.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SprintProtocol;
