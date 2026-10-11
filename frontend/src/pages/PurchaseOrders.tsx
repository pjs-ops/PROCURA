import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Search,
  Filter,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Calendar,
  Layers,
  Building2,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';
import { KPICard } from '../components/shared/KPICard';
import { StatusBadge } from '../components/shared/StatusBadge';
import { PurchaseOrder, PageId, POStatus } from '../types';
import { MOCK_PURCHASE_ORDERS, MOCK_SUPPLIERS, CATEGORIES } from '../data/mockData';

interface PurchaseOrdersProps {
  onOpenPODrawer: (po: PurchaseOrder) => void;
  onNavigate: (page: PageId, meta?: any) => void;
}

export const PurchaseOrders: React.FC<PurchaseOrdersProps> = ({
  onOpenPODrawer,
  onNavigate,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [supplierFilter, setSupplierFilter] = useState<string>('ALL');

  const filteredOrders = MOCK_PURCHASE_ORDERS.filter((po) => {
    if (statusFilter !== 'ALL' && po.status !== statusFilter) return false;
    if (categoryFilter !== 'ALL' && po.category !== categoryFilter) return false;
    if (supplierFilter !== 'ALL' && po.supplierId !== supplierFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      const matchNo = po.poNumber.toLowerCase().includes(q);
      const matchSup = po.supplierName.toLowerCase().includes(q);
      const matchCat = po.category.toLowerCase().includes(q);
      if (!matchNo && !matchSup && !matchCat) return false;
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
                LOGISTICS & VELOCITY // PO CONTROL TOWER
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8FAF78] animate-pulse" />
            </div>
            <h2 className="font-editorial text-2xl font-bold text-[#F3EBDD]">
              Purchase Order Control Tower
            </h2>
            <p className="text-xs text-[#A99EAA] mt-0.5">
              Live tracking of 1,284 open purchase orders across 25 tier-1 vendors with automated delay exception detection.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-[#A99EAA]">TOTAL QUEUE VALUE:</span>
            <span className="text-base font-bold text-[#F3EBDD] px-2 py-0.5 rounded bg-[#17131A] border border-[#3D3342]">
              ₹4.82 Cr
            </span>
          </div>
        </div>

        {/* 4 Metric Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-[#1A141D] p-3 rounded border border-[#3D3342]/70">
            <span className="text-[10px] font-mono text-[#A99EAA] block uppercase">ACTIVE PO QUEUE</span>
            <span className="font-editorial text-2xl font-bold text-[#F3EBDD]">1,284</span>
            <span className="text-[9px] text-[#A99EAA] font-mono block">Across 6 BUs</span>
          </div>

          <div className="bg-[#1A141D] p-3 rounded border border-[#8FAF78]/40">
            <span className="text-[10px] font-mono text-[#8FAF78] block uppercase">74% ON TRACK</span>
            <span className="font-editorial text-2xl font-bold text-[#8FAF78]">950 POs</span>
            <span className="text-[9px] text-[#A99EAA] font-mono block">Zero transit drift</span>
          </div>

          <div className="bg-[#1A141D] p-3 rounded border border-[#D6A45D]/40">
            <span className="text-[10px] font-mono text-[#E5BF88] block uppercase">18% AT RISK</span>
            <span className="font-editorial text-2xl font-bold text-[#D6A45D]">231 POs</span>
            <span className="text-[9px] text-[#A99EAA] font-mono block">Port congestion warning</span>
          </div>

          <div className="bg-[#1A141D] p-3 rounded border border-[#C95C5C]/50">
            <span className="text-[10px] font-mono text-[#E68585] block uppercase">8% DELAYED</span>
            <span className="font-editorial text-2xl font-bold text-[#C95C5C]">103 POs</span>
            <span className="text-[9px] text-[#C95C5C] font-mono block">SLA Breached</span>
          </div>
        </div>
      </div>

      {/* 2. PO Velocity Timeline Visualizer Strip */}
      <div className="bg-[#211B24] border border-[#3D3342] rounded-lg p-5 shadow-panel">
        <div className="flex items-center justify-between mb-3 border-b border-[#3D3342]/60 pb-2">
          <span className="kpi-label text-[#B8A06A] font-mono text-xs font-bold">
            DELIVERY HORIZON TIMELINE // CRITICAL PATH EXCEPTION HIGHLIGHTS
          </span>
          <span className="text-[10px] font-mono text-[#A99EAA]">
            Next 30 Days Scheduled Dispatches
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-mono text-xs">
          <div className="bg-[#1A141D] p-3 rounded border border-[#3D3342]/60 space-y-1">
            <span className="text-[10px] text-[#A99EAA] block">APR 02 - APR 08</span>
            <div className="font-bold text-[#F3EBDD] flex items-center justify-between">
              <span>Week 1 Dispatches</span>
              <span className="text-[#C95C5C]">2 Exceptions</span>
            </div>
            <div className="text-[10px] text-[#A99EAA] font-sans">
              PO-10921 slipped +16d (Apex Titan Housing)
            </div>
          </div>

          <div className="bg-[#1A141D] p-3 rounded border border-[#3D3342]/60 space-y-1">
            <span className="text-[10px] text-[#A99EAA] block">APR 09 - APR 15</span>
            <div className="font-bold text-[#F3EBDD] flex items-center justify-between">
              <span>Week 2 Dispatches</span>
              <span className="text-[#D6A45D]">3 At Risk</span>
            </div>
            <div className="text-[10px] text-[#A99EAA] font-sans">
              JNPT ocean container transit queue delay
            </div>
          </div>

          <div className="bg-[#1A141D] p-3 rounded border border-[#3D3342]/60 space-y-1">
            <span className="text-[10px] text-[#A99EAA] block">APR 16 - APR 22</span>
            <div className="font-bold text-[#F3EBDD] flex items-center justify-between">
              <span>Week 3 Dispatches</span>
              <span className="text-[#8FAF78]">94% On Track</span>
            </div>
            <div className="text-[10px] text-[#A99EAA] font-sans">
              Vertex automotive chips dispatch on schedule
            </div>
          </div>

          <div className="bg-[#1A141D] p-3 rounded border border-[#3D3342]/60 space-y-1">
            <span className="text-[10px] text-[#A99EAA] block">APR 23 - APR 30</span>
            <div className="font-bold text-[#F3EBDD] flex items-center justify-between">
              <span>Week 4 Dispatches</span>
              <span className="text-[#8FAF78]">Scheduled</span>
            </div>
            <div className="text-[10px] text-[#A99EAA] font-sans">
              Monthly reconciliation & customs clearance
            </div>
          </div>
        </div>
      </div>

      {/* 3. Filter Controls & Search */}
      <div className="bg-[#211B24] border border-[#3D3342] rounded-lg p-5 shadow-panel space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#3D3342]/70 pb-3">
          <div className="flex items-center gap-2">
            <span className="kpi-label text-[#B8A06A] font-mono text-xs font-bold">
              OPERATIONAL ORDERS QUEUE
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#17131A] text-[#F3EBDD] border border-[#3D3342]">
              {filteredOrders.length} Matching Orders
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#A99EAA]" />
              <input
                type="text"
                placeholder="Search PO#, supplier..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1 bg-[#17131A] border border-[#3D3342] rounded text-xs text-[#F3EBDD] placeholder-[#A99EAA]/60 focus:outline-none focus:border-[#D4774C]"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#17131A] border border-[#3D3342] rounded px-2.5 py-1 text-xs text-[#F3EBDD] font-mono"
            >
              <option value="ALL">All Statuses</option>
              <option value="ON_TRACK">On Track</option>
              <option value="AT_RISK">At Risk</option>
              <option value="DELAYED">Delayed</option>
            </select>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-[#17131A] border border-[#3D3342] rounded px-2.5 py-1 text-xs text-[#F3EBDD] font-mono"
            >
              <option value="ALL">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dense Enterprise Table */}
        <div className="overflow-x-auto rounded border border-[#3D3342]/60">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#17131A] text-[#A99EAA] font-mono text-[10px] uppercase tracking-wider border-b border-[#3D3342]/70 sticky top-0">
              <tr>
                <th className="py-2.5 px-3">PO Number</th>
                <th className="py-2.5 px-3">Supplier Name</th>
                <th className="py-2.5 px-3">Category & BU</th>
                <th className="py-2.5 px-3">Value (Lakhs)</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Promised ➔ Expected ETA</th>
                <th className="py-2.5 px-3">Risk Vector</th>
                <th className="py-2.5 px-3 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#3D3342]/40 bg-[#1D1720]">
              {filteredOrders.map((po) => (
                <tr
                  key={po.id}
                  onClick={() => onOpenPODrawer(po)}
                  className="hover:bg-[#2A222D] transition-colors cursor-pointer group"
                >
                  <td className="py-2.5 px-3 font-mono font-bold text-[#F3EBDD] group-hover:text-[#D4774C]">
                    {po.poNumber}
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-[#F3EBDD]">{po.supplierName}</div>
                    <div className="text-[10px] text-[#A99EAA] font-mono">{po.itemsCount} SKUs</div>
                  </td>
                  <td className="py-2.5 px-3 text-[#A99EAA] font-mono text-[11px]">
                    <div>{po.category}</div>
                    <div className="text-[10px] text-[#7C727D]">{po.businessUnit}</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-[#F3EBDD]">
                    ₹{po.valueLakhs}L
                  </td>
                  <td className="py-2.5 px-3">
                    <StatusBadge type="po" value={po.status} />
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px]">
                    <div className="text-[#A99EAA]">{po.promisedDeliveryDate}</div>
                    <div className={`font-bold ${po.status === 'DELAYED' ? 'text-[#C95C5C]' : 'text-[#8FAF78]'}`}>
                      ➔ {po.expectedDeliveryDate}
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    {po.riskReason ? (
                      <span className="text-[11px] text-[#E68585] font-sans truncate max-w-[200px] block">
                        {po.riskReason}
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-[#8FAF78]">Normal transit</span>
                    )}
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
