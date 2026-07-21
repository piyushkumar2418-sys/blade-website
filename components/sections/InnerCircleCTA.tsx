"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";

interface InnerCircleCTAProps {
  onJoinWaitlist: () => void;
}

const InnerCircleCTA = ({ onJoinWaitlist }: InnerCircleCTAProps) => {
  const router = useRouter();
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const faqItems = [
    {
      question: "When does Cohort 02 (August 2026) start?",
      answer: "Cohort 02 is scheduled to launch live operations on August 29, 2026. All curriculum slot lockups and onboarding nodes will be established before this date."
    },
    {
      question: "Are the programme conducted online or offline?",
      answer: "The entire programme is conducted online. All sessions, dashboard reviews, live edits, and portfolio critiques are conducted remotely, allowing creators and builders from anywhere globally to participate."
    },
    {
      question: "What are the Programme timings?",
      answer: "Live sessions are conducted every Tuesday and Thursday so that members can easily integrate the curriculum into their weekly schedule. Recorded replays, templates, and resource files are uploaded to your member dashboard immediately after each session."
    },
    {
      question: "Does BIC offer scholarships?",
      answer: "Yes. Blade Inner Circle offers partial merit-based scholarships for exceptionally talented creators, strategists, and editors who demonstrate outstanding potential in their portfolios. You can request consideration within the cohort application form."
    },
    {
      question: "How does application verification work?",
      answer: "Once you submit your application vectors through our portal, our team reviews your portfolio. If approved, you will receive a verified invitation to complete your enrollment and lock in your slot."
    },
    {
      question: "Is there any cost associated with applying?",
      answer: "No. Submitting your application profile to Blade Inner Circle is completely free. Tuition fee details and payment schedules are only processed upon official cohort admission clearance."
    }
  ];

  return (
    <>
      {/* CURRICULUM SECTION */}
      <section 
        className="py-24 px-6 md:px-24 bg-[#050505] text-left relative z-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        {/* Glow backdrop */}
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-[#FFC800]/5 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto text-left relative z-10">
          <div className="bg-white/[0.01] border border-white/10 hover:border-[#FFC800]/25 rounded-[3.5rem] p-10 md:p-16 relative overflow-hidden text-left flex flex-col md:flex-row items-center gap-12 min-h-[500px] shadow-2xl backdrop-blur-3xl transition-all duration-500">
            {/* Background details */}
            <div className="absolute top-16 right-[35%] w-12 h-12 border border-[#FFC800]/10 rounded-full hidden md:block text-left" />
            
            <div className="flex-1 space-y-8 relative z-10 text-left">
              <div className="space-y-4 text-left">
                <span className="text-[#FFC800] text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block text-left">What you will learn</span>
                <h2 className="text-white text-5xl md:text-[72px] font-bold uppercase tracking-tight leading-[0.85] mb-8 text-left">
                  The exact systems <br /> behind ₹3Cr+ in <br /> revenue.
                </h2>
              </div>
              <p className="text-white/40 text-lg md:text-xl font-medium max-w-xl leading-relaxed mb-10 text-left">
                We have broken down how to start your agency into five simple steps. No wasting time, just doing the work.
              </p>
              <motion.button 
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => router.prefetch("/curriculum")}
                onClick={() => router.push("/curriculum")}
                className="bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-[#FFC800] transition-all duration-300 flex items-center gap-4 shadow-xl text-left"
              >
                View Full Prospectus <ArrowRight size={20}/>
              </motion.button>
            </div>

            <div className="flex flex-row md:flex-col gap-6 relative z-10 text-left">
              <div className="bg-black/50 border border-white/5 rounded-[30px] p-8 w-40 md:w-52 text-center flex flex-col justify-center items-center shadow-xl text-left backdrop-blur-md">
                 <span className="text-white text-5xl font-bold block tracking-tighter mb-1 text-left">60</span>
                 <span className="text-[#FFC800] text-[10px] font-bold uppercase tracking-[0.3em] block text-left">Days</span>
              </div>
              <div className="bg-black/50 border border-white/5 rounded-[30px] p-8 w-40 md:w-52 text-center flex flex-col justify-center items-center shadow-xl text-left backdrop-blur-md">
                 <span className="text-white text-5xl font-bold block tracking-tighter mb-1 text-left">5</span>
                 <span className="text-[#FFC800] text-[10px] font-bold uppercase tracking-[0.3em] block text-left">Phases</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 px-6 md:px-24 bg-[#050505] text-white border-t border-white/5 relative overflow-hidden text-left z-20">
        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FFC800]/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-left mb-16 space-y-4">
            <span className="text-[#FFC800] text-[10px] uppercase tracking-[0.5em] font-mono font-bold block">
              FAQ
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none font-sans">
              Frequently Asked <span className="text-[#FFC800]">Questions.</span>
            </h2>
          </div>

          {/* Accordion List */}
          <div className="border-t border-white/10 divide-y divide-white/10 text-left">
            {faqItems.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className="py-6 transition-all duration-300">
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-6 text-left cursor-pointer group"
                  >
                    <span className={`text-base md:text-lg font-bold uppercase tracking-tight transition-colors duration-300 ${
                      isOpen ? "text-[#FFC800]" : "text-white/80 group-hover:text-white"
                    }`}>
                      {faq.question}
                    </span>
                    <div className={`p-1.5 transition-all duration-300 ${
                      isOpen ? "text-[#FFC800]" : "text-white/30 group-hover:text-white/60"
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
                        <div className="pt-4 pr-12 text-xs md:text-sm leading-relaxed text-white/50 font-sans">
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

      {/* REAL PREMIUM FOOTER */}
      <footer 
        className="bg-black text-white border-t border-white/5 pt-24 md:pt-32 pb-12 md:pb-16 px-6 md:px-24 relative z-20 text-left"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-start">
          {/* Left Column */}
          <div className="md:col-span-7 flex flex-col text-left space-y-10">
            <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-[-0.05em] leading-none text-white text-left font-sans">
              Stop Consuming.<br />Start Creating.
            </h2>
            
            <motion.button 
              whileHover={{ scale: 1.01 }} 
              whileTap={{ scale: 0.99 }}
              onClick={onJoinWaitlist}
              className="flex items-center justify-between w-full max-w-md px-8 py-6 bg-white text-black font-bold uppercase text-[10px] tracking-[0.2em] transition-all duration-300 hover:bg-[#FFC800]"
            >
              <span>Apply for Cohort 02</span>
              <span className="text-sm">→</span>
            </motion.button>

            <div className="text-left font-sans">
              <span className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-bold block mb-1">Admissions Intake:</span>
              <span className="text-[#FFC800] text-sm font-bold tracking-wider">
                August 2026 Intake Now Active
              </span>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-5 grid grid-cols-2 gap-8 w-full md:pl-12">
            {/* Sub-column 1: Navigation */}
            <div className="flex flex-col gap-4 text-left font-sans text-[11px] uppercase tracking-[0.15em] font-bold text-white/50">
              <span className="text-white/20 text-[9px] tracking-[0.2em] font-bold mb-2">School</span>
              <a href="/curriculum" className="hover:text-white transition-colors">Curriculum</a>
              <a href="/apply/register" className="hover:text-white transition-colors">Apply Now</a>
              <a href="/apply/login" className="hover:text-white transition-colors">Sign In</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            </div>

            {/* Sub-column 2: Socials */}
            <div className="flex flex-col gap-4 text-left font-sans text-[11px] uppercase tracking-[0.15em] font-bold text-white/50">
              <span className="text-white/20 text-[9px] tracking-[0.2em] font-bold mb-2">Connect</span>
              <a href="https://www.instagram.com/blade.media_/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">Instagram <span className="text-[9px] opacity-60">↗</span></a>
              <a href="https://wa.me/917082176274" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">WhatsApp <span className="text-[9px] opacity-60">↗</span></a>
            </div>

            {/* Bottom row: Location & Contact */}
            <div className="text-left text-white/40 text-[11px] mt-16 leading-relaxed font-sans uppercase tracking-wider flex flex-col gap-6">
              <div>
                <span className="text-white/20 text-[9px] tracking-[0.2em] font-bold block mb-1">HQ</span>
                <span>New Delhi</span> <br />
                <span className="font-bold text-white/20 text-[10px] tracking-[0.2em]">India, Asia</span>
              </div>
              <div>
                <span className="text-white/20 text-[9px] tracking-[0.2em] font-bold block mb-1">Get in touch</span>
                <a href="mailto:info@blademedia.in" className="text-[#FFC800] hover:text-white text-xs font-mono tracking-wide transition-colors lowercase block mt-1">
                  info@blademedia.in
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright row */}
        <div className="max-w-[1400px] mx-auto mt-16 md:mt-24 pt-8 border-t border-white/5 flex justify-center text-[9px] uppercase tracking-[0.6em] text-white/35 font-mono">
          <span>© 2026 Blade. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
};

export default InnerCircleCTA;
