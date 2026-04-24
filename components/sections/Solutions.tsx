"use client";
import React from "react";
import { motion } from "framer-motion";
import { Rocket, TrendingUp, Award, Target } from "lucide-react";
import SectionLabel from "../SectionLabel";

const Solutions = () => {
  return (
    <section id="section_solutions" className="py-32 px-6 md:px-24 bg-black border-t border-white/5 relative z-20 overflow-hidden text-left">
      {/* 3D Depth Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F3D7A7]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10 text-left">
        <div className="mb-24 text-left">
          <SectionLabel light>Solutions</SectionLabel>
          <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tight leading-[0.85] text-white text-left">Strategic <br /><span className="text-[#F3D7A7]">Impact.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {[
            { 
              title: "Short-Form Mastery", 
              desc: "Engineered for retention. We ideate, script, and post-produce high-fidelity vertical content that commands attention across TikTok, Reels, and Shorts.",
              icon: <Rocket size={24} className="text-[#F3D7A7]" />
            },
            { 
              title: "High-Level Repurposing", 
              desc: "Building content flywheels. We deconstruct your long-form assets (Podcasts, Keynotes, Webinars) into a month's worth of distribution-ready highlights.",
              icon: <TrendingUp size={24} className="text-[#F3D7A7]" />
            },
            { 
              title: "Digital Assets", 
              desc: "Best-in-class launch videos, B2B trailers, and brand stories. We craft compelling visual narratives that build anticipation and drive conversions.",
              icon: <Award size={24} className="text-[#F3D7A7]" />
            },
            { 
              title: "Creative Direction", 
              desc: "Beyond editing. We become your remote brains, providing the strategic roadmap to ensure your content aligns with your premium positioning.",
              icon: <Target size={24} className="text-[#F3D7A7]" />
            }
          ].map((solution, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                rotateX: 1,
                rotateY: -1,
                transition: { duration: 0.3 }
              }}
              className="bg-white/[0.05] backdrop-blur-xl border border-white/10 p-12 md:p-16 space-y-8 rounded-3xl hover:border-[#F3D7A7]/50 hover:bg-white/[0.08] transition-all duration-500 group shadow-2xl text-left"
              style={{ perspective: "1000px" }}
            >
              <div className="p-5 bg-[#F3D7A7]/10 w-fit rounded-2xl border border-[#F3D7A7]/20 group-hover:bg-[#F3D7A7] transition-all duration-500 text-left">
                {React.cloneElement(solution.icon as React.ReactElement<{ className?: string }>, { 
                  className: "text-[#F3D7A7] group-hover:text-black transition-colors duration-500" 
                })}
              </div>
              <h3 className="text-3xl font-bold uppercase tracking-tight text-white group-hover:text-[#F3D7A7] transition-colors duration-300 text-left">{solution.title}</h3>
              <p className="text-white/70 leading-relaxed text-lg font-medium text-left">{solution.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
