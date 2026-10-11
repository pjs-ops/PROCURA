import React, { useState } from 'react';
import {
  TrendingUp,
  ShieldAlert,
  Sparkles,
  FileSpreadsheet,
  FileText,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Layers,
  Activity
} from 'lucide-react';
import { KPICard } from '../components/shared/KPICard';
import { TechDivider } from '../components/shared/TechDivider';
import { ProcurementWeather } from '../components/charts/ProcurementWeather';
import { SpendFlowSankey } from '../components/charts/SpendFlowSankey';
import { LeakageWaterfall } from '../components/charts/LeakageWaterfall';
import { PageId } from '../types';
import { MOCK_PULSE, MOCK_ALERTS, MOCK_SUPPLIERS } from '../data/mockData';

interface OverviewProps {
  onNavigate: (page: PageId, meta?: any) => void;
}

export const Overview: React.FC<OverviewProps> = ({ onNavigate }) => {
  const pulse = MOCK_PULSE;
  const topAlerts = MOCK_ALERTS.slice(0, 3);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* 1. Command Center Headline Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#211B24] border border-[#3D3342] p-4 md:p-5 rounded-lg shadow-panel">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] tracking-widest text-[#D4774C] uppercase font-bold">
              ENTERPRISE COCKPIT // OPERATIONAL PULSE
            </span>
            <span className="w-2 h-2 rounded-full bg-[#8FAF78] animate-pulse" />
          </div>
          <h2 className="font-editorial text-2xl md:text-3xl font-extrabold text-[#F3EBDD] tracking-tight">
            Procurement Command Center
          </h2>
          <p className="text-xs text-[#A99EAA] max-w-2xl mt-0.5 font-sans">
            Continuous surveillance over ₹18.42 Cr committed spend, 25 critical suppliers, and automated leakage containment signals.
          </p>
        </div>

        {/* Quick Shortcuts */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigate('what-if')}
            className="px-3 py-2 rounded bg-[#2A222D] hover:bg-[#342B38] text-[#F3EBDD] border border-[#D4774C]/40 text-xs font-mono font-medium flex items-center gap-1.5 transition-all shadow-sm"
          >
            <span>Launch Digital Twin</span>
            <ChevronRight size={13} className="text-[#D4774C]" />
          </button>
          <button
            onClick={() => onNavigate('ai-analyst')}
            className="px-3 py-2 rounded bg-[#D4774C] hover:bg-[#E28E67] text-[#17131A] text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Sparkles size={13} />
            <span>AI Analyst</span>
          </button>
        </div>
      </div>

      {/* 2. Top Section: PROCUREMENT PULSE (Calculated from Mock Dataset) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="kpi-label text-[#B8A06A] font-mono text-[11px] font-bold">
            PROCUREMENT PULSE // CORE VECTORS
          </span>
          <span className="text-[10px] font-mono text-[#A99EAA]">
            FY 2026-Q1 Real-Time Calculation
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* Total Spend */}
          <KPICard
            label="Total Procurement Spend"
            value={`₹${pulse.totalSpendCr} Cr`}
            delta={`↑ ${pulse.spendGrowthYoYPct}%`}
            deltaDirection="up"
            isPositiveDelta={false}
            subtext="Across 8 Business Units"
            accent="copper"
            icon={TrendingUp}
          />

          {/* Savings Identified */}
          <KPICard
            label="Savings Identified"
            value={`₹${pulse.savingsIdentifiedCr} Cr`}
            delta="9.9% of spend"
            deltaDirection="up"
            isPositiveDelta={true}
            subtext="4 Active Leakage Channels"
            accent="gold"
            icon={Sparkles}
          />

          {/* Supplier Risk */}
          <KPICard
            label="Supplier Risk Concentration"
            value={`${pulse.highRiskSuppliersCount} HIGH`}
            delta="48.7% share"
            deltaDirection="up"
            isPositiveDelta={false}
            subtext="Apex Industrial Sole-Source"
            accent="critical"
            icon={ShieldAlert}
          />

          {/* PO Health */}
          <KPICard
            label="Purchase Order Health"
            value={`${pulse.poHealthPct}%`}
            delta="74% on track"
            deltaDirection="down"
            isPositiveDelta={true}
            subtext={`${pulse.activePOCount} active orders monitored`}
            accent="success"
            icon={FileSpreadsheet}
          />

          {/* Contract Leakage */}
          <KPICard
            label="Contract Leakage Horizon"
            value={`₹${pulse.contractLeakageLakhs}L`}
            delta="18d to MSA Expiry"
            deltaDirection="up"
            isPositiveDelta={false}
            subtext="Uncontracted rate drift"
            accent="copper"
            icon={FileText}
          />
        </div>
      </div>

      {/* 3. Signature Feature: PROCUREMENT WEATHER */}
      <ProcurementWeather />

      {/* 4. Early Warnings Horizontal Ticker Band */}
      <div className="bg-[#211B24] border border-[#3D3342] rounded-lg p-4">
        <div className="flex items-center justify-between mb-3 border-b border-[#3D3342]/60 pb-2">
          <div className="flex items-center gap-2">
            <span className="kpi-label text-[#C95C5C] font-mono text-[11px] font-bold">
              EARLY WARNING SIGNALS // IMMEDIATE ATTENTION REQUIRED
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C95C5C] animate-ping" />
          </div>
          <button
            onClick={() => onNavigate('risk-radar')}
            className="text-[11px] font-mono text-[#D4774C] hover:underline flex items-center gap-1"
          >
            View all 5 alerts →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {topAlerts.map((alt) => (
            <div
              key={alt.id}
              onClick={() => onNavigate('risk-radar')}
              className="bg-[#1A141D] border border-[#3D3342]/70 hover:border-[#D4774C]/50 rounded p-3 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                <span className="px-1.5 py-0.2 rounded bg-[#C95C5C]/20 text-[#E68585] font-bold">
                  {alt.severity} PRIORITY
                </span>
                <span className="text-[#A99EAA]">{alt.date}</span>
              </div>
              <div className="text-xs font-bold text-[#F3EBDD] group-hover:text-[#D4774C] transition-colors truncate">
                {alt.title}
              </div>
              <div className="text-[11px] text-[#A99EAA] mt-1 font-sans line-clamp-2">
                {alt.whyItMatters}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Signature Spend Flow Map (Sankey-style) */}
      <SpendFlowSankey
        onNavigateToSupplier={(supId) => onNavigate('supplier-detail', { supplierId: supId })}
      />

      {/* 6. Signature Leakage Waterfall Map */}
      <LeakageWaterfall onOpenSavingsLab={() => onNavigate('savings-lab')} />
    </div>
  );
};
