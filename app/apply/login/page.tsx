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
import { doc, setDoc, getDoc, serverTimestamp, collection, query, where, getDocs } from "firebase/firestore";
import { ArrowRight, ShieldCheck, Mail, User, ArrowLeft, Lock, Fingerprint, Globe } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

function LoginContent() {
  const { setProfile, loginWithGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // UI State
  const [authMode, setAuthMode] = useState<"register" | "login">("register");
  const [step, setStep] = useState(1); // 1: Info/Email, 2: OTP/Password, 3: Set Password
  const [loading, setLoading] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) setEmail(emailParam);
  }, [searchParams]);

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { 'size': 'invisible' });
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Welcome to the Circle.");
      router.push("/apply/register");
    } catch (error: any) {
      toast.error("Authentication failed. Please try Email.");
    }
    setLoading(false);
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phoneNumber) {
      toast.error("Please fill in all details.");
      return;
    }
    
    setLoading(true);

    try {
      // Check if email or phone already exists
      const emailQuery = query(collection(db, "users"), where("email", "==", email));
      const phoneQuery = query(collection(db, "users"), where("phone", "==", phoneNumber));
      
      const [emailSnap, phoneSnap] = await Promise.all([
        getDocs(emailQuery),
        getDocs(phoneQuery)
      ]);

      if (!emailSnap.empty || !phoneSnap.empty) {
        toast.error("Identity already in the Archive. Please log in as an Existing Member.");
        setAuthMode("login");
        setLoading(false);
        return;
      }

      setupRecaptcha();
      const result = await signInWithPhoneNumber(auth, `+91${phoneNumber}`, (window as any).recaptchaVerifier);
      setConfirmationResult(result);
      setStep(2);
      toast.success("Check your phone for the access key.");
    } catch (error: any) {
      toast.error("Process interrupted. Please try again or use Google.");
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
        setStep(3); // New user must set password
      }
    } catch (error: any) {
      toast.error("Invalid key.");
    }
    setLoading(false);
  };

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        const credential = EmailAuthProvider.credential(email, password);
        await linkWithCredential(user, credential);
        const profile = { uid: user.uid, name, email, phone: phoneNumber, createdAt: serverTimestamp() };
        await setDoc(doc(db, "users", user.uid), profile, { merge: true });
        setProfile(profile as any);
        toast.success("Account Secured.");
        router.push("/apply/register");
      }
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use' || error.code === 'auth/credential-already-in-use') {
        toast.error("Email already in the Archive. Please use 'Existing Member' login.");
        setStep(1);
        setAuthMode("login");
      } else {
        toast.error(error.message);
      }
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
      toast.error("Incorrect email or password.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col md:flex-row font-sans relative">
      <div id="recaptcha-container"></div>
      <div className="fixed top-8 left-8 z-[120]">
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/")} 
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
        </motion.button>
      </div>
      
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-20 py-24 border-r border-black/5 relative overflow-hidden">
        <div className="max-w-sm w-full mx-auto relative z-10">
          <div className="mb-12">
            <img src="/bic-black.png" alt="BIC" className="h-8 mb-8" />
            <h1 className="text-4xl font-bold uppercase tracking-tighter leading-none mb-3">
              {step === 3 ? "Set Password" : (authMode === "register" ? "Join the Circle" : "Member Login")}
            </h1>
            <p className="text-black/40 text-[10px] font-bold uppercase tracking-widest">
              Cohort 01 — May 2026 Registration
            </p>
          </div>

          {step === 1 && (
            <div className="space-y-4 mb-8">
              <button onClick={handleGoogleAuth} disabled={loading} className="w-full py-4 bg-[#F9F9F9] text-black border border-black/5 rounded-sm flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-all duration-300">
                <Globe size={18} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Continue with Google</span>
              </button>
              <div className="flex items-center gap-4 text-black/10"><div className="h-px bg-black/5 flex-1" /><span className="text-[8px] uppercase tracking-widest font-bold">OR</span><div className="h-px bg-black/5 flex-1" /></div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="flex gap-1 bg-[#F9F9F9] p-1 rounded-sm mb-8">
                  <button onClick={() => setAuthMode("register")} className={`flex-1 py-2 text-[9px] font-bold uppercase tracking-widest transition-all ${authMode === "register" ? "bg-white shadow-sm" : "text-black/30"}`}>Register</button>
                  <button onClick={() => setAuthMode("login")} className={`flex-1 py-2 text-[9px] font-bold uppercase tracking-widest transition-all ${authMode === "login" ? "bg-white shadow-sm" : "text-black/30"}`}>Existing Member</button>
                </div>

                <form onSubmit={authMode === "register" ? handleSendOTP : handlePasswordLogin} className="space-y-6">
                  {authMode === "register" && <InputField icon={<User size={16}/>} label="Full Name" value={name} onChange={setName} placeholder="Your Name" />}
                  <InputField icon={<Mail size={16}/>} label="Email Address" value={email} onChange={setEmail} placeholder="name@email.com" type="email" />
                  {authMode === "register" && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 px-1">Mobile Number</label>
                      <div className="flex items-center gap-4 bg-[#F9F9F9] px-6 rounded-sm">
                        <span className="text-[10px] font-bold text-black/40">+91</span>
                        <input required type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))} placeholder="00000 00000" className="w-full bg-transparent border-none py-4 text-sm outline-none" maxLength={10} />
                      </div>
                    </div>
                  )}
                  {authMode === "login" && <InputField icon={<Lock size={16}/>} label="Password" value={password} onChange={setPassword} placeholder="••••••••" type="password" />}
                  <AuthButton loading={loading} text={authMode === "register" ? "Get Access Code" : "Login"} icon={<ArrowRight size={16}/>} />
                </form>
              </motion.div>
            ) : step === 2 ? (
              <motion.form key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} onSubmit={handleVerifyOTP} className="space-y-6 text-center">
                <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-4">Code sent to +91 {phoneNumber}</p>
                <input required type="text" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} placeholder="000000" className="w-full bg-[#F9F9F9] border-none py-6 px-6 rounded-sm text-center text-4xl tracking-[0.4em] font-bold outline-none" maxLength={6} />
                <AuthButton loading={loading} text="Verify Code" icon={<ShieldCheck size={16}/>} />
                <button type="button" onClick={() => setStep(1)} className="text-[10px] uppercase tracking-widest font-bold text-black/30 hover:text-black">Edit Details</button>
              </motion.form>
            ) : (
              <motion.form key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} onSubmit={handleSetPassword} className="space-y-6">
                <p className="text-[10px] uppercase tracking-widest font-bold text-black/40 mb-4 text-center">Create a password for future access</p>
                <InputField icon={<Lock size={16}/>} label="Set Password" value={password} onChange={setPassword} placeholder="Min 6 characters" type="password" />
                <AuthButton loading={loading} text="Complete Registration" icon={<ShieldCheck size={16}/>} />
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-[#F9F9F9] hidden md:flex flex-col justify-center px-20 py-24 relative overflow-hidden">
        <div className="max-w-md w-full mx-auto space-y-12 relative z-10 text-left">
          <div className="space-y-4 text-left">
            <span className="text-[#F3D7A7] text-[10px] font-bold uppercase tracking-[0.6em] block">The Blade Outcome</span>
            <h2 className="text-5xl font-bold uppercase tracking-tighter leading-[0.9] text-left">Scale. <br/>Systemize. <br/>Dominate.</h2>
          </div>
          <div className="space-y-8 text-left">
            <ValueProp title="From Creator to Operator" desc="Transition from doing all the work to owning a high-velocity content machine. Learn the systems that scale without you." />
            <ValueProp title="The ₹3Cr+ Framework" desc="Get exclusive access to the exact documentations and workflows used to generate massive market outcomes." />
            <ValueProp title="Market Placement" desc="We don't just teach. Top performers get direct placement into elite content roles within the Blade Alpha network." />
          </div>
          <div className="p-8 bg-white border border-black/5 rounded-sm text-left">
            <p className="text-xs italic text-black/60 leading-relaxed font-light text-left">
              &quot;Blade Inner Circle is where consumers become operators. Results are the only currency here.&quot;
            </p>
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

const InputField = ({ label, icon, value, onChange, placeholder, type = "text" }: { label: string, icon: React.ReactNode, value: string, onChange: (v: string) => void, placeholder: string, type?: string }) => (
  <div className="group space-y-1 text-left">
    <label className="text-[10px] font-bold uppercase tracking-widest text-black/30 px-1 block text-left">{label}</label>
    <div className="flex items-center gap-4 bg-[#F9F9F9] px-6 rounded-sm focus-within:ring-1 focus-within:ring-[#F3D7A7] transition-all">
      <span className="text-black/10">{icon}</span>
      <input required type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-transparent border-none py-4 text-sm outline-none placeholder:text-black/10" />
    </div>
  </div>
);

const AuthButton = ({ loading, text, icon }: { loading: boolean, text: string, icon: React.ReactNode }) => (
  <motion.button 
    whileTap={{ scale: 0.98 }}
    type="submit" 
    disabled={loading} 
    className="w-full py-4 bg-black text-white rounded-sm flex items-center justify-center gap-3 hover:bg-[#F3D7A7] hover:text-black transition-all duration-500 group"
  >
    <span className="text-[10px] uppercase tracking-[0.3em] font-bold">{loading ? "Wait..." : text}</span>
    <span className="group-hover:translate-x-1 transition-transform">{icon}</span>
  </motion.button>
);

const ValueProp = ({ title, desc }: { title: string, desc: string }) => (
  <div className="space-y-2 text-left">
    <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/80 text-left">{title}</h4>
    <p className="text-xs text-black/40 leading-relaxed font-light text-left">{desc}</p>
  </div>
);