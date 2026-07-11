"use client";
import React from "react";
import { motion } from "framer-motion";
import SectionLabel from "../SectionLabel";

const Testimonial = () => {
  return (
    <section className="py-32 px-6 md:px-24 bg-[#050505] border-t border-white/5 relative z-20 overflow-hidden text-left">
      {/* Subtle Glows */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#F3D7A7]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10 text-left">
        <SectionLabel light>Testimonial</SectionLabel>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 items-center text-left">
          <div className="lg:col-span-8 text-left">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-white/80 text-2xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight uppercase text-left font-sans"
            >
              &quot;Blade Media is the institutional engine behind our visual content. Their retention workflows and creative direction helped us scale our distribution to 2.5B+ views. Truly best-in-class.&quot;
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4 border-l border-white/10 lg:pl-12 py-4 text-left"
          >
            <h4 className="text-[#F3D7A7] text-xl font-bold uppercase tracking-tight text-left">Rohan Cariappa</h4>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-2 text-left">Founder & Host // Right Now With Rohan</p>
            <div className="h-[1px] bg-[#F3D7A7]/30 w-16 mt-6" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
