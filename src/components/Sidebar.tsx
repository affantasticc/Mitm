import React from 'react';
import { useTranslation } from '../i18n/context';
import {
  LayoutDashboard,
  TrendingUp,
  Cpu,
  Split,
  Warehouse,
  Calculator,
  ScanEye,
  Sprout,
  CloudSun,
  MapPin,
  Truck,
  ShoppingBag,
  Package,
  Wallet,
  Users,
  Award,
  Settings,
  BarChart3,
  Calendar,
  Layers,
  Stethoscope
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab }) => {
  const { t, currentRole } = useTranslation();

  const decisionEngines = [
    { id: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { id: 'market', label: t.nav.marketPrices, icon: TrendingUp },
    { id: 'analytics', label: t.nav.marketAnalytics, icon: BarChart3, highlight: true },
    { id: 'forecast', label: t.nav.priceForecast, icon: Cpu },
    { id: 'optimizer', label: t.nav.allocationOptimizer, icon: Split, highlight: true },
    { id: 'capacity', label: t.nav.mandiCapacity, icon: Warehouse },
    { id: 'calculator', label: 'Profit Calculator', icon: Calculator },
  ];

  const agronomyAndField = [
    { id: 'digitalTwin', label: t.nav.digitalTwin, icon: Layers, highlight: true },
    { id: 'harvest', label: t.nav.harvestPlanning, icon: Calendar },
    { id: 'health', label: t.nav.cropHealth, icon: ScanEye },
    { id: 'selection', label: t.nav.cropSelection, icon: Sprout },
    { id: 'weather', label: t.nav.weather, icon: CloudSun },
    { id: 'map', label: t.nav.interactiveMap, icon: MapPin },
    { id: 'expert', label: t.nav.expertPortal, icon: Stethoscope },
  ];

  const commerceAndEcosystem = [
    { id: 'transport', label: t.nav.transportSharing, icon: Truck },
    { id: 'marketplace', label: t.nav.buyerMarket, icon: ShoppingBag },
    { id: 'storage', label: t.nav.storage, icon: Package },
    { id: 'finance', label: t.nav.finance, icon: Wallet },
    { id: 'community', label: t.nav.community, icon: Users, highlight: true },
    { id: 'schemes', label: t.nav.schemes, icon: Award },
    { id: 'admin', label: t.nav.adminPortal, icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-50 border-r border-slate-200 min-h-[calc(100vh-4rem)] flex flex-col justify-between shrink-0">
      <div className="p-3 space-y-1">
        <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-600">
          Decision Engines
        </div>
        {decisionEngines.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left cursor-pointer ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200/70 hover:text-slate-900'
              } ${item.highlight && !isActive ? 'border border-emerald-300 bg-emerald-50/60 text-emerald-900 font-semibold' : ''}`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : item.highlight ? 'text-emerald-700' : 'text-slate-600'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}

        <div className="pt-3 px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-600">
          Agronomy & Field
        </div>
        {agronomyAndField.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left cursor-pointer ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200/70 hover:text-slate-900'
              } ${item.highlight && !isActive ? 'border border-emerald-300 bg-emerald-50/60 text-emerald-900 font-semibold' : ''}`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : item.highlight ? 'text-emerald-700' : 'text-slate-600'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}

        <div className="pt-3 px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-600">
          Commerce & Ecosystem
        </div>
        {commerceAndEcosystem.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left cursor-pointer ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200/70 hover:text-slate-900'
              } ${item.highlight && !isActive ? 'border border-emerald-300 bg-emerald-50/60 text-emerald-900 font-semibold' : ''}`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : item.highlight ? 'text-emerald-700' : 'text-slate-600'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* System status footer */}
      <div className="p-3 m-3 bg-white border border-slate-200 rounded-lg text-xs space-y-1">
        <div className="flex items-center justify-between text-slate-700">
          <span className="font-semibold">AGMARKNET Sync</span>
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block animate-pulse"></span>
            LIVE
          </span>
        </div>
        <div className="text-slate-600 text-[11px]">
          12 Mandis · Oct 30 10:30 IST
        </div>
      </div>
    </aside>
  );
};
