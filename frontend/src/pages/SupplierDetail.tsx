import React, { useState } from 'react';
import {
  ArrowLeft,
  AlertTriangle,
  Sliders,
  FileText,
  Calendar,
  Truck,
  TrendingDown,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  PhoneCall,
  Clock
} from 'lucide-react';
import { SupplierRadarChart } from '../components/charts/SupplierRadarChart';
import { StatusBadge } from '../components/shared/StatusBadge';
import { PageId, Supplier } from '../types';
import { MOCK_SUPPLIERS } from '../data/mockData';

interface SupplierDetailProps {
  supplierId?: string;
  onNavigate: (page: PageId, meta?: any) => void;
}

export const SupplierDetail: React.FC<SupplierDetailProps> = ({
  supplierId = 'sup-apex',
  onNavigate,
}) => {
  const currentSupplier = MOCK_SUPPLIERS.find((s) => s.id === supplierId) || MOCK_SUPPLIERS[0];
  const alternativeSupplier = currentSupplier.alternativeSupplierId
    ? MOCK_SUPPLIERS.find((s) => s.id === currentSupplier.alternativeSupplierId)
    : null;

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('suppliers')}
          className="flex items-center gap-1.5 text-xs font-mono text-[#A99EAA] hover:text-[#F3EBDD] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Supplier Constellation</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('contracts', { supplierId: currentSupplier.id })}
            className="px-3 py-1.5 rounded bg-[#211B24] border border-[#3D3342] text-xs font-mono text-[#F3EBDD] hover:bg-[#2A222D]"
          >
            View Active MSA Contract
          </button>
          <button
            onClick={() => onNavigate('what-if')}
            className="px-3 py-1.5 rounded bg-[#D4774C] hover:bg-[#E28E67] text-[#17131A] text-xs font-mono font-bold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Sliders size={13} />
            <span>Simulate Allocation Shift</span>
          </button>
        </div>
      </div>

      {/* Hero Dossier Header */}
      <div className="bg-[#211B24] border border-[#3D3342] rounded-lg p-6 shadow-panel">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="kpi-label text-[#B8A06A] font-mono text-[10px]">
                STRATEGIC DOSSIER // {currentSupplier.category.toUpperCase()}
              </span>
              <StatusBadge type="risk" value={currentSupplier.riskLevel} />
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#2A222D] text-[#A99EAA] border border-[#3D3342]">
                Tier: {currentSupplier.tier}
              </span>
            </div>

            <h1 className="font-editorial text-3xl font-extrabold text-[#F3EBDD] tracking-tight">
              {currentSupplier.name}
            </h1>
            <p className="text-xs text-[#A99EAA] mt-1 font-sans max-w-2xl">
              Manufacturing Location: <strong className="text-[#F3EBDD] font-mono">{currentSupplier.country}</strong> • Key Account Lead: <strong className="text-[#F3EBDD]">{currentSupplier.contactPerson}</strong>
            </p>
          </div>

          {/* Supplier Health Big Editorial Badge */}
          <div className="bg-[#17131A] border border-[#3D3342] rounded-lg p-4 text-center md:text-right shrink-0">
            <span className="text-[10px] font-mono text-[#A99EAA] block uppercase tracking-wider">
              OVERALL SUPPLIER HEALTH
            </span>
            <div className="flex items-baseline justify-center md:justify-end gap-1 my-0.5">
              <span className="font-editorial text-4xl font-extrabold text-[#D4774C]">
                {currentSupplier.healthScore}
              </span>
              <span className="text-xs font-mono text-[#7C727D]">/ 100</span>
            </div>
            <span className="text-[10px] font-mono text-[#C95C5C] font-semibold flex items-center justify-center md:justify-end gap-1">
              <TrendingDown size={11} /> Trajectory: Deteriorating
            </span>
          </div>
        </div>

        {/* 4-Item Analytical Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-5 border-t border-[#3D3342]/60">
          <div className="bg-[#1A141D] p-3 rounded border border-[#3D3342]/70">
            <span className="text-[10px] font-mono text-[#A99EAA] block">TOTAL SPEND VOLUME</span>
            <span className="font-editorial text-xl font-bold text-[#F3EBDD]">
              ₹{currentSupplier.spendValueCr} Cr
            </span>
            <span className="text-[10px] text-[#D4774C] font-mono block">
              {currentSupplier.spendPercentage}% concentration
            </span>
          </div>

          <div className="bg-[#1A141D] p-3 rounded border border-[#3D3342]/70">
            <span className="text-[10px] font-mono text-[#A99EAA] block">DELIVERY OTIF</span>
            <span className="font-editorial text-xl font-bold text-[#C95C5C]">
              {currentSupplier.metrics.delivery}%
            </span>
            <span className="text-[10px] text-[#A99EAA] font-mono block">
              Drift: +7 days average
            </span>
          </div>

          <div className="bg-[#1A141D] p-3 rounded border border-[#3D3342]/70">
            <span className="text-[10px] font-mono text-[#A99EAA] block">PRICE VARIANCE</span>
            <span className="font-editorial text-xl font-bold text-[#D6A45D]">
              +{currentSupplier.priceVariancePct}%
            </span>
            <span className="text-[10px] text-[#A99EAA] font-mono block">
              Above category index
            </span>
          </div>

          <div className="bg-[#1A141D] p-3 rounded border border-[#3D3342]/70">
            <span className="text-[10px] font-mono text-[#A99EAA] block">CONTRACT EXPIRY</span>
            <span className="font-editorial text-xl font-bold text-[#C95C5C]">
              18 Days
            </span>
            <span className="text-[10px] text-[#A99EAA] font-mono block">
              MSA-APEX-09
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: Radar DNA vs Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: SUPPLIER DNA RADAR (Col 6) */}
        <div className="lg:col-span-6 bg-[#211B24] border border-[#3D3342] rounded-lg p-5 shadow-panel">
          <div className="flex items-center justify-between mb-4 border-b border-[#3D3342]/70 pb-3">
            <div>
              <span className="kpi-label text-[#B8A06A] font-mono text-xs font-bold">
                SUPPLIER DNA // MULTIDIMENSIONAL INDEX
              </span>
              <p className="text-xs text-[#A99EAA] mt-0.5">
                Evaluated against the category benchmark for precision aerospace CNC.
              </p>
            </div>
          </div>

          <SupplierRadarChart
            metrics={currentSupplier.metrics}
            supplierName={currentSupplier.name}
          />

          {/* Breakdown numbers */}
          <div className="grid grid-cols-5 gap-2 mt-4 pt-4 border-t border-[#3D3342]/60 text-center font-mono">
            <div className="bg-[#1A141D] p-2 rounded border border-[#3D3342]/60">
              <span className="text-[9px] text-[#A99EAA] block">DELIVERY</span>
              <span className="text-sm font-bold text-[#C95C5C]">{currentSupplier.metrics.delivery}</span>
              <span className="text-[8px] text-[#7C727D] block">BM: 91</span>
            </div>
            <div className="bg-[#1A141D] p-2 rounded border border-[#3D3342]/60">
              <span className="text-[9px] text-[#A99EAA] block">QUALITY</span>
              <span className="text-sm font-bold text-[#F3EBDD]">{currentSupplier.metrics.quality}</span>
              <span className="text-[8px] text-[#7C727D] block">BM: 84</span>
            </div>
            <div className="bg-[#1A141D] p-2 rounded border border-[#3D3342]/60">
              <span className="text-[9px] text-[#A99EAA] block">COST</span>
              <span className="text-sm font-bold text-[#D6A45D]">{currentSupplier.metrics.cost}</span>
              <span className="text-[8px] text-[#7C727D] block">BM: 76</span>
            </div>
            <div className="bg-[#1A141D] p-2 rounded border border-[#3D3342]/60">
              <span className="text-[9px] text-[#A99EAA] block">RELIABILITY</span>
              <span className="text-sm font-bold text-[#F3EBDD]">{currentSupplier.metrics.reliability}</span>
              <span className="text-[8px] text-[#7C727D] block">BM: 88</span>
            </div>
            <div className="bg-[#1A141D] p-2 rounded border border-[#3D3342]/60">
              <span className="text-[9px] text-[#A99EAA] block">COMPLIANCE</span>
              <span className="text-sm font-bold text-[#8FAF78]">{currentSupplier.metrics.compliance}</span>
              <span className="text-[8px] text-[#7C727D] block">BM: 79</span>
            </div>
          </div>
        </div>

        {/* Right: Supplier Timeline (Col 6) */}
        <div className="lg:col-span-6 bg-[#211B24] border border-[#3D3342] rounded-lg p-5 shadow-panel space-y-4">
          <div className="flex items-center justify-between border-b border-[#3D3342]/70 pb-3">
            <div>
              <span className="kpi-label text-[#B8A06A] font-mono text-xs font-bold">
                SIGNAL TIMELINE // OPERATIONAL CHRONOLOGY
              </span>
              <p className="text-xs text-[#A99EAA] mt-0.5">
                Key events shaping the deteriorating risk trajectory.
              </p>
            </div>
          </div>

          <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-[#3D3342]">
            {currentSupplier.timeline.map((item, idx) => (
              <div key={idx} className="relative pl-8">
                <span
                  className={`absolute left-2.5 top-1.5 w-2.5 h-2.5 rounded-full -translate-x-1/2 ring-4 ring-[#211B24] ${
                    item.impact === 'negative'
                      ? 'bg-[#C95C5C]'
                      : item.impact === 'positive'
                      ? 'bg-[#8FAF78]'
                      : item.impact === 'warning'
                      ? 'bg-[#D4774C]'
                      : 'bg-[#B8A06A]'
                  }`}
                />
                <div className="bg-[#1A141D] p-3 rounded border border-[#3D3342]/70 hover:border-[#D4774C]/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-[#B8A06A]">
                      {item.month}
                    </span>
                    <span
                      className={`text-[9px] font-mono uppercase px-1 rounded ${
                        item.impact === 'negative'
                          ? 'bg-[#C95C5C]/20 text-[#E68585]'
                          : item.impact === 'positive'
                          ? 'bg-[#8FAF78]/20 text-[#A8C992]'
                          : 'bg-[#D4774C]/20 text-[#E28E67]'
                      }`}
                    >
                      {item.impact}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-[#F3EBDD] mt-1">
                    {item.event}
                  </div>
                  <div className="text-[11px] text-[#A99EAA] mt-1 font-sans">
                    {item.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alternative Supplier Recommendation Module */}
      {alternativeSupplier && (
        <div className="bg-[#261E27] border border-[#B8A06A]/40 rounded-lg p-5 shadow-panel">
          <div className="flex items-center justify-between mb-3 border-b border-[#3D3342]/60 pb-2">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#B8A06A]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#B8A06A]">
                RECOMMENDED ALTERNATIVE QUALIFICATION // SECONDARY DUAL-SOURCE
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#8FAF78]/20 text-[#A8C992]">
              QUALIFIED ALTERNATIVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-8">
              <h3 className="font-editorial text-lg font-bold text-[#F3EBDD]">
                {alternativeSupplier.name} (Health: {alternativeSupplier.healthScore}/100)
              </h3>
              <p className="text-xs text-[#A99EAA] font-sans mt-1">
                Vertex exhibits superior Delivery OTIF (<strong className="text-[#8FAF78]">96%</strong> vs Apex 68%), lower price variance (<strong className="text-[#8FAF78]">-3.8%</strong> vs Apex +17.2%), and ISO-certified cleanroom capabilities ready to absorb 20-30% volume.
              </p>
            </div>

            <div className="md:col-span-4 flex justify-end gap-2">
              <button
                onClick={() => onNavigate('what-if')}
                className="w-full py-2 px-3 rounded bg-[#D4774C] hover:bg-[#E28E67] text-[#17131A] font-mono text-xs font-bold transition-colors text-center"
              >
                Model 20% Shift in Digital Twin →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
