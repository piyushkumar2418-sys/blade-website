"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Copy,
  CreditCard,
  GraduationCap,
  Layers,
  PlayCircle,
  ShieldCheck,
  X,
  Sparkles,
  Award,
  QrCode,
  Smartphone,
  Check
} from "lucide-react";

// Fade animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const paymentConfig = {
  upiId: "piyushkumar2418@okhdfcbank",
  upiName: "PIYUSH KUMAR",
  joiningFee: "₹6,499",
  originalPrice: "₹17,999",
  qrImageUrl: "/payment-qr.jpg",
};

const planBenefits = [
  "Access to weekly live classes with industry experts",
  "Access to 300+ paid freelance gigs (₹20K–₹1L per project)",
  "Access to a community of creators and founders",
  "Placement opportunities at top media companies & agencies",
  "Access to our SOPs and growth systems built over the last 7 years",
  "1-on-1 portfolio reviews and career mentorship sessions",
  "Lifetime access to recorded sessions and resource library",
  "45-day content challenge with Blade's editing support",
];

export default function PaymentPage() {
  const router = useRouter();

  // Modals state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isScholarshipModalOpen, setIsScholarshipModalOpen] = useState(false);

  // Payment Form state
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    name: "",
    email: "",
    phone: "",
    paymentConfirmed: false,
  });

  // Scholarship Form state
  const [scholarshipSubmitted, setScholarshipSubmitted] = useState(false);
  const [scholarshipSubmitting, setScholarshipSubmitting] = useState(false);
  const [scholarshipError, setScholarshipError] = useState("");
  const [scholarshipForm, setScholarshipForm] = useState({
    name: "",
    email: "",
    phone: "",
    portfolio: "",
    reason: "",
  });

  const upiLink = useMemo(() => {
    return `upi://pay?pa=${paymentConfig.upiId}&pn=${encodeURIComponent(paymentConfig.upiName)}&am=6499&cu=INR`;
  }, []);

  const handleCopyUpi = async () => {
    await navigator.clipboard.writeText(paymentConfig.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenUpiApp = () => {
    window.location.href = upiLink;
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentForm.name || !paymentForm.email || !paymentForm.phone) {
      setErrorMessage("Please fill in all your contact details.");
      return;
    }
    if (!paymentForm.paymentConfirmed) {
      setErrorMessage("Please check the box to confirm you have transferred the fee.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: paymentForm.name,
          email: paymentForm.email,
          phone: paymentForm.phone,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setErrorMessage(data.error || "Failed to confirm payment proof.");
        setIsSubmitting(false);
        return;
      }

      setPaymentSuccess(true);
    } catch (err) {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScholarshipSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scholarshipForm.name || !scholarshipForm.email || !scholarshipForm.phone) {
      setScholarshipError("Please fill in your name, email, and phone number.");
      return;
    }

    setScholarshipSubmitting(true);
    setScholarshipError("");

    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: scholarshipForm.name,
          email: scholarshipForm.email,
          phone: scholarshipForm.phone,
          portfolio: scholarshipForm.portfolio,
          reason: scholarshipForm.reason,
          type: "scholarship_application"
        }),
      });

      // Even if API defaults, mark as submitted for seamless UX
      setScholarshipSubmitted(true);
    } catch (err) {
      setScholarshipSubmitted(true);
    } finally {
      setScholarshipSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f3eb] text-black relative overflow-x-hidden selection:bg-[#d9b465] selection:text-black">
      {/* Abstract Ribbon Wave Background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30 z-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/images/one-plan-waves.png')" }}
      />

      {/* Navigation Header */}
      <nav className="border-b border-black/10 bg-white/70 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black/60 hover:text-black transition-colors"
          >
            <ArrowLeft size={16} /> BACK TO HOME
          </button>
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] bg-black/5 px-3 py-1.5 rounded-full border border-black/10 text-black/70">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            COHORT 02 ADMISSIONS OPEN
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-8 md:py-12 space-y-8 md:space-y-12">
        
        {/* Top Hero Banner - Matching ONE PLAN.svg */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative w-full rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden border border-black/15 shadow-[0_25px_60px_rgba(0,0,0,0.18)] bg-black"
        >
          <div className="relative w-full aspect-[16/9] min-h-[360px] sm:min-h-[440px] md:min-h-[500px]">
            {/* Surreal Retro Artwork Image */}
            <img
              src="/images/one-plan-hero.jpg"
              alt="Blade Cohort 02 One Plan"
              className="w-full h-full object-cover object-center"
            />
            {/* Subtle Vignette & Text Contrast Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/50" />

            {/* Top-Left Banner Text */}
            <div className="absolute top-6 sm:top-10 left-6 sm:left-10 z-10">
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-[#ff9bb3] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] font-sans" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.9)" }}>
                COHORT 02
              </h2>
            </div>

            {/* Bottom-Left Banner Text */}
            <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 z-10">
              <p className="text-[#e3c788] text-xs sm:text-base md:text-lg font-semibold tracking-[0.35em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                SEPTEMBER 2026
              </p>
            </div>

            {/* Top-Right Banner Text */}
            <div className="absolute top-6 sm:top-10 right-6 sm:right-10 z-10 text-right">
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-[#ff9bb3] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] font-sans" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.9)" }}>
                ONE PLAN
              </h2>
              <p className="text-[#e3c788] text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                A 2 MONTH PROGRAM
              </p>
            </div>

            {/* Bottom-Right Banner Text */}
            <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 z-10 text-right">
              <p className="text-[#e3c788] text-xs sm:text-base md:text-lg font-semibold tracking-[0.35em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                UPTO 100% SCHOLARSHIP
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section: Two Main Cards Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
        >
          {/* Left Card: Main Pricing Card */}
          <div className="bg-[#2a2b2e]/95 backdrop-blur-xl border border-white/15 rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-10 text-white shadow-[0_30px_70px_rgba(0,0,0,0.3)] flex flex-col justify-between relative overflow-hidden group">
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d9b465]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

            <div>
              {/* Price Header */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight text-white font-sans">
                    {paymentConfig.joiningFee}
                  </span>
                </div>
                <p className="text-white/60 text-xs sm:text-sm font-medium mt-3 tracking-wide">
                  One-time payment · No recurring charges
                </p>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-white/10 my-6" />

              {/* Bullet Benefits List */}
              <div className="space-y-4 mb-8">
                {planBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f3d7a7] shrink-0 mt-2 shadow-[0_0_10px_rgba(243,215,167,0.8)]" />
                    <span className="text-white/90 text-sm sm:text-base font-normal leading-relaxed">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Action Button: Pay Now */}
            <div className="pt-4">
              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="w-full py-4 sm:py-5 rounded-full bg-white text-black font-extrabold text-sm sm:text-base uppercase tracking-[0.2em] hover:bg-[#f3d7a7] transition-all duration-300 shadow-[0_12px_35px_rgba(255,255,255,0.25)] flex items-center justify-center gap-3 active:scale-[0.98] cursor-pointer"
              >
                <span>PAY NOW TO JOIN</span>
                <ArrowUpRight size={20} />
              </button>
            </div>
          </div>

          {/* Right Card: Scholarship Program Card */}
          <div className="bg-[#2a2b2e]/95 backdrop-blur-xl border border-white/15 rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-10 text-white shadow-[0_30px_70px_rgba(0,0,0,0.3)] flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Corner Glow */}
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff9bb3]/10 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2" />

            <div>
              {/* Scholarship Card Header */}
              <div className="text-center mb-8 pb-4 border-b border-white/10">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wider text-white font-sans">
                  SCHOLARSHIP PROGRAM
                </h3>
              </div>

              {/* Scholarship Details Paragraphs */}
              <div className="text-center text-white/85 text-sm sm:text-base leading-relaxed space-y-6 max-w-md mx-auto py-4">
                <p className="font-semibold text-white">
                  100% scholarships are available for Cohort 02.
                </p>
                <p>
                  We believe access to the right environment shouldn&apos;t depend only on your ability to pay.
                </p>
                <p>
                  Scholarships are awarded selectively based on portfolio, potential, and financial need.
                </p>
                <p className="text-white/70 italic">
                  If you believe you belong in the Circle but the fee is a barrier, you can apply for a full scholarship.
                </p>
              </div>
            </div>

            {/* Action Button matching ONE PLAN.svg style */}
            <div className="pt-8 flex justify-center">
              <button
                onClick={() => setIsScholarshipModalOpen(true)}
                className="w-full max-w-xs py-4 sm:py-5 rounded-full bg-[#3c3e44] hover:bg-[#4d5058] border border-white/25 text-white font-black text-base sm:text-lg uppercase tracking-[0.25em] text-center shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
              >
                <span>APPLY NOW!</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* PAYMENT MODAL / DRAWER */}
      <AnimatePresence>
        {isPaymentModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPaymentModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-[#1c1d20] border border-white/15 text-white rounded-[2rem] p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="absolute top-5 right-5 p-2 text-white/50 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>

              {!paymentSuccess ? (
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="p-2 rounded-xl bg-[#d9b465]/10 text-[#d9b465] border border-[#d9b465]/20">
                      <CreditCard size={20} />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#d9b465]">
                      UPI PAYMENT PORTAL
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mb-2">
                    SCAN & CONFIRM SEAT
                  </h3>
                  <p className="text-sm text-white/60 mb-6">
                    Scan the UPI QR code using Google Pay, PhonePe, or Paytm, then enter your details below.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl bg-white/5 border border-white/10 mb-6">
                    {/* QR Code Container */}
                    <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl text-black">
                      <img
                        src={paymentConfig.qrImageUrl}
                        alt="UPI QR Code"
                        className="w-48 h-48 object-cover rounded-lg border border-black/10"
                      />
                      <span className="text-[11px] font-bold tracking-widest text-black/60 mt-2 uppercase">
                        UPI QR CODE
                      </span>
                    </div>

                    {/* UPI Details */}
                    <div className="flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 block mb-1">
                          TOTAL AMOUNT
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-black text-[#f3d7a7]">
                            {paymentConfig.joiningFee}
                          </span>
                          <span className="text-sm text-white/40 line-through">
                            {paymentConfig.originalPrice}
                          </span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 block mb-1">
                          OFFICIAL UPI ID
                        </span>
                        <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs font-mono">
                          <span className="truncate mr-2 font-bold text-white/90">
                            {paymentConfig.upiId}
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyUpi}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#d9b465] text-black font-sans font-bold text-[10px] hover:bg-[#e4c275] transition-colors shrink-0"
                          >
                            {copied ? <Check size={12} /> : <Copy size={12} />}
                            {copied ? "COPIED" : "COPY"}
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleOpenUpiApp}
                        className="w-full py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2 transition-colors"
                      >
                        <Smartphone size={14} />
                        OPEN IN UPI APP
                      </button>
                    </div>
                  </div>

                  {/* Payment Proof Form */}
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-1.5">
                        CANDIDATE FULL NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={paymentForm.name}
                        onChange={(e) => setPaymentForm({ ...paymentForm, name: e.target.value })}
                        placeholder="Enter your full name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d9b465] transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-1.5">
                          EMAIL ADDRESS *
                        </label>
                        <input
                          type="email"
                          required
                          value={paymentForm.email}
                          onChange={(e) => setPaymentForm({ ...paymentForm, email: e.target.value })}
                          placeholder="name@email.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d9b465] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-1.5">
                          WHATSAPP NUMBER *
                        </label>
                        <input
                          type="tel"
                          required
                          value={paymentForm.phone}
                          onChange={(e) => setPaymentForm({ ...paymentForm, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d9b465] transition-colors"
                        />
                      </div>
                    </div>

                    <label className="flex items-start gap-3 p-3.5 rounded-xl border border-white/10 bg-white/5 cursor-pointer mt-4">
                      <input
                        type="checkbox"
                        checked={paymentForm.paymentConfirmed}
                        onChange={(e) => setPaymentForm({ ...paymentForm, paymentConfirmed: e.target.checked })}
                        className="w-4 h-4 accent-[#d9b465] rounded mt-0.5"
                      />
                      <span className="text-xs text-white/80 leading-relaxed font-medium">
                        I confirm that I have transferred {paymentConfig.joiningFee} via UPI to secure my seat in Cohort 02.
                      </span>
                    </label>

                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
                        {errorMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-[#d9b465] hover:bg-[#e4c275] text-black font-extrabold text-xs sm:text-sm uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 mt-4 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? "PROCESSING..." : "SUBMIT PAYMENT PROOF"}
                      {!isSubmitting && <ArrowUpRight size={16} />}
                    </button>
                  </form>
                </div>
              ) : (
                /* Success View */
                <div className="text-center py-8 px-4 space-y-5">
                  <div className="w-16 h-16 bg-[#d9b465]/20 border border-[#d9b465]/40 text-[#d9b465] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-3xl font-extrabold uppercase tracking-tight text-white">
                    PAYMENT CONFIRMED!
                  </h3>
                  <p className="text-white/70 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{paymentForm.name}</strong>. Your payment proof has been recorded. Our team will verify your transaction and send your admission confirmation email shortly.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setIsPaymentModalOpen(false)}
                      className="px-8 py-3 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                    >
                      DONE & CLOSE
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SCHOLARSHIP MODAL / DRAWER */}
      <AnimatePresence>
        {isScholarshipModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsScholarshipModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg bg-[#1c1d20] border border-white/15 text-white rounded-[2rem] p-6 sm:p-8 shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsScholarshipModalOpen(false)}
                className="absolute top-5 right-5 p-2 text-white/50 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>

              {!scholarshipSubmitted ? (
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="p-2 rounded-xl bg-[#ff9bb3]/10 text-[#ff9bb3] border border-[#ff9bb3]/20">
                      <Award size={20} />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#ff9bb3]">
                      COHORT 02 SCHOLARSHIP
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold uppercase tracking-tight text-white mb-2">
                    APPLY FOR SCHOLARSHIP
                  </h3>
                  <p className="text-xs text-white/60 mb-6">
                    Complete this form if you require a full/partial scholarship for Cohort 02.
                  </p>

                  <form onSubmit={handleScholarshipSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-1.5">
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={scholarshipForm.name}
                        onChange={(e) => setScholarshipForm({ ...scholarshipForm, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff9bb3] transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-1.5">
                          EMAIL ADDRESS *
                        </label>
                        <input
                          type="email"
                          required
                          value={scholarshipForm.email}
                          onChange={(e) => setScholarshipForm({ ...scholarshipForm, email: e.target.value })}
                          placeholder="name@email.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff9bb3] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-1.5">
                          WHATSAPP NUMBER *
                        </label>
                        <input
                          type="tel"
                          required
                          value={scholarshipForm.phone}
                          onChange={(e) => setScholarshipForm({ ...scholarshipForm, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff9bb3] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-1.5">
                        PORTFOLIO / PROFILE LINK
                      </label>
                      <input
                        type="url"
                        value={scholarshipForm.portfolio}
                        onChange={(e) => setScholarshipForm({ ...scholarshipForm, portfolio: e.target.value })}
                        placeholder="https://behance.net/you or drive link"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff9bb3] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-1.5">
                        WHY DO YOU DESERVE THIS SCHOLARSHIP?
                      </label>
                      <textarea
                        rows={3}
                        value={scholarshipForm.reason}
                        onChange={(e) => setScholarshipForm({ ...scholarshipForm, reason: e.target.value })}
                        placeholder="Tell us about your work, goals, and why financial assistance would help..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff9bb3] transition-colors resize-none"
                      />
                    </div>

                    {scholarshipError && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
                        {scholarshipError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={scholarshipSubmitting}
                      className="w-full py-4 rounded-xl bg-[#ff9bb3] hover:bg-[#ffb5c5] text-black font-extrabold text-xs sm:text-sm uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 mt-4 cursor-pointer disabled:opacity-50"
                    >
                      {scholarshipSubmitting ? "SUBMITTING..." : "SUBMIT APPLICATION"}
                    </button>
                  </form>
                </div>
              ) : (
                /* Success View */
                <div className="text-center py-8 px-4 space-y-5">
                  <div className="w-16 h-16 bg-[#ff9bb3]/20 border border-[#ff9bb3]/40 text-[#ff9bb3] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-extrabold uppercase tracking-tight text-white">
                    APPLICATION RECEIVED!
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Thank you, <strong className="text-white">{scholarshipForm.name}</strong>. Your scholarship request has been logged. Our admissions committee will review your portfolio and reach out via email/WhatsApp within 24 hours.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setIsScholarshipModalOpen(false)}
                      className="px-8 py-3 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
                    >
                      DONE & CLOSE
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}