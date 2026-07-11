"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, AlertCircle, CheckCircle2, Zap, ShieldCheck, Plus, Minus } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

export default function CohortRegisterPageClient() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasExistingApp, setHasExistingApp] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    portfolioLink: "",
    primaryFocus: "Learn a High-Income Skill",
    whyReady: "",
    commitment: false,
  });

  const faqs: FAQItem[] = [
    {
      question: "When does Cohort 02 start?",
      answer: "Cohort 02 starts live classes on August 29, 2026. We will open setup materials two weeks earlier so you can get ready."
    },
    {
      question: "How does the selection process work?",
      answer: "After you submit this form, our team reviews your answers and portfolio. If you are a good fit, we will email you an official invite pass within 48 hours."
    },
    {
      question: "What is the goal of this program?",
      answer: "Our target is to help you learn real business skills and client outreach systems so you can build a freelance business making ₹50k to ₹1L per month."
    },
    {
      question: "Are there any upfront fees to apply?",
      answer: "No. Sending in your application is completely free. Payment and workspace access details are only sent if your application gets approved."
    }
  ];

  useEffect(() => {
    if (!loading && !user) {
      router.push("/apply/login");
      return;
    }

    if (profile) {
      setFormData(prev => ({
        ...prev,
        name: profile.name || "",
        phone: profile.phone || "",
      }));
    }

    const checkExisting = async () => {
      if (user) {
        try {
          const idToken = await user.getIdToken();
          const res = await fetch("/api/apply", {
            headers: {
              "Authorization": `Bearer ${idToken}`
            }
          });
          const data = await res.json();
          if (data.success && data.applications && data.applications.length > 0) {
            setHasExistingApp(true);
          }
        } catch (err) {
          console.error("Error checking existing application:", err);
        }
      }
    };
    checkExisting();
  }, [user, profile, loading, router]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.portfolioLink || !formData.whyReady || !formData.commitment) {
      toast.warning("Incomplete Form", {
        description: "Please fill out all fields and agree to the sprint commitment.",
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
          name: formData.name,
          email: user?.email,
          phone: formData.phone,
          instagram: (profile as any)?.instagram || 'not provided',
          portfolioLink: formData.portfolioLink,
          primaryFocus: formData.primaryFocus,
          whyReady: formData.whyReady,
          uid: user?.uid,
          cohort: "Cohort 02",
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit application.");
      }

      setShowSuccess(true);
      toast.success("Application Sent", {
        description: "We have successfully received your form.",
      });
    } catch (err: any) {
      console.error(err);
      toast.error("Error Sending", {
        description: "Something went wrong. Please check your network and try again.",
      });
      setErrorMessage(err.message || "FAILED TO TRANSMIT APPLICATION PORTFOLIO.");
      setIsSubmitting(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-6 h-6 border-2 border-black/10 border-t-black rounded-full animate-spin" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-black/40">Gating access gateway...</span>
        </div>
      </div>
    );
  }

  if (hasExistingApp && !showSuccess) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] text-black flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full border border-black/5 bg-white p-10 text-left space-y-8 shadow-sm rounded-2xl">
          <div className="flex items-center gap-4 text-[#F3D7A7]">
            <AlertCircle size={24} className="text-black" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-black/40">{"// SUBMISSION FOUND"}</span>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold uppercase tracking-tight leading-none">Already Sent.</h2>
            <p className="text-black/40 text-xs leading-relaxed uppercase tracking-wider">
              We already have your application on file for Cohort 02. You can track your approval status directly inside your student dashboard.
            </p>
          </div>
          <div className="border-t border-black/5 pt-6 space-y-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest text-[10px] hover:bg-[#F3D7A7] hover:text-black transition-all flex items-center justify-center gap-2 cursor-pointer border-none rounded-xl"
            >
              <span>Go to Student Profile</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] text-black flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full border border-black/5 bg-white p-10 text-left space-y-8 shadow-sm rounded-2xl">
          <div className="flex items-center gap-4 text-emerald-500">
            <CheckCircle2 size={24} />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-black/40">{"// SUBMISSION SUCCESSFUL"}</span>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold uppercase tracking-tight leading-none">Form Submitted.</h2>
            <p className="text-black/40 text-xs leading-relaxed uppercase tracking-wider">
              Thank you. Your details are now logged. Our core review team will review your portfolio. Check back in your profile for results.
            </p>
          </div>
          <div className="border-t border-black/5 pt-6 space-y-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest text-[10px] hover:bg-[#F3D7A7] hover:text-black transition-all flex items-center justify-center gap-2 cursor-pointer border-none rounded-xl"
            >
              <span>Go to Student Profile</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-white text-black selection:bg-[#F3D7A7] selection:text-black overflow-x-hidden font-sans">
      
      {/* Split Columns Section */}
      <div className="min-h-screen flex flex-col md:flex-row relative">
        
        {/* Left Column: Form (60% width) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full md:w-[60%] bg-white px-6 md:px-20 py-20 overflow-y-auto"
        >
          <div className="max-w-xl mx-auto text-left">
            
            {/* Header */}
            <header className="mb-16 text-left">
              <h1 className="text-4xl font-extrabold uppercase tracking-tighter mb-2 text-left leading-none">
                Admission <span className="font-serif italic font-normal text-[#F3D7A7] lowercase tracking-normal normal-case">portfolio.</span>
              </h1>
              <p className="text-black/30 text-[10px] font-bold uppercase tracking-[0.2em] text-left">August 2026 Batch // Cohort 02 Entry</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-12 text-left">
              
              {/* Identity Section */}
              <div className="space-y-8 text-left">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#F3D7A7] text-left">01. Identity Verification</h3>
                <div className="grid grid-cols-1 gap-8">
                  
                  {/* Name field */}
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 block">
                      Full Name *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="w-full bg-[#F5F5F7] border border-black/[0.03] rounded-xl px-6 py-4 text-base font-bold tracking-tight focus:bg-white focus:border-[#F3D7A7]/50 focus:shadow-[0_10px_30px_rgba(0,0,0,0.03)] outline-none transition-all duration-500 placeholder:text-black/10"
                    />
                  </div>

                  {/* Email field (Read Only) */}
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 block">
                      Verified Email *
                    </label>
                    <input 
                      type="email"
                      readOnly
                      value={user.email || ""}
                      className="w-full bg-[#F5F5F7] border border-black/[0.03] rounded-xl px-6 py-4 text-base font-bold tracking-tight text-black/40 cursor-not-allowed outline-none"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 block">
                      Contact Number *
                    </label>
                    <input 
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full bg-[#F5F5F7] border border-black/[0.03] rounded-xl px-6 py-4 text-base font-bold tracking-tight focus:bg-white focus:border-[#F3D7A7]/50 focus:shadow-[0_10px_30px_rgba(0,0,0,0.03)] outline-none transition-all duration-500 placeholder:text-black/10"
                    />
                  </div>

                </div>
              </div>

              {/* Focus Section */}
              <div className="space-y-8 text-left">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#F3D7A7] text-left">02. Focus & Intent</h3>
                <div className="grid grid-cols-1 gap-8">
                  
                  {/* Portfolio field */}
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 block">
                      Portfolio Link / Social Handle *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Behance, Instagram, or Drive link"
                      value={formData.portfolioLink}
                      onChange={(e) => handleInputChange("portfolioLink", e.target.value)}
                      className="w-full bg-[#F5F5F7] border border-black/[0.03] rounded-xl px-6 py-4 text-base font-bold tracking-tight focus:bg-white focus:border-[#F3D7A7]/50 focus:shadow-[0_10px_30px_rgba(0,0,0,0.03)] outline-none transition-all duration-500 placeholder:text-black/10"
                    />
                  </div>

                  {/* Primary Focus dropdown */}
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 block">
                      Primary Focus *
                    </label>
                    <div className="relative">
                      <select 
                        value={formData.primaryFocus}
                        onChange={(e) => handleInputChange("primaryFocus", e.target.value)}
                        className="w-full bg-[#F5F5F7] border border-black/[0.03] rounded-xl px-6 py-4 text-base font-bold tracking-tight focus:bg-white focus:border-[#F3D7A7]/50 focus:shadow-[0_10px_30px_rgba(0,0,0,0.03)] outline-none transition-all duration-500 cursor-pointer appearance-none text-black"
                      >
                        <option value="Learn a High-Income Skill">Learn a High-Income Skill</option>
                        <option value="Start a Creative / Marketing Agency">Start a Creative / Marketing Agency</option>
                        <option value="Land a Job in a Marketing Role">Land a Job in a Marketing Role</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-black/40 text-xs">▼</div>
                    </div>
                  </div>

                  {/* Why ready textarea */}
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 block">
                      Why are you ready to switch from a consumer to a serious business operator? *
                    </label>
                    <textarea 
                      required
                      placeholder="Tell us why you are ready to build a business..."
                      value={formData.whyReady}
                      onChange={(e) => handleInputChange("whyReady", e.target.value)}
                      className="w-full bg-[#F5F5F7] border border-black/[0.03] rounded-2xl p-8 text-base font-medium leading-relaxed outline-none focus:bg-white focus:border-[#F3D7A7]/50 focus:shadow-[0_20px_40px_rgba(0,0,0,0.03)] min-h-[180px] transition-all duration-500 placeholder:text-black/10"
                    />
                  </div>

                </div>
              </div>

              {/* Commitment Section */}
              <div className="space-y-8 text-left pt-6">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#F3D7A7] text-left">
                  03. Institutional Commitment
                </h3>
                
                <div 
                  onClick={() => handleInputChange("commitment", !formData.commitment)}
                  className={`relative overflow-hidden cursor-pointer p-8 rounded-3xl transition-all duration-500 border ${
                    formData.commitment 
                      ? "bg-black border-black text-white" 
                      : "bg-white border-black/5 text-black hover:border-[#F3D7A7]/30"
                  }`}
                >
                  <div className="flex items-start gap-6 relative z-10">
                    <div className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                      formData.commitment ? "bg-[#F3D7A7] border-[#F3D7A7]" : "border-black/15"
                    }`}>
                      {formData.commitment && (
                        <div className="w-2.5 h-2.5 rounded-full bg-black" />
                      )}
                    </div>
                    <div className="space-y-2 text-left">
                      <p className={`text-sm font-bold uppercase tracking-tight leading-tight ${
                        formData.commitment ? "text-[#F3D7A7]" : "text-black"
                      }`}>
                        I commit to the 2-month training program.
                      </p>
                      <p className={`text-[11px] leading-relaxed uppercase tracking-wider font-semibold ${
                        formData.commitment ? "text-white/60" : "text-black/40"
                      }`}>
                        I will follow the curriculum completely and do my best to complete all the tasks. I am ready to start.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Error messages */}
              {errorMessage && (
                <div className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-left font-mono">
                  COULD NOT SUBMIT: {errorMessage}
                </div>
              )}

              {/* CTA button */}
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-black text-white font-bold uppercase tracking-widest text-xs hover:bg-[#F3D7A7] hover:text-black transition-all duration-300 rounded-none border-none cursor-pointer flex items-center justify-center shadow-lg"
              >
                {isSubmitting ? "SENDING APPLICATION..." : "SUBMIT APPLICATION"}
              </motion.button>

            </form>

          </div>
        </motion.div>

        {/* Right Column: Commitment Info (40% width) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="w-full md:w-[40%] bg-[#F9F9F9] border-l border-black/5 px-8 md:px-16 py-20 text-left flex flex-col justify-between"
        >
          <div className="space-y-16">
            
            {/* Header info */}
            <div className="space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#F3D7A7] block">
                OUR TRACK RECORD
              </span>
              <h3 className="text-4xl font-extrabold uppercase tracking-tighter leading-none text-black">
                Built on <span className="font-serif italic font-normal text-[#F3D7A7] lowercase tracking-normal normal-case">results.</span>
              </h3>
              <p className="text-sm text-black/40 leading-relaxed font-light">
                Blade Inner Circle is powered by Blade Media, the digital agency behind some of the largest creators on the internet.
              </p>
            </div>

            {/* Program details */}
            <div className="space-y-10">
              
              <div className="flex gap-6 text-left">
                <div className="text-[#F3D7A7] mt-1"><Zap size={18} className="text-black" /></div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-black">2.5 Billion+ Views</h4>
                  <p className="text-[10px] text-black/40 uppercase tracking-[0.2em] leading-relaxed">
                    Our video systems have driven over 2.5 Billion views for top global brands and creators.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 text-left">
                <div className="text-[#F3D7A7] mt-1"><ShieldCheck size={18} className="text-black" /></div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-black">80+ Active Operators</h4>
                  <p className="text-[10px] text-black/40 uppercase tracking-[0.2em] leading-relaxed">
                    Over 80 students joined Cohort 01, learning video editing and how to get high-paying clients.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 text-left">
                <div className="text-[#F3D7A7] mt-1"><CheckCircle2 size={18} className="text-black" /></div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-black">₹50k - ₹1L Retainers</h4>
                  <p className="text-[10px] text-black/40 uppercase tracking-[0.2em] leading-relaxed">
                    Our graduates use our message templates to find and sign clients who pay them monthly.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Notice box */}
          <div className="p-8 bg-white border border-black/5 text-left rounded-xl mt-12 shadow-sm">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold mb-3 text-black">Notice</p>
            <p className="text-[11px] text-black/40 leading-relaxed font-semibold uppercase tracking-wider">
              Duplicate submissions or false information will result in permanent disqualification from the Blade ecosystem.
            </p>
          </div>

        </motion.div>

      </div>

      {/* Curriculum and Life Transformation Section */}
      <section className="py-24 px-6 md:px-24 bg-[#F9F9F9] border-t border-black/5 relative overflow-hidden">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] font-mono font-bold block">
              REAL TRANSFORMATION
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-black leading-none">
              How lives have <span className="font-serif italic font-normal text-[#F3D7A7] lowercase tracking-normal normal-case">changed.</span>
            </h2>
            <p className="text-sm text-black/50 leading-relaxed font-normal">
              This program is not a get-rich-quick blueprint. It takes real focus and work. But for people who commit, the results speak for themselves.
              Many of our students have quit jobs that drained their energy, built a reliable side-income to support their families, and gained the freedom to work from anywhere.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white border border-black/5 p-8 rounded-2xl shadow-sm space-y-6 flex flex-col justify-between h-fit"
          >
            <div className="space-y-2">
              <span className="text-[9px] text-[#F3D7A7] font-bold uppercase tracking-widest block font-mono">{"// TIMELINE & MILESTONES"}</span>
              <h4 className="text-lg font-bold uppercase tracking-tight text-black">WEEK-BY-WEEK PLAN</h4>
              <p className="text-xs text-black/40 leading-relaxed uppercase tracking-wider font-semibold">
                Explore the modules, resources, coaching calls, and client workflows inside the complete syllabus.
              </p>
            </div>
            
            <button
              onClick={() => router.push("/curriculum")}
              className="w-full py-4 bg-black text-white hover:bg-[#F3D7A7] hover:text-black transition-all font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 cursor-pointer border-none rounded-xl"
            >
              <span>View Full Prospectus</span>
              <ArrowRight size={14} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Expandable Q&A Section at the Bottom */}
      <section className="py-24 px-6 md:px-24 bg-white border-t border-black/5 relative">
        <div className="max-w-4xl mx-auto relative z-10 text-left">
          
          <div className="mb-16">
            <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] font-mono font-bold block mb-4">
              COMMON QUESTIONS
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-black leading-none">
              Questions & <span className="font-serif italic font-normal text-[#F3D7A7] lowercase tracking-normal normal-case">answers.</span>
            </h2>
          </div>

          <div className="border-t border-black/10 divide-y divide-black/10">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className="py-6">
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-6 text-left cursor-pointer bg-transparent border-none outline-none group"
                  >
                    <span className={`text-base font-bold uppercase tracking-tight transition-colors duration-300 ${
                      isOpen ? "text-[#F3D7A7]" : "text-black/80 group-hover:text-black"
                    }`}>
                      {faq.question}
                    </span>
                    <div className={isOpen ? "text-[#F3D7A7]" : "text-black/30"}>
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="pt-4 pr-12 text-xs md:text-sm font-sans leading-relaxed text-black/60">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Footer Branding & Internal Links */}
      <footer className="w-full py-12 border-t border-black/5 flex flex-col items-center justify-center gap-6 font-mono text-[9px] uppercase tracking-[0.2em] bg-white text-black/40">
        <div className="flex gap-8">
          <a href="/" className="hover:text-black transition-colors font-bold">Home</a>
          <a href="/curriculum" className="hover:text-black transition-colors font-bold">Curriculum</a>
          <a href="/terms" className="hover:text-black transition-colors font-bold">Terms</a>
          <a href="/privacy" className="hover:text-black transition-colors font-bold">Privacy</a>
        </div>
        <div className="text-[8px] tracking-[0.6em] text-black/20">
          © 2026 Blade // Institutional Access
        </div>
      </footer>
    </main>
  );
}
