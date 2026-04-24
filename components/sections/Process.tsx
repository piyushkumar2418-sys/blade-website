"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const Process = () => {
  return (
    <section id="section_process" className="py-32 px-6 md:px-24 border-t border-white/5 relative z-20">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12 text-left">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold text-left">The Blade System</span>
            <h2 className="text-5xl md:text-8xl font-bold leading-[0.85] tracking-[-0.06em] uppercase text-white text-left">
              How we<br/>operate.
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="max-w-sm text-left">
            <p className="text-white/40 text-lg leading-relaxed text-left">
              We become your remote content engine. You focus on your brand — we handle everything from raw footage to distribution-ready assets.
            </p>
            <div className="mt-8 inline-flex items-center gap-4 px-6 py-3 border border-[#F3D7A7]/30 rounded-full">
              <div className="w-2 h-2 rounded-full bg-[#F3D7A7] animate-pulse" />
              <span className="text-[#F3D7A7] font-bold uppercase tracking-widest text-[10px]">90–120 Videos / Month</span>
            </div>
          </motion.div>
        </div>

        {/* Steps Grid */}
        <div className="relative text-left">
          {/* 3D Background Glows */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#F3D7A7]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#F3D7A7]/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 text-left">
            {[
              { num: "01", title: "Onboard & Audit", desc: "We decode your existing content, audience data, and brand positioning. A full teardown before we build.", time: "Week 1–2" },
              { num: "02", title: "Build The System", desc: "Content frameworks, editorial calendars, style guides. We engineer the repeatable machine before we touch the timeline.", time: "Week 2–3" },
              { num: "03", title: "High-Velocity Output", desc: "90–120 production-ready assets per month. Short-form, long-form, platform-native. Your brand, everywhere.", time: "Ongoing" },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                whileHover={{ 
                  y: -10,
                  rotateX: 2,
                  rotateY: -2,
                  transition: { duration: 0.3 }
                }}
                className="p-10 md:p-12 group bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-2xl hover:border-[#F3D7A7]/50 hover:bg-white/[0.08] transition-all duration-500 shadow-2xl relative overflow-hidden text-left"
                style={{ perspective: "1000px" }}
              >
                {/* 3D Inner Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F3D7A7]/5 rounded-full blur-3xl group-hover:bg-[#F3D7A7]/10 transition-colors duration-700" />
                
                <div className="text-[80px] leading-none font-bold text-[#F3D7A7]/20 group-hover:text-[#F3D7A7]/40 transition-colors duration-700 mb-8 select-none tracking-tighter italic text-left">
                  {step.num}
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-6 group-hover:text-[#F3D7A7] transition-colors duration-300 text-left">
                  {step.title}
                </h3>
                <p className="text-white/70 text-base leading-relaxed mb-12 font-medium text-left">
                  {step.desc}
                </p>
                <div className="pt-8 border-t border-white/10 text-left">
                  <span className="text-[#F3D7A7] text-[11px] font-bold uppercase tracking-[0.4em] px-4 py-2 bg-white/5 rounded-full border border-white/5">
                    {step.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team + Big Number */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative text-left">
          {/* 3D Depth Orb behind Stat */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-[#F3D7A7]/10 rounded-full blur-[100px] pointer-events-none z-0" />
          
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative z-10 text-left">
            <span className="text-[#F3D7A7] text-[11px] uppercase tracking-[0.4em] font-bold block mb-10 pl-2 border-l-2 border-[#F3D7A7] text-left">Your Dedicated Remote Team</span>
            <div className="grid grid-cols-2 gap-4 text-left">
              {['Senior Editors', 'Content Strategists', 'Motion Designers', 'Script Writers', 'Project Managers', 'QA Reviewers'].map((role, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(243, 215, 167, 0.05)" }}
                  className="flex items-center gap-4 px-6 py-5 bg-white/[0.03] backdrop-blur-md border border-white/[0.08] hover:border-[#F3D7A7]/40 transition-all duration-300 group rounded-xl text-left"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F3D7A7]/30 group-hover:bg-[#F3D7A7] group-hover:shadow-[0_0_8px_#F3D7A7] transition-all duration-300" />
                  <span className="text-white/60 group-hover:text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300">{role}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-right relative z-10">
            <div className="relative inline-block">
              <div className="text-[90px] md:text-[140px] font-bold leading-none tracking-[-0.06em] text-white drop-shadow-[0_10px_30px_rgba(243,215,167,0.15)] text-right">
                10,000<span className="text-[#F3D7A7]">+</span>
              </div>
              <div className="absolute -inset-4 bg-[#F3D7A7]/5 blur-2xl rounded-full -z-10 animate-pulse" />
            </div>
            <p className="text-white/60 text-[12px] md:text-[14px] uppercase tracking-[0.6em] font-bold mt-4 pr-2 text-right">Videos Produced</p>
            
            <motion.a
              href="https://calendly.com/piyushkumar2418/30min"
              target="_blank"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 40px rgba(243, 215, 167, 0.2)"
              }}
              className="inline-flex items-center gap-4 mt-16 px-12 py-6 bg-transparent border border-[#F3D7A7]/50 text-[#F3D7A7] rounded-full font-bold uppercase text-[11px] tracking-[0.3em] hover:bg-[#F3D7A7] hover:text-black hover:border-[#F3D7A7] transition-all duration-500 shadow-xl"
            >
              book a discovery call <ArrowUpRight size={16} />
            </motion.a>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Process;
