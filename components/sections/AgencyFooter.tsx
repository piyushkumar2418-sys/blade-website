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
    <footer className="bg-black text-white border-t border-white/5 py-24 md:py-32 px-6 md:px-24 relative z-20">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-start">
        {/* Left Column */}
        <div className="md:col-span-7 flex flex-col text-left space-y-10">
          <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-[-0.05em] leading-none text-white text-left font-sans">
            Scale it once.<br />Dominate forever.
          </h2>
          
          <motion.a 
            whileHover={{ scale: 1.01 }} 
            whileTap={{ scale: 0.99 }}
            href="https://calendly.com/piyushkumar2418/30min" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full max-w-md px-8 py-6 bg-white text-black font-bold uppercase text-[10px] tracking-[0.2em] transition-all duration-300 hover:bg-[#F3D7A7]"
          >
            <span>Book a Discovery Call</span>
            <span className="text-sm">→</span>
          </motion.a>

          <div className="text-left">
            <span className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-bold block mb-1">New Business:</span>
            <a href="mailto:info@blademedia.in" onClick={handleEmailClick} className="text-[#F3D7A7] hover:text-white text-sm font-mono tracking-tight transition-colors">
              info@blademedia.in
            </a>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-5 grid grid-cols-2 gap-8 w-full md:pl-12">
          {/* Sub-column 1: Navigation */}
          <div className="flex flex-col gap-4 text-left font-sans text-[11px] uppercase tracking-[0.15em] font-bold text-white/50">
            <span className="text-white/20 text-[9px] tracking-[0.2em] font-bold mb-2">Navigation</span>
            <a href="#section_process" className="hover:text-white transition-colors">Process</a>
            <a href="#section_solutions" className="hover:text-white transition-colors">Solutions</a>
            <a href="#section_edits" className="hover:text-white transition-colors">Portfolio</a>
            <a href="/apply" className="hover:text-white transition-colors">Content School</a>
            <a href="https://calendly.com/piyushkumar2418/30min" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contact Us</a>
          </div>

          {/* Sub-column 2: Socials */}
          <div className="flex flex-col gap-4 text-left font-sans text-[11px] uppercase tracking-[0.15em] font-bold text-white/50">
            <span className="text-white/20 text-[9px] tracking-[0.2em] font-bold mb-2">Connect</span>
            <a href="https://www.instagram.com/blade.media_/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">Instagram <span className="text-[9px] opacity-60">↗</span></a>
            <a href="https://www.linkedin.com/in/piyush-kumar-96b064250/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">LinkedIn <span className="text-[9px] opacity-60">↗</span></a>
            <a href="mailto:info@blademedia.in" onClick={handleEmailClick} className="hover:text-white transition-colors flex items-center gap-1.5">Email <span className="text-[9px] opacity-60">↗</span></a>
          </div>

          {/* Bottom row: Location & Legal */}
          <div className="text-left text-white/40 text-[11px] mt-16 leading-relaxed font-sans uppercase tracking-wider">
            <span className="text-white/20 text-[9px] tracking-[0.2em] font-bold block mb-1">HQ</span>
            <span>New Delhi</span> <br />
            <span className="font-bold text-white/20 text-[10px] tracking-[0.2em]">India, Asia</span>
          </div>

          <div className="text-left text-white/40 text-[10px] mt-16 flex flex-col gap-2 font-bold uppercase tracking-[0.15em] font-sans">
            <span className="text-white/20 text-[9px] tracking-[0.2em] font-bold mb-1">Legal</span>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
      
      {/* Copyright row */}
      <div className="max-w-[1400px] mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] uppercase tracking-[0.6em] text-white/10 font-mono">
        <span>© 2026 Blade Media // Systematized Visual Dominance</span>
        <span>Institutional Access Only</span>
      </div>
    </footer>
  );
};

export default AgencyFooter;
