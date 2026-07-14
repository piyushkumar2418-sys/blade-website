"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const membersData = [
  {
    name: "Ranveer Allahbadia",
    url: "/logos/ranveer.jpg",
    type: "creator"
  },
  {
    name: "Saurabh Sachdeva",
    url: "/logos/saurabh_sachdeva.jpg",
    type: "creator"
  },
  {
    name: "Actors Truth",
    url: "/logos/actorstruth.jpg",
    type: "creator"
  },
  {
    name: "Red Bull",
    url: "/logos/redbull.png",
    type: "brand"
  },
  {
    name: "Unacademy",
    url: "/logos/unacademy.png",
    type: "brand"
  },
  {
    name: "YAAS Media",
    url: "/logos/yaas.png",
    type: "brand"
  },
  {
    name: "Skillhouse",
    url: "/logos/skillhouse.png",
    type: "brand"
  },
  {
    name: "Saurabh Bhardwaj (SB)",
    url: "/logos/sb_logo.png",
    type: "brand"
  },
  {
    name: "Viraj Ghelani (VF)",
    url: "/logos/vf_logo.png",
    type: "brand"
  },
  {
    name: "McCann",
    url: "/logos/mcann.png",
    type: "brand"
  }
];

const Members = () => {
  const doubledMembers = [...membersData, ...membersData];

  return (
    <section 
      className="py-24 bg-gradient-to-b from-black via-[#030303] to-black border-b border-white/5 relative overflow-hidden"
    >
      {/* Title Header matching the screenshot styling */}
      <div className="max-w-[1400px] mx-auto px-6 mb-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-8 bg-[#F3D7A7]" />
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#F3D7A7]">
            Our Members are working with
          </span>
        </div>
      </div>

      {/* Infinite Scrolling Track */}
      <div className="flex whitespace-nowrap overflow-hidden relative py-2">
        {/* Soft edge blur vignettes */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-6 items-center px-8"
        >
          {doubledMembers.map((member, i) => (
            <LogoItem key={i} member={member} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const LogoItem = ({ member, index }: { member: typeof membersData[0], index: number }) => {
  const [error, setError] = useState(false);

  // Staggered floating effect
  const yFloating = [0, -4 - (index % 3) * 1.5, 0];
  const duration = 4.0 + (index % 4) * 0.5;
  const delay = index * 0.15;

  return (
    <motion.div 
      animate={{ y: yFloating }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
      whileHover={{ 
        scale: 1.05,
      }}
      className="flex-shrink-0 relative p-[1.5px] rounded-full bg-gradient-to-b from-[#FFF0D4] via-[#D1A147] to-[#1e1302] shadow-[0_6px_20px_rgba(0,0,0,0.5),inset_0_1px_1.5px_rgba(255,255,255,0.4)] transition-all duration-500 cursor-pointer"
      style={{ width: '120px', height: '55px' }}
    >
      {/* 3D Glass Inner Container - Center contents vertically & horizontally */}
      <div className="w-full h-full rounded-full bg-gradient-to-b from-[#181105] via-[#090602] to-[#000000] flex items-center justify-center p-2 relative overflow-hidden shadow-[inset_0_0_10px_rgba(243, 215, 167, 0.15)]">
        
        {/* Specular Highlights for 3D liquid metallic look */}
        {/* Top glossy reflection cap */}
        <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-[80%] h-[20%] rounded-full bg-gradient-to-b from-white/20 to-transparent blur-[0.3px] pointer-events-none" />
        
        {/* Bottom golden glow */}
        <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 w-[70%] h-[15%] rounded-full bg-gradient-to-t from-[#D1A147]/15 to-transparent blur-[0.5px] pointer-events-none" />
        
        {/* Side specular reflection edge glow */}
        <div className="absolute inset-y-3 left-[2px] w-[1px] bg-gradient-to-b from-transparent via-[#FFF0D4]/25 to-transparent pointer-events-none" />
        <div className="absolute inset-y-3 right-[2px] w-[1px] bg-gradient-to-b from-transparent via-[#FFF0D4]/10 to-transparent pointer-events-none" />

        {/* Permanent Infinite Sheen Sweep animation */}
        <motion.div 
          animate={{ x: ["-150%", "150%"] }}
          transition={{ 
            duration: 4.5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: (index % 10) * 0.45
          }}
          className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-[#FFF0D4]/12 to-transparent -skew-x-12 pointer-events-none" 
        />

        {/* Card Content (Logos Only) */}
        {member.type === "creator" ? (
          /* Creator Photo - Compact Circular avatar centered */
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#D1A147]/50 bg-black/50 shadow-md z-10 flex-shrink-0">
            {!error ? (
              <Image 
                src={member.url} 
                alt={member.name}
                fill
                sizes="32px"
                className="object-cover"
                onError={() => setError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-black/50 text-[#D1A147] font-bold text-xs">
                {member.name.charAt(0)}
              </div>
            )}
          </div>
        ) : (
          /* Brand Logo - Centered and fit to landscape capsule */
          <div className="relative w-full h-8 flex items-center justify-center px-1 z-10">
            {!error ? (
              <div className="relative w-[80%] h-full">
                <Image 
                  src={member.url} 
                  alt={member.name}
                  fill
                  sizes="90px"
                  className="object-contain"
                  onError={() => setError(true)}
                />
              </div>
            ) : (
              <span className="text-white/60 text-[8px] font-bold uppercase tracking-[0.2em] text-center truncate">
                {member.name}
              </span>
            )}
          </div>
        )}

      </div>
    </motion.div>
  );
};

export default Members;
