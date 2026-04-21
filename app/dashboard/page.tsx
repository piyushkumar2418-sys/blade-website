"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { 
  LogOut, User, ShieldCheck, ChevronRight, 
  MapPin, Calendar, Clock, ArrowUpRight, 
  BookOpen, Target, Sparkles, MessageSquare
} from "lucide-react";
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
          // Simple query to avoid index issues, sort in JS
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
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#F3D7A7] border-t-transparent rounded-full animate-spin" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#F3D7A7]">Syncing Profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-black font-sans selection:bg-[#F3D7A7] selection:text-black">
      
      {/* --- INSTITUTIONAL TOP NAV --- */}
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-black/[0.03] px-8 py-5 flex justify-between items-center sticky top-0 z-[100]">
        <div className="flex items-center gap-10">
          <div className="cursor-pointer" onClick={() => router.push("/")}>
            <img src="/bic-black.png" alt="BIC" className="h-6 object-contain" />
          </div>
          <div className="hidden lg:flex items-center gap-8 text-[9px] font-bold uppercase tracking-[0.3em] text-black/30">
            <a href="/" className="hover:text-black transition-colors">Home</a>
            <a href="/curriculum" className="hover:text-black transition-colors">Prospectus</a>
            <span className="h-3 w-[1px] bg-black/10" />
            <span className="text-black">Student Portal</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex flex-col items-end mr-2">
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">{profile?.name}</span>
            <span className="text-[8px] text-black/40 uppercase tracking-widest mt-1">ID: BIC-26-{user.uid.slice(0, 4).toUpperCase()}</span>
          </div>
          <button 
            onClick={handleSignOut}
            className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-500"
          >
            <LogOut size={16} />
          </button>
        </div>
      </nav>

      <main className="max-w-[1440px] mx-auto px-6 md:px-20 py-16 md:py-24">
        
        {/* --- HERO SECTION --- */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <div className="space-y-8 text-left">
              <div className="flex items-center gap-4 text-[#F3D7A7]">
                <div className="h-[1px] w-12 bg-[#F3D7A7]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.5em]">Academic Dashboard</span>
              </div>
              <h1 className="text-6xl md:text-[8vw] font-black uppercase tracking-[-0.06em] leading-[0.8] italic text-left">
                The <br /> <span className="text-black/10 italic">Cohort</span> Journey.
              </h1>
            </div>
            <div className="flex flex-col items-start lg:items-end gap-6 text-left">
              <div className="p-6 bg-black text-white w-full max-w-sm rounded-sm space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Current Phase</span>
                  <Sparkles size={14} className="text-[#F3D7A7]" />
                </div>
                <h4 className="text-2xl font-bold uppercase tracking-tight">Phase 01: Onboarding</h4>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "25%" }}
                    className="h-full bg-[#F3D7A7]"
                  />
                </div>
                <p className="text-[9px] uppercase tracking-widest opacity-40">25% Towards Admission Finalization</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- CONTENT GRID --- */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-20">
          
          {/* LEFT: APPLICATIONS & STATUS */}
          <div className="xl:col-span-2 space-y-20">
            
            {/* JOURNEY STATUS TRACKER */}
            <div className="space-y-12">
              <div className="flex justify-between items-center border-b border-black/5 pb-6">
                <h3 className="text-xs font-black uppercase tracking-[0.3em]">Your Admission Track</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">May 2026 Batch</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                <StatusNode step="01" label="Submitted" active={applications.length > 0} complete={applications.length > 0} />
                <StatusNode step="02" label="Review" active={applications.length > 0} />
                <StatusNode step="03" label="Interview" />
                <StatusNode step="04" label="Decision" />
              </div>
            </div>

            {/* APPLICATION RECORDS */}
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black uppercase tracking-[0.3em]">Portfolio Records</h3>
                <button 
                  onClick={() => router.push("/apply/register")}
                  className="group flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-[#F3D7A7] hover:text-black transition-all"
                >
                  Apply for new cohort <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

              {fetchingApps ? (
                <div className="py-20 border border-black/[0.03] flex items-center justify-center">
                  <div className="flex items-center gap-4 text-black/20">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Querying database...</span>
                  </div>
                </div>
              ) : applications.length > 0 ? (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <motion.div 
                      key={app.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group bg-white border border-black/5 p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:border-black/10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.02)] transition-all duration-500"
                    >
                      <div className="space-y-4 text-left">
                        <div className="flex items-center gap-3">
                          <span className="bg-[#F3D7A7] text-black text-[8px] font-black uppercase tracking-widest px-3 py-1">Cohort 01</span>
                          <span className="text-[8px] text-black/30 font-bold uppercase tracking-[0.2em]">Ref: {app.id.slice(0,8).toUpperCase()}</span>
                        </div>
                        <h4 className="text-2xl font-bold uppercase tracking-tighter leading-none">Admission Portfolio Submission</h4>
                        <div className="flex items-center gap-6 text-[9px] font-bold uppercase tracking-widest text-black/40">
                          <span className="flex items-center gap-2"><Calendar size={12} /> {app.createdAt ? new Date(app.createdAt.seconds * 1000).toLocaleDateString() : 'Just now'}</span>
                          <span className="flex items-center gap-2"><MapPin size={12} /> Remote / Global</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-10">
                        <div className="text-left md:text-right">
                          <div className="flex items-center gap-2 md:justify-end text-[#F3D7A7]">
                            <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Under Review</span>
                          </div>
                          <p className="text-[9px] text-black/20 uppercase tracking-widest mt-2 leading-relaxed">System Architect evaluating <br /> intent and proof of work.</p>
                        </div>
                        <div className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                          <ChevronRight size={20} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#F9F9F9] border border-dashed border-black/10 p-24 text-center space-y-8">
                  <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <ShieldCheck size={24} className="text-black/10" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-widest">No Portfolios Found</p>
                    <p className="text-[10px] text-black/30 uppercase tracking-[0.2em] leading-relaxed">
                      You haven&apos;t initialized any admission <br /> portfolios for the current cycle.
                    </p>
                  </div>
                  <button 
                    onClick={() => router.push("/apply/register")}
                    className="px-10 py-5 bg-black text-white text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-[#F3D7A7] hover:text-black transition-all shadow-xl"
                  >
                    Start Admission Portfolio
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: CURRICULUM & GUIDANCE */}
          <div className="space-y-12">
            
            {/* QUICK ACTIONS */}
            <div className="bg-black text-white p-10 space-y-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F3D7A7]/10 blur-3xl -mr-16 -mt-16" />
              <div className="space-y-3">
                <span className="text-[#F3D7A7] text-[9px] font-bold uppercase tracking-[0.5em]">Next Protocol</span>
                <h3 className="text-3xl font-bold uppercase tracking-tighter leading-none italic">Institutional <br /> Prospectus</h3>
              </div>
              <p className="text-white/40 text-xs leading-relaxed font-light">
                Review the Phase 01 roadmap to understand the execution mechanics required for the upcoming cycle.
              </p>
              <div className="space-y-3">
                <button onClick={() => router.push("/curriculum")} className="w-full py-5 border border-white/10 text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3">
                  <BookOpen size={14} /> View Prospectus
                </button>
                <button className="w-full py-5 bg-[#F3D7A7] text-black text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-white transition-all flex items-center justify-center gap-3">
                  <MessageSquare size={14} /> Join Waiting Hall
                </button>
              </div>
            </div>

            {/* RESOURCE LIST */}
            <div className="space-y-8">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] border-b border-black/5 pb-4">Resources</h3>
              <div className="space-y-4">
                <ResourceItem icon={<Target size={16}/>} label="Market Systems" desc="Understanding high-leverage distribution." />
                <ResourceItem icon={<BookOpen size={16}/>} label="Founder Thesis" desc="Silent mechanics of agency growth." />
              </div>
            </div>

            {/* QUOTE */}
            <div className="pt-8 border-t border-black/5">
              <p className="text-xs italic text-black/30 leading-relaxed text-left">
                &quot;The transition from amateur to operator begins with the documentation of intent.&quot;
              </p>
            </div>
          </div>

        </div>
      </main>

      <footer className="py-12 border-t border-black/[0.03] text-center">
        <p className="text-[9px] font-bold uppercase tracking-[0.8em] text-black/10">Institutional Access Only</p>
      </footer>
    </div>
  );
}

