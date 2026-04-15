"use client";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import DrawingCanvas from "@/components/DrawingCanvas";
import Scene3D from "@/components/Scene3D";
import { useRef, useState } from "react";

const WorkItem = ({ work, aspect, index }: { work: any; aspect: string, index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative"
    >
      <a 
        href={work.link} 
        target="_blank"
        onMouseEnter={() => { setIsHovered(true); videoRef.current?.play(); }}
        onMouseLeave={() => { setIsHovered(false); videoRef.current?.pause(); }}
        className={`group relative block ${aspect} bg-[#0a0a0a] overflow-hidden rounded-sm border border-white/5`}
      >
        <img src={work.img} className={`absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`} alt="" />
        <video ref={videoRef} src={work.video} loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-10" />
        <div className="absolute inset-0 bg-black/40 z-20 group-hover:opacity-0 transition-opacity" />
        <div className="absolute bottom-6 left-6 z-30">
          <p className="text-[#F3D7A7] text-[8px] uppercase tracking-widest mb-2">{work.category}</p>
          <h4 className="text-xl font-bold uppercase">{work.title}</h4>
        </div>
      </a>
    </motion.div>
  );
};

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const youtubeWorks = [
    { title: "Nikhil Kamath", category: "YouTube", link: "https://youtu.be/YY7J1pHfSyY", video: "/preview1.mp4", img: "https://i.ytimg.com/vi/YY7J1pHfSyY/maxresdefault.jpg" },
    { title: "Money with Swabi", category: "YouTube", link: "https://www.youtube.com/@Moneywithswabi/videos", video: "/preview2.mp4", img: "https://i.ytimg.com/vi/NQvveKioHCw/maxresdefault.jpg" },
    { title: "Podcast", category: "Podcast", link: "https://youtu.be/i7uwh0CzfRM", video: "/preview3.mp4", img: "https://i.ytimg.com/vi/i7uwh0CzfRM/maxresdefault.jpg" },
  ];

  const verticalWorks = [
    { title: "Visual Dominance", category: "Reel", link: "https://www.instagram.com/reel/DDrxL2CMYCB/", video: "/preview5.mp4", img: "/thumb5.webp" },
    { title: "Editorial Series", category: "Reel", link: "https://www.instagram.com/katemackz/", video: "/preview6.mp4", img: "/thumb6.webp" },
    { title: "Dynamic Flow", category: "Reel", link: "https://www.instagram.com/DKTmhQqqF6M/", video: "/preview7.mp4", img: "/thumb7.jpg" },
    { title: "Retention Edit", category: "Reel", link: "https://www.instagram.com/DTIgqVyjVcJ/", video: "/preview8.mp4", img: "/thumb8.jpeg" },
  ];

  return (
    <main ref={containerRef} className="bg-black text-white min-h-screen">
      <CustomCursor />
      <DrawingCanvas />
      <Scene3D />

      <nav className="fixed top-0 w-full z-50 flex justify-between p-10 mix-blend-difference">
        <img src="/blade-logo.png" alt="" className="h-10 w-auto" />
        <button className="text-[10px] uppercase tracking-widest font-bold text-[#F3D7A7]">Contact</button>
      </nav>

      <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-50 z-0">
          <source src="/hero-bg.mp4?v=3" type="video/mp4" />
        </video>
        <h1 className="text-[14vw] md:text-[11vw] font-bold leading-none uppercase z-10 mix-blend-difference text-center">
          Growth,<br/>engineered.
        </h1>
      </section>

      <section className="py-40 px-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20">
          <div>
             <h2 className="text-6xl font-bold uppercase mb-10 text-[#F3D7A7]">The Visionary</h2>
             <p className="text-xl text-white/60 italic">"We decoded content through obsession."</p>
          </div>
          <img src="/piyush.png" className="w-full grayscale border border-white/10" alt="" />
        </div>
      </section>

      <section className="py-40 px-10">
        <h2 className="text-4xl font-bold uppercase mb-20 border-b border-white/10 pb-5">Selected Productions</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {youtubeWorks.map((w, i) => <WorkItem key={i} work={w} aspect="aspect-video" index={i} />)}
        </div>
      </section>

      <section className="py-40 px-10">
        <h2 className="text-4xl font-bold uppercase mb-20 border-b border-white/10 pb-5 text-[#F3D7A7]">Viral Originals</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {verticalWorks.map((w, i) => <WorkItem key={i} work={w} aspect="aspect-[9/16]" index={i} />)}
        </div>
      </section>

      <footer className="h-screen flex flex-col justify-center items-center">
         <h2 className="text-7xl font-bold mb-10">READY?</h2>
         <a href="https://calendly.com/piyushkumar2418/30min" className="px-10 py-5 border border-[#F3D7A7] text-[#F3D7A7] uppercase text-xs font-bold">Secure a Session</a>
      </footer>
    </main>
  );
}