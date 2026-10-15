import React, { useState } from 'react';
import { HISTORY_EVENTS, IMAGES, WEEKLY_BARS } from '../../data/mockData';
import { DayBarData, PeriodFilter } from '../../types/nubo';

export const HistorialScreen: React.FC = () => {
  const [period, setPeriod] = useState<PeriodFilter>('semana');
  const [hoveredDay, setHoveredDay] = useState<DayBarData | null>(null);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const handleShare = () => {
    setShowShareModal(true);
  };

  const copyReport = () => {
    navigator.clipboard?.writeText(
      'Informe NUBO-PE: Índice Bioclimático 92/100 (Entorno Saludable). 9.4 de cada 10 horas respirando aire puro. +14% vs semana previa.'
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="flex flex-col w-full px-4 pt-3 pb-24 gap-5 max-w-md mx-auto">
      {/* Subheader Contextual */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex flex-col">
          <span className="font-['Inter'] text-[11px] text-[#005c59] uppercase tracking-wider font-bold">
            Evolución &amp; Salud
          </span>
          <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#0a1e22]">
            Tendencias de Bienestar
          </h2>
        </div>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#005c59] shadow-sm active:scale-95 transition-transform border border-[#0e7673]/10"
        >
          <span className="material-symbols-outlined text-[17px]">ios_share</span>
          <span className="font-['Inter'] text-xs font-semibold">Resumen</span>
        </button>
      </div>

      {/* Selector de Período Temporal */}
      <div className="flex p-1 rounded-full bg-[#d6ecf1] shadow-inner justify-between items-center">
        {(['dia', 'semana', 'mes'] as PeriodFilter[]).map((p) => {
          const isSelected = period === p;
          const label = p === 'dia' ? 'Día' : p === 'semana' ? 'Semana' : 'Mes';
          return (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 py-1.5 text-center rounded-full font-['Inter'] text-xs transition-all ${
                isSelected
                  ? 'bg-white text-[#005c59] shadow-sm font-bold'
                  : 'text-[#3e4948] hover:text-[#0a1e22]'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Tarjeta Destacada: Puntuación de Bienestar Ambiental */}
      <div className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-[0_12px_32px_-4px_rgba(14,118,115,0.07)] border border-[#0e7673]/10">
        <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[#7afbb1]/30 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-[#9cf1ed]/20 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#7afbb1] flex items-center justify-center text-[#007444]">
                <span className="material-symbols-outlined text-[19px] symbol-filled">
                  spa
                </span>
              </div>
              <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#0a1e22]">
                Índice Bioclimático
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#7afbb1] text-[#007444] font-['Inter'] text-[11px] font-bold">
              Entorno Saludable
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* SVG Progress Gauge Dial */}
            <div className="relative flex-shrink-0 w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  className="text-[#d6ecf1]"
                  cx="50"
                  cy="50"
                  fill="none"
                  r="42"
                  stroke="currentColor"
                  strokeWidth="8"
                />
                <circle
                  className="text-[#006d40] transition-all duration-1000"
                  cx="50"
                  cy="50"
                  fill="none"
                  r="42"
                  stroke="currentColor"
                  strokeDasharray="263.89"
                  strokeDashoffset="21.11"
                  strokeLinecap="round"
                  strokeWidth="8.5"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-['Plus_Jakarta_Sans'] text-3xl font-extrabold text-[#005c59] tracking-tighter leading-none">
                  92
                </span>
                <span className="font-['Inter'] text-[10px] text-[#3e4948] leading-none mt-0.5">
                  / 100
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center min-w-0 flex-1">
              <div className="flex items-center gap-1 text-[#006d40] font-['Inter'] text-xs font-bold">
                <span className="material-symbols-outlined text-[17px]">trending_up</span>
                <span>+14% vs. semana previa</span>
              </div>
              <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#3e4948] mt-1 leading-snug">
                Esta semana optimizaste la ventilación cruzada en tus horas habituales de
                descanso y trabajo.
              </p>
            </div>
          </div>

          {/* Micro banner empático */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#e2f8fc] text-[#005c59]">
            <span className="material-symbols-outlined text-[19px] text-[#005c59] shrink-0">
              verified
            </span>
            <span className="font-['Inter'] text-[11px] font-semibold">
              9.4 de cada 10 horas tus pulmones respiraron aire puro y oxigenado.
            </span>
          </div>
        </div>
      </div>

      {/* Gráfico de Tendencias Semanales */}
      <div className="rounded-2xl bg-white p-4 shadow-[0_8px_24px_rgba(14,118,115,0.05)] border border-[#0e7673]/10 flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#0a1e22]">
              Equilibrio Diario
            </h3>
            <p className="font-['Inter'] text-xs text-[#3e4948]">
              24 hrs: Aire Óptimo vs. Aire Viciado
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#005c59]">
              48 min
              <span className="font-['Inter'] text-[10px] font-normal text-[#3e4948]">
                /día
              </span>
            </span>
            <span className="font-['Inter'] text-[10px] text-[#006d40] font-bold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[13px]">check_circle</span>
              Meta cumplida
            </span>
          </div>
        </div>

        {/* Leyenda */}
        <div className="flex items-center gap-4 text-[#3e4948]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#006d40]" />
            <span className="font-['Inter'] text-[11px]">Aire Óptimo</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffb95f]" />
            <span className="font-['Inter'] text-[11px]">Aire Cargado / CO₂</span>
          </div>
        </div>

        {/* Visualizador de Barras Semanal */}
        <div className="relative">
          {hoveredDay && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#0a1e22] text-white text-[10px] py-0.5 px-2 rounded-md whitespace-nowrap shadow-md z-20">
              {hoveredDay.fullDay}: {hoveredDay.optimalHours}h óptimo ·{' '}
              {hoveredDay.loadedHours}h cargado
            </div>
          )}

          <div className="flex items-end justify-between gap-1.5 h-40 pt-3 pb-1">
            {WEEKLY_BARS.map((bar) => {
              const loadedPercent = (bar.loadedHours / bar.totalHours) * 100;
              const optimalPercent = (bar.optimalHours / bar.totalHours) * 100;
              const barHeightPercent = Math.min(
                100,
                ((bar.optimalHours + bar.loadedHours) / 24) * 95
              );

              return (
                <div
                  key={bar.dayLabel}
                  onMouseEnter={() => setHoveredDay(bar)}
                  onMouseLeave={() => setHoveredDay(null)}
                  onClick={() => setHoveredDay(hoveredDay?.dayLabel === bar.dayLabel ? null : bar)}
                  className="flex flex-col items-center flex-1 h-full justify-end gap-1.5 group cursor-pointer"
                >
                  <div
                    className={`w-full max-w-[26px] flex flex-col rounded-full overflow-hidden bg-[#d6ecf1] transition-transform ${
                      bar.isToday ? 'ring-2 ring-[#005c59] shadow-md scale-105' : 'hover:scale-105'
                    }`}
                    style={{ height: `${barHeightPercent}%` }}
                  >
                    <div
                      className="w-full bg-[#ffb95f]"
                      style={{ height: `${loadedPercent}%` }}
                    />
                    <div
                      className="w-full bg-[#006d40] rounded-b-full flex-1"
                      style={{ height: `${optimalPercent}%` }}
                    />
                  </div>
                  <span
                    className={`font-['Inter'] text-xs ${
                      bar.isToday
                        ? 'text-[#005c59] font-bold'
                        : 'text-[#3e4948] group-hover:text-[#0a1e22]'
                    }`}
                  >
                    {bar.dayLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tip inteligente */}
        <div className="flex items-center text-[#3e4948] pt-1 border-t border-[#0e7673]/10">
          <span className="font-['Inter'] text-[11px] flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-[#005c59]">
              eco
            </span>
            El sábado registraste la menor exposición a VOCs de todo el mes.
          </span>
        </div>
      </div>

      {/* Impacto Detectado en el Bienestar */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#0a1e22]">
            Impacto en Tu Día a Día
          </h3>
          <span className="font-['Inter'] text-[11px] text-[#3e4948]">
            Sensor &amp; Rutinas
          </span>
        </div>

        {/* Tarjeta 1: Calidad del Sueño */}
        <div className="rounded-2xl bg-white p-3.5 shadow-sm border border-[#0e7673]/10 flex flex-col gap-2 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#0e7673] flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[20px]">bedtime</span>
              </div>
              <div>
                <h4 className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#0a1e22]">
                  Calidad del Sueño
                </h4>
                <span className="font-['Inter'] text-[11px] text-[#005c59] font-semibold">
                  +22 min de sueño profundo
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#006d40] text-[22px]">
              sentiment_very_satisfied
            </span>
          </div>
          <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#3e4948]">
            Ventilar durante 15 minutos entre las 22:00 y las 22:30 redujo el CO₂ a 450
            ppm en el dormitorio, propiciando despertares más despejados.
          </p>
        </div>

        {/* Tarjeta 2: Horas de Concentración */}
        <div className="rounded-2xl bg-white p-3.5 shadow-sm border border-[#0e7673]/10 flex flex-col gap-2 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#7afbb1] flex items-center justify-center text-[#007444]">
                <span className="material-symbols-outlined text-[20px]">psychology</span>
              </div>
              <div>
                <h4 className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#0a1e22]">
                  Foco en Teletrabajo
                </h4>
                <span className="font-['Inter'] text-[11px] text-[#006d40] font-semibold">
                  0 picos de fatiga por CO₂
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#006d40] text-[22px]">
              bolt
            </span>
          </div>
          <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#3e4948]">
            Durante la jornada laboral (09:00 - 18:00), los niveles de dióxido de carbono
            se mantuvieron siempre en el rango óptimo, previniendo la somnolencia diurna.
          </p>
        </div>

        {/* Tarjeta 3: Eficiencia Térmica */}
        <div className="rounded-2xl bg-white p-3.5 shadow-sm border border-[#0e7673]/10 flex flex-col gap-2 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#d6ecf1] flex items-center justify-center text-[#005c59]">
                <span className="material-symbols-outlined text-[20px]">thermostat</span>
              </div>
              <div>
                <h4 className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#0a1e22]">
                  Eficiencia Térmica
                </h4>
                <span className="font-['Inter'] text-[11px] text-[#005c59] font-semibold">
                  Confort equilibrado
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#005c59] text-[22px]">
              nest_heat_link_gen_3
            </span>
          </div>
          <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#3e4948]">
            La renovación por ráfagas cortas evitó pérdidas energéticas en climatización
            manteniendo la temperatura constante a 21.5°C.
          </p>
        </div>
      </div>

      {/* Registro Histórico de Eventos Recientes */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#0a1e22]">
            Momentos Clave
          </h3>
          <span className="font-['Inter'] text-[11px] text-[#005c59] font-semibold cursor-pointer hover:underline">
            Ver registro completo
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {HISTORY_EVENTS.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-3 p-3 rounded-2xl bg-white shadow-sm border border-[#0e7673]/10"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${event.iconBg}`}
              >
                <span className="material-symbols-outlined text-[17px]">
                  {event.icon}
                </span>
              </div>

              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#0a1e22] truncate">
                    {event.title}
                  </span>
                  <span className="font-['Inter'] text-[10px] text-[#3e4948]">
                    {event.timestamp}
                  </span>
                </div>
                <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#3e4948] mt-0.5 leading-snug">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Foto-Momento de Bienestar Familiar */}
      <div className="rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col border border-[#0e7673]/10">
        <div className="relative w-full h-36">
          <img
            className="w-full h-full object-cover"
            alt="Person relaxing in pure air room"
            src={IMAGES.habitBook}
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#203337]/90 via-[#203337]/30 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <span className="font-['Inter'] text-[10px] uppercase tracking-wider text-[#7afbb1] font-bold">
              Hábito Consolidado
            </span>
            <p className="font-['Plus_Jakarta_Sans'] text-xs font-semibold mt-0.5">
              Tu hogar mantiene el aire fresco un 32% más de tiempo que la media urbana.
            </p>
          </div>
        </div>
      </div>

      {/* Share / Export Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl flex flex-col gap-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0a1e22]">
                Informe de Salud Ambiental
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-8 h-8 rounded-full bg-[#e2f8fc] flex items-center justify-center text-[#3e4948]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="p-3 bg-[#e2f8fc] rounded-2xl flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#005c59] text-white flex items-center justify-center font-bold text-lg">
                92
              </div>
              <div>
                <p className="text-xs font-bold text-[#0a1e22]">Semana 18 completada</p>
                <p className="text-[11px] text-[#3e4948]">
                  48 min de ventilación cruzada diaria promedio
                </p>
              </div>
            </div>

            <p className="text-xs text-[#3e4948] leading-relaxed">
              Puedes copiar o compartir este resumen biométrico con los miembros de tu
              hogar o registrarlo en tu diario de bienestar.
            </p>

            <div className="flex gap-2">
              <button
                onClick={copyReport}
                className="flex-1 py-2.5 rounded-xl bg-[#005c59] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#0e7673]"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {copiedLink ? 'check' : 'content_copy'}
                </span>
                <span>{copiedLink ? '¡Copiado!' : 'Copiar texto'}</span>
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2.5 rounded-xl bg-[#e2f8fc] text-[#3e4948] text-xs font-bold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
