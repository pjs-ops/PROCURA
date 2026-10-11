import React from 'react';
import { RiskLevel, POStatus, ContractStatus } from '../../types';

interface StatusBadgeProps {
  type: 'risk' | 'po' | 'contract' | 'custom';
  value: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ type, value, className = '' }) => {
  let badgeStyle = 'bg-[#2A222D] text-[#A99EAA] border-[#3D3342]';

  if (type === 'risk') {
    const risk = value as RiskLevel;
    switch (risk) {
      case 'CRITICAL':
        badgeStyle = 'bg-[#C95C5C]/15 text-[#E68585] border-[#C95C5C]/50 animate-pulse';
        break;
      case 'HIGH':
        badgeStyle = 'bg-[#C95C5C]/15 text-[#E68585] border-[#C95C5C]/40';
        break;
      case 'MEDIUM':
        badgeStyle = 'bg-[#D6A45D]/15 text-[#E5BF88] border-[#D6A45D]/40';
        break;
      case 'LOW':
        badgeStyle = 'bg-[#8FAF78]/15 text-[#A8C992] border-[#8FAF78]/40';
        break;
    }
  } else if (type === 'po') {
    const status = value as POStatus;
    switch (status) {
      case 'ON_TRACK':
        badgeStyle = 'bg-[#8FAF78]/15 text-[#A8C992] border-[#8FAF78]/40';
        break;
      case 'AT_RISK':
        badgeStyle = 'bg-[#D6A45D]/15 text-[#E5BF88] border-[#D6A45D]/40';
        break;
      case 'DELAYED':
        badgeStyle = 'bg-[#C95C5C]/15 text-[#E68585] border-[#C95C5C]/40';
        break;
      case 'DELIVERED':
        badgeStyle = 'bg-[#2A222D] text-[#B8A06A] border-[#B8A06A]/40';
        break;
      default:
        badgeStyle = 'bg-[#2A222D] text-[#A99EAA] border-[#3D3342]';
    }
  } else if (type === 'contract') {
    const status = value as ContractStatus;
    switch (status) {
      case 'ACTIVE':
        badgeStyle = 'bg-[#8FAF78]/15 text-[#A8C992] border-[#8FAF78]/40';
        break;
      case 'EXPIRING_SOON':
        badgeStyle = 'bg-[#D4774C]/20 text-[#E28E67] border-[#D4774C]/50 font-bold';
        break;
      case 'AT_RISK':
        badgeStyle = 'bg-[#C95C5C]/15 text-[#E68585] border-[#C95C5C]/40';
        break;
      case 'UNDER_REVIEW':
        badgeStyle = 'bg-[#D6A45D]/15 text-[#E5BF88] border-[#D6A45D]/40';
        break;
      default:
        badgeStyle = 'bg-[#2A222D] text-[#A99EAA] border-[#3D3342]';
    }
  }

  // Format label: ON_TRACK -> ON TRACK
  const formattedText = value.replace(/_/g, ' ');

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase border font-medium ${badgeStyle} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-80" />
      {formattedText}
    </span>
  );
};
