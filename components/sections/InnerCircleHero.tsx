"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";

interface InnerCircleHeroProps {
  user: User | null;
}

const InnerCircleHero = ({ user }: InnerCircleHeroProps) => {
  const router = useRouter();
  
  return (
    <section className="h-screen flex flex-col justify-center px-6 md:px-24 border-b border-black/5 text-left">
      <div className="flex justify-between items-start mb-8 text-left">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-[0.5em] font-bold block text-black/40 text-left">Blade Inner Circle</motion.span>
        <div className="px-4 py-2 border border-black/10 bg-black/5 text-black font-bold uppercase tracking-[0.3em] text-[10px] text-left">
          May 2026 Intake
        </div>
      </div>
      <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-[12vw] md:text-[8vw] font-bold leading-[0.85] tracking-[-0.06em] uppercase mb-12 text-left">The School of <br/> Modern Content.</motion.h1>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 text-left">
        <p className="text-2xl md:text-4xl text-black/60 leading-tight font-medium max-w-2xl text-left">Build your agency. <br/> From skill to first income.</p>
        <div className="flex flex-col items-start md:items-end gap-6 text-left">
          <span className="text-[#F3D7A7] font-bold uppercase tracking-[0.3em] text-[10px] border border-[#F3D7A7]/30 px-4 py-2 text-left">Cohort 01 — Applications Open</span>
          <button onClick={() => router.push(user ? "/apply/register" : "/apply/login")} className="bg-black text-white px-12 py-6 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#F3D7A7] hover:text-black transition-all flex items-center gap-4 shadow-2xl text-left">Apply now <ArrowUpRight size={18}/></button>
        </div>
      </div>
    </section>
  );
};

export default InnerCircleHero;