const StatusNode = ({ step, label, active = false, complete = false }: any) => (
  <div className={`relative p-6 border transition-all duration-700 ${
    complete ? "bg-black border-black text-white" : 
    active ? "bg-white border-[#F3D7A7] text-black shadow-lg shadow-[#F3D7A7]/5" : 
    "bg-[#F9F9F9] border-black/5 text-black/20"
  }`}>
    <div className="space-y-2 text-left">
      <span className={`text-[9px] font-black uppercase tracking-widest block ${complete ? "text-[#F3D7A7]" : ""}`}>Phase {step}</span>
      <h5 className="text-sm font-bold uppercase tracking-tight">{label}</h5>
    </div>
    {complete && (
      <div className="absolute top-4 right-4 text-[#F3D7A7]">
        <ShieldCheck size={14} />
      </div>
    )}
  </div>
);

const ResourceItem = ({ icon, label, desc }: any) => (
  <div className="group flex gap-4 p-4 border border-black/[0.03] hover:border-black/10 hover:bg-[#F9F9F9] transition-all cursor-pointer">
    <div className="text-black/20 group-hover:text-[#F3D7A7] transition-colors">{icon}</div>
    <div className="text-left space-y-1">
      <h6 className="text-[10px] font-bold uppercase tracking-widest">{label}</h6>
      <p className="text-[9px] text-black/40 uppercase tracking-widest">{desc}</p>
    </div>
  </div>
);
