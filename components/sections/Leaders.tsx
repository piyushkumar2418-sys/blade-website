"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const leadersData = [
  {
    name: "Purbali Mukherjee",
    role: "Content lead | Creative Director",
    description: "Creative Director with experience across India's top agencies and brands. Gain first-hand insights into campaign strategy, brand storytelling, creative leadership, and the systems behind award-worthy marketing.",
    imageSrc: "/leaders/purbali.jpg",
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
    brands: [
      { name: "Notion", src: "/logos/notion-logo.png" },
      { name: "Slack", src: "/logos/slack-logo.png" }
    ]
  }
];

const Leaders = () => {
  return (
    <section 
      className="py-20 px-6 md:px-24 bg-[#050505] text-white relative overflow-hidden border-b border-white/5"
      style={{
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Cursive Font & Glassy metallic styling with bright yellowish golden */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght=700&display=swap');
        
        .font-cursive {
          font-family: 'Dancing Script', cursive;
        }

        .glassy-card-leader {
          background: rgba(10, 10, 12, 0.45);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.09);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.03);
        }

        .glassy-card-leader:hover {
          border-color: rgba(255, 200, 0, 0.35);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.45), 0 0 25px rgba(255, 200, 0, 0.1);
        }
      `}} />

      {/* Background glows */}
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-gradient-to-tr from-[#FFC800]/5 to-[#8B5CF6]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[#FFC800]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER SECTION (Centered & On Top) */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#FFC800] rounded-full animate-pulse" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-white/40">Mentorship</span>
            <span className="w-1.5 h-1.5 bg-[#FFC800]/40 rounded-full" />
          </div>
          
          <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tighter text-white leading-none select-none font-sans text-center whitespace-nowrap">
            Meet the <span className="font-cursive text-[#FFC800] font-normal lowercase tracking-normal mx-0.5 pr-0.5 inline-block transform -rotate-3" style={{ textTransform: 'none', textShadow: '0 0 10px rgba(255, 200, 0, 0.4)' }}>minds</span> Behind Modern Brands.
          </h2>
          <p className="text-white/60 text-xs md:text-sm font-normal leading-relaxed font-sans max-w-2xl mx-auto text-center pt-3">
            Go beyond theory with sessions led by founders, creative directors, strategists, and marketers working at the forefront of the industry.
          </p>
        </div>

        {/* CENTERED CARDS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full items-stretch justify-center">
          {leadersData.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex flex-col sm:flex-row h-auto sm:h-[280px] glassy-card-leader rounded-2xl overflow-hidden transition-all duration-300 group"
            >
              
              {/* Left Side: Info (60% width on Desktop) */}
              <div className="w-full sm:w-[60%] p-6 md:p-8 flex flex-col justify-between items-start text-left h-full">
                
                {/* Name Above in sans-serif title style, Role below it in Helvetica and White */}
                <div className="space-y-1 text-left">
                  <h3 className="text-white text-xl font-bold tracking-tight select-none font-sans leading-none">
                    {leader.name}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] font-['Helvetica',_sans-serif] font-normal text-white uppercase tracking-wider select-none leading-normal">
                    {leader.role}
                  </p>
                </div>

                {/* Description */}
                <div className="my-4 sm:my-0 text-left">
                  <p className="text-white/60 text-xs font-normal leading-relaxed font-sans">
                    {leader.description}
                  </p>
                </div>

                {/* Brand Logos at Bottom Left */}
                <div className="flex items-center gap-3 select-none h-6">
                  {leader.brands.map((brand) => (
                    <div 
                      key={brand.name} 
                      className="h-6 px-2 bg-white/5 border border-white/10 rounded flex items-center justify-center backdrop-blur-sm shadow-sm"
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
              <div className="w-full sm:w-[40%] h-56 sm:h-full relative overflow-hidden bg-black/20">
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
