"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // eslint-disable-next-line
    setIsClient(true);
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  if (!isClient) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-[#F3D7A7] pointer-events-none z-[9999] mix-blend-difference"
      animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
      transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
    />
  );
}
