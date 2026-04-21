"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function Profile() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [applications, setApplications] = useState<any[]>([]);
  const [fetchingApps, setFetchingApps] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/apply/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchApplications() {
      if (user) {
        try {
          const q = query(
            collection(db, "applications"),
            where("uid", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);
          const apps = querySnapshot.docs.map(doc => ({ 
            id: doc.id, 
            ...doc.data() 
          })).sort((a: any, b: any) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
          
          setApplications(apps);
        } catch (err) {
          console.error("Error fetching applications:", err);
        }
        setFetchingApps(false);
      }
    }
    if (user) fetchApplications();
  }, [user]);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-[1px] bg-[#F3D7A7] animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#F3D7A7] selection:text-black">
      
      {/* --- HYPER-MINIMAL NAV --- */}
      <nav className="w-full px-8 py-10 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-12">
          <div className="cursor-pointer" onClick={() => router.push("/")}>
            <img src="/blade-logo.png" alt="Blade" className="h-8 object-contain" />
          </div>
          <span className="hidden md:block text-[10px] font-bold uppercase tracking-[0.6em] text-white/20">Institutional Access</span>
        </div>
        <div className="flex items-center gap-8">
           <button onClick={handleSignOut} className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 hover:text-[#F3D7A7] transition-colors">Terminate Session</button>
        </div>
      </nav>

      <main className="max-w-[1440px] mx-auto px-8 md:px-24 py-24 md:py-40">
        
        {/* --- IDENTITY BLOCK --- */}
        <header className="mb-40 space-y-12">
          <div className="space-y-4">
             <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-[#F3D7A7] animate-pulse" />
                <span className="text-[#F3D7A7] text-[10px] font-bold uppercase tracking-[0.8em]">Identity Verified</span>
             </div>
             <h1 className="text-7xl md:text-[10vw] font-black uppercase tracking-[-0.08em] leading-[0.75] italic">
               {profile?.name}
             </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-12 md:items-center text-[10px] font-bold uppercase tracking-[0.5em] text-white/30">
            <span>Ref: {user.uid.slice(0, 8).toUpperCase()}</span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-white/10" />
            <span>Class: May 2026 Batch</span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-white/10" />
            <span>Status: Candidate</span>
          </div>
        </header>

        {/* --- MAIN INTERFACE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          {/* LEFT: STATUS & RECORDS */}
          <div className="lg:col-span-8 space-y-32">
            
            {/* ACTIVE PORTFOLIOS */}
            <div className="space-y-16">
              <div className="flex justify-between items-end border-b border-white/10 pb-8">
                <h3 className="text-xl font-black uppercase tracking-tighter italic">Admission Records</h3>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">{applications.length} Submitted</span>
              </div>

              {fetchingApps ? (
                <div className="py-20 flex items-center gap-4 text-white/10">
                   <div className="w-4 h-[1px] bg-current animate-pulse" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Querying System...</span>
                </div>
              ) : applications.length > 0 ? (
                <div className="space-y-1">
                  {applications.map((app) => (
                    <motion.div 
                      key={app.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="group flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-white/5 hover:border-white/20 transition-all cursor-none"
                    >
                      <div className="space-y-4">
                        <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#F3D7A7]">Inner Circle — Cohort 01</div>
                        <h4 className="text-3xl font-black uppercase tracking-tighter">Admission Portfolio</h4>
                        <div className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20">
                          Timestamp: {app.createdAt ? new Date(app.createdAt.seconds * 1000).toLocaleString() : 'N/A'}
                        </div>
                      </div>

                      <div className="mt-8 md:mt-0 flex items-center gap-12">
                        <div className="text-left md:text-right space-y-1">
                           <div className="text-sm font-bold uppercase tracking-widest text-white">Under Review</div>
                           <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">Architect Verification Pending</div>
                        </div>
                        <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:bg-[#F3D7A7] group-hover:text-black transition-all">
                           <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-32 border border-dashed border-white/10 flex flex-col items-center justify-center space-y-10">
                   <p className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/20">No Execution History Found</p>
                   <button 
                     onClick={() => router.push("/apply/register")}
                     className="px-12 py-6 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-[#F3D7A7] transition-all"
                   >
                     Initiate Admission
                   </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: PROTOCOLS */}
          <div className="lg:col-span-4 space-y-24">
             <div className="space-y-12">
                <h3 className="text-xs font-bold uppercase tracking-[0.5em] text-white/20 border-b border-white/5 pb-4">Next Protocols</h3>
                <div className="space-y-10">
                   <ProtocolItem num="01" label="Verify Intent" desc="Architecture check for May 2026 Cohort." />
                   <ProtocolItem num="02" label="Access Prospectus" desc="Full breakdown of the execution mechanics." />
                   <ProtocolItem num="03" label="Wait for Verdict" desc="Decisions are processed within 48h." />
                </div>
             </div>

             <div className="p-10 border border-white/5 space-y-6">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#F3D7A7]">Important</h4>
                <p className="text-xs leading-relaxed text-white/40 font-light">
                  Ensure all portfolio links are public. Private links will result in automatic disqualification from the May cycle.
                </p>
             </div>
          </div>

        </div>
      </main>

      <footer className="py-20 border-t border-white/5 text-center">
        <p className="text-[8px] font-bold uppercase tracking-[1em] text-white/10">Blade Media Institutional Network // Verified Session</p>
      </footer>
    </div>
  );
}

const ProtocolItem = ({ num, label, desc }: any) => (
  <div className="flex gap-8 group cursor-none">
    <span className="text-[10px] font-bold text-[#F3D7A7] mt-1">{num}</span>
    <div className="space-y-2">
      <h5 className="text-sm font-bold uppercase tracking-widest group-hover:text-[#F3D7A7] transition-colors">{label}</h5>
      <p className="text-[10px] leading-relaxed text-white/30 uppercase tracking-widest">{desc}</p>
    </div>
  </div>
);
