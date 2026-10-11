import React, { useState } from 'react';
import {
  LineChart as LineChartIcon,
  TrendingUp,
  Sliders,
  Calendar,
  AlertCircle,
  Clock,
  Sparkles,
  Layers
} from 'lucide-react';
import { ForecastChart } from '../components/charts/ForecastChart';
import { KPICard } from '../components/shared/KPICard';
import { PageId, ForecastPoint } from '../types';
import { MOCK_FORECAST_DATA } from '../data/mockData';

interface ForecastProps {
  onNavigate: (page: PageId, meta?: any) => void;
}

export const Forecast: React.FC<ForecastProps> = ({ onNavigate }) => {
  const [data, setData] = useState<ForecastPoint[]>(MOCK_FORECAST_DATA);

  const categoryProjections = [
    { name: 'Mechanical Components & CNC', currentCr: 6.40, forecastCr: 6.95, growth: '+8.6%', risk: 'High lead time drift' },
    { name: 'Electronics & Semiconductors', currentCr: 3.82, forecastCr: 4.35, growth: '+13.8%', risk: 'Automotive controller surge' },
    { name: 'Logistics & Ocean Freight', currentCr: 3.03, forecastCr: 3.38, growth: '+11.5%', risk: 'Bunker fuel surcharge variability' },
    { name: 'Raw Materials & Steel', currentCr: 2.22, forecastCr: 2.52, growth: '+13.5%', risk: 'Platts spot market inflation' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#211B24] border border-[#3D3342] p-5 rounded-lg shadow-panel">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] tracking-widest text-[#B8A06A] uppercase font-bold">
              PROBABILISTIC FORECAST // UNCERTAINTY ENVELOPE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8FAF78]" />
          </div>
          <h2 className="font-editorial text-2xl font-bold text-[#F3EBDD]">
            Procurement Demand & Spend Forecast
          </h2>
          <p className="text-xs text-[#A99EAA] mt-0.5">
            12-month forward predictive trajectory incorporating multi-variable commodity drift, demand surges, and lead time variance.
          </p>
        </div>

        <button
          onClick={() => onNavigate('what-if')}
          className="px-3.5 py-2 rounded bg-[#D4774C] hover:bg-[#E28E67] text-[#17131A] text-xs font-mono font-bold flex items-center gap-1.5 transition-colors shrink-0 shadow-sm"
        >
          <Sliders size={13} />
          <span>Test Shock in What-If Twin</span>
        </button>
      </div>

      {/* 4 Summary Forecast KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <KPICard
          label="Model Confidence Score"
          value="87%"
          delta="Ensemble Model"
          isPositiveDelta={true}
          subtext="±9.4% standard error band"
          accent="gold"
        />
        <KPICard
          label="Projected Q3 Spend"
          value="₹5.82 Cr"
          delta="↑ 12.4% vs Q1"
          isPositiveDelta={false}
          subtext="Driven by electronics expansion"
          accent="copper"
          icon={TrendingUp}
        />
        <KPICard
          label="Supplier Lead Time Drift"
          value="+4.5 Days"
          delta="18.2d avg lead time"
          isPositiveDelta={false}
          subtext="Foundry and port congestion"
          accent="critical"
          icon={Clock}
        />
        <KPICard
          label="Category Demand Index"
          value="129 pts"
          delta="↑ 29% peak in Sep"
          isPositiveDelta={true}
          subtext="Clean energy volume ramp"
          accent="success"
        />
      </div>

      {/* 1. Core Chart: HISTORICAL LINE + FORECAST LINE + UNCERTAINTY BAND */}
      <ForecastChart
        data={data}
        onTimeframeChange={(tf) => {
          if (tf === '30D') setData(MOCK_FORECAST_DATA.slice(3, 7));
          else if (tf === '90D') setData(MOCK_FORECAST_DATA.slice(2, 9));
          else if (tf === '6M') setData(MOCK_FORECAST_DATA.slice(0, 10));
          else setData(MOCK_FORECAST_DATA);
        }}
      />

      {/* 2. Category Demand Forecast Projections Table */}
      <div className="bg-[#211B24] border border-[#3D3342] rounded-lg p-5 shadow-panel space-y-4">
        <div className="flex items-center justify-between border-b border-[#3D3342]/70 pb-3">
          <div>
            <span className="kpi-label text-[#B8A06A] font-mono text-xs font-bold">
              FORWARD CATEGORY EXPOSURE // 6-MONTH OUTLOOK
            </span>
            <p className="text-xs text-[#A99EAA] mt-0.5">
              Predicted capital requirements and primary operational risk vectors.
            </p>
          </div>
          <span className="text-[10px] font-mono text-[#D4774C]">
            Model: Holt-Winters ARIMA
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {categoryProjections.map((cat, idx) => (
            <div
              key={cat.name}
              className="p-3.5 rounded bg-[#1A141D] border border-[#3D3342]/70 flex flex-col justify-between space-y-2"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-xs text-[#F3EBDD]">
                    {cat.name}
                  </div>
                  <div className="text-[10px] font-mono text-[#C95C5C] mt-0.5">
                    Risk Factor: {cat.risk}
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#D4774C] px-1.5 py-0.5 rounded bg-[#2A222D]">
                  {cat.growth}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#3D3342]/50 font-mono text-xs">
                <div>
                  <span className="text-[9px] text-[#A99EAA] block">CURRENT BASELINE</span>
                  <span className="text-[#F3EBDD] font-bold">₹{cat.currentCr} Cr</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-[#B8A06A] block">PROJECTED COMMITMENT</span>
                  <span className="text-[#B8A06A] font-bold">₹{cat.forecastCr} Cr</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
