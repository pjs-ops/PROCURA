import React from 'react';

interface TechDividerProps {
  label?: string;
  tag?: string;
  className?: string;
}

export const TechDivider: React.FC<TechDividerProps> = ({ label, tag, className = '' }) => {
  return (
    <div className={`relative flex items-center justify-between my-4 ${className}`}>
      <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-[#3D3342] to-[#3D3342]/40" />
      {(label || tag) && (
        <div className="mx-3 flex items-center gap-2">
          {label && (
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#B8A06A] font-medium">
              {label}
            </span>
          )}
          {tag && (
            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#2A222D] text-[#A99EAA] border border-[#3D3342]/80">
              {tag}
            </span>
          )}
        </div>
      )}
      <div className="flex-grow h-[1px] bg-gradient-to-r from-[#3D3342]/40 via-[#3D3342] to-transparent" />
    </div>
  );
};
