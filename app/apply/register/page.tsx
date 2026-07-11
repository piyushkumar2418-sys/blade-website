import type { Metadata } from "next";
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
  return <CohortRegisterPageClient />;
}
