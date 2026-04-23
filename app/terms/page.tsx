import React from 'react';
import Link from 'next/link';

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
            <h2 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">01. ELIGIBILITY</h2>
            <p>
              By applying to the Inner Circle, you affirm that you are an elite builder committed to professional growth. We reserve the right to deny admission based on internal vetting protocols.
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">02. INTELLECTUAL PROPERTY</h2>
            <p>
              The Blade Media logo, the "Inner Circle" curriculum, and all architectural designs on this platform are the sole property of Blade Media. Unauthorized reproduction is strictly prohibited.
            </p>
          </section>

          <section>
            <section>
              <h2 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">03. ADMISSION PROTOCOL</h2>
              <p>
                Submission of an application does not guarantee entry. The selection process is subjective and governed by our internal architects to ensure cohort quality.
              </p>
            </section>
          </section>

          <section>
            <h2 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">04. LIMITATION OF LIABILITY</h2>
            <p>
              Blade Media is not liable for any direct or indirect consequences arising from the use of this platform or the application process.
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
