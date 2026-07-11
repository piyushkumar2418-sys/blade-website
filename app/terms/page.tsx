import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service and eligibility requirements for Blade Media and the Inner Circle.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#F3D7A7] selection:text-black font-sans selection:bg-opacity-30">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-40">
        <Link href="/" className="inline-block mb-12 text-xs uppercase tracking-[0.4em] text-white/40 hover:text-[#F3D7A7] transition-colors">
          ← Return to Archive
        </Link>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-12 tracking-tighter">Terms of Service.</h1>
        
        <div className="space-y-12 text-sm md:text-base leading-relaxed text-white/60">
          <section>
            <h2 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">01. SERVICES</h2>
            <p>
              Blade Media provides high-ticket content production, video post-production, and strategic growth campaigns. Services are defined by individual client agreements and Statement of Work (SOW) documents.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">02. INTELLECTUAL PROPERTY</h2>
            <p>
              The Blade Media logo, brand assets, site architecture, design elements, and all marketing methodologies on this platform are the sole property of Blade Media. Unauthorized reproduction is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">03. CLIENT ENGAGEMENT</h2>
            <p>
              Pricing and payment schedules are specified in individual client service contracts. Since creative and editing resources are reserved immediately upon contract signing, all fees are non-refundable unless agreed otherwise.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">04. LIMITATION OF LIABILITY</h2>
            <p>
              Blade Media is not liable for any direct, indirect, or consequential damages resulting from the use of this website, information, or client engagement systems.
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
