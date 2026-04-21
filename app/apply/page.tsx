"use client";
// Deployment Trigger: Institutional Gatekeeper v2
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ArrowRight, X, Clock, CheckCircle2, Lock, Eye, Zap } from "lucide-react";

export default function ApplyGatekeeper() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [status, setStatus] = useState<"verifying" | "unauthorized" | "redirecting" | "applied">("verifying");

  useEffect(() => {
    async function checkClearance() {
      if (!loading) {
        if (!user) {
          // Rule 1: Not authenticated
          setStatus("unauthorized");
          setTimeout(() => router.push("/apply/login"), 2000);
        } else {
          try {
            const q = query(
              collection(db, "applications"),
              where("uid", "==", user.uid)
            );
            const querySnapshot = await getDocs(q);
            
            if (querySnapshot.empty) {
              // Rule 2: Redirect to registration
              setStatus("redirecting");
              setTimeout(() => router.push("/apply/register"), 1500);
            } else {
              // Rule 3: Already applied
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
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-sans overflow-hidden selection:bg-[#F3D7A7] selection:text-black">
      
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
               <h2 className="text-[10px] font-bold uppercase tracking-[1em] text-[#F3D7A7]">Verifying Clearance</h2>
               <p className="text-[8px] text-white/20 uppercase tracking-[0.5em]">Institutional Access Point // Gatekeeper</p>
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
            <h2 className="text-4xl font-bold uppercase tracking-tighter">Access <br /> Denied.</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">Establishing Secure Vector...</p>
          </motion.div>
        )}

        {status === "applied" && (
          <motion.div 
            key="applied"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl w-full bg-[#0a0a0a] border border-white/5 p-12 md:p-20 shadow-2xl relative overflow-hidden"
          >
            {/* Glow Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F3D7A7]/5 blur-[100px] rounded-full -mr-32 -mt-32" />
            
            <div className="relative z-10 space-y-12 text-left">
              <div className="flex justify-between items-start">
                 <div className="px-4 py-2 border border-[#F3D7A7]/20 text-[#F3D7A7] text-[8px] font-bold uppercase tracking-[0.4em]">
                    Institutional Verdict
                 </div>
                 <button onClick={() => router.push("/dashboard")} className="text-white/10 hover:text-white transition-colors">
                    <X size={24} />
                 </button>
              </div>

              <div className="space-y-6">
                 <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.85]">
                   Already <br /> Enrolled.
                 </h2>
                 <p className="text-sm text-white/40 leading-relaxed max-w-md font-light">
                    Our system has detected an existing admission portfolio under your credentials. Access to the registration matrix is restricted to one submission per cycle.
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
                 <StatusCard icon={<Clock size={16}/>} label="Current Status" value="Under Review" highlight />
                 <StatusCard icon={<ShieldCheck size={16}/>} label="Clearance Level" value="Candidate" />
              </div>

              <div className="pt-8">
                 <button 
                   onClick={() => router.push("/dashboard")}
                   className="w-full py-6 bg-white text-black flex items-center justify-center gap-4 group hover:bg-[#F3D7A7] transition-all"
                 >
                   <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Go to Dashboard</span>
                   <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Branding */}
      <div className="fixed bottom-10 flex flex-col items-center gap-4 opacity-10">
         <img src="/blade-logo.png" alt="Blade" className="h-4 object-contain grayscale" />
         <p className="text-[8px] font-bold uppercase tracking-[1em]">Secure System Interface</p>
      </div>
    </div>
  );
}

const StatusCard = ({ icon, label, value, highlight = false }: any) => (
  <div className="p-8 bg-black hover:bg-white/[0.02] transition-all text-left">
     <div className={`mb-4 ${highlight ? 'text-[#F3D7A7]' : 'text-white/20'}`}>{icon}</div>
     <div className="space-y-1">
        <span className="text-[9px] font-bold uppercase tracking-widest text-white/20 block">{label}</span>
        <span className={`text-sm font-bold uppercase tracking-widest ${highlight ? 'text-[#F3D7A7]' : 'text-white'}`}>{value}</span>
     </div>
  </div>
);
