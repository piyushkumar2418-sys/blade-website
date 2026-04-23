"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ShieldCheck, Zap, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

import { toast } from "sonner";

export default function ApplicationPortal() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showExistingModal, setShowExistingModal] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "", 
    email: "", 
    phone: "", 
    instagram: "",
    dob: "",
    location: "",
    currentActivity: "",
    links: "",
    whyJoin: "",
    friction: "",
    commitment: false,
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

    const checkExisting = async () => {
      if (user) {
        const q = query(collection(db, "applications"), where("uid", "==", user.uid));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setShowExistingModal(true);
        }
      }
    };
    checkExisting();
  }, [user, profile, loading, router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (
      !formData.links || 
      !formData.whyJoin || 
      !formData.friction ||
      !formData.dob ||
      !formData.location ||
      !formData.currentActivity ||
      !formData.commitment
    ) {
      toast.warning("INCOMPLETE PORTFOLIO", {
        description: "Please complete all admission questions before transmitting.",
      });
      setErrorMessage("PLEASE COMPLETE ALL ADMISSION QUESTIONS AND AGREE TO THE COMMITMENT.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          uid: user?.uid,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to transmit application portfolio.');
      }

      if (data.debug_email === 'missing_key') {
        toast.error("COMMUNICATION SYSTEM OFFLINE", {
          description: "Portfolio logged, but confirmation email system is not configured on server.",
        });
      } else {
        toast.success("TRANSMISSION SECURED", {
          description: `Application logged. Email ID: ${data.resend_id}`,
        });
      }
      
      setShowSuccess(true);
    } catch (error: any) {
      console.error("Error submitting application:", error);
      toast.error("SYSTEM FAILURE", {
        description: "Application failed to transmit. Please retry.",
      });
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
      {/* VERSION BANNER */}
      <div className="fixed top-0 left-0 right-0 z-[200] bg-[#F3D7A7] text-black text-[10px] font-bold text-center py-1 tracking-[0.3em] uppercase">
        System Version 2.0 - Active Diagnostics
      </div>
      
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
      
      {/* DUPLICATE SUBMISSION MODAL */}
      <AnimatePresence>
        {showExistingModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md w-full bg-white p-10 md:p-12 shadow-2xl space-y-8 rounded-2xl text-left"
            >
              <div className="space-y-4 text-left">
                <div className="w-12 h-12 bg-black flex items-center justify-center rounded-full text-[#F3D7A7]">
                   <AlertCircle size={24} />
                </div>
                <h3 className="text-3xl font-bold uppercase tracking-tight text-black text-left">
                  Application <br/> Already Found.
                </h3>
                <p className="text-black/40 text-sm leading-relaxed text-left font-medium">
                  You have already submitted a portfolio for the May 2026 Batch. Would you like to check your status or submit a revised version?
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-4 text-left">
                <button 
                  onClick={() => router.push("/dashboard")}
                  className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest text-[10px] hover:bg-[#F3D7A7] hover:text-black transition-all duration-300 shadow-lg"
                >
                  Visit Student Profile
                </button>
                <button 
                  onClick={() => setShowExistingModal(false)}
                  className="w-full py-4 bg-transparent border border-black/10 text-black/40 font-bold uppercase tracking-widest text-[9px] hover:text-black hover:border-black transition-all duration-300"
                >
                  Submit Another Response
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
                  onChange={(val: string) => handleInputChange("instagram", val)} 
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <InputField 
                    label="Date of Birth" 
                    type="date"
                    value={formData.dob} 
                    onChange={(val: string) => handleInputChange("dob", val)} 
                    max={new Date().toISOString().split('T')[0]}
                  />
                  <InputField 
                    label="Current Location" 
                    placeholder="City, Country"
                    value={formData.location} 
                    onChange={(val: string) => handleInputChange("location", val)} 
                  />
                </div>
                <InputField 
                  label="What do you currently do?" 
                  placeholder="e.g. Student, Freelancer, Full-time job"
                  value={formData.currentActivity} 
                  onChange={(val: string) => handleInputChange("currentActivity", val)} 
                />
              </div>
            </div>

            <div className="space-y-12 text-left">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#F3D7A7] text-left">02. Evidence & Intent</h3>
              <div className="space-y-12 text-left">
                <TextAreaField 
                  label="Portfolio Links"
                  question="Share links to your best work (YouTube, Instagram, Portfolio, etc.)"
                  placeholder="Paste URLs here, one per line..." 
                  value={formData.links}
                  onChange={(val: string) => handleInputChange("links", val)}
                />
                <TextAreaField 
                  label="Statement of Intent"
                  question="Why do you want to join the Inner Circle?"
                  placeholder="Tell us about your goals and why you're a good fit..." 
                  value={formData.whyJoin}
                  onChange={(val: string) => handleInputChange("whyJoin", val)}
                />
                <TextAreaField 
                  label="The Friction"
                  question="What is currently stopping you from reaching your next level?"
                  placeholder="Describe your current bottlenecks..." 
                  value={formData.friction}
                  onChange={(val: string) => handleInputChange("friction", val)} 
                />
              </div>
            </div>

            <div className="space-y-8 text-left pt-12">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#F3D7A7] text-left">03. Institutional Commitment</h3>
              <motion.div 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`relative overflow-hidden cursor-pointer p-8 rounded-3xl transition-all duration-500 border ${formData.commitment ? "bg-black border-black text-white" : "bg-white border-black/5 text-black hover:border-[#F3D7A7]/30"}`}
                onClick={() => setFormData(prev => ({ ...prev, commitment: !prev.commitment }))}
              >
                <div className="flex items-start gap-6 relative z-10">
                  <div className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${formData.commitment ? "bg-[#F3D7A7] border-[#F3D7A7]" : "border-black/10"}`}>
                    {formData.commitment && <CheckCircle2 size={14} className="text-black" />}
                  </div>
                  <div className="space-y-3">
                    <p className={`text-sm md:text-base font-bold uppercase tracking-tight leading-tight ${formData.commitment ? "text-[#F3D7A7]" : "text-black"}`}>
                      I Commit to the 2-Month Sprint.
                    </p>
                    <p className={`text-[11px] md:text-xs leading-relaxed uppercase tracking-wider font-medium ${formData.commitment ? "text-white/60" : "text-black/40"}`}>
                      I will follow the curriculum entirely and understand that evaluation is based on execution results. I am ready to operate.
                    </p>
                  </div>
                </div>
                {/* Decorative background glow for active state */}
                {formData.commitment && (
                  <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#F3D7A7]/10 rounded-full blur-[80px]" />
                )}
              </motion.div>
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

const InputField = ({ label, placeholder, value, onChange, disabled = false, type = "text", ...props }: any) => (
  <div className="space-y-3 text-left group">
    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 group-focus-within:text-[#F3D7A7] transition-colors duration-300 block text-left">
      {label}
    </label>
    <div className="relative text-left">
      <input 
        type={type} 
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        disabled={disabled}
        className={`w-full bg-[#F5F5F7] border border-black/[0.03] rounded-xl px-6 py-4.5 text-lg font-bold tracking-tight focus:bg-white focus:border-[#F3D7A7]/50 focus:shadow-[0_10px_30px_rgba(0,0,0,0.03)] outline-none transition-all duration-500 placeholder:text-black/5 text-left ${disabled ? "opacity-40 cursor-not-allowed bg-black/[0.02]" : ""}`}
        {...props}
      />
    </div>
  </div>
);

const TextAreaField = ({ label, question, placeholder, value, onChange }: any) => (
  <div className="space-y-5 text-left group">
    <div className="space-y-1.5 text-left">
       <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F3D7A7] block text-left">{label}</label>
       <p className="text-xl font-bold tracking-tight text-black leading-tight text-left">{question}</p>
    </div>
    <textarea 
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#F5F5F7] border border-black/[0.03] rounded-2xl p-8 text-base font-medium leading-relaxed outline-none focus:bg-white focus:border-[#F3D7A7]/50 focus:shadow-[0_20px_40px_rgba(0,0,0,0.03)] min-h-[180px] transition-all duration-500 placeholder:text-black/10 text-left"
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
