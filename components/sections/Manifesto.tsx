"use client";
import React from "react";

const Manifesto = () => {
  return (
    <section className="py-64 px-6 md:px-24 bg-[#030303] relative overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          
          {/* LEFT COLUMN: MANIFESTO */}
          <div className="lg:col-span-7 space-y-16">
            <div className="inline-flex items-center gap-4">
              <span className="text-[10px] font-bold tracking-[0.4em] text-white/30 uppercase">Our Core Belief // 2026</span>
              <div className="h-[1px] w-12 bg-white/10" />
            </div>
            
            <h2 className="text-7xl md:text-[130px] font-medium tracking-tight leading-[0.8] text-white">
              The <br/> Architecture <br/> of <span className="font-serif italic text-white/10">Results.</span>
            </h2>
            
            <p className="text-2xl md:text-3xl text-white/40 leading-relaxed font-light max-w-xl">
              Learning just theories doesn&apos;t help you in the real world. We give you real tools that help you make real money.
            </p>
          </div>

          {/* RIGHT COLUMN: TECHNICAL SPECS */}
          <div className="lg:col-span-5 pt-20 lg:pt-48 space-y-20">
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#F3D7A7]">01 / Setup</h4>
              <p className="text-sm text-white/55 leading-relaxed max-w-sm">
                We set up working business systems directly into your daily routine. We don&apos;t just share ideas; we give you the exact steps and scripts.
              </p>
            </div>
            <div className="space-y-6 border-t border-white/5 pt-12">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#F3D7A7]">02 / Speed</h4>
              <p className="text-sm text-white/55 leading-relaxed max-w-sm">
                We help you build a solid business that can grow fast without breaking down. Fast systems for big results.
              </p>
            </div>
            <div className="space-y-6 border-t border-white/5 pt-12">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#F3D7A7]">03 / High Quality</h4>
              <p className="text-sm text-white/55 leading-relaxed max-w-sm">
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
