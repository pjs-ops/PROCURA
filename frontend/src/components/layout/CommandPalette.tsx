import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Command,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Sliders,
  Bot,
  FileText,
  Users,
  FileSpreadsheet,
  X,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { PageId } from '../../types';
import { MOCK_SUPPLIERS, MOCK_PURCHASE_ORDERS, MOCK_CONTRACTS } from '../../data/mockData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId, meta?: any) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or custom state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter commands and search items
  const staticCommands = [
    { id: 'cmd-what-if', title: 'Open What-If Lab (Digital Twin Simulation)', category: 'Simulate', page: 'what-if' as PageId, icon: Sliders },
    { id: 'cmd-ai', title: 'Open AI Analyst (Procurement Query Engine)', category: 'AI', page: 'ai-analyst' as PageId, icon: Bot },
    { id: 'cmd-risk', title: 'Open Risk Radar (Supply Chain Threats)', category: 'Risk', page: 'risk-radar' as PageId, icon: ShieldAlert },
    { id: 'cmd-savings', title: 'View Savings Opportunities (₹1.84 Cr Pipeline)', category: 'Savings', page: 'savings-lab' as PageId, icon: Sparkles },
    { id: 'cmd-contracts', title: 'View Contracts & Expiries (84 Active)', category: 'Contracts', page: 'contracts' as PageId, icon: FileText },
    { id: 'cmd-suppliers', title: 'Explore Supplier Constellation (25 Vendors)', category: 'Suppliers', page: 'suppliers' as PageId, icon: Users },
    { id: 'cmd-pos', title: 'Open PO Control Tower (1,284 Active)', category: 'Operations', page: 'purchase-orders' as PageId, icon: FileSpreadsheet },
    { id: 'cmd-spend', title: 'Inspect Spend Intelligence & Categories', category: 'Analytics', page: 'spend-intelligence' as PageId, icon: TrendingUp },
  ];

  // Dynamic matching against mock data
  const filteredSuppliers = MOCK_SUPPLIERS.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const filteredPOs = MOCK_PURCHASE_ORDERS.filter(po =>
    po.poNumber.toLowerCase().includes(query.toLowerCase()) ||
    po.supplierName.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const filteredContracts = MOCK_CONTRACTS.filter(c =>
    c.contractCode.toLowerCase().includes(query.toLowerCase()) ||
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.supplierName.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 2);

  const filteredStatic = staticCommands.filter(c =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-2xl bg-[#211B24] border border-[#3D3342] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[80vh] text-[#F3EBDD]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-[#3D3342]/80 bg-[#1D1720]">
          <Search size={18} className="text-[#D4774C] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, supplier (e.g. Apex), PO, or contract..."
            className="w-full bg-transparent border-none outline-none text-[#F3EBDD] placeholder-[#A99EAA]/60 text-sm font-sans"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-[#A99EAA] hover:text-[#F3EBDD] p-1">
              <X size={16} />
            </button>
          )}
          <span className="font-mono text-[10px] text-[#A99EAA] px-1.5 py-0.5 rounded bg-[#2A222D] border border-[#3D3342] ml-2">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-3">
          {/* Static Commands */}
          {filteredStatic.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] font-mono tracking-widest text-[#B8A06A] uppercase font-semibold">
                Intelligence Commands
              </div>
              <div className="space-y-0.5">
                {filteredStatic.map((cmd) => {
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => {
                        onNavigate(cmd.page);
                        onClose();
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded text-xs hover:bg-[#2A222D] text-left transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded bg-[#17131A] text-[#D4774C] group-hover:scale-105 transition-transform">
                          <Icon size={14} />
                        </div>
                        <span className="font-medium text-[#F3EBDD] group-hover:text-[#D4774C] transition-colors">
                          {cmd.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[#A99EAA] px-1.5 py-0.5 rounded bg-[#17131A]">
                          {cmd.category}
                        </span>
                        <ArrowRight size={12} className="text-[#3D3342] group-hover:text-[#D4774C]" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Suppliers match */}
          {filteredSuppliers.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] font-mono tracking-widest text-[#A99EAA] uppercase font-semibold flex items-center justify-between">
                <span>Matching Suppliers</span>
                <span className="text-[9px] text-[#D4774C]">{filteredSuppliers.length} found</span>
              </div>
              <div className="space-y-0.5">
                {filteredSuppliers.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onNavigate('supplier-detail', { supplierId: s.id });
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded text-xs hover:bg-[#2A222D] text-left transition-colors group"
                  >
                    <div>
                      <div className="font-medium text-[#F3EBDD] group-hover:text-[#B8A06A] flex items-center gap-2">
                        <span>{s.name}</span>
                        <span className={`text-[9px] font-mono px-1 rounded ${
                          s.riskLevel === 'HIGH' ? 'bg-[#C95C5C]/20 text-[#E68585]' : 'bg-[#8FAF78]/20 text-[#A8C992]'
                        }`}>
                          {s.riskLevel} RISK
                        </span>
                      </div>
                      <div className="text-[10px] text-[#A99EAA] font-mono">
                        {s.category} • ₹{s.spendValueCr} Cr ({s.spendPercentage}%)
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#D4774C] group-hover:underline">
                      View Profile →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PO match */}
          {filteredPOs.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] font-mono tracking-widest text-[#A99EAA] uppercase font-semibold">
                Matching Purchase Orders
              </div>
              <div className="space-y-0.5">
                {filteredPOs.map((po) => (
                  <button
                    key={po.id}
                    onClick={() => {
                      onNavigate('purchase-orders', { poId: po.id });
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded text-xs hover:bg-[#2A222D] text-left transition-colors group"
                  >
                    <div>
                      <div className="font-mono font-medium text-[#F3EBDD] group-hover:text-[#D4774C] flex items-center gap-2">
                        <span>{po.poNumber}</span>
                        <span className="text-[10px] font-sans text-[#A99EAA]">({po.supplierName})</span>
                      </div>
                      <div className="text-[10px] text-[#A99EAA] font-mono">
                        ₹{po.valueLakhs}L • Status: {po.status} • Delivery: {po.expectedDeliveryDate}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#A99EAA]">
                      Control Tower →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Contracts match */}
          {filteredContracts.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] font-mono tracking-widest text-[#A99EAA] uppercase font-semibold">
                Matching Contracts
              </div>
              <div className="space-y-0.5">
                {filteredContracts.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onNavigate('contracts', { contractId: c.id });
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded text-xs hover:bg-[#2A222D] text-left transition-colors group"
                  >
                    <div>
                      <div className="font-medium text-[#F3EBDD] group-hover:text-[#B8A06A]">
                        {c.contractCode} - {c.title}
                      </div>
                      <div className="text-[10px] text-[#A99EAA] font-mono">
                        {c.supplierName} • ₹{c.valueCr} Cr • Expires in {c.daysToExpiry} days
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#D4774C]">
                      Inspect →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-[#3D3342]/70 bg-[#1A151D] flex items-center justify-between text-[10px] font-mono text-[#A99EAA]">
          <div className="flex items-center gap-3">
            <span>Navigate: <kbd className="bg-[#2A222D] px-1 rounded text-[#F3EBDD]">↑</kbd> <kbd className="bg-[#2A222D] px-1 rounded text-[#F3EBDD]">↓</kbd></span>
            <span>Select: <kbd className="bg-[#2A222D] px-1 rounded text-[#F3EBDD]">ENTER</kbd></span>
          </div>
          <span className="text-[#B8A06A]">PROCURA Global Command Engine</span>
        </div>
      </div>
    </div>
  );
};
