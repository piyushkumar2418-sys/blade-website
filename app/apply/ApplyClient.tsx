"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ArrowRight, X, Clock, Lock, Terminal } from "lucide-react";

export default function ApplyClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [status, setStatus] = useState<"verifying" | "unauthorized" | "closed" | "applied">("verifying");

  useEffect(() => {
    async function checkClearance() {
      if (!loading) {
        if (!user) {
          // If not signed in, redirect to login so we can identify them
          setStatus("unauthorized");
          setTimeout(() => router.push("/apply/login"), 2000);
        } else {
          try {
            // Check if they already have a Cohort 01/02 application
            const q = query(
              collection(db, "applications"),
              where("uid", "==", user.uid)
            );
            const querySnapshot = await getDocs(q);
            
            if (querySnapshot.empty) {
              router.push("/apply/register");
            } else {
              // Existing application found: show application status
              setStatus("applied");
            }
          } catch (err) {
            console.error("Clearance error:", err);
            setStatus("unauthorized");
          }
        }
      }
    }
    checkClearance();
  }, [user, loading, router]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-sans overflow-hidden selection:bg-[#F3D7A7] selection:text-black relative">
      
      {/* Background Matrix Effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(243, 215, 167, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(243, 215, 167, 0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
      />

      <AnimatePresence mode="wait">
        {status === "verifying" && (
          <motion.div 
            key="verifying"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-8 text-center"
          >
            <div className="relative">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                 className="w-24 h-24 border border-[#F3D7A7]/20 rounded-full"
               />
               <div className="absolute inset-0 flex items-center justify-center">
                  <Lock size={20} className="text-[#F3D7A7] animate-pulse" />
               </div>
            </div>
            <div className="space-y-2">
               <h1 className="text-[10px] font-bold uppercase tracking-[1em] text-[#F3D7A7]">Checking Access</h1>
               <p className="text-[8px] text-white/20 uppercase tracking-[0.5em]">Admissions Access // Gatekeeper</p>
            </div>
          </motion.div>
        )}

        {status === "unauthorized" && (
          <motion.div 
            key="unauthorized"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl font-bold uppercase tracking-tighter text-left">Access <br /> Denied.</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Redirecting...</p>
          </motion.div>
        )}

        {status === "closed" && (
          <motion.div 
            key="closed"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl w-full bg-[#0a0a0a] border border-white/5 p-12 md:p-20 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F3D7A7]/5 blur-[100px] rounded-full -mr-32 -mt-32" />
            
            <div className="relative z-10 space-y-12 text-left">
              <div className="flex justify-between items-start">
                  <div className="px-4 py-2 border border-[#F3D7A7]/20 text-[#F3D7A7] text-[8px] font-bold uppercase tracking-[0.4em]">
                     Intake Status Report
                  </div>
                  <button onClick={() => router.push("/")} className="text-white/10 hover:text-white transition-colors cursor-pointer bg-transparent border-none">
                     <X size={24} />
                  </button>
              </div>

              <div className="space-y-6">
                  <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.85] text-white text-left">
                    May Intake <br /> Closed.
                  </h1>
                  <p className="text-sm text-white/40 leading-relaxed max-w-md font-light text-left">
                    Admissions for Cohort 01 (May 2026) are officially closed and the sprint is currently in progress. 
                    We are now accepting applications for the exclusive August 2026 Cohort 02.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
                  <StatusCard icon={<Clock size={16}/>} label="Cohort 01 Status" value="In Operations" highlight={false} />
                  <StatusCard icon={<ShieldCheck size={16}/>} label="Cohort 02 Admissions" value="Open & Active" highlight={true} />
               </div>

               <div className="pt-8">
                  <button 
                    onClick={() => router.push("/apply/register")}
                    className="w-full py-6 bg-white text-black flex items-center justify-center gap-4 group hover:bg-[#F3D7A7] transition-all font-bold uppercase tracking-[0.3em] text-[10px] cursor-pointer border-none"
                  >
                    <span>Apply for Cohort 02</span>
                    <Terminal size={16} className="group-hover:scale-105 transition-transform" />
                  </button>
              </div>
            </div>
          </motion.div>
        )}

        {status === "applied" && (
          <motion.div 
            key="applied"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl w-full bg-[#0a0a0a] border border-white/5 p-12 md:p-20 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F3D7A7]/5 blur-[100px] rounded-full -mr-32 -mt-32" />
            
            <div className="relative z-10 space-y-12 text-left">
              <div className="flex justify-between items-start">
                  <div className="px-4 py-2 border border-[#F3D7A7]/20 text-[#F3D7A7] text-[8px] font-bold uppercase tracking-[0.4em]">
                     Application Status
                  </div>
                  <button onClick={() => router.push("/dashboard")} className="text-white/10 hover:text-white transition-colors cursor-pointer bg-transparent border-none">
                     <X size={24} />
                  </button>
              </div>

              <div className="space-y-6">
                 <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.85] text-white text-left">
                   Already <br /> Enrolled.
                 </h1>
                 <p className="text-sm text-white/40 leading-relaxed max-w-md font-light text-left">
                    Our system shows you have already submitted an application. You can only apply once per batch.
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
                 <StatusCard icon={<Clock size={16}/>} label="Current Status" value="Under Review" highlight={true} />
                 <StatusCard icon={<ShieldCheck size={16}/>} label="Your Level" value="Candidate" highlight={false} />
              </div>

              <div className="pt-8">
                 <button 
                   onClick={() => router.push("/dashboard")}
                   className="w-full py-6 bg-white text-black flex items-center justify-center gap-4 group hover:bg-[#F3D7A7] transition-all cursor-pointer border-none"
                 >
                   <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Go to Dashboard</span>
                   <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Branding & Internal Links */}
      <footer className="fixed bottom-6 flex flex-col items-center gap-4 opacity-40 text-[9px] uppercase tracking-widest font-mono">
         <div className="flex gap-6">
            <a href="/" className="hover:text-[#F3D7A7] transition-colors font-bold">Home</a>
            <a href="/curriculum" className="hover:text-[#F3D7A7] transition-colors font-bold">Curriculum</a>
            <a href="/terms" className="hover:text-[#F3D7A7] transition-colors font-bold">Terms</a>
            <a href="/privacy" className="hover:text-[#F3D7A7] transition-colors font-bold">Privacy</a>
         </div>
         <div className="flex items-center gap-2 opacity-30 text-[8px] tracking-[0.6em]">
            <img src="/blade-logo.png" alt="Blade" className="h-3 object-contain grayscale" />
            <span>Admissions Gate</span>
         </div>
      </footer>
    </div>
  );
}

const StatusCard = ({ icon, label, value, highlight = false }: any) => (
  <div className="p-8 bg-black hover:bg-white/[0.02] transition-all text-left">
     <div className={`mb-4 ${highlight ? 'text-[#F3D7A7]' : 'text-white/20'}`}>{icon}</div>
     <div className="space-y-1 text-left">
        <span className="text-[9px] font-bold uppercase tracking-widest text-white/20 block">{label}</span>
        <span className={`text-sm font-bold uppercase tracking-widest ${highlight ? 'text-[#F3D7A7]' : 'text-white'}`}>{value}</span>
     </div>
  </div>
);
