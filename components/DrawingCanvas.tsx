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

    const handleMouseMove = (e: MouseEvent) => {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = getRgba(color, 0.5); 
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(e.clientX, e.clientY);
    };

    const fade = () => {
      const fadeBg = color === "#F3D7A7" ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)";
      ctx.fillStyle = fadeBg; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      requestAnimationFrame(fade);
    };

    window.addEventListener("mousemove", handleMouseMove);
    const animationFrame = requestAnimationFrame(fade);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", setSize);
      cancelAnimationFrame(animationFrame);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[15]"
      style={{ filter: "blur(1.5px)" }}
    />
  );
};

export default DrawingCanvas;