"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionLabel from "../SectionLabel";

const leadersData = [
  {
    name: "Akhil",
    role: "Co-Founder & Client Acquisition Lead",
    description: "Specializes in building high-ticket client acquisition systems, outbound outreach strategies, and agency scale frameworks.",
    imageSrc: "/leaders/akhil.jpg",
    borderHighlight: "hover:border-[#FFC800]/50"
  },
  {
    name: "Purbali",
    role: "Head of Creative & Video Strategy",
    description: "Expert in storytelling, narrative architecture, and the viral attention psychology frameworks that drive massive organic reach.",
    imageSrc: "/leaders/purbali.png",
    borderHighlight: "hover:border-[#FF1E82]/50"
  },
  {
    name: "Shweta",
    role: "Head of AI Operations & Design",
    description: "Leads automated workflows, system setup, task-board architectures, and AI Creative Studio integration for content efficiency.",
    imageSrc: "/leaders/shweta.png",
    borderHighlight: "hover:border-[#8B5CF6]/50"
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
      {/* Background gradients */}
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-gradient-to-tr from-[#F3D7A7]/10 to-[#8B5CF6]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[#F3D7A7]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="space-y-4 mb-20 text-left">
          <SectionLabel>The Instructors</SectionLabel>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-[-0.06em] leading-[0.85] text-left text-white">
            Learn from <br /> the Leaders.
          </h2>
          <p className="text-white/40 text-lg leading-relaxed max-w-xl font-light text-left pt-4">
            Get direct mentorship from practitioners who live and breathe high-performance operations daily. No theorists allowed.
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
              className={`relative aspect-[3/4] bg-[#0a0a0a] overflow-hidden grayscale hover:grayscale-0 group border border-white/5 rounded-2xl transition-all duration-500 ${leader.borderHighlight} shadow-2xl`}
            >
              <Image 
                src={leader.imageSrc} 
                alt={leader.name} 
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]" 
              />
              
              {/* Dark vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95 z-10" />

              {/* Text Card overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="bg-black/90 p-5 border border-white/10 hover:border-white/20 flex flex-col text-left backdrop-blur-lg rounded-xl transition-all duration-300 shadow-xl">
                  <span className="text-white text-lg font-bold uppercase tracking-wide">
                    {leader.name}
                  </span>
                  <span className="text-[#F3D7A7] text-[10px] font-semibold uppercase tracking-widest mt-1 leading-none">
                    {leader.role}
                  </span>
                  <div className="h-[1px] w-full bg-white/15 my-3" />
                  <p className="text-white/50 text-[11px] leading-relaxed font-light">
                    {leader.description}
                  </p>
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
