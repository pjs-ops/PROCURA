import React, { useState, useMemo } from 'react';
import {
  Sliders,
  TrendingDown,
  TrendingUp,
  RefreshCw,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Layers,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { KPICard } from '../components/shared/KPICard';
import { PageId } from '../types';
import { analyticsService } from '../services';

interface WhatIfLabProps {
  onNavigate: (page: PageId, meta?: any) => void;
  presetSupplierAId?: string;
}

export const WhatIfLab: React.FC<WhatIfLabProps> = ({ onNavigate }) => {
  // Interactive Slider State
  const [supplierAAllocation, setSupplierAAllocation] = useState<number>(80); // e.g. Apex Industrial base
  const [demandGrowth, setDemandGrowth] = useState<number>(0); // -10% to +30%
  const [supplierAPriceChange, setSupplierAPriceChange] = useState<number>(0); // -5% to +20%
  const [leadTimeVariance, setLeadTimeVariance] = useState<number>(0); // -5 days to +20 days

  // Derived Supplier B allocation is complementary (100 - A)
  const supplierBAllocation = 100 - supplierAAllocation;

  // Real-time recalculation using our analytics service
  const simulation = useMemo(() => {
    return analyticsService.simulateDigitalTwin({
      supplierAAllocationPct: supplierAAllocation,
      supplierBAllocationPct: supplierBAllocation,
      demandGrowthPct: demandGrowth,
      supplierAPriceChangePct: supplierAPriceChange,
      leadTimeVarianceDays: leadTimeVariance,
    });
  }, [supplierAAllocation, supplierBAllocation, demandGrowth, supplierAPriceChange, leadTimeVariance]);

  // Quick Scenario Preset Loader
  const applyPreset = (presetName: 'recommendation' | 'stress-test' | 'price-shock' | 'reset') => {
    switch (presetName) {
      case 'recommendation':
        // Recommended by AI Analyst: shift 20% to Vertex (A goes to 80%), hold price, reduce lead time drift
        setSupplierAAllocation(75);
        setDemandGrowth(5);
        setSupplierAPriceChange(2);
        setLeadTimeVariance(0);
        break;
      case 'stress-test':
        setSupplierAAllocation(85);
        setDemandGrowth(20);
        setSupplierAPriceChange(8);
        setLeadTimeVariance(12);
        break;
      case 'price-shock':
        setSupplierAAllocation(90);
        setDemandGrowth(0);
        setSupplierAPriceChange(15);
        setLeadTimeVariance(7);
        break;
      case 'reset':
      default:
        setSupplierAAllocation(100);
        setDemandGrowth(0);
        setSupplierAPriceChange(0);
        setLeadTimeVariance(0);
        break;
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* 1. Cockpit Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#211B24] border border-[#3D3342] p-5 rounded-lg shadow-panel">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] tracking-widest text-[#D4774C] uppercase font-bold">
              DIGITAL TWIN ENGINE // DETERMINISTIC SOURCING SIMULATION
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8FAF78] animate-pulse" />
          </div>
          <h2 className="font-editorial text-2xl font-bold text-[#F3EBDD]">
            Procurement Digital Twin (What-If Lab)
          </h2>
          <p className="text-xs text-[#A99EAA] mt-0.5">
            Model vendor volume shifts, commodity cost surges, and lead time shocks against real-world contract constraints.
          </p>
        </div>

        {/* Preset scenario triggers */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => applyPreset('recommendation')}
            className="px-2.5 py-1.5 rounded bg-[#D4774C]/20 border border-[#D4774C]/50 hover:bg-[#D4774C]/30 text-[#F3EBDD] text-xs font-mono font-medium flex items-center gap-1 transition-colors"
          >
            <Sparkles size={12} className="text-[#D4774C]" />
            <span>AI Recommended Shift</span>
          </button>
          <button
            onClick={() => applyPreset('stress-test')}
            className="px-2.5 py-1.5 rounded bg-[#2A222D] hover:bg-[#342B38] text-[#F3EBDD] border border-[#3D3342] text-xs font-mono"
          >
            Demand Surge (+20%)
          </button>
          <button
            onClick={() => applyPreset('reset')}
            className="p-1.5 rounded bg-[#2A222D] hover:bg-[#342B38] text-[#A99EAA] hover:text-[#F3EBDD] border border-[#3D3342]"
            title="Reset to baseline"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* 2. Top Executive Outcome Metrics (CURRENT vs SIMULATED vs SAVINGS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Current Baseline Spend */}
        <div className="bg-[#1A141D] border border-[#3D3342] rounded-lg p-4">
          <span className="text-[10px] font-mono text-[#A99EAA] block uppercase tracking-wider">
            CURRENT BASELINE SPEND
          </span>
          <div className="font-editorial text-3xl font-extrabold text-[#F3EBDD] mt-1">
            ₹{simulation.currentSpendCr} Cr
          </div>
          <span className="text-[10px] text-[#A99EAA] font-mono mt-0.5 block">
            FY26 Initial Commitment
          </span>
        </div>

        {/* Simulated Spend */}
        <div className="bg-[#1A141D] border border-[#B8A06A]/40 rounded-lg p-4">
          <span className="text-[10px] font-mono text-[#B8A06A] block uppercase tracking-wider">
            SIMULATED SPEND
          </span>
          <div className="font-editorial text-3xl font-extrabold text-[#B8A06A] mt-1">
            ₹{simulation.simulatedSpendCr} Cr
          </div>
          <span className="text-[10px] text-[#B8A06A] font-mono mt-0.5 block">
            Scenario Capital Outflow
          </span>
        </div>

        {/* Projected Savings */}
        <div className="bg-[#241F28] border border-[#8FAF78]/50 rounded-lg p-4">
          <span className="text-[10px] font-mono text-[#8FAF78] block uppercase tracking-wider">
            PROJECTED NET SAVINGS
          </span>
          <div className="font-editorial text-3xl font-extrabold text-[#8FAF78] mt-1">
            ₹{simulation.projectedSavingsCr} Cr
          </div>
          <span className="text-[10px] text-[#8FAF78] font-mono mt-0.5 block">
            Net Arbitrage Realized
          </span>
        </div>

        {/* Risk Delta Score */}
        <div className="bg-[#1A141D] border border-[#3D3342] rounded-lg p-4">
          <span className="text-[10px] font-mono text-[#A99EAA] block uppercase tracking-wider">
            THREAT EXPOSURE DELTA
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={`font-editorial text-3xl font-extrabold ${simulation.riskScoreDelta <= 0 ? 'text-[#8FAF78]' : 'text-[#C95C5C]'}`}>
              {simulation.riskScoreDelta > 0 ? `+${simulation.riskScoreDelta}` : simulation.riskScoreDelta} pts
            </span>
            <span className="text-xs font-mono text-[#A99EAA]">
              {simulation.riskScoreDelta <= 0 ? 'Mitigated' : 'Elevated'}
            </span>
          </div>
          <span className="text-[10px] text-[#A99EAA] font-mono mt-0.5 block">
            Dependency: {simulation.supplierDependencyPct}%
          </span>
        </div>
      </div>

      {/* 3. Main Split: CONTROLS SLIDERS on Left, DIGITAL TWIN TELEMETRY on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Sliders (Col 6) */}
        <div className="lg:col-span-6 bg-[#211B24] border border-[#3D3342] rounded-lg p-5 shadow-panel space-y-5">
          <div className="flex items-center justify-between border-b border-[#3D3342]/70 pb-3">
            <div>
              <span className="kpi-label text-[#B8A06A] font-mono text-xs font-bold">
                SCENARIO PARAMETER CONTROLS
              </span>
              <p className="text-xs text-[#A99EAA] mt-0.5">
                Adjust sliders to simulate supplier allocation, pricing shock, and demand drift in real time.
              </p>
            </div>
          </div>

          {/* Slider 1: Supplier A (Apex Industrial) vs Supplier B (Vertex Electronics) */}
          <div className="space-y-2 bg-[#1A141D] p-3.5 rounded border border-[#3D3342]/70">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#F3EBDD]">
                Supplier A (Apex Industrial) Allocation
              </span>
              <span className="text-[#D4774C] font-bold text-sm">{supplierAAllocation}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              step="5"
              value={supplierAAllocation}
              onChange={(e) => setSupplierAAllocation(Number(e.target.value))}
              className="w-full accent-[#D4774C] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#A99EAA] pt-1 border-t border-[#3D3342]/40">
              <span>Apex Allocation: <strong className="text-[#F3EBDD]">{supplierAAllocation}%</strong></span>
              <span>Vertex Secondary: <strong className="text-[#8FAF78]">{supplierBAllocation}%</strong></span>
            </div>
          </div>

          {/* Slider 2: Demand Growth */}
          <div className="space-y-2 bg-[#1A141D] p-3.5 rounded border border-[#3D3342]/70">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#F3EBDD]">
                Enterprise Demand Variance
              </span>
              <span className={`font-bold text-sm ${demandGrowth >= 0 ? 'text-[#8FAF78]' : 'text-[#C95C5C]'}`}>
                {demandGrowth > 0 ? `+${demandGrowth}%` : `${demandGrowth}%`}
              </span>
            </div>
            <input
              type="range"
              min="-10"
              max="30"
              step="2"
              value={demandGrowth}
              onChange={(e) => setDemandGrowth(Number(e.target.value))}
              className="w-full accent-[#B8A06A] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#A99EAA] pt-1 border-t border-[#3D3342]/40">
              <span>-10% Contraction</span>
              <span>Base (0%)</span>
              <span>+30% Surge</span>
            </div>
          </div>

          {/* Slider 3: Supplier A Price Change */}
          <div className="space-y-2 bg-[#1A141D] p-3.5 rounded border border-[#3D3342]/70">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#F3EBDD]">
                Supplier A Tariff / Price Change
              </span>
              <span className={`font-bold text-sm ${supplierAPriceChange > 0 ? 'text-[#C95C5C]' : 'text-[#8FAF78]'}`}>
                {supplierAPriceChange > 0 ? `+${supplierAPriceChange}%` : `${supplierAPriceChange}%`}
              </span>
            </div>
            <input
              type="range"
              min="-5"
              max="20"
              step="1"
              value={supplierAPriceChange}
              onChange={(e) => setSupplierAPriceChange(Number(e.target.value))}
              className="w-full accent-[#C95C5C] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#A99EAA] pt-1 border-t border-[#3D3342]/40">
              <span>-5% Renegotiation</span>
              <span>Flat</span>
              <span>+20% Inflation</span>
            </div>
          </div>

          {/* Slider 4: Lead Time Drift */}
          <div className="space-y-2 bg-[#1A141D] p-3.5 rounded border border-[#3D3342]/70">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#F3EBDD]">
                Lead Time Drift Variance
              </span>
              <span className={`font-bold text-sm ${leadTimeVariance > 0 ? 'text-[#C95C5C]' : 'text-[#8FAF78]'}`}>
                {leadTimeVariance > 0 ? `+${leadTimeVariance} Days` : `${leadTimeVariance} Days`}
              </span>
            </div>
            <input
              type="range"
              min="-5"
              max="20"
              step="1"
              value={leadTimeVariance}
              onChange={(e) => setLeadTimeVariance(Number(e.target.value))}
              className="w-full accent-[#D6A45D] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#A99EAA] pt-1 border-t border-[#3D3342]/40">
              <span>-5 Days Faster</span>
              <span>Baseline</span>
              <span>+20 Days Congestion</span>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Simulation Diagnostics & Verdict (Col 6) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Telemetry Visual Card */}
          <div className="bg-[#211B24] border border-[#3D3342] rounded-lg p-5 shadow-panel space-y-4">
            <div className="flex items-center justify-between border-b border-[#3D3342]/70 pb-3">
              <span className="kpi-label text-[#B8A06A] font-mono text-xs font-bold">
                OPERATIONAL TELEMETRY & GAUGES
              </span>
              <span className="text-[10px] font-mono text-[#8FAF78]">
                Real-Time Recalculation
              </span>
            </div>

            {/* Gauge 1: Delivery Reliability */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#A99EAA]">Simulated Delivery Reliability (OTIF)</span>
                <span className="font-bold text-[#F3EBDD]">{simulation.deliveryReliabilityPct}%</span>
              </div>
              <div className="w-full bg-[#17131A] h-2 rounded-full overflow-hidden border border-[#3D3342]/80">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${simulation.deliveryReliabilityPct}%`,
                    backgroundColor: simulation.deliveryReliabilityPct > 80 ? '#8FAF78' : '#D6A45D'
                  }}
                />
              </div>
            </div>

            {/* Gauge 2: Single-Vendor Concentration */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#A99EAA]">Apex Strategic Dependency Share</span>
                <span className="font-bold text-[#D4774C]">{simulation.supplierDependencyPct}%</span>
              </div>
              <div className="w-full bg-[#17131A] h-2 rounded-full overflow-hidden border border-[#3D3342]/80">
                <div
                  className="h-full rounded-full transition-all duration-300 bg-[#D4774C]"
                  style={{ width: `${Math.min(100, simulation.supplierDependencyPct * 3.5)}%` }}
                />
              </div>
            </div>

            {/* Visual Breakdown of Spend Allocation */}
            <div className="pt-2 border-t border-[#3D3342]/60 space-y-2">
              <span className="text-[10px] font-mono text-[#A99EAA] uppercase tracking-wider block">
                CAPITAL REPARTITION BREAKDOWN
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-[#1A141D] p-2.5 rounded border border-[#3D3342]/70">
                  <span className="text-[9px] text-[#A99EAA] block">APEX INDUSTRIAL</span>
                  <span className="font-bold text-[#F3EBDD] text-sm">
                    ₹{((3.84 * (supplierAAllocation / 100)) * (1 + supplierAPriceChange / 100)).toFixed(2)} Cr
                  </span>
                  <span className="text-[9px] text-[#D4774C] block">{supplierAAllocation}% share</span>
                </div>

                <div className="bg-[#1A141D] p-2.5 rounded border border-[#8FAF78]/30">
                  <span className="text-[9px] text-[#8FAF78] block">VERTEX ELECTRONICS</span>
                  <span className="font-bold text-[#8FAF78] text-sm">
                    ₹{(3.84 * (supplierBAllocation / 100) * 0.948).toFixed(2)} Cr
                  </span>
                  <span className="text-[9px] text-[#A99EAA] block">{supplierBAllocation}% reallocated</span>
                </div>
              </div>
            </div>
          </div>

          {/* Strategic Verdict & Executive Action Plan */}
          <div className="bg-gradient-to-br from-[#2A1F2A] via-[#211B24] to-[#1A141D] border border-[#D4774C]/40 rounded-lg p-5 shadow-panel space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#D4774C]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#D4774C]">
                DIGITAL TWIN STRATEGIC VERDICT
              </span>
            </div>

            <p className="text-xs text-[#F3EBDD] font-sans leading-relaxed">
              {simulation.recommendationVerdict}
            </p>

            <div className="pt-2 border-t border-[#3D3342]/50 flex items-center justify-between text-xs font-mono">
              <span className="text-[#A99EAA]">Confidence in Model: 93%</span>
              <button
                onClick={() => onNavigate('contracts')}
                className="text-[#D4774C] hover:text-[#E28E67] font-semibold flex items-center gap-1"
              >
                Draft Contract Terms →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
