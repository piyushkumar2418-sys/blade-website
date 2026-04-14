"use client";
import React, { useRef, useEffect } from "react";

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    // This logic handles the "Drawing"
    const handleMouseMove = (e: MouseEvent) => {
      ctx.globalCompositeOperation = "source-over";
      // This is your F3D7A7 gold at 50% opacity - it will look like glowing beige
ctx.strokeStyle = "rgba(243, 215, 167, 0.5)"; 
ctx.lineWidth = 3; // Slightly thicker to make it "pop"
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(e.clientX, e.clientY);
    };

    // This creates the "fade away" effect
    const fade = () => {
      ctx.fillStyle = "rgba(5, 5, 5, 0.05)"; // Matches your deep black background
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      requestAnimationFrame(fade);
    };

    window.addEventListener("mousemove", handleMouseMove);
    fade();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ filter: "blur(1.5px)" }}
    />
  );
}