"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { 
  LogOut, User, CheckCircle2, ChevronRight, 
  ArrowLeft, FileText, Globe, Clock, 
  BookOpen, MessageCircle, ExternalLink, X
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

// --- ADMISSION STEPS ---
const STEPS = [
  { id: 1, label: "Portfolio Received", desc: "Documentation secured" },
  { id: 2, label: "Initial Review", desc: "Intent verification" },
  { id: 3, label: "Interview", desc: "Direct evaluation" },
  { id: 4, label: "Final Verdict", desc: "Cohort selection" },
];

export default function Profile() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [applications, setApplications] = useState<any[]>([]);
  const [fetchingApps, setFetchingApps] = useState(true);
  const [selectedApp, setSelectedApp] = useState<any | null>(null);

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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black/5 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  const currentStep = applications.length > 0 ? 2 : 1; // Simulation for UI

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-black font-sans selection:bg-[#F3D7A7] selection:text-black">
      
      {/* --- REFINED NAV --- */}
      <nav className="w-full bg-white border-b border-black/[0.05] px-8 py-6 flex justify-between items-center sticky top-0 z-[100]">
        <div className="flex items-center gap-10">
          <div className="cursor-pointer" onClick={() => router.push("/")}>
            <img src="/bic-black.png" alt="BIC" className="h-6 object-contain" />
          </div>
          <div className="h-4 w-[1px] bg-black/10 hidden md:block" />
          <div className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/40">
            <span className="text-black">Hey, {profile?.name.split(' ')[0]}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={handleSignOut}
            className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/30 hover:text-black transition-colors"
          >
            Sign Out <LogOut size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
        
        {/* --- WELCOME HEADER --- */}
        <section className="mb-20 text-left">
           <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#F3D7A7] block mb-4">Institutional Portal</span>
           <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase italic leading-none">
             Welcome back, <br /> <span className="text-black/20">{profile?.name}</span>
           </h1>
        </section>

        {/* --- THE JOURNEY (STEPPER) --- */}
        <section className="bg-white border border-black/5 p-10 md:p-16 mb-20 shadow-sm">
           <div className="flex justify-between items-center mb-16">
              <h3 className="text-xs font-bold uppercase tracking-widest">Admission Protocol Journey</h3>
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/30">Candidate ID: {user.uid.slice(0, 6).toUpperCase()}</span>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
             {/* Background Line */}
             <div className="absolute top-5 left-0 w-full h-[1px] bg-black/5 hidden md:block" />
             
             {STEPS.map((step) => {
               const isComplete = currentStep > step.id;
               const isActive = currentStep === step.id;
               
               return (
                 <div key={step.id} className="relative z-10 flex md:flex-col items-center md:items-start gap-6 md:gap-8 text-left">
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-700 ${
                     isComplete ? "bg-black border-black text-white" : 
                     isActive ? "bg-white border-black text-black shadow-lg" : 
                     "bg-white border-black/5 text-black/10"
                   }`}>
                     {isComplete ? <CheckCircle2 size={18} /> : <span className="text-xs font-bold">{step.id}</span>}
                   </div>
                   <div className="space-y-1">
                     <h4 className={`text-xs font-bold uppercase tracking-widest ${!isActive && !isComplete ? "text-black/20" : "text-black"}`}>{step.label}</h4>
                     <p className="text-[10px] text-black/40 uppercase tracking-widest">{step.desc}</p>
                   </div>
                 </div>
               );
             })}
           </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* LEFT: APPLICATIONS */}
          <div className="lg:col-span-2 space-y-10">
            <div className="flex justify-between items-center border-b border-black/5 pb-4">
               <h3 className="text-xs font-bold uppercase tracking-widest">Active Portfolios</h3>
            </div>

            {fetchingApps ? (
              <div className="py-20 text-center flex flex-col items-center gap-4">
                 <div className="w-6 h-6 border-2 border-black/5 border-t-[#F3D7A7] rounded-full animate-spin" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-black/20">Accessing Records...</span>
              </div>
            ) : applications.length > 0 ? (
              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id} className="bg-white border border-black/5 p-8 md:p-12 hover:shadow-xl transition-all group">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                       <div className="space-y-4">
                          <div className="flex items-center gap-3">
                             <span className="bg-black text-white text-[8px] font-bold uppercase tracking-widest px-2 py-0.5">May 2026</span>
                             <span className="text-[10px] text-black/30 font-bold uppercase tracking-widest">ID: {app.id.slice(0, 8).toUpperCase()}</span>
                          </div>
                          <h4 className="text-2xl font-bold uppercase tracking-tight">Institutional Admission Portfolio</h4>
                          <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-black/40">
                             <span className="flex items-center gap-2"><Clock size={14} /> Submitted on {app.createdAt ? new Date(app.createdAt.seconds * 1000).toLocaleDateString() : 'Just now'}</span>
                          </div>
                       </div>
                       
                       <div className="flex flex-col items-start md:items-end gap-6">
                          <div className="text-left md:text-right">
                             <div className="text-[10px] font-bold uppercase tracking-widest text-[#F3D7A7] flex items-center gap-2 md:justify-end">
                               <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /> Under Review
                             </div>
                             <p className="text-[9px] text-black/30 uppercase tracking-widest mt-1">Expected decision in 3 days</p>
                          </div>
                          <button 
                            onClick={() => setSelectedApp(app)}
                            className="px-8 py-3 bg-black text-white text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-[#F3D7A7] hover:text-black transition-all flex items-center gap-3"
                          >
                            View Submission <FileText size={14} />
                          </button>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-dashed border-black/10 p-20 text-center space-y-8">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-black/30">No submissions found for this cycle.</p>
                 <button onClick={() => router.push("/apply/register")} className="px-10 py-5 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#F3D7A7] hover:text-black transition-all">Submit Portfolio</button>
              </div>
            )}
          </div>

          {/* RIGHT: RESOURCES */}
          <div className="space-y-12">
             <div className="bg-black text-white p-10 space-y-8 shadow-2xl">
                <div className="space-y-2">
                   <p className="text-[#F3D7A7] text-[9px] font-bold uppercase tracking-[0.5em]">Upcoming Session</p>
                   <h3 className="text-2xl font-bold uppercase tracking-tighter italic">Cohort <br /> Orientation</h3>
                </div>
                <p className="text-white/40 text-[11px] leading-relaxed font-light">
                   The initial technical briefing for verified candidates will be unlocked upon admission.
                </p>
                <button onClick={() => router.push("/curriculum")} className="w-full py-4 border border-white/10 text-[9px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3">
                   View Prospectus <BookOpen size={14} />
                </button>
             </div>

             <div className="space-y-8">
                <h3 className="text-xs font-bold uppercase tracking-widest border-b border-black/5 pb-4">Institutional Help</h3>
                <div className="space-y-4">
                   <SidebarItem icon={<MessageCircle size={14} />} label="Priority Support" />
                   <SidebarItem icon={<Globe size={14} />} label="Student Network" />
                </div>
             </div>
          </div>

        </div>
      </main>

      {/* --- SUBMISSION DRAWER / MODAL --- */}
      <AnimatePresence>
        {selectedApp && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex justify-end"
          >
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-full max-w-2xl bg-white h-full shadow-2xl p-12 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-16">
                 <h2 className="text-2xl font-bold uppercase tracking-tighter italic">Submission Dossier</h2>
                 <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-black/5 rounded-full transition-colors"><X size={24} /></button>
              </div>

              <div className="space-y-12">
                 <div className="grid grid-cols-2 gap-8">
                    <DataPoint label="Candidate Name" value={selectedApp.name} />
                    <DataPoint label="Contact" value={selectedApp.email} />
                    <DataPoint label="Instagram" value={selectedApp.instagram} />
                    <DataPoint label="Phone" value={selectedApp.phone} />
                 </div>

                 <div className="h-[1px] bg-black/5" />

                 <div className="space-y-4">
                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-black/40">Portfolio Links</h5>
                    <div className="space-y-3">
                       {selectedApp.links?.split('\n').map((link: string, i: number) => (
                         <a key={i} href={link} target="_blank" className="flex items-center justify-between p-4 bg-[#F9F9F9] border border-black/5 hover:border-black/20 transition-all text-xs font-medium">
                            {link} <ExternalLink size={14} className="text-black/20" />
                         </a>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-4">
                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-black/40">Statement of Intent</h5>
                    <p className="text-sm leading-relaxed text-black/70 bg-[#F9F9F9] p-6 border border-black/5 italic">
                       &quot;{selectedApp.whyJoin}&quot;
                    </p>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-12 border-t border-black/[0.03] text-center">
        <p className="text-[8px] font-bold uppercase tracking-[0.8em] text-black/10">Blade Media // System Verified</p>
      </footer>
    </div>
  );
}

const SidebarItem = ({ icon, label }: any) => (
  <button className="w-full flex items-center justify-between p-4 border border-black/[0.03] hover:border-black/10 hover:bg-white transition-all text-[9px] font-bold uppercase tracking-widest group">
    <div className="flex items-center gap-3">
      <span className="text-black/20 group-hover:text-black transition-colors">{icon}</span>
      {label}
    </div>
    <ChevronRight size={12} className="text-black/10 group-hover:text-black transition-all" />
  </button>
);

const DataPoint = ({ label, value }: any) => (
  <div className="space-y-1">
     <span className="text-[9px] font-bold uppercase tracking-widest text-black/30">{label}</span>
     <p className="text-sm font-semibold">{value || 'N/A'}</p>
  </div>
);
