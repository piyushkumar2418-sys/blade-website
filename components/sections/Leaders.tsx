"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const leadersData = [
  {
    name: "Purbali",
    role: "Head of Creative & Video Strategy",
    focusLabel: "FOCUS MODULE",
    description: "Master Hook engineering, storyboarding, and video flow architecture designed to capture attention and scale organic distribution.",
    imageSrc: "/leaders/purbali.png",
    logoSrc: "/logos/nykaa_white.png",
    bgClass: "bg-[#1c122b]",
    imgBgClass: "bg-[#120b1c]",
    borderClass: "border-purple-500/10 hover:border-purple-500/20"
  },
  {
    name: "Akhil",
    role: "Co-Founder & Acquisition Lead",
    focusLabel: "FOCUS MODULE",
    description: "Build automated client outreach pipelines, high-ticket outbound sales scripts, and operational SOPs for delivery scaling.",
    imageSrc: "/leaders/akhil.jpg",
    logoSrc: "/logos/flipkart_user.png",
    bgClass: "bg-[#201c10]",
    imgBgClass: "bg-[#14120a]",
    borderClass: "border-amber-500/10 hover:border-amber-500/20"
  },
  {
    name: "Shweta",
    role: "Head of AI Operations & Design",
    focusLabel: "FOCUS MODULE",
    description: "Deploy state-of-the-art AI creative suites, custom workflow automations, and digital design dashboards to maximize output.",
    imageSrc: "/leaders/shweta.png",
    logoSrc: "/logos/ogilvy_white.png",
    bgClass: "bg-[#0c1a24]",
    imgBgClass: "bg-[#071017]",
    borderClass: "border-sky-500/10 hover:border-sky-500/20"
  }
];

const Leaders = () => {
  const router = useRouter();

  return (
    <section 
      className="py-32 px-6 md:px-24 bg-[#030303] relative overflow-hidden border-b border-white/5"
      style={{
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Background glows */}
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-gradient-to-tr from-[#F3D7A7]/5 to-[#8B5CF6]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[#F3D7A7]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT COLUMN: TITLE & CTA */}
          <div className="lg:col-span-4 space-y-8 text-left">
            <div className="space-y-4 text-left">
              <div className="inline-flex items-center gap-3">
                <span className="text-[10px] font-black tracking-[0.4em] text-white/30 uppercase">Mentorship</span>
                <div className="h-[1px] w-8 bg-white/10" />
              </div>
              <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight leading-[0.85] text-left text-white">
                Learn from <br /> the Leaders.
              </h2>
              <p className="text-white/40 text-sm leading-relaxed max-w-sm font-light text-left pt-2">
                Explore real-world case studies and workflow frameworks taught by our program participants and industry experts.
              </p>
            </div>

            <button
              onClick={() => router.push("/apply/register")}
              className="bg-[#D2F34C] hover:bg-[#E2FF66] text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all duration-300 active:scale-95 cursor-pointer shadow-lg shadow-[#D2F34C]/10"
            >
              <span>Explore More</span>
              <span className="text-sm font-bold">→</span>
            </button>
          </div>

          {/* RIGHT COLUMN: 2-SIDED HORIZONTAL CARDS */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-stretch">
            {leadersData.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`flex flex-col sm:flex-row h-auto sm:h-56 ${leader.bgClass} border ${leader.borderClass} rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group`}
              >
                
                {/* Left Side: Info (60% width on Desktop) */}
                <div className="w-full sm:w-[60%] p-6 flex flex-col justify-between items-start text-left h-full">
                  <div className="space-y-1 text-left">
                    <h3 className="text-white text-lg font-bold tracking-tight select-none">
                      {leader.name}
                    </h3>
                    <p className="text-[10px] text-white/50 tracking-wider uppercase font-semibold select-none">
                      {leader.role}
                    </p>
                  </div>

                  <div className="space-y-1.5 text-left my-4 sm:my-0">
                    <span className="text-[9px] font-black tracking-widest text-[#F3D7A7] uppercase select-none block">
                      {leader.focusLabel}
                    </span>
                    <p className="text-white/70 text-[11px] leading-relaxed font-light">
                      {leader.description}
                    </p>
                  </div>

                  {/* Brand Logo at Bottom Left */}
                  <div className="h-6 flex items-center justify-start select-none">
                    <img 
                      src={leader.logoSrc} 
                      alt="Brand Partner" 
                      className="h-3.5 w-auto object-contain opacity-60 group-hover:opacity-90 transition-opacity" 
                    />
                  </div>
                </div>

                {/* Right Side: Portrait Cutout (40% width on Desktop) */}
                <div className={`w-full sm:w-[40%] h-48 sm:h-full relative ${leader.imgBgClass} overflow-hidden`}>
                  <Image
                    src={leader.imageSrc}
                    alt={leader.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Subtle shadow transition between text and image */}
                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Leaders;
