"use client";
import React, { useRef, useEffect, useState } from "react";

interface CreatorsMapProps {
  onActiveStateChange?: (active: boolean) => void;
}

const CreatorsMap: React.FC<CreatorsMapProps> = ({ onActiveStateChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [scrollLen, setScrollLen] = useState(5000);
  const wasActiveRef = useRef(false);

  const handleScroll = () => {
    if (!containerRef.current || !iframeRef.current || !wrapperRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY;
    
    // Calculate container offsetTop relative to document
    const docScrollTop = window.scrollY || document.documentElement.scrollTop;
    const offsetTop = rect.top + docScrollTop;
    
    // Determine motion preference
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const limit = reduceMotion ? 2000 : 5000;

    // Trigger active state callback for parent component
    const isActive = scrollTop >= offsetTop && scrollTop <= offsetTop + limit;
    if (isActive !== wasActiveRef.current) {
      wasActiveRef.current = isActive;
      onActiveStateChange?.(isActive);
    }

    // 1. Manual pinning logic to bypass ancestor overflow-x: hidden / sticky bugs
    if (scrollTop < offsetTop) {
      // Container top is below viewport top - scroll naturally in flow
      wrapperRef.current.style.position = "absolute";
      wrapperRef.current.style.top = "0px";
      wrapperRef.current.style.bottom = "auto";
      wrapperRef.current.style.left = "0px";
    } else if (scrollTop >= offsetTop && scrollTop <= offsetTop + limit) {
      // Container top is at/above viewport top - pin full-screen to viewport
      wrapperRef.current.style.position = "fixed";
      wrapperRef.current.style.top = "0px";
      wrapperRef.current.style.bottom = "auto";
      wrapperRef.current.style.left = "0px";
    } else {
      // Scrolled past the container - pin to bottom of container to scroll out of view
      wrapperRef.current.style.position = "absolute";
      wrapperRef.current.style.top = "auto";
      wrapperRef.current.style.bottom = "0px";
      wrapperRef.current.style.left = "0px";
    }

    // 2. Scroll position inside the iframe. Only scroll when the container is pinned/active.
    let localScroll = 0;
    if (scrollTop >= offsetTop) {
      localScroll = scrollTop - offsetTop;
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

  useEffect(() => {
    // Determine motion preference
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setScrollLen(reduceMotion ? 2000 : 5000);

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
    // Forceful sync to prevent browser scroll restoration from overriding initial state
    handleScroll();
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-[#030303]" 
      style={{ height: `calc(${scrollLen}px + 100vh)` }}
    >
      {/* Manual pin wrapper handles full screen locking reliably */}
      <div 
        ref={wrapperRef} 
        className="absolute top-0 left-0 w-full h-screen overflow-hidden"
      >
        <iframe
          ref={iframeRef}
          src="/creators-map-bic.html"
          className="w-full h-full border-none pointer-events-none"
          title="Creator's Map"
          onLoad={handleIframeLoad}
        />
        {/* Top gradient overlay to blend map into Crisis segment (bg-black) */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black to-transparent pointer-events-none z-[10]" />

        {/* Bottom gradient overlay to blend map into Manifesto segment (bg-[#030303]) */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none z-[10]" />
      </div>
    </div>
  );
};

export default CreatorsMap;
