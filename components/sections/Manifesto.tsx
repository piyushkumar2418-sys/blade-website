"use client";
import React from "react";

const Manifesto = () => {
  return (
    <section 
      className="py-64 px-6 md:px-24 bg-[#030303] relative overflow-hidden border-b border-white/5"
      style={{
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Premium organic glassmorphic gradient glows (matching Reference 2) */}
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-gradient-to-tr from-[#F3D7A7]/10 to-[#8B5CF6]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[#F3D7A7]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          
          {/* LEFT COLUMN: MANIFESTO TEXT */}
          <div className="lg:col-span-7 space-y-16 text-left">
            <div className="inline-flex items-center gap-4 text-left">
              <span className="text-[10px] font-bold tracking-[0.4em] text-white/30 uppercase text-left">Our Core Belief // 2026</span>
              <div className="h-[1px] w-12 bg-white/10" />
            </div>
            
            <h2 className="text-6xl md:text-[100px] font-bold uppercase tracking-tight leading-[0.85] text-white text-left">
              the <br/> architecture <br/> of <span className="font-serif italic font-normal text-[#F3D7A7] lowercase tracking-normal normal-case">results.</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/40 leading-relaxed font-light max-w-xl text-left">
              Learning just theories doesn&apos;t help you in the real world. We give you real tools that help you make real money.
            </p>
          </div>

          {/* RIGHT COLUMN: TECHNICAL SPECS */}
          <div className="lg:col-span-5 pt-20 lg:pt-48 space-y-8 relative z-10">
            <div className="space-y-4 p-8 border border-white/5 bg-white/[0.01] backdrop-blur-2xl rounded-2xl hover:border-white/10 transition-all duration-300">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#F3D7A7]">01 / Setup</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                We set up working business systems directly into your daily routine. We don&apos;t just share ideas; we give you the exact steps and scripts.
              </p>
            </div>
            <div className="space-y-4 p-8 border border-white/5 bg-white/[0.01] backdrop-blur-2xl rounded-2xl hover:border-white/10 transition-all duration-300">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#F3D7A7]">02 / Speed</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                We help you build a solid business that can grow fast without breaking down. Fast systems for big results.
              </p>
            </div>
            <div className="space-y-4 p-8 border border-white/5 bg-white/[0.01] backdrop-blur-2xl rounded-2xl hover:border-white/10 transition-all duration-300">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#F3D7A7]">03 / High Quality</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                You get the exact same high-quality methods that the top 0.1% of creators use to stay on top.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Manifesto;
