"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useInView, Variants, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Zap, Award, Eye, ArrowRight, TrendingUp, Shield, Target, Rocket, BarChart3, Binary, Lock } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import DrawingCanvas from "@/components/DrawingCanvas";
import Scene3D from "@/components/Scene3D";
import { useAuth } from "@/context/AuthContext";

// --- ANIMATION VARIANTS ---
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const SectionLabel = ({ children, light = false }: { children: React.ReactNode, light?: boolean }) => (
  <div className="flex items-center gap-4 mb-8 text-left">
    <div className={`h-[1px] w-8 ${light ? 'bg-white/20' : 'bg-[#F3D7A7]'}`} />
    <span className={`text-[10px] font-bold uppercase tracking-[0.4em] ${light ? 'text-white/40' : 'text-black/40'}`}>{children}</span>
  </div>
);

const WorkItem = ({ work, aspect, index }: { work: any, aspect: string, index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.6 } }
      }}
    >
      <motion.a 
        href={work.link} 
        target="_blank"
        onMouseEnter={() => { setIsHovered(true); videoRef.current?.play().catch(() => null); }}
        onMouseLeave={() => { setIsHovered(false); videoRef.current?.pause(); if(videoRef.current) videoRef.current.currentTime = 0; }}
        className={`group relative block ${aspect} bg-[#0a0a0a] border border-white/5 overflow-hidden rounded-sm shadow-2xl cursor-none`}
      >
        <img src={work.img} alt={work.title} className={`absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
        <video ref={videoRef} key={work.video} src={work.video} loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-30" />
        <div className="absolute bottom-5 left-5 z-40 text-left">
          <span className="text-[#F3D7A7] text-[8px] uppercase tracking-[0.3em] block mb-1 font-bold">{work.category}</span>
          <h4 className="text-sm md:text-base font-bold uppercase tracking-tight text-white">{work.title}</h4>
        </div>
      </motion.a>
    </motion.div>
  );
};

const LogoMarquee = () => {
  const logos = [
    { name: "Amazon", url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { 
      name: "Flipkart", 
      isSvg: true,
      svg: (
        <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="h-11 md:h-16 w-auto">
          <path d="M48.875,0C21.882,0,0,21.883,0,48.875S21.882,97.75,48.875,97.75S97.75,75.867,97.75,48.875S75.868,0,48.875,0z M75.427,23.318c-0.851,0.143-1.729,0.151-2.596,0.158c-3.608,0.031-6.124,1.759-7.146,5.201c-0.629,2.118-0.969,4.321-1.49,6.729 c1.647,0,3.119-0.008,4.59,0.001c1.888,0.013,2.746,0.735,2.65,2.607c-0.072,1.423-0.375,2.876-0.838,4.226 c-0.531,1.538-1.711,2.379-3.463,2.297c-1.439-0.068-2.885-0.015-4.438-0.015c-0.695,3.929-1.377,7.766-2.053,11.604 c-0.819,4.657-1.64,9.316-2.449,13.977c-1.459,8.396-6.779,13.104-15.485,13.332c-6.998,0.182-14.004,0.062-21.005,0.051 c-1.497-0.004-1.806-0.444-1.481-1.854c0.456-1.975,0.894-3.954,1.38-5.921c0.433-1.746,1.28-2.402,3.095-2.407 c4.926-0.013,9.852,0.005,14.777-0.005c4.112-0.006,6.247-1.639,6.997-5.629c1.393-7.396,2.667-14.816,3.99-22.229" />
        </svg>
      )
    },
    { name: "Bajaj", url: "https://companieslogo.com/img/orig/BAJAJ-AUTO.NS_BIG-afa2b58c.png" },
    { 
      name: "Reliance", 
      isSvg: true,
      svg: (
        <svg viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="h-7 md:h-10 w-auto">
          <path d="M432.3,161.7c-11.4-1.6-22.8-2.4-34.3-2.4c-45.7,0-85.3,13.5-115.1,38.1c-29.8-24.6-69.4-38.1-115.1-38.1 c-11.4,0-22.9,0.8-34.3,2.4c-35.6,4.9-66.9,20.4-89,43.2l0,0c-15.6,16.1-26.6,36.2-30.8,58.3c-1.1,5.6-1.7,11.3-1.7,17.1 c0,28.8,12.2,54.7,31.7,73l0,0c22,20.7,51.8,33.3,84.7,33.3c3.8,0,7.6-0.2,11.3-0.5c45.3-4.1,84-27.1,108.9-60.5 c24.9,33.4,63.6,56.4,108.9,60.5c3.8,0.4,7.6,0.5,11.3,0.5c32.9,0,62.6-12.6,84.7-33.3l0,0c19.5-18.4,31.7-44.2,31.7-73 c0-5.8-0.6-11.5-1.7-17.1C526.4,217.9,485.4,169,432.3,161.7z" />
        </svg>
      )
    },
    { name: "Nykaa", url: "https://companieslogo.com/img/orig/NYKAA.NS_BIG-d299a0e1.svg" },
    { name: "Pantaloons", url: "https://upload.wikimedia.org/wikipedia/en/3/3e/Pantaloons_Fashion_%26_Retail_logo.svg" },
    { 
      name: "Mirchi", 
      isSvg: true,
      svg: (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="324" height="137" viewBox="0 0 324 137" className="h-10 md:h-14 w-auto">
          <g fill="currentColor">
            <path d="M134,55c4.79-0.08,8.96,0.54,13.56,1.81c0.65,0.17,1.29,0.33,1.96,0.5c5.53,1.49,9.27,3.12,12.79,7.69c2.47,4.76,2.52,9.78,1.69,15c-1.27,2.04-2.6,4.05-4,6c0.24,5.25,2.39,8.9,5.06,13.25c3.94,6.52,3.94,6.52,3.94,8.75c-3.96,0-7.92,0-12,0c-3.3-5.94-6.6-11.88-10-18c-0.66,0-1.32,0-2,0c-0.33,5.61-0.66,11.22-1,17c-2.64,0-5.28,0-8,0c-2-2-2-2-2.24-4.14c0-0.88,0-1.77,0-2.68c0-1,0-2,0-3.03c0.01-1.08,0.02-2.17,0.03-3.28c0-1.11,0-2.21,0-3.35c0.01-1.11,0.01-2.21,0.01-3.36c0.01-3.55,0.04-7.09,0.06-10.64c0.01-2.4,0.02-4.8,0.03-7.2c0.02-5.89,0.05-11.78,0.09-17.68c0.02-5.89,0.06-11.78,0.1-17.68Z"/>
            <path d="M89,53c1.6,2.53,2.93,4.89,4.25,7.56c1.24,2.45,2.48,4.91,3.75,7.44c2.31-5.28,4.62-10.56,6.93-15.84c8.5-0.1,8.5-0.1,11,0c1.61,1.61,1.13,3.36,1.13,5.6c0,0.98,0,1.95,0,2.96c0,1.06,0,2.13,0,3.22c0,1.08,0,2.17,0,3.28c0,2.3,0,4.6,0,6.9c-0.01,3.53,0,7.06,0.01,10.59c0,2.23,0,4.45,0,6.68c0,1.06,0,2.13,0,3.22c0,1.47,0,1.47,0,2.96c0,0.87,0,1.73,0,2.62c-0.13,1.97-0.13,1.97-1.13,2.97c-2.03,0.91-2.03,0.91-4.5,0.62c-1.22-0.14-1.22-0.14-2.47-0.27c-2.03-0.35-2.03-0.35-3.03-1.35c-0.09-1.93-0.11-3.86-0.1-5.79c0-1.17,0-2.34,0.01-3.54c0.01-1.23,0.02-2.46,0.03-3.73c0-1.24,0-2.47,0.01-3.74c0.01-3.06,0.03-6.13,0.05-9.19c-0.66,0-1.32,0-1.98,0c-0.23,0.89-0.45,1.77-0.69,2.69c-1.48,3.75-3.34,5.65-6.31,8.32c-3.02-4.54-5.54-8.69-7-14c-0.66,0-1.32,0-1.98,0c0,7.59,0,15.18,0,23c-6.69-1.34-6.69-1.34-9-4c-0.36-2.99-0.47-5.62-0.39-8.61c0.01-0.84,0.01-1.68,0.02-2.54c0.02-2.68,0.07-5.36,0.12-8.04c0.02-1.82,0.04-3.64,0.06-5.45c0.04-4.45,0.11-8.91,0.18-13.36c0.04-4.45,0.08-8.91,0.12-13.36c8-1.38,8-1.38,11,0Z"/>
            <path d="M228,63c0,10.56,0,21.12,0,32c-8,4-8,4-11,4c0-3.96,0-7.92,0-12c-3.63,0-7.26,0-10.89,0c0,4.95,0,9.9,0,15c-6,2-6,2-11,2c0-12.87,0-25.74,0-39c3.63,0,7.26,0,10.89,0c0,4.29,0,8.58,0,13c3.3-0.66,6.6-1.32,10-2c0.05-0.85,0.1-1.71,0.15-2.59c0.07-1.1,0.15-2.21,0.22-3.34c0.07-1.1,0.14-2.2,0.21-3.34c0.14-0.9,0.27-1.8,0.41-2.73c2-1,2-1,11,0Z"/>
            <path d="M294,44c-1.93,12.14-11.75,21.11-21.04,28.38c-21.9,15.62-21.9,15.62-27.96,15.62c0-8.58,0-17.16,0-26c2.43-0.43,4.87-0.87,7.38-1.31c9.65-1.81,18.11-4.28,26.94-8.63c0.68-0.34,1.36-0.67,2.07-1.02c3.86-1.97,8.59-7.04,12.61-7.04Z"/>
            <path d="M29,20c1,1,1,1,1.38,3.81c-0.38,3.19-0.38,3.19-2.81,5.44c-0.85,0.58-1.69,1.15-2.56,1.75c-1.46,2.91-1.21,5.51-1.25,8.75c-0.03,1.21-0.05,2.42-0.08,3.67c0.36,3.89,1.42,6.21,3.33,9.58c0.33,0.99,0.66,1.98,0.99,3c3.25,2.02,6.99,3.2,10.56,4.56c1.14,0.43,2.27,0.87,3.44,1.32c3.61,1.35,6.53,2.29,10.37,2.37c0.75,0.03,1.5,0.05,2.27,0.08c3.03-0.42,4.81-1.64,7.35-3.33c1.73-1.06,3.46-2.13,5.19-3.19c0.86-0.53,1.72-1.06,2.61-1.61c2.21-1.21,2.21-1.21,4.21-1.21c0,11.22,0,22.44,0,34c-6.43-2.57-9.92-5.6-14.06-11.06c-5.33-7.01-10.13-9.31-18.75-10.75c-8.86-1.75-14.36-5.65-19.78-12.81c-5-8.43-4.41-18.32-2.1-27.56c1.54-5.57,3.85-7.27,9.69-6.81Z"/>
            <path d="M120,53c1.01,1.57,1.03,3.14,1.03,4.7c0,1,0,2,0,3.03c0,1.09,0,2.18,0,3.3c0,1.11,0,2.22,0,3.36c-0.01,3.56-0.02,7.11-0.03,10.67c-0.01,2.4-0.01,4.81-0.02,7.21c-0.01,5.91-0.03,11.82-0.05,17.72c-3.37,0.13-3.37,0.13-6.75-1c0-16.83,0-33.66,0-50.5c9,1,9,1,10,2c0.09,1.57,0.11,3.14,0.11,4.7c0,1,0,2,0,3.03c-0.01,1.09-0.01,2.18-0.02,3.3c-0.01,1.11-0.02,2.22-0.02,3.36c-0.01,3.56-0.02,7.11-0.03,10.67c-0.01,2.4-0.01,4.81-0.02,7.21c-0.01,5.91-0.03,11.82-0.05,17.72Z"/>
            <path d="M182.63,62.63c1.13,0.01,2.25,0.03,3.41,0.04c2.96,0.34,2.96,0.34,5.96,2.34c0.41,2.71,0.13,5.24,0,8c-0.69-0.03-1.38-0.07-2.08-0.11c-0.9-0.03-1.8-0.05-2.73-0.08c-0.89-0.04-1.79-0.07-2.71-0.11c-2.51,0.09-2.51,0.09-4.24,1.62c-2.47,3.34-2.4,6.54-2.42,10.55c-0.02,1.54-0.02,1.54-0.04,3.12c0.24,3.12,0.78,5.25,2.23,8.02c3.35,2.24,3.91,2.17,7.69,1.63c0.81-0.11,1.62-0.22,2.45-0.34c0.61-0.1,1.23-0.19,1.86-0.29c0.29,6.05,0.29,6.05,0,8c-3.52,2.35-5.2,2.33-9.37,2.38c-1.68,0.04-1.68,0.04-3.4,0.09c-4.51-0.64-6.78-2.66-9.59-6.15c-2.79-5.49-3.06-10.82-3.14-16.87c-0.02-0.8-0.04-1.61-0.06-2.43c0.07-7.11,1.99-12.28,6.89-17.48c3.31-1.89,5.49-1.99,9.29-1.9Z"/>
            <path d="M241,62c0.11,2.59,0.1,3.72,0.1,4.88c0,1.16,0,2.38,0,3.63c0,1.22,0,2.43,0,3.68c-0.01,1.28-0.02,2.56-0.03,3.88c-0.01,1.28-0.02,2.57-0.03,3.89c-0.01,3.18-0.03,6.37-0.05,9.55c-0.01,2.41-0.01,4.81-0.02,7.21c-0.01,5.91-0.03,11.82-0.05,17.72c-6.63,4-6.63,4-10,4c0-10.23,0-20.46,0-31c3.32-0.83,5.65-1.18,9-1Z"/>
            <path d="M288,80c0.33,0,0.66,0,1,0c-0.09,1.64-0.09,1.64-0.19,3.31c-0.17,3.61-0.17,3.61,1.69,5.63c0.74,0.53,0.74,0.53,1.5,1.06c0.99-0.33,1.98-0.66,3-1c0,1.98,0,3.96,0,6c-1.98-0.66-3.96-1.32-6-2c0.33,1.98,0.66,3.96,0.99,6c-0.99,0.33-1.98,0.66-3,1c-1.22,2.5-1.22,2.5-2,5c-2,0.04-4,0.04-6,0c-0.33-0.33-0.66-0.66-1-1c0,2.31,0,4.62,0,7c-0.99,0-1.98,0-3,0c-0.33-0.66-0.66-1.32-1-2c-0.99,0-1.98,0-3,0c0.06-0.73,0.12-1.46,0.18-2.2c-0.22-3.35-1.18-4.8-3.06-7.55c-3.03-4.75-4.23-8.71-5.13-14.25c1.84-0.6,1.84-0.6,4-1c3.92,2.43,5.77,4.58,7,9c0.38,2.33,0.73,4.66,1,7c2.97,0.33,5.94,0.66,9,1c0.33-0.66,0.66-1.32,0.99-2c-0.66,0-1.32,0-1.98,0c-0.33-2.31-0.66-4.62-1-7c1.98,0,3.96,0,6,0c-0.62-0.56-1.24-1.11-1.88-1.69c-2.19-2.38-3.11-4.28-4.13-7.31c2.48,0.5,2.48,0.5,4.95,1c0.33-1.32,0.66-2.64,0.99-3.96Z"/>
          </g>
        </svg>
      )
    },
    { 
      name: "WTF", 
      isSvg: true,
      svg: (
        <span className="text-2xl md:text-4xl font-serif font-bold tracking-tighter">WTF</span>
      )
    },
    { 
      name: "ThriveStack", 
      isSvg: true,
      svg: (
        <div className="flex items-center gap-2">
           <div className="w-6 h-6 bg-white rotate-45" />
           <span className="text-lg md:text-xl font-bold tracking-tight">ThriveStack</span>
        </div>
      )
    },
    { 
      name: "SuperYou", 
      isSvg: true,
      svg: (
        <span className="text-xl md:text-2xl font-serif italic tracking-tight">SuperYou</span>
      )
    },
    { 
      name: "ActorsTruth", 
      isSvg: true,
      svg: (
        <div className="flex items-center gap-2">
           <div className="w-1 h-8 bg-white" />
           <span className="text-lg md:text-xl font-light tracking-[0.2em] uppercase">Actors Truth</span>
        </div>
      )
    },
    { name: "FamApp", url: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/fampay.svg" },
  ];

  const doubledLogos = [...logos, ...logos];

  return (
    <div className="relative w-full overflow-hidden py-24 bg-black/50 border-y border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 mb-16 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="h-[1px] w-8 bg-[#F3D7A7]" />
            <h3 className="text-white text-xl md:text-3xl font-bold uppercase tracking-tighter">Trusted by <span className="text-[#F3D7A7]">Industry Leaders</span></h3>
         </div>
         <div className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold hidden md:block">Institutional Network</div>
      </div>
      
      <div className="flex whitespace-nowrap overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black to-transparent z-10" />

        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="flex gap-24 items-center px-12"
        >
          {doubledLogos.map((logo, i) => (
            <div key={i} className="flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105 opacity-40 hover:opacity-100 cursor-pointer">
              {logo.isSvg ? (
                <div className="text-white flex items-center justify-center" style={{ filter: "brightness(0) invert(1)" }}>
                  {logo.svg}
                </div>
              ) : (
                <img 
                  src={logo.url} 
                  alt={logo.name} 
                  className="h-7 md:h-10 w-auto max-w-[140px] object-contain" 
                  style={{ filter: "brightness(0) invert(1)" }}
                  onError={(e) => {
                     (e.target as any).style.display = 'none';
                     const parent = (e.target as any).parentElement;
                     const span = document.createElement('span');
                     span.innerText = logo.name;
                     span.className = "text-white text-xs font-bold uppercase tracking-widest opacity-20";
                     parent.appendChild(span);
                  }}
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default function Home() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const [siteMode, setSiteMode] = useState<"agency" | "innerCircle">("agency");
  const containerRef = useRef(null);
  const philosophyLeftRef = useRef(null);
  const isPhilosophyLeftInView = useInView(philosophyLeftRef, { once: true, margin: "-20%" });
  
  const { scrollYProgress } = useScroll({ target: containerRef });
  const isAgency = siteMode === "agency";
  const navButtonOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const toggleMode = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setSiteMode(isAgency ? "innerCircle" : "agency");
  };

  const youtubeWorks = [
    { title: "Nikhil Kamath", category: "YouTube", link: "https://youtu.be/YY7J1pHfSyY", video: "/preview1.mp4", img: "https://i.ytimg.com/vi/YY7J1pHfSyY/maxresdefault.jpg" },
    { title: "Money with Swabi", category: "YouTube", link: "https://www.youtube.com/@Moneywithswabi/videos", video: "/preview2.mp4", img: "https://i.ytimg.com/vi/NQvveKioHCw/maxresdefault.jpg" },
    { title: "Podcast", category: "Podcast", link: "https://youtu.be/i7uwh0CzfRM", video: "/preview3.mp4", img: "https://i.ytimg.com/vi/i7uwh0CzfRM/maxresdefault.jpg" },
  ];

  const verticalWorks = [
    { title: "Visual Dominance", category: "Reel", link: "https://www.instagram.com/reel/DDrxL2CMYCB/", video: "/preview5.mp4", img: "/thumb5.webp" },
    { title: "Editorial Series", category: "Reel", link: "https://www.instagram.com/katemackz/", video: "/preview6.mp4", img: "/thumb6.webp" },
    { title: "Dynamic Flow", category: "Reel", link: "https://www.instagram.com/DKTmhQqqF6M/", video: "/preview7.jpg", img: "/thumb7.jpg" },
    { title: "Retention Edit", category: "Reel", link: "https://www.instagram.com/DTIgqVyjVcJ/", video: "/preview8.mp4", img: "/thumb8.jpeg" },
  ];

  const founderStats = [
    { icon: <Eye size={18} />, label: "2.5B+ Views Generated", desc: "Market-wide reach across primary channels." },
    { icon: <TrendingUp size={18} />, label: "₹3Cr+ Revenue Built Through Content", desc: "Capital generated through visual systems." },
    { icon: <Award size={18} />, label: "Worked With Leading Creators & Brands", desc: "Strategic partner for top-tier creators." },
    { icon: <Zap size={18} />, label: "5+ Years of Execution Experience", desc: "Applied experience in high-ticket markets." },
  ];

  const sprintPhases = [
    { phase: "01", title: "Foundation", desc: "Deconstructing your current output. Removing inefficiencies. Setting the institutional baseline." },
    { phase: "02", title: "Synthesis", desc: "Mastering the Blade methodology. Building your proprietary content frameworks." },
    { phase: "03", title: "Infrastructure", desc: "Setting up your high-ticket editing engine and distribution systems." },
    { phase: "04", title: "Velocity", desc: "Execution under pressure. Scaling output without losing premium positioning." },
    { phase: "05", title: "Monetization", desc: "Converting views into capital. Building the high-ticket sales funnel." },
  ];

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

      {/* --- MASTER NAVIGATION --- */}
      <nav className={`fixed top-0 w-full z-[150] flex justify-between items-center px-8 py-8 ${isAgency ? 'mix-blend-difference' : ''}`}>
        <div className="cursor-pointer" onClick={() => setSiteMode("agency")}>
          <img src={isAgency ? "/blade-logo.png" : "/bic-black.png"} alt="Logo" className="h-8 md:h-10 w-auto object-contain" />
        </div>
        
        <div className="flex items-center gap-6">
          <motion.button 
            onClick={toggleMode} 
            style={{ opacity: navButtonOpacity }}
            className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all border shadow-sm ${
              isAgency 
              ? "border-white/20 text-white bg-white/5 hover:bg-white hover:text-black shadow-none" 
              : "border-black text-black bg-transparent hover:bg-black hover:text-white"
            }`}
          >
            {isAgency ? "The Inner Circle" : "Exit to Agency"}
          </motion.button>

          {user && !isAgency ? (
            <button 
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-3 px-4 py-3 border border-black/10 text-black hover:border-black/30 rounded-sm transition-all"
            >
              <div className="w-2 h-2 rounded-full bg-[#F3D7A7] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest">{profile?.name || "My Profile"}</span>
            </button>
          ) : (
            !isAgency && (
              <button 
                onClick={() => router.push("/apply/login")}
                className="text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors"
              >
                Sign In
              </button>
            )
          )}
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {isAgency ? (
          <motion.div key="agency" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* HERO */}
            <section className="h-screen w-full flex flex-col justify-center items-center text-center relative overflow-hidden bg-black">
              <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-70">
                <source src="/hero-bg.mp4?v=4" type="video/mp4" />
              </video>
              <div className="relative z-20 px-4 text-center">
                <h1 className="text-[14vw] md:text-[11vw] font-bold leading-[0.8] tracking-[-0.06em] uppercase mb-8 text-white text-center">Growth,<br/>engineered.</h1>
                <p className="text-[#F3D7A7] text-[10px] md:text-[12px] uppercase tracking-[0.8em] font-bold text-center">Blade Media</p>
              </div>
            </section>

            {/* PHILOSOPHY */}
            <section className="min-h-screen py-32 px-6 md:px-24 border-t border-white/5 relative z-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start max-w-[1440px] mx-auto text-left">
                <div className="md:sticky md:top-32" ref={philosophyLeftRef}>
                  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12 text-left">
                    <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] mb-4 block font-bold text-left">The Visionary</span>
                    <h2 className="text-5xl md:text-8xl font-bold leading-[0.85] tracking-[-0.06em] uppercase text-white mb-16 text-left">Systematized <br/> Visual <br/> Dominance.</h2>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
                    <p className="text-white/70 text-xl md:text-2xl lg:text-3xl font-medium leading-[1.4] tracking-tight text-left">
                      <span className="text-white font-bold">Blade</span> exists in a space where consistency matters more than claims. Delivered content that holds value as audiences evolve.
                    </p>
                    <div className="h-[1px] bg-[#F3D7A7]/40 mt-12 w-24" />
                  </motion.div>
                </div>
                <div className="max-w-xs md:max-w-md ml-auto text-left">
                  <div className="aspect-[3/4] w-full mb-10 overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
                    <img src="/piyush.png" className="w-full h-full object-cover" alt="Piyush" />
                  </div>
                  <p className="text-white/60 text-lg font-light leading-relaxed text-left">&quot;We decoded content through an early obsession. Mastering the silent mechanics of distribution.&quot;</p>
                  <div className="text-[#F3D7A7] text-2xl font-bold mt-8 text-left">— Piyush</div>
                </div>
              </div>
            </section>

            {/* LOGO MARQUEE */}
            <LogoMarquee />

            {/* GALLERIES */}
            <section className="py-32 px-6 md:px-12 relative z-20">
              <div className="max-w-[1400px] mx-auto w-full space-y-48">
                <div className="text-left">
                  <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-[-0.06em] mb-12 text-white text-left">Selected Productions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {youtubeWorks.map((work, i) => ( <WorkItem key={i} work={work} aspect="aspect-video" index={i} /> ))}
                  </div>
                </div>
                <div className="text-left">
                  <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-[-0.06em] mb-12 text-[#F3D7A7] text-left">Viral Originals</h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {verticalWorks.map((work, i) => ( <WorkItem key={i} work={work} aspect="aspect-[9/16]" index={i} /> ))}
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          /* --- INNER CIRCLE SIDE --- */
          <motion.div key="innerCircle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-black bg-white min-h-screen">
            
            <section className="h-screen flex flex-col justify-center px-6 md:px-24 border-b border-black/5 text-left">
              <div className="flex justify-between items-start mb-8">
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-[0.5em] font-bold block text-black/40 text-left">Blade Inner Circle</motion.span>
                <div className="px-4 py-2 border border-black/10 bg-black/5 text-black font-bold uppercase tracking-[0.3em] text-[10px]">
                  May 2026 Batch
                </div>
              </div>
              <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-[12vw] md:text-[8vw] font-bold leading-[0.85] tracking-[-0.06em] uppercase mb-12 text-left">The School of <br/> Modern Content.</motion.h1>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 text-left">
                <p className="text-2xl md:text-4xl text-black/60 leading-tight font-medium max-w-2xl text-left">Build your agency. <br/> From skill to first income.</p>
                <div className="flex flex-col items-start md:items-end gap-6">
                  <span className="text-[#F3D7A7] font-bold uppercase tracking-[0.3em] text-[10px] border border-[#F3D7A7]/30 px-4 py-2 text-left">Cohort 01 — Applications Open</span>
                  <button onClick={() => router.push(user ? "/apply/register" : "/apply/login")} className="bg-black text-white px-12 py-6 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#F3D7A7] hover:text-black transition-all flex items-center gap-4 shadow-2xl">Apply now <ArrowUpRight size={18}/></button>
                </div>
              </div>
            </section>

            {/* THE CONTENT CRISIS */}
            <section className="py-32 px-6 md:px-24 bg-black text-white">
              <div className="max-w-7xl mx-auto">
                <SectionLabel light>The Industry Crisis</SectionLabel>
                <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tight leading-[0.85] mb-20 text-left">The creator economy <br /> <span className="text-white/20">is built on sand.</span></h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-8 p-12 border border-white/10 bg-white/5 rounded-2xl">
                      <h4 className="text-[#F3D7A7] text-sm font-bold uppercase tracking-widest">The Amateur Trap</h4>
                      <ul className="space-y-4 text-white/40 text-lg">
                        <li className="flex items-center gap-3"><span className="text-red-500">✕</span> Guessing what works</li>
                        <li className="flex items-center gap-3"><span className="text-red-500">✕</span> Zero leverage in workflow</li>
                        <li className="flex items-center gap-3"><span className="text-red-500">✕</span> Relying on algorithm luck</li>
                        <li className="flex items-center gap-3"><span className="text-red-500">✕</span> Low-ticket, commodity mindset</li>
                      </ul>
                   </div>
                   <div className="space-y-8 p-12 border border-[#F3D7A7]/30 bg-[#F3D7A7]/5 rounded-2xl">
                      <h4 className="text-[#F3D7A7] text-sm font-bold uppercase tracking-widest">The Blade Protocol</h4>
                      <ul className="space-y-4 text-[#F3D7A7] text-lg">
                        <li className="flex items-center gap-3"><span className="text-green-500">✓</span> Institutional systems</li>
                        <li className="flex items-center gap-3"><span className="text-green-500">✓</span> High-velocity infrastructure</li>
                        <li className="flex items-center gap-3"><span className="text-green-500">✓</span> Predictable growth mechanics</li>
                        <li className="flex items-center gap-3"><span className="text-green-500">✓</span> High-ticket capital extraction</li>
                      </ul>
                   </div>
                </div>
              </div>
            </section>

            <section className="py-32 px-6 md:px-24 max-w-7xl text-left border-b border-black/5">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start text-left">
                <div className="pr-0 md:pr-12 text-left">
                   <SectionLabel>Institutional Thesis</SectionLabel>
                   <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-[-0.06em] leading-[0.9] mb-12 text-left">Theoretical learning is a trap. <br/> <span className="text-black/20">This is an execution lab.</span></h2>
                   <p className="text-xl md:text-2xl text-black/60 leading-relaxed font-light text-left">Blade Inner Circle is a 2-month intensive for those who refuse to be passive. We deploy systems. Revenue is the only metric.</p>
                </div>
                <div className="grid grid-cols-1 gap-px bg-black/10 border border-black/10 text-left">
                  <div className="bg-white p-8 md:p-12 text-left">
                    <h4 className="text-xl font-bold uppercase mb-4 text-black text-left">Zero Theory</h4>
                    <p className="text-black/50 leading-relaxed text-sm md:text-base text-left">Everything decoded over thousands of hours of client work at Blade Media. We share the silent mechanics.</p>
                  </div>
                  <div className="bg-white p-8 md:p-12 border-t border-black/10 text-left">
                    <h4 className="text-xl font-bold uppercase mb-4 text-black text-left">High Stakes</h4>
                    <p className="text-black/50 leading-relaxed text-sm md:text-base text-left">Designed to move you from amateur creator to agency operator in 60 days.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* THE SPRINT STRUCTURE */}
            <section className="py-32 px-6 md:px-24 bg-white border-b border-black/5">
              <div className="max-w-7xl mx-auto">
                <SectionLabel>The 60-Day Sprint</SectionLabel>
                <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight leading-[0.85] mb-24 text-left">From Theory to <br /> <span className="text-black/20">Capital Extraction.</span></h2>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                   {sprintPhases.map((phase, idx) => (
                     <div key={idx} className="space-y-6 group text-left">
                        <div className="text-4xl font-bold text-black/10 group-hover:text-black transition-colors duration-500 text-left">{phase.phase}</div>
                        <div className="h-[2px] w-full bg-black/5 relative overflow-hidden">
                           <div className="absolute inset-0 bg-[#F3D7A7] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
                        </div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-left">{phase.title}</h4>
                        <p className="text-[12px] text-black/40 leading-relaxed uppercase tracking-wider text-left">{phase.desc}</p>
                     </div>
                   ))}
                </div>
              </div>
            </section>

            {/* FOUNDER AUTHORITY SECTION */}
            <section className="bg-white py-32 px-6 md:px-24 text-black text-left border-b border-black/5">
              <div className="flex flex-col md:flex-row items-center gap-20 md:gap-32 mb-28">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="w-full md:w-1/2">
                  <div className="relative aspect-[4/5] bg-[#F9F9F9] overflow-hidden grayscale group border border-black/5">
                    <img src="/piyush.png" alt="Founder" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute bottom-8 left-8 z-20">
                      <span className="bg-black text-[#F3D7A7] text-[9px] font-bold uppercase tracking-[0.4em] px-4 py-2">System Architect</span>
                    </div>
                  </div>
                </motion.div>
                <div className="w-full md:w-1/2 text-left">
                  <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-10 text-left">
                    <div className="text-left">
                      <SectionLabel>Founding Methodology</SectionLabel>
                      <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-[-0.06em] leading-[0.85] text-left">The Practitioner’s <br /> Ledger.</h2>
                    </div>
                    <p className="text-black/60 text-xl leading-relaxed max-w-lg font-light text-left">Blade Inner Circle is the distilled output of 5 years of market execution. We don&apos;t teach what we think — we teach what we have proven at scale.</p>
                    
                    <div className="grid grid-cols-2 gap-6 mt-12 text-left">
                       <div className="p-6 border border-black/5 bg-[#F9F9F9] space-y-2 text-left">
                          <BarChart3 size={20} className="text-[#F3D7A7]" />
                          <h5 className="text-[10px] font-bold uppercase tracking-widest text-black/40">Market Reach</h5>
                          <p className="text-xl font-bold">2.5B+ Views</p>
                       </div>
                       <div className="p-6 border border-black/5 bg-[#F9F9F9] space-y-2 text-left">
                          <Binary size={20} className="text-[#F3D7A7]" />
                          <h5 className="text-[10px] font-bold uppercase tracking-widest text-black/40">Capital Extraction</h5>
                          <p className="text-xl font-bold">₹3Cr+ Built</p>
                       </div>
                    </div>
                  </motion.div>
                </div>
              </div>
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

            {/* CURRICULUM SECTION - MIRROR IMAGE BUT DOWNSIZED */}
            <section className="py-24 px-6 md:px-24 bg-white">
              <div className="max-w-[1280px] mx-auto">
                <div className="bg-black rounded-[60px] p-10 md:p-16 relative overflow-hidden text-left flex flex-col md:flex-row items-center gap-12 min-h-[500px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)]">
                  
                  {/* Decorative Circle */}
                  <div className="absolute top-16 right-[35%] w-12 h-12 border border-[#F3D7A7]/20 rounded-full hidden md:block" />

                  {/* Content */}
                  <div className="flex-1 space-y-8 relative z-10">
                    <div className="space-y-4">
                      <span className="text-[#F3D7A7] text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block">What you will learn</span>
                      <h2 className="text-white text-5xl md:text-[72px] font-bold uppercase tracking-tight leading-[0.85] mb-8">
                        The exact systems <br /> behind ₹3Cr+ in <br /> revenue.
                      </h2>
                    </div>
                    <p className="text-white/30 text-lg md:text-xl font-medium max-w-xl leading-relaxed mb-10">
                      We&apos;ve deconstructed the entire agency journey into five easy-to-follow phases. No fluff, just execution.
                    </p>
                    <button 
                      onClick={() => router.push("/curriculum")}
                      className="bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-[#F3D7A7] transition-all flex items-center gap-4 shadow-xl"
                    >
                      Explore Full Prospectus <ArrowRight size={20}/>
                    </button>
                  </div>

                  {/* Stats Cards */}
                  <div className="flex flex-row md:flex-col gap-6 relative z-10">
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-[30px] p-8 w-40 md:w-52 text-center flex flex-col justify-center items-center shadow-xl">
                       <span className="text-white text-5xl font-bold block tracking-tighter mb-1">60</span>
                       <span className="text-[#F3D7A7] text-[10px] font-bold uppercase tracking-[0.3em] block">Days</span>
                    </div>
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-[30px] p-8 w-40 md:w-52 text-center flex flex-col justify-center items-center shadow-xl">
                       <span className="text-white text-5xl font-bold block tracking-tighter mb-1">5</span>
                       <span className="text-[#F3D7A7] text-[10px] font-bold uppercase tracking-[0.3em] block">Phases</span>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-40 px-6 md:px-24 text-center border-t border-black/5">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-[-0.06em] mb-12 text-black text-center">Proof of work <br/> beats theory.</h2>
                <button onClick={() => router.push(user ? "/apply/register" : "/apply/login")} className="bg-black text-white px-20 py-8 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#F3D7A7] hover:text-black transition-all shadow-2xl">Apply now</button>
              </div>
            </section>

            <footer className="py-20 px-6 text-center border-t border-black/5 bg-[#F9F9F9]">
              <p className="text-[10px] font-bold uppercase tracking-[0.8em] text-black/20 text-center">Stop Consuming. Start Operating.</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="h-[50vh] flex flex-col justify-center items-center text-center px-6 relative z-20">
        {isAgency && (
          <>
            <h2 className="text-6xl md:text-[9vw] font-bold tracking-[-0.06em] uppercase mb-16 text-white text-center">Ready to scale?</h2>
            <motion.a whileHover={{ scale: 1.05 }} href="https://calendly.com/piyushkumar2418/30min" target="_blank" className="px-16 py-8 border border-[#F3D7A7] text-[#F3D7A7] rounded-full font-bold uppercase text-xs tracking-widest transition-all duration-500 hover:bg-[#F3D7A7] hover:text-black shadow-2xl">Secure a Session</motion.a>
          </>
        )}
        <div className={`absolute bottom-10 text-[9px] uppercase tracking-[0.8em] font-bold text-center ${isAgency ? "text-white/20" : "text-black/20"}`}>© 2026 Blade</div>
      </footer>
    </motion.main>
  );
}
