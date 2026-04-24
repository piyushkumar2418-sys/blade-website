"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const LogoMarquee = () => {
  const logos = [
    { name: "Amazon", url: "/amazon.jpg" },
    { name: "Flipkart", url: "/flipkart.jpg" },
    { name: "Bajaj", url: "https://companieslogo.com/img/orig/BAJAJ-AUTO.NS_BIG-afa2b58c.png" },
    { name: "Reliance", url: "/reliance.png" },
    { name: "Nykaa", url: "/nykaa.png" },
    { name: "Pantaloons", url: "/pantaloons.svg" },
    { name: "Mirchi", url: "/mirchi.jpg" },
    { name: "WTF", url: "/wtf.jpg" },
    { name: "ThriveStack", url: "/thrivestack.jpg" },
    { name: "SuperYou", url: "/superyou.jpg" },
    { name: "ActorsTruth", url: "/actorstruth.png" },
    { name: "FamApp", url: "/fampay.png" },
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
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 md:gap-12 items-center px-12"
        >
          {doubledLogos.map((logo, i) => (
            <LogoItem key={i} logo={logo} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const LogoItem = ({ logo }: { logo: { name: string, url: string } }) => {
  const [error, setError] = useState(false);

  return (
    <div 
      className="flex-shrink-0 flex items-center justify-center p-4 md:p-6 bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-2xl md:rounded-3xl hover:bg-white/[0.12] hover:border-white/[0.2] transition-all duration-500 group cursor-pointer"
      style={{ minWidth: '180px', height: '80px' }}
    >
      {!error ? (
        <Image 
          src={logo.url} 
          alt={logo.name} 
          width={140}
          height={40}
          className="h-8 md:h-10 w-auto max-w-[140px] object-contain transition-all duration-500 group-hover:scale-110"
          onError={() => setError(true)}
          unoptimized={logo.url.endsWith('.svg')}
        />
      ) : (
        <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">{logo.name}</span>
      )}
    </div>
  );
};

export default LogoMarquee;
