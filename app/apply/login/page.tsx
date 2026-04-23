"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
import { ArrowRight, ShieldCheck, Mail, User, Phone, ArrowLeft, Lock, Fingerprint } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function HybridLogin() {
  const { setProfile } = useAuth();
  const router = useRouter();
  
  // UI State
  const [authMode, setAuthMode] = useState<"otp" | "password">("otp");
  const [step, setStep] = useState(1); // 1: Info/Login, 2: OTP/Set Password, 3: Set Password
  const [loading, setLoading] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
      });
    }
  };

  // --- PATH 1: OTP REGISTRATION ---
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phoneNumber) {
      toast.error("All institutional fields are required.");
      return;
    }
    
    setLoading(true);
    setupRecaptcha();
    const appVerifier = (window as any).recaptchaVerifier;
    try {
      const result = await signInWithPhoneNumber(auth, `+91${phoneNumber}`, appVerifier);
      setConfirmationResult(result);
      setStep(2);
      toast.success("Access key dispatched to your device.");
    } catch (error: any) {
      toast.error(error.message);
      console.error(error);
    }
    setLoading(false);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error("Enter the complete 6-digit access key.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await confirmationResult.confirm(otp);
      const user = userCredential.user;

      // Check if user already has a profile
      const profileDoc = await getDoc(doc(db, "users", user.uid));
      
      if (profileDoc.exists()) {
        const existingData = profileDoc.data();
        setProfile(existingData as any);
        toast.success("Identity Verified. Welcome back.");
        router.push("/apply/register");
      } else {
        // New user - Move to Step 3 (Set Password)
        setStep(3);
        toast.success("Identity Verified. Secure your archive access.");
      }
    } catch (error: any) {
      toast.error("Invalid access key.");
    }
    setLoading(false);
  };

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Security key must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        // Link email/password to the phone account
        const credential = EmailAuthProvider.credential(email, password);
        await linkWithCredential(user, credential);

        const userProfile = {
          uid: user.uid,
          name: name,
          email: email,
          phone: phoneNumber,
          createdAt: serverTimestamp(),
        };

        await setDoc(doc(db, "users", user.uid), userProfile, { merge: true });
        setProfile(userProfile as any);
        toast.success("Institutional profile secured.");
        router.push("/apply/register");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  // --- PATH 2: PASSWORD LOGIN ---
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const profileDoc = await getDoc(doc(db, "users", user.uid));
      if (profileDoc.exists()) {
        setProfile(profileDoc.data() as any);
        toast.success("Archive access granted.");
        router.push("/apply/register");
      } else {
        toast.error("Profile not found. Use Institutional Entry.");
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
        <button 
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Entry
        </button>
      </div>
      
      {/* LEFT SIDE: AUTHENTICATION */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 py-24 border-r border-black/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-black/[0.02] blur-[100px] rounded-full -ml-32 -mt-32" />
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full mx-auto relative z-10"
        >
          {/* LOGO & TITLE */}
          <div className="mb-12">
            <img src="/bic-black.png" alt="BIC" className="h-8 mb-8 object-contain" />
            <h1 className="text-4xl font-bold uppercase tracking-tighter leading-none mb-3">
              {step === 3 ? "Secure Archive" : (authMode === "otp" ? "Institutional Entry" : "Archive Access")}
            </h1>
            <p className="text-black/40 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
              {step === 3 
                ? "Create your permanent security key" 
                : (authMode === "otp" ? "Verified entry for new applicants" : "Returning member authentication")}
            </p>
          </div>

          {/* MODE TOGGLE */}
          {step === 1 && (
            <div className="flex gap-1 bg-[#F9F9F9] p-1 rounded-sm mb-10">
              <button 
                onClick={() => setAuthMode("otp")}
                className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-all ${authMode === "otp" ? "bg-white shadow-sm text-black" : "text-black/30 hover:text-black"}`}
              >
                New Entry
              </button>
              <button 
                onClick={() => setAuthMode("password")}
                className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-all ${authMode === "password" ? "bg-white shadow-sm text-black" : "text-black/30 hover:text-black"}`}
              >
                Existing Member
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* STEP 1: OTP REGISTRATION */}
            {authMode === "otp" && step === 1 && (
              <motion.form 
                key="otpReg"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSendOTP} 
                className="space-y-6"
              >
                <InputField icon={<User size={16}/>} label="Full Name" value={name} onChange={setName} placeholder="John Doe" />
                <InputField icon={<Mail size={16}/>} label="Email Address" value={email} onChange={setEmail} placeholder="name@institution.com" type="email" />
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 px-1">Mobile Number</label>
                  <div className="flex items-center gap-4 bg-[#F9F9F9] px-6 rounded-sm">
                    <span className="text-sm font-bold text-black/40">+91</span>
                    <input required type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))} placeholder="00000 00000" className="w-full bg-transparent border-none py-4 text-sm outline-none" maxLength={10} />
                  </div>
                </div>
                <AuthButton loading={loading} text="Request Access Key" icon={<Fingerprint size={16}/>} />
              </motion.form>
            )}

            {/* STEP 2: OTP VERIFICATION */}
            {authMode === "otp" && step === 2 && (
              <motion.form 
                key="otpVerify"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                onSubmit={handleVerifyOTP} 
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 text-center block">6-Digit Access Key</label>
                  <input required type="text" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} placeholder="• • • • • •" className="w-full bg-[#F9F9F9] border-none py-5 px-6 rounded-sm text-center text-3xl tracking-[0.5em] font-bold focus:ring-1 focus:ring-[#F3D7A7] outline-none transition-all" maxLength={6} />
                </div>
                <AuthButton loading={loading} text="Verify Identity" icon={<ShieldCheck size={16}/>} />
                <button type="button" onClick={() => setStep(1)} className="w-full text-[10px] uppercase tracking-widest font-bold text-black/30 hover:text-black transition-colors">Edit Information</button>
              </motion.form>
            )}

            {/* STEP 3: SET PASSWORD */}
            {step === 3 && (
              <motion.form 
                key="setPassword"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSetPassword} 
                className="space-y-6"
              >
                <InputField icon={<Lock size={16}/>} label="Create Security Key" value={password} onChange={setPassword} placeholder="••••••••" type="password" />
                <AuthButton loading={loading} text="Secure Profile" icon={<ShieldCheck size={16}/>} />
              </motion.form>
            )}

            {/* PASSWORD LOGIN PATH */}
            {authMode === "password" && step === 1 && (
              <motion.form 
                key="passLogin"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                onSubmit={handlePasswordLogin} 
                className="space-y-6"
              >
                <InputField icon={<Mail size={16}/>} label="Email Address" value={email} onChange={setEmail} placeholder="name@institution.com" type="email" />
                <InputField icon={<Lock size={16}/>} label="Security Key" value={password} onChange={setPassword} placeholder="••••••••" type="password" />
                <AuthButton loading={loading} text="Authorize Access" icon={<ShieldCheck size={16}/>} />
              </motion.form>
            )}
          </AnimatePresence>

          <p className="text-[9px] text-black/20 uppercase tracking-widest mt-24 leading-relaxed text-left max-w-[280px]">
            This is a secure institutional access point. Profile data is encrypted and stored under global security standards.
          </p>
        </motion.div>
      </div>

      {/* RIGHT SIDE: THE BRIEFING */}
      <div className="w-full md:w-1/2 bg-[#F9F9F9] flex flex-col justify-center px-8 md:px-20 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F3D7A7]/5 blur-[120px] rounded-full -mr-48 -mt-48" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="max-w-md w-full mx-auto space-y-16 relative z-10"
        >
          <div className="space-y-4">
            <span className="text-[#F3D7A7] text-[10px] font-bold uppercase tracking-[0.6em] block">Institutional Archive</span>
            <h2 className="text-5xl font-bold uppercase tracking-tighter leading-[0.9]">
              Elite Access. <br/>Verified Entry.
            </h2>
          </div>

          <div className="space-y-10">
            <ValueProp title="Archive Security" desc="Every account is tied to a verified mobile device and protected by your custom security key." />
            <ValueProp title="Identity Control" desc="Manage your portfolio, cohort status, and market outcomes from a single secure portal." />
          </div>

          <div className="p-8 bg-white border border-black/5 rounded-sm">
            <p className="text-xs italic text-black/60 leading-relaxed font-light">
              &quot;Access is not granted. It is earned through verification.&quot;
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const InputField = ({ label, icon, value, onChange, placeholder, type = "text" }: any) => (
  <div className="group space-y-2">
    <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 px-1">{label}</label>
    <div className="flex items-center gap-4 bg-[#F9F9F9] px-6 rounded-sm focus-within:ring-1 focus-within:ring-[#F3D7A7] transition-all">
      <span className="text-black/20">{icon}</span>
      <input 
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border-none py-4 text-sm outline-none"
      />
    </div>
  </div>
);

const AuthButton = ({ loading, text, icon }: any) => (
  <button 
    type="submit"
    disabled={loading}
    className="w-full py-5 bg-black text-white rounded-sm flex items-center justify-center gap-3 hover:bg-[#F3D7A7] hover:text-black transition-all duration-500 group"
  >
    <span className="text-[10px] uppercase tracking-[0.4em] font-bold">{loading ? "Verifying..." : text}</span>
    <span className="group-hover:translate-x-1 transition-transform">{icon}</span>
  </button>
);

const ValueProp = ({ title, desc }: any) => (
  <div className="space-y-2">
    <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/80">{title}</h4>
    <p className="text-sm text-black/40 leading-relaxed font-light">{desc}</p>
  </div>
);