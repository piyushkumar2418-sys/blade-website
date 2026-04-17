"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronLeft, Lock } from "lucide-react";

export default function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    qualification: "",
    portfolioLink: "",
    biggestBottleneck: "",
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // Success Screen
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#F3D7A7]">
      {/* HEADER */}
      <nav className="p-8 border-b border-black/5 flex justify-between items-center">
        <div className="flex flex-col cursor-pointer" onClick={() => window.location.href = "/"}>
          <img src="/bic-black.png" alt="BIC Logo" className="h-6 w-auto object-contain" />
        </div>
        <div className="flex items-center gap-3">
          <Lock size={12} className="text-black/20" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-black/40">Secure Admission Portal</span>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-20">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h2 className="text-4xl font-bold uppercase tracking-tighter mb-4">Registration</h2>
              <p className="text-black/40 mb-12 uppercase tracking-widest text-[10px] font-bold text-left">Step 01: Identification</p>
              
              <form onSubmit={handleNext} className="space-y-8 text-left">
                <div className="group">
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-black/40 group-focus-within:text-[#F3D7A7] transition-colors">Full Name *</label>
                  <input required className="w-full border-b border-black/10 py-4 focus:border-[#F3D7A7] outline-none transition-colors text-lg" placeholder="Legal Name" onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                </div>

                <div className="group">
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-black/40 group-focus-within:text-[#F3D7A7] transition-colors">Email Address *</label>
                  <input required type="email" className="w-full border-b border-black/10 py-4 focus:border-[#F3D7A7] outline-none transition-colors text-lg" placeholder="name@email.com" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>

                <div className="group">
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-black/40 group-focus-within:text-[#F3D7A7] transition-colors">Phone Number *</label>
                  <div className="flex items-center gap-4 border-b border-black/10">
                    <span className="text-lg text-black/30 font-medium">+91</span>
                    <input required type="tel" className="w-full py-4 focus:border-[#F3D7A7] outline-none transition-colors text-lg" placeholder="00000 00000" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-black/40 group-focus-within:text-[#F3D7A7] transition-colors">Professional Qualification *</label>
                  <input required className="w-full border-b border-black/10 py-4 focus:border-[#F3D7A7] outline-none transition-colors text-lg" placeholder="Current Role / Experience" onChange={(e) => setFormData({...formData, qualification: e.target.value})} />
                </div>

                <button type="submit" className="w-full py-6 bg-black text-white font-bold uppercase tracking-widest text-[10px] mt-12 hover:bg-[#F3D7A7] hover:text-black transition-all flex items-center justify-center gap-4">
                  Proceed to Application <ArrowRight size={16}/>
                </button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-black/40 hover:text-black transition-colors mb-8 group">
                <ChevronLeft size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-left">Identification</span>
              </button>
              <h2 className="text-4xl font-bold uppercase tracking-tighter mb-4 text-left">Build Assessment</h2>
              <p className="text-black/40 mb-12 uppercase tracking-widest text-[10px] font-bold text-left">Step 02: Strategy Teardown</p>
              
              <form onSubmit={handleSubmit} className="space-y-12 text-left">
                <div className="group">
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-4 text-black/40">Portfolio / Proof of Work (Link)</label>
                  <input className="w-full border-b border-black/10 py-4 focus:border-[#F3D7A7] outline-none transition-colors text-lg" placeholder="URL to your best work" onChange={(e) => setFormData({...formData, portfolioLink: e.target.value})} />
                </div>

                <div className="group">
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-4 text-black/40">What is the biggest bottleneck in your agency journey? *</label>
                  <textarea required className="w-full border border-black/5 bg-[#F9F9F9] p-6 focus:border-[#F3D7A7] outline-none transition-colors text-lg min-h-[150px]" placeholder="Be specific..." onChange={(e) => setFormData({...formData, biggestBottleneck: e.target.value})} />
                </div>

                <button type="submit" className="w-full py-8 bg-black text-white font-bold uppercase tracking-widest text-xs mt-12 hover:bg-[#F3D7A7] hover:text-black transition-all shadow-2xl">
                  Submit Application
                </button>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
              <CheckCircle2 size={64} className="text-[#F3D7A7] mx-auto mb-8" strokeWidth={1} />
              <h2 className="text-4xl font-bold uppercase tracking-tighter mb-4 text-black text-center">Application Sent.</h2>
              <p className="text-black/60 text-lg leading-relaxed mb-12 text-center">We will review your profile and get back to you shortly.</p>
              <button onClick={() => window.location.href = "/"} className="px-12 py-4 border border-black/10 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-black hover:text-white transition-all">Return Home</button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}