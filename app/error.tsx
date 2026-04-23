'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { logSystemError } from '@/lib/logging';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error for analysis
    logSystemError(error, 'Global Error Boundary');
    console.error('System Crash caught by Error Boundary:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full z-0" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-red-500 text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">
            Critical Failure
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter uppercase mb-6 leading-none">
            Kernel <br /> Exception.
          </h1>
          <p className="text-white/50 text-sm md:text-base max-w-md mx-auto mb-12 uppercase tracking-widest leading-relaxed">
            An unexpected breach in the system core has occurred. 
            Automated repair protocols are standing by.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => reset()}
              className="px-8 py-4 bg-red-600 text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-red-500 transition-colors"
            >
              Attempt Hotfix
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/'}
              className="px-8 py-4 bg-transparent border border-white/20 text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white/10 transition-colors"
            >
              Full Reset
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Technical data overlay */}
      <div className="absolute top-10 left-10 opacity-10 text-[8px] text-white font-mono text-left hidden md:block">
        <p>ERROR_ID: {error.digest || 'UNKNOWN'}</p>
        <p>TIMESTAMP: {new Date().toISOString()}</p>
        <p>STATUS: EXCEPTION_CAUGHT</p>
      </div>
    </div>
  );
}
