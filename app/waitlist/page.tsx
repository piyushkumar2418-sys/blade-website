"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import { useSite } from "@/context/SiteContext";
import { useAuth } from "@/context/AuthContext";
import WaitlistHero from "@/components/sections/WaitlistHero";
import WaitlistRoadmap from "@/components/sections/WaitlistRoadmap";
import WaitlistFAQ from "@/components/sections/WaitlistFAQ";
import WaitlistTerminal from "@/components/sections/WaitlistTerminal";

export default function WaitlistPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { setMode } = useSite();

  const handleExitToAgency = () => {
    setMode("agency");
    router.push("/");
  };

  const scrollToTerminal = () => {
    const el = document.getElementById("waitlist-terminal-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const input = el.querySelector("input");
        if (input) input.focus();
      }, 600);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#020202] text-white selection:bg-[#F3D7A7] selection:text-black overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Unified Navigation Header (Solid & Full-Width) */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 w-full z-[100] bg-[#020202]/85 backdrop-blur-xl border-b border-white/5 px-6 md:px-24 h-20 md:h-24 flex items-center justify-between font-sans"
      >
        {/* Logo on the left */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center cursor-pointer"
        >
          <Image 
            src="/blade-logo.png" 
            alt="Blade Logo" 
            width={40} 
            height={40} 
            priority 
            className="w-full h-full object-contain brightness-0 invert" 
          />
        </motion.button>

        {/* Navigation Links and CTA on the right */}
        <div className="flex items-center gap-8 md:gap-12">
          <nav className="hidden md:flex items-center gap-8">
            <motion.button 
              onClick={handleExitToAgency}
              className="text-white/60 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors cursor-pointer"
            >
              Exit to Agency
            </motion.button>
            <motion.button 
              onClick={() => router.push(user ? "/dashboard" : "/apply/login")}
              className="text-white/60 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors cursor-pointer"
            >
              {user ? "Profile" : "Sign In"}
            </motion.button>
          </nav>

          <div className="flex items-center gap-4">
            <nav className="flex md:hidden items-center gap-4">
              <motion.button 
                onClick={() => router.push(user ? "/dashboard" : "/apply/login")}
                className="text-white/60 hover:text-white text-[10px] font-bold uppercase tracking-[0.15em] transition-colors cursor-pointer"
              >
                {user ? "Profile" : "Sign In"}
              </motion.button>
            </nav>

            <motion.button 
              whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(243, 215, 167, 0.25)" }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToTerminal}
              className="bg-[#F3D7A7] text-black px-6 md:px-8 py-3 md:py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.1em] shadow-xl whitespace-nowrap cursor-pointer hover:bg-white hover:text-black transition-all duration-300"
            >
              Join Waitlist
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <WaitlistHero onJoinWaitlist={scrollToTerminal} />

      {/* Embedded Terminal Section (Bento Split Layout) */}
      <section 
        id="waitlist-terminal-section" 
        className="py-24 px-6 md:px-24 border-t border-white/5 relative bg-[#020202]"
      >
        {/* Glowing backdrop spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F3D7A7]/[0.02] rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] font-mono font-bold">
              SECURE CONSOLE INTERFACE
            </span>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-white leading-none">
              Initialize Waitlist <span className="font-serif italic font-normal text-[#F3D7A7] lowercase tracking-normal">entry.</span>
            </h2>
          </div>

          {/* Connected Bento Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            
            {/* Left Column: System metrics */}
            <div className="lg:col-span-4 p-8 md:p-10 bg-black/60 backdrop-blur-md flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 text-left font-mono">
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] font-bold text-[#F3D7A7] uppercase tracking-widest block mb-2">// SECURITY PROTOCOL</span>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight">Access Clearance</h3>
                  <p className="text-white/40 text-[11px] leading-relaxed mt-2 uppercase tracking-wide">
                    Applications are manually audited. Lock in your identity vectors below to begin verification.
                  </p>
                </div>

                <div className="border-t border-white/5 pt-6 space-y-4">
                  <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest block">SYSTEM INTEL</span>
                  
                  <div className="space-y-2 text-[10px] uppercase tracking-wider text-white/50">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span>GATEWAY_ROUTE</span>
                      <span className="text-[#F3D7A7]">/api/waitlist</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span>SECURE_CIPHER</span>
                      <span className="text-white/80">ECDHE-RSA-AES128</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span>HOST_DATABASE</span>
                      <span className="text-white/80">firestore.core</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span>SYSTEM_LATENCY</span>
                      <span className="text-emerald-500 animate-pulse">12ms (ACTIVE)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>QUEUE_CAPACITY</span>
                      <span className="text-amber-500">selective_bandwidth</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/5 pt-6 text-[9px] text-[#F3D7A7]/70 uppercase tracking-widest leading-relaxed">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 mr-2 animate-ping" />
                WARNING: Unauthorized entries and bot submission attempts are automatically blacklisted.
              </div>
            </div>

            {/* Right Column: Waitlist terminal */}
            <div className="lg:col-span-8 p-6 md:p-8 bg-black/40 backdrop-blur-md flex flex-col justify-center items-center">
              <div className="w-full">
                <WaitlistTerminal inline={true} />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Roadmap & Perks Section */}
      <WaitlistRoadmap />

      {/* FAQ Section */}
      <WaitlistFAQ />

      {/* Dark Footer */}
      <footer className="py-20 px-6 text-center border-t border-white/5 bg-[#020202] relative z-20">
        <p className="text-[10px] font-bold uppercase tracking-[0.8em] text-white/30">
          © 2026 Blade Inner Circle — Stop Consuming. Start Operating.
        </p>
      </footer>
    </main>
  );
}
