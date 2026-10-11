import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  Sliders,
  FileText,
  Search,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Activity
} from 'lucide-react';
import { PageId, AIAnalystQuery } from '../types';
import { MOCK_AI_QUERIES } from '../data/mockData';

interface AIAnalystProps {
  onNavigate: (page: PageId, meta?: any) => void;
}

export const AIAnalyst: React.FC<AIAnalystProps> = ({ onNavigate }) => {
  const [selectedQueryId, setSelectedQueryId] = useState<string>(MOCK_AI_QUERIES[0].id);
  const [customInput, setCustomInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const activeQuery = MOCK_AI_QUERIES.find((q) => q.id === selectedQueryId) || MOCK_AI_QUERIES[0];

  const handleSelectQuery = (id: string) => {
    setIsAnalyzing(true);
    setSelectedQueryId(id);
    setTimeout(() => setIsAnalyzing(false), 300);
  };

  const handleActionClick = (actionKey: string) => {
    switch (actionKey) {
      case 'open-what-if':
      case 'open-what-if-preset':
        onNavigate('what-if');
        break;
      case 'open-anomaly':
      case 'open-savings':
        onNavigate('savings-lab');
        break;
      case 'open-apex-detail':
        onNavigate('supplier-detail', { supplierId: 'sup-apex' });
        break;
      case 'open-contracts':
        onNavigate('contracts');
        break;
      case 'open-risk':
        onNavigate('risk-radar');
        break;
      case 'open-suppliers':
        onNavigate('suppliers');
        break;
      default:
        onNavigate('overview');
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Cockpit Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#211B24] border border-[#3D3342] p-5 rounded-lg shadow-panel">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] tracking-widest text-[#D4774C] uppercase font-bold">
              SYNTHETIC STRATEGY ENGINE // CAUSAL INTELLIGENCE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8FAF78] animate-pulse" />
          </div>
          <h2 className="font-editorial text-2xl font-bold text-[#F3EBDD]">
            Procurement AI Analyst
          </h2>
          <p className="text-xs text-[#A99EAA] mt-0.5">
            Evidence-based strategic reasoning layer synthesizing transaction histories, price indices, and supplier health.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-[#A99EAA]">
          <span className="px-2 py-1 rounded bg-[#17131A] border border-[#3D3342] text-[#B8A06A]">
            Model: PROCURA Reasoning Engine v2.6
          </span>
        </div>
      </div>

      {/* SPLIT INTERFACE (Non-ChatGPT Design) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Suggested Strategic Questions & Query Selector (Col 4) */}
        <div className="lg:col-span-4 bg-[#211B24] border border-[#3D3342] rounded-lg p-5 shadow-panel space-y-4">
          <div className="flex items-center justify-between border-b border-[#3D3342]/70 pb-3">
            <span className="kpi-label text-[#B8A06A] font-mono text-xs font-bold">
              STRATEGIC QUERY REPERTOIRE
            </span>
            <span className="text-[10px] font-mono text-[#A99EAA]">
              {MOCK_AI_QUERIES.length} Curated Questions
            </span>
          </div>

          {/* Question List */}
          <div className="space-y-2">
            {MOCK_AI_QUERIES.map((q) => {
              const isSelected = selectedQueryId === q.id;
              return (
                <button
                  key={q.id}
                  onClick={() => handleSelectQuery(q.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all text-xs group ${
                    isSelected
                      ? 'bg-[#2E2432] border-[#D4774C] shadow-glow-copper text-[#F3EBDD]'
                      : 'bg-[#1A141D] border-[#3D3342]/70 hover:border-[#B8A06A]/50 text-[#A99EAA] hover:text-[#F3EBDD]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className={isSelected ? 'text-[#D4774C]' : 'text-[#7C727D]'}>
                      {q.category}
                    </span>
                    <ArrowRight size={12} className={isSelected ? 'text-[#D4774C]' : 'text-[#3D3342] group-hover:text-[#A99EAA]'} />
                  </div>
                  <div className="font-medium font-sans leading-snug">
                    {q.query}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Freeform Prompt Simulator */}
          <div className="pt-2 border-t border-[#3D3342]/60 space-y-2">
            <span className="text-[10px] font-mono text-[#A99EAA] uppercase tracking-wider block">
              ASK ARBITRARY HYPOTHESIS
            </span>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Can we renegotiate logistics freight rates?"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="w-full bg-[#17131A] border border-[#3D3342] rounded px-3 py-1.5 text-xs text-[#F3EBDD] placeholder-[#A99EAA]/60 focus:outline-none focus:border-[#D4774C]"
              />
              <button
                onClick={() => {
                  if (customInput.trim()) {
                    handleSelectQuery('ai-q1');
                    setCustomInput('');
                  }
                }}
                className="px-3 py-1.5 bg-[#D4774C] hover:bg-[#E28E67] text-[#17131A] font-mono text-xs font-bold rounded transition-colors shrink-0"
              >
                Run
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Rich Intelligence Dossier Response (Col 8) */}
        <div className="lg:col-span-8 bg-[#211B24] border border-[#3D3342] rounded-lg p-6 shadow-panel space-y-6">
          {isAnalyzing ? (
            <div className="py-24 text-center space-y-3 font-mono">
              <div className="w-8 h-8 rounded-full border-2 border-[#D4774C] border-t-transparent animate-spin mx-auto" />
              <div className="text-xs text-[#D4774C] uppercase tracking-widest font-bold">
                PROCURA // ANALYZING PROCUREMENT SIGNALS...
              </div>
              <div className="text-[11px] text-[#A99EAA]">
                Synthesizing ERP purchase orders, category price variances, and vendor lead-times.
              </div>
            </div>
          ) : (
            <>
              {/* Query Title & Causal Summary */}
              <div className="border-b border-[#3D3342]/70 pb-4">
                <div className="flex items-center gap-2 mb-1.5 text-[10px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-[#D4774C]/20 text-[#D4774C] font-bold">
                    SYNTHESIS RESULT
                  </span>
                  <span className="text-[#A99EAA]">
                    Confidence Index: <strong className="text-[#8FAF78] font-bold">{activeQuery.recommendation.confidencePct}%</strong>
                  </span>
                </div>

                <h3 className="font-editorial text-xl font-bold text-[#F3EBDD]">
                  {activeQuery.query}
                </h3>

                <div className="mt-3 p-4 rounded bg-[#1A141D] border border-[#3D3342] text-sm text-[#E5DCDE] font-sans leading-relaxed">
                  {activeQuery.answer}
                </div>
              </div>

              {/* Supporting Analytical Metrics Grid */}
              <div className="space-y-2">
                <span className="kpi-label text-[#B8A06A] font-mono text-xs font-bold block">
                  SUPPORTING EVIDENCE METRICS
                </span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {activeQuery.supportingMetrics.map((met, idx) => (
                    <div
                      key={idx}
                      className="bg-[#1A141D] p-3 rounded border border-[#3D3342]/70"
                    >
                      <span className="text-[10px] font-mono text-[#A99EAA] block truncate">
                        {met.label}
                      </span>
                      <span className="font-editorial text-lg font-bold text-[#F3EBDD] block mt-0.5">
                        {met.value}
                      </span>
                      {met.delta && (
                        <span className={`text-[10px] font-mono ${met.isPositive ? 'text-[#8FAF78]' : 'text-[#C95C5C]'}`}>
                          {met.delta}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Breakdown Chart / Bars */}
              <div className="space-y-2 bg-[#1A141D] p-4 rounded border border-[#3D3342]">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#B8A06A] font-bold uppercase tracking-wider">
                    CAUSAL DRIVER BREAKDOWN
                  </span>
                  <span className="text-[#A99EAA]">Contribution Distribution</span>
                </div>
                <div className="space-y-2 pt-2">
                  {activeQuery.breakdown.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-[#F3EBDD]">{item.label}</span>
                        <span className="text-[#D4774C] font-bold">{item.amount}</span>
                      </div>
                      <div className="w-full bg-[#211B24] h-2 rounded-full overflow-hidden border border-[#3D3342]/60">
                        <div
                          className="bg-gradient-to-r from-[#D4774C] to-[#B8A06A] h-full rounded-full"
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI ACTION CARDS (Action-Oriented Execution) */}
              <div className="bg-gradient-to-br from-[#2E202B] via-[#211B24] to-[#1A141D] border border-[#D4774C]/50 rounded-lg p-5 shadow-panel space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#D4774C] flex items-center gap-1.5">
                    <Sparkles size={14} />
                    EXECUTIVE ACTION PLAYBOOK
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#8FAF78]/20 text-[#A8C992] font-bold">
                    {activeQuery.recommendation.confidencePct}% Decision Confidence
                  </span>
                </div>

                <div>
                  <h4 className="font-editorial text-base font-bold text-[#F3EBDD]">
                    {activeQuery.recommendation.actionTitle}
                  </h4>
                  <p className="text-xs text-[#A99EAA] font-sans mt-1 leading-relaxed">
                    {activeQuery.recommendation.details}
                  </p>
                </div>

                {/* Interactive Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-[#3D3342]/60">
                  {activeQuery.recommendation.actions.map((act) => (
                    <button
                      key={act.actionKey}
                      onClick={() => handleActionClick(act.actionKey)}
                      className="px-3 py-1.5 rounded bg-[#2A222D] hover:bg-[#342B38] text-[#F3EBDD] hover:text-[#D4774C] border border-[#D4774C]/40 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <span>{act.label}</span>
                      <ArrowRight size={12} className="text-[#D4774C]" />
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
