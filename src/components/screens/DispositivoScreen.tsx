import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { LightMode, OledStyle } from '../../types/nubo';

interface DispositivoScreenProps {
  pebbleBrightness: number;
  setPebbleBrightness: (val: number) => void;
  selectedLightMode: LightMode;
  setSelectedLightMode: (mode: LightMode) => void;
}

export const DispositivoScreen: React.FC<DispositivoScreenProps> = ({
  pebbleBrightness,
  setPebbleBrightness,
  selectedLightMode,
  setSelectedLightMode,
}) => {
  const [oledStyle, setOledStyle] = useState<OledStyle>('icon_minutes');
  const [isPulsingTest, setIsPulsingTest] = useState<boolean>(false);
  const [pulseMessage, setPulseMessage] = useState<string>(
    'Hace parpadear el halo físico de prueba'
  );
  const [isCalibrating, setIsCalibrating] = useState<boolean>(false);
  const [calibrateMessage, setCalibrateMessage] = useState<string>(
    'Ajusta NDIR CO2 y TVOC con aire limpio'
  );
  const [showWifiModal, setShowWifiModal] = useState<boolean>(false);
  const [wifiSsid, setWifiSsid] = useState<string>('Casa_Familia_5G');

  // Trigger test light pulse
  const triggerPulseTest = () => {
    setIsPulsingTest(true);
    setPulseMessage('Enviando ráfaga luminosa al Pebble...');
    setTimeout(() => {
      setPulseMessage('¡Pulso emitido en el prototipo con éxito!');
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.3 },
        colors: ['#006d40', '#7afbb1', '#005c59'],
      });
      setTimeout(() => {
        setIsPulsingTest(false);
        setPulseMessage('Hace parpadear el halo físico de prueba');
      }, 2500);
    }, 800);
  };

  // Trigger zero sensor calibration
  const triggerCalibration = () => {
    setIsCalibrating(true);
    setCalibrateMessage('Calibrando línea de base NDIR...');
    setTimeout(() => {
      setIsCalibrating(false);
      setCalibrateMessage('Sensores calibrados a 415 ppm (Óptimo)');
      setTimeout(() => {
        setCalibrateMessage('Ajusta NDIR CO2 y TVOC con aire limpio');
      }, 3500);
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full px-4 pt-3 pb-24 gap-5 max-w-md mx-auto">
      {/* Tarjeta Central de Hardware NUBO-PE */}
      <section className="relative overflow-hidden rounded-2xl bg-white shadow-[0_12px_32px_-4px_rgba(14,118,115,0.08)] p-5 border border-[#0e7673]/10">
        {/* Glow ambiental detrás del hardware adaptativo a brightness */}
        <div
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-52 h-52 rounded-full bg-[#7afbb1] blur-[40px] pointer-events-none transition-opacity duration-300"
          style={{ opacity: (pebbleBrightness / 100) * 0.55 }}
        />

        <div className="relative z-10 flex flex-col items-center">
          {/* Render del Prototipo Físico (Guijarro + Anillo LED) */}
          <div className="relative w-44 h-44 flex items-center justify-center my-1">
            {/* Halo de respiración sutil */}
            <div
              className={`absolute inset-2 rounded-full bg-[#7afbb1]/40 blur-md transition-all duration-700 ${
                isPulsingTest ? 'scale-125 bg-[#7afbb1] opacity-100' : 'animate-pulse-subtle'
              }`}
              style={{
                opacity: isPulsingTest ? 1 : Math.max(0.2, pebbleBrightness / 100),
              }}
            />

            {/* Silueta física de guijarro orgánico */}
            <div className="relative w-36 h-36 rounded-full bg-white shadow-[0_10px_25px_rgba(0,109,64,0.12)] flex items-center justify-center border border-[#0e7673]/15">
              {/* Anillo LED físico (SVG perimétrico) */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 144 144">
                <circle
                  cx="72"
                  cy="72"
                  fill="none"
                  r="66"
                  stroke="#e2f8fc"
                  strokeWidth="4"
                />
                <circle
                  className="transition-all duration-500"
                  cx="72"
                  cy="72"
                  fill="none"
                  r="66"
                  stroke={selectedLightMode === 'night' ? '#6e7978' : '#006d40'}
                  strokeDasharray="415"
                  strokeDashoffset={isPulsingTest ? '0' : '100'}
                  strokeLinecap="round"
                  strokeWidth="4.5"
                  style={{
                    opacity: Math.max(0.2, pebbleBrightness / 100),
                  }}
                />
              </svg>

              {/* Micro Pantalla OLED Física Integrada */}
              <div className="w-20 h-20 rounded-full bg-[#203337] flex flex-col items-center justify-center text-center p-2 shadow-inner border border-white/10">
                <span className="material-symbols-outlined text-[#7afbb1] text-[26px] symbol-filled animate-pulse">
                  air
                </span>
                {oledStyle === 'icon_minutes' && (
                  <span className="font-['Inter'] text-[#e2f8fc] text-[10px] tracking-tight mt-0.5 font-bold">
                    15 min
                  </span>
                )}
              </div>
            </div>

            {/* Indicador flotante de sincronización activa */}
            <div className="absolute bottom-1 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full shadow-sm border border-[#0e7673]/10">
              <span className="w-2 h-2 rounded-full bg-[#006d40] animate-pulse" />
              <span className="font-['Inter'] text-[10px] text-[#3e4948] font-bold">
                BLE+Wi-Fi
              </span>
            </div>
          </div>

          {/* Ficha de Estado del Dispositivo */}
          <div className="w-full text-center mt-2">
            <div className="flex items-center justify-center gap-1.5">
              <h2 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#0a1e22]">
                NUBO-PE Pebble
              </h2>
              <span className="material-symbols-outlined text-[#005c59] text-[18px] symbol-filled">
                verified
              </span>
            </div>
            <p className="font-['Inter'] text-[11px] text-[#3e4948] mt-0.5">
              Rev. 2.4 · Firmware v1.2.0 al día
            </p>
          </div>

          {/* Telemetría rápida */}
          <div className="grid grid-cols-3 gap-2 w-full mt-3 pt-2 border-t border-[#0e7673]/10">
            <div className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#e2f8fc] text-center">
              <div className="flex items-center gap-1 text-[#005c59]">
                <span className="material-symbols-outlined text-[15px]">wifi</span>
                <span className="font-['Inter'] text-[11px] font-bold">-48 dBm</span>
              </div>
              <span className="font-['Inter'] text-[10px] text-[#3e4948] mt-0.5">
                Señal Alta
              </span>
            </div>

            <div className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#e2f8fc] text-center">
              <div className="flex items-center gap-1 text-[#006d40]">
                <span className="material-symbols-outlined text-[15px] symbol-filled">
                  battery_charging_full
                </span>
                <span className="font-['Inter'] text-[11px] font-bold">100%</span>
              </div>
              <span className="font-['Inter'] text-[10px] text-[#3e4948] mt-0.5">
                Alimentado
              </span>
            </div>

            <div className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#e2f8fc] text-center">
              <div className="flex items-center gap-1 text-[#005c59]">
                <span className="material-symbols-outlined text-[15px]">
                  bluetooth_connected
                </span>
                <span className="font-['Inter'] text-[11px] font-bold">Enlace</span>
              </div>
              <span className="font-['Inter'] text-[10px] text-[#3e4948] mt-0.5">
                Óptimo
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Control del Anillo LED */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#0a1e22]">
            Anillo de Luz LED
          </h3>
          <span className="font-['Inter'] text-[11px] text-[#005c59] font-semibold">
            Respaldo Háptico
          </span>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-[0_4px_16px_rgba(14,118,115,0.04)] border border-[#0e7673]/10 flex flex-col gap-3">
          {/* Selector de Modos de Luz */}
          <div className="flex flex-col gap-2">
            {/* Opción 1: Brisa Ambiental */}
            <button
              onClick={() => setSelectedLightMode('breeze')}
              className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${
                selectedLightMode === 'breeze'
                  ? 'bg-[#005c59] text-white shadow-sm'
                  : 'bg-[#e2f8fc]/70 text-[#0a1e22] hover:bg-[#dcf2f6]'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  selectedLightMode === 'breeze'
                    ? 'bg-white/20 text-[#a4faf5]'
                    : 'bg-[#d6ecf1] text-[#005c59]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">air</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold">
                    Brisa Ambiental
                  </span>
                  {selectedLightMode === 'breeze' && (
                    <span className="material-symbols-outlined text-[18px] text-[#7afbb1]">
                      check_circle
                    </span>
                  )}
                </div>
                <p
                  className={`font-['Plus_Jakarta_Sans'] text-xs mt-0.5 leading-snug ${
                    selectedLightMode === 'breeze' ? 'text-white/80' : 'text-[#3e4948]'
                  }`}
                >
                  Respiración lumínica continua y suave que refleja la frescura del aire.
                </p>
              </div>
            </button>

            {/* Opción 2: Modo Discreto */}
            <button
              onClick={() => setSelectedLightMode('discrete')}
              className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${
                selectedLightMode === 'discrete'
                  ? 'bg-[#005c59] text-white shadow-sm'
                  : 'bg-[#e2f8fc]/70 text-[#0a1e22] hover:bg-[#dcf2f6]'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  selectedLightMode === 'discrete'
                    ? 'bg-white/20 text-[#a4faf5]'
                    : 'bg-[#d6ecf1] text-[#3e4948]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  notifications_paused
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold">
                    Modo Discreto
                  </span>
                  {selectedLightMode === 'discrete' && (
                    <span className="material-symbols-outlined text-[18px] text-[#7afbb1]">
                      check_circle
                    </span>
                  )}
                </div>
                <p
                  className={`font-['Plus_Jakarta_Sans'] text-xs mt-0.5 leading-snug ${
                    selectedLightMode === 'discrete' ? 'text-white/80' : 'text-[#3e4948]'
                  }`}
                >
                  Permanece tenue; solo pulsa suavemente ante cambios críticos de CO₂.
                </p>
              </div>
            </button>

            {/* Opción 3: Modo Noche */}
            <button
              onClick={() => setSelectedLightMode('night')}
              className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${
                selectedLightMode === 'night'
                  ? 'bg-[#005c59] text-white shadow-sm'
                  : 'bg-[#e2f8fc]/70 text-[#0a1e22] hover:bg-[#dcf2f6]'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  selectedLightMode === 'night'
                    ? 'bg-white/20 text-[#a4faf5]'
                    : 'bg-[#d6ecf1] text-[#3e4948]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">bedtime</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold">
                    Modo Noche
                  </span>
                  {selectedLightMode === 'night' && (
                    <span className="material-symbols-outlined text-[18px] text-[#7afbb1]">
                      check_circle
                    </span>
                  )}
                </div>
                <p
                  className={`font-['Plus_Jakarta_Sans'] text-xs mt-0.5 leading-snug ${
                    selectedLightMode === 'night' ? 'text-white/80' : 'text-[#3e4948]'
                  }`}
                >
                  LED completamente apagado de 23:00 a 07:00 para no perturbar tu sueño.
                </p>
              </div>
            </button>
          </div>

          {/* Slider de Brillo */}
          <div className="pt-1 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-['Inter'] text-xs text-[#3e4948] font-medium">
                Intensidad luminosa
              </span>
              <span className="font-['Inter'] text-xs text-[#005c59] font-bold">
                {pebbleBrightness}%
              </span>
            </div>

            <div className="relative flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#6e7978]">
                brightness_low
              </span>
              <input
                className="w-full h-2 bg-[#d6ecf1] rounded-full appearance-none accent-[#005c59] cursor-pointer"
                type="range"
                min="10"
                max="100"
                value={pebbleBrightness}
                onChange={(e) => setPebbleBrightness(Number(e.target.value))}
              />
              <span className="material-symbols-outlined text-[18px] text-[#6e7978]">
                brightness_high
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Configuración Micro-Pantalla OLED */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#0a1e22]">
            Micro-Pantalla OLED
          </h3>
          <span className="font-['Inter'] text-[11px] text-[#3e4948]">En Hardware</span>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-[0_4px_16px_rgba(14,118,115,0.04)] border border-[#0e7673]/10 flex flex-col gap-3">
          <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#3e4948]">
            Define qué información muestra la pequeña pantalla central del dispositivo en
            tu mesa:
          </p>

          <div className="grid grid-cols-2 gap-1 p-1 bg-[#e2f8fc] rounded-xl">
            <button
              onClick={() => setOledStyle('icon_only')}
              className={`py-2 px-2 rounded-lg font-['Inter'] text-xs text-center transition-all ${
                oledStyle === 'icon_only'
                  ? 'bg-white text-[#005c59] shadow-sm font-bold'
                  : 'text-[#3e4948] font-medium'
              }`}
            >
              Solo icono de acción
            </button>
            <button
              onClick={() => setOledStyle('icon_minutes')}
              className={`py-2 px-2 rounded-lg font-['Inter'] text-xs text-center transition-all ${
                oledStyle === 'icon_minutes'
                  ? 'bg-white text-[#005c59] shadow-sm font-bold'
                  : 'text-[#3e4948] font-medium'
              }`}
            >
              Icono + minutos
            </button>
          </div>

          <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-[#e2f8fc]/60">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#005c59] text-[19px]">
                screen_rotation
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#0a1e22]">
                Orientación automática
              </span>
            </div>
            <span className="font-['Inter'] text-[11px] text-[#006d40] font-bold">
              Giroscopio Activo
            </span>
          </div>
        </div>
      </section>

      {/* Acciones de Calibración y Diagnóstico */}
      <section className="flex flex-col gap-2">
        <h3 className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#0a1e22] px-1">
          Pruebas y Sensores
        </h3>

        <div className="rounded-2xl bg-white p-3 shadow-[0_4px_16px_rgba(14,118,115,0.04)] border border-[#0e7673]/10 flex flex-col gap-2">
          {/* Botón de Prueba */}
          <button
            onClick={triggerPulseTest}
            disabled={isPulsingTest}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-[#e2f8fc] hover:bg-[#dcf2f6] text-[#005c59] transition-all active:scale-[0.99] text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#d6ecf1] flex items-center justify-center text-[#005c59]">
                <span className="material-symbols-outlined text-[19px]">flare</span>
              </div>
              <div>
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#0a1e22] block">
                  Probar pulso de luz ahora
                </span>
                <span className="font-['Inter'] text-[11px] text-[#3e4948] block">
                  {pulseMessage}
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#6e7978]">play_arrow</span>
          </button>

          {/* Botón Calibración */}
          <button
            onClick={triggerCalibration}
            disabled={isCalibrating}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-[#e2f8fc] hover:bg-[#dcf2f6] text-[#005c59] transition-all active:scale-[0.99] text-left"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full bg-[#d6ecf1] flex items-center justify-center text-[#005c59] ${
                  isCalibrating ? 'animate-spin' : ''
                }`}
              >
                <span className="material-symbols-outlined text-[19px]">tune</span>
              </div>
              <div>
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#0a1e22] block">
                  Calibrar sensores de cero
                </span>
                <span className="font-['Inter'] text-[11px] text-[#3e4948] block">
                  {calibrateMessage}
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#6e7978]">autorenew</span>
          </button>

          {/* Red y Nube */}
          <button
            onClick={() => setShowWifiModal(true)}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-[#e2f8fc] hover:bg-[#dcf2f6] text-[#005c59] transition-all active:scale-[0.99] text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#d6ecf1] flex items-center justify-center text-[#005c59]">
                <span className="material-symbols-outlined text-[19px]">cloud_sync</span>
              </div>
              <div>
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#0a1e22] block">
                  Ajustes Wi-Fi y Sincronización
                </span>
                <span className="font-['Inter'] text-[11px] text-[#3e4948] block">
                  Red: "{wifiSsid}" · Nube activa
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#6e7978]">
              chevron_right
            </span>
          </button>
        </div>
      </section>

      {/* Mensaje Cálido de Estado */}
      <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#e2f8fc]/70 border border-[#0e7673]/10">
        <span className="material-symbols-outlined text-[#006d40] text-[22px] shrink-0 symbol-filled">
          spa
        </span>
        <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#3e4948] leading-tight">
          Tu hardware se encuentra en un entorno ventilado. Las mediciones se sincronizan
          cada 30 segundos automáticamente.
        </p>
      </div>

      {/* Wi-Fi Settings Modal */}
      {showWifiModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl flex flex-col gap-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0a1e22]">
                Conectividad Wi-Fi Pebble
              </h3>
              <button
                onClick={() => setShowWifiModal(false)}
                className="w-8 h-8 rounded-full bg-[#e2f8fc] flex items-center justify-center text-[#3e4948]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#0a1e22]">Nombre de Red (SSID)</label>
              <input
                type="text"
                value={wifiSsid}
                onChange={(e) => setWifiSsid(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#0e7673]/20 text-xs focus:outline-none focus:ring-2 focus:ring-[#005c59]"
              />
            </div>

            <div className="p-3 bg-[#e2f8fc] rounded-xl text-xs text-[#3e4948] space-y-1">
              <p className="font-bold text-[#005c59]">Protocolo IoT Activo</p>
              <p>MQTT Broker TLS 1.3 · Telemetría cifrada cada 30 segundos.</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowWifiModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#005c59] text-white text-xs font-bold hover:bg-[#0e7673]"
              >
                Guardar y Sincronizar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
