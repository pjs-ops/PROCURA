import React, { useState } from 'react';
import { SavingsOpportunity } from '../../types';
import { X, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, DollarSign, Layers } from 'lucide-react';

interface SavingsDetailDrawerProps {
  opportunity: SavingsOpportunity | null;
  onClose: () => void;
  onOpenWhatIf?: () => void;
}

export const SavingsDetailDrawer: React.FC<SavingsDetailDrawerProps> = ({
  opportunity,
  onClose,
  onOpenWhatIf,
}) => {
  const [captured, setCaptured] = useState(false);

  if (!opportunity) return null;

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
              <span className="font-mono text-xs font-bold text-[#D4774C] px-1.5 py-0.5 rounded bg-[#D4774C]/15 border border-[#D4774C]/30">
                {opportunity.type}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#8FAF78]/20 text-[#A8C992] border border-[#8FAF78]/30">
                {opportunity.confidencePct}% Confidence
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#2A222D] text-[#A99EAA]">
                Ease: {opportunity.implementationEase}
              </span>
            </div>
            <h2 className="font-editorial text-xl font-bold text-[#F3EBDD]">
              {opportunity.title}
            </h2>
            <div className="text-xs text-[#A99EAA] font-mono mt-0.5">
              Category: {opportunity.category}
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
          {/* Main Potential Savings Card */}
          <div className="bg-[#1A141D] p-4 rounded-lg border border-[#B8A06A]/40 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#A99EAA] block uppercase">PROJECTED RECAPTURE POTENTIAL</span>
              <span className="font-editorial text-3xl font-extrabold text-[#B8A06A]">
                ₹{opportunity.potentialSavingsLakhs} Lakhs
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-[#A99EAA] block uppercase">STATUS</span>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#2A222D] text-[#8FAF78] border border-[#8FAF78]/40">
                {captured ? 'ACTION APPROVED' : opportunity.status}
              </span>
            </div>
          </div>

          {/* Deep Details */}
          <div className="bg-[#1A141D] p-4 rounded-lg border border-[#3D3342] space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B8A06A] block">
              ANALYSIS & EVIDENCE DOSSIER
            </span>
            <p className="text-xs text-[#E5DCDE] font-sans leading-relaxed">
              {opportunity.details}
            </p>
          </div>

          {/* Affected Suppliers */}
          <div className="bg-[#1A141D] p-4 rounded-lg border border-[#3D3342] space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#A99EAA] block">
              AFFECTED VENDORS IN SCOPE
            </span>
            <div className="space-y-1.5">
              {opportunity.affectedSuppliers.map((sup, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded bg-[#211B24] border border-[#3D3342]/70 text-xs font-medium text-[#F3EBDD] flex items-center justify-between"
                >
                  <span>{sup}</span>
                  <span className="text-[10px] font-mono text-[#D4774C]">In Scope</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Action */}
          <div className="bg-[#261B21] border border-[#D4774C]/40 p-4 rounded-lg space-y-1.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D4774C] block">
              RECOMMENDED STRATEGIC PLAYBOOK
            </span>
            <p className="text-xs text-[#F3EBDD] font-sans leading-relaxed">
              {opportunity.recommendedAction}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#3D3342]/80 bg-[#1D1720] mt-auto flex items-center justify-between">
          <button
            onClick={() => setCaptured(!captured)}
            className={`px-3 py-1.5 rounded font-mono text-xs font-bold transition-colors flex items-center gap-1.5 ${
              captured
                ? 'bg-[#8FAF78] text-[#17131A]'
                : 'bg-[#2A222D] hover:bg-[#342B38] text-[#F3EBDD] border border-[#3D3342]'
            }`}
          >
            <CheckCircle2 size={13} />
            {captured ? 'Savings Queued for Execution' : 'Approve for Execution'}
          </button>

          {onOpenWhatIf && (
            <button
              onClick={onOpenWhatIf}
              className="px-3 py-1.5 rounded bg-[#D4774C] hover:bg-[#E28E67] text-[#17131A] font-mono text-xs font-bold transition-colors"
            >
              Simulate in Digital Twin →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
