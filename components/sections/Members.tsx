"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionLabel from "../SectionLabel";

const membersData = [
  {
    name: "Ranveer Allahbadia",
    url: "/logos/ranveer.jpg",
    type: "creator",
    role: "BeerBiceps / Podcaster"
  },
  {
    name: "Saurabh Sachdeva",
    url: "/logos/saurabh_sachdeva.jpg",
    type: "creator",
    role: "Actor & Acting Coach"
  },
  {
    name: "Actors Truth",
    url: "/logos/actorstruth.jpg",
    type: "creator",
    role: "Acting Academy"
  },
  {
    name: "Red Bull",
    url: "/logos/redbull.png",
    type: "brand",
    role: "Global Energy Brand"
  },
  {
    name: "Unacademy",
    url: "/logos/unacademy.png",
    type: "brand",
    role: "EdTech Leader"
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
    role: "Side Hustle / Creator"
  },
  {
    name: "Viraj Ghelani (VF)",
    url: "/logos/vf_logo.png",
    type: "brand",
    role: "Velvet Films / Creator"
  }
];

const Members = () => {
  return (
    <section 
      className="py-32 px-6 md:px-24 bg-[#030303] relative overflow-hidden border-b border-white/5"
      style={{
        backgroundImage: 'radial-gradient(rgba(243, 215, 167, 0.015) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Premium organic golden gradient glows */}
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-gradient-to-tr from-[#F3D7A7]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] bg-gradient-to-bl from-[#F3D7A7]/5 to-[#8B5CF6]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 text-left">
          <SectionLabel light gold>Collaborations</SectionLabel>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight leading-[0.9] text-white">
            Our Members <br />
            are <span className="font-serif italic font-normal text-[#F3D7A7] lowercase tracking-normal normal-case">working with</span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-white/40 leading-relaxed font-light max-w-xl">
            From India&apos;s leading digital creators to global brands, our network executes high-impact collaborations across the ecosystem.
          </p>
        </div>

        {/* Members/Logos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl">
          {membersData.map((member, index) => (
            <MemberCard key={member.name} member={member} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

const MemberCard = ({ member, index }: { member: typeof membersData[0], index: number }) => {
  const [error, setError] = useState(false);

  // Staggered floating effect
  const yFloating = [0, -8 - (index % 3) * 2, 0];
  const duration = 4.5 + (index % 4) * 0.5;
  const delay = index * 0.15;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="relative z-10"
    >
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
          borderColor: "rgba(243, 215, 167, 0.5)",
          boxShadow: "0 25px 50px -12px rgba(243, 215, 167, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.1)",
        }}
        className="w-full aspect-[4/3.2] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#F3D7A7]/[0.05] via-[#F3D7A7]/[0.01] to-transparent backdrop-blur-xl border border-[#F3D7A7]/15 rounded-2xl md:rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(243,215,167,0.08)] transition-colors duration-500 group overflow-hidden cursor-pointer"
      >
        {/* Shiny sweep effect on hover */}
        <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-[#F3D7A7]/10 to-transparent -skew-x-12 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-out pointer-events-none" />

        {/* Card Content */}
        {member.type === "creator" ? (
          /* Creator Avatar Style */
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-[#F3D7A7]/30 bg-black/40 mb-4 flex items-center justify-center shadow-lg group-hover:border-[#F3D7A7]/60 transition-colors duration-300">
            {!error ? (
              <Image 
                src={member.url} 
                alt={member.name}
                fill
                sizes="(max-width: 768px) 96px, 96px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => setError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-black/50 text-[#F3D7A7] font-bold text-lg">
                {member.name.charAt(0)}
              </div>
            )}
          </div>
        ) : (
          /* Brand Logo Style */
          <div className="relative h-20 md:h-24 w-full flex items-center justify-center mb-4 p-2 z-10">
            {!error ? (
              <div className="relative w-full h-full max-w-[80%] max-h-[85%]">
                <Image 
                  src={member.url} 
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 150px, 200px"
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                  onError={() => setError(true)}
                />
              </div>
            ) : (
              <div className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] text-center">
                {member.name}
              </div>
            )}
          </div>
        )}

        {/* Text Details */}
        <h4 className="text-sm md:text-base font-bold uppercase tracking-wider text-white/90 group-hover:text-[#F3D7A7] transition-colors duration-300 text-center">
          {member.name}
        </h4>
        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/40 mt-1.5 font-medium text-center">
          {member.role}
        </p>

      </motion.div>
    </motion.div>
  );
};

export default Members;
