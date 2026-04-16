"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Zap, Users, Target, Laptop, LineChart } from "lucide-react";

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="h-[1px] w-8 bg-[#F3D7A7]" />
    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/40">{children}</span>
  </div>
);

export default function InnerCircle() {
  return (
    <div className="bg-white text-black min-h-screen font-sans selection:bg-[#F3D7A7]">
      
      {/* 1. HERO SECTION */}
      <section className="h-screen flex flex-col justify-center px-6 md:px-24 border-b border-black/5">
        <motion.span 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-xs uppercase tracking-[0.5em] font-bold mb-8 block text-black/40"
        >
          Blade Inner Circle
        </motion.span>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-[12vw] md:text-[8vw] font-bold leading-[0.85] tracking-tighter uppercase mb-12"
        >
          The School of <br/> Modern Content.
        </motion.h1>
        <motion.div 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-12"
        >
          <p className="text-2xl md:text-4xl text-black/60 leading-tight font-medium max-w-2xl">
            Build your agency. <br/> From skill to first income.
          </p>
          <div className="flex flex-col items-start md:items-end gap-6">
            <span className="text-[#F3D7A7] font-bold uppercase tracking-[0.3em] text-[10px] border border-[#F3D7A7]/30 px-4 py-2">
              Cohort 01 — Applications Open
            </span>
            <button className="bg-black text-white px-12 py-6 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#F3D7A7] hover:text-black transition-all flex items-center gap-4">
              Apply for Admission <ArrowUpRight size={18}/>
            </button>
          </div>
        </motion.div>
      </section>

      {/* 2. WHAT THIS IS */}
      <section className="py-32 px-6 md:px-24 max-w-7xl">
        <SectionLabel>Institutional Thesis</SectionLabel>
        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.9] mb-12">
          Theoretical learning is a trap. <br/> 
          <span className="text-black/20">This is an execution lab.</span>
        </h2>
        <p className="text-xl md:text-3xl text-black/60 leading-relaxed font-light max-w-4xl">
          Blade Inner Circle is a 2-month intensive for those who refuse to be passive. 
          We don't watch videos; we deploy systems. You are entering a room where 
          the only metric of success is the infrastructure you build and the revenue you generate.
        </p>
      </section>

      {/* 3. WHY BLADE INNER CIRCLE */}
      <section className="py-32 px-6 md:px-24 bg-[#F9F9F9] border-y border-black/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <SectionLabel>The Difference</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-12">Extracted from <br/> the trenches.</h2>
          </div>
          <div className="space-y-12">
            <div>
              <h4 className="text-xl font-bold uppercase mb-4">Zero Theory</h4>
              <p className="text-black/50 leading-relaxed">Everything here was decoded over thousands of hours of real-world client work at Blade Media. We share the silent mechanics that courses don't know exist.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold uppercase mb-4">High Stakes</h4>
              <p className="text-black/50 leading-relaxed">This isn't a classroom. It’s a high-pressure environment designed to move you from amateur creator to agency operator in 60 days.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT YOU BUILD */}
      <section className="py-32 px-6 md:px-24">
        <SectionLabel>The Ledger</SectionLabel>
        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-20 text-center">Tangible Assets.</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: <Target />, t: "Skill Moat", d: "Mastery over retention and editing fundamentals." },
            { icon: <Laptop />, t: "Service Engine", d: "A high-ticket offer that clients actually need." },
            { icon: <Users />, t: "Client Pipeline", d: "A repeatable system for acquisition." },
            { icon: <LineChart />, t: "Income Path", d: "A clear trajectory to ₹1L/month." }
          ].map((item, i) => (
            <div key={i} className="p-10 border border-black/5 hover:border-[#F3D7A7] transition-all">
              <div className="text-[#F3D7A7] mb-6">{item.icon}</div>
              <h3 className="text-xl font-bold uppercase mb-4">{item.t}</h3>
              <p className="text-sm text-black/40 leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. THE JOURNEY (8 WEEKS) */}
      <section className="py-32 px-6 md:px-24 bg-black text-white">
        <SectionLabel>The 60-Day Build</SectionLabel>
        <div className="space-y-24 mt-20">
          {[
            { p: "Phase 01", t: "Foundation & Synthesis", d: "Stripping away amateur habits. Mastering the silent physics of content and niche selection." },
            { p: "Phase 02", t: "Asset Architecture", d: "Building your offer and framing your skill as a high-leverage liquid asset." },
            { p: "Phase 03", t: "The Acquisition Engine", d: "Deploying outreach systems and mastering the psychology of high-ticket sales." },
            { p: "Phase 04", t: "Scale & Leverage", d: "Client delivery systems, team moats, and removing yourself from the fulfillment loop." }
          ].map((phase, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-white/10 pb-16">
              <span className="md:col-span-2 font-mono text-[#F3D7A7] text-sm">{phase.p}</span>
              <h3 className="md:col-span-4 text-3xl font-bold uppercase tracking-tighter">{phase.t}</h3>
              <p className="md:col-span-6 text-white/40 text-lg leading-relaxed font-light">{phase.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. HOW IT WORKS */}
      <section className="py-32 px-6 md:px-24 grid grid-cols-1 md:grid-cols-3 gap-1">
        <div className="p-12 bg-[#F9F9F9] border border-black/5">
          <Zap className="mb-8 text-[#F3D7A7]" />
          <h4 className="font-bold uppercase mb-4">Live Sprints</h4>
          <p className="text-sm text-black/40">Weekly interactive builds where we solve real-world agency bottlenecks in real-time.</p>
        </div>
        <div className="p-12 bg-[#F9F9F9] border border-black/5">
          <Target className="mb-8 text-[#F3D7A7]" />
          <h4 className="font-bold uppercase mb-4">Hot Seats</h4>
          <p className="text-sm text-black/40">Your systems and outreach put under the microscope for surgical feedback.</p>
        </div>
        <div className="p-12 bg-[#F9F9F9] border border-black/5">
          <ShieldCheck className="mb-8 text-[#F3D7A7]" />
          <h4 className="font-bold uppercase mb-4">Execution Logs</h4>
          <p className="text-sm text-black/40">Daily accountability and tracking to ensure you are building, not just watching.</p>
        </div>
      </section>

      {/* 7. FOUNDER STORY */}
      <section className="py-32 px-6 md:px-24 bg-white">
        <div className="max-w-4xl">
          <SectionLabel>The Founder</SectionLabel>
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.9] mb-12">I didn't have a mentor. <br/> I had deadlines.</h2>
          <p className="text-xl md:text-2xl text-black/60 leading-relaxed font-light mb-8">
            I started at 13. I learned content and agency building by failing until I didn't. 
            Blade Media is the result of that experimentation. 
            The Inner Circle exists because I wanted to build the room I didn't have when I started—a place of raw truth and engineered results.
          </p>
        </div>
      </section>

      {/* 8. ADMISSION */}
      <section className="py-40 px-6 md:px-24 text-center border-t border-black/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter mb-12">Admission <br/> is Earned.</h2>
          <p className="text-black/40 text-lg uppercase tracking-widest mb-16">Entry is restricted to 10 architects per batch.</p>
          <button className="bg-black text-white px-20 py-8 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#F3D7A7] hover:text-black transition-all shadow-2xl">
            Request Admission Portfolio
          </button>
        </div>
      </section>

      {/* 9. FINAL STATEMENT */}
      <footer className="py-20 px-6 text-center bg-[#F9F9F9]">
        <p className="text-[10px] font-bold uppercase tracking-[0.8em] text-black/20">
          Stop Consuming. Start Operating.
        </p>
      </footer>
    </div>
  );
}