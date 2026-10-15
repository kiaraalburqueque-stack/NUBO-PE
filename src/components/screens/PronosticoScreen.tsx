import React, { useState } from 'react';
import { IMAGES, WINDOW_SCHEDULES } from '../../data/mockData';
import { WindowSchedule } from '../../types/nubo';

export const PronosticoScreen: React.FC = () => {
  const [schedules, setSchedules] = useState<WindowSchedule[]>(WINDOW_SCHEDULES);
  const [isLedNoticeEnabled, setIsLedNoticeEnabled] = useState<boolean>(true);
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);

  const toggleScheduleReminder = (id: string) => {
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isReminderSet: !s.isReminderSet } : s))
    );
  };

  return (
    <div className="flex flex-col w-full px-4 pt-3 pb-24 gap-5 max-w-md mx-auto">
      {/* Aura Ambient Glow Behind Context */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-[#e2f8fc]/70 p-4 shadow-sm border border-[#0e7673]/10">
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#7afbb1] opacity-40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#80d5d1] opacity-30 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#005c59] text-[19px] symbol-filled">
              nest_eco_leaf
            </span>
            <span className="font-['Inter'] text-[11px] text-[#005c59] uppercase tracking-wider font-bold">
              Previsión Bioclimática
            </span>
          </div>

          <h2 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#0a1e22]">
            Mejores momentos para ventilar hoy
          </h2>

          <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#3e4948] leading-relaxed">
            Analizamos la calidad del aire exterior, el tráfico de tu zona y la
            acumulación de CO₂ en el hogar para indicarte cuándo renovar el aire sin perder
            confort térmico.
          </p>
        </div>
      </div>

      {/* Estado Rápido Actual */}
      <div className="w-full bg-white rounded-2xl p-3.5 shadow-md flex items-center justify-between gap-3 border border-[#0e7673]/10">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-[#7afbb1]/40 text-[#006d40] shrink-0">
            <span className="material-symbols-outlined text-[22px]">window_closed</span>
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#006d40]" />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#0a1e22] truncate">
                Ventanas Cerradas
              </span>
              <span className="font-['Inter'] text-[10px] text-[#006d40] bg-[#e2f8fc] px-1.5 py-0.5 rounded-full font-semibold">
                Estable
              </span>
            </div>
            <p className="font-['Inter'] text-[11px] text-[#3e4948] truncate">
              Interior: 620 ppm CO₂ · Ext: 19°C Limpio
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#005c59]">
            AQI 22
          </span>
          <span className="block font-['Inter'] text-[10px] text-[#3e4948]">
            Exterior Puro
          </span>
        </div>
      </div>

      {/* Ventanas Horarias */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#005c59] text-[18px]">
              timelapse
            </span>
            <h3 className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#0a1e22]">
              Ventanas Horarias
            </h3>
          </div>
          <span className="font-['Inter'] text-[10px] text-[#3e4948]">
            Actualizado hace 4 min
          </span>
        </div>

        {/* Horizontal scroll on mobile */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 snap-x snap-mandatory">
          {/* Franja 1: Matutina (Recomendado) */}
          <div className="snap-start shrink-0 w-[260px] bg-white rounded-2xl p-4 shadow-md flex flex-col justify-between relative overflow-hidden border border-[#0e7673]/10">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#7afbb1]/20 rounded-bl-full pointer-events-none" />
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#7afbb1] text-[#007444] font-['Inter'] text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006d40]" />
                  Recomendado
                </span>
                <span className="font-['Inter'] text-xs text-[#3e4948]">25 min</span>
              </div>

              <div className="mt-1">
                <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#005c59]">
                  08:30 – 09:00
                </span>
                <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#0a1e22] mt-1 leading-snug">
                  Mañana fresca, rocío asentado y mínimo tráfico circundante. Óptimo para
                  disipar el CO₂ acumulado de la noche.
                </p>
              </div>

              <div className="flex items-center gap-2 mt-2 text-[#3e4948] font-['Inter'] text-[11px]">
                <span className="flex items-center gap-0.5 text-[#006d40]">
                  <span className="material-symbols-outlined text-[15px]">eco</span>
                  Polen Bajo
                </span>
                <span>·</span>
                <span className="flex items-center gap-0.5 text-[#005c59]">
                  <span className="material-symbols-outlined text-[15px]">thermostat</span>
                  18°C Ext
                </span>
              </div>
            </div>

            <button
              onClick={() => toggleScheduleReminder('morning')}
              className={`mt-4 w-full py-2 px-3 rounded-xl font-['Inter'] text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all ${
                schedules.find((s) => s.id === 'morning')?.isReminderSet
                  ? 'bg-[#7afbb1] text-[#007444]'
                  : 'bg-[#005c59] text-white hover:bg-[#0e7673]'
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">
                {schedules.find((s) => s.id === 'morning')?.isReminderSet
                  ? 'notifications_active'
                  : 'notifications'}
              </span>
              <span>
                {schedules.find((s) => s.id === 'morning')?.isReminderSet
                  ? 'Recordatorio fijado'
                  : 'Avisarme'}
              </span>
            </button>
          </div>

          {/* Franja 2: Mediodía (Evitar Abrir) */}
          <div className="snap-start shrink-0 w-[260px] bg-[#d6ecf1]/60 rounded-2xl p-4 shadow-sm flex flex-col justify-between relative overflow-hidden border border-[#0e7673]/10">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] font-['Inter'] text-[10px] font-bold">
                  <span className="material-symbols-outlined text-[12px]">block</span>
                  Evitar Abrir
                </span>
                <span className="font-['Inter'] text-xs text-[#3e4948]">Pico térmico</span>
              </div>

              <div className="mt-1">
                <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#0a1e22]">
                  13:00 – 16:30
                </span>
                <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#3e4948] mt-1 leading-snug">
                  Alta insolación exterior, aumento de polen en suspensión y tráfico urbano.
                  Mantén persianas y ventanas cerradas.
                </p>
              </div>

              <div className="flex items-center gap-2 mt-2 text-[#3e4948] font-['Inter'] text-[11px]">
                <span className="flex items-center gap-0.5 text-[#ba1a1a]">
                  <span className="material-symbols-outlined text-[15px]">air</span>
                  PM2.5 Moderado
                </span>
                <span>·</span>
                <span className="flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[15px]">wb_sunny</span>
                  27°C Caluroso
                </span>
              </div>
            </div>

            <div className="mt-4 w-full py-2 px-3 rounded-xl bg-white/80 text-[#3e4948] font-['Inter'] text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#0e7673]/10">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              <span>Sellar ambiente</span>
            </div>
          </div>

          {/* Franja 3: Noche (Óptimo Descanso) */}
          <div className="snap-start shrink-0 w-[260px] bg-white rounded-2xl p-4 shadow-md flex flex-col justify-between relative overflow-hidden border border-[#0e7673]/10">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#9cf1ed]/25 rounded-bl-full pointer-events-none" />
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#9cf1ed] text-[#00201f] font-['Inter'] text-[10px] font-bold">
                  <span className="material-symbols-outlined text-[13px]">bedtime</span>
                  Óptimo Descanso
                </span>
                <span className="font-['Inter'] text-xs text-[#3e4948]">30 min</span>
              </div>

              <div className="mt-1">
                <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#005c59]">
                  19:30 – 20:00
                </span>
                <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#0a1e22] mt-1 leading-snug">
                  Brisa atardecida libre de emisiones. Enfría muros y renueva oxígeno para
                  favorecer un sueño profundo y reparador.
                </p>
              </div>

              <div className="flex items-center gap-2 mt-2 text-[#3e4948] font-['Inter'] text-[11px]">
                <span className="flex items-center gap-0.5 text-[#006d40]">
                  <span className="material-symbols-outlined text-[15px]">check_circle</span>
                  Sin tráfico
                </span>
                <span>·</span>
                <span className="flex items-center gap-0.5 text-[#005c59]">
                  <span className="material-symbols-outlined text-[15px]">nightlight</span>
                  17°C Ideal
                </span>
              </div>
            </div>

            <button
              onClick={() => toggleScheduleReminder('evening')}
              className={`mt-4 w-full py-2 px-3 rounded-xl font-['Inter'] text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all ${
                schedules.find((s) => s.id === 'evening')?.isReminderSet
                  ? 'bg-[#005c59] text-white'
                  : 'bg-[#d6ecf1] text-[#005c59] hover:bg-[#c8dee2]'
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">add_alert</span>
              <span>
                {schedules.find((s) => s.id === 'evening')?.isReminderSet
                  ? 'Programado (19:30)'
                  : 'Programar'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Hardware Sync Widget (NUBO-PE LED Ring) */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-md flex flex-col gap-2 border border-[#0e7673]/10">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="relative w-10 h-10 rounded-full bg-[#005c59] flex items-center justify-center text-white shrink-0 shadow-[0_0_12px_rgba(0,92,89,0.35)]">
              <span className="material-symbols-outlined text-[20px]">fluorescent</span>
              {isLedNoticeEnabled && (
                <span className="absolute inset-0 rounded-full border-2 border-[#7afbb1] animate-ping opacity-25" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#0a1e22]">
                Aviso luminoso en NUBO-PE
              </span>
              <span className="font-['Inter'] text-[11px] text-[#3e4948]">
                Anillo LED interactivo
              </span>
            </div>
          </div>

          {/* Toggle Switch */}
          <button
            onClick={() => setIsLedNoticeEnabled(!isLedNoticeEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              isLedNoticeEnabled ? 'bg-[#005c59]' : 'bg-[#bdc9c7]'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${
                isLedNoticeEnabled ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#3e4948]">
          El anillo LED de tu sensor NUBO-PE pulsará con una brisa esmeralda 5 minutos
          antes de la hora ideal para invitarte a abrir las ventanas.
        </p>

        <div className="flex items-center gap-2 p-2 rounded-xl bg-[#e2f8fc]">
          <span
            className={`w-2 h-2 rounded-full ${
              isLedNoticeEnabled ? 'bg-[#006d40] animate-pulse' : 'bg-[#6e7978]'
            }`}
          />
          <span className="font-['Inter'] text-[11px] text-[#0a1e22] font-medium">
            {isLedNoticeEnabled
              ? 'Sincronizado: Salón principal · Brisa Suave activa'
              : 'Aviso luminoso pausado'}
          </span>
        </div>
      </div>

      {/* Resumen de Bienestar Acumulado */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-md flex flex-col gap-2 border border-[#0e7673]/10">
        <div className="flex items-center justify-between">
          <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#0a1e22]">
            Bienestar Acumulado
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#7afbb1] text-[#007444] font-['Inter'] text-[10px] font-bold">
            Semana 18
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-1">
          <div className="p-3 bg-[#e2f8fc] rounded-xl flex flex-col">
            <span className="font-['Inter'] text-[11px] text-[#3e4948]">
              Ventilación Activa
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#005c59]">
                42
              </span>
              <span className="font-['Inter'] text-[11px] text-[#3e4948]">min hoy</span>
            </div>
            <span className="font-['Inter'] text-[10px] text-[#006d40] flex items-center gap-0.5 mt-1 font-semibold">
              <span className="material-symbols-outlined text-[13px]">trending_up</span>
              +14% vs. ayer
            </span>
          </div>

          <div className="p-3 bg-[#e2f8fc] rounded-xl flex flex-col">
            <span className="font-['Inter'] text-[11px] text-[#3e4948]">
              Zona Saludable
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#005c59]">
                88%
              </span>
              <span className="font-['Inter'] text-[11px] text-[#3e4948]">del tiempo</span>
            </div>
            <span className="font-['Inter'] text-[10px] text-[#006d40] flex items-center gap-0.5 mt-1 font-semibold">
              <span className="material-symbols-outlined text-[13px]">verified</span>
              Calidad Óptima
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex flex-col gap-1.5 mt-2">
          <div className="flex justify-between font-['Inter'] text-[11px] text-[#3e4948]">
            <span>Meta Diaria de Renovación</span>
            <span className="text-[#0a1e22] font-bold">42 / 45 min</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#d6ecf1] overflow-hidden">
            <div className="h-full bg-[#006d40] rounded-full transition-all" style={{ width: '93%' }} />
          </div>
        </div>
      </div>

      {/* Tip Bioclimático */}
      <div className="w-full bg-[#e2f8fc] rounded-2xl overflow-hidden shadow-sm flex flex-col border border-[#0e7673]/10">
        <div className="relative w-full h-40 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            alt="Bedroom cross breeze curtains"
            src={IMAGES.bedroomBreeze}
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#e2f8fc] via-transparent to-transparent" />
          <div className="absolute bottom-2 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-sm">
            <span className="material-symbols-outlined text-[#005c59] text-[16px]">
              air
            </span>
            <span className="font-['Inter'] text-[11px] text-[#005c59] font-bold">
              Técnica Bioclimática
            </span>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-1.5">
          <h4 className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#0a1e22]">
            Efecto chimenea y ventilación cruzada
          </h4>
          <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#3e4948] leading-relaxed">
            Abre simultáneamente la ventana del lado sombreado y una puerta opuesta
            durante 15 minutos. El flujo de presión natural evacúa partículas en suspensión
            3 veces más rápido sin enfriar las superficies.
          </p>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#0e7673]/10">
            <span className="flex items-center gap-1 text-[#005c59] font-['Inter'] text-xs font-semibold">
              <span className="material-symbols-outlined text-[16px]">lightbulb</span>
              Ahorro energético pasivo
            </span>
            <button
              onClick={() => setShowGuideModal(true)}
              className="font-['Inter'] text-xs text-[#005c59] font-bold hover:underline"
            >
              Ver guía completa
            </button>
          </div>
        </div>
      </div>

      {/* Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl flex flex-col gap-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#7afbb1]/30 flex items-center justify-center text-[#006d40]">
                  <span className="material-symbols-outlined text-[18px]">menu_book</span>
                </span>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0a1e22]">
                  Guía de Ventilación Pasiva
                </h3>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="w-8 h-8 rounded-full bg-[#e2f8fc] flex items-center justify-center text-[#3e4948]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="text-xs text-[#3e4948] space-y-2.5 leading-relaxed">
              <p>
                <strong>1. Presión térmica diferencial:</strong> Al abrir dos aberturas en
                fachadas opuestas con distinta insolación, el aire frío más denso entra por la
                zona en sombra empujando al aire caliente hacia afuera.
              </p>
              <p>
                <strong>2. Ventilación de choque:</strong> 5 a 15 minutos de corriente
                continua renuevan el 100% del aire interior sin alterar la temperatura
                acumulada en paredes y muebles.
              </p>
              <p>
                <strong>3. Sincronización con NUBO-PE:</strong> Tu Pebble detectará la caída
                de CO₂ por debajo de 500 ppm y emitirá un pulso verde de confirmación para que
                cierres las ventanas.
              </p>
            </div>

            <button
              onClick={() => setShowGuideModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#005c59] text-white text-xs font-bold hover:bg-[#0e7673]"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
