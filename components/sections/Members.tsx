"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface MemberCard {
  name: string;
  url: string;
  type: "creator" | "poster";
}

const row1Members: MemberCard[] = [
  {
    name: "TAT",
    url: "/posters/our members are working with/TAT.jpg",
    type: "poster"
  },
  {
    name: "Ranveer Allahbadia",
    url: "/logos/ranveer.jpg",
    type: "creator"
  },
  {
    name: "Red Bull",
    url: "/posters/our members are working with/redbull.jpg",
    type: "poster"
  },
  {
    name: "Saurabh Sachdeva",
    url: "/logos/saurabh_sachdeva.jpg",
    type: "creator"
  },
  {
    name: "VF",
    url: "/posters/our members are working with/VF.jpg",
    type: "poster"
  }
];

const row2Members: MemberCard[] = [
  {
    name: "TSB",
    url: "/posters/our members are working with/TSB.jpg",
    type: "poster"
  },
  {
    name: "McCann",
    url: "/posters/our members are working with/mccann.png",
    type: "poster"
  },
  {
    name: "Skillhouse",
    url: "/posters/our members are working with/skillhouse.jpg",
    type: "poster"
  },
  {
    name: "YAAS Media",
    url: "/posters/our members are working with/yaas.jpg",
    type: "poster"
  }
];

const allMembers = [...row1Members, ...row2Members];

const Members = () => {
  return (
    <section 
      className="py-24 bg-gradient-to-b from-black via-[#030303] to-black border-b border-white/5 relative overflow-hidden flex flex-col items-center justify-center"
      style={{
        backgroundImage: 'radial-gradient(rgba(243, 215, 167, 0.01) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Soft Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] bg-[#F3D7A7]/2 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl w-full px-6 relative z-10 flex flex-col items-center">
        
        {/* SECTION HEADER */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="h-[1px] w-6 bg-[#F3D7A7]/40" />
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.35em] text-[#F3D7A7]">
              Ecosystem
            </span>
            <div className="h-[1px] w-6 bg-[#F3D7A7]/40" />
          </div>
          <h2 className="text-3xl md:text-5xl tracking-tight text-white text-center leading-tight">
            <span className="font-['Helvetica',_sans-serif] font-bold">Our members</span> <span className="font-serif italic font-normal text-[#F3D7A7] lowercase tracking-normal normal-case">are working with</span>
          </h2>
        </div>

        {/* DESKTOP ROW-BY-ROW LAYOUT (Visible md and above) */}
        <div className="hidden md:flex flex-col gap-6 w-full items-center">
          
          {/* Row 1: 5 Columns */}
          <div className="grid grid-cols-5 gap-6 w-full">
            {row1Members.map((member, i) => (
              <MemberPosterCard key={member.name} member={member} index={i} />
            ))}
          </div>

          {/* Row 2: 4 Columns (Centered) */}
          <div className="grid grid-cols-4 gap-6 w-[80%] mt-2">
            {row2Members.map((member, i) => (
              <MemberPosterCard key={member.name} member={member} index={i + 5} />
            ))}
          </div>

        </div>

        {/* MOBILE GRID LAYOUT (Visible below md) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full md:hidden">
          {allMembers.map((member, i) => (
            <MemberPosterCard key={member.name} member={member} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

const MemberPosterCard = ({ member, index }: { member: MemberCard; index: number }) => {
  // Smooth staggered floating effect
  const yFloating = [0, -6 - (index % 3) * 2, 0];
  const duration = 4.5 + (index % 4) * 0.5;
  const delay = index * 0.2;

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
        y: -12,
        scale: 1.03,
        borderColor: "rgba(243, 215, 167, 0.35)",
        boxShadow: "0 15px 35px rgba(243, 215, 167, 0.08)"
      }}
      className="group relative aspect-[3/4] w-full rounded-2xl border border-white/10 bg-[#0a0a0c]/40 backdrop-blur-md overflow-hidden transition-all duration-300 cursor-pointer shadow-lg flex items-center justify-center"
    >
      {/* 3D Specular Highlight Overlays */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none z-10" />

      {/* Poster Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src={member.url}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 50vw, 20vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority={index < 5}
        />
      </div>

      {/* Hover Glass Label with Card Name */}
      <div className="absolute bottom-0 left-0 right-0 p-3.5 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end">
        <span className="text-[10px] font-mono text-[#F3D7A7] uppercase tracking-widest font-black">
          {member.type === "creator" ? "Creator" : "Partner Brand"}
        </span>
        <h5 className="text-white text-xs font-bold font-sans tracking-tight leading-tight mt-0.5">
          {member.name}
        </h5>
      </div>
    </motion.div>
  );
};

export default Members;
