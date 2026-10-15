import React from 'react';
import { IMAGES } from '../data/mockData';

interface HeaderProps {
  onOpenAndroidCode: () => void;
  isBleConnected: boolean;
  onToggleBle: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAndroidCode,
  isBleConnected,
  onToggleBle,
}) => {
  return (
    <header className="sticky top-0 inset-x-0 z-40 bg-[#eefcff]/90 backdrop-blur-xl border-b border-[#0e7673]/10 shadow-[0_4px_20px_rgba(14,118,115,0.04)]">
      <div className="h-16 px-4 flex items-center justify-between gap-2 max-w-md mx-auto">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2">
          <img
            alt="NUBO-PE Logo"
            className="h-8 w-auto object-contain"
            src={IMAGES.logo}
            onError={(e) => {
              // Graceful fallback
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <span className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#005c59] tracking-tight">
            NUBO-PE
          </span>
        </div>

        {/* Connection status pill (interactive to simulate disconnect/reconnect) */}
        <button
          onClick={onToggleBle}
          title="Toca para simular reconexión Bluetooth / Wi-Fi"
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-[0_2px_8px_rgba(14,118,115,0.06)] hover:bg-white active:scale-95 transition-all border border-[#0e7673]/10"
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isBleConnected
                ? 'bg-[#006d40] animate-pulse-subtle'
                : 'bg-[#ba1a1a]'
            }`}
          />
          <span className="font-['Inter'] text-[11px] font-medium text-[#0a1e22]">
            {isBleConnected ? 'Conectado' : 'Reconectando...'}
          </span>
        </button>

        {/* Android Studio Kotlin button + Profile */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAndroidCode}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#005c59] text-white text-[11px] font-semibold hover:bg-[#0e7673] active:scale-95 transition-all shadow-sm"
            title="Ver y exportar código fuente Kotlin para Android Studio"
          >
            <span className="material-symbols-outlined text-[15px]">code</span>
            <span className="hidden sm:inline">Kotlin</span>
          </button>

          <div
            className="flex items-center justify-center p-0.5 rounded-full hover:opacity-90 active:scale-95 transition-transform"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border border-[#005c59]/20"
              src={IMAGES.profile}
              onError={(e) => {
                const target = e.target as HTMLElement;
                target.parentElement!.innerHTML = `
                  <div class="w-8 h-8 rounded-full bg-[#005c59] text-white flex items-center justify-center font-bold text-xs">
                    KA
                  </div>
                `;
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
