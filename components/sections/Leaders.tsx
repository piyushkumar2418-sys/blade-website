"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionLabel from "../SectionLabel";

const leadersData = [
  {
    name: "Purbali",
    shortRole: "Attention Psychology",
    role: "Head of Creative & Video Strategy",
    curriculumTitle: "Focus: Hook Engineering & Narrative",
    description: "Expert in copywriting, storyline framing, and attention retention workflows that have generated over 500M+ views collectively.",
    imageSrc: "/leaders/purbali.png",
    borderHighlight: "hover:border-[#FF1E82]/50",
    brands: [
      { name: "Nykaa", src: "/logos/nykaa_white.png" },
      { name: "Radio Mirchi", src: "/logos/mirchi_white.png" },
      { name: "Red Bull", src: "/logos/redbull.png" }
    ]
  },
  {
    name: "Akhil",
    shortRole: "Client Acquisition",
    role: "Co-Founder & Client Acquisition Lead",
    curriculumTitle: "Focus: Outbound Sales & SOPs",
    description: "Specializes in high-ticket outreach scripts, direct response negotiation, and onboarding workflows for creative agencies.",
    imageSrc: "/leaders/akhil.jpg",
    borderHighlight: "hover:border-[#FFC800]/50",
    brands: [
      { name: "Flipkart", src: "/logos/flipkart_user.png" },
      { name: "FamApp", src: "/logos/famapp.png" },
      { name: "Unacademy", src: "/logos/unacademy.png" }
    ]
  },
  {
    name: "Shweta",
    shortRole: "Operations & AI",
    role: "Head of AI Operations & Design",
    curriculumTitle: "Focus: Automations & AI Studio",
    description: "Expert in building custom automation templates, task boards, and integrating state-of-the-art generative AI production toolsets.",
    imageSrc: "/leaders/shweta.png",
    borderHighlight: "hover:border-[#8B5CF6]/50",
    brands: [
      { name: "Ogilvy", src: "/logos/ogilvy_white.png" },
      { name: "McCann", src: "/logos/mcann.png" },
      { name: "Koche", src: "/logos/koche_white.png" }
    ]
  }
];

const Leaders = () => {
  return (
    <section 
      className="py-32 px-6 md:px-24 bg-[#030303] relative overflow-hidden border-b border-white/5"
      style={{
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Background glows */}
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-gradient-to-tr from-[#F3D7A7]/10 to-[#8B5CF6]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[#F3D7A7]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="space-y-4 mb-20 text-left">
          <SectionLabel>The Instructors</SectionLabel>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-[-0.06em] leading-[0.85] text-left text-white">
            Learn from <br /> the Leaders.
          </h2>
          <p className="text-white/40 text-lg leading-relaxed max-w-xl font-light text-left pt-4">
            Direct mentorship from scaling practitioners who have built operations for top-tier global brands.
          </p>
        </div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {leadersData.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className={`flex flex-col bg-[#080808] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300 shadow-2xl p-4`}
            >
              {/* Reference-aligned Image Container with Overlay Badge & Logos */}
              <div className="relative aspect-[3/4] bg-[#0c0c0c] rounded-xl overflow-hidden group grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer">
                <Image 
                  src={leader.imageSrc} 
                  alt={leader.name} 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="w-full h-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]" 
                />
                
                {/* Dark vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 transition-opacity z-10" />

                {/* Bottom Overlay containing Name/Role Label & Brand Logos */}
                <div className="absolute bottom-5 left-5 z-20 flex flex-col gap-2.5">
                  
                  {/* Name | Role Label Pill */}
                  <div className="bg-black/95 px-3 py-1.5 border border-white/10 rounded-md text-[10px] font-bold text-white tracking-widest uppercase inline-flex items-center gap-1.5 select-none shadow-md">
                    <span>{leader.name}</span>
                    <span className="h-2.5 w-[1px] bg-white/25" />
                    <span className="text-[#FFC800]">{leader.shortRole}</span>
                  </div>

                  {/* Brand Logos Row */}
                  <div className="flex items-center gap-2 pl-0.5">
                    {leader.brands.map((brand) => (
                      <div 
                        key={brand.name} 
                        className="h-6 px-2 bg-white/5 border border-white/10 rounded flex items-center justify-center backdrop-blur-sm shadow-sm"
                        title={brand.name}
                      >
                        <img 
                          src={brand.src} 
                          alt={brand.name} 
                          className="h-3 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" 
                        />
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              {/* Description Card area below image */}
              <div className="pt-5 px-1 pb-1 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[#F3D7A7] select-none">
                    {leader.curriculumTitle}
                  </h4>
                  <p className="text-white/50 text-[11px] leading-relaxed font-light">
                    {leader.description}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-white/5 mt-4">
                  <span className="text-[9px] text-white/30 font-bold uppercase tracking-widest block">
                    {leader.role}
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leaders;
