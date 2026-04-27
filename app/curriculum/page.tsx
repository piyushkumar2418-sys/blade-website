"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Target, Laptop, ShieldCheck, Zap } from "lucide-react";
import { useSite } from "@/context/SiteContext";

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } 
  }
};

// --- HELPER COMPONENTS ---
const SectionLabel = ({ children, gold = false }: { children: React.ReactNode; gold?: boolean }) => (
  <div className="flex items-center gap-4 mb-8 text-left">
    <div className={`h-[1px] w-8 ${gold ? 'bg-[#D4AF37]' : 'bg-black/20'}`} />
    <span className={`text-[10px] font-bold uppercase tracking-[0.4em] ${gold ? 'text-[#D4AF37]' : 'text-black/55'}`}>
      {children}
    </span>
  </div>
);

export default function CurriculumPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mode } = useSite();
  const from = searchParams.get("from");

  const handleBack = () => {
    if (from === "dashboard") {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  };

  const framework = [
    {
      phase: "01",
      title: "The Foundation",
      description: "Getting started, picking your path, and learning the core skills you need to succeed.",
      items: [
        "Orientation, Roadmap & Setting Expectations",
        "Understanding the Agency Model & Choosing a Skill",
        "Content Editing Basics (Hook, Retention, Payoff)",
        "Finding Your Niche",
        "Live Hot Seat: Fixing Early Mistakes"
      ]
    },
    {
      phase: "02",
      title: "Brand & Offer",
      description: "Creating a service people actually want to buy and building a profile that proves you are a pro.",
      items: [
        "Crafting a Service You Can Sell",
        "Positioning Yourself & Building Authority",
        "Fixing Your Instagram Profile for First Impressions",
        "Live Hot Seat: Live Profile Reviews"
      ]
    },
    {
      phase: "03",
      title: "Getting Clients",
      description: "Step-by-step systems to find leads, send outreach messages, and close deals over the phone.",
      items: [
        "Mastering DMs, Emails, and Cold Calls",
        "Building a Consistent Lead Pipeline",
        "How to Price Services & Avoid Undercharging",
        "Mindset: Handling Objections & Imposter Syndrome"
      ]
    },
    {
      phase: "04",
      title: "Delivery & Scaling",
      description: "Managing the actual work, keeping clients happy, hiring a team, and handling your money right.",
      items: [
        "Managing Client Work, Workflows & Revisions",
        "Keeping Clients, Upselling & Hiring Your First Team",
        "Handling Your First Income & Financial Discipline",
        "Hosted Class: Avoiding Common Failure Patterns",
        "Final Call: Reviewing Progress & Next Steps"
      ]
    }
  ];

  return (
    <main className="bg-white text-black min-h-screen selection:bg-[#F3D7A7]">
      {/* MINIMAL NAVIGATION */}
      <nav className="fixed top-0 w-full z-[100] flex justify-between items-center px-8 py-8 mix-blend-difference text-white">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest hover:text-[#D4AF37] transition-colors"
        >
          <ArrowLeft size={14} /> Back to {from === "dashboard" ? "Dashboard" : "Entry"}
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-40 pb-24 px-6 md:px-24 border-b border-black/5">
        <div className="max-w-7xl mx-auto">
          <SectionLabel gold>The Roadmap</SectionLabel>
          <motion.h1 
            initial="hidden" animate="visible" variants={fadeUp}
            className="text-[10vw] md:text-[7vw] font-bold uppercase leading-[0.85] tracking-[-0.06em] mb-12"
          >
            The Step-By-Step <br/> Curriculum.
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-black/5">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/55 mb-4">Focus</h4>
              <p className="font-bold text-xl uppercase tracking-[-0.06em]">Real Business Skills</p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/55 mb-4">Standard</h4>
              <p className="font-bold text-xl uppercase tracking-[-0.06em]">Taught By Doers</p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/55 mb-4">Outcome</h4>
              <p className="font-bold text-xl uppercase tracking-[-0.06em]">Path to ₹1L/mo</p>
            </div>
          </div>
        </div>
      </section>

      {/* FRAMEWORK GRID */}
      <section className="py-24 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-px bg-black/10 border border-black/10">
            {framework.map((phase, i) => (
              <motion.div 
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-white p-12 md:p-20 grid grid-cols-1 md:grid-cols-12 gap-12 group hover:bg-[#F9F9F9] transition-colors"
              >
                <div className="md:col-span-1">
                  <span className="font-mono text-[#D4AF37] text-2xl font-bold">{phase.phase}</span>
                </div>
                <div className="md:col-span-5">
                  <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-[-0.06em] mb-6 leading-none">{phase.title}</h3>
                  <p className="text-black/60 text-lg leading-relaxed font-medium pr-8">{phase.description}</p>
                </div>
                <div className="md:col-span-6 flex flex-col justify-center border-l border-black/5 md:pl-12">
                  <ul className="space-y-4">
                    {phase.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4 text-xs font-bold uppercase tracking-widest text-black/70 leading-relaxed">
                        <div className="h-1.5 w-1.5 bg-[#D4AF37] mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TANGIBLE LEDGER (OUTCOMES) */}
      <section className="py-32 px-6 md:px-24 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <SectionLabel gold>The Results</SectionLabel>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-[-0.06em] mb-20">We build real businesses, <br/> <span className="text-white/20">not just motivation.</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {[
              { icon: <Laptop />, t: "A Real Agency Setup", d: "A fully working business model ready to take on clients and grow." },
              { icon: <Target />, t: "₹1L/mo Roadmap", d: "A simple, mathematically backed plan to reach six-figure consistency." },
              { icon: <Zap />, t: "Our Proven Processes", d: "Direct access to exactly how we reach out to leads and deliver work." },
              { icon: <ShieldCheck />, t: "Business Mindset", d: "Transforming from a simple freelancer to an actual business owner." }
            ].map((outcome, i) => (
              <div key={i} className="bg-black p-10 hover:bg-white/5 transition-all">
                <div className="text-[#D4AF37] mb-8">{outcome.icon}</div>
                <h3 className="text-lg font-bold uppercase mb-4 tracking-[-0.06em]">{outcome.t}</h3>
                <p className="text-sm text-white/40 leading-relaxed font-light">{outcome.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY & PLACEMENT SECTION */}
      <section className="py-32 px-6 md:px-24 border-b border-black/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
          <div>
            <SectionLabel>The Network</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-[-0.06em] mb-8 leading-[0.9]">A Room of <br/> Practitioners.</h2>
            <p className="text-black/60 text-xl leading-relaxed font-medium mb-12">Membership is restricted. The value of the Inner Circle is the high-intent environment created by founders and builders.</p>
            <div className="space-y-6">
              <div className="flex items-start gap-4 border-l-2 border-[#D4AF37] pl-6">
                <h4 className="text-sm font-bold uppercase tracking-widest">Extreme Accountability</h4>
              </div>
              <div className="flex items-start gap-4 border-l-2 border-black/5 pl-6">
                <h4 className="text-sm font-bold uppercase tracking-widest">Lifetime Alumni Access</h4>
              </div>
            </div>
          </div>
          <div>
            <SectionLabel>The Opportunity</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-[-0.06em] mb-8 leading-[0.9]">Institutional <br/> Pipeline.</h2>
            <p className="text-black/60 text-xl leading-relaxed font-medium mb-12">We don&apos;t promise jobs; we provide a high-level venue for access. Top performers are positioned for direct roles.</p>
            <div className="grid grid-cols-1 gap-4">
              <div className="p-8 bg-[#F9F9F9] rounded-sm">
                <h4 className="text-black font-bold uppercase tracking-[-0.06em] text-lg mb-2">Agency Roles</h4>
                <p className="text-xs text-black/55 uppercase tracking-widest font-bold">Direct pathways to Blade Media ecosystem.</p>
              </div>
              <div className="p-8 bg-[#F9F9F9] rounded-sm">
                <h4 className="text-black font-bold uppercase tracking-[-0.06em] text-lg mb-2">Partner Network</h4>
                <p className="text-xs text-black/55 uppercase tracking-widest font-bold">Referrals to high-growth consumer brands.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-[9vw] font-bold uppercase tracking-[-0.06em] mb-12 leading-[0.8]">Earn your <br/> entry.</h2>
          <button 
            onClick={() => router.push("/apply/login")}
            className="bg-black text-white px-20 py-8 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#D4AF37] transition-all flex items-center gap-4 mx-auto shadow-2xl"
          >
            Submit Admission File <ArrowUpRight size={18}/>
          </button>
          <p className="mt-8 text-black/45 text-[10px] uppercase tracking-[0.4em] font-bold">Next Batch: Commencing May 2026</p>
        </div>
      </section>

      <footer className="py-20 px-6 text-center border-t border-black/5 bg-[#F9F9F9]">
        <p className="text-[10px] font-bold uppercase tracking-[0.8em] text-black/35">Blade Inner Circle — Stop Consuming. Start Operating.</p>
      </footer>
    </main>
  );
}
