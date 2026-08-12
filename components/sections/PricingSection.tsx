"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const planBenefits = [
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
    <section className="bg-[#f7f3eb] text-black py-16 sm:py-24 px-4 sm:px-6 md:px-10 relative overflow-hidden border-b border-black/10">
      {/* Abstract Ribbon Wave Background Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 z-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/images/one-plan-waves.png')" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto space-y-10 md:space-y-12">
        {/* Top Hero Banner - Matching ONE PLAN SVG */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative w-full rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden border border-black/15 shadow-[0_25px_60px_rgba(0,0,0,0.18)] bg-black"
        >
          <div className="relative w-full aspect-[16/9] min-h-[360px] sm:min-h-[440px] md:min-h-[500px]">
            {/* Surreal Retro Artwork Image */}
            <img
              src="/images/one-plan-hero.jpg"
              alt="Blade Cohort 02 One Plan"
              className="w-full h-full object-cover object-center"
            />
            {/* Vignette Contrast Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/50" />

            {/* Top-Left Banner Text */}
            <div className="absolute top-6 sm:top-10 left-6 sm:left-10 z-10">
              <h2
                className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-[#ff9bb3] font-sans"
                style={{ textShadow: "0 4px 20px rgba(0,0,0,0.9)" }}
              >
                COHORT 02
              </h2>
            </div>

            {/* Bottom-Left Banner Text */}
            <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 z-10">
              <p className="text-[#e3c788] text-xs sm:text-base md:text-lg font-semibold tracking-[0.35em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                SEPTEMBER 2026
              </p>
            </div>

            {/* Top-Right Banner Text */}
            <div className="absolute top-6 sm:top-10 right-6 sm:right-10 z-10 text-right">
              <h2
                className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-[#ff9bb3] font-sans"
                style={{ textShadow: "0 4px 20px rgba(0,0,0,0.9)" }}
              >
                ONE PLAN
              </h2>
              <p className="text-[#e3c788] text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                A 2 MONTH PROGRAM
              </p>
            </div>

            {/* Bottom-Right Banner Text */}
            <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 z-10 text-right">
              <p className="text-[#e3c788] text-xs sm:text-base md:text-lg font-semibold tracking-[0.35em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                UPTO 100% SCHOLARSHIP
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section: Two Main Cards Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
        >
          {/* Left Card: Main Pricing Card */}
          <div className="bg-[#2a2b2e]/95 backdrop-blur-xl border border-white/15 rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-10 text-white shadow-[0_30px_70px_rgba(0,0,0,0.3)] flex flex-col justify-between relative overflow-hidden">
            {/* Corner Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d9b465]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

            <div>
              {/* Price Display */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight text-white font-sans">
                    ₹6,499
                  </span>
                </div>
                <p className="text-white/60 text-xs sm:text-sm font-medium mt-3 tracking-wide">
                  One-time payment · No recurring charges
                </p>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-white/10 my-6" />

              {/* Bullet Benefits List */}
              <div className="space-y-4 mb-4">
                {planBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f3d7a7] shrink-0 mt-2 shadow-[0_0_10px_rgba(243,215,167,0.8)]" />
                    <span className="text-white/90 text-sm sm:text-base font-normal leading-relaxed">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Card: Scholarship Program Card */}
          <div className="bg-[#2a2b2e]/95 backdrop-blur-xl border border-white/15 rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-10 text-white shadow-[0_30px_70px_rgba(0,0,0,0.3)] flex flex-col justify-between relative overflow-hidden">
            {/* Corner Glow */}
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff9bb3]/10 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2" />

            <div>
              {/* Card Header */}
              <div className="text-center mb-8 pb-4 border-b border-white/10">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wider text-white font-sans">
                  SCHOLARSHIP PROGRAM
                </h3>
              </div>

              {/* Text Description */}
              <div className="text-center text-white/85 text-sm sm:text-base leading-relaxed space-y-6 max-w-md mx-auto py-4">
                <p className="font-semibold text-white">
                  100% scholarships are available for Cohort 02.
                </p>
                <p>
                  We believe access to the right environment shouldn&apos;t depend only on your ability to pay.
                </p>
                <p>
                  Scholarships are awarded selectively based on portfolio, potential, and financial need.
                </p>
                <p className="text-white/70 italic">
                  If you believe you belong in the Circle but the fee is a barrier, you can apply for a full scholarship.
                </p>
              </div>
            </div>

            {/* Action Pill Button matching ONE PLAN SVG screenshot */}
            <div className="pt-8 flex justify-center">
              <a
                href="/apply/register"
                className="w-full max-w-xs py-4 sm:py-5 rounded-full bg-[#3c3e44] hover:bg-[#4d5058] border border-white/25 text-white font-black text-base sm:text-lg uppercase tracking-[0.25em] text-center shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>APPLY NOW!</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;

