"use client";
import React, { useRef } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const Philosophy = () => {
  const philosophyLeftRef = useRef(null);
  
  return (
    <section className="min-h-screen py-32 px-6 md:px-24 border-t border-white/5 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start max-w-[1440px] mx-auto text-left">
        <div className="md:sticky md:top-32" ref={philosophyLeftRef}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12 text-left">
            <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold text-left">The Visionary</span>
            <h2 className="text-5xl md:text-8xl font-bold leading-[0.85] tracking-[-0.06em] uppercase text-white mb-16 text-left">Systematized <br/> Visual <br/> Dominance.</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <p className="text-white/70 text-xl md:text-2xl lg:text-3xl font-medium leading-[1.4] tracking-tight text-left">
              <span className="text-white font-bold">Blade</span> exists in a space where consistency matters more than claims. Delivered content that holds value as audiences evolve.
            </p>
            <div className="h-[1px] bg-[#F3D7A7]/40 mt-12 w-24" />
          </motion.div>
        </div>
        <div className="max-w-xs md:max-w-md ml-auto text-left group">
          <div className="relative aspect-[4/5] w-full mb-10 overflow-hidden bg-black border border-white/10 shadow-2xl">
            {/* Main Image */}
            <Image 
              src="/piyush.png" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
              alt="Piyush" 
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              priority={false}
            />
            
            {/* Founder Label */}
            <div className="absolute bottom-6 left-6 z-20">
              <div className="bg-black/80 backdrop-blur-md px-6 py-3 border border-white/20 flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F3D7A7] animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-[11px] text-white font-bold uppercase tracking-[0.2em]">Piyush</span>
                  <span className="text-[9px] text-[#F3D7A7] font-medium uppercase tracking-[0.1em]">Founder- Blade Media</span>
                </div>
              </div>
            </div>

            {/* Gradient Overlay for better label readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
          <p className="text-white/60 text-lg font-light leading-relaxed text-left">&quot;We decoded content through an early obsession. Mastering the silent mechanics of distribution.&quot;</p>
          <div className="text-[#F3D7A7] text-2xl font-bold mt-8 text-left">— Piyush</div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
