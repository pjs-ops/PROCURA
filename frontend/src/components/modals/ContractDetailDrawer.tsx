import React from 'react';
import { Contract } from '../../types';
import { X, Calendar, AlertOctagon, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';
import { StatusBadge } from '../shared/StatusBadge';

interface ContractDetailDrawerProps {
  contract: Contract | null;
  onClose: () => void;
  onOpenWhatIf?: (supplierId: string) => void;
}

export const ContractDetailDrawer: React.FC<ContractDetailDrawerProps> = ({
  contract,
  onClose,
  onOpenWhatIf,
}) => {
  if (!contract) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end animate-fade-in">
      <div
        className="w-full max-w-xl bg-[#211B24] border-l border-[#3D3342] h-full flex flex-col shadow-2xl text-[#F3EBDD] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#3D3342]/80 bg-[#1D1720] sticky top-0 z-10 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-[#D4774C]">
                {contract.contractCode}
              </span>
              <StatusBadge type="contract" value={contract.status} />
              {contract.daysToExpiry <= 30 && (
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#C95C5C]/20 text-[#E68585] font-bold">
                  {contract.daysToExpiry}d to Expiry
                </span>
              )}
            </div>
            <h2 className="font-editorial text-xl font-bold text-[#F3EBDD]">
              {contract.title}
            </h2>
            <div className="text-xs text-[#A99EAA] font-mono mt-0.5">
              Vendor: {contract.supplierName} • Owner: {contract.owner}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded bg-[#2A222D] text-[#A99EAA] hover:text-[#F3EBDD]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Top Value Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#1A141D] p-3 rounded border border-[#3D3342]">
              <span className="text-[10px] font-mono text-[#A99EAA] block">CONTRACT VALUE</span>
              <span className="font-editorial text-xl font-bold text-[#F3EBDD]">
                ₹{contract.valueCr} Cr
              </span>
            </div>
            <div className="bg-[#1A141D] p-3 rounded border border-[#3D3342]">
              <span className="text-[10px] font-mono text-[#A99EAA] block">SLA ADHERENCE</span>
              <span className={`font-editorial text-xl font-bold ${contract.slaAdherencePct < 80 ? 'text-[#C95C5C]' : 'text-[#8FAF78]'}`}>
                {contract.slaAdherencePct}%
              </span>
            </div>
            <div className="bg-[#1A141D] p-3 rounded border border-[#3D3342]">
              <span className="text-[10px] font-mono text-[#A99EAA] block">LEAKAGE AT RISK</span>
              <span className="font-editorial text-xl font-bold text-[#D4774C]">
                ₹{contract.leakageLakhs}L
              </span>
            </div>
          </div>

          {/* Expiry Warning Callout */}
          {contract.daysToExpiry <= 30 && (
            <div className="bg-[#2D1B22] border border-[#C95C5C]/50 rounded-lg p-3.5 flex items-start gap-3">
              <AlertOctagon size={18} className="text-[#C95C5C] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-[#E68585] uppercase tracking-wider font-mono">
                  IMMINENT CONTRACT EXPIRY HORIZON
                </div>
                <div className="text-xs text-[#F3EBDD] mt-0.5 font-sans leading-relaxed">
                  Contract expires on <strong className="text-[#D4774C]">{contract.expiryDate}</strong> ({contract.daysToExpiry} days remaining). Any uncontracted purchase order execution post-expiry incurs an estimated ₹{contract.leakageLakhs}L in off-tariff spot price leakage.
                </div>
              </div>
            </div>
          )}

          {/* Penalty & Legal Terms */}
          <div className="bg-[#1A141D] p-4 rounded-lg border border-[#3D3342] space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B8A06A] block">
              LIQUIDATED DAMAGES & PENALTY STIPULATIONS
            </span>
            <p className="text-xs text-[#E5DCDE] font-sans leading-relaxed bg-[#211B24] p-3 rounded border border-[#3D3342]/60">
              {contract.penaltyTerms}
            </p>
          </div>

          {/* Schedule Horizon */}
          <div className="bg-[#1A141D] p-4 rounded-lg border border-[#3D3342] space-y-2 font-mono text-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A99EAA] block">
              LIFECYCLE SCHEDULE
            </span>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-[#211B24] p-2 rounded border border-[#3D3342]/60">
                <span className="text-[9px] text-[#A99EAA] block">EXECUTION START</span>
                <span className="text-[#F3EBDD] font-bold">{contract.startDate}</span>
              </div>
              <div className="bg-[#211B24] p-2 rounded border border-[#3D3342]/60">
                <span className="text-[9px] text-[#A99EAA] block">TERMINATION EXPIRY</span>
                <span className="text-[#D4774C] font-bold">{contract.expiryDate}</span>
              </div>
            </div>
            <div className="pt-2 flex items-center justify-between text-[11px] text-[#A99EAA]">
              <span>Auto-Renewal Clause:</span>
              <span className={`font-bold ${contract.autoRenew ? 'text-[#8FAF78]' : 'text-[#C95C5C]'}`}>
                {contract.autoRenew ? 'ACTIVE (Notice Required)' : 'DISABLED (Manual Renewal Required)'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#3D3342]/80 bg-[#1D1720] mt-auto flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#A99EAA]">
            Contract Owner: {contract.owner}
          </span>
          {onOpenWhatIf && (
            <button
              onClick={() => onOpenWhatIf(contract.supplierId)}
              className="px-3 py-1.5 rounded bg-[#D4774C] hover:bg-[#E28E67] text-[#17131A] font-mono text-xs font-bold transition-colors"
            >
              Simulate Renewal Terms →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
