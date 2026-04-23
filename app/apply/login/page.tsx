"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "@/lib/firebase"; 
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  signInWithEmailAndPassword,
  EmailAuthProvider,
  linkWithCredential
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { ArrowRight, ShieldCheck, Mail, User, ArrowLeft, Lock, Fingerprint, Chrome } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

function LoginContent() {
  const { setProfile, loginWithGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // UI State
  const [authMode, setAuthMode] = useState<"otp" | "password">("otp");
  const [step, setStep] = useState(1); // 1: Email/Info, 2: OTP/Password, 3: Set Password
  const [loading, setLoading] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  // Pre-fill email from URL (PostHog style)
  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
      });
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Identity Authorized via Google.");
      router.push("/apply/register");
    } catch (error: any) {
      toast.error("Google Authentication failed.");
    }
    setLoading(false);
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phoneNumber) {
      toast.error("Please fill in all institutional fields.");
      return;
    }
    
    setLoading(true);
    setupRecaptcha();
    const appVerifier = (window as any).recaptchaVerifier;
    try {
      const result = await signInWithPhoneNumber(auth, `+91${phoneNumber}`, appVerifier);
      setConfirmationResult(result);
      setStep(2);
      toast.success("Verification code sent.");
    } catch (error: any) {
      toast.error("OTP Dispatch failed. Try Google Login.");
    }
    setLoading(false);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await confirmationResult.confirm(otp);
      const user = userCredential.user;
      const profileDoc = await getDoc(doc(db, "users", user.uid));
      
      if (profileDoc.exists()) {
        setProfile(profileDoc.data() as any);
        toast.success("Welcome back.");
        router.push("/apply/register");
      } else {
        setStep(3); // New user needs to set password
      }
    } catch (error: any) {
      toast.error("Invalid access key.");
    }
    setLoading(false);
  };

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        const credential = EmailAuthProvider.credential(email, password);
        await linkWithCredential(user, credential);
        const profile = { uid: user.uid, name, email, phone: phoneNumber, createdAt: serverTimestamp() };
        await setDoc(doc(db, "users", user.uid), profile, { merge: true });
        setProfile(profile as any);
        router.push("/apply/register");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const profileDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      if (profileDoc.exists()) {
        setProfile(profileDoc.data() as any);
        router.push("/apply/register");
      } else {
        toast.error("Profile not found.");
      }
    } catch (error: any) {
      toast.error("Invalid credentials.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col md:flex-row font-sans relative selection:bg-[#F3D7A7]">
      <div id="recaptcha-container"></div>

      <div className="fixed top-8 left-8 z-[120]">
        <button onClick={() => router.push("/")} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
        </button>
      </div>
      
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 py-24 border-r border-black/5 relative overflow-hidden">
        <div className="max-w-sm w-full mx-auto relative z-10">
          <div className="mb-12 text-center md:text-left">
            <img src="/bic-black.png" alt="BIC" className="h-8 mb-8 mx-auto md:mx-0" />
            <h1 className="text-4xl font-bold uppercase tracking-tighter leading-none mb-3">
              {step === 3 ? "Secure Account" : "Access Archive"}
            </h1>
            <p className="text-black/40 text-[10px] font-bold uppercase tracking-widest">
              Institutional Gateway for Cohort 01
            </p>
          </div>

          {step === 1 && (
            <div className="space-y-4 mb-8">
              <button 
                onClick={handleGoogleAuth}
                disabled={loading}
                className="w-full py-4 bg-[#F9F9F9] text-black border border-black/5 rounded-sm flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-all duration-300 group"
              >
                <Chrome size={18} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Continue with Google</span>
              </button>
              
              <div className="flex items-center gap-4 text-black/10">
                <div className="h-px bg-black/5 flex-1" />
                <span className="text-[8px] uppercase tracking-widest font-bold">OR</span>
                <div className="h-px bg-black/5 flex-1" />
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="flex gap-1 bg-[#F9F9F9] p-1 rounded-sm mb-8">
                  <button onClick={() => setAuthMode("otp")} className={`flex-1 py-2 text-[9px] font-bold uppercase tracking-widest transition-all ${authMode === "otp" ? "bg-white shadow-sm" : "text-black/30"}`}>New Entry</button>
                  <button onClick={() => setAuthMode("password")} className={`flex-1 py-2 text-[9px] font-bold uppercase tracking-widest transition-all ${authMode === "password" ? "bg-white shadow-sm" : "text-black/30"}`}>Returning</button>
                </div>

                <form onSubmit={authMode === "otp" ? handleSendOTP : handlePasswordLogin} className="space-y-6">
                  {authMode === "otp" && <InputField icon={<User size={16}/>} label="Full Name" value={name} onChange={setName} placeholder="Your Name" />}
                  <InputField icon={<Mail size={16}/>} label="Institutional Email" value={email} onChange={setEmail} placeholder="name@email.com" type="email" />
                  {authMode === "otp" && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 px-1">Mobile Number</label>
                      <div className="flex items-center gap-4 bg-[#F9F9F9] px-6 rounded-sm">
                        <span className="text-[10px] font-bold text-black/40">+91</span>
                        <input required type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))} placeholder="00000 00000" className="w-full bg-transparent border-none py-4 text-sm outline-none" maxLength={10} />
                      </div>
                    </div>
                  )}
                  {authMode === "password" && <InputField icon={<Lock size={16}/>} label="Password" value={password} onChange={setPassword} placeholder="••••••••" type="password" />}
                  <AuthButton loading={loading} text={authMode === "otp" ? "Get Access Key" : "Authorize Entry"} icon={<ArrowRight size={16}/>} />
                </form>
              </motion.div>
            ) : step === 2 ? (
              <motion.form key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} onSubmit={handleVerifyOTP} className="space-y-6 text-center">
                <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-4">Verification Sent to +91 {phoneNumber}</p>
                <input required type="text" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} placeholder="• • • • • •" className="w-full bg-[#F9F9F9] border-none py-6 px-6 rounded-sm text-center text-4xl tracking-[0.4em] font-bold focus:ring-1 focus:ring-[#F3D7A7] outline-none transition-all" maxLength={6} />
                <AuthButton loading={loading} text="Verify Key" icon={<ShieldCheck size={16}/>} />
                <button type="button" onClick={() => setStep(1)} className="text-[10px] uppercase tracking-widest font-bold text-black/30 hover:text-black">Edit Details</button>
              </motion.form>
            ) : (
              <motion.form key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} onSubmit={handleSetPassword} className="space-y-6">
                <InputField icon={<Lock size={16}/>} label="Create Password" value={password} onChange={setPassword} placeholder="Min 6 characters" type="password" />
                <AuthButton loading={loading} text="Finalize Account" icon={<ShieldCheck size={16}/>} />
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-[#F9F9F9] hidden md:flex flex-col justify-center px-20 py-24 relative overflow-hidden">
        <div className="max-w-md w-full mx-auto space-y-12 relative z-10 text-left">
          <div className="space-y-4">
            <span className="text-[#F3D7A7] text-[10px] font-bold uppercase tracking-[0.6em] block">Data Protocol 2.0</span>
            <h2 className="text-5xl font-bold uppercase tracking-tighter leading-[0.9]">Speed. <br/>Security. <br/>Exclusivity.</h2>
          </div>
          <div className="space-y-8">
            <ValueProp title="Instant Auth" desc="Use Google for 1-click access to the archive. Speed is the only advantage." />
            <ValueProp title="Verified Entry" desc="Our OTP gateway ensures every applicant is a verified real-world operator." />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HybridLogin() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <LoginContent />
    </Suspense>
  );
}

const InputField = ({ label, icon, value, onChange, placeholder, type = "text" }: any) => (
  <div className="group space-y-1">
    <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 px-1">{label}</label>
    <div className="flex items-center gap-4 bg-[#F9F9F9] px-6 rounded-sm focus-within:ring-1 focus-within:ring-[#F3D7A7] transition-all">
      <span className="text-black/10">{icon}</span>
      <input required type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-transparent border-none py-4 text-sm outline-none placeholder:text-black/10" />
    </div>
  </div>
);

const AuthButton = ({ loading, text, icon }: any) => (
  <button type="submit" disabled={loading} className="w-full py-4 bg-black text-white rounded-sm flex items-center justify-center gap-3 hover:bg-[#F3D7A7] hover:text-black transition-all duration-500 group">
    <span className="text-[10px] uppercase tracking-[0.3em] font-bold">{loading ? "Wait..." : text}</span>
    <span className="group-hover:translate-x-1 transition-transform">{icon}</span>
  </button>
);

const ValueProp = ({ title, desc }: any) => (
  <div className="space-y-2">
    <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/80">{title}</h4>
    <p className="text-xs text-black/40 leading-relaxed font-light">{desc}</p>
  </div>
);