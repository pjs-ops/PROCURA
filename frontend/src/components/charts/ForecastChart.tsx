import React, { useState } from 'react';
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts';
import { ForecastPoint } from '../../types';
import { Sparkles, Calendar, TrendingUp, AlertCircle } from 'lucide-react';

interface ForecastChartProps {
  data: ForecastPoint[];
  onTimeframeChange?: (timeframe: '30D' | '90D' | '6M' | '12M') => void;
}

export const ForecastChart: React.FC<ForecastChartProps> = ({
  data,
  onTimeframeChange,
}) => {
  const [timeframe, setTimeframe] = useState<'30D' | '90D' | '6M' | '12M'>('12M');

  const handleSelectTimeframe = (tf: '30D' | '90D' | '6M' | '12M') => {
    setTimeframe(tf);
    if (onTimeframeChange) onTimeframeChange(tf);
  };

  // Transform data for Recharts area uncertainty band (lower to upper range)
  const chartData = data.map((d) => ({
    period: d.period,
    actualSpend: d.isHistorical ? d.actualSpendCr : null,
    forecastSpend: d.forecastSpendCr,
    uncertaintyBand: [d.lowerConfidenceCr, d.upperConfidenceCr],
    lower: d.lowerConfidenceCr,
    upper: d.upperConfidenceCr,
    demandIndex: d.demandVolumeIndex,
    leadTimeDays: d.leadTimeDays,
    isHistorical: d.isHistorical,
  }));

  return (
    <div className="bg-[#211B24] border border-[#3D3342] rounded-lg p-5 shadow-panel">
      {/* Top Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 border-b border-[#3D3342]/70 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="kpi-label text-[#B8A06A] font-mono tracking-widest font-semibold text-xs">
              PROBABILISTIC MODEL // PROCUREMENT SPEND & UNCERTAINTY BAND
            </span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#8FAF78]/20 text-[#A8C992] border border-[#8FAF78]/30">
              CONFIDENCE: 87%
            </span>
          </div>
          <p className="text-xs text-[#A99EAA] mt-0.5">
            Historical transactional trajectory coupled with autoregressive multi-scenario envelope.
          </p>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center gap-1 bg-[#17131A] p-1 rounded border border-[#3D3342]/80">
          {(['30D', '90D', '6M', '12M'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => handleSelectTimeframe(tf)}
              className={`px-2.5 py-1 text-[10px] font-mono rounded transition-all ${
                timeframe === tf
                  ? 'bg-[#2A222D] text-[#F3EBDD] font-bold border border-[#D4774C]/50'
                  : 'text-[#A99EAA] hover:text-[#F3EBDD]'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="uncertaintyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4774C" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#D4774C" stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#2E2632" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="period"
              stroke="#7C727D"
              tick={{ fill: '#A99EAA', fontSize: 11, fontFamily: 'JetBrains Mono' }}
            />
            <YAxis
              stroke="#7C727D"
              domain={[1.2, 2.4]}
              tick={{ fill: '#A99EAA', fontSize: 10, fontFamily: 'JetBrains Mono' }}
              tickFormatter={(v) => `₹${v} Cr`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="bg-[#241D27] border border-[#3D3342] rounded p-3 shadow-xl font-mono text-xs text-[#F3EBDD]">
                      <div className="text-[11px] text-[#B8A06A] font-bold mb-1 border-b border-[#3D3342]/60 pb-1">
                        {label} {item.isHistorical ? '(Historical Actual)' : '(Projected Forecast)'}
                      </div>
                      <div className="space-y-1 text-[11px]">
                        {item.actualSpend !== null && (
                          <div className="text-[#F3EBDD]">
                            Actual Spend: <span className="font-bold">₹{item.actualSpend} Cr</span>
                          </div>
                        )}
                        <div className="text-[#D4774C]">
                          Forecast Baseline: <span className="font-bold">₹{item.forecastSpend} Cr</span>
                        </div>
                        <div className="text-[#A99EAA] text-[10px]">
                          Uncertainty Envelope: ₹{item.lower} Cr — ₹{item.upper} Cr
                        </div>
                        <div className="text-[#8FAF78] text-[10px] pt-1 border-t border-[#3D3342]/40">
                          Demand Index: {item.demandIndex} | Lead Time: {item.leadTimeDays}d
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* Uncertainty Upper and Lower Area Band */}
            <Area
              dataKey="upper"
              stroke="transparent"
              fill="url(#uncertaintyGrad)"
              name="Uncertainty Range"
            />
            <Area
              dataKey="lower"
              stroke="transparent"
              fill="#211B24"
              name="Confidence Floor"
            />

            {/* Historical Spend solid line */}
            <Line
              type="monotone"
              dataKey="actualSpend"
              stroke="#F3EBDD"
              strokeWidth={2.5}
              dot={{ fill: '#F3EBDD', r: 3 }}
              name="Actual Spend (Cr)"
              connectNulls={false}
            />

            {/* Forecast Spend dashed line */}
            <Line
              type="monotone"
              dataKey="forecastSpend"
              stroke="#D4774C"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ fill: '#D4774C', r: 3 }}
              name="Forecast Spend (Cr)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Model Diagnostic Footer */}
      <div className="mt-4 pt-3 border-t border-[#3D3342]/60 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
        <div className="bg-[#1A141D] p-2 rounded border border-[#3D3342]/60">
          <span className="text-[#A99EAA] block text-[9px]">NEXT 90D SPEND</span>
          <span className="text-[#F3EBDD] font-bold text-sm">₹5.47 Cr</span>
        </div>
        <div className="bg-[#1A141D] p-2 rounded border border-[#3D3342]/60">
          <span className="text-[#A99EAA] block text-[9px]">PEAK UNCERTAINTY</span>
          <span className="text-[#D4774C] font-bold text-sm">±11.4% (Aug '26)</span>
        </div>
        <div className="bg-[#1A141D] p-2 rounded border border-[#3D3342]/60">
          <span className="text-[#A99EAA] block text-[9px]">DEMAND DRIFT</span>
          <span className="text-[#8FAF78] font-bold text-sm">+29 pts (Q3)</span>
        </div>
        <div className="bg-[#1A141D] p-2 rounded border border-[#3D3342]/60">
          <span className="text-[#A99EAA] block text-[9px]">LEAD TIME TREND</span>
          <span className="text-[#C95C5C] font-bold text-sm">18d → 20.5d</span>
        </div>
      </div>
    </div>
  );
};
