import React, { useState } from 'react';
import {
  Sparkles,
  TrendingDown,
  Layers,
  Sliders,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Search
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts';
import { KPICard } from '../components/shared/KPICard';
import { SavingsDetailDrawer } from '../components/modals/SavingsDetailDrawer';
import { PageId, SavingsOpportunity } from '../types';
import {
  MOCK_SAVINGS_OPPORTUNITIES,
  MOCK_PRICE_ANOMALY
} from '../data/mockData';

interface SavingsLabProps {
  onNavigate: (page: PageId, meta?: any) => void;
  onOpenSavingsDrawer: (opp: SavingsOpportunity) => void;
}

export const SavingsLab: React.FC<SavingsLabProps> = ({
  onNavigate,
  onOpenSavingsDrawer,
}) => {
  const anomaly = MOCK_PRICE_ANOMALY;
  const opportunities = MOCK_SAVINGS_OPPORTUNITIES;

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#211B24] border border-[#3D3342] p-5 rounded-lg shadow-panel">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] tracking-widest text-[#B8A06A] uppercase font-bold">
              CAPITAL OPTIMIZATION // SAVINGS RADAR & LEAKAGE ENGINE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8A06A]" />
          </div>
          <h2 className="font-editorial text-2xl font-bold text-[#F3EBDD]">
            Procurement Savings Lab & Price Anomalies
          </h2>
          <p className="text-xs text-[#A99EAA] mt-0.5">
            Surfacing ₹1.84 Cr in addressable efficiency gains through contract enforcement, tariff clamping, and consolidation.
          </p>
        </div>

        <button
          onClick={() => onNavigate('what-if')}
          className="px-3.5 py-2 rounded bg-[#D4774C] hover:bg-[#E28E67] text-[#17131A] text-xs font-mono font-bold flex items-center gap-1.5 transition-colors shrink-0 shadow-sm"
        >
          <Sliders size={13} />
          <span>Launch Digital Twin Simulation</span>
        </button>
      </div>

      {/* 2. Top Summary KPI Strips */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <KPICard
          label="Total Identified Savings"
          value="₹1.84 Cr"
          delta="9.9% of spend"
          isPositiveDelta={true}
          subtext="5 Active Opportunities"
          accent="gold"
          icon={Sparkles}
        />
        <KPICard
          label="Contract Expiry Leakage"
          value="₹21.4 Lakhs"
          delta="18d to MSA Expiry"
          isPositiveDelta={false}
          subtext="Apex Industrial Machining"
          accent="copper"
        />
        <KPICard
          label="Vendor Duplication"
          value="₹18.4 Lakhs"
          delta="3 Duplicate Vendors"
          isPositiveDelta={true}
          subtext="Mechanical Fasteners"
          accent="default"
        />
        <KPICard
          label="Price Variance Delta"
          value="₹12.7 Lakhs"
          delta="+25.6% Spike"
          isPositiveDelta={false}
          subtext="Cold Rolled Steel Sheets"
          accent="critical"
        />
      </div>

      {/* 3. SIGNATURE VISUALIZATION: PRICE ANOMALY DETECTOR (STEEL SHEETS) */}
      <div className="bg-[#211B24] border border-[#3D3342] rounded-lg p-5 shadow-panel space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#3D3342]/70 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="kpi-label text-[#C95C5C] font-mono text-xs font-bold">
                COMMODITY PRICE ANOMALY // ARBITRARY INVOICE SURCHARGE
              </span>
              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#C95C5C]/20 text-[#E68585] font-bold">
                +{anomaly.variancePct}% VARIANCE DETECTED
              </span>
            </div>
            <h3 className="font-editorial text-lg font-bold text-[#F3EBDD] mt-0.5">
              {anomaly.commodityName}
            </h3>
            <p className="text-xs text-[#A99EAA] font-sans">
              Supplier: <strong className="text-[#F3EBDD]">{anomaly.affectedSupplierName}</strong> • Benchmark index: Platts Cold-Rolled Steel Index
            </p>
          </div>

          <button
            onClick={() => onNavigate('supplier-detail', { supplierId: anomaly.affectedSupplierId })}
            className="px-3.5 py-1.5 rounded bg-[#C95C5C]/20 hover:bg-[#C95C5C]/30 text-[#E68585] border border-[#C95C5C]/50 font-mono text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <span>Investigate Supplier (Orion)</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* 3-Card Anomaly Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-[#1A141D] p-3 rounded border border-[#3D3342]/60">
            <span className="text-[10px] font-mono text-[#A99EAA] block">CONTRACTED BASELINE PRICE</span>
            <span className="font-editorial text-2xl font-bold text-[#F3EBDD]">
              ₹{anomaly.historicalPrice} <span className="text-xs font-mono text-[#A99EAA]">{anomaly.unit}</span>
            </span>
            <span className="text-[10px] text-[#8FAF78] font-mono block">Framework Contract Benchmark</span>
          </div>

          <div className="bg-[#1A141D] p-3 rounded border border-[#C95C5C]/40">
            <span className="text-[10px] font-mono text-[#E68585] block">CURRENT BILLED RATE</span>
            <span className="font-editorial text-2xl font-bold text-[#C95C5C]">
              ₹{anomaly.currentPrice} <span className="text-xs font-mono text-[#A99EAA]">{anomaly.unit}</span>
            </span>
            <span className="text-[10px] text-[#C95C5C] font-mono block">Unverified Spot Surcharge</span>
          </div>

          <div className="bg-[#1A141D] p-3 rounded border border-[#D6A45D]/40">
            <span className="text-[10px] font-mono text-[#D6A45D] block">UNAPPROVED OVERCHARGE</span>
            <span className="font-editorial text-2xl font-bold text-[#D6A45D]">
              +₹21.0 <span className="text-xs font-mono text-[#A99EAA]">{anomaly.unit} (+25.6%)</span>
            </span>
            <span className="text-[10px] text-[#A99EAA] font-mono block">Clawback Exposure: ₹8.6 Lakhs</span>
          </div>
        </div>

        {/* Anomaly Historical Line Chart */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#A99EAA] mb-2">
            <span>6-Month Pricing Trajectory vs Benchmark</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C95C5C]" /> Billed Price (Orion)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-[#B8A06A]" /> Contract Benchmark (Platts)
              </span>
            </div>
          </div>

          <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={anomaly.trendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid stroke="#2E2632" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="#7C727D" tick={{ fill: '#A99EAA', fontSize: 11, fontFamily: 'JetBrains Mono' }} />
                <YAxis stroke="#7C727D" domain={[75, 110]} tick={{ fill: '#A99EAA', fontSize: 10, fontFamily: 'JetBrains Mono' }} tickFormatter={(v) => `₹${v}`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#211B24',
                    borderColor: '#3D3342',
                    borderRadius: '6px',
                    fontFamily: 'JetBrains Mono',
                    fontSize: '11px',
                    color: '#F3EBDD',
                  }}
                />
                <Line type="monotone" dataKey="actual" stroke="#C95C5C" strokeWidth={2.5} dot={{ fill: '#C95C5C', r: 4 }} name="Billed Price (₹/kg)" />
                <Line type="monotone" dataKey="benchmark" stroke="#B8A06A" strokeWidth={1.5} strokeDasharray="4 4" dot={{ fill: '#B8A06A', r: 3 }} name="Contract Index (₹/kg)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. SAVINGS OPPORTUNITY CARDS PIPELINE */}
      <div className="bg-[#211B24] border border-[#3D3342] rounded-lg p-5 shadow-panel space-y-4">
        <div className="flex items-center justify-between border-b border-[#3D3342]/70 pb-3">
          <div>
            <span className="kpi-label text-[#B8A06A] font-mono text-xs font-bold">
              OPPORTUNITY PIPELINE // ADDRESSABLE LEAKAGE CARDS
            </span>
            <p className="text-xs text-[#A99EAA] mt-0.5">
              Select any opportunity to view the causal breakdown, vendor scope, and implementation playbook.
            </p>
          </div>
          <span className="text-[10px] font-mono text-[#D4774C]">
            Click card to open details →
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              onClick={() => onOpenSavingsDrawer(opp)}
              className="p-4 rounded-lg bg-[#1A141D] border border-[#3D3342] hover:border-[#D4774C]/60 hover:bg-[#221B25] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#2A222D] text-[#D4774C] border border-[#D4774C]/30">
                    {opp.type}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#8FAF78]/20 text-[#A8C992] border border-[#8FAF78]/30">
                    {opp.confidencePct}% Confidence
                  </span>
                </div>

                <h4 className="font-editorial text-base font-bold text-[#F3EBDD] group-hover:text-[#D4774C] transition-colors leading-snug">
                  {opp.title}
                </h4>

                <p className="text-xs text-[#A99EAA] font-sans mt-1 line-clamp-2">
                  {opp.details}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#3D3342]/60 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-[#A99EAA] block">POTENTIAL RECAPTURE</span>
                  <span className="font-editorial text-lg font-extrabold text-[#B8A06A]">
                    ₹{opp.potentialSavingsLakhs} Lakhs
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs font-mono text-[#D4774C] group-hover:underline">
                  <span>View Details</span>
                  <ChevronRight size={13} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
