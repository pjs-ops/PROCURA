import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  Cell
} from 'recharts';
import {
  TrendingUp,
  Layers,
  Building2,
  Users,
  AlertCircle,
  ArrowRight,
  PieChart,
  ChevronRight,
  Filter
} from 'lucide-react';
import { KPICard } from '../components/shared/KPICard';
import { PageId } from '../types';
import {
  calculateSpendByCategory,
  calculateSpendByBusinessUnit,
  MOCK_SUPPLIERS
} from '../data/mockData';

interface SpendIntelligenceProps {
  onNavigate: (page: PageId, meta?: any) => void;
}

export const SpendIntelligence: React.FC<SpendIntelligenceProps> = ({ onNavigate }) => {
  const [selectedView, setSelectedView] = useState<'category' | 'supplier' | 'bu'>('category');
  const categories = calculateSpendByCategory();
  const businessUnits = calculateSpendByBusinessUnit();

  // Top 5 Suppliers Concentration
  const topSuppliers = [...MOCK_SUPPLIERS]
    .sort((a, b) => b.spendValueCr - a.spendValueCr)
    .slice(0, 5);

  const monthlyTrendData = [
    { month: 'Oct 25', actualCr: 1.48, lastYearCr: 1.36 },
    { month: 'Nov 25', actualCr: 1.55, lastYearCr: 1.42 },
    { month: 'Dec 25', actualCr: 1.62, lastYearCr: 1.50 },
    { month: 'Jan 26', actualCr: 1.58, lastYearCr: 1.46 },
    { month: 'Feb 26', actualCr: 1.71, lastYearCr: 1.57 },
    { month: 'Mar 26', actualCr: 1.76, lastYearCr: 1.61 },
  ];

  const categoryBarData = categories.map((c) => ({
    name: c.category.split(' ')[0],
    fullName: c.category,
    spendCr: c.spendCr,
    pct: c.pct,
  }));

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Top Header Banner with Spend Concentration Callout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Summary KPIs */}
        <div className="lg:col-span-7 bg-[#211B24] border border-[#3D3342] rounded-lg p-5 shadow-panel space-y-4">
          <div className="flex items-center justify-between border-b border-[#3D3342]/60 pb-3">
            <div>
              <span className="kpi-label text-[#B8A06A] font-mono text-xs font-bold">
                SPEND INTELLIGENCE // ANALYTICS DEEP DIVE
              </span>
              <h2 className="font-editorial text-2xl font-bold text-[#F3EBDD] mt-0.5">
                Procurement Capital Allocation
              </h2>
            </div>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#2A222D] text-[#D4774C] border border-[#D4774C]/30">
              YoY +8.4%
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#1A141D] p-3 rounded border border-[#3D3342]/70">
              <span className="text-[10px] font-mono text-[#A99EAA] block">TOTAL ACTIVE SPEND</span>
              <span className="font-editorial text-xl font-bold text-[#F3EBDD]">₹18.42 Cr</span>
              <span className="text-[9px] text-[#8FAF78] font-mono block">8 Categories</span>
            </div>
            <div className="bg-[#1A141D] p-3 rounded border border-[#3D3342]/70">
              <span className="text-[10px] font-mono text-[#A99EAA] block">TOP CATEGORY SHARE</span>
              <span className="font-editorial text-xl font-bold text-[#D4774C]">34.7%</span>
              <span className="text-[9px] text-[#A99EAA] font-mono block">Mechanical & CNC</span>
            </div>
            <div className="bg-[#1A141D] p-3 rounded border border-[#3D3342]/70">
              <span className="text-[10px] font-mono text-[#A99EAA] block">TOP BUSINESS UNIT</span>
              <span className="font-editorial text-xl font-bold text-[#B8A06A]">₹5.70 Cr</span>
              <span className="text-[9px] text-[#A99EAA] font-mono block">Advanced Operations</span>
            </div>
          </div>
        </div>

        {/* Right: Signature Concentration Visual Indicator */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#291E28] via-[#211B24] to-[#1A141D] border border-[#D4774C]/40 rounded-lg p-5 shadow-panel flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] tracking-widest text-[#D4774C] uppercase font-bold">
                SUPPLIER CONCENTRATION RISK
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#C95C5C]/20 text-[#E68585] font-bold">
                HIGH THRESHOLD
              </span>
            </div>

            <div className="text-sm font-sans text-[#E5DCDE] leading-snug">
              Top 5 suppliers represent <strong className="font-editorial text-xl text-[#F3EBDD]">48.7%</strong> of total procurement spend (₹8.97 Cr out of ₹18.42 Cr).
            </div>
          </div>

          <div className="my-3 space-y-1.5">
            <div className="flex justify-between text-[10px] font-mono text-[#A99EAA]">
              <span>Concentration Index</span>
              <span className="text-[#D4774C] font-bold">48.7% / Policy Max 35%</span>
            </div>
            <div className="w-full bg-[#17131A] h-2.5 rounded-full overflow-hidden border border-[#3D3342]/80">
              <div className="h-full bg-gradient-to-r from-[#D4774C] via-[#B8A06A] to-[#C95C5C] rounded-full w-[48.7%]" />
            </div>
          </div>

          <button
            onClick={() => onNavigate('what-if')}
            className="w-full py-2 rounded bg-[#2A222D] hover:bg-[#342B38] text-[#F3EBDD] border border-[#D4774C]/50 text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            Simulate Concentration Diversification →
          </button>
        </div>
      </div>

      {/* Monthly Spend Trend & YoY Comparison */}
      <div className="bg-[#211B24] border border-[#3D3342] rounded-lg p-5 shadow-panel">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-[#3D3342]/70 pb-3">
          <div>
            <span className="kpi-label text-[#B8A06A] font-mono text-xs font-bold">
              TEMPORAL DYNAMICS // MONTHLY SPEND & YoY COMPARISON
            </span>
            <p className="text-xs text-[#A99EAA] mt-0.5">
              Tracking monthly commitment velocity against corresponding prior-year baseline.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-[#A99EAA]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4774C]" /> Current Year (FY26)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-[#B8A06A]" /> Prior Year (FY25)
            </span>
          </div>
        </div>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid stroke="#2E2632" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" stroke="#7C727D" tick={{ fill: '#A99EAA', fontSize: 11, fontFamily: 'JetBrains Mono' }} />
              <YAxis stroke="#7C727D" domain={[1.2, 2.0]} tick={{ fill: '#A99EAA', fontSize: 10, fontFamily: 'JetBrains Mono' }} tickFormatter={(v) => `₹${v} Cr`} />
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
              <Line type="monotone" dataKey="actualCr" stroke="#D4774C" strokeWidth={2.5} dot={{ fill: '#D4774C', r: 4 }} name="FY26 Actual" />
              <Line type="monotone" dataKey="lastYearCr" stroke="#B8A06A" strokeWidth={1.5} strokeDasharray="4 4" dot={{ fill: '#B8A06A', r: 3 }} name="FY25 Baseline" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Spend By Category & By Supplier Split Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Categories Bar Breakdown (Col 7) */}
        <div className="lg:col-span-7 bg-[#211B24] border border-[#3D3342] rounded-lg p-5 shadow-panel">
          <div className="flex items-center justify-between mb-4 border-b border-[#3D3342]/70 pb-3">
            <span className="kpi-label text-[#B8A06A] font-mono text-xs font-bold">
              CATEGORY STRATIFICATION // 8 DOMAINS
            </span>
            <span className="text-[10px] font-mono text-[#A99EAA]">
              Ranked by Capital Volume
            </span>
          </div>

          <div className="space-y-2.5">
            {categories.map((c, idx) => (
              <div
                key={c.category}
                className="p-2.5 rounded bg-[#1A141D] border border-[#3D3342]/60 hover:border-[#D4774C]/40 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[10px] text-[#A99EAA] w-4">
                    #{idx + 1}
                  </span>
                  <div>
                    <div className="text-xs font-semibold text-[#F3EBDD]">
                      {c.category}
                    </div>
                    <div className="text-[10px] text-[#A99EAA] font-mono">
                      {c.count} Suppliers • Growth: {c.trend}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right font-mono">
                  <div>
                    <div className="text-xs font-bold text-[#F3EBDD]">
                      ₹{c.spendCr} Cr
                    </div>
                    <div className="text-[10px] text-[#B8A06A]">
                      {c.pct}% share
                    </div>
                  </div>
                  <div className="w-16 bg-[#211B24] h-2 rounded-full overflow-hidden border border-[#3D3342]">
                    <div className="bg-[#D4774C] h-full rounded-full" style={{ width: `${c.pct * 2.5}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Concentrated Suppliers (Col 5) */}
        <div className="lg:col-span-5 bg-[#211B24] border border-[#3D3342] rounded-lg p-5 shadow-panel space-y-3">
          <div className="flex items-center justify-between border-b border-[#3D3342]/70 pb-3">
            <span className="kpi-label text-[#D4774C] font-mono text-xs font-bold">
              TOP 5 STRATEGIC SUPPLIERS (48.7%)
            </span>
            <button
              onClick={() => onNavigate('suppliers')}
              className="text-[10px] font-mono text-[#D4774C] hover:underline"
            >
              All 25 →
            </button>
          </div>

          <div className="space-y-2">
            {topSuppliers.map((sup, idx) => (
              <div
                key={sup.id}
                onClick={() => onNavigate('supplier-detail', { supplierId: sup.id })}
                className="p-2.5 rounded bg-[#1A141D] border border-[#3D3342]/70 hover:border-[#D4774C] cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-[#F3EBDD] group-hover:text-[#D4774C] transition-colors">
                    {idx + 1}. {sup.name}
                  </div>
                  <span className={`text-[9px] font-mono px-1 rounded ${
                    sup.riskLevel === 'HIGH' || sup.riskLevel === 'CRITICAL'
                      ? 'bg-[#C95C5C]/20 text-[#E68585]'
                      : 'bg-[#8FAF78]/20 text-[#A8C992]'
                  }`}>
                    {sup.riskLevel}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1 text-[10px] font-mono text-[#A99EAA]">
                  <span>{sup.category}</span>
                  <span className="text-[#F3EBDD] font-bold">₹{sup.spendValueCr} Cr ({sup.spendPercentage}%)</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={() => onNavigate('suppliers')}
              className="text-xs font-mono text-[#B8A06A] hover:text-[#F3EBDD] flex items-center justify-center gap-1 w-full py-1.5 rounded bg-[#1A141D] border border-[#3D3342]/70"
            >
              Open Supplier Constellation Map →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
