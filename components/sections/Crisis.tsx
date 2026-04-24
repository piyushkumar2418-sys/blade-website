"use client";
import React from "react";
import SectionLabel from "../SectionLabel";

const Crisis = () => {
  return (
    <section className="py-32 px-6 md:px-24 bg-black text-white text-left">
      <div className="max-w-7xl mx-auto text-left">
        <SectionLabel light>The Industry Crisis</SectionLabel>
        <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tight leading-[0.85] mb-20 text-left">The creator economy <br /> <span className="text-white/20">is built on sand.</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
           <div className="space-y-8 p-12 border border-white/10 bg-white/5 rounded-2xl text-left">
              <h4 className="text-[#F3D7A7] text-sm font-bold uppercase tracking-widest text-left">The Amateur Trap</h4>
              <ul className="space-y-4 text-white/40 text-lg text-left">
                <li className="flex items-center gap-3 text-left"><span className="text-red-500">✕</span> Guessing what works</li>
                <li className="flex items-center gap-3 text-left"><span className="text-red-500">✕</span> Zero leverage in workflow</li>
                <li className="flex items-center gap-3 text-left"><span className="text-red-500">✕</span> Relying on algorithm luck</li>
                <li className="flex items-center gap-3 text-left"><span className="text-red-500">✕</span> Low-ticket, commodity mindset</li>
              </ul>
           </div>
           <div className="space-y-8 p-12 border border-[#F3D7A7]/30 bg-[#F3D7A7]/5 rounded-2xl text-left">
              <h4 className="text-[#F3D7A7] text-sm font-bold uppercase tracking-widest text-left">The Blade Protocol</h4>
              <ul className="space-y-4 text-[#F3D7A7] text-lg text-left">
                <li className="flex items-center gap-3 text-left"><span className="text-green-500">✓</span> Institutional systems</li>
                <li className="flex items-center gap-3 text-left"><span className="text-green-500">✓</span> High-velocity infrastructure</li>
                <li className="flex items-center gap-3 text-left"><span className="text-green-500">✓</span> Predictable growth mechanics</li>
                <li className="flex items-center gap-3 text-left"><span className="text-green-500">✓</span> High-ticket capital extraction</li>
              </ul>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Crisis;
