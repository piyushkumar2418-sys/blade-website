"use client";
import React from "react";

const Manifesto = () => {
  return (
    <section className="py-64 px-6 md:px-24 bg-white relative overflow-hidden border-b border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          
          {/* LEFT COLUMN: MANIFESTO */}
          <div className="lg:col-span-7 space-y-16">
            <div className="inline-flex items-center gap-4">
              <span className="text-[10px] font-bold tracking-[0.4em] text-black/30 uppercase">Institutional Thesis // 2026</span>
              <div className="h-[1px] w-12 bg-black/10" />
            </div>
            
            <h2 className="text-7xl md:text-[130px] font-medium tracking-tight leading-[0.8] text-black">
              The <br/> Architecture <br/> of <span className="font-serif italic text-black/10">Results.</span>
            </h2>
            
            <p className="text-2xl md:text-3xl text-black/40 leading-relaxed font-light max-w-xl">
              Theoretical knowledge is a liability in high-velocity markets. We deploy infrastructure that produces tangible extraction.
            </p>
          </div>

          {/* RIGHT COLUMN: TECHNICAL SPECS */}
          <div className="lg:col-span-5 pt-20 lg:pt-48 space-y-20">
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">01 / Deployment</h4>
              <p className="text-sm text-black/50 leading-relaxed max-w-sm">
                Direct integration of operational systems into your existing workflow. We don&apos;t share ideas; we deploy code and protocol.
              </p>
            </div>
            <div className="space-y-6 border-t border-black/5 pt-12">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">02 / Velocity</h4>
              <p className="text-sm text-black/50 leading-relaxed max-w-sm">
                Infrastructure built to sustain exponential growth without operational collapse. High-velocity systems for high-ticket results.
              </p>
            </div>
            <div className="space-y-6 border-t border-black/5 pt-12">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">03 / Elite Output</h4>
              <p className="text-sm text-black/50 leading-relaxed max-w-sm">
                Access to the same institutional-grade standards used by the top 0.1% to dominate the creator economy.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Manifesto;
