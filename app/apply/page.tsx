"use client";

import Link from "next/link";
import { ArrowRight, ShieldAlert, CheckCircle2, XCircle } from "lucide-react";
import { useEffect } from "react";
import { useSite } from "@/context/SiteContext";

export default function ApplyPage() {
  const { setMode } = useSite();

  useEffect(() => {
    setMode("inner-circle");
  }, [setMode]);
  return (
    <div className="min-h-screen w-full bg-white text-black flex flex-col" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
      {/* Header */}
      <header className="border-b border-black p-6 md:p-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-2">Admissions</h1>
          <p className="text-lg md:text-xl font-normal text-neutral-600">The Inner Circle Gatekeeper</p>
        </div>
        <div className="hidden md:block text-right">
          <div className="text-sm font-bold uppercase border-b border-black pb-1 mb-2">System Status</div>
          <div className="text-xl font-bold flex items-center gap-2 justify-end text-green-600">
            <CheckCircle2 className="w-5 h-5" /> Accepting Applications
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 bg-black gap-[1px]">
        
        {/* Left Column - Filter Text */}
        <div className="bg-white p-6 md:p-12 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 border border-black px-4 py-2 mb-8 self-start font-bold uppercase text-sm bg-black text-white">
            <ShieldAlert className="w-4 h-4" /> Clearance Required
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-8 pb-4 border-b border-black">
            Who is this built for?
          </h2>
          
          <div className="space-y-8">
            <div className="flex gap-4 items-start">
              <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold uppercase text-lg mb-2">Elite Operators & Founders</h3>
                <p className="text-neutral-600">Those who are actively scaling high-leverage systems, businesses, and digital ecosystems. This is not for beginners.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <CheckCircle2 className="w-6 h-6 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold uppercase text-lg mb-2">Systems Thinkers</h3>
                <p className="text-neutral-600">Architects who understand that true scale comes from infrastructure, automation, and compounding leverage.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start text-neutral-400">
              <XCircle className="w-6 h-6 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold uppercase text-lg mb-2 line-through">Tourists & Spectators</h3>
                <p className="">If you are looking for quick hacks or basic tutorials, access will be denied. The ledger requires operational proof of work.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Gatekeeper Actions */}
        <div className="bg-white p-6 md:p-12 flex flex-col justify-center items-center relative overflow-hidden">
          {/* Institutional Grid pattern background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
          />

          <div className="w-full max-w-md border border-black bg-white relative z-10 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-bold uppercase mb-2 text-center">Authentication</h2>
            <p className="text-center text-neutral-600 mb-8 text-sm">Select your entry vector.</p>

            <div className="flex flex-col gap-4">
              <Link 
                href="/apply/login" 
                className="w-full border border-black p-4 flex justify-between items-center group hover:bg-black hover:text-white transition-all"
              >
                <span className="font-bold uppercase">Login</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/apply/register" 
                className="w-full border border-black bg-black text-white p-4 flex justify-between items-center group hover:bg-neutral-800 transition-all"
              >
                <span className="font-bold uppercase">Start Application</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-black p-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm font-bold uppercase">
        <div>Blade Media Inc. &copy; {new Date().getFullYear()}</div>
        <div>Strictly Confidential</div>
      </footer>
    </div>
  );
}
