"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionLabel from "../SectionLabel";

const leadersData = [
  {
    name: "Purbali Mukherjee",
    role: "Content lead | Creative Director",
    description: "Creative Director with experience across India's top agencies and brands. Gain first-hand insights into campaign strategy, brand storytelling, creative leadership, and the systems behind award-worthy marketing.",
    imageSrc: "/leaders/purbali.jpg",
    bgClass: "bg-[#1c122b]",
    imgBgClass: "bg-[#120b1c]",
    borderClass: "border-purple-500/10 hover:border-purple-500/20",
    brands: [
      { name: "SuperYou", src: "/logos/superyou.png" },
      { name: "Ogilvy", src: "/logos/ogilvy_white.png" }
    ]
  },
  {
    name: "Akhil Rajpal",
    role: "Brand Strategist | Graphic Designer",
    description: "Master the intersection of strategy and design. Learn how branding, visual storytelling, and creative direction come together to build brands that stand out, connect with audiences, and leave a lasting impression.",
    imageSrc: "/leaders/akhil.jpg",
    bgClass: "bg-[#201c10]",
    imgBgClass: "bg-[#14120a]",
    borderClass: "border-amber-500/10 hover:border-amber-500/20",
    brands: [
      { name: "The Ranveer Show", src: "/logos/ranveer.jpg" },
      { name: "Flipkart", src: "/logos/flipkart_user.png" }
    ]
  },
  {
    name: "Shweta Kukreja",
    role: "Founder & CEO | Brand Strategist",
    description: "Master the art of building a founder-first brand. Discover how high-performing founders position themselves, grow their audience, and turn content into a long-term business asset through proven personal branding systems.",
    imageSrc: "/leaders/shweta.jpg",
    bgClass: "bg-[#0c1a24]",
    imgBgClass: "bg-[#071017]",
    borderClass: "border-sky-500/10 hover:border-sky-500/20",
    brands: [
      { name: "Notion", src: "/logos/notion-logo.png" },
      { name: "Slack", src: "/logos/slack-logo.png" }
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
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-gradient-to-tr from-[#F3D7A7]/5 to-[#8B5CF6]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[#F3D7A7]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER SECTION (Centered & On Top) */}
        <div className="space-y-4 mb-20 text-center max-w-2xl mx-auto">
          <SectionLabel>Mentorship</SectionLabel>
          <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight leading-none text-white text-center">
            Learn from the Leaders.
          </h2>
          <p className="text-white/40 text-sm leading-relaxed font-light text-center pt-2">
            Direct training and campaign case studies led by our cohort instructors.
          </p>
        </div>

        {/* CENTERED CARDS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-stretch justify-center">
          {leadersData.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`flex flex-col sm:flex-row h-auto sm:h-[250px] ${leader.bgClass} border ${leader.borderClass} rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group`}
            >
              
              {/* Left Side: Info (60% width on Desktop) */}
              <div className="w-full sm:w-[60%] p-6 flex flex-col justify-between items-start text-left h-full">
                
                {/* Title & Name Swapped (Title on Top, Name Below) */}
                <div className="space-y-1 text-left">
                  <p className="text-[9px] text-[#F3D7A7]/70 tracking-widest uppercase font-bold select-none">
                    {leader.role}
                  </p>
                  <h3 className="text-white text-base font-bold tracking-tight select-none">
                    {leader.name}
                  </h3>
                </div>

                {/* Description (No Focus Mode title label) */}
                <div className="my-4 sm:my-0 text-left">
                  <p className="text-white/60 text-[10px] leading-relaxed font-light">
                    {leader.description}
                  </p>
                </div>

                {/* Brand Logos at Bottom Left */}
                <div className="flex items-center gap-3 select-none h-6">
                  {leader.brands.map((brand) => (
                    <div 
                      key={brand.name} 
                      className="h-6 px-1.5 bg-white/5 border border-white/10 rounded flex items-center justify-center backdrop-blur-sm shadow-sm"
                      title={brand.name}
                    >
                      <img 
                        src={brand.src} 
                        alt={brand.name} 
                        className="h-3 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity" 
                      />
                    </div>
                  ))}
                </div>

              </div>

              {/* Right Side: Portrait Cutout (40% width on Desktop) */}
              <div className={`w-full sm:w-[40%] h-48 sm:h-full relative ${leader.imgBgClass} overflow-hidden`}>
                <Image
                  src={leader.imageSrc}
                  alt={leader.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 15vw"
                  className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                />
                {/* Subtle shadow transition between text and image */}
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Leaders;
