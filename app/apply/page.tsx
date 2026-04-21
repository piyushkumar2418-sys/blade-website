"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ArrowRight, X, Clock, CheckCircle2 } from "lucide-react";

export default function ApplyRouting() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [checkingApp, setCheckingApp] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    async function checkStatus() {
      if (!loading) {
        if (!user) {
          // Rule 1: Not authenticated -> Redirect to login
          router.push("/apply/login");
        } else {
          // Rule 2: Authenticated -> Check if application exists
          try {
            const q = query(
              collection(db, "applications"),
              where("uid", "==", user.uid)
            );
            const querySnapshot = await getDocs(q);
            
            if (querySnapshot.empty) {
              // No application -> Redirect to register
              router.push("/apply/register");
            } else {
              // Application exists -> Stay here and show popup
              setHasApplied(true);
            }
          } catch (err) {
            console.error("Error checking application status:", err);
          }
          setCheckingApp(false);
        }
      }
    }
    checkStatus();
  }, [user, loading, router]);

  if (loading || checkingApp) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
           <div className="w-8 h-8 border-2 border-black/5 border-t-black rounded-full animate-spin" />
           <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-black/20">Verifying Credentials...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center p-6">
      <AnimatePresence>
        {hasApplied && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-white border border-black p-10 md:p-12 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] relative"
          >
            <div className="flex justify-between items-start mb-12">
               <div className="w-12 h-12 bg-black flex items-center justify-center text-white">
                  <ShieldCheck size={24} />
               </div>
               <button onClick={() => router.push("/dashboard")} className="text-black/20 hover:text-black transition-colors">
                  <X size={24} />
               </button>
            </div>

            <div className="space-y-6 text-left">
               <h2 className="text-3xl font-bold uppercase tracking-tighter leading-none">
                 Submission <br /> Detected.
               </h2>
               <p className="text-sm text-black/60 leading-relaxed">
                 Our system indicates that you have already submitted an institutional portfolio for the May 2026 Batch. Duplicate submissions are not permitted.
               </p>

               <div className="bg-[#F9F9F9] border border-black/5 p-6 space-y-4">
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[#F3D7A7]">
                     <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                     Status: Under Review
                  </div>
                  <p className="text-[10px] text-black/30 uppercase tracking-widest leading-relaxed">
                     Your application is currently being evaluated by our system architects. Expected decision: 48-72 hours.
                  </p>
               </div>

               <div className="pt-8 flex flex-col gap-4">
                  <button 
                    onClick={() => router.push("/dashboard")}
                    className="w-full py-5 bg-black text-white flex items-center justify-center gap-3 group hover:bg-[#F3D7A7] hover:text-black transition-all"
                  >
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Go to Dashboard</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => router.push("/")}
                    className="w-full py-4 text-[10px] uppercase tracking-widest font-bold text-black/30 hover:text-black transition-colors"
                  >
                    Return to Home
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Decor */}
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-[0.02]" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }} 
      />
    </div>
  );
}
