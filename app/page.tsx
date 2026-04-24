"use client";
import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import CustomCursor from "@/components/CustomCursor";
import DrawingCanvas from "@/components/DrawingCanvas";
import Scene3D from "@/components/Scene3D";
import { useSite } from "@/context/SiteContext";
import { useAuth } from "@/context/AuthContext";

// --- DYNAMIC IMPORTS (Lazy Loading) ---
const Hero = dynamic(() => import("@/components/sections/Hero"));
const Philosophy = dynamic(() => import("@/components/sections/Philosophy"));
const LogoMarquee = dynamic(() => import("@/components/sections/LogoMarquee"));
const Process = dynamic(() => import("@/components/sections/Process"));
const Solutions = dynamic(() => import("@/components/sections/Solutions"));
const Galleries = dynamic(() => import("@/components/sections/Galleries"));
const AgencyFooter = dynamic(() => import("@/components/sections/AgencyFooter"));

const InnerCircleHero = dynamic(() => import("@/components/sections/InnerCircleHero"));
const Crisis = dynamic(() => import("@/components/sections/Crisis"));
const Manifesto = dynamic(() => import("@/components/sections/Manifesto"));
const SprintProtocol = dynamic(() => import("@/components/sections/SprintProtocol"));
const FounderAuthority = dynamic(() => import("@/components/sections/FounderAuthority"));
const InnerCircleCTA = dynamic(() => import("@/components/sections/InnerCircleCTA"));

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const { mode, toggleMode } = useSite();
  const isAgency = mode === "agency";
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({ target: containerRef });
  const navButtonOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const handleToggle = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    toggleMode();
  };

  return (
    <motion.main 
      ref={containerRef} 
      animate={{ backgroundColor: isAgency ? "#000000" : "#ffffff" }}
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

      <div className="fixed top-6 right-6 md:top-8 md:right-8 z-[110] pointer-events-auto flex items-center gap-2 md:gap-3">
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={handleToggle} 
          className={`px-4 py-2.5 md:px-6 md:py-3 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.1em] transition-all hover:scale-105 ${
            isAgency 
            ? "bg-white/5 border border-white/10 text-white hover:bg-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)]" 
            : "bg-black/5 border border-black/10 text-black hover:bg-black/10 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.05)]"
          }`}
        >
          {isAgency ? "The Inner Circle" : "Exit To Agency"}
        </motion.button>

        {!isAgency && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => router.prefetch(user ? "/dashboard" : "/apply/login")}
            onClick={() => router.push(user ? "/dashboard" : "/apply/login")}
            className="px-4 py-2.5 md:px-6 md:py-3 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.1em] transition-all hover:scale-105 bg-black text-white border border-black/10 shadow-xl flex items-center gap-2"
          >
            {user ? (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Profile
              </>
            ) : "Sign In"}
          </motion.button>
        )}
      </div>

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
                href="https://calendly.com/piyushkumar2418/30min" 
                target="_blank"
                className="bg-[#F3D7A7] text-black px-5 md:px-8 py-3 md:py-3.5 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-[0.05em] hover:shadow-[0_0_30px_rgba(243,215,167,0.3)] transition-all shadow-xl whitespace-nowrap"
              >
                contact us
              </motion.a>
            </div>
          </div>
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
          <motion.div key="innerCircle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-black bg-white min-h-screen">
            <InnerCircleHero user={user} />
            <Crisis />
            <Manifesto />
            <SprintProtocol />
            <FounderAuthority />
            <InnerCircleCTA />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
