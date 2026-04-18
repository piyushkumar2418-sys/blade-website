"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Zap, Users, Trophy, Target, Globe, Rocket, Star, Briefcase } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";

export default function CurriculumPage() {
  const journey = [
    { title: "The Basics", desc: "Pick your niche and master the editing styles that actually go viral in 2026." },
    { title: "Your Brand", desc: "Build a high-ticket offer and optimize your profiles to attract premium clients." },
    { title: "Getting Clients", desc: "Master cold outreach and lead generation. Stop waiting for work to find you." },
    { title: "Closing Deals", desc: "Learn how to talk to founders, handle objections, and sign your first ₹1L+ client." },
    { title: "Scaling Up", desc: "Build a small team and set up systems so the business runs without you." }
  ];

  return (
    <main className="bg-white text-black min-h-screen font-sans selection:bg-[#F3D7A7]">
      <CustomCursor />
      
      {/* --- HERO: CLEAR & DIRECT --- */}
      <section className="pt-32 pb-20 px-6 md:px-24">
        <div className="max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <span className="bg-[#F3D7A7]/20 text-black px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">The 60-Day Roadmap</span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-tight uppercase">
              Become a <br /> <span className="text-[#F3D7A7]">Digital Operator.</span>
            </h1>
            <p className="text-xl md:text-2xl text-black/60 max-w-2xl font-medium leading-relaxed">
              We don't teach theory. We give you the exact systems we use at Blade Media to build your own agency and secure high-paying clients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- THE 3 BIG OUTCOMES --- */}
      <section className="py-20 px-6 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <OutcomeCard 
            icon={<Rocket className="text-orange-500" />}
            title="Start Your Agency" 
            desc="Move from a solo freelancer to an agency owner with systems that scale."
          />
          <OutcomeCard 
            icon={<Briefcase className="text-blue-500" />}
            title="Top Placements" 
            desc="Get priority access to jobs at leading marketing agencies and fast-growing companies."
          />
          <OutcomeCard 
            icon={<Star className="text-yellow-500" />}
            title="The 1% Community" 
            desc="Surround yourself with a community of ambitious people doing the same work."
          />
        </div>
      </section>

      {/* --- THE JOURNEY: STEP BY STEP --- */}
      <section className="py-24 px-6 md:px-24 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 uppercase">The Learning Path</h2>
            <p className="text-black/50 text-lg">Five phases designed to take you from zero to your first ₹1,00,000 month.</p>
          </div>

          <div className="space-y-4">
            {journey.map((step, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 10 }}
                className="bg-white p-8 border border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-6">
                  <span className="text-4xl font-black text-black/5">0{i + 1}</span>
                  <div>
                    <h3 className="text-xl font-bold uppercase">{step.title}</h3>
                    <p className="text-black/50 font-medium">{step.desc}</p>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-[#F9F9F9] flex items-center justify-center">
                  <ArrowUpRight size={20} className="text-black/20" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
            Ready to change <br /> your trajectory?
          </h2>
          <button 
            onClick={() => window.location.href = "/apply/login"}
            className="bg-black text-white px-12 py-6 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-2xl"
          >
            Apply for Admission
          </button>
          <p className="text-black/30 text-xs uppercase tracking-widest">Next Batch starts May 2026</p>
        </div>
      </section>
    </main>
  );
}

function OutcomeCard({ icon, title, desc }: any) {
  return (
    <div className="p-10 bg-white border border-black/5 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
      <div className="h-14 w-14 bg-[#F9F9F9] rounded-2xl flex items-center justify-center mb-8">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">{title}</h3>
      <p className="text-black/50 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}