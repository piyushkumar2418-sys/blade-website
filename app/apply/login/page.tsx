"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowRight, Star, Briefcase, TrendingUp, Users, ShieldCheck } from "lucide-react";

export default function MobileOTPLogin() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      // Logic to trigger backend OTP send would go here
      setStep(2);
    }
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      // Logic to verify OTP would go here
      window.location.href = "/apply/form";
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col md:flex-row">
      
      {/* LEFT SIDE: AUTHENTICATION */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 py-20 border-r border-black/5">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full mx-auto"
        >
          <div className="mb-12">
            <img src="/bic-black.png" alt="BIC" className="h-8 mb-6 object-contain" />
            <h1 className="text-3xl font-bold uppercase tracking-tighter">
              {step === 1 ? "Secure Access" : "Verify Identity"}
            </h1>
            <p className="text-black/40 text-xs uppercase tracking-widest mt-2">
              {step === 1 
                ? "Enter your mobile number to receive an access code" 
                : `Enter the 4-digit code sent to +91 ${phoneNumber}`}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.form 
                key="phoneStep"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSendOTP} 
                className="space-y-6"
              >
                <div className="group">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2 block">Mobile Number</label>
                  <div className="flex items-center gap-4 bg-[#F9F9F9] px-6 rounded-sm focus-within:ring-1 focus-within:ring-[#F3D7A7] transition-all">
                    <span className="text-sm font-bold text-black/40">+91</span>
                    <input 
                      required
                      type="tel" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                      placeholder="00000 00000"
                      className="w-full bg-transparent border-none py-4 text-sm outline-none"
                      maxLength={10}
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-black text-white rounded-sm flex items-center justify-center gap-3 hover:bg-[#F3D7A7] hover:text-black transition-all duration-500 group"
                >
                  <span className="text-xs uppercase tracking-widest font-bold">Request Access Code</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.form>
            ) : (
              <motion.form 
                key="otpStep"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleVerifyOTP} 
                className="space-y-6"
              >
                <div className="group">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2 block">4-Digit Code</label>
                  <input 
                    required
                    type="text" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="• • • •"
                    className="w-full bg-[#F9F9F9] border-none py-4 px-6 rounded-sm text-center text-2xl tracking-[1em] font-bold focus:ring-1 focus:ring-[#F3D7A7] outline-none transition-all"
                    maxLength={4}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-black text-white rounded-sm flex items-center justify-center gap-3 hover:bg-[#F3D7A7] hover:text-black transition-all duration-500 group"
                >
                  <span className="text-xs uppercase tracking-widest font-bold">Verify & Enter</span>
                  <ShieldCheck size={16} />
                </button>
                <button 
                  type="button" 
                  onClick={() => setStep(1)}
                  className="w-full text-[10px] uppercase tracking-widest font-bold text-black/30 hover:text-black transition-colors"
                >
                  Change Phone Number
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="text-[10px] text-black/30 uppercase tracking-widest mt-20 leading-relaxed">
            By continuing, you agree to receive automated <br/>service updates via SMS and WhatsApp.
          </p>
        </motion.div>
      </div>

      {/* RIGHT SIDE: THE BRIEFING */}
      <div className="w-full md:w-1/2 bg-[#F9F9F9] flex flex-col justify-center px-8 md:px-20 py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F3D7A7]/5 blur-[100px] rounded-full -mr-32 -mt-32" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-md w-full mx-auto space-y-12"
        >
          <div>
            <span className="text-[#F3D7A7] text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block text-left">The Institutional Promise</span>
            <h2 className="text-4xl font-bold uppercase tracking-tighter leading-none mb-6">
              Learn from the <br/> <span className="italic text-black/20">Market Practitioners.</span>
            </h2>
          </div>

          <div className="space-y-8">
            <ValueProp 
              icon={<Users />}
              title="Expert-Led Sprints"
              desc="Direct access to industry experts. No recorded generic content. Real-time system building."
            />
            <ValueProp 
              icon={<TrendingUp />}
              title="₹1L/Month Infrastructure"
              desc="The goal isn't just learning; it's building a complete agency system with high-ticket clients in 60 days."
            />
            <ValueProp 
              icon={<Briefcase />}
              title="Placement Ecosystem"
              desc="Full support for placement in partnered premium agencies or scaling your own entity."
            />
          </div>

          <div className="p-6 bg-white border border-black/5 rounded-sm">
            <p className="text-xs italic text-black/60 leading-relaxed">
              "We prepare you for the trenches. Admission is not a purchase—it is a selection based on intent."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const ValueProp = ({ icon, title, desc }: any) => (
  <div className="flex gap-6">
    <div className="h-12 w-12 bg-white border border-black/5 flex items-center justify-center shrink-0 shadow-sm text-[#F3D7A7]">
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <div className="text-left">
      <h4 className="text-xs font-bold uppercase tracking-widest mb-1">{title}</h4>
      <p className="text-sm text-black/50 leading-relaxed font-light">{desc}</p>
    </div>
  </div>
);