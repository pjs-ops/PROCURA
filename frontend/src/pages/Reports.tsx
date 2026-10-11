import React, { useState } from 'react';
import {
  FileCheck,
  Download,
  FileSpreadsheet,
  FileText,
  Calendar,
  CheckCircle2,
  Printer,
  Sparkles,
  ExternalLink,
  ChevronRight,
  X
} from 'lucide-react';
import { PageId, ReportConfig } from '../types';
import { MOCK_REPORTS, MOCK_PULSE, MOCK_WEATHER } from '../data/mockData';

interface ReportsProps {
  onNavigate: (page: PageId, meta?: any) => void;
}

export const Reports: React.FC<ReportsProps> = ({ onNavigate }) => {
  const [selectedReport, setSelectedReport] = useState<ReportConfig | null>(MOCK_REPORTS[0]);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const handleExport = (format: 'PDF' | 'Excel') => {
    setExportNotice(`Exporting "${selectedReport?.title}" as ${format}... Document ready for download.`);
    setTimeout(() => {
      setExportNotice(null);
    }, 3500);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Cockpit Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#211B24] border border-[#3D3342] p-5 rounded-lg shadow-panel">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] tracking-widest text-[#B8A06A] uppercase font-bold">
              AUDIT COMPLIANCE // EXECUTIVE PROCUREMENT DOSSIERS
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8FAF78]" />
          </div>
          <h2 className="font-editorial text-2xl font-bold text-[#F3EBDD]">
            Procurement Reports & Executive Briefings
          </h2>
          <p className="text-xs text-[#A99EAA] mt-0.5">
            Audit-grade dossiers synthesizing enterprise PO velocities, risk matrices, and identified savings opportunities.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-[#A99EAA]">
          <span className="px-2.5 py-1 rounded bg-[#17131A] border border-[#3D3342] text-[#B8A06A]">
            Audit Standard: ISO-20400 Sustainable Procurement
          </span>
        </div>
      </div>

      {/* Export notification feedback banner */}
      {exportNotice && (
        <div className="bg-[#241F28] border border-[#8FAF78] p-3 rounded-lg flex items-center justify-between animate-fade-in text-xs font-mono text-[#8FAF78]">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>{exportNotice}</span>
          </div>
          <button onClick={() => setExportNotice(null)} className="text-[#A99EAA] hover:text-[#F3EBDD]">
            <X size={14} />
          </button>
        </div>
      )}

      {/* 2-Column Split: REPORT LIST on Left, LIVE PREVIEW DOSSIER on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Report Templates (Col 4) */}
        <div className="lg:col-span-4 bg-[#211B24] border border-[#3D3342] rounded-lg p-5 shadow-panel space-y-4">
          <div className="flex items-center justify-between border-b border-[#3D3342]/70 pb-3">
            <span className="kpi-label text-[#B8A06A] font-mono text-xs font-bold">
              REPORT REGISTRY
            </span>
            <span className="text-[10px] font-mono text-[#A99EAA]">
              {MOCK_REPORTS.length} Templates
            </span>
          </div>

          <div className="space-y-2.5">
            {MOCK_REPORTS.map((rep) => {
              const isSelected = selectedReport?.id === rep.id;
              return (
                <div
                  key={rep.id}
                  onClick={() => setSelectedReport(rep)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer text-xs group ${
                    isSelected
                      ? 'bg-[#2E2432] border-[#D4774C] shadow-glow-copper text-[#F3EBDD]'
                      : 'bg-[#1A141D] border-[#3D3342]/70 hover:border-[#B8A06A]/50 text-[#A99EAA] hover:text-[#F3EBDD]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className={isSelected ? 'text-[#D4774C]' : 'text-[#7C727D]'}>
                      {rep.cadence} • {rep.category}
                    </span>
                    <span className="text-[9px] text-[#A99EAA]">{rep.code}</span>
                  </div>

                  <div className="font-semibold font-sans leading-snug">
                    {rep.title}
                  </div>

                  <div className="text-[10px] text-[#7C727D] mt-1 font-mono">
                    Last: {rep.lastGenerated}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Report Preview Dossier (Col 8) */}
        <div className="lg:col-span-8 bg-[#211B24] border border-[#3D3342] rounded-lg p-6 shadow-panel space-y-6">
          {selectedReport && (
            <>
              {/* Report Header */}
              <div className="border-b border-[#3D3342]/70 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono mb-1">
                    <span className="px-1.5 py-0.5 rounded bg-[#2A222D] text-[#D4774C] border border-[#D4774C]/30 font-bold">
                      {selectedReport.code}
                    </span>
                    <span className="text-[#A99EAA]">
                      Generated: {selectedReport.lastGenerated}
                    </span>
                  </div>
                  <h3 className="font-editorial text-2xl font-bold text-[#F3EBDD]">
                    {selectedReport.title}
                  </h3>
                </div>

                {/* Export Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleExport('PDF')}
                    className="px-3 py-1.5 rounded bg-[#2A222D] hover:bg-[#342B38] text-[#F3EBDD] border border-[#3D3342] text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <Download size={13} className="text-[#D4774C]" />
                    <span>Export PDF</span>
                  </button>
                  <button
                    onClick={() => handleExport('Excel')}
                    className="px-3 py-1.5 rounded bg-[#2A222D] hover:bg-[#342B38] text-[#F3EBDD] border border-[#3D3342] text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <FileSpreadsheet size={13} className="text-[#8FAF78]" />
                    <span>Export Excel</span>
                  </button>
                </div>
              </div>

              {/* Dossier Preview Body */}
              <div className="bg-[#1A141D] border border-[#3D3342] rounded-lg p-5 space-y-5 text-xs font-sans">
                {/* Executive Summary */}
                <div className="space-y-1.5">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#B8A06A] block">
                    1. EXECUTIVE SUMMARY & STRATEGIC HIGHLIGHTS
                  </span>
                  <p className="text-[#E5DCDE] leading-relaxed bg-[#211B24] p-3 rounded border border-[#3D3342]/60">
                    {selectedReport.executiveSummary}
                  </p>
                </div>

                {/* Scope & Description */}
                <div className="space-y-1.5">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A99EAA] block">
                    2. REPORT SCOPE & METHODOLOGY
                  </span>
                  <p className="text-[#A99EAA] leading-relaxed">
                    {selectedReport.description}
                  </p>
                </div>

                {/* Telemetry Snapshot Grid */}
                <div className="space-y-1.5 pt-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A99EAA] block">
                    3. TELEMETRY SNAPSHOT
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                    <div className="bg-[#211B24] p-2.5 rounded border border-[#3D3342]/60">
                      <span className="text-[9px] text-[#A99EAA] block">TOTAL SPEND</span>
                      <span className="font-bold text-[#F3EBDD]">₹{MOCK_PULSE.totalSpendCr} Cr</span>
                    </div>
                    <div className="bg-[#211B24] p-2.5 rounded border border-[#3D3342]/60">
                      <span className="text-[9px] text-[#A99EAA] block">WEATHER</span>
                      <span className="font-bold text-[#D4774C]">{MOCK_WEATHER.state}</span>
                    </div>
                    <div className="bg-[#211B24] p-2.5 rounded border border-[#3D3342]/60">
                      <span className="text-[9px] text-[#A99EAA] block">SAVINGS IDENTIFIED</span>
                      <span className="font-bold text-[#8FAF78]">₹{MOCK_PULSE.savingsIdentifiedCr} Cr</span>
                    </div>
                    <div className="bg-[#211B24] p-2.5 rounded border border-[#3D3342]/60">
                      <span className="text-[9px] text-[#A99EAA] block">PO HEALTH</span>
                      <span className="font-bold text-[#F3EBDD]">{MOCK_PULSE.poHealthPct}%</span>
                    </div>
                  </div>
                </div>

                {/* Certification Signoff */}
                <div className="pt-4 border-t border-[#3D3342]/60 flex items-center justify-between text-[10px] font-mono text-[#A99EAA]">
                  <span>Sign-off: Procurement Strategy Committee</span>
                  <span className="text-[#8FAF78]">Status: Validated for C-Suite Distribution</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
