import type { Metadata } from "next";
import HybridLoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Candidate Login & Registration",
  description: "Sign in to your candidate account or register for admission into Blade Media's Inner Circle program.",
  alternates: {
    canonical: "/apply/login",
  },
  keywords: ["Candidate Sign In", "Blade Media Login", "Apply Gatekeeper", "Inner Circle Login"],
};

export default function LoginPage() {
  return <HybridLoginClient />;
}