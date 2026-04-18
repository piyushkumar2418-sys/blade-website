"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 border-2 border-[#F3D7A7] rounded-full pointer-events-none z-[99999] hidden md:block"
      style={{
        // This shadow ensures the gold is visible even on pure white backgrounds
        boxShadow: "0 0 4px rgba(0,0,0,0.2)",
        filter: "drop-shadow(0 0 1px rgba(0,0,0,1))" 
      }}
      animate={{ x: mousePos.x - 12, y: mousePos.y - 12 }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
    />
  );
}