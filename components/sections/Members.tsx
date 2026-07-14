"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const membersData = [
  {
    name: "Ranveer Allahbadia",
    url: "/logos/ranveer.jpg",
    type: "creator",
    role: "BeerBiceps"
  },
  {
    name: "Saurabh Sachdeva",
    url: "/logos/saurabh_sachdeva.jpg",
    type: "creator",
    role: "Acting Coach"
  },
  {
    name: "Actors Truth",
    url: "/logos/actorstruth.jpg",
    type: "creator",
    role: "Academy"
  },
  {
    name: "Red Bull",
    url: "/logos/redbull.png",
    type: "brand",
    role: "Energy Brand"
  },
  {
    name: "Unacademy",
    url: "/logos/unacademy.png",
    type: "brand",
    role: "EdTech"
  },
  {
    name: "YAAS Media",
    url: "/logos/yaas.png",
    type: "brand",
    role: "Media Network"
  },
  {
    name: "Skillhouse",
    url: "/logos/skillhouse.png",
    type: "brand",
    role: "Talent Platform"
  },
  {
    name: "Saurabh Bhardwaj (SB)",
    url: "/logos/sb_logo.png",
    type: "brand",
    role: "Creator"
  },
  {
    name: "Viraj Ghelani (VF)",
    url: "/logos/vf_logo.png",
    type: "brand",
    role: "Creator"
  },
  {
    name: "McCann",
    url: "/logos/mcann.png",
    type: "brand",
    role: "Global Agency"
  }
];

const Members = () => {
  const doubledMembers = [...membersData, ...membersData];

  return (
    <section 
      className="py-24 bg-[#030303] border-y border-white/5 relative overflow-hidden"
    >
      {/* Title Header matching the screenshot styling */}
      <div className="max-w-[1400px] mx-auto px-6 mb-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-8 bg-[#F3D7A7]" />
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#F3D7A7]">
            Our Members are working with
          </span>
        </div>
      </div>

      {/* Infinite Scrolling Track */}
      <div className="flex whitespace-nowrap overflow-hidden relative py-4">
        {/* Soft edge blur vignettes */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />

        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 items-center px-8"
        >
          {doubledMembers.map((member, i) => (
            <LogoItem key={i} member={member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const LogoItem = ({ member }: { member: typeof membersData[0] }) => {
  const [error, setError] = useState(false);

  return (
    <motion.div 
      whileHover={{ 
        scale: 1.04,
        y: -4,
        boxShadow: "0 15px 40px rgba(243, 215, 167, 0.25)"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex-shrink-0 relative p-[2px] rounded-full bg-gradient-to-b from-[#FFF0D4] via-[#D1A147] to-[#1e1302] shadow-[0_10px_30px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.4)] transition-all duration-500 group cursor-pointer"
      style={{ width: '145px', height: '255px' }}
    >
      {/* 3D Glass Inner Container */}
      <div className="w-full h-full rounded-full bg-gradient-to-b from-[#181105] via-[#090602] to-[#000000] flex flex-col items-center justify-between py-8 px-4 relative overflow-hidden">
        
        {/* Specular Highlights for 3D liquid metallic look */}
        {/* Top glossy reflection cap */}
        <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-[80%] h-[15%] rounded-full bg-gradient-to-b from-white/20 to-transparent blur-[0.5px] pointer-events-none" />
        
        {/* Bottom golden glow */}
        <div className="absolute bottom-[3px] left-1/2 -translate-x-1/2 w-[70%] h-[12%] rounded-full bg-gradient-to-t from-[#D1A147]/20 to-transparent blur-[1px] pointer-events-none" />
        
        {/* Side specular reflection edge glow */}
        <div className="absolute inset-y-6 left-[3px] w-[1px] bg-gradient-to-b from-transparent via-[#FFF0D4]/25 to-transparent pointer-events-none" />
        <div className="absolute inset-y-6 right-[3px] w-[1px] bg-gradient-to-b from-transparent via-[#FFF0D4]/10 to-transparent pointer-events-none" />

        {/* Diagonal sheen sweep on hover */}
        <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-[#FFF0D4]/12 to-transparent -skew-x-12 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-out pointer-events-none" />

        {/* Card Content - Stacked Vertically */}
        {member.type === "creator" ? (
          <>
            {/* Creator Photo */}
            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-[#D1A147]/40 bg-black/50 shadow-md flex-shrink-0 z-10 group-hover:border-[#FFF0D4]/70 transition-colors duration-300">
              {!error ? (
                <Image 
                  src={member.url} 
                  alt={member.name}
                  fill
                  sizes="64px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={() => setError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black/50 text-[#D1A147] font-bold text-base">
                  {member.name.charAt(0)}
                </div>
              )}
            </div>
          </>
        ) : (
          /* Brand Logo */
          <div className="relative w-full h-16 flex items-center justify-center px-1 z-10 flex-shrink-0">
            {!error ? (
              <div className="relative w-[85%] h-full">
                <Image 
                  src={member.url} 
                  alt={member.name}
                  fill
                  sizes="120px"
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                  onError={() => setError(true)}
                />
              </div>
            ) : (
              <span className="text-white/60 text-[9px] font-bold uppercase tracking-[0.2em] text-center truncate">
                {member.name}
              </span>
            )}
          </div>
        )}

        {/* Labels positioned at the bottom */}
        <div className="flex flex-col items-center text-center w-full z-10 select-none">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-white/90 group-hover:text-[#D1A147] transition-colors duration-300 w-full px-1 truncate">
            {member.name}
          </h4>
          <p className="text-[8px] uppercase tracking-[0.18em] text-[#D1A147]/65 mt-1 font-medium w-full px-1 truncate">
            {member.role}
          </p>
        </div>

      </div>
    </motion.div>
  );
};

export default Members;
