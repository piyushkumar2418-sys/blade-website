import type { Metadata } from "next";
import ApplyClient from "./ApplyClient";

export const metadata: Metadata = {
  title: "Admissions Gatekeeper",
  description: "Checking admissions access and status for the Blade Media Inner Circle.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ApplyGatekeeperPage() {
  return <ApplyClient />;
}
