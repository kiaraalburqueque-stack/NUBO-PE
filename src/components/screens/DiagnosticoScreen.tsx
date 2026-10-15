import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { IMAGES } from '../../data/mockData';

export const DiagnosticoScreen: React.FC = () => {
  // 5-minute cross ventilation timer
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(300); // 5 min
  const [timerFinished, setTimerFinished] = useState<boolean>(false);

  // Accordion open states
  const [openFactor, setOpenFactor] = useState<string | null>('co2');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            setTimerActive(false);
            setTimerFinished(true);
            confetti({
              particleCount: 70,
              spread: 60,
              origin: { y: 0.7 },
            });
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, secondsLeft]);

  const toggleCrossTimer = () => {
    if (timerFinished) {
      setSecondsLeft(300);
      setTimerFinished(false);
      setTimerActive(true);
      return;
    }
    setTimerActive(!timerActive);
  };

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex flex-col w-full px-4 pt-3 pb-24 gap-5 max-w-md mx-auto">
      {/* Hero / Diagnostic Context Card */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-white/95 backdrop-blur-md p-4 shadow-[0_8px_24px_rgba(14,118,115,0.06)] border border-[#0e7673]/10">
        <div className="absolute -top-16 -left-12 w-64 h-64 bg-[#7afbb1]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-8 -right-12 w-56 h-56 bg-[#ffddb8]/30 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#d6ecf1] text-[#005c59]">
              <span className="material-symbols-outlined text-[17px]">psychology_alt</span>
            </span>
            <span className="font-['Inter'] text-[11px] text-[#005c59] uppercase tracking-wider font-bold">
              Transparencia Inteligente
            </span>
          </div>

          <h1 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#0a1e22] tracking-tight">
            ¿Por qué ventilar ahora?
          </h1>

          <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#3e4948] leading-relaxed">
            Detectamos acumulación natural de CO₂ tras 2 horas de concentración. El
            exterior presenta condiciones idóneas para renovar el ambiente y revitalizar
            tu energía.
          </p>

          <div className="mt-2 flex items-center gap-2 p-2.5 bg-[#e2f8fc] rounded-xl text-[#005c59]">
            <span className="material-symbols-outlined text-[18px] text-[#744800] shrink-0">
              info
            </span>
            <p className="font-['Inter'] text-xs text-[#3e4948]">
              Momento óptimo: aire fresco sin polen ni polución alta.
            </p>
          </div>
        </div>
      </div>

      {/* Ambient Photo Collage: Room Mood & Fresh Outdoors */}
      <div className="grid grid-cols-2 gap-3">
        <div className="relative h-28 rounded-xl overflow-hidden shadow-sm border border-[#0e7673]/10">
          <img
            className="w-full h-full object-cover"
            alt="Interior study desk"
            src={IMAGES.indoorStudy}
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span className="absolute bottom-2 left-2 font-['Inter'] text-[11px] text-white font-medium flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#ffb95f]" />
            Interior (Tu espacio)
          </span>
        </div>

        <div className="relative h-28 rounded-xl overflow-hidden shadow-sm border border-[#0e7673]/10">
          <img
            className="w-full h-full object-cover"
            alt="Outdoor park fresh breeze"
            src={IMAGES.outdoorPark}
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span className="absolute bottom-2 left-2 font-['Inter'] text-[11px] text-white font-medium flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#7afbb1]" />
            Exterior (Aire fresco)
          </span>
        </div>
      </div>

      {/* Comparativa en tiempo real */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#0a1e22]">
            Comparativa en tiempo real
          </span>
          <span className="font-['Inter'] text-[11px] text-[#005c59] font-medium">
            Actualizado hace 1 min
          </span>
        </div>

        <div className="flex flex-col gap-1.5 bg-white rounded-2xl p-3 shadow-[0_4px_20px_rgba(14,118,115,0.05)] border border-[#0e7673]/10">
          {/* Calidad del Aire */}
          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#e2f8fc]/60">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-[#ffb95f]" />
                <span className="font-['Inter'] text-[11px] text-[#3e4948] font-medium">
                  Interior
                </span>
              </div>
              <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#0a1e22]">
                Regular
              </span>
              <span className="font-['Inter'] text-[10px] text-[#3e4948] truncate">
                Por respiración sostenida
              </span>
            </div>

            <div className="flex flex-col min-w-0 border-l border-[#0e7673]/10 pl-2.5">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-[#006d40]" />
                <span className="font-['Inter'] text-[11px] text-[#005c59] font-semibold">
                  Exterior
                </span>
              </div>
              <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#006d40]">
                Óptima y pura
              </span>
              <span className="font-['Inter'] text-[10px] text-[#3e4948] truncate">
                Brisa limpia y ligera
              </span>
            </div>
          </div>

          {/* Temperatura */}
          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-[#006d40]" />
                <span className="font-['Inter'] text-[11px] text-[#3e4948] font-medium">
                  Temperatura
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#0a1e22]">
                  23°C
                </span>
                <span className="font-['Inter'] text-[10px] text-[#3e4948]">
                  Agradable
                </span>
              </div>
            </div>

            <div className="flex flex-col min-w-0 border-l border-[#0e7673]/10 pl-2.5">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-[#006d40]" />
                <span className="font-['Inter'] text-[11px] text-[#005c59] font-semibold">
                  Exterior
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#005c59]">
                  19°C
                </span>
                <span className="font-['Inter'] text-[10px] text-[#006d40] font-medium">
                  Refrescante
                </span>
              </div>
            </div>
          </div>

          {/* Humedad */}
          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#e2f8fc]/60">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-[#006d40]" />
                <span className="font-['Inter'] text-[11px] text-[#3e4948] font-medium">
                  Humedad
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#0a1e22]">
                  58%
                </span>
                <span className="font-['Inter'] text-[10px] text-[#3e4948]">Estable</span>
              </div>
            </div>

            <div className="flex flex-col min-w-0 border-l border-[#0e7673]/10 pl-2.5">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-[#006d40]" />
                <span className="font-['Inter'] text-[11px] text-[#005c59] font-semibold">
                  Exterior
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#005c59]">
                  48%
                </span>
                <span className="font-['Inter'] text-[10px] text-[#006d40] font-medium">
                  Equilibrada
                </span>
              </div>
            </div>
          </div>

          {/* Alérgenos */}
          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-[#006d40]" />
                <span className="font-['Inter'] text-[11px] text-[#3e4948] font-medium">
                  Alérgenos int.
                </span>
              </div>
              <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#0a1e22]">
                Mínimos
              </span>
              <span className="font-['Inter'] text-[10px] text-[#3e4948] truncate">
                Polvo bajo control
              </span>
            </div>

            <div className="flex flex-col min-w-0 border-l border-[#0e7673]/10 pl-2.5">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-[#006d40]" />
                <span className="font-['Inter'] text-[11px] text-[#005c59] font-semibold">
                  Polen y tráfico
                </span>
              </div>
              <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#006d40]">
                Muy bajo
              </span>
              <span className="font-['Inter'] text-[10px] text-[#3e4948] truncate">
                Sin tráfico próximo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Factores analizados */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#0a1e22]">
            Factores analizados
          </span>
          <span className="font-['Inter'] text-[11px] text-[#3e4948]">
            Toca para explorar
          </span>
        </div>

        {/* Factor 1: CO2 */}
        <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#0e7673]/10 transition-all">
          <button
            onClick={() => setOpenFactor(openFactor === 'co2' ? null : 'co2')}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-[#dcf2f6] flex items-center justify-center text-[#005c59]">
                <span className="material-symbols-outlined text-[19px]">co2</span>
              </span>
              <div className="flex flex-col">
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#0a1e22]">
                  Nivel de CO₂ (Dióxido de Carbono)
                </span>
                <span className="font-['Inter'] text-[11px] text-[#744800] font-semibold">
                  890 ppm · Leve somnolencia
                </span>
              </div>
            </div>
            <span
              className={`material-symbols-outlined text-[20px] text-[#3e4948] transition-transform ${
                openFactor === 'co2' ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>

          {openFactor === 'co2' && (
            <div className="mt-3 pt-3 border-t border-[#0e7673]/10 flex flex-col gap-2">
              <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#3e4948] leading-relaxed">
                890 ppm. Te puede causar leve somnolencia y pérdida de foco. No es
                peligroso, pero renovar el aire restaurará tu nivel de atención rápidamente.
              </p>
              <div className="w-full bg-[#dcf2f6] h-2 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-[#ffb95f] h-full rounded-full transition-all"
                  style={{ width: '58%' }}
                />
              </div>
              <div className="flex justify-between font-['Inter'] text-[10px] text-[#3e4948] mt-0.5">
                <span>Óptimo (&lt;600)</span>
                <span className="font-bold text-[#744800]">Actual (890)</span>
                <span>Pesado (&gt;1200)</span>
              </div>
            </div>
          )}
        </div>

        {/* Factor 2: COVs */}
        <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#0e7673]/10 transition-all">
          <button
            onClick={() => setOpenFactor(openFactor === 'voc' ? null : 'voc')}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-[#dcf2f6] flex items-center justify-center text-[#005c59]">
                <span className="material-symbols-outlined text-[19px]">science</span>
              </span>
              <div className="flex flex-col">
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#0a1e22]">
                  Compuestos Orgánicos (COVs)
                </span>
                <span className="font-['Inter'] text-[11px] text-[#006d40] font-semibold">
                  Bajos y seguros · Calidad limpia
                </span>
              </div>
            </div>
            <span
              className={`material-symbols-outlined text-[20px] text-[#3e4948] transition-transform ${
                openFactor === 'voc' ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>

          {openFactor === 'voc' && (
            <div className="mt-3 pt-3 border-t border-[#0e7673]/10">
              <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#3e4948] leading-relaxed">
                Bajos y seguros. No hay vapores de cocción, aerosoles ni productos de
                limpieza acumulados en el ambiente de esta habitación.
              </p>
            </div>
          )}
        </div>

        {/* Factor 3: Microclima */}
        <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#0e7673]/10 transition-all">
          <button
            onClick={() =>
              setOpenFactor(openFactor === 'microclimate' ? null : 'microclimate')
            }
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-[#dcf2f6] flex items-center justify-center text-[#005c59]">
                <span className="material-symbols-outlined text-[19px]">air</span>
              </span>
              <div className="flex flex-col">
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#0a1e22]">
                  Microclima exterior
                </span>
                <span className="font-['Inter'] text-[11px] text-[#005c59] font-semibold">
                  Brisa norte favorable (11 km/h)
                </span>
              </div>
            </div>
            <span
              className={`material-symbols-outlined text-[20px] text-[#3e4948] transition-transform ${
                openFactor === 'microclimate' ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>

          {openFactor === 'microclimate' && (
            <div className="mt-3 pt-3 border-t border-[#0e7673]/10">
              <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#3e4948] leading-relaxed">
                La estación meteorológica cercana reporta brisa norte favorable sin polución
                suspendida. Una apertura corta será suficiente para recambiar todo el volumen
                de aire.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Smart Cross-Ventilation Advice Card */}
      <div className="relative overflow-hidden bg-[#005c59] text-white rounded-2xl p-4 shadow-[0_12px_32px_rgba(0,92,89,0.18)]">
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-[#80d5d1]/20 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-start gap-3 relative z-10 mb-2">
          <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px] text-[#9cf1ed]">
              mode_fan
            </span>
          </div>
          <div>
            <span className="font-['Inter'] text-[10px] uppercase tracking-wider text-[#80d5d1] font-bold">
              Consejo de ventilación cruzada
            </span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-white mt-0.5">
              Corriente suave de 5 minutos
            </h2>
          </div>
        </div>

        <p className="font-['Plus_Jakarta_Sans'] text-xs text-white/90 leading-relaxed mb-3 relative z-10">
          "Abre la ventana del balcón y la puerta del pasillo para crear una corriente
          suave de 5 minutos."
        </p>

        {/* Visual schematic */}
        <div className="bg-white/10 rounded-xl p-2.5 mb-3 flex items-center justify-between gap-2 relative z-10">
          <div className="flex items-center gap-1.5 text-xs text-white">
            <span className="material-symbols-outlined text-[#9cf1ed] text-[18px]">
              window
            </span>
            <span className="font-['Inter'] text-[11px]">Ventana balcón</span>
          </div>

          <div className="flex items-center gap-0.5 text-[#80d5d1]">
            <span className="material-symbols-outlined text-[14px] animate-pulse">east</span>
            <span className="material-symbols-outlined text-[14px] animate-pulse">east</span>
            <span className="material-symbols-outlined text-[14px] animate-pulse">east</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-white">
            <span className="material-symbols-outlined text-[#9cf1ed] text-[18px]">
              door_open
            </span>
            <span className="font-['Inter'] text-[11px]">Puerta pasillo</span>
          </div>
        </div>

        {/* Interactive CTA to start guided timer */}
        <button
          onClick={toggleCrossTimer}
          className={`w-full py-3 px-4 rounded-xl font-['Inter'] text-xs font-bold flex items-center justify-center gap-2 active:scale-98 transition-all shadow-sm ${
            timerActive
              ? 'bg-[#7afbb1] text-[#002110]'
              : timerFinished
              ? 'bg-[#a4faf5] text-[#00201f]'
              : 'bg-white text-[#005c59] hover:bg-[#e2f8fc]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {timerActive ? 'pause' : timerFinished ? 'check_circle' : 'timer'}
          </span>
          <span>
            {timerActive
              ? `Ventilando... ${formatTimer(secondsLeft)} restantes`
              : timerFinished
              ? '¡Ambiente renovado con éxito!'
              : 'Iniciar temporizador de 5 min'}
          </span>
        </button>
      </div>

      {/* Ambient Micro-tip Card */}
      <div className="bg-[#e2f8fc]/80 rounded-2xl p-3 flex items-center gap-3 border border-[#0e7673]/10">
        <span className="material-symbols-outlined text-[#005c59] text-[22px] shrink-0">
          energy_savings_leaf
        </span>
        <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#3e4948] leading-tight">
          Ventilar durante 5 minutos en lugar de dejar la ventana entreabierta conserva la
          temperatura sin enfriar las paredes.
        </p>
      </div>
    </div>
  );
};
