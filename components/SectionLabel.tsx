import React from "react";

const SectionLabel = ({ children, light = false, gold = false }: { children: React.ReactNode, light?: boolean, gold?: boolean }) => (
  <div className="flex items-center gap-4 mb-8 text-left">
    <div className={`h-[1px] w-8 ${gold ? 'bg-[#F3D7A7]' : light ? 'bg-white/20' : 'bg-black/20'}`} />
    <span className={`text-[10px] font-bold uppercase tracking-[0.4em] ${gold ? 'text-[#F3D7A7]' : light ? 'text-white/40' : 'text-black/40'}`}>{children}</span>
  </div>
);

export default SectionLabel;
