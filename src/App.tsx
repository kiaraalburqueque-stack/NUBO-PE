/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DeviceFrame } from './components/DeviceFrame';
import { AndroidCodeModal } from './components/AndroidCodeModal';
import { EstadoScreen } from './components/screens/EstadoScreen';
import { DiagnosticoScreen } from './components/screens/DiagnosticoScreen';
import { PronosticoScreen } from './components/screens/PronosticoScreen';
import { HistorialScreen } from './components/screens/HistorialScreen';
import { DispositivoScreen } from './components/screens/DispositivoScreen';
import { LightMode, ScreenTab } from './types/nubo';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ScreenTab>('estado');
  const [isBleConnected, setIsBleConnected] = useState<boolean>(true);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);
  const [isDeviceFrameEnabled, setIsDeviceFrameEnabled] = useState<boolean>(false);

  // Hardware pebble state synchronized across screens
  const [pebbleBrightness, setPebbleBrightness] = useState<number>(45);
  const [selectedLightMode, setSelectedLightMode] = useState<LightMode>('breeze');

  const toggleBle = () => {
    setIsBleConnected(false);
    setTimeout(() => {
      setIsBleConnected(true);
    }, 1200);
  };

  return (
    <>
      <DeviceFrame
        isFrameEnabled={isDeviceFrameEnabled}
        onToggleFrame={() => setIsDeviceFrameEnabled(!isDeviceFrameEnabled)}
      >
        <div className="flex flex-col min-h-screen bg-[#eefcff] text-[#0a1e22]">
          {/* Main App Header */}
          <Header
            onOpenAndroidCode={() => setIsCodeModalOpen(true)}
            isBleConnected={isBleConnected}
            onToggleBle={toggleBle}
          />

          {/* Active Screen View */}
          <main className="flex-1 flex flex-col">
            {currentTab === 'estado' && (
              <EstadoScreen
                pebbleBrightness={pebbleBrightness}
                onNavigateToTab={(tab) => setCurrentTab(tab)}
              />
            )}

            {currentTab === 'diagnostico' && <DiagnosticoScreen />}

            {currentTab === 'pronostico' && <PronosticoScreen />}

            {currentTab === 'historial' && <HistorialScreen />}

            {currentTab === 'dispositivo' && (
              <DispositivoScreen
                pebbleBrightness={pebbleBrightness}
                setPebbleBrightness={setPebbleBrightness}
                selectedLightMode={selectedLightMode}
                setSelectedLightMode={setSelectedLightMode}
              />
            )}
          </main>

          {/* Fixed Bottom Navigation */}
          <BottomNav currentTab={currentTab} onSelectTab={setCurrentTab} />
        </div>
      </DeviceFrame>

      {/* Android Studio Kotlin Project Explorer Modal */}
      <AndroidCodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />
    </>
  );
}
