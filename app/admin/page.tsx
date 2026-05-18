"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { LogOut, CheckCircle, XCircle, Search, Clock, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

const ADMIN_EMAILS = [
  'piyushkumar2418@gmail.com'
];

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  instagram: string;
  status: string;
  createdAt: string;
  portfolioUrl?: string;
  [key: string]: any;
}

export default function AdminDashboard() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [fetchingApps, setFetchingApps] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [activeTab, setActiveTab] = useState<'registry' | 'broadcast' | 'cohorts'>('registry');

  // Broadcast Engine State
  const [bSubject, setBSubject] = useState("");
  const [bBody, setBBody] = useState("");
  const [bAudience, setBAudience] = useState<'enrolled' | 'test'>('test');
  const [bSending, setBSending] = useState(false);

  // Cohort Manager State
  const COHORT_SESSIONS = [
    { id: 1, name: 'Orientation Briefing', date: 'May 12, 2026' },
    { id: 2, name: 'Social Media Marketing & Skill Selection', date: 'May 14, 2026' },
    { id: 3, name: 'The Agency Blueprint', date: 'May 19, 2026' },
    { id: 4, name: 'Client Acquisition Systems', date: 'May 21, 2026' }
  ];
  const [presentationLinks, setPresentationLinks] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!loading && !user) {
      router.push("/apply/login");
      return;
    }
    if (!loading && user && !ADMIN_EMAILS.includes(user.email || '')) {
      router.push("/dashboard");
      return;
    }
  }, [user, loading, router]);

  const fetchApplications = async () => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      const res = await fetch("/api/admin/applications", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.applications) {
        setApplications(data.applications);
      }
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      setFetchingApps(false);
    }
  };

  useEffect(() => {
    if (user && ADMIN_EMAILS.includes(user.email || '')) {
      fetchApplications();
    }
  }, [user]);

  const handleAction = async (id: string, email: string, name: string, action: 'accept' | 'reject' | 'enroll') => {
    if (!user) return;
    if (action === 'accept' && !confirm(`Are you sure you want to ACCEPT ${name} and send the confirmation email?`)) return;
    if (action === 'reject' && !confirm(`Are you sure you want to REJECT ${name}?`)) return;
    if (action === 'enroll' && !confirm(`Have you verified the payment for ${name}? Marking them as ENROLLED will lock their seat.`)) return;

    setActionLoading(id);
    try {
      const token = await user.getIdToken();
      const res = await fetch("/api/admin/applications", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id, action, email, name })
      });
      
      const data = await res.json();
      if (data.success) {
        // Update local state
        setApplications(prev => prev.map(app => 
          app.id === id ? { ...app, status: data.status } : app
        ));
      } else {
        alert("Failed: " + data.error);
      }
    } catch (err) {
      console.error("Action error:", err);
      alert("A critical error occurred.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleSendBroadcast = async () => {
    if (!bSubject || !bBody) return alert("Subject and Body are required.");
    if (!user) return;
    
    if (!confirm(`Are you sure you want to broadcast this to ${bAudience.toUpperCase()}?`)) return;

    setBSending(true);
    try {
      const token = await user.getIdToken();
      const res = await fetch("/api/admin/broadcast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          subject: bSubject,
          htmlBody: bBody,
          audience: bAudience,
          testEmail: user.email
        })
      });
      const data = await res.json();
      if (data.success) {
        alert(`Broadcast successful. Sent to ${data.total} recipients.`);
        setBSubject("");
        setBBody("");
      } else {
        alert("Failed: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Critical error sending broadcast.");
    } finally {
      setBSending(false);
    }
  };

  const prepSessionEmail = (session: any) => {
    setActiveTab('broadcast');
    setBSubject(`Material Access: Session 0${session.id} — ${session.name}`);
    const link = presentationLinks[session.id] || '[INSERT LINK HERE]';
    setBBody(`The official presentation deck and materials for Session 0${session.id} are now available.\n\nAccess them securely here:\n<a href="${link}" style="color: #d4af37;">${link}</a>\n\nEnsure you review these before the next session.`);
    setBAudience('test'); // Default to test for safety
  };

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (loading || !user || !ADMIN_EMAILS.includes(user.email || '')) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/5 border-t-[#D4AF37] rounded-full animate-spin" />
      </div>
    );
  }

  const filteredApps = applications.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#D4AF37] selection:text-black">
      
      {/* NAV */}
      <nav className="w-full bg-[#0a0a0a] border-b border-white/5 px-8 py-6 flex justify-between items-center sticky top-0 z-[100]">
        <div className="flex items-center gap-10">
          <div className="cursor-pointer" onClick={() => router.push("/")}>
            <Image src="/blade-logo.png" alt="BIC" width={48} height={24} className="h-6 w-auto object-contain brightness-0 invert" />
          </div>
          <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
          <div className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
            System Administrator
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase hidden md:inline-block">
            {user.email}
          </span>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={handleSignOut}
            className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors"
          >
            Sign Out <LogOut size={14} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* SUB NAVIGATION */}
        <div className="flex items-center gap-8 border-b border-white/5 mb-12 pb-4">
          <button 
            onClick={() => setActiveTab('registry')}
            className={`text-[10px] font-bold uppercase tracking-widest pb-4 -mb-[17px] border-b-2 transition-all ${activeTab === 'registry' ? 'text-[#D4AF37] border-[#D4AF37]' : 'text-white/40 border-transparent hover:text-white'}`}
          >
            Candidate Registry
          </button>
          <button 
            onClick={() => setActiveTab('broadcast')}
            className={`text-[10px] font-bold uppercase tracking-widest pb-4 -mb-[17px] border-b-2 transition-all ${activeTab === 'broadcast' ? 'text-[#D4AF37] border-[#D4AF37]' : 'text-white/40 border-transparent hover:text-white'}`}
          >
            Broadcast Engine
          </button>
          <button 
            onClick={() => setActiveTab('cohorts')}
            className={`text-[10px] font-bold uppercase tracking-widest pb-4 -mb-[17px] border-b-2 transition-all ${activeTab === 'cohorts' ? 'text-[#D4AF37] border-[#D4AF37]' : 'text-white/40 border-transparent hover:text-white'}`}
          >
            Cohort Manager
          </button>
        </div>

        {activeTab === 'registry' && (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <section className="text-left">
                 <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#D4AF37] block mb-4">Command Center</span>
                 <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-none">
                   Candidate<br /> <span className="text-white/20">Registry</span>
                 </h1>
              </section>

              <div className="relative w-full md:w-72">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                <input 
                  type="text" 
                  placeholder="SEARCH PROTOCOL..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-none py-3 pl-12 pr-4 text-[10px] font-bold tracking-widest uppercase text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 bg-[#0f0f0f]">
                      <th className="p-6 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 whitespace-nowrap">Candidate</th>
                      <th className="p-6 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 whitespace-nowrap">Contact</th>
                      <th className="p-6 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 whitespace-nowrap">Platform</th>
                      <th className="p-6 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 whitespace-nowrap">Timestamp</th>
                      <th className="p-6 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 whitespace-nowrap">Status</th>
                      <th className="p-6 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 whitespace-nowrap text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {fetchingApps ? (
                      <tr>
                        <td colSpan={6} className="p-20 text-center text-[10px] tracking-widest uppercase text-white/20">
                          Loading registry data...
                        </td>
                      </tr>
                    ) : filteredApps.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-20 text-center text-[10px] tracking-widest uppercase text-white/20">
                          No candidates found.
                        </td>
                      </tr>
                    ) : (
                      filteredApps.map((app) => (
                        <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="p-6">
                            <div className="font-bold text-sm tracking-tight">{app.name}</div>
                            {app.portfolioUrl && (
                              <a href={app.portfolioUrl} target="_blank" rel="noreferrer" className="text-[9px] uppercase tracking-widest text-[#D4AF37] mt-1 flex items-center gap-1 hover:underline">
                                View Portfolio <ExternalLink size={10} />
                              </a>
                            )}
                          </td>
                          <td className="p-6">
                            <div className="text-xs text-white/70">{app.email}</div>
                            <div className="text-[10px] text-white/30 mt-1 tracking-widest">{app.phone}</div>
                          </td>
                          <td className="p-6">
                            <a href={app.instagram.startsWith('http') ? app.instagram : `https://instagram.com/${app.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="text-xs text-white/70 hover:text-white transition-colors">
                              {app.instagram}
                            </a>
                          </td>
                          <td className="p-6">
                            <div className="text-[10px] text-white/40 tracking-widest flex items-center gap-2">
                              <Clock size={12} />
                              {new Date(app.createdAt).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="p-6">
                            <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 border ${
                              app.status === 'booked' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                              app.status === 'confirmed' ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20' :
                              app.status === 'rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                              app.status === 'enrolled' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                              'bg-white/5 text-white/60 border-white/10'
                            }`}>
                              {app.status === 'confirmed' ? 'Payment Pending' : app.status}
                            </span>
                          </td>
                          <td className="p-6 text-right space-x-3 whitespace-nowrap">
                            {app.status === 'new' && (
                              <>
                                <button 
                                  onClick={() => handleAction(app.id, app.email, app.name, 'accept')}
                                  disabled={actionLoading === app.id}
                                  className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-white text-black hover:bg-[#D4AF37] disabled:opacity-50 transition-all flex items-center gap-2 inline-flex"
                                >
                                  {actionLoading === app.id ? 'Processing...' : <><CheckCircle size={14} /> Accept</>}
                                </button>
                                <button 
                                  onClick={() => handleAction(app.id, app.email, app.name, 'reject')}
                                  disabled={actionLoading === app.id}
                                  className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 border border-white/10 text-white/60 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 disabled:opacity-50 transition-all flex items-center gap-2 inline-flex"
                                >
                                  <XCircle size={14} /> Reject
                                </button>
                              </>
                            )}
                            {(app.status === 'booked' || app.status === 'confirmed') && (
                              <button 
                                onClick={() => handleAction(app.id, app.email, app.name, 'enroll')}
                                disabled={actionLoading === app.id}
                                className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-[#D4AF37] text-black hover:bg-white disabled:opacity-50 transition-all flex items-center gap-2 inline-flex"
                              >
                                {actionLoading === app.id ? 'Processing...' : <><CheckCircle size={14} /> Verify & Enroll</>}
                              </button>
                            )}
                            {(app.status === 'rejected' || app.status === 'enrolled') && (
                              <span className="text-[9px] uppercase tracking-widest text-white/20">Action Completed</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'broadcast' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-8">
              <section className="text-left mb-8">
                 <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#D4AF37] block mb-4">Communications</span>
                 <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-none">
                   Broadcast<br /> <span className="text-white/20">Engine</span>
                 </h1>
              </section>

              <div className="bg-[#0a0a0a] border border-white/10 p-10 space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/60">Subject Line</label>
                  <input 
                    type="text" 
                    value={bSubject}
                    onChange={(e) => setBSubject(e.target.value)}
                    placeholder="Blade Inner Circle Cohort 01 — Update" 
                    className="w-full bg-black border border-white/10 py-4 px-6 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/60">Audience Targeting</label>
                  <select 
                    value={bAudience}
                    onChange={(e) => setBAudience(e.target.value as any)}
                    className="w-full bg-black border border-white/10 py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-[#D4AF37] appearance-none"
                  >
                    <option value="test">Test Deployment ({user?.email})</option>
                    <option value="enrolled">Live Action (All Enrolled Members)</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/60">Message Body</label>
                  <textarea 
                    rows={10}
                    value={bBody}
                    onChange={(e) => setBBody(e.target.value)}
                    placeholder="Enter plain text or HTML. It will be injected into the premium email template..." 
                    className="w-full bg-black border border-white/10 py-4 px-6 text-sm text-white focus:outline-none focus:border-[#D4AF37] font-mono"
                  />
                </div>

                <button 
                  onClick={handleSendBroadcast}
                  disabled={bSending}
                  className={`w-full py-5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                    bAudience === 'enrolled' 
                      ? 'bg-red-600 text-white hover:bg-red-700 shadow-[0_0_20px_rgba(220,38,38,0.3)]' 
                      : 'bg-white text-black hover:bg-[#D4AF37]'
                  }`}
                >
                  {bSending ? 'Executing...' : bAudience === 'enrolled' ? 'DANGER: Execute Live Broadcast' : 'Send Test Execution'}
                </button>
              </div>
            </div>
            
            <div className="space-y-8">
               <div className="bg-[#111] border border-white/5 p-8 text-sm text-white/60 leading-relaxed">
                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-white mb-4">Template Engine</h4>
                 <p className="mb-4">The text you enter in the body will be automatically injected into the official Blade Media HTML template.</p>
                 <p className="mb-4">You can use basic HTML tags for formatting if needed, such as:</p>
                 <code className="block bg-black p-4 text-[11px] text-[#D4AF37] mb-4">
                   &lt;a href="..."&gt;Link&lt;/a&gt;<br/>
                   &lt;strong&gt;Bold&lt;/strong&gt;<br/>
                   &lt;br/&gt; (Line break)
                 </code>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'cohorts' && (
          <div className="space-y-12">
            <section className="text-left mb-8">
               <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#D4AF37] block mb-4">Operations</span>
               <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-none">
                 Cohort 01<br /> <span className="text-white/20">Manager</span>
               </h1>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {COHORT_SESSIONS.map((session) => (
                <div key={session.id} className="bg-[#0a0a0a] border border-white/10 p-8 space-y-6">
                  <div className="flex justify-between items-start border-b border-white/5 pb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">Session 0{session.id}</span>
                      <h3 className="text-xl font-bold uppercase tracking-tighter mt-1">{session.name}</h3>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/30 bg-white/5 px-3 py-1">{session.date}</span>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Presentation Link (Canva / Drive)</label>
                    <input 
                      type="text" 
                      value={presentationLinks[session.id] || ""}
                      onChange={(e) => setPresentationLinks({ ...presentationLinks, [session.id]: e.target.value })}
                      placeholder="Paste secure link here..." 
                      className="w-full bg-black border border-white/10 py-3 px-4 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <button 
                    onClick={() => prepSessionEmail(session)}
                    className="w-full py-4 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors"
                  >
                    Draft Session Broadcast
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
