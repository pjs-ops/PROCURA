import React, { useState } from 'react';
import {
  CloudRain,
  Sun,
  CloudSun,
  CloudLightning,
  AlertTriangle,
  Clock,
  Activity,
  ShieldAlert
} from 'lucide-react';
import { WeatherState } from '../../types';

interface ProcurementWeatherProps {
  initialState?: WeatherState;
  onStateChange?: (state: WeatherState) => void;
}

export const ProcurementWeather: React.FC<ProcurementWeatherProps> = ({
  initialState = 'Cloudy',
  onStateChange,
}) => {
  const [currentState, setCurrentState] = useState<WeatherState>(initialState);

  const handleSelectState = (state: WeatherState) => {
    setCurrentState(state);
    if (onStateChange) onStateChange(state);
  };

  const weatherConfig = {
    Calm: {
      label: 'CALM',
      color: '#8FAF78',
      bgGlow: 'rgba(143, 175, 120, 0.15)',
      costPressure: 'LOW',
      deliveryRisk: 'MINIMAL',
      stability: '94%',
      drift: '+0.4d',
      blurb: 'Smooth global logistics corridors and flat commodity index trends across tier-1 materials.',
      icon: Sun,
    },
    Stable: {
      label: 'STABLE',
      color: '#B8A06A',
      bgGlow: 'rgba(184, 160, 106, 0.15)',
      costPressure: 'MODERATE',
      deliveryRisk: 'LOW',
      stability: '86%',
      drift: '+1.8d',
      blurb: 'Standard operational cadence with localized transit fluctuations in maritime lanes.',
      icon: CloudSun,
    },
    Cloudy: {
      label: 'CLOUDY',
      color: '#D4774C',
      bgGlow: 'rgba(212, 119, 76, 0.20)',
      costPressure: 'MEDIUM',
      deliveryRisk: 'HIGH',
      stability: '72%',
      drift: '+6.2d',
      blurb: 'Heightened geopolitical freight disruption and steel spot volatility driving moderate cost strain.',
      icon: CloudRain,
    },
    Storm: {
      label: 'STORM',
      color: '#C95C5C',
      bgGlow: 'rgba(201, 92, 92, 0.25)',
      costPressure: 'CRITICAL',
      deliveryRisk: 'ACUTE',
      stability: '48%',
      drift: '+14.5d',
      blurb: 'Severe multi-tier supply fracture, critical single-source stockouts, and extreme tariff surges.',
      icon: CloudLightning,
    },
  };

  const active = weatherConfig[currentState];
  const Icon = active.icon;

  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-[#241C27] via-[#211B24] to-[#1A141D] border border-[#3D3342] p-5 shadow-panel group">
      {/* Background radial glow matching current weather */}
      <div
        className="absolute -right-10 -top-10 w-52 h-52 rounded-full blur-3xl pointer-events-none transition-all duration-700"
        style={{ backgroundColor: active.bgGlow }}
      />

      {/* Header and State Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-[#3D3342]/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="kpi-label text-[#B8A06A] font-mono tracking-widest font-semibold text-xs">
            SIGNATURE SIGNAL // PROCUREMENT WEATHER
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4774C] animate-ping" />
        </div>

        {/* State Toggle for Interactive Demonstration */}
        <div className="flex items-center bg-[#17131A] p-0.5 rounded border border-[#3D3342]/80">
          {(['Calm', 'Stable', 'Cloudy', 'Storm'] as WeatherState[]).map((state) => (
            <button
              key={state}
              onClick={() => handleSelectState(state)}
              className={`px-2 py-0.5 text-[10px] font-mono uppercase rounded transition-all ${
                currentState === state
                  ? 'bg-[#2A222D] text-[#F3EBDD] font-bold shadow-sm'
                  : 'text-[#7C727D] hover:text-[#A99EAA]'
              }`}
            >
              {state}
            </button>
          ))}
        </div>
      </div>

      {/* Main Meteorological Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Left: Atmospheric Dial */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-3 rounded bg-[#17131A]/70 border border-[#3D3342]/60 relative text-center">
          <div className="relative mb-2">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-500"
              style={{
                borderColor: active.color,
                boxShadow: `0 0 20px -2px ${active.color}40`,
                backgroundColor: '#211B24'
              }}
            >
              <Icon size={32} style={{ color: active.color }} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#17131A] border border-[#3D3342] flex items-center justify-center">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: active.color }} />
            </div>
          </div>

          <div
            className="font-editorial text-2xl font-black tracking-widest uppercase transition-colors"
            style={{ color: active.color }}
          >
            {active.label}
          </div>
          <div className="text-[10px] font-mono text-[#A99EAA] mt-0.5">
            CURRENT ATMOSPHERIC VECTOR
          </div>
        </div>

        {/* Right: Technical Radar Readings */}
        <div className="md:col-span-7 grid grid-cols-3 gap-2.5">
          {/* Reading 1: Cost Pressure */}
          <div className="bg-[#17131A]/80 border border-[#3D3342]/60 rounded p-2.5 text-center">
            <div className="text-[10px] font-mono text-[#A99EAA] uppercase tracking-wider mb-1">
              Cost Pressure
            </div>
            <div
              className="font-mono text-sm font-bold"
              style={{
                color: active.costPressure === 'CRITICAL' ? '#C95C5C' : active.costPressure === 'MEDIUM' ? '#D6A45D' : '#8FAF78'
              }}
            >
              {active.costPressure}
            </div>
            <div className="text-[9px] text-[#7C727D] font-mono mt-0.5">
              Commodity Index
            </div>
          </div>

          {/* Reading 2: Delivery Risk */}
          <div className="bg-[#17131A]/80 border border-[#3D3342]/60 rounded p-2.5 text-center">
            <div className="text-[10px] font-mono text-[#A99EAA] uppercase tracking-wider mb-1">
              Delivery Risk
            </div>
            <div
              className="font-mono text-sm font-bold"
              style={{
                color: active.deliveryRisk === 'HIGH' || active.deliveryRisk === 'ACUTE' ? '#C95C5C' : '#8FAF78'
              }}
            >
              {active.deliveryRisk}
            </div>
            <div className="text-[9px] text-[#7C727D] font-mono mt-0.5">
              Drift: {active.drift}
            </div>
          </div>

          {/* Reading 3: Supply Stability */}
          <div className="bg-[#17131A]/80 border border-[#3D3342]/60 rounded p-2.5 text-center">
            <div className="text-[10px] font-mono text-[#A99EAA] uppercase tracking-wider mb-1">
              Supply Stability
            </div>
            <div className="font-mono text-sm font-bold text-[#F3EBDD]">
              {active.stability}
            </div>
            <div className="text-[9px] text-[#7C727D] font-mono mt-0.5">
              Lead Time Parity
            </div>
          </div>

          {/* Bottom Diagnostic Note */}
          <div className="col-span-3 bg-[#241D27]/80 rounded p-2 border border-[#3D3342]/50 flex items-center gap-2 text-xs">
            <AlertTriangle size={14} className="text-[#D6A45D] shrink-0" />
            <span className="text-[#A99EAA] text-[11px] font-sans truncate">
              {active.blurb}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
