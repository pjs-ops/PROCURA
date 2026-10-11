import React from 'react';
import { Supplier } from '../../types';
import { X, ExternalLink, AlertTriangle, ShieldCheck, TrendingDown, ArrowRight, Clock, Award, PhoneCall } from 'lucide-react';
import { SupplierRadarChart } from '../charts/SupplierRadarChart';
import { StatusBadge } from '../shared/StatusBadge';

interface SupplierDetailDrawerProps {
  supplier: Supplier | null;
  onClose: () => void;
  onOpenWhatIf?: (supplierId: string) => void;
  onViewAlternative?: (altId: string) => void;
}

export const SupplierDetailDrawer: React.FC<SupplierDetailDrawerProps> = ({
  supplier,
  onClose,
  onOpenWhatIf,
  onViewAlternative,
}) => {
  if (!supplier) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end animate-fade-in">
      <div
        className="w-full max-w-2xl bg-[#211B24] border-l border-[#3D3342] h-full flex flex-col shadow-2xl text-[#F3EBDD] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#3D3342]/80 bg-[#1D1720] sticky top-0 z-10 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="kpi-label text-[#B8A06A] font-mono text-[10px]">
                DOSSIER // {supplier.category.toUpperCase()}
              </span>
              <StatusBadge type="risk" value={supplier.riskLevel} />
              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#2A222D] text-[#A99EAA] border border-[#3D3342]">
                Tier: {supplier.tier}
              </span>
            </div>
            <h2 className="font-editorial text-2xl font-bold text-[#F3EBDD]">
              {supplier.name}
            </h2>
            <div className="text-xs text-[#A99EAA] font-mono mt-0.5">
              Hub: {supplier.country} • Key Contact: {supplier.contactPerson}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded bg-[#2A222D] text-[#A99EAA] hover:text-[#F3EBDD] hover:bg-[#342B38] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-6 space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#1A141D] p-3 rounded border border-[#3D3342]/70">
              <span className="text-[10px] font-mono text-[#A99EAA] block">TOTAL SPEND</span>
              <span className="font-editorial text-lg font-bold text-[#F3EBDD]">
                ₹{supplier.spendValueCr} Cr
              </span>
              <span className="text-[10px] text-[#B8A06A] font-mono block">
                {supplier.spendPercentage}% of total
              </span>
            </div>

            <div className="bg-[#1A141D] p-3 rounded border border-[#3D3342]/70">
              <span className="text-[10px] font-mono text-[#A99EAA] block">HEALTH SCORE</span>
              <span className="font-editorial text-lg font-bold text-[#D4774C]">
                {supplier.healthScore}/100
              </span>
              <span className="text-[10px] text-[#C95C5C] font-mono block">
                {supplier.trend}
              </span>
            </div>

            <div className="bg-[#1A141D] p-3 rounded border border-[#3D3342]/70">
              <span className="text-[10px] font-mono text-[#A99EAA] block">ACTIVE POs</span>
              <span className="font-editorial text-lg font-bold text-[#F3EBDD]">
                {supplier.activePOs}
              </span>
              <span className="text-[10px] text-[#A99EAA] font-mono block">
                {supplier.activeContracts} contracts
              </span>
            </div>

            <div className="bg-[#1A141D] p-3 rounded border border-[#3D3342]/70">
              <span className="text-[10px] font-mono text-[#A99EAA] block">IDENTIFIED LEAKAGE</span>
              <span className="font-editorial text-lg font-bold text-[#C95C5C]">
                ₹{supplier.leakageAmountLakhs}L
              </span>
              <span className="text-[10px] text-[#C95C5C] font-mono block">
                +{supplier.priceVariancePct}% variance
              </span>
            </div>
          </div>

          {/* Critical Early Warning Alert if High Risk */}
          {supplier.riskLevel === 'HIGH' && (
            <div className="bg-[#2D1B22] border border-[#C95C5C]/50 rounded-lg p-3.5 flex items-start gap-3">
              <AlertTriangle size={18} className="text-[#C95C5C] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-[#E68585] uppercase tracking-wider font-mono">
                  STRATEGIC VULNERABILITY DETECTED
                </div>
                <div className="text-xs text-[#F3EBDD] mt-0.5 font-sans">
                  {supplier.name} exhibits declining delivery performance (68% OTIF) and +17.2% price variance with contract expiring in 18 days.
                </div>
                {supplier.alternativeSupplierId && onViewAlternative && (
                  <button
                    onClick={() => onViewAlternative(supplier.alternativeSupplierId!)}
                    className="mt-2 text-[11px] font-mono text-[#D4774C] hover:text-[#E28E67] font-semibold flex items-center gap-1"
                  >
                    Compare with Recommended Alternative: Vertex Electronics →
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Supplier DNA Radar Visualization */}
          <div className="bg-[#1A141D] border border-[#3D3342] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B8A06A]">
                SUPPLIER DNA // MULTIDIMENSIONAL INDEX
              </span>
              <span className="text-[10px] font-mono text-[#A99EAA]">
                vs Category Benchmark
              </span>
            </div>
            <SupplierRadarChart metrics={supplier.metrics} supplierName={supplier.name} />

            {/* Granular numbers */}
            <div className="grid grid-cols-5 gap-2 mt-2 pt-3 border-t border-[#3D3342]/60 text-center font-mono text-xs">
              <div>
                <span className="text-[9px] text-[#A99EAA] block">DELIVERY</span>
                <span className={`font-bold ${supplier.metrics.delivery < 75 ? 'text-[#C95C5C]' : 'text-[#8FAF78]'}`}>
                  {supplier.metrics.delivery}
                </span>
              </div>
              <div>
                <span className="text-[9px] text-[#A99EAA] block">QUALITY</span>
                <span className="font-bold text-[#F3EBDD]">{supplier.metrics.quality}</span>
              </div>
              <div>
                <span className="text-[9px] text-[#A99EAA] block">COST</span>
                <span className="font-bold text-[#D6A45D]">{supplier.metrics.cost}</span>
              </div>
              <div>
                <span className="text-[9px] text-[#A99EAA] block">RELIABILITY</span>
                <span className="font-bold text-[#F3EBDD]">{supplier.metrics.reliability}</span>
              </div>
              <div>
                <span className="text-[9px] text-[#A99EAA] block">COMPLIANCE</span>
                <span className="font-bold text-[#8FAF78]">{supplier.metrics.compliance}</span>
              </div>
            </div>
          </div>

          {/* Supplier Intelligence Timeline */}
          {supplier.timeline.length > 0 && (
            <div className="bg-[#1A141D] border border-[#3D3342] rounded-lg p-4 space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B8A06A] block">
                SIGNAL TIMELINE // HISTORICAL TRAJECTORY
              </span>
              <div className="space-y-3 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-[#3D3342]">
                {supplier.timeline.map((item, idx) => (
                  <div key={idx} className="relative pl-6">
                    <span
                      className={`absolute left-1 top-1.5 w-2 h-2 rounded-full -translate-x-1/2 ${
                        item.impact === 'negative'
                          ? 'bg-[#C95C5C]'
                          : item.impact === 'positive'
                          ? 'bg-[#8FAF78]'
                          : item.impact === 'warning'
                          ? 'bg-[#D4774C]'
                          : 'bg-[#B8A06A]'
                      }`}
                    />
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-[#B8A06A]">
                        {item.month}
                      </span>
                      <span className="text-xs font-semibold text-[#F3EBDD]">
                        {item.event}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#A99EAA] mt-0.5 font-sans">
                      {item.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Operational Notes */}
          <div className="bg-[#1A141D] border border-[#3D3342] rounded-lg p-4 space-y-1.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#A99EAA] block">
              CATEGORY STRATEGY NOTES
            </span>
            <p className="text-xs text-[#E5DCDE] font-sans leading-relaxed">
              {supplier.notes}
            </p>
          </div>
        </div>

        {/* Drawer Action Footer */}
        <div className="p-4 border-t border-[#3D3342]/80 bg-[#1D1720] mt-auto flex items-center justify-between gap-3">
          <div className="text-[10px] font-mono text-[#A99EAA]">
            Contract Expiry: <span className="text-[#D4774C] font-bold">{supplier.contractExpiryDate}</span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenWhatIf && (
              <button
                onClick={() => onOpenWhatIf(supplier.id)}
                className="px-3 py-1.5 rounded bg-[#D4774C] hover:bg-[#E28E67] text-[#17131A] font-mono text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
              >
                Simulate Allocation Shift →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
