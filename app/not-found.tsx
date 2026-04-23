'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F3D7A7]/5 blur-[120px] rounded-full z-0" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#F3D7A7] text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">
            Error 404
          </span>
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter uppercase mb-6 leading-none">
            System <br /> Disruption.
          </h1>
          <p className="text-white/50 text-sm md:text-base max-w-md mx-auto mb-12 uppercase tracking-widest leading-relaxed">
            The coordinates you provided do not exist in our current database. 
            The path has been logged for analysis.
          </p>

          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-black text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#F3D7A7] transition-colors"
            >
              Reboot Connection
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 w-24 h-[1px] bg-white/10" />
      <div className="absolute bottom-10 left-10 w-[1px] h-24 bg-white/10" />
      <div className="absolute top-10 right-10 w-24 h-[1px] bg-white/10" />
      <div className="absolute top-10 right-10 w-[1px] h-24 bg-white/10" />
      
      <div className="absolute top-1/2 left-10 -translate-y-1/2 space-y-4 opacity-20 hidden md:block">
        <div className="w-1 h-1 bg-white rounded-full" />
        <div className="w-1 h-1 bg-white rounded-full" />
        <div className="w-1 h-1 bg-white rounded-full" />
      </div>
    </div>
  );
}
