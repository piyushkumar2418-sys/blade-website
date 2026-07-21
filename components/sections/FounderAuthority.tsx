"use client";
import React from "react";
import { motion } from "framer-motion";

const FounderAuthority = () => {
  const benefits = [
    {
      num: "01",
      title: "Build Your Agency",
      description: "We help you build your own agency right from naming it to getting your first client through our networks. You get access to the SOPs, systems, templates, and frameworks that we use at Blade which you can use for yourself.",
      tag: "Blade SOPs & Templates"
    },
    {
      num: "02",
      title: "300+ Freelance Projects",
      description: "Gain direct access to our private, curated database of over 300+ freelance projects. Gigs range from budget-friendly content edits to high-ticket brand consulting campaigns, with budgets from ₹20k to ₹1 Lakh per project.",
      tag: "₹20k - ₹1L / Project"
    },
    {
      num: "03",
      title: "Placement Program",
      description: "Get direct corporate placements. We are connected directly with the best marketing agencies, media houses, and creator-led startup companies who actively hire directly from our member pool.",
      tag: "Direct Agency Hires"
    },
    {
      num: "04",
      title: "45-Day Content Challenge",
      description: "If you want to create content, we help you with it by taking care of your editing part. Challenge yourself to build your personal brand while having direct, streamlined access to Blade's professional video editors to cut your videos.",
      tag: "Blade Editors Access"
    }
  ];

  return (
    <section className="bg-black py-32 px-6 md:px-24 lg:px-32 text-white relative overflow-hidden border-b border-white/5 z-20">
      
      {/* Subtle Ambient Radial Light (Very faint, singular, centered to keep it clean) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#FFC800]/2 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Asymmetrical 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* ========================================================
              LEFT COLUMN (40%): STATIC EDITORIAL HEADLINE
             ======================================================== */}
          <div className="lg:col-span-5 text-left space-y-6 lg:sticky lg:top-32">
            <span className="text-[10px] font-mono tracking-[0.35em] text-[#FFC800] uppercase block">
              Member Ecosystem
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight text-white leading-[1.05] font-sans">
              What we <br />offer.
            </h2>
            <p className="text-white/50 text-sm md:text-base leading-relaxed font-sans max-w-sm pt-2">
              We don&apos;t just teach skills. We provide the complete infrastructure, active project databases, placement channels, and execution resources to scale your career.
            </p>
          </div>

          {/* ========================================================
              RIGHT COLUMN (60%): CUSTOM EDITORIAL ROW LIST
             ======================================================== */}
          <div className="lg:col-span-7 w-full text-left">
            <div className="divide-y divide-white/10 border-t border-b border-white/10">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.num}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="py-8 md:py-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start justify-between group hover:bg-white/[0.01] px-4 -mx-4 rounded-xl transition-all duration-300"
                >
                  {/* Left: Number */}
                  <div className="font-mono text-xs md:text-sm text-[#FFC800] tracking-wider font-bold pt-1">
                    {benefit.num}
                  </div>

                  {/* Middle: Details */}
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white font-sans">
                      {benefit.title}
                    </h3>
                    <p className="text-white/60 text-xs md:text-sm leading-relaxed font-sans max-w-xl">
                      {benefit.description}
                    </p>
                  </div>

                  {/* Right: Premium tag status */}
                  <div className="pt-1.5 md:pt-1 text-right">
                    <span className="font-mono text-[9px] tracking-wider text-white/30 uppercase border border-white/10 rounded-full px-3 py-1 bg-white/[0.02]">
                      {benefit.tag}
                    </span>
                  </div>

                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FounderAuthority;
