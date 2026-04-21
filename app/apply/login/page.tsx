"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "@/lib/firebase"; 
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ArrowRight, TrendingUp, Users, ShieldCheck, Mail, User, Phone } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function MobileOTPLogin() {
  const { setProfile } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Registration info, 2: OTP
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': () => {
          console.log("recaptcha resolved");
        },
        'expired-callback': () => {
          if ((window as any).recaptchaVerifier) {
            (window as any).recaptchaVerifier.clear();
            (window as any).recaptchaVerifier = null;
          }
        }
      });
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phoneNumber) {
      alert("Please fill in all fields.");
      return;
    }
    
    setLoading(true);
    setupRecaptcha();
    const appVerifier = (window as any).recaptchaVerifier;
    try {
      const result = await signInWithPhoneNumber(auth, `+91${phoneNumber}`, appVerifier);
      setConfirmationResult(result);
      setStep(2);
    } catch (error: any) {
      if (error.code === 'auth/billing-not-enabled') {
        alert("Real SMS requires a paid plan. \n\nPlease use Test Number: +91 99999 99999 with code 123456.");
      } else {
        alert("Error: " + error.message);
      }
      console.error(error);
      if (error.code === 'auth/internal-error' || error.code === 'auth/network-request-failed') {
        if ((window as any).recaptchaVerifier) {
          (window as any).recaptchaVerifier.clear();
          (window as any).recaptchaVerifier = null;
        }
      }
    }
    setLoading(false);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await confirmationResult.confirm(otp);
      const user = userCredential.user;

      // Create/Update user profile in Firestore
      const userProfile = {
        uid: user.uid,
        name: name,
        email: email,
        phone: phoneNumber,
        createdAt: serverTimestamp(),
      };

      await setDoc(doc(db, "users", user.uid), userProfile, { merge: true });
      setProfile(userProfile as any);

      window.location.href = "/apply/register"; 
    } catch (error) {
      console.error(error);
      alert("Invalid OTP.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col md:flex-row font-sans">
      <div id="recaptcha-container"></div>
      
      {/* LEFT SIDE: AUTHENTICATION */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 py-20 border-r border-black/5 text-left relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-black/[0.02] blur-[100px] rounded-full -ml-32 -mt-32" />
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full mx-auto relative z-10"
        >
          <div className="mb-12">
            <img src="/bic-black.png" alt="BIC" className="h-8 mb-6 object-contain" />
            <h1 className="text-4xl font-bold uppercase tracking-tighter leading-none mb-3">
              {step === 1 ? "Initialize <br/> Account" : "Verify <br/> Identity"}
            </h1>
            <p className="text-black/40 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
              {step === 1 
                ? "Enter your credentials to create your institutional profile" 
                : `Enter the 6-digit code sent to +91 ${phoneNumber}`}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.form 
                key="detailsStep"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSendOTP} 
                className="space-y-8"
              >
                <div className="space-y-6">
                  <div className="group space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 px-1">Full Name</label>
                    <div className="flex items-center gap-4 bg-[#F9F9F9] px-6 rounded-sm focus-within:ring-1 focus-within:ring-[#F3D7A7] transition-all">
                      <User size={16} className="text-black/20" />
                      <input 
                        required
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full bg-transparent border-none py-4 text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div className="group space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 px-1">Email Address</label>
                    <div className="flex items-center gap-4 bg-[#F9F9F9] px-6 rounded-sm focus-within:ring-1 focus-within:ring-[#F3D7A7] transition-all">
                      <Mail size={16} className="text-black/20" />
                      <input 
                        required
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@institution.com"
                        className="w-full bg-transparent border-none py-4 text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div className="group space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 px-1">Mobile Number</label>
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
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-black text-white rounded-sm flex items-center justify-center gap-3 hover:bg-[#F3D7A7] hover:text-black transition-all duration-500 group"
                >
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold">{loading ? "Initializing..." : "Request Access Code"}</span>
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
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2 block text-left">6-Digit Access Key</label>
                  <input 
                    required
                    type="text" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="• • • • • •"
                    className="w-full bg-[#F9F9F9] border-none py-5 px-6 rounded-sm text-center text-3xl tracking-[0.5em] font-bold focus:ring-1 focus:ring-[#F3D7A7] outline-none transition-all"
                    maxLength={6}
                  />
                </div>
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-black text-white rounded-sm flex items-center justify-center gap-3 hover:bg-[#F3D7A7] hover:text-black transition-all duration-500 group"
                >
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold">{loading ? "Verifying..." : "Authorize Access"}</span>
                  <ShieldCheck size={16} />
                </button>
                <button 
                  type="button" 
                  onClick={() => setStep(1)}
                  className="w-full text-[10px] uppercase tracking-widest font-bold text-black/30 hover:text-black transition-colors"
                >
                  Edit Profile Information
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="text-[9px] text-black/20 uppercase tracking-widest mt-24 leading-relaxed text-left max-w-[280px]">
            This is a secure institutional access point. Data is handled under military-grade encryption standards.
          </p>
        </motion.div>
      </div>

      {/* RIGHT SIDE: THE BRIEFING */}
      <div className="w-full md:w-1/2 bg-[#F9F9F9] flex flex-col justify-center px-8 md:px-20 py-20 relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F3D7A7]/5 blur-[120px] rounded-full -mr-48 -mt-48" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-md w-full mx-auto space-y-16 relative z-10"
        >
          <div className="text-left space-y-4">
            <span className="text-[#F3D7A7] text-[10px] font-bold uppercase tracking-[0.6em] block text-left">The Institutional Prospectus</span>
            <h2 className="text-5xl font-bold uppercase tracking-tighter leading-[0.9] text-left">
              Engineered for <br/> <span className="italic text-black/40">Market Outcomes.</span>
            </h2>
          </div>

          <div className="space-y-10 text-left">
            <ValueProp 
              title="Identity & Access"
              desc="Your profile acts as your portfolio across the Blade ecosystem. One account, total access."
            />
            <ValueProp 
              title="Cohort Integrity"
              desc="We maintain a 1:10 mentor-to-student ratio to ensure execution quality over scale."
            />
            <ValueProp 
              title="Verified Results"
              desc="Every system taught is backed by ₹3Cr+ in generated market revenue."
            />
          </div>

          <div className="p-8 bg-white border border-black/5 rounded-sm text-left">
            <p className="text-xs italic text-black/60 leading-relaxed text-left">
              &quot;Blade Inner Circle is not a curriculum. It is a transition from consumer to operator.&quot;
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const ValueProp = ({ title, desc }: any) => (
  <div className="space-y-2 text-left">
    <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/80 text-left">{title}</h4>
    <p className="text-sm text-black/40 leading-relaxed font-light text-left">{desc}</p>
  </div>
);