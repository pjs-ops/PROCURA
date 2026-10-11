import React from 'react';
import { ArrowDownRight, AlertOctagon, Sparkles, TrendingDown, ShieldAlert } from 'lucide-react';

interface LeakageWaterfallProps {
  onOpenSavingsLab?: () => void;
}

export const LeakageWaterfall: React.FC<LeakageWaterfallProps> = ({ onOpenSavingsLab }) => {
  const leakageItems = [
    { title: 'Contract Expiry Off-Tariff', amountCr: 0.74, amountLakhs: 74, pct: '28.5%', color: '#D4774C', cause: 'MSA expired; spot purchase delta' },
    { title: 'Price Variance Above Index', amountCr: 0.68, amountLakhs: 68, pct: '26.1%', color: '#C95C5C', cause: 'Steel & CNC unindexed surcharges' },
    { title: 'Supplier Duplication Margin', amountCr: 0.48, amountLakhs: 48, pct: '18.5%', color: '#D6A45D', cause: 'Fasteners split across 3 vendors' },
    { title: 'Maverick Non-Catalog Requisitions', amountCr: 0.42, amountLakhs: 42, pct: '16.2%', color: '#B8A06A', cause: 'Off-catalog MRO & packaging orders' },
    { title: 'Expedited Maritime/Air Freight', amountCr: 0.28, amountLakhs: 28, pct: '10.7%', color: '#8FAF78', cause: 'Emergency Red Sea transit buffers' },
  ];

  return (
    <div className="bg-[#211B24] border border-[#3D3342] rounded-lg p-5 shadow-panel">
      {/* Title & Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-[#3D3342]/70 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="kpi-label text-[#B8A06A] font-mono tracking-widest font-semibold text-xs">
              SIGNATURE ARCHITECTURE // PROCUREMENT LEAKAGE MAP
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#C95C5C]/15 text-[#E68585] border border-[#C95C5C]/30">
              ₹2.60 Cr ADDRESSABLE
            </span>
          </div>
          <p className="text-xs text-[#A99EAA] mt-0.5">
            Deconstruction of gross capital outflow into validated value-add spend versus recoverable transaction leakage.
          </p>
        </div>

        {onOpenSavingsLab && (
          <button
            onClick={onOpenSavingsLab}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#D4774C]/20 border border-[#D4774C]/40 text-[#F3EBDD] hover:bg-[#D4774C]/30 text-xs font-mono font-medium transition-colors"
          >
            <Sparkles size={13} className="text-[#D4774C]" />
            <span>Launch Savings Lab →</span>
          </button>
        )}
      </div>

      {/* Top Level Macro Funnel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Total Spend */}
        <div className="bg-[#1A141D] border border-[#3D3342] rounded p-4 relative overflow-hidden">
          <div className="text-[10px] font-mono text-[#A99EAA] uppercase tracking-wider mb-1">
            GROSS PROCUREMENT
          </div>
          <div className="font-editorial text-2xl md:text-3xl font-extrabold text-[#F3EBDD]">
            ₹18.42 Cr
          </div>
          <div className="text-[11px] text-[#A99EAA] mt-1">
            Total fiscal commitment (100%)
          </div>
          <div className="absolute right-3 top-3 text-[#3D3342]">
            <span className="font-mono text-2xl font-bold">01</span>
          </div>
        </div>

        {/* Effective Spend */}
        <div className="bg-[#1A141D] border border-[#8FAF78]/40 rounded p-4 relative overflow-hidden">
          <div className="text-[10px] font-mono text-[#8FAF78] uppercase tracking-wider mb-1">
            EFFECTIVE PRODUCTIVE SPEND
          </div>
          <div className="font-editorial text-2xl md:text-3xl font-extrabold text-[#8FAF78]">
            ₹15.82 Cr
          </div>
          <div className="text-[11px] text-[#A99EAA] mt-1">
            Delivered value capture (85.9%)
          </div>
          <div className="absolute right-3 top-3 text-[#8FAF78]/30">
            <span className="font-mono text-2xl font-bold">02</span>
          </div>
        </div>

        {/* Total Leakage */}
        <div className="bg-[#261B21] border border-[#C95C5C]/50 rounded p-4 relative overflow-hidden">
          <div className="text-[10px] font-mono text-[#E68585] uppercase tracking-wider mb-1 flex items-center gap-1">
            <AlertOctagon size={12} className="text-[#C95C5C]" />
            IDENTIFIED LEAKAGE
          </div>
          <div className="font-editorial text-2xl md:text-3xl font-extrabold text-[#C95C5C]">
            ₹2.60 Cr
          </div>
          <div className="text-[11px] text-[#E68585] mt-1 font-mono">
            Recoverable Delta (14.1%)
          </div>
          <div className="absolute right-3 top-3 text-[#C95C5C]/30">
            <span className="font-mono text-2xl font-bold">03</span>
          </div>
        </div>
      </div>

      {/* Granular Leakage Waterfall Breakdown */}
      <div className="space-y-3">
        <div className="text-[11px] font-mono text-[#A99EAA] uppercase tracking-wider flex items-center justify-between pb-1 border-b border-[#3D3342]/60">
          <span>Leakage Channel & Root Cause</span>
          <span>Leakage Value & Recapture Share</span>
        </div>

        {leakageItems.map((item, idx) => (
          <div
            key={item.title}
            className="p-3 rounded bg-[#1A141D] border border-[#3D3342]/70 hover:border-[#D4774C]/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
          >
            <div className="flex items-start gap-3">
              <div
                className="w-1.5 h-10 rounded-full shrink-0 mt-0.5"
                style={{ backgroundColor: item.color }}
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#F3EBDD] group-hover:text-[#D4774C] transition-colors">
                    {item.title}
                  </span>
                  <span className="text-[9px] font-mono px-1 rounded bg-[#2A222D] text-[#A99EAA] border border-[#3D3342]">
                    #{idx + 1}
                  </span>
                </div>
                <div className="text-[11px] text-[#A99EAA] font-sans mt-0.5">
                  {item.cause}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 font-mono">
              <div className="text-right">
                <div className="text-xs font-bold text-[#C95C5C]">
                  -₹{item.amountLakhs} Lakhs
                </div>
                <div className="text-[10px] text-[#A99EAA]">
                  {item.pct} of leakage
                </div>
              </div>
              <div className="w-20 bg-[#211B24] h-2 rounded-full overflow-hidden border border-[#3D3342]/80">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: item.pct,
                    backgroundColor: item.color
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
