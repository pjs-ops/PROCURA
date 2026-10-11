import React, { useState } from 'react';
import { Supplier, RiskLevel } from '../../types';
import { ShieldAlert, AlertTriangle, CheckCircle, ExternalLink, Filter } from 'lucide-react';

interface SupplierConstellationProps {
  suppliers: Supplier[];
  onSelectSupplier: (supplierId: string) => void;
  selectedSupplierId?: string;
}

export const SupplierConstellation: React.FC<SupplierConstellationProps> = ({
  suppliers,
  onSelectSupplier,
  selectedSupplierId,
}) => {
  const [filter, setFilter] = useState<string>('All');
  const [hoveredSupplier, setHoveredSupplier] = useState<Supplier | null>(null);

  const filterOptions = ['All', 'Strategic', 'At Risk', 'High Risk', 'Medium Risk', 'Low Risk'];

  const filteredSuppliers = suppliers.filter((s) => {
    if (filter === 'All') return true;
    if (filter === 'Strategic') return s.tier === 'Strategic';
    if (filter === 'At Risk') return s.tier === 'At Risk' || s.riskLevel === 'CRITICAL' || s.riskLevel === 'HIGH';
    if (filter === 'High Risk') return s.riskLevel === 'HIGH' || s.riskLevel === 'CRITICAL';
    if (filter === 'Medium Risk') return s.riskLevel === 'MEDIUM';
    if (filter === 'Low Risk') return s.riskLevel === 'LOW';
    return true;
  });

  // Color mapping based on risk level
  const getNodeColor = (risk: RiskLevel) => {
    switch (risk) {
      case 'CRITICAL':
        return '#C95C5C';
      case 'HIGH':
        return '#D4774C';
      case 'MEDIUM':
        return '#D6A45D';
      case 'LOW':
        return '#8FAF78';
      default:
        return '#B8A06A';
    }
  };

  // Coordinates algorithm to position nodes organically in a 700x420 viewport
  // Concentric / cluster orbits based on category and spend volume
  const getNodeCoordinates = (index: number, total: number, spend: number, category: string) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    // Radius modulated by spend: high spend closer to strategic center
    const baseRadius = 160 - Math.min(spend * 20, 80);
    // Add deterministic category offset to group similar suppliers
    const catOffset = (category.charCodeAt(0) % 5) * 12;
    const r = baseRadius + catOffset;
    const cx = 350 + r * Math.cos(angle);
    const cy = 210 + (r * 0.75) * Math.sin(angle);
    return { cx, cy };
  };

  return (
    <div className="bg-[#211B24] border border-[#3D3342] rounded-lg p-5 shadow-panel relative">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-[#3D3342]/70 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="kpi-label text-[#B8A06A] font-mono tracking-widest font-semibold text-xs">
              TOPOLOGY // SUPPLIER CONSTELLATION
            </span>
            <span className="text-[10px] font-mono text-[#A99EAA]">
              Node Size: Spend Volume | Hue: Risk Intensity
            </span>
          </div>
          <p className="text-xs text-[#A99EAA] mt-0.5">
            Interactive multi-vector cluster graph representing enterprise vendor exposure, dependency orbits, and health scores.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#17131A] p-1 rounded border border-[#3D3342]/80">
          <Filter size={12} className="text-[#A99EAA] ml-1 mr-0.5" />
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className={`px-2.5 py-1 text-[10px] font-mono rounded transition-all ${
                filter === opt
                  ? 'bg-[#2A222D] text-[#F3EBDD] font-bold border border-[#D4774C]/50 shadow-sm'
                  : 'text-[#A99EAA] hover:text-[#F3EBDD]'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive SVG Constellation Canvas */}
      <div className="relative w-full h-[430px] bg-[#161219] rounded border border-[#3D3342]/60 overflow-hidden flex items-center justify-center">
        <svg viewBox="0 0 700 420" className="w-full h-full select-none">
          <defs>
            {/* Center Core Gradient */}
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#D4774C" stop-opacity="0.3" />
              <stop offset="100%" stop-color="#161219" stop-opacity="0" />
            </radialGradient>
            {/* Filter Drop Shadows */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Ambient Glow */}
          <circle cx="350" cy="210" r="180" fill="url(#centerGlow)" />

          {/* Orbital Reference Rings */}
          <circle cx="350" cy="210" r="60" fill="none" stroke="#3D3342" stroke-width="1" stroke-dasharray="3 3" opacity="0.4" />
          <circle cx="350" cy="210" r="120" fill="none" stroke="#3D3342" stroke-width="1" stroke-dasharray="4 4" opacity="0.5" />
          <circle cx="350" cy="210" r="180" fill="none" stroke="#3D3342" stroke-width="1" opacity="0.3" />

          {/* Center Focal Point: Procurement Core */}
          <circle cx="350" cy="210" r="12" fill="#211B24" stroke="#B8A06A" stroke-width="2" />
          <circle cx="350" cy="210" r="4" fill="#D4774C" />
          <text x="350" y="235" text-anchor="middle" fill="#A99EAA" font-size="9" font-family="JetBrains Mono">
            PROCURA CORE
          </text>

          {/* Connectors from Center to Top Strategic Vendors */}
          {filteredSuppliers.slice(0, 5).map((s, idx) => {
            const coords = getNodeCoordinates(idx, filteredSuppliers.length, s.spendValueCr, s.category);
            return (
              <line
                key={`line-${s.id}`}
                x1="350"
                y1="210"
                x2={coords.cx}
                y2={coords.cy}
                stroke={getNodeColor(s.riskLevel)}
                stroke-width={s.spendValueCr > 2 ? 1.5 : 0.8}
                stroke-dasharray={s.riskLevel === 'HIGH' || s.riskLevel === 'CRITICAL' ? '4 2' : undefined}
                opacity={0.35}
              />
            );
          })}

          {/* Render Constellation Nodes */}
          {filteredSuppliers.map((s, idx) => {
            const coords = getNodeCoordinates(idx, filteredSuppliers.length, s.spendValueCr, s.category);
            const radius = Math.max(9, Math.min(26, 8 + s.spendValueCr * 4.5));
            const isSelected = selectedSupplierId === s.id;
            const isHovered = hoveredSupplier?.id === s.id;
            const nodeColor = getNodeColor(s.riskLevel);

            return (
              <g
                key={s.id}
                className="cursor-pointer transition-transform duration-200"
                onClick={() => onSelectSupplier(s.id)}
                onMouseEnter={() => setHoveredSupplier(s)}
                onMouseLeave={() => setHoveredSupplier(null)}
              >
                {/* Outer Glow Halo for Selected or High-Risk */}
                {(isSelected || isHovered || s.riskLevel === 'CRITICAL') && (
                  <circle
                    cx={coords.cx}
                    cy={coords.cy}
                    r={radius + 6}
                    fill="none"
                    stroke={nodeColor}
                    stroke-width="2"
                    stroke-dasharray={s.riskLevel === 'CRITICAL' ? '3 2' : undefined}
                    opacity={0.8}
                    className={s.riskLevel === 'CRITICAL' ? 'animate-pulse' : ''}
                  />
                )}

                {/* Primary Supplier Body Node */}
                <circle
                  cx={coords.cx}
                  cy={coords.cy}
                  r={radius}
                  fill="#211B24"
                  stroke={nodeColor}
                  stroke-width={isSelected ? 3 : 2}
                  filter="url(#glow)"
                />

                {/* Inner core dot */}
                <circle
                  cx={coords.cx}
                  cy={coords.cy}
                  r={radius * 0.4}
                  fill={nodeColor}
                  opacity={0.85}
                />

                {/* Node Label (shown for key suppliers or when hovered) */}
                {(s.spendValueCr > 1.2 || isHovered || isSelected) && (
                  <text
                    x={coords.cx}
                    y={coords.cy + radius + 11}
                    text-anchor="middle"
                    fill={isSelected ? '#F3EBDD' : '#D1C6BD'}
                    font-size="9"
                    font-family="Plus Jakarta Sans"
                    font-weight="600"
                  >
                    {s.name.split(' ')[0]}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Float Hover Card */}
        {hoveredSupplier && (
          <div className="absolute bottom-4 right-4 bg-[#241D27]/95 border border-[#B8A06A]/60 rounded-md p-3.5 shadow-2xl backdrop-blur-md max-w-xs pointer-events-none animate-fade-in text-xs z-10">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-editorial font-bold text-sm text-[#F3EBDD]">
                {hoveredSupplier.name}
              </span>
              <span
                className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: `${getNodeColor(hoveredSupplier.riskLevel)}25`,
                  color: getNodeColor(hoveredSupplier.riskLevel)
                }}
              >
                {hoveredSupplier.riskLevel} RISK
              </span>
            </div>
            <div className="text-[10px] text-[#A99EAA] font-mono mb-2">
              {hoveredSupplier.category} • Tier: {hoveredSupplier.tier}
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-[#3D3342]/60 pt-2 font-mono text-[11px]">
              <div>
                <span className="text-[#A99EAA] block text-[9px]">TOTAL SPEND</span>
                <span className="text-[#F3EBDD] font-bold">₹{hoveredSupplier.spendValueCr} Cr ({hoveredSupplier.spendPercentage}%)</span>
              </div>
              <div>
                <span className="text-[#A99EAA] block text-[9px]">HEALTH SCORE</span>
                <span className="text-[#B8A06A] font-bold">{hoveredSupplier.healthScore}/100</span>
              </div>
              <div>
                <span className="text-[#A99EAA] block text-[9px]">DELIVERY OTIF</span>
                <span className={hoveredSupplier.metrics.delivery < 75 ? 'text-[#C95C5C]' : 'text-[#8FAF78]'}>
                  {hoveredSupplier.metrics.delivery}%
                </span>
              </div>
              <div>
                <span className="text-[#A99EAA] block text-[9px]">EXPIRY</span>
                <span className="text-[#D4774C]">{hoveredSupplier.contractExpiryDate}</span>
              </div>
            </div>

            <div className="mt-2 text-[9px] text-[#B8A06A] italic">
              Click node to open complete Supplier DNA & dossier →
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
