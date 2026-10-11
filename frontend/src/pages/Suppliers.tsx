import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  ArrowUpDown,
  ExternalLink,
  ShieldAlert,
  Sliders,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Download
} from 'lucide-react';
import { SupplierConstellation } from '../components/charts/SupplierConstellation';
import { StatusBadge } from '../components/shared/StatusBadge';
import { PageId, Supplier } from '../types';
import { MOCK_SUPPLIERS } from '../data/mockData';

interface SuppliersProps {
  onNavigate: (page: PageId, meta?: any) => void;
  onOpenSupplierDrawer: (supplier: Supplier) => void;
}

export const Suppliers: React.FC<SuppliersProps> = ({
  onNavigate,
  onOpenSupplierDrawer,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortField, setSortField] = useState<'spend' | 'health' | 'risk'>('spend');

  const filteredSuppliers = MOCK_SUPPLIERS.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'All' || s.category === categoryFilter;
    return matchesSearch && matchesCat;
  }).sort((a, b) => {
    if (sortField === 'spend') return b.spendValueCr - a.spendValueCr;
    if (sortField === 'health') return b.healthScore - a.healthScore;
    return 0;
  });

  const categories = ['All', ...new Set(MOCK_SUPPLIERS.map((s) => s.category))];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#211B24] border border-[#3D3342] p-4 md:p-5 rounded-lg shadow-panel">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] tracking-widest text-[#B8A06A] uppercase font-bold">
              VENDOR TOPOLOGY // 25 QUALIFIED ENTERPRISE SUPPLIERS
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8FAF78]" />
          </div>
          <h2 className="font-editorial text-2xl font-bold text-[#F3EBDD]">
            Supplier Constellation & Directory
          </h2>
          <p className="text-xs text-[#A99EAA] mt-0.5">
            Node-based intelligence graph mapping procurement volume, risk intensity, and multi-variable health scores.
          </p>
        </div>

        <button
          onClick={() => onNavigate('what-if')}
          className="px-3.5 py-2 rounded bg-[#2A222D] hover:bg-[#342B38] text-[#F3EBDD] border border-[#D4774C]/50 text-xs font-mono font-medium flex items-center gap-2 transition-colors shrink-0"
        >
          <Sliders size={13} className="text-[#D4774C]" />
          <span>Simulate Vendor Reallocation</span>
        </button>
      </div>

      {/* 1. Primary Experience: SUPPLIER CONSTELLATION NODE MAP */}
      <SupplierConstellation
        suppliers={MOCK_SUPPLIERS}
        onSelectSupplier={(id) => {
          const found = MOCK_SUPPLIERS.find((s) => s.id === id);
          if (found) onOpenSupplierDrawer(found);
        }}
      />

      {/* 2. Compact Enterprise Supplier Table Below */}
      <div className="bg-[#211B24] border border-[#3D3342] rounded-lg p-5 shadow-panel space-y-4">
        {/* Table Filters & Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#3D3342]/70 pb-3">
          <div className="flex items-center gap-2">
            <span className="kpi-label text-[#B8A06A] font-mono text-xs font-bold">
              COMPACT VENDOR DOSSIER TABLE
            </span>
            <span className="text-[10px] font-mono text-[#A99EAA] px-1.5 py-0.5 rounded bg-[#17131A] border border-[#3D3342]">
              {filteredSuppliers.length} Vendors
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#A99EAA]" />
              <input
                type="text"
                placeholder="Filter suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1 bg-[#17131A] border border-[#3D3342] rounded text-xs text-[#F3EBDD] placeholder-[#A99EAA]/60 focus:outline-none focus:border-[#D4774C]"
              />
            </div>

            {/* Category Dropdown Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-[#17131A] border border-[#3D3342] rounded px-2.5 py-1 text-xs text-[#F3EBDD] font-mono focus:outline-none focus:border-[#D4774C]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dense Table */}
        <div className="overflow-x-auto rounded border border-[#3D3342]/60">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#17131A] text-[#A99EAA] font-mono text-[10px] uppercase tracking-wider border-b border-[#3D3342]/70 sticky top-0">
              <tr>
                <th className="py-2.5 px-3">Supplier Name & Hub</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Spend (Cr / Share)</th>
                <th className="py-2.5 px-3">Health</th>
                <th className="py-2.5 px-3">Delivery OTIF</th>
                <th className="py-2.5 px-3">Risk Level</th>
                <th className="py-2.5 px-3">Contract Expiry</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3D3342]/40 bg-[#1D1720]">
              {filteredSuppliers.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => onOpenSupplierDrawer(s)}
                  className="hover:bg-[#2A222D] transition-colors cursor-pointer group"
                >
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-[#F3EBDD] group-hover:text-[#D4774C] transition-colors">
                      {s.name}
                    </div>
                    <div className="text-[10px] text-[#A99EAA] font-mono">
                      {s.country} • Tier: {s.tier}
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-[#A99EAA] font-mono text-[11px]">
                    {s.category}
                  </td>
                  <td className="py-2.5 px-3 font-mono">
                    <div className="text-[#F3EBDD] font-bold">
                      ₹{s.spendValueCr} Cr
                    </div>
                    <div className="text-[10px] text-[#B8A06A]">
                      {s.spendPercentage}%
                    </div>
                  </td>
                  <td className="py-2.5 px-3 font-mono">
                    <span
                      className={`font-bold ${
                        s.healthScore < 80 ? 'text-[#C95C5C]' : s.healthScore < 85 ? 'text-[#D6A45D]' : 'text-[#8FAF78]'
                      }`}
                    >
                      {s.healthScore}/100
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono">
                    <span
                      className={`${
                        s.metrics.delivery < 75 ? 'text-[#C95C5C] font-bold' : 'text-[#E5DCDE]'
                      }`}
                    >
                      {s.metrics.delivery}%
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <StatusBadge type="risk" value={s.riskLevel} />
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-[#A99EAA]">
                    <span className={s.name.includes('Apex') ? 'text-[#C95C5C] font-bold' : ''}>
                      {s.contractExpiryDate}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="font-mono text-[10px] text-[#D4774C] group-hover:underline">
                      Dossier →
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
