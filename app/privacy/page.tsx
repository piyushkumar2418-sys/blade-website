import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#F3D7A7] selection:text-black font-sans selection:bg-opacity-30">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-40">
        <Link href="/" className="inline-block mb-12 text-xs uppercase tracking-[0.4em] text-white/40 hover:text-[#F3D7A7] transition-colors">
          ← Return to Archive
        </Link>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-12 tracking-tighter">Privacy Policy.</h1>
        
        <div className="space-y-12 text-sm md:text-base leading-relaxed text-white/60">
          <section>
            <h2 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">01. DATA COLLECTION</h2>
            <p>
              Blade Media collects minimal identifying information necessary to process your application for the Inner Circle. This includes your name, email, and professional links. We do not sell your data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">02. USE OF INFORMATION</h2>
            <p>
              Information provided is used solely for vetting purposes and to communicate the status of your admission. Your data is stored securely in our encrypted institutional archives.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">03. TRACKING</h2>
            <p>
              We use minimalist tracking to understand site performance and ensure a seamless experience for our applicants. This data is anonymized and used for architectural optimization only.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">04. CONTACT</h2>
            <p>
              For inquiries regarding your data or to request its removal from our systems, contact our architects directly via the official Blade Media channels.
            </p>
          </section>
        </div>

        <div className="mt-24 pt-12 border-t border-white/10 text-[10px] uppercase tracking-widest text-white/20">
          Last Updated // April 2026
        </div>
      </div>
    </div>
  );
}
