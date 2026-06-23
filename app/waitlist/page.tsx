"use client";
import React, { useRef } from "react";
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
    <main className="relative min-h-screen bg-[#050505] text-white selection:bg-[#F3D7A7] selection:text-black overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Unified Navigation Header (Solid & Full-Width) */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 w-full z-[100] bg-[#030303]/80 backdrop-blur-xl border-b border-white/5 px-6 md:px-24 h-20 md:h-24 flex items-center justify-between font-sans"
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

      {/* Embedded Terminal Section */}
      <section 
        id="waitlist-terminal-section" 
        className="py-24 px-6 md:px-24 border-t border-white/5 relative bg-[#030303]"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F3D7A7]/5 rounded-full blur-[150px]" />
        </div>
        
        <div className="max-w-[1400px] mx-auto flex flex-col items-center relative z-10">
          <div className="max-w-xl text-center mb-16 space-y-4">
            <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] font-bold">
              SECURE CONSOLE INTERFACE
            </span>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white">
              Initialize Waitlist <span className="text-white/30">Entry.</span>
            </h2>
            <p className="text-white/40 text-xs md:text-sm font-mono max-w-md mx-auto">
              Authenticate your identity vectors to secure your placement ticket. Ensure all entries are validated.
            </p>
          </div>

          <div className="w-full max-w-3xl">
            <WaitlistTerminal inline={true} />
          </div>
        </div>
      </section>

      {/* Roadmap & Perks Section */}
      <WaitlistRoadmap />

      {/* FAQ Section */}
      <WaitlistFAQ />

      {/* Dark Footer */}
      <footer className="py-20 px-6 text-center border-t border-white/5 bg-[#030303] relative z-20">
        <p className="text-[10px] font-bold uppercase tracking-[0.8em] text-white/30">
          © 2026 Blade Inner Circle — Stop Consuming. Start Operating.
        </p>
      </footer>
    </main>
  );
}
