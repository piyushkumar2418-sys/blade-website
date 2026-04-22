"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Mode = "agency" | "inner-circle";

interface SiteContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage if available
  const [mode, setMode] = useState<Mode>("agency");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("site-mode") as Mode;
    if (savedMode) {
      setMode(savedMode);
    }
    setIsInitialized(true);
  }, []);

  const updateMode = (newMode: Mode) => {
    setMode(newMode);
    localStorage.setItem("site-mode", newMode);
  };

  const toggleMode = () => {
    const newMode = mode === "agency" ? "inner-circle" : "agency";
    updateMode(newMode);
  };

  return (
    <SiteContext.Provider value={{ mode, setMode: updateMode, toggleMode }}>
      {isInitialized ? children : <div className="bg-black min-h-screen" />}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error("useSite must be used within a SiteProvider");
  }
  return context;
}
