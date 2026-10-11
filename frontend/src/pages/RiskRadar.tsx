import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  ChevronRight,
  TrendingDown,
  Bell,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { RiskMatrix } from '../components/charts/RiskMatrix';
import { StatusBadge } from '../components/shared/StatusBadge';
import { PageId, Alert, RiskEvent } from '../types';
import { MOCK_RISK_EVENTS, MOCK_ALERTS } from '../data/mockData';

interface RiskRadarProps {
  onNavigate: (page: PageId, meta?: any) => void;
  onSelectSupplier?: (supplierId: string) => void;
}

export const RiskRadar: React.FC<RiskRadarProps> = ({ onNavigate, onSelectSupplier }) => {
  const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);

  const handleAcknowledge = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: !a.acknowledged } : a))
    );
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Page Title & Operational Alert Count */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#211B24] border border-[#3D3342] p-5 rounded-lg shadow-panel">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] tracking-widest text-[#C95C5C] uppercase font-bold">
              THREAT INTELLIGENCE MATRIX // MULTI-VECTOR RISK RADAR
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C95C5C] animate-ping" />
          </div>
          <h2 className="font-editorial text-2xl font-bold text-[#F3EBDD]">
            Procurement Risk Radar & Early Warning
          </h2>
          <p className="text-xs text-[#A99EAA] mt-0.5">
            Continuous Bayesian surveillance over Supplier, Delivery, Cost, Quality, Dependency, and Compliance vectors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('what-if')}
            className="px-3 py-1.5 rounded bg-[#2A222D] hover:bg-[#342B38] text-[#F3EBDD] border border-[#D4774C]/50 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
          >
            <Sliders size={13} className="text-[#D4774C]" />
            <span>Launch What-If Twin</span>
          </button>
        </div>
      </div>

      {/* 1. Core Visualization: RISK RADAR MATRIX (3x3 Impact vs Probability) */}
      <RiskMatrix events={MOCK_RISK_EVENTS} />

      {/* 2. Intelligent Early Warning System Section */}
      <div className="bg-[#211B24] border border-[#3D3342] rounded-lg p-5 shadow-panel space-y-4">
        <div className="flex items-center justify-between border-b border-[#3D3342]/70 pb-3">
          <div>
            <span className="kpi-label text-[#D4774C] font-mono text-xs font-bold">
              EARLY WARNING SYSTEM // ACTIVE SIGNALS & ACTION PLAYBOOKS
            </span>
            <p className="text-xs text-[#A99EAA] mt-0.5">
              Automated anomaly triggers with causal reasoning and recommended interventions.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#17131A] text-[#F3EBDD] border border-[#3D3342]">
            {alerts.filter((a) => !a.acknowledged).length} Active Alerts
          </span>
        </div>

        <div className="space-y-3">
          {alerts.map((alt) => (
            <div
              key={alt.id}
              className={`p-4 rounded border transition-all ${
                alt.acknowledged
                  ? 'bg-[#1A141D]/60 border-[#3D3342]/40 opacity-70'
                  : 'bg-[#1A141D] border-[#3D3342] hover:border-[#D4774C]/50'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase ${
                        alt.severity === 'HIGH'
                          ? 'bg-[#C95C5C]/20 text-[#E68585] border border-[#C95C5C]/30'
                          : 'bg-[#D6A45D]/20 text-[#E5BF88] border border-[#D6A45D]/30'
                      }`}
                    >
                      {alt.severity} PRIORITY
                    </span>
                    <span className="text-[10px] font-mono text-[#A99EAA]">
                      Category: {alt.category} • Date: {alt.date}
                    </span>
                    {alt.supplierName && (
                      <span className="text-[10px] font-mono text-[#D4774C]">
                        [{alt.supplierName}]
                      </span>
                    )}
                  </div>

                  <h3 className="font-editorial text-base font-bold text-[#F3EBDD]">
                    {alt.title}
                  </h3>
                  <p className="text-xs text-[#A99EAA] font-sans">
                    {alt.message}
                  </p>

                  {/* Why it Matters Box */}
                  <div className="mt-2 p-2.5 rounded bg-[#211B24] border border-[#3D3342]/60 space-y-1">
                    <span className="text-[10px] font-mono text-[#D6A45D] font-bold uppercase tracking-wider block">
                      Why It Matters
                    </span>
                    <p className="text-xs text-[#E5DCDE] font-sans">
                      {alt.whyItMatters}
                    </p>
                  </div>

                  {/* Recommended Action Box */}
                  <div className="p-2.5 rounded bg-[#261B21] border border-[#D4774C]/30 space-y-1">
                    <span className="text-[10px] font-mono text-[#D4774C] font-bold uppercase tracking-wider block">
                      Recommended Action
                    </span>
                    <p className="text-xs text-[#F3EBDD] font-sans">
                      {alt.recommendedAction}
                    </p>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex flex-row md:flex-col items-end gap-2 shrink-0 pt-2 md:pt-0">
                  <button
                    onClick={() => handleAcknowledge(alt.id)}
                    className={`px-3 py-1.5 rounded font-mono text-xs font-medium transition-colors flex items-center gap-1.5 ${
                      alt.acknowledged
                        ? 'bg-[#2A222D] text-[#8FAF78] border border-[#8FAF78]/40'
                        : 'bg-[#2A222D] hover:bg-[#342B38] text-[#F3EBDD] border border-[#3D3342]'
                    }`}
                  >
                    <CheckCircle2 size={13} className={alt.acknowledged ? 'text-[#8FAF78]' : 'text-[#A99EAA]'} />
                    <span>{alt.acknowledged ? 'Acknowledged' : 'Acknowledge'}</span>
                  </button>

                  {alt.supplierId && (
                    <button
                      onClick={() => onNavigate('supplier-detail', { supplierId: alt.supplierId })}
                      className="px-3 py-1.5 rounded bg-[#D4774C]/15 hover:bg-[#D4774C]/25 text-[#F3EBDD] border border-[#D4774C]/40 font-mono text-xs font-semibold flex items-center gap-1"
                    >
                      <span>Inspect Vendor</span>
                      <ChevronRight size={13} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
