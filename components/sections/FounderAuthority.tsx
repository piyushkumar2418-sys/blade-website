"use client";
import React from "react";
import { motion } from "framer-motion";
import { FolderGit2, Briefcase, Handshake, Video } from "lucide-react";

const FounderAuthority = () => {
  const benefits = [
    {
      num: "01",
      title: "Build Your Own Agency",
      description: "We help you build your own agency right from naming it to getting you your first client through our networks. You get access to the SOPs, systems, templates, and materials that we use at Blade which you can use for yourself.",
      icon: <FolderGit2 className="w-6 h-6" />
    },
    {
      num: "02",
      title: "300+ Freelance Projects",
      description: "Gain access to 300+ freelance projects ranging from 20k/project to 1 lakh/project. Apply directly and earn while you learn through our curated contract pipeline.",
      icon: <Briefcase className="w-6 h-6" />
    },
    {
      num: "03",
      title: "Placement Program",
      description: "Get direct corporate placements. We are connected directly with the best agencies and companies who hire from us, offering direct interview pathways for our members.",
      icon: <Handshake className="w-6 h-6" />
    },
    {
      num: "04",
      title: "45-Day Content Challenge",
      description: "If you want to create content, we help you with it by taking care of your editing part with access to Blade's editors to cut and polish your content.",
      icon: <Video className="w-6 h-6" />
    }
  ];

  return (
    <section 
      className="bg-black py-32 px-6 md:px-24 text-white relative overflow-hidden border-b border-white/5 z-20"
      style={{
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    >
      
      {/* Abstract Blue Ink Smoke Background Effect (Inspired by Reference) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-blue-600/15 to-sky-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Centered Section Header */}
        <div className="mb-20 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#FFC800] rounded-full animate-pulse" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-white/40">Member Ecosystem</span>
            <span className="w-1.5 h-1.5 bg-[#FFC800]/40 rounded-full" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none font-sans">
            What We Offer <span className="text-[#FFC800]">Our Members.</span>
          </h2>
          <p className="text-white/50 text-xs md:text-sm font-normal leading-relaxed font-sans max-w-xl pt-4">
            We don&apos;t just teach skills. We provide the complete infrastructure, active project databases, placement channels, and execution resources to scale.
          </p>
        </div>

        {/* Infographic Stack (Timeline & Glassmorphic Cards) */}
        <div className="relative space-y-6">
          
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 md:left-12 top-6 bottom-6 w-[2px] bg-gradient-to-b from-blue-500/10 via-blue-500/60 to-blue-500/10 pointer-events-none" />

          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-20 md:pl-28 p-6 md:p-8 bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-300 flex flex-col sm:flex-row sm:items-center gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
            >
              
              {/* Timeline Glow Node */}
              <div className="absolute left-8 md:left-12 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-black shadow-[0_0_15px_rgba(59,130,246,0.8)] z-20 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute left-8 md:left-12 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-blue-500/20 blur-sm pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon Box */}
              <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/80 shadow-inner flex-shrink-0">
                {benefit.icon}
              </div>

              {/* Number Index */}
              <div className="text-3xl md:text-4xl font-extrabold text-white/90 tracking-tight font-sans flex-shrink-0">
                {benefit.num}
              </div>

              {/* Content Description */}
              <div className="space-y-1.5 text-left flex-1">
                <h3 className="text-lg md:text-xl font-bold tracking-tight text-white font-sans">
                  {benefit.title}
                </h3>
                <p className="text-white/60 text-xs md:text-sm leading-relaxed max-w-xl">
                  {benefit.description}
                </p>
              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default FounderAuthority;
