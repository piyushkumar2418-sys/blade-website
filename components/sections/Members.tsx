"use client";
import React, { useRef, useState, useEffect } from "react";
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

const Members = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const updateConstraints = () => {
      if (carouselRef.current) {
        const containerWidth = carouselRef.current.offsetWidth;
        const contentWidth = carouselRef.current.scrollWidth;
        const maxDragLeft = Math.max(0, contentWidth - containerWidth);
        setDragConstraints({
          left: -maxDragLeft,
          right: 0
        });
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);

    // Recalculate once images are fully loaded and layouts are settled
    const timer = setTimeout(updateConstraints, 600);

    return () => {
      window.removeEventListener("resize", updateConstraints);
      clearTimeout(timer);
    };
  }, []);

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

      <div className="w-full relative z-10 flex flex-col items-center">
        
        {/* SECTION HEADER */}
        <div className="mb-12 flex flex-col items-center text-center px-6">
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

        {/* SCROLL & DRAG INDICATOR */}
        <div className="mb-6 flex items-center gap-2 text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-white/30 font-mono select-none">
          <span>Scroll & Drag</span>
          <span className="animate-pulse">↔</span>
        </div>

        {/* CAROUSEL WRAPPER */}
        <div 
          ref={carouselRef} 
          className="w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
        >
          <motion.div
            drag="x"
            dragConstraints={dragConstraints}
            dragElastic={0.15}
            dragTransition={{ power: 0.2, timeConstant: 200 }}
            className="flex gap-5 md:gap-6 px-6 md:px-12 lg:px-24 pb-8 w-max"
          >
            {allMembers.map((member, i) => (
              <MemberPosterCard key={member.name} member={member} index={i} />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

const MemberPosterCard = ({ member, index }: { member: MemberCard; index: number }) => {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.02,
        borderColor: "rgba(243, 215, 167, 0.3)",
        boxShadow: "0 20px 40px rgba(243, 215, 167, 0.06)",
        transition: { duration: 0.3 }
      }}
      className="group relative w-[180px] sm:w-[220px] md:w-[260px] aspect-[3/4] shrink-0 rounded-2xl md:rounded-3xl border border-white/10 bg-[#0a0a0c]/60 backdrop-blur-md overflow-hidden transition-all duration-300 shadow-xl flex items-center justify-center select-none"
    >
      {/* 3D Specular Highlight Overlays */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 border border-white/5 rounded-2xl md:rounded-3xl pointer-events-none z-10" />

      {/* Poster Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <Image
          src={member.url}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 30vw, 20vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority={index < 4}
        />
      </div>

      {/* Hover Glass Label with Card Name */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end">
        <span className="text-[9px] md:text-[10px] font-mono text-[#F3D7A7] uppercase tracking-widest font-black">
          {member.type === "creator" ? "Creator" : "Partner Brand"}
        </span>
        <h5 className="text-white text-xs md:text-sm font-bold font-sans tracking-tight leading-tight mt-0.5">
          {member.name}
        </h5>
      </div>
    </motion.div>
  );
};

export default Members;
