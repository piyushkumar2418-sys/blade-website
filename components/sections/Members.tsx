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
      className="py-24 bg-black/50 border-y border-white/5 relative overflow-hidden"
    >
      {/* Title Header matching the screenshot styling */}
      <div className="max-w-[1400px] mx-auto px-6 mb-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-8 bg-[#F3D7A7]" />
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#F3D7A7]">
            Trusted by Industry Leaders
          </span>
        </div>
      </div>

      {/* Infinite Scrolling Track */}
      <div className="flex whitespace-nowrap overflow-hidden relative">
        {/* Soft edge blur vignettes */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex gap-6 md:gap-8 items-center px-6"
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
    <div 
      className="flex-shrink-0 flex items-center justify-start gap-4 px-6 bg-white/[0.03] backdrop-blur-md border border-[#F3D7A7]/10 rounded-2xl md:rounded-3xl hover:bg-white/[0.08] hover:border-[#F3D7A7]/30 transition-all duration-500 group cursor-pointer relative overflow-hidden shadow-lg"
      style={{ width: '240px', height: '80px' }}
    >
      {/* Shiny sweep sheen effect on hover */}
      <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-[#F3D7A7]/10 to-transparent -skew-x-12 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-out pointer-events-none" />

      {member.type === "creator" ? (
        <>
          {/* Creator Profile Image Circle */}
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#F3D7A7]/20 bg-black/40 flex-shrink-0">
            {!error ? (
              <Image 
                src={member.url} 
                alt={member.name}
                fill
                sizes="40px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => setError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-black/50 text-[#F3D7A7] font-bold text-sm">
                {member.name.charAt(0)}
              </div>
            )}
          </div>
          {/* Creator Labels */}
          <div className="flex flex-col text-left overflow-hidden">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/95 group-hover:text-[#F3D7A7] transition-colors duration-300 truncate">
              {member.name}
            </h4>
            <p className="text-[8px] uppercase tracking-widest text-[#F3D7A7]/60 mt-0.5 font-medium truncate">
              {member.role}
            </p>
          </div>
        </>
      ) : (
        /* Brand Logo Container */
        <div className="relative w-full h-full flex items-center justify-center p-2">
          {!error ? (
            <div className="relative w-full h-[65%]">
              <Image 
                src={member.url} 
                alt={member.name}
                fill
                sizes="160px"
                className="object-contain transition-transform duration-500 group-hover:scale-105"
                onError={() => setError(true)}
              />
            </div>
          ) : (
            <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] text-center truncate">
              {member.name}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Members;
