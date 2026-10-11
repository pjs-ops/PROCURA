import React from 'react';
import {
  Search,
  Bell,
  CloudSun,
  CloudRain,
  Sun,
  CloudLightning,
  Sliders,
  Sparkles,
  Command,
  Menu
} from 'lucide-react';
import { PageId, WeatherState } from '../../types';
import { MOCK_WEATHER } from '../../data/mockData';

interface TopbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenCommandPalette: () => void;
  onToggleMobileMenu?: () => void;
  unreadAlertCount: number;
}

export const Topbar: React.FC<TopbarProps> = ({
  currentPage,
  onNavigate,
  onOpenCommandPalette,
  onToggleMobileMenu,
  unreadAlertCount,
}) => {
  const getPageTitle = (id: PageId) => {
    switch (id) {
      case 'overview':
        return { title: 'Procurement Command Center', subtitle: 'Macro Spend Flow, Signals & Executive Pulse' };
      case 'spend-intelligence':
        return { title: 'Spend Intelligence & Analytics', subtitle: 'Category Depth, Vendor Concentration & Leakage' };
      case 'suppliers':
        return { title: 'Supplier Constellation & Directory', subtitle: 'Dynamic Performance Clustering & Risk Topology' };
      case 'supplier-detail':
        return { title: 'Supplier DNA & Intelligence Dossier', subtitle: 'Apex Industrial Components (Sole-Source Deep Dive)' };
      case 'purchase-orders':
        return { title: 'PO Control Tower', subtitle: 'Real-Time Order Velocity, Exceptions & Delay Mitigation' };
      case 'risk-radar':
        return { title: 'Procurement Risk Radar & Early Warning', subtitle: 'Multi-Vector Threat Matrix & Actionable Signals' };
      case 'savings-lab':
        return { title: 'Savings Lab & Anomaly Detection', subtitle: 'Leakage Recapture, Variance Clamping & Duplicate Consolidation' };
      case 'forecast':
        return { title: 'Procurement Demand & Spend Forecast', subtitle: 'Probabilistic Forecasting with Confidence Bands' };
      case 'contracts':
        return { title: 'Contract Intelligence & Lifecycle', subtitle: 'Expiry Horizons, SLA Adherence & Off-Tariff Leakage' };
      case 'what-if':
        return { title: 'Procurement Digital Twin (What-If Lab)', subtitle: 'Real-Time Allocation, Cost Shock & Sourcing Simulation' };
      case 'ai-analyst':
        return { title: 'Procurement AI Analyst', subtitle: 'Evidence-Based Strategic Intelligence Engine' };
      case 'reports':
        return { title: 'Procurement Executive Reports & Dossiers', subtitle: 'Audit-Ready Intelligence & C-Suite Briefings' };
      default:
        return { title: 'Procurement Platform', subtitle: 'Enterprise Intelligence' };
    }
  };

  const pageInfo = getPageTitle(currentPage);

  const getWeatherIcon = (state: WeatherState) => {
    switch (state) {
      case 'Storm':
        return <CloudLightning size={14} className="text-[#C95C5C] animate-pulse" />;
      case 'Cloudy':
        return <CloudRain size={14} className="text-[#D6A45D]" />;
      case 'Stable':
        return <CloudSun size={14} className="text-[#B8A06A]" />;
      case 'Calm':
      default:
        return <Sun size={14} className="text-[#8FAF78]" />;
    }
  };

  return (
    <header className="h-16 bg-[#1B161E]/95 backdrop-blur-md border-b border-[#3D3342] px-4 md:px-6 flex items-center justify-between sticky top-0 z-20 select-none">
      {/* Left: Mobile hamburger + Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-1.5 rounded bg-[#2A222D] text-[#A99EAA] hover:text-[#F3EBDD]"
        >
          <Menu size={18} />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-editorial text-base md:text-lg font-bold text-[#F3EBDD] tracking-tight">
              {pageInfo.title}
            </h1>
            <span className="hidden lg:inline-block font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#2A222D] text-[#B8A06A] border border-[#3D3342]">
              LIVE RADAR
            </span>
          </div>
          <div className="hidden sm:block text-[11px] text-[#A99EAA] truncate font-sans">
            {pageInfo.subtitle}
          </div>
        </div>
      </div>

      {/* Right: Quick actions & Search Bar */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Ctrl+K Search button */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#211B24] border border-[#3D3342] hover:border-[#D4774C]/50 text-[#A99EAA] hover:text-[#F3EBDD] transition-colors text-xs font-sans group"
        >
          <Search size={14} className="text-[#D4774C]" />
          <span className="hidden sm:inline">Search signals & suppliers...</span>
          <span className="sm:hidden">Search</span>
          <span className="flex items-center gap-0.5 font-mono text-[10px] bg-[#2A222D] px-1.5 py-0.5 rounded text-[#B8A06A] border border-[#3D3342]/80 group-hover:border-[#D4774C]/40">
            <Command size={10} /> K
          </span>
        </button>

        {/* Procurement Weather Chip */}
        <button
          onClick={() => onNavigate('overview')}
          className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-[#241D27] border border-[#3D3342] hover:border-[#B8A06A]/40 transition-colors"
          title={`Procurement Weather: ${MOCK_WEATHER.state}. Click to inspect.`}
        >
          {getWeatherIcon(MOCK_WEATHER.state)}
          <span className="font-mono text-[10px] uppercase font-bold text-[#F3EBDD]">
            {MOCK_WEATHER.state}
          </span>
          <span className="font-mono text-[9px] px-1 rounded bg-[#C95C5C]/20 text-[#E68585]">
            HIGH RISK
          </span>
        </button>

        {/* Quick Launch Digital Twin */}
        <button
          onClick={() => onNavigate('what-if')}
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#2A222D] border border-[#D4774C]/40 hover:bg-[#D4774C]/20 text-[#F3EBDD] transition-all text-xs font-medium"
        >
          <Sliders size={13} className="text-[#D4774C]" />
          <span className="text-[11px] font-mono">Digital Twin</span>
        </button>

        {/* Quick Launch AI Analyst */}
        <button
          onClick={() => onNavigate('ai-analyst')}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#D4774C]/15 border border-[#D4774C]/40 hover:bg-[#D4774C]/25 text-[#F3EBDD] transition-all text-xs font-medium"
        >
          <Sparkles size={13} className="text-[#D4774C]" />
          <span className="text-[11px] font-mono hidden sm:inline">AI Query</span>
        </button>

        {/* Early Warning Notification Bell */}
        <button
          onClick={() => onNavigate('risk-radar')}
          className="relative p-2 rounded-md bg-[#211B24] border border-[#3D3342] text-[#A99EAA] hover:text-[#F3EBDD] hover:border-[#D4774C]/40 transition-colors"
          title={`${unreadAlertCount} active procurement alerts`}
        >
          <Bell size={15} />
          {unreadAlertCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C95C5C] text-[9px] font-mono font-bold text-[#F3EBDD] flex items-center justify-center animate-pulse">
              {unreadAlertCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
