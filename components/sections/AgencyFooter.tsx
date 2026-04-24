"use client";
import React from "react";
import { motion } from "framer-motion";

const AgencyFooter = () => {
  return (
    <footer className="h-[50vh] flex flex-col justify-center items-center text-center px-6 relative z-20 bg-white">
      <h2 className="text-6xl md:text-[9vw] font-bold tracking-[-0.06em] uppercase mb-16 text-black text-center">Ready to scale?</h2>
      <motion.a 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
        href="https://calendly.com/piyushkumar2418/30min" 
        target="_blank" 
        className="px-16 py-8 border border-black text-black rounded-full font-bold uppercase text-xs tracking-widest transition-all duration-500 hover:bg-black hover:text-white shadow-2xl"
      >
        book a discovery call
      </motion.a>
      <div className="absolute bottom-10 text-[9px] uppercase tracking-[0.8em] font-bold text-center text-black/20">© 2026 Blade</div>
    </footer>
  );
};

export default AgencyFooter;
