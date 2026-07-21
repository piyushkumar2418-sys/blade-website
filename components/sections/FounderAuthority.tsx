"use client";
import React from "react";
import { motion } from "framer-motion";
import { Briefcase, ArrowUpRight, FolderGit2, Video, Layers } from "lucide-react";

const FounderAuthority = () => {
  return (
    <section 
      className="bg-[#050505] py-28 px-6 md:px-24 text-white relative overflow-hidden border-b border-white/5 z-20"
      style={{
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      
      {/* Background ambient lighting */}
      <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-gradient-to-tr from-[#FFC800]/5 to-[#8B5CF6]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-[#FFC800]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 flex flex-col items-start text-left max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#FFC800] rounded-full animate-pulse" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-white/40">Member Ecosystem</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none select-none font-sans">
            What You Get Inside <span className="text-[#FFC800]">The Circle.</span>
          </h2>
          <p className="text-white/60 text-xs md:text-sm font-normal leading-relaxed font-sans pt-4">
            We don&apos;t just teach theory. We equip our members with the exact resources, networks, client pipelines, and video editing resources needed to scale.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-stretch">
          
          {/* ========================================================
              CARD 1 (7 Columns): BUILD YOUR OWN AGENCY
             ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-7 bg-zinc-950/40 border border-white/5 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 group shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-[320px]"
          >
            {/* Subtle glow */}
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#FFC800]/5 rounded-full blur-2xl group-hover:bg-[#FFC800]/10 transition-colors pointer-events-none" />

            <div className="space-y-4 relative z-10 text-left">
              <div className="w-10 h-10 bg-[#FFC800]/10 border border-[#FFC800]/20 rounded-xl flex items-center justify-center text-[#FFC800]">
                <FolderGit2 size={20} />
              </div>
              
              <h3 className="text-2xl font-bold tracking-tight text-white font-sans">
                Build Your Own Agency
              </h3>
              
              <p className="text-white/70 text-[13px] md:text-sm leading-relaxed font-sans max-w-xl">
                We help you build your own agency right from naming it to getting you your first client through our networks. You get access to the SOPs, systems, templates, and frameworks that we use at Blade which you can use for yourself.
              </p>
            </div>

            {/* Micro details wireframe preview at bottom */}
            <div className="mt-8 border-t border-white/5 pt-4 flex justify-between items-center text-[10px] font-mono text-white/30 uppercase tracking-wider relative z-10 w-full">
              <span>SOP_VAULT_V2.1 // ACTIVE</span>
              <span className="flex items-center gap-1 text-[#FFC800]">BLADE_SYSTEMS <ArrowUpRight size={10} /></span>
            </div>
          </motion.div>

          {/* ========================================================
              CARD 2 (5 Columns): FREELANCE PROJECTS PIPELINE
             ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-5 bg-zinc-950/40 border border-white/5 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 group shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-[320px]"
          >
            <div className="absolute -left-16 -bottom-16 w-44 h-44 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors pointer-events-none" />

            <div className="space-y-4 relative z-10 text-left">
              <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center text-purple-400">
                <Briefcase size={20} />
              </div>
              
              <h3 className="text-2xl font-bold tracking-tight text-white font-sans">
                300+ Freelance Projects
              </h3>
              
              <p className="text-white/70 text-[13px] md:text-sm leading-relaxed font-sans">
                Gain direct access to our private, curated database of over 300+ freelance projects. Gigs range from budget-friendly content edits to high-ticket brand consulting campaigns.
              </p>
            </div>

            {/* Budget Chips visualizer */}
            <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4 w-full relative z-10">
              <div className="flex gap-2">
                <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono text-white/80">
                  ₹20K / Project
                </span>
                <span className="bg-[#FFC800]/10 border border-[#FFC800]/20 px-3 py-1 rounded-full text-[10px] font-mono text-[#FFC800] font-bold">
                  ₹1 Lakh Max
                </span>
              </div>
              <span className="text-[10px] font-mono text-white/30">PROJECTS_ACTIVE</span>
            </div>
          </motion.div>

          {/* ========================================================
              CARD 3 (5 Columns): PLACEMENT PROGRAM
             ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-5 bg-zinc-950/40 border border-white/5 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 group shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-[320px]"
          >
            <div className="absolute -right-16 -bottom-16 w-44 h-44 bg-sky-500/5 rounded-full blur-2xl group-hover:bg-sky-500/10 transition-colors pointer-events-none" />

            <div className="space-y-4 relative z-10 text-left">
              <div className="w-10 h-10 bg-sky-500/10 border border-sky-500/20 rounded-xl flex items-center justify-center text-sky-400">
                <Layers size={20} />
              </div>
              
              <h3 className="text-2xl font-bold tracking-tight text-white font-sans">
                Placement Program
              </h3>
              
              <p className="text-white/70 text-[13px] md:text-sm leading-relaxed font-sans">
                Get direct corporate placements. We are connected directly with the best marketing agencies, media houses, and creator-led startup companies who actively hire from our member pool.
              </p>
            </div>

            {/* Hiring status label */}
            <div className="mt-8 border-t border-white/5 pt-4 flex justify-between items-center text-[10px] font-mono text-white/30 uppercase tracking-wider relative z-10 w-full">
              <span>HIRE_PARTNERS: 40+ ACTIVE</span>
              <span className="text-green-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> OPEN
              </span>
            </div>
          </motion.div>

          {/* ========================================================
              CARD 4 (7 Columns): 45-DAY CONTENT CHALLENGE
             ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -4 }}
            className="lg:col-span-7 bg-zinc-950/40 border border-white/5 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 group shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-[320px]"
          >
            <div className="absolute -left-16 -top-16 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />

            <div className="space-y-4 relative z-10 text-left">
              <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                <Video size={20} />
              </div>
              
              <h3 className="text-2xl font-bold tracking-tight text-white font-sans">
                45-Day Content Challenge
              </h3>
              
              <p className="text-white/70 text-[13px] md:text-sm leading-relaxed font-sans max-w-xl">
                If you want to create content, we help you with it by taking care of your editing part. Challenge yourself to build your personal brand while having direct, streamlined access to Blade&apos;s professional video editors to cut your videos.
              </p>
            </div>

            {/* Video timeline visualizer element */}
            <div className="mt-8 border-t border-white/5 pt-4 flex justify-between items-center text-[10px] font-mono text-white/30 uppercase tracking-wider relative z-10 w-full">
              <span>EDIT_OPS_ACTIVE // PIPELINE</span>
              <span className="flex gap-1 h-3 items-center">
                <span className="w-6 bg-[#FFC800]/40 rounded-sm h-full" />
                <span className="w-10 bg-purple-500/40 rounded-sm h-full" />
                <span className="w-8 bg-sky-500/40 rounded-sm h-full" />
              </span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default FounderAuthority;
