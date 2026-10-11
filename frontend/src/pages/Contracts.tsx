import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  AlertTriangle,
  Calendar,
  Clock,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { KPICard } from '../components/shared/KPICard';
import { StatusBadge } from '../components/shared/StatusBadge';
import { Contract, PageId } from '../types';
import { MOCK_CONTRACTS } from '../data/mockData';

interface ContractsProps {
  onOpenContractDrawer: (contract: Contract) => void;
  onNavigate: (page: PageId, meta?: any) => void;
}

export const Contracts: React.FC<ContractsProps> = ({
  onOpenContractDrawer,
  onNavigate,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredContracts = MOCK_CONTRACTS.filter((c) => {
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      const matchCode = c.contractCode.toLowerCase().includes(q);
      const matchSup = c.supplierName.toLowerCase().includes(q);
      const matchTitle = c.title.toLowerCase().includes(q);
      if (!matchCode && !matchSup && !matchTitle) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* 1. Header Banner & Top Status Summary */}
      <div className="bg-[#211B24] border border-[#3D3342] rounded-lg p-5 shadow-panel space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#3D3342]/60 pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[10px] tracking-widest text-[#B8A06A] uppercase font-bold">
                LEGAL GOVERNANCE // CONTRACT INTELLIGENCE RADAR
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4774C] animate-pulse" />
            </div>
            <h2 className="font-editorial text-2xl font-bold text-[#F3EBDD]">
              Contract Intelligence & Lifecycle
            </h2>
            <p className="text-xs text-[#A99EAA] mt-0.5">
              Continuous monitoring across 84 Master Supply Agreements to prevent uncontracted purchasing leakage and off-tariff pricing.
            </p>
          </div>

          <button
            onClick={() => onNavigate('what-if')}
            className="px-3.5 py-2 rounded bg-[#D4774C] hover:bg-[#E28E67] text-[#17131A] text-xs font-mono font-bold flex items-center gap-1.5 transition-colors shrink-0 shadow-sm"
          >
            <Sliders size={13} />
            <span>Simulate Expiring MSA Terms</span>
          </button>
        </div>

        {/* 4 Cards: 84 ACTIVE, 7 EXPIRING <30 DAYS, 4 AT RISK, ₹21.4L LEAKAGE */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-[#1A141D] p-3 rounded border border-[#3D3342]/70">
            <span className="text-[10px] font-mono text-[#A99EAA] block uppercase">ACTIVE CONTRACTS</span>
            <span className="font-editorial text-2xl font-bold text-[#F3EBDD]">84 ACTIVE</span>
            <span className="text-[9px] text-[#A99EAA] font-mono block">Framework agreements</span>
          </div>

          <div className="bg-[#1A141D] p-3 rounded border border-[#D4774C]/50">
            <span className="text-[10px] font-mono text-[#E28E67] block uppercase">EXPIRING &lt;30 DAYS</span>
            <span className="font-editorial text-2xl font-bold text-[#D4774C]">7 EXPIRING</span>
            <span className="text-[9px] text-[#D4774C] font-mono block">MSA-APEX in 18 days</span>
          </div>

          <div className="bg-[#1A141D] p-3 rounded border border-[#C95C5C]/50">
            <span className="text-[10px] font-mono text-[#E68585] block uppercase">SLA AT RISK</span>
            <span className="font-editorial text-2xl font-bold text-[#C95C5C]">4 AT RISK</span>
            <span className="text-[9px] text-[#C95C5C] font-mono block">SLA breach notice issued</span>
          </div>

          <div className="bg-[#1A141D] p-3 rounded border border-[#B8A06A]/40">
            <span className="text-[10px] font-mono text-[#B8A06A] block uppercase">CONTRACT LEAKAGE</span>
            <span className="font-editorial text-2xl font-bold text-[#B8A06A]">₹21.4L</span>
            <span className="text-[9px] text-[#A99EAA] font-mono block">Annual uncontracted exposure</span>
          </div>
        </div>
      </div>

      {/* 2. Contract Expiry Horizon Timeline Visualizer */}
      <div className="bg-[#211B24] border border-[#3D3342] rounded-lg p-5 shadow-panel space-y-3">
        <div className="flex items-center justify-between border-b border-[#3D3342]/60 pb-2">
          <span className="kpi-label text-[#B8A06A] font-mono text-xs font-bold">
            CONTRACT EXPIRY HORIZON // CRITICAL RENEWAL TIMELINE
          </span>
          <span className="text-[10px] font-mono text-[#C95C5C]">
            Immediate action required for Q2 expiries
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3 rounded bg-[#2D1B22] border border-[#C95C5C]/50 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[#E68585] font-bold">HORIZON 1: &lt; 30 DAYS</span>
              <span className="text-[9px] px-1 rounded bg-[#C95C5C] text-white">CRITICAL</span>
            </div>
            <div className="font-bold text-[#F3EBDD] font-sans">
              MSA-APEX-2024-09 (Apex Industrial)
            </div>
            <div className="text-[11px] text-[#A99EAA]">
              Expires in <strong>18 days</strong> (Apr 26, 2026). Value: ₹4.20 Cr. Off-tariff price variance risk: +17.2%.
            </div>
          </div>

          <div className="p-3 rounded bg-[#2A2027] border border-[#D6A45D]/50 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[#E5BF88] font-bold">HORIZON 2: 30 - 60 DAYS</span>
              <span className="text-[9px] px-1 rounded bg-[#D6A45D]/30 text-[#E5BF88]">WARNING</span>
            </div>
            <div className="font-bold text-[#F3EBDD] font-sans">
              LTA-ORION-2025-01 (Orion Materials)
            </div>
            <div className="text-[11px] text-[#A99EAA]">
              Expires in <strong>34 days</strong> (May 12, 2026). Value: ₹2.10 Cr. Unindexed steel surcharge dispute.
            </div>
          </div>

          <div className="p-3 rounded bg-[#1A141D] border border-[#3D3342]/60 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[#8FAF78] font-bold">HORIZON 3: 60 - 90 DAYS</span>
              <span className="text-[9px] px-1 rounded bg-[#8FAF78]/20 text-[#A8C992]">MONITORING</span>
            </div>
            <div className="font-bold text-[#F3EBDD] font-sans">
              SUB-NORTHSTAR-2025-07
            </div>
            <div className="text-[11px] text-[#A99EAA]">
              Expires in <strong>83 days</strong> (Jun 30, 2026). Value: ₹1.85 Cr. Hydraulic cylinder QA audit.
            </div>
          </div>
        </div>
      </div>

      {/* 3. Dense Contract Table */}
      <div className="bg-[#211B24] border border-[#3D3342] rounded-lg p-5 shadow-panel space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#3D3342]/70 pb-3">
          <div className="flex items-center gap-2">
            <span className="kpi-label text-[#B8A06A] font-mono text-xs font-bold">
              ACTIVE CONTRACT REGISTER
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#17131A] text-[#F3EBDD] border border-[#3D3342]">
              {filteredContracts.length} Contracts
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#A99EAA]" />
              <input
                type="text"
                placeholder="Search contract code, vendor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1 bg-[#17131A] border border-[#3D3342] rounded text-xs text-[#F3EBDD] placeholder-[#A99EAA]/60 focus:outline-none focus:border-[#D4774C]"
              />
            </div>

            {/* Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#17131A] border border-[#3D3342] rounded px-2.5 py-1 text-xs text-[#F3EBDD] font-mono"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="EXPIRING_SOON">Expiring Soon</option>
              <option value="AT_RISK">At Risk</option>
              <option value="UNDER_REVIEW">Under Review</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded border border-[#3D3342]/60">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#17131A] text-[#A99EAA] font-mono text-[10px] uppercase tracking-wider border-b border-[#3D3342]/70 sticky top-0">
              <tr>
                <th className="py-2.5 px-3">Contract Code & Title</th>
                <th className="py-2.5 px-3">Supplier Name</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Contract Value</th>
                <th className="py-2.5 px-3">Expiry Horizon</th>
                <th className="py-2.5 px-3">SLA Adherence</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Leakage Exposure</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3D3342]/40 bg-[#1D1720]">
              {filteredContracts.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => onOpenContractDrawer(c)}
                  className="hover:bg-[#2A222D] transition-colors cursor-pointer group"
                >
                  <td className="py-2.5 px-3">
                    <div className="font-mono font-bold text-[#F3EBDD] group-hover:text-[#D4774C]">
                      {c.contractCode}
                    </div>
                    <div className="text-[11px] text-[#A99EAA] font-sans truncate max-w-xs">
                      {c.title}
                    </div>
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-[#F3EBDD]">
                    {c.supplierName}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-[#A99EAA]">
                    {c.category}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-[#F3EBDD]">
                    ₹{c.valueCr} Cr
                  </td>
                  <td className="py-2.5 px-3 font-mono">
                    <span
                      className={`font-bold ${
                        c.daysToExpiry <= 30 ? 'text-[#C95C5C]' : c.daysToExpiry <= 90 ? 'text-[#D6A45D]' : 'text-[#8FAF78]'
                      }`}
                    >
                      {c.daysToExpiry} Days
                    </span>
                    <div className="text-[10px] text-[#7C727D]">{c.expiryDate}</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono">
                    <span className={c.slaAdherencePct < 80 ? 'text-[#C95C5C] font-bold' : 'text-[#8FAF78]'}>
                      {c.slaAdherencePct}%
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <StatusBadge type="contract" value={c.status} />
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-[#C95C5C]">
                    ₹{c.leakageLakhs}L
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="font-mono text-[10px] text-[#D4774C] group-hover:underline">
                      Inspect →
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
