"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

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
    <section className="py-32 px-6 md:px-24 bg-[#030303] text-white border-t border-white/5 relative overflow-hidden">
      {/* Light glow overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F3D7A7]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] font-bold">
            COMMON PROTOCOLS
          </span>
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-white">
            Frequently Asked <span className="text-white/30">Queries.</span>
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className={`border rounded-2xl transition-all duration-300 ${
                  isOpen 
                    ? "bg-white/[0.03] border-[#F3D7A7]/40 shadow-[0_0_30px_rgba(243,215,167,0.03)]" 
                    : "bg-transparent border-white/5 hover:border-white/10"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-8 py-6 flex items-center justify-between gap-6 text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <HelpCircle size={18} className={`shrink-0 transition-colors duration-300 ${
                      isOpen ? "text-[#F3D7A7]" : "text-white/20 group-hover:text-white/40"
                    }`} />
                    <span className="text-sm md:text-base font-bold uppercase tracking-wide text-white/90">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`p-1.5 border rounded-full transition-all duration-300 ${
                    isOpen 
                      ? "border-[#F3D7A7]/40 text-[#F3D7A7] bg-[#F3D7A7]/5" 
                      : "border-white/5 text-white/30 group-hover:text-white/60"
                  }`}>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`} />
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
                      <div className="px-8 pb-8 pt-2 text-xs md:text-sm font-mono leading-relaxed text-white/50 border-t border-white/5">
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
