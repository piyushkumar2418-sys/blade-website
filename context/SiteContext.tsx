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
    if (typeof window !== "undefined") {
      // 1. Check query parameters first (e.g. ?mode=inner-circle or ?mode=agency)
      const params = new URLSearchParams(window.location.search);
      const queryMode = params.get("mode");
      
      if (queryMode === "agency" || queryMode === "inner-circle" || queryMode === "innerCircle" || queryMode === "bic") {
        const targetMode: Mode = (queryMode === "innerCircle" || queryMode === "bic") ? "inner-circle" : (queryMode as Mode);
        if (targetMode !== mode) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setMode(targetMode);
        }
        sessionStorage.setItem("site-mode", targetMode);
        setIsInitialized(true);
        return;
      }

      // 2. Check session storage
      const savedMode = sessionStorage.getItem("site-mode") as Mode;
      if (savedMode) {
        if (savedMode !== mode) {
          setMode(savedMode);
        }
        setIsInitialized(true);
        return;
      }

      // 3. Check hostname
      const hostname = window.location.hostname;
      const isIC = hostname.includes("innercircle.in") || hostname.includes("innercircle");
      const targetMode: Mode = isIC ? "inner-circle" : "agency";
      if (targetMode !== mode) {
        setMode(targetMode);
      }
      sessionStorage.setItem("site-mode", targetMode);
    }
    setIsInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateMode = (newMode: Mode) => {
    setMode(newMode);
    sessionStorage.setItem("site-mode", newMode);
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
