import React, { useState } from 'react';
import { RiskEvent } from '../../types';
import { ShieldAlert, AlertTriangle, ArrowRight, X } from 'lucide-react';

interface RiskMatrixProps {
  events: RiskEvent[];
  onSelectEvent?: (event: RiskEvent) => void;
}

export const RiskMatrix: React.FC<RiskMatrixProps> = ({ events, onSelectEvent }) => {
  const [selectedEvent, setSelectedEvent] = useState<RiskEvent | null>(events[0] || null);

  const getCoordinates = (impact: 'LOW' | 'MEDIUM' | 'HIGH', prob: 'LOW' | 'MEDIUM' | 'HIGH') => {
    // 3x3 grid coordinates
    const probX = prob === 'LOW' ? 20 : prob === 'MEDIUM' ? 50 : 80;
    const impactY = impact === 'HIGH' ? 20 : impact === 'MEDIUM' ? 50 : 80;
    return { x: probX, y: impactY };
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Supplier':
        return '#D4774C';
      case 'Cost':
        return '#C95C5C';
      case 'Delivery':
        return '#D6A45D';
      case 'Quality':
        return '#B8A06A';
      case 'Dependency':
        return '#E28E67';
      default:
        return '#8FAF78';
    }
  };

  return (
    <div className="bg-[#211B24] border border-[#3D3342] rounded-lg p-5 shadow-panel">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-[#3D3342]/70 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="kpi-label text-[#B8A06A] font-mono tracking-widest font-semibold text-xs">
              RISK TOPOLOGY // PROBABILITY × IMPACT MATRIX
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#C95C5C]/20 text-[#E68585] border border-[#C95C5C]/30">
              {events.length} ACTIVE THREATS
            </span>
          </div>
          <p className="text-xs text-[#A99EAA] mt-0.5">
            Plotting exposure across Supplier, Delivery, Cost, Quality, Dependency, and Compliance dimensions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-[#A99EAA]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#C95C5C]" /> Critical Threat (High/High)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#D4774C]" /> Strategic Threat
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#D6A45D]" /> Moderate Threat
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Matrix Canvas (col 7) */}
        <div className="lg:col-span-7 bg-[#17131A] border border-[#3D3342] rounded-lg p-4 relative min-h-[360px] flex flex-col justify-between select-none">
          {/* Top Label: Impact Axis */}
          <div className="flex justify-between items-center text-[10px] font-mono text-[#A99EAA] border-b border-[#3D3342]/40 pb-1">
            <span className="text-[#C95C5C] font-bold">▲ IMPACT: HIGH</span>
            <span className="text-[#7C727D]">CRITICAL ZONE</span>
          </div>

          {/* Matrix Grid Lines */}
          <div className="relative w-full h-[270px] my-2">
            {/* Background 9-zone subtle gradients */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1">
              <div className="bg-[#241D27]/40 rounded" />
              <div className="bg-[#2A2027]/50 rounded" />
              <div className="bg-[#331C22]/60 rounded border border-[#C95C5C]/30" />

              <div className="bg-[#1F1A23]/30 rounded" />
              <div className="bg-[#241D27]/40 rounded" />
              <div className="bg-[#2A2027]/50 rounded" />

              <div className="bg-[#1A151D]/20 rounded" />
              <div className="bg-[#1F1A23]/30 rounded" />
              <div className="bg-[#241D27]/40 rounded" />
            </div>

            {/* Plotted Threat Nodes */}
            {events.map((evt, idx) => {
              const coords = getCoordinates(evt.impact, evt.probability);
              // deterministic jitter so overlapping dots don't hide each other
              const jitterX = (idx % 2 === 0 ? 3 : -3) * (idx + 1);
              const jitterY = (idx % 3 === 0 ? 4 : -4);
              const isSelected = selectedEvent?.id === evt.id;
              const nodeColor = getCategoryColor(evt.category);

              return (
                <div
                  key={evt.id}
                  onClick={() => {
                    setSelectedEvent(evt);
                    if (onSelectEvent) onSelectEvent(evt);
                  }}
                  className="absolute cursor-pointer transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{
                    left: `${Math.max(10, Math.min(90, coords.x + jitterX))}%`,
                    top: `${Math.max(12, Math.min(88, coords.y + jitterY))}%`,
                  }}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Ring highlight for selected */}
                    {isSelected && (
                      <div
                        className="absolute w-8 h-8 rounded-full border-2 animate-ping opacity-60"
                        style={{ borderColor: nodeColor }}
                      />
                    )}

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold text-[#F3EBDD] border shadow-lg transition-transform group-hover:scale-125 ${
                        isSelected ? 'scale-125 ring-2 ring-[#F3EBDD]' : ''
                      }`}
                      style={{
                        backgroundColor: '#211B24',
                        borderColor: nodeColor,
                        color: nodeColor,
                      }}
                    >
                      {idx + 1}
                    </div>
                  </div>

                  {/* Label tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 whitespace-nowrap bg-[#241D27] border border-[#3D3342] text-[10px] font-sans px-2 py-0.5 rounded shadow pointer-events-none z-20 text-[#F3EBDD]">
                    {evt.title}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Label: Probability Axis */}
          <div className="flex justify-between items-center text-[10px] font-mono text-[#A99EAA] border-t border-[#3D3342]/40 pt-1">
            <span>LOW</span>
            <span className="text-[#B8A06A] font-bold">PROBABILITY: LOW → HIGH ▶</span>
            <span>HIGH</span>
          </div>
        </div>

        {/* Selected Event Details Panel (col 5) */}
        <div className="lg:col-span-5 bg-[#1A141D] border border-[#3D3342] rounded-lg p-4 space-y-3">
          {selectedEvent ? (
            <>
              <div className="flex items-center justify-between pb-2 border-b border-[#3D3342]/70">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#D4774C] font-semibold">
                  THREAT DOSSIER // {selectedEvent.category.toUpperCase()}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#C95C5C]/20 text-[#E68585] font-bold">
                  {selectedEvent.impact} IMPACT / {selectedEvent.probability} PROB
                </span>
              </div>

              <div>
                <h4 className="font-editorial text-sm font-bold text-[#F3EBDD] leading-snug">
                  {selectedEvent.title}
                </h4>
                <div className="text-[11px] text-[#A99EAA] font-mono mt-1">
                  Financial Exposure: <span className="text-[#C95C5C] font-bold">₹{selectedEvent.financialExposureCr} Cr</span> • Logged: {selectedEvent.timestamp}
                </div>
              </div>

              <div className="text-xs text-[#E5DCDE] bg-[#211B24] p-2.5 rounded border border-[#3D3342]/60 font-sans leading-relaxed">
                {selectedEvent.description}
              </div>

              {/* Why it Matters */}
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-[#D6A45D] font-bold uppercase tracking-wider">
                  Why It Matters
                </div>
                <div className="text-xs text-[#A99EAA] font-sans">
                  {selectedEvent.whyItMatters}
                </div>
              </div>

              {/* Recommended Action */}
              <div className="space-y-1 bg-[#261B21] border border-[#D4774C]/30 p-2.5 rounded">
                <div className="text-[10px] font-mono text-[#D4774C] font-bold uppercase tracking-wider">
                  Recommended Action
                </div>
                <div className="text-xs text-[#F3EBDD] font-sans">
                  {selectedEvent.recommendedAction}
                </div>
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-xs text-[#A99EAA]">
              Select any numbered risk node from the matrix to inspect threat intelligence.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
