"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import CustomCursor from "@/components/CustomCursor";
import DrawingCanvas from "@/components/DrawingCanvas";
import Scene3D from "@/components/Scene3D";
import { useSite } from "@/context/SiteContext";
import { useAuth } from "@/context/AuthContext";

import Hero from "@/components/sections/Hero";
import Philosophy from "@/components/sections/Philosophy";
import LogoMarquee from "@/components/sections/LogoMarquee";
import Process from "@/components/sections/Process";
import Solutions from "@/components/sections/Solutions";
import Galleries from "@/components/sections/Galleries";
import AgencyFooter from "@/components/sections/AgencyFooter";

import InnerCircleHero from "@/components/sections/InnerCircleHero";
import CohortMetrics from "@/components/sections/CohortMetrics";
import Members from "@/components/sections/Members";
import CreatorsMap from "@/components/sections/CreatorsMap";
import Manifesto from "@/components/sections/Manifesto";
import SprintProtocol from "@/components/sections/SprintProtocol";
import FounderAuthority from "@/components/sections/FounderAuthority";
import InnerCircleCTA from "@/components/sections/InnerCircleCTA";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const { mode, toggleMode } = useSite();
  const isAgency = mode === "agency";
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({ target: containerRef });
  const navButtonOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const [hideHeader, setHideHeader] = useState(false);

  const handleToggle = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    toggleMode();
  };

  return (
    <motion.main 
      ref={containerRef} 
      animate={{ backgroundColor: isAgency ? "#000000" : "#050505" }}
      className="relative overflow-x-hidden selection:bg-[#F3D7A7] selection:text-black"
      style={{ transition: "background-color 0.8s ease" }}
    >
      <CustomCursor />
      
      {isAgency && (
        <>
          <DrawingCanvas color="#F3D7A7" />
          <Scene3D />
        </>
      )}

      {/* SEPARATE LOGO & TOGGLE FROM HEADER */}
      {isAgency && (
        <div className="fixed top-6 left-6 md:top-8 md:left-8 z-[110] pointer-events-auto">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-300"
          >
            <Image src="/blade-logo.png" alt="Blade Logo" width={48} height={48} priority className="w-full h-full object-contain brightness-0 invert" />
          </motion.button>
        </div>
      )}

      {isAgency && (
        <div className="fixed top-6 right-6 md:top-8 md:right-8 z-[110] pointer-events-auto flex items-center gap-2 md:gap-3">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={handleToggle} 
            className="px-4 py-2.5 md:px-6 md:py-3 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] transition-all hover:scale-105 bg-white/5 border border-white/10 text-white hover:bg-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          >
            The Inner Circle
          </motion.button>
        </div>
      )}

      {/* COMPACT PREMIUM HEADER (NAV ONLY) - AGENCY ONLY */}
      {isAgency && (
        <motion.header 
          style={{ opacity: navButtonOpacity }}
          className="fixed bottom-8 md:top-8 md:bottom-auto left-0 right-0 z-[100] px-6 flex justify-center pointer-events-none font-['Helvetica',_sans-serif]"
        >
          <div className="flex items-center gap-1.5 md:gap-2 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-full p-1 md:p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto relative group">
            <nav className="flex items-center gap-0.5 md:gap-1 px-1 md:px-2">
              {[
                { label: 'Process', id: 'section_process' },
                { label: 'Solutions', id: 'section_solutions' },
                { label: 'Edits', id: 'section_edits' }
              ].map((item) => (
                <motion.a 
                  key={item.label} 
                  href={`#${item.id}`}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 md:px-5 py-2 md:py-2.5 text-white/50 hover:text-white text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] transition-all duration-300 rounded-full hover:bg-white/5"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <div className="flex items-center">
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F3D7A7] text-black px-5 md:px-8 py-3 md:py-3.5 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-[0.05em] hover:shadow-[0_0_30px_rgba(243,215,167,0.3)] transition-all shadow-xl whitespace-nowrap"
              >
                contact us
              </motion.a>
            </div>
          </div>
        </motion.header>
      )}

      {/* SOLID FULL-LENGTH HEADER - INNER CIRCLE */}
      {!isAgency && (
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ 
            y: hideHeader ? -100 : 0, 
            opacity: hideHeader ? 0 : 1 
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed top-0 left-0 right-0 w-full z-[100] bg-[#030303]/80 backdrop-blur-xl border-b border-white/5 px-6 md:px-12 h-14 md:h-16 flex items-center justify-between font-['Helvetica',_sans-serif]"
        >
          {/* Logo on the left */}
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center cursor-none"
          >
            <Image src="/inner-circle-logo.png" alt="Blade Inner Circle Logo" width={44} height={44} priority className="w-full h-full object-contain brightness-0 invert" />
          </motion.button>

          {/* Navigation Links on the right */}
          <nav className="flex items-center gap-5 md:gap-8 font-['Helvetica',_sans-serif]">
            <motion.button 
              onClick={handleToggle} 
              className="text-white/50 hover:text-white text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] transition-colors cursor-none"
            >
              Exit to Agency
            </motion.button>
            <motion.button 
              onClick={() => router.push(user ? "/dashboard" : "/apply/login")}
              className="text-white/50 hover:text-white text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] transition-colors cursor-none"
            >
              {user ? "Profile" : "Sign In"}
            </motion.button>
            <motion.button 
              onClick={() => router.push("/apply/register")}
              className="text-[#F3D7A7] hover:text-[#FFF0D4] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] transition-colors cursor-none flex items-center gap-1 group"
            >
              <span>Apply</span>
              <span className="inline-block group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">↗</span>
            </motion.button>
          </nav>
        </motion.header>
      )}

      <AnimatePresence mode="wait">
        {isAgency ? (
          <motion.div key="agency" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Hero />
            <Philosophy />
            <LogoMarquee />
            <Process />
            <Solutions />
            <Galleries />
            <AgencyFooter />
          </motion.div>
        ) : (
          <motion.div key="innerCircle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-white bg-[#050505] min-h-screen">
            <InnerCircleHero user={user} onJoinWaitlist={() => router.push("/apply/register")} />
            <CohortMetrics />
            <div 
              className="h-[320px] w-full relative z-10 pointer-events-none" 
              style={{ 
                background: "linear-gradient(to bottom, #000000 0%, #0a0a0a 15%, #171717 35%, #2c2b29 55%, #5c5a54 70%, #9c9992 82%, #dcdad5 92%, #faf9f6 97%, #ffffff 100%)" 
              }} 
            />
            <Members />
            <CreatorsMap onActiveStateChange={setHideHeader} />
            <Manifesto />
            <SprintProtocol />
            <FounderAuthority />
            <InnerCircleCTA onJoinWaitlist={() => router.push("/apply/register")} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}

// Deploy Trigger: 2026-07-15T01:31:00Z

