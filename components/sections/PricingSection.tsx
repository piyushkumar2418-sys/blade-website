"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Zap, Award } from "lucide-react";

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
      className="bg-[#050505] py-16 sm:py-28 px-4 sm:px-8 md:px-12 text-white relative overflow-hidden border-b border-white/5 selection:bg-[#F3D7A7] selection:text-black"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght=700&display=swap');
        .font-cursive {
          font-family: 'Dancing Script', cursive;
        }
      `}} />

      {/* Brand Ambient Glows - Gold & Subtle Warm Yellow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-[#FFC800]/6 to-[#F3D7A7]/4 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-[15%] w-[450px] h-[450px] bg-[#F3D7A7]/4 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 sm:mb-16 flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#F3D7A7] rounded-full animate-pulse" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-white/40">
              Investment & Access
            </span>
            <span className="w-1.5 h-1.5 bg-[#F3D7A7]/40 rounded-full" />
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tighter text-white leading-none select-none font-sans text-center">
            One Plan. <span className="font-cursive text-[#F3D7A7] font-normal lowercase tracking-normal mx-0.5 pr-0.5 inline-block transform -rotate-3" style={{ textTransform: 'none', textShadow: '0 0 12px rgba(243, 215, 167, 0.4)' }}>Everything Included.</span>
          </h2>
          <p className="text-white/50 text-xs md:text-sm font-normal leading-relaxed font-sans max-w-xl pt-3 sm:pt-4">
            No hidden fees. No upsells. Get the complete Blade Inner Circle experience at a fraction of its real value.
          </p>
        </motion.div>

        {/* 2-Column Grid Layout: Pricing Card + Shorter Scholarship Card */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start max-w-5xl mx-auto">
          
          {/* CARD 1: Main Pricing Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative flex flex-col justify-between"
          >
            {/* Popular badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-max">
              <div className="flex items-center gap-1.5 bg-[#F3D7A7] text-black px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(243,215,167,0.4)]">
                <Zap className="w-3.5 h-3.5 shrink-0" />
                Cohort 02 — Limited Seats
              </div>
            </div>

            {/* Card Content */}
            <div className="relative bg-white/[0.03] backdrop-blur-xl border border-[#F3D7A7]/25 rounded-3xl p-6 sm:p-9 shadow-[0_30px_80px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.04)] overflow-hidden flex flex-col justify-between h-full">
              {/* Corner glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#F3D7A7]/5 rounded-full blur-[60px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

              <div>
                {/* Plan Title */}
                <div className="text-center mb-6 relative z-10 pt-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white/90 tracking-tight font-sans mb-1">
                    Blade Inner Circle
                  </h3>
                  <p className="text-white/40 text-xs font-mono uppercase tracking-widest">
                    Complete Access Pass
                  </p>
                </div>

                {/* Pricing */}
                <div className="text-center mb-6 relative z-10">
                  <div className="flex items-center justify-center gap-2.5 mb-1.5">
                    <span className="text-white/30 text-base sm:text-lg font-medium line-through decoration-red-500/70 decoration-2">
                      ₹17,999
                    </span>
                    <span className="bg-red-500/15 text-red-400 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-red-500/20">
                      64% Off
                    </span>
                  </div>

                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-[#F3D7A7] text-4xl sm:text-6xl font-black tracking-tighter leading-none" style={{ textShadow: '0 0 25px rgba(243, 215, 167, 0.3)' }}>
                      ₹6,499
                    </span>
                  </div>
                  <p className="text-white/30 text-xs mt-2 font-mono">
                    One-time payment · No recurring charges
                  </p>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                {/* Features List */}
                <div className="space-y-3 mb-8 relative z-10">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-white/40 mb-3">
                    Everything you get
                  </p>
                  {featuresList.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 sm:gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#F3D7A7]/10 border border-[#F3D7A7]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#F3D7A7]" />
                      </div>
                      <span className="text-white/75 text-xs sm:text-sm leading-relaxed font-sans">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="relative z-10 pt-2">
                <motion.a
                  href="/apply/register"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center justify-center min-h-[48px] sm:min-h-[52px] w-full py-3.5 bg-[#F3D7A7] hover:bg-[#F5E2BD] text-black font-bold text-xs sm:text-sm uppercase tracking-wider text-center rounded-xl transition-all duration-200 shadow-[0_0_25px_rgba(243,215,167,0.35)] active:scale-95"
                >
                  Apply for Cohort 02 →
                </motion.a>
                <p className="text-center text-white/30 text-[10px] mt-3 font-mono">
                  Seats fill up fast — apply early to secure your spot
                </p>
              </div>
            </div>
          </motion.div>


          {/* CARD 2: Shorter & Sleek Scholarship Program Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex flex-col justify-between"
          >
            {/* Scholarship badge using brand gold #F3D7A7 */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-max">
              <div className="flex items-center gap-1.5 bg-[#F3D7A7] text-black px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(243,215,167,0.4)]">
                <Award className="w-3.5 h-3.5 shrink-0" />
                Upto 100% Scholarship
              </div>
            </div>

            {/* Compact Card Content */}
            <div className="relative bg-white/[0.03] backdrop-blur-xl border border-[#F3D7A7]/20 rounded-3xl p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.04)] overflow-hidden flex flex-col justify-between">
              {/* Corner glow */}
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#F3D7A7]/5 rounded-full blur-[50px] pointer-events-none translate-y-1/2 -translate-x-1/2" />

              <div>
                {/* Title */}
                <div className="text-center mb-4 relative z-10 pt-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white/90 tracking-tight font-sans mb-1">
                    Scholarship Program
                  </h3>
                  <p className="text-[#F3D7A7]/80 text-xs font-mono uppercase tracking-widest">
                    Financial Need & Merit Based
                  </p>
                </div>

                {/* Compact Content Paragraphs */}
                <div className="space-y-3.5 my-4 text-white/80 text-xs sm:text-sm leading-relaxed relative z-10 text-center">
                  <div className="p-3.5 rounded-2xl bg-[#F3D7A7]/10 border border-[#F3D7A7]/20">
                    <p className="font-bold text-[#F3D7A7] text-xs sm:text-sm">
                      100% scholarships are available for Cohort 02.
                    </p>
                  </div>
                  <p className="text-white/75 text-xs sm:text-sm">
                    We believe access to the right environment shouldn&apos;t depend only on your ability to pay. Scholarships are awarded selectively based on portfolio, potential, and financial need.
                  </p>
                  <p className="text-white/50 italic text-[11px] pt-1">
                    If you believe you belong in the Circle but the fee is a barrier, you can apply for a full scholarship.
                  </p>
                </div>
              </div>

              {/* CTA Button using brand outline / glass styling */}
              <div className="relative z-10 pt-2">
                <motion.a
                  href="/apply/register?scholarship=true"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center justify-center min-h-[46px] sm:min-h-[48px] w-full py-3 bg-white/10 hover:bg-[#F3D7A7] hover:text-black border border-[#F3D7A7]/30 text-white font-bold text-xs sm:text-sm uppercase tracking-wider text-center rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(243,215,167,0.15)] active:scale-95"
                >
                  Apply for Scholarship →
                </motion.a>
                <p className="text-center text-white/30 text-[10px] mt-2.5 font-mono">
                  Applications reviewed by admissions committee within 24h
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default PricingSection;





