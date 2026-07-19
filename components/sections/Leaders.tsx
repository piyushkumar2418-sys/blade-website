"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import SectionLabel from "../SectionLabel";

const leadersData = [
  {
    name: "Purbali",
    imageSrc: "/leaders/purbali.png"
  },
  {
    name: "Akhil",
    imageSrc: "/leaders/akhil.jpg"
  },
  {
    name: "Shweta",
    imageSrc: "/leaders/shweta.png"
  }
];

const Leaders = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % leadersData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + leadersData.length) % leadersData.length);
  };

  // Auto-play effect
  useEffect(() => {
    if (!isHovered) {
      autoPlayTimer.current = setInterval(() => {
        handleNext();
      }, 5000);
    }
    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [isHovered]);

  return (
    <section 
      className="py-24 px-6 md:px-24 bg-[#030303] relative overflow-hidden border-b border-white/5"
      style={{
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Background glows */}
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-gradient-to-tr from-[#F3D7A7]/10 to-[#8B5CF6]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[#F3D7A7]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="space-y-4 mb-16 text-left">
          <SectionLabel>The Instructors</SectionLabel>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-[-0.06em] leading-[0.85] text-left text-white">
            Learn from <br /> the Leaders.
          </h2>
        </div>

        {/* Premium Landscape Slider Container */}
        <div 
          className="relative max-w-6xl mx-auto aspect-[16/9] md:aspect-[2.1/1] w-full border border-white/5 rounded-2xl overflow-hidden bg-[#050505] shadow-2xl group cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Active slide display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full relative"
            >
              <Image
                src={leadersData[activeIndex].imageSrc}
                alt={leadersData[activeIndex].name}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="w-full h-full object-contain selection:bg-transparent"
              />
            </motion.div>
          </AnimatePresence>

          {/* Left Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer opacity-0 group-hover:opacity-100 duration-300 shadow-lg"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer opacity-0 group-hover:opacity-100 duration-300 shadow-lg"
            aria-label="Next Slide"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>

          {/* Pagination Indicators / Dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {leadersData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === activeIndex ? "bg-[#FFC800] w-6" : "bg-white/20 hover:bg-white/40 w-1.5"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leaders;
