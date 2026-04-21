"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { ArrowLeft, Clock, CheckCircle2, ChevronRight, LogOut, Layout } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function Dashboard() {
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
        const q = query(
          collection(db, "applications"),
          where("phone", "==", profile?.phone || ""),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const apps = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setApplications(apps);
        setFetchingApps(false);
      }
    }
    if (user && profile) fetchApplications();
  }, [user, profile]);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-black flex flex-col font-sans">
      {/* DASHBOARD HEADER */}
      <nav className="w-full bg-white border-b border-black/5 px-8 py-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="cursor-pointer" onClick={() => router.push("/")}>
            <img src="/bic-black.png" alt="BIC" className="h-6 object-contain" />
          </div>
          <div className="h-4 w-[1px] bg-black/10 hidden md:block" />
          <div className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/40">
            <Layout size={14} />
            Institutional Dashboard
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-bold uppercase tracking-widest leading-none">{profile?.name}</p>
            <p className="text-[9px] text-black/30 uppercase tracking-widest mt-1">{profile?.email}</p>
          </div>
          <button 
            onClick={handleSignOut}
            className="p-2 hover:bg-black/5 rounded-full transition-colors text-black/40 hover:text-black"
          >
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl w-full mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* LEFT: WELCOME & PROFILE */}
          <div className="lg:col-span-2 space-y-12">
            <header className="space-y-4">
              <span className="text-[#F3D7A7] text-[10px] font-bold uppercase tracking-[0.5em] block">Student Portal</span>
              <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none italic">
                Welcome, <br/> <span className="text-black/20">{profile?.name.split(' ')[0]}</span>
              </h1>
            </header>

            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-black/10 pb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest">Active Applications</h3>
                <button 
                  onClick={() => router.push("/apply/register")}
                  className="text-[10px] font-bold uppercase tracking-widest text-[#F3D7A7] hover:text-black transition-colors"
                >
                  New Application +
                </button>
              </div>

              {fetchingApps ? (
                <div className="py-20 text-center text-black/20 uppercase tracking-widest text-[10px] font-bold">Fetching status...</div>
              ) : applications.length > 0 ? (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.id} className="bg-white border border-black/5 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-lg transition-all group">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-bold uppercase tracking-widest bg-black text-white px-2 py-0.5">Cohort 01</span>
                          <span className="text-[10px] text-black/30 font-bold uppercase tracking-widest">Submitted on {new Date(app.createdAt?.seconds * 1000).toLocaleDateString()}</span>
                        </div>
                        <h4 className="text-lg font-bold uppercase tracking-tight">Blade Inner Circle Admission Portfolio</h4>
                      </div>
                      
                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <div className="flex items-center gap-2 justify-end text-[#F3D7A7]">
                            <Clock size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Under Review</span>
                          </div>
                          <p className="text-[9px] text-black/30 uppercase tracking-widest mt-1">Decision expected in 48h</p>
                        </div>
                        <ChevronRight className="text-black/10 group-hover:text-black group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-dashed border-black/10 p-20 text-center space-y-6">
                  <p className="text-black/30 text-xs uppercase tracking-widest leading-relaxed">
                    You haven&apos;t submitted any admission <br/> portfolios for the May 2026 Batch yet.
                  </p>
                  <button 
                    onClick={() => router.push("/apply/register")}
                    className="px-10 py-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#F3D7A7] hover:text-black transition-all"
                  >
                    Start Application
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: CURRICULUM & RESOURCES */}
          <div className="space-y-8">
            <div className="bg-black text-white p-8 space-y-8">
              <div className="space-y-2">
                <p className="text-[#F3D7A7] text-[9px] font-bold uppercase tracking-[0.4em]">Next Steps</p>
                <h4 className="text-xl font-bold uppercase tracking-tight italic">Orientation <br/> Sequence</h4>
              </div>
              <p className="text-white/40 text-xs leading-relaxed font-light">
                Once your application is approved, you will unlock Phase 01 of the curriculum and your dedicated mentor assignment.
              </p>
              <button 
                onClick={() => router.push("/curriculum")}
                className="w-full py-4 border border-white/20 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
              >
                View Curriculum
              </button>
            </div>

            <div className="bg-white border border-black/5 p-8 space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-widest border-b border-black/5 pb-4">Institutional Updates</h4>
              <div className="space-y-4">
                <UpdateItem date="21 APR" title="Cohort 01 Onboarding officially begins May 1st." />
                <UpdateItem date="19 APR" title="New 'Agency Bridge' session added to Phase 04." />
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

const UpdateItem = ({ date, title }: { date: string, title: string }) => (
  <div className="flex gap-4 items-start">
    <span className="text-[9px] font-bold text-[#F3D7A7] mt-0.5">{date}</span>
    <p className="text-[11px] leading-relaxed font-medium text-black/60">{title}</p>
  </div>
);
