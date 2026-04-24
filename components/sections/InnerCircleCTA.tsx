"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, MessageCircle, 
  ShieldCheck, Zap, Award, Lock 
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const InstagramIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const InnerCircleCTA = () => {
  const router = useRouter();
  const { user } = useAuth();

  const founderStats = [
    { icon: <ShieldCheck size={24} />, label: "Verified Record", desc: "No theories. Only market-proven deployment." },
    { icon: <Zap size={24} />, label: "High Velocity", desc: "60 days from spectator to high-value operator." },
    { icon: <Award size={24} />, label: "Elite Network", desc: "Direct placement pipeline for top performers." },
    { icon: <Lock size={24} />, label: "SOP Access", desc: "Internal systems used for 2.5B+ views." },
  ];

  return (
    <>
      <section className="bg-white text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10 border border-black/10 text-left">
          {founderStats.map((stat, idx) => (
            <motion.div key={idx} className="p-10 bg-white hover:bg-[#F9F9F9] transition-all duration-500 group text-left">
              <div className="mb-6 text-[#F3D7A7] transition-colors duration-500 text-left">{stat.icon}</div>
              <h4 className="text-sm font-bold uppercase tracking-widest leading-tight mb-3 text-left">{stat.label}</h4>
              <p className="text-[10px] text-black/30 uppercase tracking-[0.2em] text-left">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CURRICULUM SECTION */}
      <section className="py-24 px-6 md:px-24 bg-white text-left">
        <div className="max-w-[1280px] mx-auto text-left">
          <div className="bg-black rounded-[60px] p-10 md:p-16 relative overflow-hidden text-left flex flex-col md:flex-row items-center gap-12 min-h-[500px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)]">
            <div className="absolute top-16 right-[35%] w-12 h-12 border border-[#F3D7A7]/20 rounded-full hidden md:block text-left" />
            
            <div className="flex-1 space-y-8 relative z-10 text-left">
              <div className="space-y-4 text-left">
                <span className="text-[#F3D7A7] text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block text-left">What you will learn</span>
                <h2 className="text-white text-5xl md:text-[72px] font-bold uppercase tracking-tight leading-[0.85] mb-8 text-left">
                  The exact systems <br /> behind ₹3Cr+ in <br /> revenue.
                </h2>
              </div>
              <p className="text-white/30 text-lg md:text-xl font-medium max-w-xl leading-relaxed mb-10 text-left">
                We&apos;ve deconstructed the entire agency journey into five easy-to-follow phases. No fluff, just execution.
              </p>
              <motion.button 
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => router.prefetch("/curriculum")}
                onClick={() => router.push("/curriculum")}
                className="bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-[#F3D7A7] transition-all flex items-center gap-4 shadow-xl text-left"
              >
                Explore Full Prospectus <ArrowRight size={20}/>
              </motion.button>
            </div>

            <div className="flex flex-row md:flex-col gap-6 relative z-10 text-left">
              <div className="bg-[#0a0a0a] border border-white/5 rounded-[30px] p-8 w-40 md:w-52 text-center flex flex-col justify-center items-center shadow-xl text-left">
                 <span className="text-white text-5xl font-bold block tracking-tighter mb-1 text-left">60</span>
                 <span className="text-[#F3D7A7] text-[10px] font-bold uppercase tracking-[0.3em] block text-left">Days</span>
              </div>
              <div className="bg-[#0a0a0a] border border-white/5 rounded-[30px] p-8 w-40 md:w-52 text-center flex flex-col justify-center items-center shadow-xl text-left">
                 <span className="text-white text-5xl font-bold block tracking-tighter mb-1 text-left">5</span>
                 <span className="text-[#F3D7A7] text-[10px] font-bold uppercase tracking-[0.3em] block text-left">Phases</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-60 px-6 md:px-24 text-center bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 space-y-32">
          <div className="space-y-12 text-center">
            <span className="text-black/20 text-[10px] font-bold uppercase tracking-[1em] block">Final Briefing</span>
            <h2 className="text-6xl md:text-[120px] font-bold uppercase tracking-tighter leading-[0.8] text-black text-center">
              The next step <br/> is execution.
            </h2>
          </div>
          
          <div className="flex flex-col items-center gap-20 text-center">
            <p className="text-black/40 text-sm md:text-base max-w-md uppercase tracking-[0.4em] leading-relaxed font-medium text-center">
              Secure your position in the May 2026 intake.
            </p>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => router.prefetch(user ? "/dashboard" : "/apply/login")}
              onClick={() => router.push(user ? "/dashboard" : "/apply/login")} 
              className="bg-black text-white px-20 py-8 rounded-full font-bold uppercase tracking-[0.5em] text-[10px] hover:bg-black/80 transition-all duration-500 shadow-2xl"
            >
              Apply Now
            </motion.button>
          </div>

          <div className="pt-40 text-center space-y-16">
            <div className="flex items-center justify-center gap-12">
              <a href="https://wa.me/917082176274" target="_blank" className="text-black/20 hover:text-black transition-all group">
                <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.instagram.com/bladeinnercircle/" target="_blank" className="text-black/20 hover:text-black transition-all group">
                <InstagramIcon size={24} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
            <div className="space-y-4">
              <p className="text-[9px] font-bold uppercase tracking-[1.2em] text-black/30">Stop Consuming. Start Operating.</p>
              <p className="text-[8px] font-bold uppercase tracking-[0.6em] text-black/10">© 2026 Blade // Institutional Access</p>
            </div>
          </div>
        </div>
      </section>
      <div className="h-20 bg-white" />
    </>
  );
};

export default InnerCircleCTA;
