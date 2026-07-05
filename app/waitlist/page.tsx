"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WaitlistRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/apply/register");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center font-mono rounded-none">
      <div className="flex flex-col items-center gap-4">
        <div className="w-6 h-6 border border-[#F3D7A7]/20 border-t-[#F3D7A7] animate-spin" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#F3D7A7]/60">Redirecting to active registration...</span>
      </div>
    </div>
  );
}
