"use client";
import React, { useState } from "react";

const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="h-screen w-full flex flex-col justify-center items-center text-center relative overflow-hidden bg-black">
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1500 ${videoLoaded ? 'opacity-70' : 'opacity-0'}`}
      >
        <source src="/hero-bg.mp4?v=4" type="video/mp4" />
      </video>

      <div className="relative z-20 px-4 text-center">
        <h1 className="text-[14vw] md:text-[11vw] font-bold leading-[0.8] tracking-[-0.06em] uppercase mb-8 text-white text-center">
          <span className="sr-only">Blade Media - High-Ticket Content & Growth Agency</span>
          Growth,<br/>engineered.
        </h1>
        <p className="text-[#F3D7A7] text-[10px] md:text-[12px] uppercase tracking-[0.8em] font-bold text-center">Blade Media</p>
      </div>
    </section>
  );
};

export default Hero;
