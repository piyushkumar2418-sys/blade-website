"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface Work {
  title: string;
  category: string;
  link: string;
  video: string;
  img: string;
}

const youtubeWorks: Work[] = [
  { title: "Nikhil Kamath", category: "Storytelling", link: "https://youtu.be/YY7J1pHfSyY", video: "/preview1.mp4", img: "/thumb1.jpg" },
  { title: "Money with Swabi", category: "Infotainment", link: "https://www.youtube.com/@Moneywithswabi/videos", video: "/preview2.mp4", img: "/thumb2.jpg" },
  { title: "Right Now With Rohan", category: "Podcast", link: "https://youtu.be/i7uwh0CzfRM", video: "/preview3.mp4", img: "/thumb3.jpg" },
];

const verticalWorks: Work[] = [
  { title: "Visual Dominance", category: "Retention", link: "https://www.instagram.com/reel/DDrxL2CMYCB/", video: "/preview5.mp4", img: "/thumb5.webp" },
  { title: "Editorial Series", category: "Vlog Edit", link: "https://www.instagram.com/katemackz/", video: "/preview6.mp4", img: "/thumb6.webp" },
  { title: "Dynamic Flow", category: "Motion Graphics", link: "https://www.instagram.com/DKTmhQqqF6M/", video: "/preview7.mp4", img: "/thumb7.jpg" },
  { title: "Retention Edit", category: "Viral Edit", link: "https://www.instagram.com/DTIgqVyjVcJ/", video: "/preview8.mp4", img: "/thumb8.jpeg" },
];

const WorkItem = ({ work, aspect, index }: { work: Work, aspect: string, index: number }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const ref = useRef(null);
  
  // Start loading/playing when it comes near the viewport
  const isInView = useInView(ref, { margin: "100%" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.6 } }
      }}
    >
      <motion.a 
        href={work.link} 
        target="_blank"
        whileTap={{ scale: 0.98 }}
        className={`group relative block ${aspect} bg-[#0a0a0a] border border-white/5 overflow-hidden rounded-sm shadow-2xl cursor-none`}
      >
        <Image 
          src={work.img} 
          alt={work.title} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-700 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`} 
        />
        
        {isInView && (
          <video 
            src={work.video} 
            loop 
            muted 
            playsInline 
            autoPlay
            onLoadedData={() => setVideoLoaded(true)}
            className="absolute inset-0 w-full h-full object-cover z-10" 
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-30 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-5 left-5 z-40 text-left transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <span className="text-[#F3D7A7] text-[8px] uppercase tracking-[0.3em] block mb-1 font-bold">{work.category}</span>
          <h4 className="text-sm md:text-base font-bold uppercase tracking-tight text-white">{work.title}</h4>
        </div>
      </motion.a>
    </motion.div>
  );
};

const Galleries = () => {
  return (
    <section id="section_edits" className="py-32 px-6 md:px-12 relative z-20 text-left">
      <div className="max-w-[1400px] mx-auto w-full space-y-48">
        <div className="text-left">
          <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-[-0.06em] mb-12 text-white text-left">Selected Productions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {youtubeWorks.map((work, i) => ( <WorkItem key={i} work={work} aspect="aspect-video" index={i} /> ))}
          </div>
        </div>
        <div className="text-left">
          <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-[-0.06em] mb-12 text-[#F3D7A7] text-left">Viral Originals</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {verticalWorks.map((work, i) => ( <WorkItem key={i} work={work} aspect="aspect-[9/16]" index={i} /> ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Galleries;
