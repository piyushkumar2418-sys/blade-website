"use client";
import React, { useRef, useEffect, useState } from "react";

const CreatorsMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [scrollLen, setScrollLen] = useState(9500);

  useEffect(() => {
    // Determine motion preference
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setScrollLen(reduceMotion ? 4000 : 9500);

    const handleScroll = () => {
      if (!containerRef.current || !iframeRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY;
      
      // Calculate container offsetTop relative to document
      const docScrollTop = window.scrollY || document.documentElement.scrollTop;
      const offsetTop = rect.top + docScrollTop;
      
      // Scroll position inside the iframe
      let localScroll = 0;
      if (scrollTop >= offsetTop) {
        localScroll = scrollTop - offsetTop;
        const limit = reduceMotion ? 4000 : 9500;
        if (localScroll > limit) {
          localScroll = limit;
        }
      }

      // Propagate scroll to the iframe window
      try {
        const iframeWindow = iframeRef.current.contentWindow;
        if (iframeWindow) {
          iframeWindow.scrollTo(0, localScroll);
        }
      } catch (e) {
        console.error("Failed to scroll iframe", e);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    
    // Run once initially to sync state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleIframeLoad = () => {
    if (iframeRef.current && iframeRef.current.contentDocument) {
      try {
        const style = iframeRef.current.contentDocument.createElement("style");
        style.innerHTML = `
          /* Hide scrollbar for Chrome, Safari and Opera */
          html::-webkit-scrollbar, body::-webkit-scrollbar {
            display: none !important;
          }
          /* Hide scrollbar for IE, Edge and Firefox */
          html, body {
            -ms-overflow-style: none !important;  /* IE and Edge */
            scrollbar-width: none !important;     /* Firefox */
          }
        `;
        iframeRef.current.contentDocument.head.appendChild(style);
      } catch (e) {
        console.error("Failed to inject scrollbar styles into iframe", e);
      }
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-[#030303]" 
      style={{ height: `calc(${scrollLen}px + 100vh)` }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <iframe
          ref={iframeRef}
          src="/creators-map-bic.html"
          className="w-full h-full border-none"
          title="Creator's Map"
          onLoad={handleIframeLoad}
        />
      </div>
    </div>
  );
};

export default CreatorsMap;
