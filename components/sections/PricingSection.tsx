"use client";

import React from "react";
import { motion } from "framer-motion";

const PricingSection = () => {
  return (
    <section className="relative w-full min-h-screen md:h-screen bg-[#050505] flex items-center justify-center py-4 sm:py-8 px-2 sm:px-6 overflow-hidden border-b border-white/5 selection:bg-[#d9b465] selection:text-black">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#FFC800]/5 via-[#ff9bb3]/5 to-[#8B5CF6]/3 rounded-full blur-[160px] pointer-events-none" />

      {/* Single Screen 1:1 SVG Layout Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-[1440px] aspect-[1440/810] max-h-[calc(100vh-2.5rem)] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.6)] border border-white/10 flex items-center justify-center bg-black"
      >
        {/* Render Original SVG Design File untouched */}
        <img
          src="/images/one-plan-full.svg"
          alt="One Plan - Everything Included"
          className="w-full h-full object-contain pointer-events-none select-none"
        />

        {/* Interactive Hotspot: APPLY NOW! Button */}
        <a
          href="/apply/register"
          title="Apply for Cohort 02"
          className="absolute left-[61%] top-[73%] w-[16%] h-[11%] rounded-full bg-white/0 hover:bg-white/10 transition-all duration-200 border border-transparent hover:border-white/30 cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center justify-center"
        >
          <span className="sr-only">Apply Now</span>
        </a>

        {/* Interactive Hotspot: Pricing Card */}
        <a
          href="/apply/payment"
          title="Confirm Seat - ₹6,499"
          className="absolute left-[17%] top-[43%] w-[38%] h-[50%] rounded-[2.5rem] bg-white/0 hover:bg-white/[0.03] transition-all duration-200 border border-transparent hover:border-white/20 cursor-pointer"
        >
          <span className="sr-only">Confirm Seat - ₹6,499</span>
        </a>
      </motion.div>
    </section>
  );
};

export default PricingSection;


