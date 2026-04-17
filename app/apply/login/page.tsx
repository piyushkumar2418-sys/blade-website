"use client";
import React from "react";
import { motion } from "framer-motion";
import { Globe, Mail, ArrowRight } from "lucide-react"; // Changed Chrome to Globe

export default function EntryScreen() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#F3D7A7] flex flex-col items-center justify-center px-6">
      {/* Institution Logo/Name */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-black/40 block mb-4">Admission Portal</span>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">Blade Inner Circle</h1>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md space-y-4"
      >
        {/* Social Login */}
        <button className="w-full py-4 border border-black/10 rounded-sm flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-all duration-500 group">
          <Globe size={18} /> {/* Updated icon component here */}
          <span className="text-xs uppercase tracking-widest font-bold">Continue with Google</span>
        </button>

        <div className="flex items-center gap-4 py-4">
          <div className="h-[1px] flex-1 bg-black/5" />
          <span className="text-[10px] uppercase tracking-widest text-black/20 font-bold">Or use email</span>
          <div className="h-[1px] flex-1 bg-black/5" />
        </div>

        {/* Email Form */}
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Institutional Email"
            className="w-full bg-[#F9F9F9] border-none py-4 px-6 rounded-sm text-sm focus:ring-1 focus:ring-[#F3D7A7] outline-none transition-all"
          />
          <button 
            onClick={() => window.location.href = "/apply/form"}
            className="w-full py-4 bg-black text-white rounded-sm flex items-center justify-center gap-3 hover:bg-[#F3D7A7] hover:text-black transition-all duration-500 group"
          >
            <span className="text-xs uppercase tracking-widest font-bold">Request Access</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <p className="text-center text-[10px] text-black/40 uppercase tracking-widest mt-12 leading-relaxed">
          Entry is strictly limited to 10 architects per cohort.<br/> By continuing, you agree to our terms of vetting.
        </p>
      </motion.div>
    </div>
  );
}