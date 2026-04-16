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
      ctx.fillStyle = color === "#F3D7A7" ? "#000000" : "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    setSize();
    window.addEventListener("resize", setSize);

    const handleMouseMove = (e: MouseEvent) => {
      if (color !== "#F3D7A7") return; // Only draw in Agency Mode
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = getRgba(color, 0.8);
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(e.clientX, e.clientY);
    };

    let animationFrameId: number;
    const fade = () => {
      const fadeBg = color === "#F3D7A7" ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 1)";
      ctx.fillStyle = fadeBg; 
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

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[10] transition-opacity duration-500 ${color === "#F3D7A7" ? "opacity-100" : "opacity-0"}`}
      style={{ filter: "blur(1px)", mixBlendMode: "screen" }}
    />
  );
};

export default DrawingCanvas;