"use client";
import React from "react";
import { motion } from "framer-motion";
import { Clock, ShieldAlert, FileText } from "lucide-react";

export default function WaitlistRoadmap() {
  const perks = [
    {
      num: "01 // Clearance",
      title: "24-Hour Clearance",
      desc: "Receive your unique access portal invitation link exactly 24 hours before the general public.",
      icon: Clock,
      highlight: "Early Access"
    },
    {
      num: "02 // Assets",
      title: "Instant SOP Node",
      desc: "Upon waitlist clearance, receive the exact high-retention editing SOP (PDF + assets) used for our top creators.",
      icon: FileText,
      highlight: "Instant Asset"
    },
    {
      num: "03 // Queue",
      title: "Queue Priority",
      desc: "Vetted waitlist applicants bypass initial manual filters when Cohort 02 registrations open.",
      icon: ShieldAlert,
      highlight: "Manual Vetting"
    }
  ];

  const phases = [
    {
      phase: "Phase 01",
      title: "Skill Moat",
      subtitle: "Retention Editing",
      desc: "Learn to build pacing models, retention tricks, and advanced visual narrative flow that commands user retention.",
      points: [
        "Advanced pacing systems",
        "Spatial audio design",
        "Visual hook frameworks"
      ]
    },
    {
      phase: "Phase 02",
      title: "Workspace Setup",
      subtitle: "Infra Engineering",
      desc: "Build a streamlined editing workspace, asset managers, and custom presets to edit in half the time.",
      points: [
        "Cloud collab networks",
        "Custom asset presets",
        "Workflow acceleration"
      ]
    },
    {
      phase: "Phase 03",
      title: "Capital Extraction",
      subtitle: "Client Acquisition",
      desc: "Establish outbound client channels, pricing structures, and value-based retainers to close high-paying clients.",
      points: [
        "Inbound client funnels",
        "Outreach scripts",
        "Objection handling"
      ]
    },
    {
      phase: "Phase 04",
      title: "Velocity Scaling",
      subtitle: "System Automation",
      desc: "Transition from editor to manager. Recruit, vet, and train editors. Put your agency on autopilot with delegable SOPs.",
      points: [
        "Editor vetting protocols",
        "Quality assurance setups",
        "Manager delegations"
      ]
    }
  ];

  return (
    <section className="py-32 px-6 md:px-24 bg-[#020202] text-white border-t border-white/5 relative overflow-hidden">
      {/* Connected Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#F3D7A7 1px, transparent 1px), linear-gradient(90deg, #F3D7A7 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* SECTION: PRIORITY PERKS */}
        <div className="mb-32">
          <div className="max-w-xl text-left mb-16">
            <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold font-mono">
              VERIFIED APPLICANT ADVANTAGE
            </span>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight leading-[0.9] text-white">
              Waitlist Priority <br />
              <span className="font-serif italic font-normal text-[#F3D7A7] lowercase tracking-normal">privileges.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {perks.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-10 md:p-12 bg-black/60 backdrop-blur-md hover:bg-white/[0.01] transition-all duration-300 relative group flex flex-col justify-between text-left animate-none"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#F3D7A7]/[0.02] rounded-full blur-2xl group-hover:bg-[#F3D7A7]/[0.05] pointer-events-none" />
                  
                  <div>
                    <div className="flex justify-between items-center mb-8">
                      <span className="text-[10px] font-mono text-white/30 font-bold uppercase">{perk.num}</span>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#F3D7A7]/80 bg-[#F3D7A7]/5 px-2.5 py-1 border border-[#F3D7A7]/10 rounded-full">
                        {perk.highlight}
                      </span>
                    </div>

                    <div className="bg-[#F3D7A7]/5 p-3 rounded-xl border border-[#F3D7A7]/10 w-fit mb-6">
                      <Icon className="text-[#F3D7A7]" size={18} />
                    </div>

                    <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-4">
                      {perk.title}
                    </h3>
                  </div>
                  
                  <p className="text-white/40 text-xs md:text-sm leading-relaxed font-mono">
                    {perk.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* SECTION: CURRICULUM ROADMAP */}
        <div>
          <div className="max-w-xl text-left mb-16">
            <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold font-mono">
              CURRICULUM ARCHITECTURE
            </span>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight leading-[0.9] text-white">
              Cohort 02 <br />
              <span className="font-serif italic font-normal text-[#F3D7A7] lowercase tracking-normal">syllabus blueprints.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {phases.map((phase, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 md:p-10 bg-black/60 backdrop-blur-md hover:bg-white/[0.01] transition-all duration-300 relative flex flex-col justify-between min-h-[420px] text-left animate-none"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#F3D7A7]/[0.01] rounded-full blur-xl pointer-events-none" />
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-[10px] font-mono font-bold text-[#F3D7A7]/70 uppercase tracking-widest">{phase.phase}</span>
                    <span className="text-[9px] font-mono font-bold text-white/30 uppercase tracking-wider">{phase.subtitle}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white leading-none">{phase.title}</h3>
                  <p className="text-white/40 text-xs md:text-sm font-mono leading-relaxed">{phase.desc}</p>
                </div>

                <div className="pt-8 border-t border-white/5 space-y-3 mt-8">
                  {phase.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/60 font-bold font-sans">
                      <div className="w-1 h-1 rounded-full bg-[#F3D7A7]" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
