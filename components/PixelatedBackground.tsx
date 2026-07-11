"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";

interface PixelatedBackgroundProps {
  backgroundColor?: string;
  gridSizeDesktop?: number;
  gridSizeTablet?: number;
  gridSizeMobile?: number;
  gridBorderSize?: number;
  gridBorderColor?: string;
  hoverColor?: string; // e.g. "#F3D7A7"
  fadeDuration?: number; // in seconds, e.g. 2
  breakpoint?: number; // e.g. 780
}

function parseColor(hex: string) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h.slice(0, 6), 16);
  if (isNaN(n)) return { r: 243, g: 215, b: 167 }; // Default F3D7A7
  return {
    r: (n >> 16) & 255,
    g: (n >> 8) & 255,
    b: n & 255,
  };
}

export default function PixelatedBackground({
  backgroundColor = "transparent",
  gridSizeDesktop = 36,
  gridSizeTablet = 24,
  gridSizeMobile = 10,
  gridBorderSize = 1,
  gridBorderColor = "#3B3D48",
  hoverColor = "#F3D7A7",
  fadeDuration = 2,
  breakpoint = 780,
}: PixelatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Animation states
  const opacitiesRef = useRef<number[]>([]);
  const colsRef = useRef(0);
  const rowsRef = useRef(0);
  const cellWidthRef = useRef(0);
  const cellHeightRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const prevTimeRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const isMobileRef = useRef(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;
    
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Determine grid size based on breakpoint
    const isMobile = W <= breakpoint;
    const isTablet = W > breakpoint && W <= 1024;
    isMobileRef.current = W <= breakpoint; // Flicker mode active on mobile/tablet widths
    
    const cols = isMobile 
      ? gridSizeMobile 
      : isTablet 
        ? gridSizeTablet 
        : gridSizeDesktop;

    const cellWidth = W / cols;
    const cellHeight = cellWidth; // Keep cells square
    const rows = Math.ceil(H / cellHeight);

    colsRef.current = cols;
    rowsRef.current = rows;
    cellWidthRef.current = cellWidth;
    cellHeightRef.current = cellHeight;

    // Reset/resize opacities array
    const totalCells = cols * rows;
    const newOpacities = new Array(totalCells).fill(0);
    // Copy over existing opacities if any
    for (let i = 0; i < Math.min(opacitiesRef.current.length, totalCells); i++) {
      newOpacities[i] = opacitiesRef.current[i];
    }
    opacitiesRef.current = newOpacities;
  }, [gridSizeDesktop, gridSizeTablet, gridSizeMobile, breakpoint]);

  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobileRef.current) return; // Touch mode uses random flicker
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    
    resizeCanvas();

    if (containerRef.current && typeof ResizeObserver !== "undefined") {
      const resizeObserver = new ResizeObserver(() => {
        resizeCanvas();
      });
      resizeObserver.observe(containerRef.current);
      return () => {
        resizeObserver.disconnect();
        window.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isClient, resizeCanvas]);

  useEffect(() => {
    if (!isClient) return;

    const loop = (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dt = prevTimeRef.current ? (time - prevTimeRef.current) / 1000 : 0.016;
      prevTimeRef.current = time;

      const cols = colsRef.current;
      const rows = rowsRef.current;
      const cellWidth = cellWidthRef.current;
      const cellHeight = cellHeightRef.current;
      const totalCells = cols * rows;

      // 1. Handle desktop mouse hover trigger
      if (!isMobileRef.current && mouseRef.current.x >= 0 && mouseRef.current.y >= 0) {
        const col = Math.floor(mouseRef.current.x / cellWidth);
        const row = Math.floor(mouseRef.current.y / cellHeight);
        if (col >= 0 && col < cols && row >= 0 && row < rows) {
          const index = row * cols + col;
          opacitiesRef.current[index] = 1.0; // Glow fully
        }
      }

      // 2. Handle mobile/tablet random flicker
      if (isMobileRef.current) {
        // Flicker rate: set a few random cells to high opacity in every frame
        const flickerChance = 0.05; // 5% chance per frame to flicker a cell
        if (Math.random() < flickerChance) {
          const count = Math.floor(Math.random() * 3) + 1; // Flicker 1 to 3 cells
          for (let k = 0; k < count; k++) {
            const randIdx = Math.floor(Math.random() * totalCells);
            if (randIdx >= 0 && randIdx < totalCells) {
              opacitiesRef.current[randIdx] = Math.random() * 0.8 + 0.2;
            }
          }
        }
      }

      // 3. Render
      const W = canvas.width / (window.devicePixelRatio || 1);
      const H = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, W, H);

      if (backgroundColor !== "transparent") {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, W, H);
      }

      const rgb = parseColor(hoverColor);
      const borderRgb = parseColor(gridBorderColor);

      // Draw Grid cells & decrement opacity
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const index = r * cols + c;
          let opacity = opacitiesRef.current[index] || 0;

          // Decrement opacity
          if (opacity > 0) {
            opacity = Math.max(0, opacity - dt / fadeDuration);
            opacitiesRef.current[index] = opacity;
          }

          const cellX = c * cellWidth;
          const cellY = r * cellHeight;

          // Draw filled hover cell
          if (opacity > 0) {
            ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 0.25})`; // Keep glow subtle
            ctx.fillRect(cellX, cellY, cellWidth, cellHeight);
          }

          // Draw cell border lines
          if (gridBorderSize > 0) {
            ctx.strokeStyle = `rgba(${borderRgb.r}, ${borderRgb.g}, ${borderRgb.b}, 0.15)`;
            ctx.lineWidth = gridBorderSize;
            ctx.strokeRect(cellX, cellY, cellWidth, cellHeight);
          }
        }
      }

      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isClient, backgroundColor, hoverColor, gridBorderColor, gridBorderSize, fadeDuration]);

  if (!isClient) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: backgroundColor === "transparent" ? "transparent" : backgroundColor,
          position: "relative",
          overflow: "hidden",
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: backgroundColor === "transparent" ? "transparent" : backgroundColor,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}
