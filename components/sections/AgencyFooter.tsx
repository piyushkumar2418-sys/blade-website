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
        rel="noopener noreferrer"
        className="px-16 py-8 border border-black text-black rounded-full font-bold uppercase text-xs tracking-widest transition-all duration-500 hover:bg-black hover:text-white shadow-2xl"
      >
        book a discovery call
      </motion.a>
      <div className="absolute bottom-8 flex flex-col items-center gap-4 text-center">
        <div className="flex flex-wrap justify-center gap-6 text-[9px] uppercase tracking-widest font-mono text-black/40">
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors font-bold">YouTube</a>
          <a href="https://x.com/blademedia" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors font-bold">X</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors font-bold">LinkedIn</a>
          <a href="https://instagram.com/bladeinnercircle" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors font-bold">Instagram</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors font-bold">Facebook</a>
        </div>
        <div className="text-[9px] uppercase tracking-[0.8em] font-bold text-black/20">© 2026 Blade</div>
      </div>
    </footer>
  );
};

export default AgencyFooter;
