import React from 'react';
import { PurchaseOrder } from '../../types';
import { X, Calendar, Truck, AlertTriangle, FileText, CheckCircle2, Clock } from 'lucide-react';
import { StatusBadge } from '../shared/StatusBadge';

interface PODetailDrawerProps {
  po: PurchaseOrder | null;
  onClose: () => void;
  onInspectSupplier?: (supplierId: string) => void;
}

export const PODetailDrawer: React.FC<PODetailDrawerProps> = ({
  po,
  onClose,
  onInspectSupplier,
}) => {
  if (!po) return null;

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
                {po.poNumber}
              </span>
              <StatusBadge type="po" value={po.status} />
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#2A222D] text-[#A99EAA]">
                Risk: {po.riskScore}/100
              </span>
            </div>
            <h2 className="font-editorial text-xl font-bold text-[#F3EBDD]">
              {po.supplierName}
            </h2>
            <div className="text-xs text-[#A99EAA] font-mono">
              Category: {po.category} • Unit: {po.businessUnit}
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
          {/* Top Value Banner */}
          <div className="bg-[#1A141D] p-4 rounded-lg border border-[#3D3342] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#A99EAA] block uppercase">PO FINANCIAL VALUE</span>
              <span className="font-editorial text-2xl font-bold text-[#F3EBDD]">
                ₹{po.valueLakhs} Lakhs
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-[#A99EAA] block uppercase">LINE ITEMS</span>
              <span className="font-mono text-base font-bold text-[#B8A06A]">
                {po.itemsCount} SKUs Ordered
              </span>
            </div>
          </div>

          {/* Delivery Exception Alert */}
          {po.status === 'DELAYED' && (
            <div className="bg-[#2D1B22] border border-[#C95C5C]/50 rounded-lg p-3.5 flex items-start gap-3">
              <AlertTriangle size={18} className="text-[#C95C5C] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-[#E68585] uppercase tracking-wider font-mono">
                  DELIVERY SLA BREACH EXCEPTION
                </div>
                <div className="text-xs text-[#F3EBDD] mt-0.5 font-sans">
                  {po.riskReason || 'Critical lead time drift identified. Expected date has slipped.'}
                </div>
                <div className="text-[11px] font-mono text-[#C95C5C] mt-1.5">
                  Promised: {po.promisedDeliveryDate} ➔ Slippage: {po.expectedDeliveryDate}
                </div>
              </div>
            </div>
          )}

          {/* Timeline Milestones */}
          <div className="bg-[#1A141D] p-4 rounded-lg border border-[#3D3342] space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B8A06A] block">
              DELIVERY CADENCE MILESTONES
            </span>
            <div className="grid grid-cols-3 gap-2 font-mono text-xs text-center pt-2">
              <div className="bg-[#211B24] p-2 rounded border border-[#3D3342]/60">
                <span className="text-[9px] text-[#A99EAA] block">ORDER DATE</span>
                <span className="text-[#F3EBDD] font-semibold">{po.orderDate}</span>
              </div>
              <div className="bg-[#211B24] p-2 rounded border border-[#3D3342]/60">
                <span className="text-[9px] text-[#A99EAA] block">PROMISED ETA</span>
                <span className="text-[#F3EBDD] font-semibold">{po.promisedDeliveryDate}</span>
              </div>
              <div className="bg-[#211B24] p-2 rounded border border-[#3D3342]/60">
                <span className="text-[9px] text-[#A99EAA] block">PREDICTED ETA</span>
                <span className={`font-semibold ${po.status === 'DELAYED' ? 'text-[#C95C5C]' : 'text-[#8FAF78]'}`}>
                  {po.expectedDeliveryDate}
                </span>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="bg-[#1A141D] p-4 rounded-lg border border-[#3D3342] space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#A99EAA] block">
              COMMITTED LINE ITEM SPECIFICATIONS
            </span>
            <div className="space-y-2">
              {po.lineItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded bg-[#211B24] border border-[#3D3342]/70 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-mono text-xs font-bold text-[#F3EBDD]">
                      {item.sku}
                    </div>
                    <div className="text-[11px] text-[#A99EAA] font-sans">
                      {item.description}
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-xs font-bold text-[#B8A06A]">
                      ₹{(item.total / 100000).toFixed(2)} Lakhs
                    </div>
                    <div className="text-[10px] text-[#A99EAA]">
                      {item.qty} units @ ₹{item.unitPrice.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#3D3342]/80 bg-[#1D1720] mt-auto flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#A99EAA]">
            Contract binding: MSA Active
          </span>
          {onInspectSupplier && (
            <button
              onClick={() => onInspectSupplier(po.supplierId)}
              className="px-3 py-1.5 rounded bg-[#2A222D] hover:bg-[#342B38] text-[#F3EBDD] font-mono text-xs font-bold border border-[#3D3342]"
            >
              Inspect Supplier Profile →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
