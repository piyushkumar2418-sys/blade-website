"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function WaitlistFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "When does Cohort 02 (August 2026) start?",
      answer: "Cohort 02 is scheduled to launch live operations on August 3, 2026. Waitlist processing starts 3 weeks prior, allowing approved members to secure curriculum files and establish initial onboarding nodes."
    },
    {
      question: "How does waitlist verification work?",
      answer: "Once you lock your data vectors in the waitlist terminal, our systems register your intent. We review applications on a rolling basis. If approved, you will receive a verified Priority Access Code via email, which bypasses general public clearance."
    },
    {
      question: "What is the capacity for the August cohort?",
      answer: "We do not enforce rigid numeric limits, but admissions are strictly bounded by mentor bandwidth, 1:1 critique channels, and placement slots inside the Blade Media editor network."
    },
    {
      question: "Is there any cost associated with joining the waitlist?",
      answer: "No. Entering the waitlist queue and acquiring your priority code is completely free. Tuition and workspace integration costs are only detailed and processed upon official admission clearance."
    },
    {
      question: "What happens after I receive my priority access code?",
      answer: "Keep your code safe. When general admissions go active, waitlist members get a 24-hour headstart. You will enter your code on the main portal to instantly unlock your curriculum slot and early-bird benefits."
    }
  ];

  return (
    <section className="py-32 px-6 md:px-24 bg-[#020202] text-white border-t border-white/5 relative overflow-hidden">
      {/* Light glow overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F3D7A7]/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] font-mono font-bold">
            COMMON PROTOCOLS
          </span>
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-white">
            Frequently Asked <br />
            <span className="font-serif italic font-normal text-[#F3D7A7] lowercase tracking-normal">queries.</span>
          </h2>
        </div>

        {/* Minimal Divider-line Accordion */}
        <div className="border-t border-white/10 divide-y divide-white/10 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="py-8 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-6 text-left cursor-pointer group"
                >
                  <span className={`text-base md:text-lg font-bold uppercase tracking-tight transition-colors duration-300 ${
                    isOpen ? "text-[#F3D7A7]" : "text-white/80 group-hover:text-white"
                  }`}>
                    {faq.question}
                  </span>
                  
                  <div className={`p-1.5 transition-all duration-300 ${
                    isOpen ? "text-[#F3D7A7]" : "text-white/30 group-hover:text-white/60"
                  }`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 pr-12 text-xs md:text-sm font-mono leading-relaxed text-white/40">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
