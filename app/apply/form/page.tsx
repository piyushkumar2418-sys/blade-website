"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Zap, Users, GraduationCap } from "lucide-react";

export default function ApplicationPortal() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", 
    currentRole: "", hasEarned: "", earningDetail: "",
    intent: "", goals: "", 
    commitTime: false, commitOutreach: false,
    blockers: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Application Submitted:", formData);
    // Add logic for redirecting to a "Thank You" screen
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col md:flex-row">
      
      {/* LEFT SIDE: FORM (Scrollable) */}
      <div className="w-full md:w-[60%] px-6 md:px-20 py-20 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-xl mx-auto"
        >
          <header className="mb-16">
            <h2 className="text-3xl font-bold uppercase tracking-tighter mb-2">Admission Request</h2>
            <p className="text-black/40 text-xs uppercase tracking-[0.2em]">Cohort 01 — May 2026 Batch</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* Section 1: Core */}
            <div className="space-y-8">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#F3D7A7]">01. Identification</h3>
              <div className="grid grid-cols-1 gap-6">
                <InputField label="Legal Name" placeholder="Full Name" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Email Address" placeholder="name@email.com" type="email" />
                  <InputField label="Phone (WhatsApp)" placeholder="+91" type="tel" />
                </div>
              </div>
            </div>

            {/* Section 2: Experience */}
            <div className="space-y-8">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#F3D7A7]">02. Professional Background</h3>
              <InputField label="What do you currently do?" placeholder="e.g. Student, Freelancer, Working Professional" />
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-black/60">Have you ever earned online before?</label>
                <div className="flex gap-4">
                  <button type="button" className="px-8 py-3 border border-black/10 text-xs font-bold uppercase tracking-widest hover:border-[#F3D7A7]">Yes</button>
                  <button type="button" className="px-8 py-3 border border-black/10 text-xs font-bold uppercase tracking-widest hover:border-[#F3D7A7]">No</button>
                </div>
                <textarea 
                  placeholder="Briefly explain your previous experience or lack thereof..."
                  className="w-full bg-[#F9F9F9] p-6 text-sm border-none focus:ring-1 focus:ring-[#F3D7A7] outline-none min-h-[100px]"
                />
              </div>
            </div>

            {/* Section 3: Intent */}
            <div className="space-y-8">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#F3D7A7]">03. Strategy & Mindset</h3>
              <TextAreaField label="Why do you want to join Blade Inner Circle?" placeholder="Your motivations..." />
              <TextAreaField label="What are you trying to achieve in the next 3 months?" placeholder="Be specific about your revenue or skill targets..." />
              <TextAreaField label="What do you think is currently stopping you?" placeholder="Identify your bottleneck..." />
            </div>

            {/* Section 4: Commitment */}
            <div className="space-y-8">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#F3D7A7]">04. Commitment Clause</h3>
              <div className="space-y-4">
                <Checkbox label="I can commit 2 months and ~3 hours per week for live execution." />
                <Checkbox label="I am willing to perform daily outreach if required by the curriculum." />
              </div>
            </div>

            <button className="w-full py-6 bg-black text-white font-bold uppercase tracking-[0.3em] text-xs hover:bg-[#F3D7A7] hover:text-black transition-all duration-700 shadow-2xl">
              File Admission Portfolio
            </button>
          </form>
        </motion.div>
      </div>

      {/* RIGHT SIDE: INFORMATION PANEL (Fixed or Sticky) */}
      <div className="w-full md:w-[40%] bg-[#F9F9F9] border-l border-black/5 px-8 md:px-16 py-20">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="sticky top-20 space-y-16"
        >
          {/* Cohort Details */}
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 leading-none italic">Cohort 01<br/>May 2026</h2>
            <ul className="space-y-6">
              <InfoItem icon={<Zap size={16}/>} text="2-Month Intensive Program" />
              <InfoItem icon={<Users size={16}/>} text="Limited to 10 vetted architects" />
              <InfoItem icon={<ShieldCheck size={16}/>} text="Live Execution Sprints" />
            </ul>
          </div>

          {/* Placement Section */}
          <div className="pt-12 border-t border-black/5">
            <div className="flex items-center gap-3 mb-6 text-[#F3D7A7]">
              <GraduationCap size={20} />
              <h3 className="text-sm font-bold uppercase tracking-widest">Placement Support</h3>
            </div>
            <p className="text-sm text-black/60 leading-relaxed font-light mb-6 italic">
              "We don’t guarantee placements. We prepare you for them."
            </p>
            <div className="space-y-4">
              <SupportItem text="Access to high-ticket opportunities in our network" />
              <SupportItem text="Guided client acquisition systems" />
              <SupportItem text="Portfolio positioning & Personal Branding" />
            </div>
          </div>

          {/* Institutional Note */}
          <div className="bg-black text-white p-8 rounded-sm">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold mb-2">Notice</p>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              Applicants are selected based on mindset and commitment density. You will receive a response within 48 hours of filing your portfolio.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Helper Components
const InputField = ({ label, placeholder, type = "text" }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold uppercase tracking-widest text-black/60">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      className="w-full border-b border-black/10 py-3 text-lg focus:border-[#F3D7A7] outline-none transition-all placeholder:text-black/10"
    />
  </div>
);

const TextAreaField = ({ label, placeholder }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold uppercase tracking-widest text-black/60">{label}</label>
    <textarea 
      placeholder={placeholder}
      className="w-full bg-[#F9F9F9] p-6 text-sm border-none focus:ring-1 focus:ring-[#F3D7A7] outline-none min-h-[120px]"
    />
  </div>
);

const Checkbox = ({ label }: any) => (
  <label className="flex items-start gap-4 cursor-pointer group">
    <input type="checkbox" className="mt-1 accent-black" />
    <span className="text-[11px] uppercase tracking-widest font-bold text-black/40 group-hover:text-black transition-colors">{label}</span>
  </label>
);

const InfoItem = ({ icon, text }: any) => (
  <li className="flex items-center gap-4 text-xs uppercase tracking-widest font-bold">
    <span className="text-[#F3D7A7]">{icon}</span>
    {text}
  </li>
);

const SupportItem = ({ text }: any) => (
  <div className="flex gap-3 text-[11px] font-medium text-black/60">
    <div className="h-1.5 w-1.5 rounded-full bg-[#F3D7A7] mt-1" />
    {text}
  </div>
);