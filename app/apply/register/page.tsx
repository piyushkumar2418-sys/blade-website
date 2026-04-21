"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ShieldCheck, Zap, ArrowRight, AlertCircle, CheckCircle2, Globe, Instagram, FileText } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

export default function ApplicationPortal() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const [formData, setFormData] = useState({
    name: "", 
    email: "", 
    phone: "", 
    instagram: "",
    links: "",
    whyJoin: "",
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/apply/login");
      return;
    }

    if (profile) {
      setFormData(prev => ({
        ...prev,
        name: profile.name,
        email: profile.email,
        phone: profile.phone
      }));
    }
  }, [user, profile, loading, router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!formData.links || !formData.whyJoin) {
      setErrorMessage("PLEASE COMPLETE ALL ADMISSION QUESTIONS.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await addDoc(collection(db, "applications"), {
        ...formData,
        uid: user?.uid,
        createdAt: serverTimestamp(),
        status: "submitted",
      });
      setShowSuccess(true);
    } catch (error: any) {
      console.error("Error submitting application:", error);
      setErrorMessage(`FAILED TO SUBMIT: ${error.message || "PLEASE TRY AGAIN LATER"}`);
      setIsSubmitting(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-left">
          <div className="w-8 h-8 border-2 border-black/5 border-t-black rounded-full animate-spin" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/20">Accessing Gateway...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-black flex flex-col md:flex-row relative font-sans selection:bg-[#F3D7A7] selection:text-black">
      
      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-white flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-lg w-full text-left space-y-10"
            >
              <div className="space-y-4 text-left">
                <span className="text-[#F3D7A7] text-[10px] font-bold uppercase tracking-[0.5em]">Phase 01 Complete</span>
                <h3 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.9] text-black">
                  Admission <br/> Received.
                </h3>
                <p className="text-black/40 text-sm leading-relaxed max-w-sm">
                  Your portfolio has been queued for architect review. We will evaluate your intent and commitment density. Expect a response in 48h.
                </p>
              </div>

              <div className="pt-6">
                <button 
                  onClick={() => router.push("/dashboard")}
                  className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-black hover:text-[#F3D7A7] transition-all"
                >
                  Go to Student Dashboard 
                  <div className="h-10 w-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                    <ArrowRight size={16} />
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full md:w-[60%] bg-white px-6 md:px-20 py-20 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-xl mx-auto text-left"
        >
          <header className="mb-16 text-left">
            <h2 className="text-4xl font-bold uppercase tracking-tighter mb-2 text-left">Admission Portfolio</h2>
            <p className="text-black/30 text-[10px] font-bold uppercase tracking-[0.2em] text-left">May 2026 Batch // Institutional Entry</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-12 text-left">
            <div className="space-y-8 text-left">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#F3D7A7] text-left">01. Identity Verification</h3>
              <div className="grid grid-cols-1 gap-10 text-left">
                <InputField 
                  label="Full Name" 
                  value={formData.name} 
                  disabled={true}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <InputField 
                    label="Verified Email" 
                    value={formData.email} 
                    disabled={true}
                  />
                  <InputField 
                    label="Contact Number" 
                    value={formData.phone} 
                    disabled={true}
                  />
                </div>
                <InputField 
                  label="Instagram Handle" 
                  placeholder="@yourusername"
                  value={formData.instagram} 
                  onChange={(val) => handleInputChange("instagram", val)} 
                />
              </div>
            </div>

            <div className="space-y-8 text-left">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#F3D7A7] text-left">02. Evidence & Intent</h3>
              <TextAreaField 
                label="Portfolio Links"
                question="Share links to your best work (YouTube, Instagram, Portfolio, etc.)"
                placeholder="Paste URLs here, one per line..." 
                value={formData.links}
                onChange={(val) => handleInputChange("links", val)}
              />
              <TextAreaField 
                label="Statement of Intent"
                question="Why do you want to join the Inner Circle?"
                placeholder="Tell us about your goals and why you're a good fit..." 
                value={formData.whyJoin}
                onChange={(val) => handleInputChange("whyJoin", val)}
              />
            </div>

            {errorMessage && (
              <div className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-left">{errorMessage}</div>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting || showSuccess}
              className="w-full py-6 bg-black text-white font-bold uppercase tracking-widest text-[10px] hover:bg-[#F3D7A7] hover:text-black transition-all duration-500 shadow-2xl disabled:opacity-50"
            >
              {isSubmitting ? "TRANSMITTING..." : "Submit Admission Portfolio"}
            </button>
          </form>
        </motion.div>
      </div>

      <div className="w-full md:w-[40%] bg-[#F9F9F9] border-l border-black/5 px-8 md:px-16 py-20 text-left">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="sticky top-20 space-y-16 text-left"
        >
          <div className="space-y-8 text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#F3D7A7] block text-left">The Commitment</span>
            <h3 className="text-4xl font-bold uppercase tracking-tighter leading-none text-left">Operational <br/> Excellence.</h3>
            <p className="text-sm text-black/40 leading-relaxed font-light text-left">
              Admission into the Inner Circle is based on more than just skill. We look for commitment density and a bias toward execution.
            </p>
          </div>

          <div className="space-y-8 text-left">
            <SidebarItem icon={<Zap size={18}/>} title="High Density" desc="2-month intensive focused purely on system deployment." />
            <SidebarItem icon={<ShieldCheck size={18}/>} title="Vetted Cohort" desc="Limited to a maximum of 10 architects per batch." />
          </div>

          <div className="p-8 bg-white border border-black/5 text-left">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold mb-4 text-left">Notice</p>
            <p className="text-[11px] text-black/50 leading-relaxed text-left">
              Duplicate submissions or false information will result in permanent disqualification from the Blade ecosystem.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const InputField = ({ label, placeholder, value, onChange, disabled = false }: any) => (
  <div className="space-y-2 text-left">
    <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 block text-left">{label}</label>
    <input 
      type="text" 
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      disabled={disabled}
      className={`w-full border-b border-black/5 py-4 text-xl font-bold tracking-tight focus:border-[#F3D7A7] outline-none transition-all placeholder:text-black/5 text-left ${disabled ? "opacity-30 cursor-not-allowed" : ""}`}
    />
  </div>
);

const TextAreaField = ({ label, question, placeholder, value, onChange }: any) => (
  <div className="space-y-3 text-left">
    <div className="space-y-1 text-left">
       <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 block text-left">{label}</label>
       <p className="text-xs font-bold text-black/80 text-left">{question}</p>
    </div>
    <textarea 
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white border border-black/5 p-6 text-sm outline-none focus:border-[#F3D7A7] min-h-[140px] transition-all text-left"
    />
  </div>
);

const SidebarItem = ({ icon, title, desc }: any) => (
  <div className="flex gap-6 text-left">
    <div className="text-[#F3D7A7] mt-1 text-left">{icon}</div>
    <div className="space-y-1 text-left">
      <h4 className="text-xs font-bold uppercase tracking-widest text-left">{title}</h4>
      <p className="text-[10px] text-black/30 uppercase tracking-[0.2em] leading-relaxed text-left">{desc}</p>
    </div>
  </div>
);
