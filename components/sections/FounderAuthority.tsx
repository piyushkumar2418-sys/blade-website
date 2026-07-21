"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const FounderAuthority = () => {
  const [activeId, setActiveId] = useState("piyush");

  const instructors = [
    {
      id: "piyush",
      name: "Piyush",
      role: "Founder of Blade Media",
      label: "BLADE MEDIA",
      image: "/leaders/founder.jpeg",
    },
    {
      id: "purbali",
      name: "Purbali Mukherjee",
      role: "Content Lead",
      label: "CREATIVE LEAD",
      image: "/leaders/purbali.jpg",
    },
    {
      id: "akhil",
      name: "Akhil Rajpal",
      role: "Graphic Designer",
      label: "BRAND STRATEGIST",
      image: "/leaders/akhil.jpg",
    },
    {
      id: "shweta",
      name: "Shweta Kukreja",
      role: "CEO & Brand Strategist",
      label: "CEO FOUNDER",
      image: "/leaders/shweta.jpg",
    }
  ];

  return (
    <section 
      className="bg-[#030303] py-24 px-6 md:px-24 text-white relative overflow-hidden border-b border-white/5"
      style={{
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    >
      {/* Background glow effects */}
      <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-gradient-to-tr from-[#FFC800]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-gradient-to-bl from-[#FFC800]/5 to-transparent rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* ========================================================
              LEFT COLUMN: EDITORIAL DESCRIPTION & CTA
             ======================================================== */}
          <div className="lg:col-span-5 text-left space-y-8">
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05] font-sans">
              The MBA <br />of Tomorrow
            </h2>

            {/* User Description - Applied EXACTLY */}
            <p className="text-white/70 text-sm md:text-base leading-relaxed font-sans max-w-lg">
              Before there was a curriculum, there were campaigns. Before there were lectures, there were client calls, edits at 2 a.m., failed experiments, and projects that taught us what actually works. Blade Inner Circle is simply a structured version of everything those years taught us.
            </p>

            {/* Bullet tags with dots */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[9px] text-white/50 uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#d4ff3a] rounded-full" /> ONLINE
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#d4ff3a] rounded-full" /> SELF-PACED
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#d4ff3a] rounded-full" /> CERTIFICATE
              </span>
            </div>

            {/* Neon Yellow Action Button */}
            <div className="pt-2">
              <button className="bg-[#d4ff3a] hover:bg-[#c2eb30] text-black font-sans font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 shadow-[0_10px_20px_rgba(212,255,58,0.15)]">
                Discover All Programs
              </button>
            </div>

          </div>

          {/* ========================================================
              RIGHT COLUMN: INTERACTIVE ACCORDION CARDS
             ======================================================== */}
          <div className="lg:col-span-7 w-full flex items-center justify-center">
            <div className="flex gap-3 md:gap-4 h-[380px] md:h-[440px] w-full select-none">
              {instructors.map((instructor) => {
                const isExpanded = activeId === instructor.id;

                return (
                  <div
                    key={instructor.id}
                    onClick={() => setActiveId(instructor.id)}
                    className={`relative h-full overflow-hidden rounded-2xl cursor-pointer border border-white/10 transition-all duration-500 ease-in-out ${
                      isExpanded ? "flex-[2.5] md:flex-[3]" : "flex-[0.7] md:flex-[0.9]"
                    }`}
                  >
                    <Image
                      src={instructor.image}
                      alt={instructor.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                      className="object-cover object-top transition-all duration-500"
                      priority={instructor.id === "piyush"}
                    />
                    
                    {/* Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                    {/* Text Details Overlay */}
                    <div className="absolute bottom-6 left-6 right-4 text-left text-white select-none">
                      <AnimatePresence mode="wait">
                        {isExpanded ? (
                          <motion.div
                            key="expanded"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-1"
                          >
                            <span className="text-[9px] font-mono tracking-widest text-[#d4ff3a] uppercase block">
                              {instructor.label}
                            </span>
                            <span className="text-[10px] text-white/50 font-sans block">
                              {instructor.role}
                            </span>
                            <span className="text-lg md:text-xl font-bold tracking-tight text-white block mt-1">
                              {instructor.name}
                            </span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="collapsed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.7 }}
                            exit={{ opacity: 0 }}
                            className="space-y-0.5"
                          >
                            <span className="text-[8px] font-mono tracking-wider text-white/40 uppercase block truncate">
                              {instructor.label.split(" ")[0]}
                            </span>
                            <span className="text-xs font-bold tracking-tight text-white block truncate">
                              {instructor.name.split(" ")[0]}
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FounderAuthority;
