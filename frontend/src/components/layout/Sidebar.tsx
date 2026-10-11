import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  FileSpreadsheet,
  ShieldAlert,
  Sparkles,
  LineChart,
  FileText,
  Sliders,
  Bot,
  FileCheck,
  ChevronRight,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { PageId } from '../../types';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  collapsed?: boolean;
}

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string;
  badgeType?: 'copper' | 'critical' | 'gold';
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'spend-intelligence', label: 'Spend Intelligence', icon: TrendingUp },
  { id: 'suppliers', label: 'Suppliers', icon: Users, badge: '25' },
  { id: 'purchase-orders', label: 'Purchase Orders', icon: FileSpreadsheet, badge: '1,284' },
  { id: 'risk-radar', label: 'Risk Radar', icon: ShieldAlert, badge: '12 HIGH', badgeType: 'critical' },
  { id: 'savings-lab', label: 'Savings Lab', icon: Sparkles, badge: '₹1.84Cr', badgeType: 'gold' },
  { id: 'forecast', label: 'Forecast', icon: LineChart },
  { id: 'contracts', label: 'Contracts', icon: FileText, badge: '7 Expiring', badgeType: 'copper' },
  { id: 'what-if', label: 'What-If Lab', icon: Sliders, badge: 'Twin' },
  { id: 'ai-analyst', label: 'AI Analyst', icon: Bot, badge: 'GPT' },
  { id: 'reports', label: 'Reports', icon: FileCheck },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  return (
    <aside className="w-64 bg-[#1F1922] border-r border-[#3D3342] flex flex-col h-screen select-none shrink-0 z-30">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#3D3342]/70 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('overview')}>
          <div className="relative w-9 h-9 rounded bg-[#2A222D] border border-[#B8A06A]/40 flex items-center justify-center p-1.5 shadow-sm group">
            <img src="/logo.svg" alt="PROCURA" className="w-full h-full object-contain filter drop-shadow group-hover:scale-105 transition-transform" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-editorial text-lg font-extrabold tracking-wider text-[#F3EBDD]">
                PROCURA
              </span>
              <span className="text-[9px] font-mono font-semibold px-1 py-0.2 rounded bg-[#D4774C]/20 text-[#D4774C] border border-[#D4774C]/30">
                PRO
              </span>
            </div>
            <div className="text-[10px] text-[#A99EAA] tracking-tight truncate max-w-[155px]">
              Procurement Intelligence
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-mono tracking-widest text-[#7C727D] uppercase font-semibold">
          Platform Architecture
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition-all group relative ${
                isActive
                  ? 'bg-[#2A222D] text-[#F3EBDD] border-l-2 border-l-[#D4774C] shadow-sm'
                  : 'text-[#A99EAA] hover:bg-[#251E28] hover:text-[#F3EBDD]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  size={16}
                  className={`transition-colors ${
                    isActive ? 'text-[#D4774C]' : 'text-[#7C727D] group-hover:text-[#B8A06A]'
                  }`}
                />
                <span className="truncate tracking-wide">{item.label}</span>
              </div>

              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <span
                    className={`font-mono text-[9px] px-1.5 py-0.5 rounded font-semibold ${
                      item.badgeType === 'critical'
                        ? 'bg-[#C95C5C]/20 text-[#E68585] border border-[#C95C5C]/30'
                        : item.badgeType === 'copper'
                        ? 'bg-[#D4774C]/20 text-[#E28E67] border border-[#D4774C]/30'
                        : item.badgeType === 'gold'
                        ? 'bg-[#B8A06A]/20 text-[#D4C39B] border border-[#B8A06A]/30'
                        : 'bg-[#2A222D] text-[#A99EAA]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight size={12} className="text-[#D4774C]" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* System Status Banner */}
      <div className="p-3 border-t border-[#3D3342]/70 bg-[#1A151D]">
        <div className="rounded bg-[#211B24] border border-[#3D3342]/80 p-2.5 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-[#7C727D] uppercase tracking-wider">System Status</span>
            <span className="flex items-center gap-1.5 text-[#8FAF78] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8FAF78] animate-pulse" />
              Operational
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] font-sans">
            <span className="text-[#F3EBDD] font-medium flex items-center gap-1">
              <Activity size={12} className="text-[#D4774C]" />
              Demo Dataset Active
            </span>
            <span className="font-mono text-[10px] text-[#B8A06A]">v2.6</span>
          </div>
          <div className="w-full bg-[#17131A] h-1 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-[#D4774C] to-[#B8A06A] h-full w-[88%]" />
          </div>
        </div>

        {/* User / Profile Area */}
        <div className="mt-2.5 pt-2 border-t border-[#3D3342]/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[#2A222D] border border-[#B8A06A]/40 flex items-center justify-center text-[10px] font-mono font-bold text-[#F3EBDD]">
              PS
            </div>
            <div>
              <div className="text-[11px] font-semibold text-[#F3EBDD] leading-tight">
                Procurement Strategy Team
              </div>
              <div className="text-[9px] text-[#A99EAA] font-mono leading-tight">
                Enterprise CPO Seat
              </div>
            </div>
          </div>
          <ShieldCheck size={14} className="text-[#8FAF78]" />
        </div>
      </div>
    </aside>
  );
};
