"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Mode = "agency" | "inner-circle";

interface SiteContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("agency");

  const toggleMode = () => {
    setMode((prev) => (prev === "agency" ? "inner-circle" : "agency"));
  };

  return (
    <SiteContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
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
