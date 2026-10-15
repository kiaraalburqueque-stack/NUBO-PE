import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { IMAGES, ROOMS } from '../../data/mockData';
import { RoomData, RoomId } from '../../types/nubo';

interface EstadoScreenProps {
  onNavigateToTab?: (tab: any) => void;
  pebbleBrightness: number;
}

export const EstadoScreen: React.FC<EstadoScreenProps> = ({ pebbleBrightness }) => {
  const [selectedRoomId, setSelectedRoomId] = useState<RoomId>('salon');
  const [roomsState, setRoomsState] = useState<RoomData[]>(ROOMS);
  
  // Timer state for guided ventilation
  const [secondsRemaining, setSecondsRemaining] = useState<number>(15 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  // Active quick mode
  const [activeQuickMode, setActiveQuickMode] = useState<'silencio' | 'precision' | 'eco'>('eco');

  const currentRoom = roomsState.find((r) => r.id === selectedRoomId) || roomsState[0];

  // Circle stroke calculation
  const totalSeconds = 15 * 60;
  const initialCircumference = 264; // 2 * PI * 42 ~= 263.89
  const progress = secondsRemaining / totalSeconds;
  const strokeDashoffset = initialCircumference * (1 - progress);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            setHasCompleted(true);
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.6 },
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, secondsRemaining]);

  const toggleVentilation = () => {
    if (hasCompleted) {
      setSecondsRemaining(15 * 60);
      setHasCompleted(false);
      setIsTimerRunning(true);
      return;
    }
    setIsTimerRunning(!isTimerRunning);
  };

  const handleMarkAsOpened = () => {
    setHasCompleted(true);
    setIsTimerRunning(false);
    setSecondsRemaining(0);
    // Lower CO2 for realism
    setRoomsState((prev) =>
      prev.map((r) =>
        r.id === selectedRoomId
          ? { ...r, co2: 460, co2Status: 'Óptimo', co2Trend: 'down' }
          : r
      )
    );
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#005c59', '#7afbb1', '#006d40'],
    });
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col w-full px-4 pt-3 pb-24 gap-5 max-w-md mx-auto">
      {/* Selector de Espacio Activo */}
      <section className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center gap-1.5 shrink-0">
          {roomsState.map((room) => {
            const isSelected = room.id === selectedRoomId;
            return (
              <button
                key={room.id}
                onClick={() => setSelectedRoomId(room.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#005c59] text-white shadow-sm'
                    : 'bg-[#e2f8fc] text-[#3e4948] hover:bg-[#dcf2f6]'
                }`}
              >
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-[#7afbb1] animate-pulse" />
                )}
                <span>{room.name}</span>
                {isSelected && (
                  <span className="material-symbols-outlined text-[15px] opacity-80">
                    expand_more
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white text-[#005c59] shadow-sm shrink-0 border border-[#0e7673]/10">
          <span className="material-symbols-outlined text-[15px]">sensors</span>
          <span className="font-['Inter'] text-[11px] font-semibold">Sala #01</span>
        </div>
      </section>

      {/* Orbe Biofílico Central & Guía Intuitiva de Ventilación */}
      <section className="relative flex flex-col items-center justify-center p-6 rounded-[28px] bg-white shadow-[0_16px_40px_rgba(14,118,115,0.06)] border border-[#0e7673]/10 overflow-hidden text-center">
        {/* Aura lumínica reactiva ambiental tipo Hardware Ring */}
        <div
          className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#7afbb1]/30 blur-3xl pointer-events-none transition-opacity duration-500"
          style={{ opacity: pebbleBrightness / 100 }}
        />
        <div
          className="absolute -bottom-16 -left-12 w-64 h-64 rounded-full bg-[#9cf1ed]/25 blur-3xl pointer-events-none transition-opacity duration-500"
          style={{ opacity: pebbleBrightness / 100 }}
        />

        {/* Anillo Halo Emulado NUBO-PE */}
        <div className="relative w-52 h-52 flex items-center justify-center my-2">
          {/* Glow perimetral del halo */}
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-tr from-[#7afbb1] via-[#9cf1ed] to-[#5cde97] blur-md transition-all duration-700 ${
              isTimerRunning ? 'animate-pulse-subtle opacity-70' : 'opacity-40'
            }`}
          />

          {/* SVG Dial Biofílico */}
          <svg className="w-full h-full -rotate-90 relative z-10" viewBox="0 0 100 100">
            <circle
              className="text-[#d6ecf1]"
              cx="50"
              cy="50"
              fill="none"
              r="42"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="5"
            />
            <circle
              className="text-[#006d40] transition-all duration-700"
              cx="50"
              cy="50"
              fill="none"
              r="42"
              stroke="currentColor"
              strokeDasharray={initialCircumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              strokeWidth="5.5"
            />
          </svg>

          {/* Núcleo Interactivo de la Esfera */}
          <div className="absolute inset-3 rounded-full bg-white flex flex-col items-center justify-center p-3 shadow-inner z-20">
            <span className="material-symbols-outlined text-[#006d40] text-[28px] mb-0.5 symbol-filled">
              wind_power
            </span>
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-3xl text-[#005c59] tracking-tight">
              {formatTime(secondsRemaining)}
            </span>
            <span className="font-['Inter'] text-[11px] text-[#3e4948] font-medium mt-0.5">
              {hasCompleted ? 'Renovado' : 'Recomendado'}
            </span>
          </div>
        </div>

        {/* Mensajes Semánticos Claros */}
        <div className="relative z-20 mt-2 max-w-xs">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7afbb1] text-[#007444] mb-2 font-['Inter'] text-xs font-semibold shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006d40] animate-ping" />
            <span>Momento Ideal para Ventilar</span>
          </div>
          <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#0a1e22] tracking-tight">
            {hasCompleted
              ? '¡Ambiente purificado con éxito!'
              : 'Abre ventanas 15 minutos para renovar el aire'}
          </h2>
          <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#3e4948] mt-1.5 leading-relaxed">
            {hasCompleted
              ? 'El flujo de aire exterior ha equilibrado los niveles de oxígeno en tu estancia.'
              : 'El aire exterior está limpio y fresco. El CO₂ interior comienza a concentrarse ligeramente.'}
          </p>
        </div>

        {/* Botón de Acción Principal y Toggle de Estado */}
        <div className="relative z-20 w-full mt-4 flex flex-col gap-2">
          <button
            onClick={toggleVentilation}
            className="w-full h-12 rounded-full bg-[#005c59] text-white font-['Inter'] text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(0,92,89,0.22)] active:scale-[0.98] transition-transform hover:bg-[#0e7673]"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isTimerRunning ? 'pause' : hasCompleted ? 'replay' : 'play_arrow'}
            </span>
            <span>
              {isTimerRunning
                ? 'Pausar ventilación guiada'
                : hasCompleted
                ? 'Reiniciar temporizador'
                : secondsRemaining < totalSeconds
                ? 'Reanudar ventilación'
                : 'Iniciar ventilación guiada'}
            </span>
          </button>

          <button
            onClick={handleMarkAsOpened}
            className="w-full h-10 rounded-full bg-[#e2f8fc] text-[#005c59] font-['Inter'] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#dcf2f6] active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[17px]">check</span>
            <span>Ya he abierto las ventanas</span>
          </button>
        </div>
      </section>

      {/* Tarjeta de Síntesis Interior vs Exterior */}
      <section className="flex flex-col rounded-[24px] bg-white p-4 shadow-[0_8px_24px_rgba(14,118,115,0.04)] border border-[#0e7673]/10 gap-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#0a1e22]">
            Balance de Ambientes
          </h3>
          <span className="font-['Inter'] text-[11px] text-[#005c59] flex items-center gap-1 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#006d40]" />
            Sincronizado
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Interior */}
          <div className="flex flex-col p-3 rounded-2xl bg-[#e2f8fc]/70 justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="font-['Inter'] text-xs font-bold text-[#0a1e22]">
                Interior
              </span>
              <span
                className={`px-2 py-0.5 rounded-full font-['Inter'] text-[10px] font-semibold ${
                  currentRoom.co2Status === 'Óptimo'
                    ? 'bg-[#7afbb1] text-[#007444]'
                    : 'bg-[#d6ecf1] text-[#3e4948]'
                }`}
              >
                {currentRoom.co2Status}
              </span>
            </div>

            <div className="space-y-1.5 my-1">
              <div className="flex items-center justify-between text-[#0a1e22]">
                <span className="font-['Inter'] text-xs text-[#3e4948] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#744800]">
                    co2
                  </span>
                  CO₂
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold tabular-nums">
                  {currentRoom.co2} ppm
                </span>
              </div>

              <div className="flex items-center justify-between text-[#0a1e22]">
                <span className="font-['Inter'] text-xs text-[#3e4948] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#005c59]">
                    thermostat
                  </span>
                  Temp.
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold tabular-nums">
                  {currentRoom.temp}°C
                </span>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-[#0e7673]/10 flex items-center gap-1 text-[#3e4948]">
              <span className="material-symbols-outlined text-[14px] text-[#744800]">
                {currentRoom.co2Trend === 'up'
                  ? 'trending_up'
                  : currentRoom.co2Trend === 'down'
                  ? 'trending_down'
                  : 'trending_flat'}
              </span>
              <span className="font-['Inter'] text-[10px]">
                {currentRoom.co2Trend === 'up' ? 'CO₂ subiendo' : 'Estable'}
              </span>
            </div>
          </div>

          {/* Exterior */}
          <div className="flex flex-col p-3 rounded-2xl bg-[#7afbb1]/20 justify-between border border-[#006d40]/15">
            <div className="flex items-center justify-between mb-2">
              <span className="font-['Inter'] text-xs font-bold text-[#0a1e22]">
                Exterior
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#7afbb1] text-[#007444] font-['Inter'] text-[10px] font-bold">
                Puro
              </span>
            </div>

            <div className="space-y-1.5 my-1">
              <div className="flex items-center justify-between text-[#0a1e22]">
                <span className="font-['Inter'] text-xs text-[#3e4948] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#006d40]">
                    filter_vintage
                  </span>
                  AQI
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#006d40]">
                  22 Óptimo
                </span>
              </div>

              <div className="flex items-center justify-between text-[#0a1e22]">
                <span className="font-['Inter'] text-xs text-[#3e4948] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#005c59]">
                    air
                  </span>
                  Brisa
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold">
                  18°C · Suave
                </span>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-[#006d40]/15 flex items-center gap-1 text-[#006d40]">
              <span className="material-symbols-outlined text-[14px]">nature_people</span>
              <span className="font-['Inter'] text-[10px] font-bold">Flujo favorable</span>
            </div>
          </div>
        </div>
      </section>

      {/* Imagen Contextual de Armonía Hogar */}
      <section className="relative w-full h-36 rounded-[24px] overflow-hidden shadow-sm">
        <img
          className="w-full h-full object-cover"
          alt="Modern living room interior"
          src={IMAGES.livingRoomBanner}
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#203337]/90 via-[#203337]/30 to-transparent flex items-end p-4">
          <div className="flex items-center justify-between w-full text-white">
            <div>
              <p className="font-['Inter'] text-[11px] text-[#7afbb1] font-semibold tracking-wide">
                Purificación Natural
              </p>
              <p className="font-['Plus_Jakarta_Sans'] text-base font-bold">
                Brisa cruzada óptima
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] text-[#7afbb1]">
                window
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Modos Rápidos de Hardware NUBO-PE */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#0a1e22]">
            Modos Rápidos del Sensor
          </h3>
          <span className="font-['Inter'] text-[11px] text-[#3e4948]">LED Ring Activo</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Silencio Nocturno */}
          <button
            onClick={() => setActiveQuickMode('silencio')}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all active:scale-95 border ${
              activeQuickMode === 'silencio'
                ? 'bg-[#005c59] text-white border-[#005c59] shadow-md'
                : 'bg-white text-[#0a1e22] border-[#0e7673]/10 hover:bg-[#e2f8fc]'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center mb-1.5 ${
                activeQuickMode === 'silencio'
                  ? 'bg-white/20 text-white'
                  : 'bg-[#dcf2f6] text-[#005c59]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">bedtime</span>
            </div>
            <span className="font-['Inter'] text-xs font-semibold text-center leading-tight">
              Silencio Nocturno
            </span>
            <span
              className={`font-['Inter'] text-[10px] mt-0.5 ${
                activeQuickMode === 'silencio' ? 'text-[#a4faf5]' : 'text-[#3e4948]'
              }`}
            >
              LED tenue
            </span>
          </button>

          {/* Alta Precisión */}
          <button
            onClick={() => setActiveQuickMode('precision')}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all active:scale-95 border ${
              activeQuickMode === 'precision'
                ? 'bg-[#005c59] text-white border-[#005c59] shadow-md'
                : 'bg-white text-[#0a1e22] border-[#0e7673]/10 hover:bg-[#e2f8fc]'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center mb-1.5 ${
                activeQuickMode === 'precision'
                  ? 'bg-white/20 text-white'
                  : 'bg-[#dcf2f6] text-[#005c59]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">radar</span>
            </div>
            <span className="font-['Inter'] text-xs font-semibold text-center leading-tight">
              Alta Precisión
            </span>
            <span
              className={`font-['Inter'] text-[10px] mt-0.5 ${
                activeQuickMode === 'precision' ? 'text-[#a4faf5]' : 'text-[#3e4948]'
              }`}
            >
              Muestreo 10s
            </span>
          </button>

          {/* Eco Brisa */}
          <button
            onClick={() => setActiveQuickMode('eco')}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all active:scale-95 border ${
              activeQuickMode === 'eco'
                ? 'bg-[#005c59] text-white border-[#005c59] shadow-md'
                : 'bg-white text-[#0a1e22] border-[#0e7673]/10 hover:bg-[#e2f8fc]'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center mb-1.5 ${
                activeQuickMode === 'eco'
                  ? 'bg-[#7afbb1] text-[#002110]'
                  : 'bg-[#7afbb1]/30 text-[#006d40]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">spa</span>
            </div>
            <span className="font-['Inter'] text-xs font-semibold text-center leading-tight">
              Eco Brisa
            </span>
            <span
              className={`font-['Inter'] text-[10px] mt-0.5 ${
                activeQuickMode === 'eco' ? 'text-[#7afbb1]' : 'text-[#006d40]'
              }`}
            >
              Activo
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};
