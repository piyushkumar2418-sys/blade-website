"use client";

import React from "react";
import { motion } from "framer-motion";

const PricingSection = () => {
  return (
    <section className="relative w-full h-screen min-h-screen bg-[#f7f3eb] flex items-center justify-center p-0 m-0 border-0 overflow-hidden select-none">
      {/* Background Ribbon Pattern - Edge to Edge */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35 z-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/images/one-plan-waves.png')" }}
      />

      {/* Full Screen Single-View SVG Layout Container (No Side Borders) */}
      <div className="relative w-full h-full max-w-[1440px] aspect-[1440/810] max-h-screen mx-auto flex items-center justify-center p-0 m-0 z-10">
        
        {/* SVG Base Layout */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <img
            src="/images/one-plan-full.svg"
            alt="One Plan - Everything Included"
            className="w-full h-full object-contain pointer-events-none select-none"
          />

          {/* ANIMATION 1: Top Hero Banner Image Box */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              y: [0, -5, 0] 
            }}
            transition={{
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.6 }
            }}
            whileHover={{ scale: 1.01 }}
            className="absolute left-[16.0%] top-[0%] w-[68.0%] h-[40.0%] rounded-[3rem] cursor-pointer group pointer-events-auto border border-transparent hover:border-[#ff9bb3]/40 transition-all duration-300 shadow-none hover:shadow-[0_20px_50px_rgba(255,155,179,0.25)]"
          >
            {/* Ambient Top Image Hover Highlight */}
            <div className="w-full h-full rounded-[3rem] bg-gradient-to-tr from-[#ff9bb3]/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </motion.div>

          {/* ANIMATION 2: Left Pricing Box */}
          <motion.a
            href="/apply/payment"
            title="Confirm Seat - ₹6,499"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ y: -6, scale: 1.015 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute left-[14.3%] top-[43.3%] w-[37.2%] h-[46.8%] rounded-[2.5rem] cursor-pointer group pointer-events-auto border border-transparent hover:border-[#f3d7a7]/60 transition-all duration-300 shadow-none hover:shadow-[0_25px_60px_rgba(243,215,167,0.25)]"
          >
            <span className="sr-only">Confirm Seat - ₹6,499</span>
            {/* Ambient Gold Glow on Hover */}
            <div className="w-full h-full rounded-[2.5rem] bg-[#f3d7a7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.a>

          {/* ANIMATION 3: Right Scholarship Program Box */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ y: -6, scale: 1.015 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute left-[55.6%] top-[43.3%] w-[26.4%] h-[29.5%] rounded-[2.5rem] cursor-pointer group pointer-events-auto border border-transparent hover:border-[#ff9bb3]/60 transition-all duration-300 shadow-none hover:shadow-[0_25px_60px_rgba(255,155,179,0.25)]"
          >
            {/* Ambient Pink Glow on Hover */}
            <div className="w-full h-full rounded-[2.5rem] bg-[#ff9bb3]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.div>

          {/* ANIMATION 4: APPLY NOW! Pill Button */}
          <motion.a
            href="/apply/register"
            title="Apply for Cohort 02"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: [1, 1.04, 1] 
            }}
            transition={{
              scale: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
              opacity: { duration: 0.5 }
            }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-[62.2%] top-[79.7%] w-[13.1%] h-[7.0%] rounded-full cursor-pointer pointer-events-auto flex items-center justify-center border-2 border-transparent hover:border-white/60 transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)]"
          >
            <span className="sr-only">Apply Now</span>
          </motion.a>

        </div>
      </div>
    </section>
  );
};

export default PricingSection;



