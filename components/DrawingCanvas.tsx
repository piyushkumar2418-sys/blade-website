"use client";
import React, { useRef, useEffect } from "react";

interface DrawingCanvasProps {
  color?: string;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ color = "#F3D7A7" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  useEffect(() => {
    // If the color is black (Institution mode), we don't initialize the logic
    if (color === "#000000") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    setSize();
    window.addEventListener("resize", setSize);

    const handleMouseMove = (e: MouseEvent) => {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = getRgba(color, 0.8);
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(e.clientX, e.clientY);
    };

    let animationFrameId: number;
    const fade = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      animationFrameId = requestAnimationFrame(fade);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameId = requestAnimationFrame(fade);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color]);

  // Completely hide the canvas if in Institution mode
  if (color === "#000000") return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[10]"
      style={{ filter: "blur(1px)", mixBlendMode: "screen" }}
    />
  );
};

export default DrawingCanvas;