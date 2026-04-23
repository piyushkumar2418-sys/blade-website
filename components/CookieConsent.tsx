'use client';

import React, { useState, useEffect } from 'react';

/**
 * Minimalist Cookie Consent Banner
 * Non-intrusive, glassmorphism design.
 */
export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('blade_cookie_consent');
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('blade_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[100] flex justify-center pointer-events-none">
      <div className="w-full max-w-xl p-4 md:p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto shadow-2xl">
        <div className="text-xs md:text-sm text-white/60 text-center md:text-left leading-relaxed">
          Our architects use cookies to optimize the archive experience. By continuing, you agree to our <a href="/privacy" className="text-[#F3D7A7] hover:underline">Privacy Protocol</a>.
        </div>
        <button 
          onClick={handleAccept}
          className="px-8 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#F3D7A7] transition-all whitespace-nowrap active:scale-95"
        >
          Acknowledge
        </button>
      </div>
    </div>
  );
}
