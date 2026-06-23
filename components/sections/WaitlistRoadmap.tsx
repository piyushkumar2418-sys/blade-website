"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ShieldAlert, FileText, CheckCircle2, ChevronRight } from "lucide-react";

export default function WaitlistRoadmap() {
  const [activePhase, setActivePhase] = useState<number>(0);

  const perks = [
    {
      num: "01",
      title: "24-Hour Clearance",
      desc: "Receive your unique access portal invitation link exactly 24 hours before the general public.",
      icon: Clock,
      highlight: "Early Access"
    },
    {
      num: "02",
      title: "Instant SOP Node",
      desc: "Upon waitlist clearance, receive the exact high-retention editing SOP (PDF + assets) used for our top creators.",
      icon: FileText,
      highlight: "Instant Asset"
    },
    {
      num: "03",
      title: "Queue Priority",
      desc: "Vetted waitlist applicants bypass initial manual filters when Cohort 02 registrations open.",
      icon: ShieldAlert,
      highlight: "Manual Vetting"
    }
  ];

  const phases = [
    {
      phase: "Phase 01",
      title: "Skill Moat Mastery",
      subtitle: "Retention-Based Visual Engineering",
      desc: "Learn how to build pacing models, retention tricks, and advanced visual narrative flow that commands user retention. This is where you separate yourself from commoditized editors.",
      points: [
        "Advanced retention pacing systems",
        "Interactive sound design and spatial audio",
        "Visual hook frameworks and loop strategies"
      ]
    },
    {
      phase: "Phase 02",
      title: "Infrastructure Setup",
      subtitle: "Workspace Engineering & Asset Architecture",
      desc: "Build a streamlined editing workspace, asset managers, and custom templates. Optimize your computer, render engines, and pipeline architecture to produce video assets in half the time.",
      points: [
        "Cloud-based collaboration networks",
        "Custom asset presets & script libraries",
        "Resolve & Premiere workflow acceleration"
      ]
    },
    {
      phase: "Phase 03",
      title: "Capital Extraction",
      subtitle: "High-Ticket Client Acquisition Pipeline",
      desc: "Establish your outbound client channels, pricing structures, and retainer packages. Stop charging per video and start selling high-end retention packages to top creators and agencies.",
      points: [
        "Inbound client funnels & outreach scripts",
        "Retainer negotiation & value-pricing models",
        "Case study synthesis & closing scripts"
      ]
    },
    {
      phase: "Phase 04",
      title: "Velocity Scaling",
      subtitle: "Editor Systems & Scaling SOPs",
      desc: "Transition from operator to manager. Recruit, vet, and train editors. Put your agency on autopilot with delegable SOPs and automated review processes.",
      points: [
        "Editor onboarding & vetting protocols",
        "Quality assurance & review systems",
        "Agency margins and manager delegations"
      ]
    }
  ];

  return (
    <section className="py-32 px-6 md:px-24 bg-[#050505] text-white border-t border-white/5 relative overflow-hidden">
      {/* Dynamic Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#F3D7A7 1px, transparent 1px), linear-gradient(90deg, #F3D7A7 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* SECTION: PRIORITY PERKS */}
        <div className="mb-32">
          <div className="max-w-xl text-left mb-20">
            <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold">
              VERIFIED APPLICANT ADVANTAGE
            </span>
            <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tight leading-[0.9] text-white">
              Waitlist Priority <br />
              <span className="text-white/30">Privileges.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {perks.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ 
                    y: -8,
                    rotateX: 1.5,
                    rotateY: -1.5,
                    transition: { duration: 0.2 }
                  }}
                  className="p-10 bg-white/[0.02] border border-white/5 hover:border-[#F3D7A7]/40 hover:bg-white/[0.04] rounded-2xl transition-all duration-500 shadow-2xl relative overflow-hidden text-left"
                  style={{ perspective: "1000px" }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#F3D7A7]/5 rounded-full blur-3xl group-hover:bg-[#F3D7A7]/10 pointer-events-none" />
                  
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-xs font-mono text-white/30 font-bold">{perk.num} //</span>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#F3D7A7]/60 bg-[#F3D7A7]/5 px-2.5 py-1 border border-[#F3D7A7]/10 rounded-full">
                      {perk.highlight}
                    </span>
                  </div>

                  <div className="bg-[#F3D7A7]/10 p-3.5 rounded-xl border border-[#F3D7A7]/20 w-fit mb-6">
                    <Icon className="text-[#F3D7A7]" size={20} />
                  </div>

                  <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-4">
                    {perk.title}
                  </h3>
                  <p className="text-white/50 text-xs md:text-sm leading-relaxed mb-6 font-mono">
                    {perk.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* SECTION: CURRICULUM ROADMAP */}
        <div>
          <div className="max-w-xl text-left mb-20">
            <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold">
              CURRICULUM ARCHITECTURE
            </span>
            <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tight leading-[0.9] text-white">
              Cohort 02 <br />
              <span className="text-white/30">Roadmap.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Phase Selector Tabs */}
            <div className="lg:col-span-4 space-y-4 text-left">
              {phases.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhase(idx)}
                  className={`w-full p-6 text-left border rounded-xl flex items-center justify-between transition-all duration-300 cursor-pointer ${
                    activePhase === idx
                      ? "bg-white/[0.04] border-[#F3D7A7]/50 text-white shadow-[0_0_20px_rgba(243,215,167,0.05)]"
                      : "bg-transparent border-white/5 text-white/40 hover:border-white/10 hover:text-white/60"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <span className={`text-[9px] font-mono font-bold tracking-widest uppercase ${
                      activePhase === idx ? "text-[#F3D7A7]" : "text-white/30"
                    }`}>
                      {item.phase}
                    </span>
                    <span className="text-sm font-bold uppercase tracking-wide">
                      {item.title}
                    </span>
                  </div>
                  <ChevronRight size={16} className={`transition-transform duration-300 ${
                    activePhase === idx ? "translate-x-1 text-[#F3D7A7]" : "text-white/20"
                  }`} />
                </button>
              ))}
            </div>

            {/* Phase Details Card */}
            <div className="lg:col-span-8">
              <motion.div
                key={activePhase}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 md:p-12 text-left"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-8 mb-8">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#F3D7A7]">
                      {phases[activePhase].phase} // ACTIVE SPEC
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white">
                      {phases[activePhase].title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-white/50 border border-white/10 rounded-full px-4 py-1.5 bg-white/5 w-fit">
                    {phases[activePhase].subtitle}
                  </span>
                </div>

                <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 font-mono">
                  {phases[activePhase].desc}
                </p>

                <div className="space-y-4">
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#F3D7A7]/70">
                    Core Learning Nodes:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {phases[activePhase].points.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                        <CheckCircle2 size={16} className="text-[#F3D7A7] shrink-0 mt-0.5" />
                        <span className="text-xs font-mono uppercase tracking-wider text-white/70">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
