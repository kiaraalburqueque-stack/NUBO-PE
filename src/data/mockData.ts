import { DayBarData, HistoryEvent, RoomData, WindowSchedule } from '../types/nubo';

export const ROOMS: RoomData[] = [
  {
    id: 'salon',
    name: 'Salón Principal',
    co2: 890,
    temp: 22,
    humidity: 58,
    co2Trend: 'up',
    co2Status: 'Cargado',
    recommendedVentilationMin: 15,
  },
  {
    id: 'dormitorio',
    name: 'Dormitorio',
    co2: 540,
    temp: 20,
    humidity: 52,
    co2Trend: 'stable',
    co2Status: 'Óptimo',
    recommendedVentilationMin: 10,
  },
  {
    id: 'estudio',
    name: 'Estudio',
    co2: 920,
    temp: 23,
    humidity: 55,
    co2Trend: 'up',
    co2Status: 'Cargado',
    recommendedVentilationMin: 15,
  },
  {
    id: 'sala01',
    name: 'Sala #01',
    co2: 490,
    temp: 21,
    humidity: 50,
    co2Trend: 'down',
    co2Status: 'Óptimo',
    recommendedVentilationMin: 8,
  },
];

export const WINDOW_SCHEDULES: WindowSchedule[] = [
  {
    id: 'morning',
    timeRange: '08:30 – 09:00',
    durationLabel: '25 min',
    title: 'Mañana fresca',
    description: 'Mañana fresca, rocío asentado y mínimo tráfico circundante. Óptimo para disipar el CO₂ acumulado de la noche.',
    type: 'recommended',
    tagLabel: 'Recomendado',
    pollen: 'Polen Bajo',
    exteriorTemp: '18°C Ext',
    airQualityDesc: 'AQI 22 Óptimo',
    isReminderSet: false,
  },
  {
    id: 'noon',
    timeRange: '13:00 – 16:30',
    durationLabel: 'Pico térmico',
    title: 'Alta insolación',
    description: 'Alta insolación exterior, aumento de polen en suspensión y tráfico urbano. Mantén persianas y ventanas cerradas.',
    type: 'avoid',
    tagLabel: 'Evitar Abrir',
    pollen: 'PM2.5 Moderado',
    exteriorTemp: '27°C Caluroso',
    airQualityDesc: 'AQI 68 Moderado',
    isReminderSet: false,
  },
  {
    id: 'evening',
    timeRange: '19:30 – 20:00',
    durationLabel: '30 min',
    title: 'Óptimo Descanso',
    description: 'Brisa atardecida libre de emisiones. Enfría muros y renueva oxígeno para favorecer un sueño profundo y reparador.',
    type: 'optimal_rest',
    tagLabel: 'Óptimo Descanso',
    pollen: 'Sin tráfico',
    exteriorTemp: '17°C Ideal',
    airQualityDesc: 'AQI 18 Puro',
    isReminderSet: false,
  },
];

export const WEEKLY_BARS: DayBarData[] = [
  { dayLabel: 'L', fullDay: 'Lunes', optimalHours: 21, loadedHours: 3, totalHours: 24 },
  { dayLabel: 'M', fullDay: 'Martes', optimalHours: 20, loadedHours: 4, totalHours: 24 },
  { dayLabel: 'X', fullDay: 'Miércoles', optimalHours: 22, loadedHours: 2, totalHours: 24 },
  { dayLabel: 'J', fullDay: 'Jueves', optimalHours: 19, loadedHours: 5, totalHours: 24 },
  { dayLabel: 'V', fullDay: 'Viernes', optimalHours: 23, loadedHours: 1.5, totalHours: 24 },
  { dayLabel: 'S', fullDay: 'Sábado', optimalHours: 24, loadedHours: 0.8, totalHours: 24 },
  { dayLabel: 'D', fullDay: 'Domingo (Hoy)', optimalHours: 22, loadedHours: 2, totalHours: 24, isToday: true },
];

export const HISTORY_EVENTS: HistoryEvent[] = [
  {
    id: '1',
    title: 'Ventilación vespertina',
    timestamp: 'Ayer 19:35',
    description: 'Completada con éxito (12 min). Retorno a calidad óptima antes de cenar.',
    icon: 'air',
    iconBg: 'bg-[#7afbb1] text-[#007444]',
  },
  {
    id: '2',
    title: 'Alerta evitada: Polen exterior',
    timestamp: 'Ayer 14:10',
    description: 'Ventanas cerradas oportunamente ante incremento de partículas exteriores.',
    icon: 'shield',
    iconBg: 'bg-[#ffddb8] text-[#744800]',
  },
  {
    id: '3',
    title: 'Renovación matutina',
    timestamp: 'Lunes 08:30',
    description: 'Excelente entrada de aire fresco limpio para empezar la jornada laboral.',
    icon: 'wb_twilight',
    iconBg: 'bg-[#9cf1ed] text-[#00201f]',
  },
];

