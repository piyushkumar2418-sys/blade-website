"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";

const featuresList = [
  "Access to weekly live classes with industry experts",
  "Access to 300+ paid freelance gigs (₹20K–₹1L per project)",
  "Access to a community of creators and founders",
  "Placement opportunities at top media companies & agencies",
  "Access to our SOPs and growth systems built over the last 7 years",
  "1-on-1 portfolio reviews and career mentorship sessions",
  "Lifetime access to recorded sessions and resource library",
  "45-day content challenge with Blade's editing support",
];

const PricingSection = () => {
  return (
    <section
      className="bg-[#050505] py-8 sm:py-32 px-3 sm:px-8 md:px-16 lg:px-20 text-white relative overflow-hidden border-b border-white/5"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght=700&display=swap');
        .font-cursive {
          font-family: 'Dancing Script', cursive;
        }
      `}} />

      {/* Background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#FFC800]/6 to-[#8B5CF6]/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-[#FFC800]/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-4 sm:mb-14 flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-2 mb-1.5 sm:mb-3">
            <span className="w-1.5 h-1.5 bg-[#FFC800] rounded-full animate-pulse" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-white/40">
              Investment
            </span>
            <span className="w-1.5 h-1.5 bg-[#FFC800]/40 rounded-full" />
          </div>

          <h2 className="text-xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tighter text-white leading-none select-none font-sans text-center">
            One Plan. <span className="font-cursive text-[#F3D7A7] font-normal lowercase tracking-normal mx-0.5 pr-0.5 inline-block transform -rotate-3" style={{ textTransform: 'none', textShadow: '0 0 10px rgba(243, 215, 167, 0.4)' }}>Everything Included.</span>
          </h2>
          <p className="hidden sm:block text-white/50 text-xs md:text-sm font-normal leading-relaxed font-sans max-w-xl pt-4">
            No hidden fees. No upsells. Get the complete Blade Inner Circle experience at a fraction of its real value.
          </p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-auto max-w-xl"
        >
          {/* Popular badge */}
          <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 z-20">
            <div className="flex items-center gap-1.5 bg-[#FFC800] text-black px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[11px] font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,200,0,0.4)]">
              <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              Cohort 02 — Limited Seats
            </div>
          </div>

          {/* Card */}
          <div className="relative bg-white/[0.03] backdrop-blur-xl border border-[#FFC800]/20 rounded-2xl sm:rounded-3xl p-3.5 sm:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.04)] overflow-hidden">
            {/* Subtle corner glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFC800]/5 rounded-full blur-[60px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

            {/* Plan Title */}
            <div className="text-center mb-3 sm:mb-8 relative z-10">
              <h3 className="text-base sm:text-xl font-bold text-white/90 tracking-tight font-sans mb-0.5">
                Blade Inner Circle
              </h3>
              <p className="text-white/40 text-[9px] sm:text-xs font-mono uppercase tracking-widest">
                Complete Access Pass
              </p>
            </div>

            {/* Pricing */}
            <div className="text-center mb-3 sm:mb-8 relative z-10">
              {/* Struck-through original price */}
              <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
                <span className="text-white/30 text-base sm:text-xl font-medium line-through decoration-red-500/70 decoration-2">
                  ₹17,999
                </span>
                <span className="bg-red-500/15 text-red-400 text-[9px] sm:text-xs font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider border border-red-500/20">
                  64% Off
                </span>
              </div>

              {/* Actual price */}
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-[#FFC800] text-3xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-none" style={{ textShadow: '0 0 30px rgba(255, 200, 0, 0.3)' }}>
                  ₹6,499
                </span>
              </div>
              <p className="text-white/30 text-[9px] sm:text-xs mt-1 sm:mt-2 font-mono">
                One-time payment · No recurring charges
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-3 sm:mb-8" />

            {/* Features List */}
            <div className="space-y-1.5 sm:space-y-3.5 mb-3 sm:mb-8 relative z-10">
              <p className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-white/40 mb-2 sm:mb-4">
                Everything you get
              </p>
              {featuresList.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.06 }}
                  className="flex items-start gap-2 sm:gap-3"
                >
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FFC800]/10 border border-[#FFC800]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#FFC800]" />
                  </div>
                  <span className="text-white/70 text-[11px] sm:text-sm leading-tight sm:leading-relaxed font-sans">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.a
              href="/apply/register"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center justify-center min-h-[44px] sm:min-h-[52px] w-full py-2.5 sm:py-4 bg-[#FFC800] hover:bg-[#FFD54F] text-black font-bold text-xs sm:text-base uppercase tracking-wider text-center rounded-xl transition-all duration-200 shadow-[0_0_25px_rgba(255,200,0,0.3)] active:scale-95 relative z-10"
            >
              Apply for Cohort 02 →
            </motion.a>

            <p className="text-center text-white/25 text-[9px] sm:text-[10px] mt-2 sm:mt-4 font-mono">
              Seats fill up fast — apply early to secure your spot
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
