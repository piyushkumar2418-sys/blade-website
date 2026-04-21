"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ShieldCheck, Zap, Users, GraduationCap, CheckCircle2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ApplicationPortal() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "", 
    email: "", 
    phone: "", 
    currentRole: "", 
    hasEarned: "", 
    earningDetail: "",
    intent: "", 
    goals: "", 
    blockers: "",
    commitTime: false, 
    commitOutreach: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMessage("PLEASE FILL IN YOUR NAME, EMAIL, AND PHONE.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await addDoc(collection(db, "applications"), {
        ...formData,
        createdAt: serverTimestamp(),
        status: "submitted",
      });
      setShowSuccess(true);
      // Wait for 3 seconds then redirect to home
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error: any) {
      console.error("Error submitting application:", error);
      setErrorMessage(`FAILED TO SUBMIT: ${error.message || "PLEASE TRY AGAIN LATER"}`);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col md:flex-row relative">
      
      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-white max-w-sm w-full p-10 rounded-sm shadow-2xl text-center space-y-6"
            >
              <div className="flex justify-center">
                <div className="h-16 w-16 bg-[#F3D7A7] rounded-full flex items-center justify-center text-black">
                  <CheckCircle2 size={32} />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold uppercase tracking-tighter">Application Sent</h3>
                <p className="text-black/40 text-xs uppercase tracking-widest leading-relaxed">
                  Your portfolio has been submitted successfully. We will review it and get back to you within 48 hours.
                </p>
              </div>
              <div className="pt-4">
                <button 
                  onClick={() => router.push("/")}
                  className="w-full py-4 bg-black text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#F3D7A7] hover:text-black transition-colors"
                >
                  Return Home
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full md:w-[60%] px-6 md:px-20 py-20 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-xl mx-auto"
        >
          <header className="mb-16">
            <h2 className="text-3xl font-bold uppercase tracking-[-0.06em] mb-2">Admission Form</h2>
            <p className="text-black/40 text-xs uppercase tracking-[0.2em]">Cohort 01 — May 2026 Batch</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="space-y-8">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#F3D7A7]">01. Identification</h3>
              <div className="grid grid-cols-1 gap-6">
                <InputField 
                  label="Full Name" 
                  placeholder="Your complete name" 
                  value={formData.name} 
                  onChange={(val) => handleInputChange("name", val)} 
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField 
                    label="Email Address" 
                    placeholder="name@email.com" 
                    type="email" 
                    value={formData.email} 
                    onChange={(val) => handleInputChange("email", val)} 
                  />
                  <InputField 
                    label="Phone (WhatsApp)" 
                    placeholder="+91" 
                    type="tel" 
                    value={formData.phone} 
                    onChange={(val) => handleInputChange("phone", val)} 
                  />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#F3D7A7]">02. Professional Background</h3>
              <InputField 
                label="What do you currently do?" 
                placeholder="e.g. Student, Freelancer, Working Professional" 
                value={formData.currentRole} 
                onChange={(val) => handleInputChange("currentRole", val)} 
              />
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-black/60">Have you ever earned online before?</label>
                <div className="flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => handleInputChange("hasEarned", "Yes")}
                    className={`px-8 py-3 border text-xs font-bold uppercase tracking-widest transition-all ${
                      formData.hasEarned === "Yes" 
                        ? "border-[#F3D7A7] bg-[#F3D7A7]/10 text-black" 
                        : "border-black/10 text-black/40 hover:border-[#F3D7A7]/50"
                    }`}
                  >
                    Yes
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleInputChange("hasEarned", "No")}
                    className={`px-8 py-3 border text-xs font-bold uppercase tracking-widest transition-all ${
                      formData.hasEarned === "No" 
                        ? "border-[#F3D7A7] bg-[#F3D7A7]/10 text-black" 
                        : "border-black/10 text-black/40 hover:border-[#F3D7A7]/50"
                    }`}
                  >
                    No
                  </button>
                </div>
                <textarea 
                  placeholder="Briefly explain your previous experience or lack thereof..."
                  value={formData.earningDetail}
                  onChange={(e) => handleInputChange("earningDetail", e.target.value)}
                  className="w-full bg-[#F9F9F9] p-6 text-sm border-none focus:ring-1 focus:ring-[#F3D7A7] outline-none min-h-[100px]"
                />
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#F3D7A7]">03. Strategy & Mindset</h3>
              <TextAreaField 
                label="Why do you want to join Blade Inner Circle?" 
                placeholder="Your motivations..." 
                value={formData.intent}
                onChange={(val) => handleInputChange("intent", val)}
              />
              <TextAreaField 
                label="What are you trying to achieve in the next 3 months?" 
                placeholder="Be specific about your revenue or skill targets..." 
                value={formData.goals}
                onChange={(val) => handleInputChange("goals", val)}
              />
              <TextAreaField 
                label="What do you think is currently stopping you?" 
                placeholder="Identify your bottleneck..." 
                value={formData.blockers}
                onChange={(val) => handleInputChange("blockers", val)}
              />
            </div>

            <div className="space-y-8">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#F3D7A7]">04. Commitment Clause</h3>
              <div className="space-y-4">
                <Checkbox 
                  label="I can commit 2 months and ~3 hours per week for live execution." 
                  checked={formData.commitTime}
                  onChange={(val) => handleInputChange("commitTime", val)}
                />
                <Checkbox 
                  label="I am willing to perform daily outreach if required by the curriculum." 
                  checked={formData.commitOutreach}
                  onChange={(val) => handleInputChange("commitOutreach", val)}
                />
              </div>
            </div>

            {errorMessage && (
              <div className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{errorMessage}</div>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting || showSuccess}
              className="w-full py-6 bg-black text-white font-bold uppercase tracking-widest text-xs hover:bg-[#F3D7A7] hover:text-black transition-all duration-500 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "PROCESSING..." : showSuccess ? "SUBMITTED" : "Submit Admission Portfolio"}
            </button>
          </form>
        </motion.div>
      </div>

      <div className="w-full md:w-[40%] bg-[#F9F9F9] border-l border-black/5 px-8 md:px-16 py-20">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="sticky top-20 space-y-16"
        >
          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-black/10"></div>
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-black/40">Admissions Open</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-8xl font-black uppercase tracking-[-0.06em] leading-none text-black">
                C0<span className="text-[#F3D7A7]">1</span>
              </span>
              <div className="flex items-center gap-3 mt-4">
                <span className="text-sm font-bold uppercase tracking-[0.3em] border-b-2 border-black pb-1">
                  May 2026
                </span>
                <span className="text-[10px] opacity-30 uppercase font-medium tracking-widest leading-none">
                  {"// Global Intake"}
                </span>
              </div>
            </div>

            <ul className="space-y-6 mt-12">
              <InfoItem icon={<Zap size={16}/>} text="2-Month Intensive Program" />
              <InfoItem icon={<Users size={16}/>} text="Limited to 10 vetted architects" />
              <InfoItem icon={<ShieldCheck size={16}/>} text="Live Execution Sprints" />
            </ul>
          </div>

          <div className="pt-12 border-t border-black/5">
            <div className="flex items-center gap-3 mb-6 text-[#F3D7A7]">
              <GraduationCap size={20} />
              <h3 className="text-sm font-bold uppercase tracking-widest">Placement Support</h3>
            </div>
            <p className="text-sm text-black/60 leading-relaxed font-light mb-6 italic">
              &quot;We don&apos;t guarantee placements. We prepare you for them.&quot;
            </p>
            <div className="space-y-4">
              <SupportItem text="Access to high-ticket opportunities in our network" />
              <SupportItem text="Guided client acquisition systems" />
              <SupportItem text="Portfolio positioning & Personal Branding" />
            </div>
          </div>

          <div className="bg-black text-white p-8 rounded-sm">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold mb-2">Notice</p>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              Applicants are selected based on mindset and commitment density. You will receive a response within 48 hours.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const InputField = ({ label, placeholder, value, onChange, type = "text" }: { 
  label: string; 
  placeholder: string; 
  value: string;
  onChange: (val: string) => void;
  type?: string 
}) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold uppercase tracking-widest text-black/60">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border-b border-black/10 py-3 text-lg focus:border-[#F3D7A7] outline-none transition-all placeholder:text-black/10"
    />
  </div>
);

const TextAreaField = ({ label, placeholder, value, onChange }: { 
  label: string; 
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
}) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold uppercase tracking-widest text-black/60">{label}</label>
    <textarea 
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#F9F9F9] p-6 text-sm border-none focus:ring-1 focus:ring-[#F3D7A7] outline-none min-h-[120px]"
    />
  </div>
);

const Checkbox = ({ label, checked, onChange }: { 
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}) => (
  <label className="flex items-start gap-4 cursor-pointer group">
    <input 
      type="checkbox" 
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="mt-1 accent-black" 
    />
    <span className="text-[11px] uppercase tracking-widest font-bold text-black/40 group-hover:text-black transition-colors">{label}</span>
  </label>
);

const InfoItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <li className="flex items-center gap-4 text-xs uppercase tracking-widest font-bold">
    <span className="text-[#F3D7A7]">{icon}</span>
    {text}
  </li>
);

const SupportItem = ({ text }: { text: string }) => (
  <div className="flex gap-3 text-[11px] font-medium text-black/60">
    <div className="h-1.5 w-1.5 rounded-full bg-[#F3D7A7] mt-1" />
    {text}
  </div>
);