export const IMAGES = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCH6BXB_Ww8vneZ899foS9KGgKxDFKYsS-AOEbQFArO8smbIX3jep55xotoCa_Bi6BfVzZOIM22nLHo-9Pkt_q7YNKHz4e1R1Jg257FuRVL9ZYCpzvf94IdFhJ-iUYn_4Ys3ciQr2buSDgNeu8Jk-rOKfD__aFkpLyOi5woixvgxLlwx6gFs1QNXUQgPnTe2Pa5gU4mg4H6p3ZcAUKiG23rI5d9nI9YZGTR5d6JvkouzALX_u62k_45qA',
  profile: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWBoSmp5iCyJ869trZqjVnAAza64QzFrRf0VuWFWiyq7_P7NzGiFlCpwY0keuq09oEOXcwgYyTF3pSroDWLEs7Dl_R2kDicc3MsxbE82f5Vm3P3dtbozDIKcAzMLDc7GknVzDcw9Nmz8eFE5s1esjPY1m7L-pkecfT-uk1b2FOn0cNoawuyqDnIO_Nq6dq9TpG6SQsHlntXgj-re4v50ffcG38g-f_vh8e4mqGq5cUcNvCU_U8enFFmg',
  indoorStudy: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuC54idLPHxnXW6hwTQkZAe-GhVcByOQHMxMF2F8fjcqxT50SLegid3ZZzA5BzHUJfJsCccCowdAhh3Lj-nqTkUoRA5Fxaj5nnD1dSVtwo7VfcJIEF0YfXAlSklKgdixwuIjfLwLmXzUniSrJYCGJx4XQvh-dtlAmw3erw8UNpa6glO48bkhKGMkMp6Bw4U4f33tbos0um1L_3tf2kjG9YD6-vPR6gqLqLQv_L7O8j5tOEJao3HBOTBQ',
  outdoorPark: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDykmAvRWndmhcoeyB_2aOg3V-TYdzkMhVML03T2CZCBZXtAal_33h-tGAXhWYpO6Ard-01OJpKXY9EfudAWoj0CoWDglvYiGRTZjmY_5pzYIbDMPkjeLC4YMTlr3uy_nj8UnPHrxRiio1tUxSwoy8_biJeTbK4VjvZKSDZYcB3YauBOvvCHu1DNj7zuBEHFcR3GGc94FH-LOTkQ1phhudI5XGUL2k-zkxVS4EgNNQNkWbfsskG9PqnyA',
  bedroomBreeze: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjL6NNAb9EU6ZwlubrSOkVoFdADkCduvvwmCdDmY6RVEm0VDmCJrKeFLIuY5GBOA25WEmICJlrjnxGPu986XFrI96beVEbdHjzhEJF1LkRFs90VAkbiFZj_RdIs-JUayWj-io4ty-FaO8XN73QEmt8GN1OuRjnatODWtWMA8mHCr5weCvGHPhYbLcI1Dar9fHXj0MTLGYSfk4pYtfccmf8E4mCgcBVOYSJh38_M6a5GCINtIWcZoowuw',
  habitBook: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBejnWlAD1i5PLWLR3UooZvzRo1s0tkUYfnl4CPSz7kFzW_eD1kg_Akr4wblvGHqoci8D2-JrNntT3mtFucl7zRrNEaSaQFqiQAoG0UL4ouJ9-ag4GOnfntZsUap1OVww0a3HSQPdhd6giEAdWoTkxJtrwuNlB-z1_iihmZIEaM8VrKhKNrA7Dbhf7GPkhjWDgc7PueGGj4MXgQ4TDop6feHRnwRQ3-ItdIQ6TJ4Gm7lATswWlft7uq5A',
  livingRoomBanner: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhLTJOGosRCQQ3MRW0S8A5hfgHH7tGraDfoiCA75SV_4FSBhzgZaNPU0HFcMCkLTQbeP5G2huR1uhYfxsBv-z6uEgAEpCMDk6RhkT6KIuZFYpGahosjRTX8fJOr7GHlr1DQ---PE1lxyCVkBjw23qkosDEhB8r4AbVv2NQmmbjs7hqlqtyfQdFEZnUDboh0CfR_fF5z6Q0rG2dAZNpvF-EEBp7Ezu088ZD-BPG7qeEDbV5aklaGdLGpQ',
};
