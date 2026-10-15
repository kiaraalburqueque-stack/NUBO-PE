import React from 'react';

interface DeviceFrameProps {
  children: React.ReactNode;
  isFrameEnabled: boolean;
  onToggleFrame: () => void;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  isFrameEnabled,
  onToggleFrame,
}) => {
  if (!isFrameEnabled) {
    return (
      <div className="min-h-screen bg-[#eefcff] flex flex-col items-center">
        {/* Floating Switcher Controls */}
        <div className="fixed top-2 right-4 z-50 flex items-center gap-2">
          <button
            onClick={onToggleFrame}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-md text-[#005c59] text-xs font-bold border border-[#0e7673]/20 hover:bg-white active:scale-95 transition-all"
            title="Activar marco de teléfono Android"
          >
            <span className="material-symbols-outlined text-[16px]">smartphone</span>
            <span>Marco Android</span>
          </button>
        </div>
        <div className="w-full max-w-md min-h-screen relative flex flex-col shadow-xl bg-[#eefcff]">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a181b] flex flex-col items-center justify-center p-2 sm:p-6 select-none">
      {/* Top control bar outside phone */}
      <div className="w-full max-w-md flex items-center justify-between pb-3 px-2 text-white/80">
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-[#7afbb1] animate-pulse" />
          <span className="font-['Plus_Jakarta_Sans'] font-semibold text-white">
            Simulador Android Google Pixel
          </span>
        </div>

        <button
          onClick={onToggleFrame}
          className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all"
          title="Ver en pantalla completa sin marco"
        >
          <span className="material-symbols-outlined text-[15px]">fullscreen</span>
          <span>Expandir</span>
        </button>
      </div>

      {/* Realistic Android Phone Mockup */}
      <div className="relative w-full max-w-[400px] h-[860px] bg-black rounded-[48px] p-[10px] shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_0_2px_rgba(255,255,255,0.1)] flex flex-col">
        {/* Outer Phone Bezel & Volume/Power Buttons decoration */}
        <div className="absolute -left-[3px] top-28 w-[3px] h-12 bg-zinc-700 rounded-l" />
        <div className="absolute -left-[3px] top-44 w-[3px] h-12 bg-zinc-700 rounded-l" />
        <div className="absolute -right-[3px] top-32 w-[3px] h-14 bg-zinc-700 rounded-r" />

        {/* Inner Screen */}
        <div className="relative w-full h-full bg-[#eefcff] rounded-[38px] overflow-hidden flex flex-col">
          {/* Android Status Bar */}
          <div className="h-7 px-6 bg-[#eefcff] flex items-center justify-between text-[#0a1e22] z-50 shrink-0 text-[11px] font-['Inter'] font-bold select-none">
            <span>10:17</span>

            {/* Front Camera Punch-Hole */}
            <div className="w-3.5 h-3.5 rounded-full bg-black shadow-inner flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#005c59]/40" />
            </div>

            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[13px]">wifi</span>
              <span className="material-symbols-outlined text-[13px]">signal_cellular_alt</span>
              <span className="material-symbols-outlined text-[14px]">battery_full</span>
            </div>
          </div>

          {/* App Body Content */}
          <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
            {children}
          </div>

          {/* Android Navigation Gesture Bar */}
          <div className="h-4 bg-[#eefcff] flex items-center justify-center shrink-0 z-50">
            <div className="w-32 h-1 bg-black/40 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
