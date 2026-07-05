"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, AlertCircle, CheckCircle2, Plus, Minus } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import Image from "next/image";

interface FAQItem {
  question: string;
  answer: string;
}

export default function CohortRegisterPage() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasExistingApp, setHasExistingApp] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    portfolioLink: "",
    primaryFocus: "Video Editing",
    whyReady: "",
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
      }));
    }

    const checkExisting = async () => {
      if (user) {
        const q = query(
          collection(db, "applications"),
          where("uid", "==", user.uid)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setHasExistingApp(true);
        }
      }
    };
    checkExisting();
  }, [user, profile, loading, router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.portfolioLink || !formData.whyReady) {
      toast.warning("Incomplete Form", {
        description: "Please fill out all the fields in the form.",
      });
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
          phone: profile?.phone || 'not provided',
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
      setErrorMessage(err.message || "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center font-mono rounded-none">
        <div className="flex flex-col items-center gap-4">
          <div className="w-6 h-6 border border-[#F3D7A7]/20 border-t-[#F3D7A7] animate-spin" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#F3D7A7]/60">Checking system clearance...</span>
        </div>
      </div>
    );
  }

  if (hasExistingApp && !showSuccess) {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center p-6 font-mono rounded-none">
        <div className="max-w-md w-full border border-white/10 bg-black p-10 text-left space-y-8 rounded-none">
          <div className="flex items-center gap-4 text-[#F3D7A7]">
            <AlertCircle size={24} />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">// SUBMISSION FOUND</span>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-white leading-none">Already Sent.</h2>
            <p className="text-white/40 text-xs leading-relaxed uppercase tracking-wider">
              We already have your application on file for Cohort 02. You can track your approval status directly inside your student dashboard.
            </p>
          </div>
          <div className="border-t border-white/10 pt-6 space-y-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-[10px] hover:bg-[#F3D7A7] transition-all flex items-center justify-center gap-2 cursor-pointer rounded-none border-none outline-none"
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
      <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center p-6 font-mono rounded-none">
        <div className="max-w-md w-full border border-white/10 bg-black p-10 text-left space-y-8 rounded-none">
          <div className="flex items-center gap-4 text-emerald-500">
            <CheckCircle2 size={24} />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">// TRANSMISSION SUCCESSFUL</span>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold uppercase tracking-tight text-white leading-none">Form Submitted.</h2>
            <p className="text-white/40 text-xs leading-relaxed uppercase tracking-wider">
              Thank you. Your details are now logged in the database. Our core review team will review your portfolio. Check back here or your email for results.
            </p>
          </div>
          <div className="border-t border-white/10 pt-6 space-y-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-[10px] hover:bg-[#F3D7A7] transition-all flex items-center justify-center gap-2 cursor-pointer rounded-none border-none outline-none"
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
    <main className="relative min-h-screen bg-[#020202] text-white selection:bg-[#F3D7A7] selection:text-black overflow-x-hidden font-sans rounded-none">
      
      {/* Top Header */}
      <header className="w-full h-20 border-b border-white/5 px-6 md:px-24 flex items-center justify-between">
        <button 
          onClick={() => router.push("/")}
          className="w-8 h-8 flex items-center justify-center cursor-pointer bg-transparent border-none outline-none"
        >
          <Image 
            src="/blade-logo.png" 
            alt="Blade Logo" 
            width={32} 
            height={32} 
            priority 
            className="w-full h-full object-contain brightness-0 invert" 
          />
        </button>
        <div className="flex items-center gap-4 font-mono text-[9px] md:text-[10px] text-white/40 uppercase tracking-widest">
          <span>USER: {user.email}</span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </header>

      {/* Main Form + Info Layout */}
      <div className="max-w-6xl mx-auto w-full px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Hero & Roadmap Grid */}
          <div className="lg:col-span-6 space-y-12 text-left">
            
            {/* Hero Details */}
            <div className="space-y-6">
              <div className="w-fit border border-[#F3D7A7]/30 bg-[#F3D7A7]/5 px-4 py-1.5 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-[#F3D7A7] rounded-none">
                STARTING 29TH AUGUST 2026
              </div>
              
              <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-mono leading-none">
                BLADE INNER CIRCLE <br />
                <span className="font-serif italic font-normal text-[#F3D7A7] lowercase tracking-normal normal-case">// cohort 02</span>
              </h1>
              
              <p className="text-white/40 text-xs md:text-sm font-mono uppercase tracking-widest leading-relaxed max-w-md">
                Engineered by Blade Media. 2.5 Billion+ views driven.
              </p>
            </div>

            {/* 8-Week Roadmap Connected Grid Table */}
            <div className="space-y-6">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] block font-mono">
                The 8-Week Operational Roadmap
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10 overflow-hidden text-left font-mono rounded-none">
                
                <div className="p-6 bg-black flex flex-col justify-between h-36 rounded-none">
                  <span className="text-[10px] text-[#F3D7A7] font-bold tracking-widest uppercase">// WEEKS 01 - 02</span>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Fundamentals</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-wide">Learn pacing, video retention dynamics, and hooks.</p>
                  </div>
                </div>

                <div className="p-6 bg-black flex flex-col justify-between h-36 rounded-none">
                  <span className="text-[10px] text-[#F3D7A7] font-bold tracking-widest uppercase">// WEEKS 03 - 04</span>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Offer & Brand</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-wide">Position your profile and design high-ticket retainers.</p>
                  </div>
                </div>

                <div className="p-6 bg-black flex flex-col justify-between h-36 rounded-none">
                  <span className="text-[10px] text-[#F3D7A7] font-bold tracking-widest uppercase">// WEEKS 05 - 06</span>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Capital Extraction</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-wide">Master outreach scripts and close client deals.</p>
                  </div>
                </div>

                <div className="p-6 bg-black flex flex-col justify-between h-36 rounded-none">
                  <span className="text-[10px] text-[#F3D7A7] font-bold tracking-widest uppercase">// WEEKS 07 - 08</span>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Velocity Scale</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-wide">Delegate editing using SOPs and recruit team members.</p>
                  </div>
                </div>

              </div>

              {/* Goal Metric Highlight Box */}
              <div className="border border-[#F3D7A7]/20 bg-[#F3D7A7]/5 p-6 font-mono flex items-center justify-between rounded-none">
                <span className="text-[9px] text-[#F3D7A7]/70 font-bold uppercase tracking-widest">// TARGET PERFORMANCE METRIC</span>
                <div className="text-right">
                  <span className="text-white/40 text-[8px] uppercase tracking-widest block mb-0.5">REVENUE RANGE</span>
                  <span className="text-white text-sm md:text-base font-bold uppercase tracking-wide">₹50k - ₹1L/Month</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Form Container */}
          <div className="lg:col-span-6 w-full">
            <form onSubmit={handleSubmit} className="border border-white/10 bg-black p-8 md:p-10 text-left space-y-8 font-mono rounded-none">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[9px] text-[#F3D7A7] font-bold uppercase tracking-widest block mb-1">// REGISTRATION PROTOCOL</span>
                <h2 className="text-xl font-bold uppercase text-white tracking-tight">ADMISSION FILE</h2>
              </div>

              {/* Full Name Input */}
              <div className="space-y-2">
                <label className="text-[9px] text-white/30 uppercase tracking-widest block">Full Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/10 p-4 text-xs font-mono uppercase tracking-wider text-white focus:outline-none focus:border-[#F3D7A7]/40 placeholder:text-white/10 rounded-none"
                />
              </div>

              {/* Email (Read Only) */}
              <div className="space-y-2">
                <label className="text-[9px] text-white/30 uppercase tracking-widest block">Email (Authenticated) *</label>
                <input 
                  type="email" 
                  readOnly
                  value={user.email || ""}
                  className="w-full bg-white/[0.01] border border-white/5 p-4 text-xs font-mono uppercase tracking-wider text-white/40 cursor-not-allowed outline-none rounded-none"
                />
              </div>

              {/* Portfolio Link / Social Handle */}
              <div className="space-y-2">
                <label className="text-[9px] text-white/30 uppercase tracking-widest block">Portfolio Link / Social Handle *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Behance, Instagram, or Drive link"
                  value={formData.portfolioLink}
                  onChange={(e) => handleInputChange("portfolioLink", e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/10 p-4 text-xs font-mono uppercase tracking-wider text-white focus:outline-none focus:border-[#F3D7A7]/40 placeholder:text-white/10 rounded-none"
                />
              </div>

              {/* Primary Focus dropdown */}
              <div className="space-y-2">
                <label className="text-[9px] text-white/30 uppercase tracking-widest block">Primary Focus *</label>
                <div className="relative">
                  <select 
                    value={formData.primaryFocus}
                    onChange={(e) => handleInputChange("primaryFocus", e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 p-4 text-xs font-mono uppercase tracking-wider text-white focus:outline-none focus:border-[#F3D7A7]/40 select-dark cursor-pointer appearance-none rounded-none"
                  >
                    <option value="Video Editing" className="bg-[#020202] text-white">Video Editing</option>
                    <option value="Meta Ads" className="bg-[#020202] text-white">Meta Ads</option>
                    <option value="Performance Marketing" className="bg-[#020202] text-white">Performance Marketing</option>
                    <option value="Copywriting" className="bg-[#020202] text-white">Copywriting</option>
                    <option value="Other" className="bg-[#020202] text-white">Other</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 text-[9px]">▼</div>
                </div>
              </div>

              {/* Statement of Readiness */}
              <div className="space-y-2">
                <label className="text-[9px] text-white/30 uppercase tracking-widest block leading-relaxed">
                  Why are you ready to switch from a consumer to a serious business operator? *
                </label>
                <textarea 
                  required 
                  placeholder="Tell us why you are ready to build a business..."
                  value={formData.whyReady}
                  onChange={(e) => handleInputChange("whyReady", e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/10 p-6 text-xs font-mono uppercase tracking-wider text-white focus:outline-none focus:border-[#F3D7A7]/40 min-h-[140px] placeholder:text-white/10 rounded-none"
                />
              </div>

              {errorMessage && (
                <p className="text-red-500 text-[10px] font-mono uppercase tracking-widest leading-normal text-left">{errorMessage}</p>
              )}

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#F3D7A7] text-black py-5 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-none border-none outline-none"
              >
                {isSubmitting ? "TRANSMITTING DATA..." : "SUBMIT APPLICATION FOR COHORT 02"}
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Q&A / FAQ Accordion Section at the bottom */}
      <section className="py-24 px-6 md:px-24 bg-black border-t border-white/5 relative">
        <div className="max-w-4xl mx-auto relative z-10 text-left">
          
          <div className="mb-16">
            <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] font-mono font-bold block mb-4">
              COMMON QUESTIONS
            </span>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white leading-none">
              Questions & <span className="font-serif italic font-normal text-[#F3D7A7] lowercase tracking-normal">answers.</span>
            </h2>
          </div>

          <div className="border-t border-white/10 divide-y divide-white/10">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className="py-6">
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-6 text-left cursor-pointer group bg-transparent border-none outline-none"
                  >
                    <span className={`text-base font-bold uppercase tracking-tight transition-colors duration-300 ${
                      isOpen ? "text-[#F3D7A7]" : "text-white/80 group-hover:text-white"
                    }`}>
                      {faq.question}
                    </span>
                    <div className={isOpen ? "text-[#F3D7A7]" : "text-white/30"}>
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="pt-4 pr-12 text-xs md:text-sm font-mono leading-relaxed text-white/40 uppercase tracking-wide">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="w-full h-20 border-t border-white/5 flex items-center justify-center font-mono text-[9px] text-white/20 uppercase tracking-[0.6em]">
        © 2026 Blade // Institutional Access
      </footer>
    </main>
  );
}
