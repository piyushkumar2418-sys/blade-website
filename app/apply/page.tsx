"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronLeft, Lock, Calendar, MapPin } from "lucide-react";

export default function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
    phone: "",
    gender: "",
    location: "",
    currentStatus: "", // student, professional, etc.
    relocation: "",
    timeInvestment: "",
    course: "Batch 01",
    careerGoals: "",
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
      {/* INSTITUTIONAL HEADER */}
      <nav className="p-8 border-b border-black/5 flex justify-between items-center">
        <div className="flex flex-col cursor-pointer" onClick={() => window.location.href = "/"}>
          <img src="/bic-black.png" alt="BIC Logo" className="h-6 w-auto object-contain" />
        </div>
        <div className="flex items-center gap-3">
          <Lock size={12} className="text-black/20" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-black/40">Schedule an Interview</span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-20">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h2 className="text-4xl font-bold uppercase tracking-tighter mb-4">Want to know more?</h2>
              <p className="text-black/40 mb-12 uppercase tracking-widest text-[10px] font-bold text-left">Step 01: Core Details</p>
              
              <form onSubmit={handleNext} className="space-y-8 text-left grid grid-cols-1 md:grid-cols-2 gap-x-8">
                {/* Full Name */}
                <div className="group md:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-black/40">Full Name *</label>
                  <input required className="w-full border-b border-black/10 py-4 focus:border-[#F3D7A7] outline-none transition-colors text-lg" placeholder="Legal Name" onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                </div>

                {/* Email */}
                <div className="group">
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-black/40">Email ID *</label>
                  <input required type="email" className="w-full border-b border-black/10 py-4 focus:border-[#F3D7A7] outline-none transition-colors text-lg" placeholder="name@email.com" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>

                {/* DOB */}
                <div className="group">
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-black/40">Date of Birth *</label>
                  <input required type="date" className="w-full border-b border-black/10 py-4 focus:border-[#F3D7A7] outline-none transition-colors text-lg" onChange={(e) => setFormData({...formData, dob: e.target.value})} />
                </div>

                {/* Phone */}
                <div className="group">
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-black/40">Phone No. *</label>
                  <div className="flex items-center gap-4 border-b border-black/10">
                    <span className="text-lg text-black/30 font-medium">+91</span>
                    <input required type="tel" className="w-full py-4 focus:border-[#F3D7A7] outline-none transition-colors text-lg" placeholder="00000 00000" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>

                {/* Gender */}
                <div className="group">
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-black/40">Specify Your Gender</label>
                  <select required className="w-full border-b border-black/10 py-4 focus:border-[#F3D7A7] outline-none bg-transparent transition-colors text-lg" onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2 pt-8">
                  <button type="submit" className="w-full py-6 bg-black text-white font-bold uppercase tracking-widest text-[10px] hover:bg-[#F3D7A7] hover:text-black transition-all flex items-center justify-center gap-4">
                    Next Section <ArrowRight size={16}/>
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-black/40 hover:text-black transition-colors mb-8 group">
                <ChevronLeft size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Core Details</span>
              </button>
              <h2 className="text-4xl font-bold uppercase tracking-tighter mb-4 text-left">Psychological Fit</h2>
              <p className="text-black/40 mb-12 uppercase tracking-widest text-[10px] font-bold text-left">Step 02: Logistics & Goals</p>
              
              <form onSubmit={handleSubmit} className="space-y-12 text-left">
                {/* Location */}
                <div className="group">
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-4 text-black/40">Where Do You Live?</label>
                  <input required className="w-full border-b border-black/10 py-4 focus:border-[#F3D7A7] outline-none transition-colors text-lg" placeholder="City, State" onChange={(e) => setFormData({...formData, location: e.target.value})} />
                </div>

                {/* Current Status */}
                <div className="group">
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-4 text-black/40">I am a...</label>
                  <div className="flex flex-wrap gap-4">
                    {["Student", "Working Professional", "In Between Jobs"].map((status) => (
                      <button 
                        key={status} 
                        type="button" 
                        onClick={() => setFormData({...formData, currentStatus: status})}
                        className={`px-6 py-3 border text-xs font-bold uppercase tracking-widest transition-all ${formData.currentStatus === status ? 'bg-black text-white border-black' : 'border-black/10 hover:border-black'}`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Commitment (LIT Style Question) */}
                <div className="group p-8 border border-black/5 bg-[#F9F9F9]">
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-4 text-black/60">Are you willing to invest 2+ hours daily for your future? *</label>
                  <div className="flex gap-8">
                    {["Yes", "No", "Maybe"].map((choice) => (
                      <label key={choice} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="invest" required className="accent-black" onClick={() => setFormData({...formData, timeInvestment: choice})} />
                        <span className="font-bold text-sm uppercase">{choice}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Career Goals */}
                <div className="group">
                  <label className="block text-[10px] font-bold uppercase tracking-widest mb-4 text-black/40">What are your career goals? *</label>
                  <textarea required className="w-full border border-black/5 bg-[#F9F9F9] p-6 focus:border-[#F3D7A7] outline-none transition-colors text-lg min-h-[150px]" placeholder="Be specific about your 2026 targets..." onChange={(e) => setFormData({...formData, careerGoals: e.target.value})} />
                </div>

                <button type="submit" className="w-full py-8 bg-black text-white font-bold uppercase tracking-widest text-xs mt-12 hover:bg-[#F3D7A7] hover:text-black transition-all shadow-2xl">
                  Submit Application Portfolio
                </button>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
              <CheckCircle2 size={64} className="text-[#F3D7A7] mx-auto mb-8" strokeWidth={1} />
              <h2 className="text-4xl font-bold uppercase tracking-tighter mb-4 text-black">Inquiry Received.</h2>
              <p className="text-black/60 text-lg leading-relaxed mb-12">
                A counselor will be assigned to vet your profile. <br/> 
                Expect a response via WhatsApp within 24 hours.
              </p>
              <button onClick={() => window.location.href = "/"} className="px-12 py-4 border border-black/10 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-black hover:text-white transition-all">Back to Site</button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}