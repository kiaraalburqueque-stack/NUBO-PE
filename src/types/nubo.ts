export type ScreenTab = 'estado' | 'diagnostico' | 'pronostico' | 'historial' | 'dispositivo';

export type RoomId = 'salon' | 'dormitorio' | 'estudio' | 'sala01';

export type LightMode = 'breeze' | 'discrete' | 'night';

export type OledStyle = 'icon_only' | 'icon_minutes';

export type PeriodFilter = 'dia' | 'semana' | 'mes';

export interface RoomData {
  id: RoomId;
  name: string;
  co2: number; // ppm
  temp: number; // °C
  humidity: number; // %
  co2Trend: 'up' | 'down' | 'stable';
  co2Status: 'Óptimo' | 'Cargado' | 'Crítico';
  recommendedVentilationMin: number;
}

export interface WindowSchedule {
  id: string;
  timeRange: string;
  durationLabel: string;
  title: string;
  description: string;
  type: 'recommended' | 'avoid' | 'optimal_rest';
  tagLabel: string;
  pollen: string;
  exteriorTemp: string;
  airQualityDesc: string;
  isReminderSet: boolean;
}

export interface DayBarData {
  dayLabel: string;
  fullDay: string;
  optimalHours: number;
  loadedHours: number;
  totalHours: number;
  isToday?: boolean;
}

export interface HistoryEvent {
  id: string;
  title: string;
  timestamp: string;
  description: string;
  icon: string;
  iconBg: string;
}
