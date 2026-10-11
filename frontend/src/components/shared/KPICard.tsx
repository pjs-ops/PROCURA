import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaDirection?: 'up' | 'down' | 'neutral';
  isPositiveDelta?: boolean;
  subtext?: string;
  icon?: LucideIcon;
  accent?: 'copper' | 'gold' | 'default' | 'critical' | 'success';
  className?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  label,
  value,
  delta,
  deltaDirection = 'neutral',
  isPositiveDelta = true,
  subtext,
  icon: Icon,
  accent = 'default',
  className = '',
}) => {
  const getAccentBorder = () => {
    switch (accent) {
      case 'copper':
        return 'border-l-2 border-l-[#D4774C] hover:border-[#D4774C]/60';
      case 'gold':
        return 'border-l-2 border-l-[#B8A06A] hover:border-[#B8A06A]/60';
      case 'critical':
        return 'border-l-2 border-l-[#C95C5C] hover:border-[#C95C5C]/60';
      case 'success':
        return 'border-l-2 border-l-[#8FAF78] hover:border-[#8FAF78]/60';
      default:
        return 'border-l-2 border-l-[#3D3342] hover:border-[#D4774C]/40';
    }
  };

  return (
    <div
      className={`relative bg-[#211B24] border border-[#3D3342]/70 rounded-md p-4 transition-all duration-200 group hover:bg-[#261F2a] ${getAccentBorder()} ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="kpi-label text-[#A99EAA] font-mono tracking-wider text-[11px] font-semibold">
          {label}
        </span>
        {Icon && (
          <div className="p-1.5 rounded bg-[#2A222D] text-[#B8A06A] group-hover:text-[#D4774C] transition-colors">
            <Icon size={14} />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="font-editorial text-2xl md:text-3xl font-bold text-[#F3EBDD] tracking-tight">
          {value}
        </span>
        {delta && (
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-mono font-medium ${
              isPositiveDelta ? 'text-[#8FAF78]' : 'text-[#C95C5C]'
            }`}
          >
            {deltaDirection === 'up' && <TrendingUp size={12} />}
            {deltaDirection === 'down' && <TrendingDown size={12} />}
            {deltaDirection === 'neutral' && <Minus size={12} />}
            {delta}
          </span>
        )}
      </div>

      {subtext && (
        <div className="mt-1 text-[11px] text-[#A99EAA] font-sans truncate">
          {subtext}
        </div>
      )}
    </div>
  );
};
