import type { Metadata } from "next";
import { Suspense } from "react";
import CohortRegisterPageClient from "./CohortRegisterPageClient";

export const metadata: Metadata = {
  title: "Admission Portfolio",
  description: "Apply for cohort admission at Blade Media's Inner Circle. High-velocity cohort training and agency building systems for elite content creators.",
  alternates: {
    canonical: "/apply/register",
  },
  keywords: ["Blade Media Register", "Apply to Inner Circle", "Creator Cohort", "Video Editing Training", "Agency Building Cohort"],
};

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white text-black flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-6 h-6 border-2 border-black/10 border-t-black rounded-full animate-spin" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-black/40">Loading admission portal...</span>
        </div>
      </div>
    }>
      <CohortRegisterPageClient />
    </Suspense>
  );
}

