"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface MemberCard {
  name: string;
  url: string;
  type: "creator" | "poster";
}

const allMembers: MemberCard[] = [
  {
    name: "Ranveer Allahbadia",
    url: "/logos/ranveer.jpg",
    type: "creator"
  },
  {
    name: "McCann",
    url: "/posters/our members are working with/mccann.png",
    type: "poster"
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
    name: "TAT",
    url: "/posters/our members are working with/TAT.jpg",
    type: "poster"
  },
  {
    name: "TSB",
    url: "/posters/our members are working with/TSB.jpg",
    type: "poster"
  },
  {
    name: "VF",
    url: "/posters/our members are working with/VF.jpg",
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

// Double the members list for a seamless infinite scroll loop
const doubledMembers = [...allMembers, ...allMembers];

const Members = () => {
  return (
    <section 
      className="py-24 bg-white border-b border-neutral-100 relative overflow-hidden flex flex-col items-center justify-center"
    >
      <div className="w-full relative z-10 flex flex-col items-center">
        
        {/* SECTION HEADER */}
        <div className="mb-16 flex flex-col items-center text-center px-6">
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="h-[1px] w-6 bg-neutral-200" />
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.35em] text-neutral-400">
              Ecosystem
            </span>
            <div className="h-[1px] w-6 bg-neutral-200" />
          </div>
          <h2 className="text-3xl md:text-5xl tracking-tight text-neutral-950 text-center leading-tight">
            <span className="font-['Helvetica',_sans-serif] font-bold">Our members</span> <span className="font-serif italic font-normal text-[#9A7B44] lowercase tracking-normal normal-case">are working with</span>
          </h2>
        </div>

        {/* INFINITE MARQUEE CAROUSEL */}
        <div className="w-full flex whitespace-nowrap overflow-hidden relative select-none">
          {/* Edge gradient overlays for smooth fade-outs */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ 
              duration: 35, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="flex gap-5 md:gap-6 items-center w-max px-3"
          >
            {doubledMembers.map((member, i) => (
              <MemberPosterCard key={i} member={member} index={i} />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

const MemberPosterCard = ({ member, index }: { member: MemberCard; index: number }) => {
  const isCreator = member.name === "Ranveer Allahbadia" || member.name === "Saurabh Sachdeva";

  return (
    <div
      className="relative w-[180px] sm:w-[220px] md:w-[260px] aspect-[3/4] shrink-0 rounded-2xl md:rounded-3xl border border-neutral-200/60 bg-neutral-50 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex items-center justify-center"
    >
      {/* Poster Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src={member.url}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 30vw, 20vw"
          className="object-cover pointer-events-none"
          priority={index < 4}
        />
      </div>

      {/* Black shadow overlay on the bottom of Ranveer's and Saurabh's picture */}
      {isCreator && (
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-10" />
      )}
    </div>
  );
};

export default Members;
