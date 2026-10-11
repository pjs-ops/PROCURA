import React, { useState } from 'react';
import { ArrowRight, Layers, Building2, Truck, CheckCircle2 } from 'lucide-react';
import { PageId } from '../../types';

interface SpendFlowSankeyProps {
  onNavigateToSupplier?: (supplierId: string) => void;
  onNavigateToCategory?: (category: string) => void;
}

export const SpendFlowSankey: React.FC<SpendFlowSankeyProps> = ({
  onNavigateToSupplier,
}) => {
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>('Apex Industrial');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const suppliers = [
    { id: 'Apex Industrial', fullId: 'sup-apex', name: 'Apex Industrial', spend: '₹3.84 Cr', pct: '20.8%', cat: 'Mechanical Components', bu: 'Advanced Operations', risk: 'HIGH' },
    { id: 'Meridian Logistics', fullId: 'sup-meridian', name: 'Meridian Logistics', spend: '₹2.45 Cr', pct: '13.3%', cat: 'Logistics & Freight', bu: 'Global Retail Logistics', risk: 'MEDIUM' },
    { id: 'Vertex Electronics', fullId: 'sup-vertex', name: 'Vertex Electronics', spend: '₹2.12 Cr', pct: '11.5%', cat: 'Electronics & Chips', bu: 'Consumer Hardware', risk: 'LOW' },
    { id: 'Northstar Mfg', fullId: 'sup-northstar', name: 'Northstar Mfg', spend: '₹1.68 Cr', pct: '9.1%', cat: 'Mechanical Components', bu: 'Industrial Infra', risk: 'HIGH' },
    { id: 'Orion Materials', fullId: 'sup-orion', name: 'Orion Materials', spend: '₹1.54 Cr', pct: '8.4%', cat: 'Raw Materials & Steel', bu: 'Industrial Infra', risk: 'CRITICAL' },
    { id: 'Solis Power', fullId: 'sup-solis', name: 'Solis Power', spend: '₹0.94 Cr', pct: '5.1%', cat: 'Facility & Energy', bu: 'Clean Energy Mobility', risk: 'LOW' },
    { id: 'Other 19 Vendors', fullId: '', name: 'Other 19 Vendors', spend: '₹5.85 Cr', pct: '31.8%', cat: 'Multi-Category Blend', bu: 'All Units', risk: 'MIXED' },
  ];

  const categories = [
    { name: 'Mechanical Components', spend: '₹6.40 Cr', pct: '34.7%' },
    { name: 'Electronics & Chips', spend: '₹3.82 Cr', pct: '20.7%' },
    { name: 'Logistics & Freight', spend: '₹3.03 Cr', pct: '16.5%' },
    { name: 'Raw Materials & Steel', spend: '₹2.22 Cr', pct: '12.1%' },
    { name: 'Facility & Energy', spend: '₹1.12 Cr', pct: '6.1%' },
    { name: 'Chemicals, MRO & Pack', spend: '₹1.83 Cr', pct: '9.9%' },
  ];

  const businessUnits = [
    { name: 'Advanced Operations', spend: '₹5.70 Cr', pct: '31.0%' },
    { name: 'Consumer Hardware', spend: '₹3.90 Cr', pct: '21.2%' },
    { name: 'Industrial Infra', spend: '₹3.20 Cr', pct: '17.4%' },
    { name: 'Aerospace & Defense', spend: '₹2.56 Cr', pct: '13.9%' },
    { name: 'Clean Energy Mobility', spend: '₹1.84 Cr', pct: '10.0%' },
    { name: 'Global Retail Logistics', spend: '₹1.22 Cr', pct: '6.5%' },
  ];

  return (
    <div className="bg-[#211B24] border border-[#3D3342] rounded-lg p-5 shadow-panel">
      {/* Title bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-[#3D3342]/70 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="kpi-label text-[#B8A06A] font-mono tracking-widest font-semibold text-xs">
              INTERACTIVE ARCHITECTURE // SPEND FLOW MAP
            </span>
            <span className="text-[10px] font-mono text-[#D4774C] px-1.5 py-0.5 rounded bg-[#D4774C]/10 border border-[#D4774C]/30">
              SUPPLIERS → CATEGORIES → BUSINESS UNITS
            </span>
          </div>
          <p className="text-xs text-[#A99EAA] mt-0.5">
            Macro capital trajectory mapping ₹18.42 Cr across vendors, category classifications, and operational units.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[#A99EAA]">Active Flow Node:</span>
          <span className="px-2 py-0.5 rounded bg-[#2A222D] text-[#F3EBDD] border border-[#B8A06A]/40 font-bold">
            {selectedSupplier || 'All Flow Channels'}
          </span>
        </div>
      </div>

      {/* 3-Column Visual Flow Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* Column 1: Suppliers */}
        <div className="space-y-2">
          <div className="flex items-center justify-between pb-1 text-[11px] font-mono uppercase tracking-wider text-[#A99EAA] border-b border-[#3D3342]/60">
            <span className="flex items-center gap-1.5">
              <Truck size={13} className="text-[#D4774C]" />
              1. Suppliers (25)
            </span>
            <span>Spend Share</span>
          </div>
          <div className="space-y-1.5">
            {suppliers.map((s) => {
              const isSelected = selectedSupplier === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => {
                    setSelectedSupplier(s.id);
                    if (s.fullId && onNavigateToSupplier) onNavigateToSupplier(s.fullId);
                  }}
                  onMouseEnter={() => setHoveredNode(s.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`p-2.5 rounded border transition-all cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? 'bg-[#2E2432] border-[#D4774C] shadow-glow-copper'
                      : 'bg-[#1A141D] border-[#3D3342]/70 hover:border-[#B8A06A]/50 hover:bg-[#241D27]'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold ${isSelected ? 'text-[#F3EBDD]' : 'text-[#E5DCDE] group-hover:text-[#F3EBDD]'}`}>
                        {s.name}
                      </span>
                      {s.risk !== 'MIXED' && (
                        <span className={`text-[8px] font-mono px-1 rounded ${
                          s.risk === 'CRITICAL' ? 'bg-[#C95C5C]/20 text-[#E68585]' :
                          s.risk === 'HIGH' ? 'bg-[#C95C5C]/20 text-[#E68585]' :
                          s.risk === 'MEDIUM' ? 'bg-[#D6A45D]/20 text-[#E5BF88]' :
                          'bg-[#8FAF78]/20 text-[#A8C992]'
                        }`}>
                          {s.risk}
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-[#A99EAA] font-mono mt-0.5">
                      {s.cat}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs font-bold text-[#F3EBDD]">
                      {s.spend}
                    </div>
                    <div className="text-[10px] text-[#B8A06A] font-mono">
                      {s.pct}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: Categories */}
        <div className="space-y-2">
          <div className="flex items-center justify-between pb-1 text-[11px] font-mono uppercase tracking-wider text-[#A99EAA] border-b border-[#3D3342]/60">
            <span className="flex items-center gap-1.5">
              <Layers size={13} className="text-[#B8A06A]" />
              2. Categories (8)
            </span>
            <span>Allocated</span>
          </div>
          <div className="space-y-1.5">
            {categories.map((c) => {
              const matchesSelected = selectedSupplier === 'Apex Industrial' && c.name.includes('Mechanical') ||
                selectedSupplier === 'Meridian Logistics' && c.name.includes('Logistics') ||
                selectedSupplier === 'Vertex Electronics' && c.name.includes('Electronics') ||
                selectedSupplier === 'Orion Materials' && c.name.includes('Steel');

              return (
                <div
                  key={c.name}
                  className={`p-2.5 rounded border transition-all flex items-center justify-between ${
                    matchesSelected
                      ? 'bg-[#2E2432] border-[#B8A06A] shadow-glow-gold'
                      : 'bg-[#1A141D] border-[#3D3342]/70 hover:border-[#3D3342]'
                  }`}
                >
                  <div>
                    <div className={`text-xs font-semibold ${matchesSelected ? 'text-[#F3EBDD]' : 'text-[#E5DCDE]'}`}>
                      {c.name}
                    </div>
                    <div className="text-[10px] text-[#A99EAA] font-mono mt-0.5">
                      Concentration: {c.pct}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs font-bold text-[#F3EBDD]">
                      {c.spend}
                    </div>
                    <div className="text-[10px] text-[#B8A06A] font-mono">
                      {c.pct}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 3: Business Units */}
        <div className="space-y-2">
          <div className="flex items-center justify-between pb-1 text-[11px] font-mono uppercase tracking-wider text-[#A99EAA] border-b border-[#3D3342]/60">
            <span className="flex items-center gap-1.5">
              <Building2 size={13} className="text-[#8FAF78]" />
              3. Business Units (6)
            </span>
            <span>Absorbed</span>
          </div>
          <div className="space-y-1.5">
            {businessUnits.map((bu) => {
              const matchesSelected = (selectedSupplier === 'Apex Industrial' && bu.name === 'Advanced Operations') ||
                (selectedSupplier === 'Meridian Logistics' && bu.name === 'Global Retail Logistics') ||
                (selectedSupplier === 'Vertex Electronics' && bu.name === 'Consumer Hardware');

              return (
                <div
                  key={bu.name}
                  className={`p-2.5 rounded border transition-all flex items-center justify-between ${
                    matchesSelected
                      ? 'bg-[#2E2432] border-[#8FAF78] shadow-sm'
                      : 'bg-[#1A141D] border-[#3D3342]/70 hover:border-[#3D3342]'
                  }`}
                >
                  <div>
                    <div className={`text-xs font-semibold ${matchesSelected ? 'text-[#F3EBDD]' : 'text-[#E5DCDE]'}`}>
                      {bu.name}
                    </div>
                    <div className="text-[10px] text-[#A99EAA] font-mono mt-0.5">
                      Budget Utilization: 94.2%
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs font-bold text-[#F3EBDD]">
                      {bu.spend}
                    </div>
                    <div className="text-[10px] text-[#8FAF78] font-mono">
                      {bu.pct}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Flow Diagnostic Bar */}
      <div className="mt-4 pt-3 border-t border-[#3D3342]/60 flex flex-wrap items-center justify-between gap-3 text-xs bg-[#1A141D] p-3 rounded">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={15} className="text-[#D4774C]" />
          <span className="text-[#F3EBDD] font-medium">
            Path Analysis: <span className="font-mono text-[#D4774C]">Apex Industrial Components</span> supplies <span className="font-mono text-[#B8A06A]">Mechanical Components & CNC</span> directly into <span className="font-mono text-[#8FAF78]">Advanced Operations</span>.
          </span>
        </div>
        <button
          onClick={() => onNavigateToSupplier && onNavigateToSupplier('sup-apex')}
          className="font-mono text-[11px] text-[#D4774C] hover:text-[#E28E67] font-semibold flex items-center gap-1 group"
        >
          Inspect Apex Supplier DNA <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
