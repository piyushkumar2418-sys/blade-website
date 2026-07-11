import type { Metadata } from "next";
import CurriculumClient from "./CurriculumClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Step-By-Step Curriculum",
  description: "Explore the systematic curriculum designed for elite creators and agency builders. Master retention video editing, cold outreach, and client operations.",
  alternates: {
    canonical: "/curriculum",
  },
  keywords: ["Video Editing Course", "Blade Media Curriculum", "Creator Cohort", "Outreach Systems", "Retention Editing"],
};

export default function CurriculumPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Blade Inner Circle Curriculum",
    "description": "High-velocity cohort training and agency building systems for elite content creators and video editors.",
    "provider": {
      "@type": "Organization",
      "name": "Blade Media",
      "sameAs": "https://blademedia.in"
    },
    "courseCode": "BIC-01",
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Online",
      "startDate": "2026-08-29",
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Suspense fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-black/5 border-t-black rounded-full animate-spin" />
        </div>
      }>
        <CurriculumClient />
      </Suspense>
    </>
  );
}
