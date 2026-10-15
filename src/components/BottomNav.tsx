import React from 'react';
import { ScreenTab } from '../types/nubo';

interface BottomNavProps {
  currentTab: ScreenTab;
  onSelectTab: (tab: ScreenTab) => void;
}

interface NavItem {
  tab: ScreenTab;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { tab: 'estado', label: 'Estado', icon: 'air' },
  { tab: 'diagnostico', label: 'Diagnóstico', icon: 'query_stats' },
  { tab: 'pronostico', label: 'Pronóstico', icon: 'schedule' },
  { tab: 'historial', label: 'Historial', icon: 'trending_up' },
  { tab: 'dispositivo', label: 'Dispositivo', icon: 'tune' },
];

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#eefcff]/90 backdrop-blur-xl border-t border-[#0e7673]/10 shadow-[0_-4px_24px_rgba(14,118,115,0.06)] pb-[env(safe-area-inset-bottom,0px)]">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-1">
        {NAV_ITEMS.map((item) => {
          const isActive = currentTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => onSelectTab(item.tab)}
              className={`flex flex-col items-center justify-center gap-1 min-w-[48px] py-1 px-1.5 transition-all flex-1 ${
                isActive
                  ? 'text-[#005c59] font-bold scale-105'
                  : 'text-[#3e4948] hover:text-[#005c59]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[23px] transition-transform ${
                  isActive ? 'symbol-filled scale-110' : ''
                }`}
              >
                {item.icon}
              </span>
              <span className="font-['Inter'] text-[11px] leading-tight text-center truncate max-w-full">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#005c59] -mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
