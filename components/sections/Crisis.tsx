"use client";
import React from "react";
import SectionLabel from "../SectionLabel";

const Crisis = () => {
  return (
    <section className="pt-32 pb-8 px-6 md:px-24 bg-black text-white text-left">
      <div className="max-w-7xl mx-auto text-left">
        <SectionLabel light>The Industry Crisis</SectionLabel>
        <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tight leading-[0.85] mb-20 text-left">Most online content creators <br /> <span className="text-white/20">fail easily.</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
           <div className="space-y-8 p-12 border border-white/5 bg-white/[0.01] backdrop-blur-3xl rounded-3xl text-left hover:border-white/10 hover:bg-white/[0.02] hover:shadow-[0_0_50px_rgba(255,255,255,0.01)] transition-all duration-500">
              <h4 className="text-[#F3D7A7] text-sm font-bold uppercase tracking-widest text-left">The Beginner Mistakes</h4>
              <ul className="space-y-4 text-white/40 text-lg text-left">
                <li className="flex items-center gap-3 text-left"><span className="text-red-500/70">✕</span> Just guessing what will go viral</li>
                <li className="flex items-center gap-3 text-left"><span className="text-red-500/70">✕</span> Working long hours without smart tools</li>
                <li className="flex items-center gap-3 text-left"><span className="text-red-500/70">✕</span> Hoping the algorithm makes you lucky</li>
                <li className="flex items-center gap-3 text-left"><span className="text-red-500/70">✕</span> Selling cheap services that anyone can copy</li>
              </ul>
           </div>
           <div className="space-y-8 p-12 border border-[#F3D7A7]/10 bg-[#F3D7A7]/[0.01] backdrop-blur-3xl rounded-3xl text-left hover:border-[#F3D7A7]/30 hover:bg-[#F3D7A7]/[0.02] hover:shadow-[0_0_50px_rgba(243,215,167,0.04)] transition-all duration-500">
              <h4 className="text-[#F3D7A7] text-sm font-bold uppercase tracking-widest text-left">The Blade Way</h4>
              <ul className="space-y-4 text-[#F3D7A7]/80 text-lg text-left">
                <li className="flex items-center gap-3 text-left"><span className="text-[#F3D7A7]">✓</span> Real business systems that work</li>
                <li className="flex items-center gap-3 text-left"><span className="text-[#F3D7A7]">✓</span> Fast and organized ways of working</li>
                <li className="flex items-center gap-3 text-left"><span className="text-[#F3D7A7]">✓</span> Clear steps to get clients and views</li>
                <li className="flex items-center gap-3 text-left"><span className="text-[#F3D7A7]">✓</span> Charging high prices for your work</li>
              </ul>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Crisis;
