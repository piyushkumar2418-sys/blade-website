"use client";
import React from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const AgencyFooter = () => {
  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("info@blademedia.in");
    toast.success("Email copied to clipboard!");
    setTimeout(() => {
      window.location.href = "mailto:info@blademedia.in";
    }, 100);
  };

  return (
    <footer className="min-h-[60vh] flex flex-col justify-between items-center text-center px-6 py-20 relative z-20 bg-white">
      <div />
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-6xl md:text-[9vw] font-bold tracking-[-0.06em] uppercase mb-12 text-black text-center leading-none">Ready to scale?</h2>
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
      </div>
      <div className="flex flex-col items-center gap-4 text-center mt-20">
        <div className="flex flex-wrap justify-center gap-6 text-[9px] uppercase tracking-widest font-mono text-black/40">
          <a href="mailto:info@blademedia.in" onClick={handleEmailClick} className="hover:text-black transition-colors font-bold">Email</a>
          <a href="https://www.linkedin.com/in/piyush-kumar-96b064250/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors font-bold">LinkedIn</a>
          <a href="https://www.instagram.com/blade.media_/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors font-bold">Instagram</a>
        </div>
        <div className="text-[9px] uppercase tracking-[0.8em] font-bold text-black/20">© 2026 Blade</div>
      </div>
    </footer>
  );
};

export default AgencyFooter;
