"use client";
import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Binary } from "lucide-react";
import Image from "next/image";
import SectionLabel from "../SectionLabel";

const FounderAuthority = () => {
  return (
    <section className="bg-white py-32 px-6 md:px-24 text-black text-left border-b border-black/5">
      <div className="flex flex-col md:flex-row items-center gap-20 md:gap-32 mb-28 text-left">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="w-full md:w-1/2 text-left">
          <div className="relative aspect-[4/5] bg-[#F9F9F9] overflow-hidden grayscale group border border-black/5 text-left">
            <Image 
                src="/piyush.png" 
                alt="Founder" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 text-left" 
            />
            <div className="absolute bottom-8 left-8 z-20 text-left">
              <div className="bg-black px-6 py-3 border border-[#F3D7A7]/30 flex flex-col text-left">
                <span className="text-white text-[11px] font-bold uppercase tracking-[0.2em] text-left">Piyush</span>
                <span className="text-[#F3D7A7] text-[9px] font-medium uppercase tracking-[0.1em] text-left">Founder- Blade Media</span>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="w-full md:w-1/2 text-left">
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-10 text-left">
            <div className="text-left">
              <SectionLabel>Founding Methodology</SectionLabel>
              <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-[-0.06em] leading-[0.85] text-left">The Practitioner’s <br /> Ledger.</h2>
            </div>
            <p className="text-black/60 text-xl leading-relaxed max-w-lg font-light text-left">Blade Inner Circle is the distilled output of 5 years of market execution. We don&apos;t teach what we think — we teach what we have proven at scale.</p>
            
            <div className="grid grid-cols-2 gap-6 mt-12 text-left">
               <div className="p-6 border border-black/5 bg-[#F9F9F9] space-y-2 text-left">
                  <BarChart3 size={20} className="text-[#F3D7A7] text-left" />
                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-black/40 text-left">Market Reach</h5>
                  <p className="text-xl font-bold text-left">2.5B+ Views</p>
               </div>
               <div className="p-6 border border-black/5 bg-[#F9F9F9] space-y-2 text-left">
                  <Binary size={20} className="text-[#F3D7A7] text-left" />
                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-black/40 text-left">Capital Extraction</h5>
                  <p className="text-xl font-bold text-left">₹3Cr+ Built</p>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderAuthority;
