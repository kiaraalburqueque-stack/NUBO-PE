# NUBO-PE - Aplicación Android en Kotlin (Jetpack Compose)

Esta carpeta contiene la arquitectura completa y el código fuente nativo en **Kotlin** con **Jetpack Compose** y **Material 3** para la aplicación **NUBO-PE**, diseñada para interactuar con el dispositivo de calidad de aire **NUBO-PE Pebble**.

## Estructura del Proyecto Android

```
android/
├── app/
│   ├── build.gradle.kts
│   └── src/main/
│       ├── AndroidManifest.xml
│       └── java/com/nubo/pe/
│           ├── MainActivity.kt
│           ├── ble/
│           │   └── BleHardwareController.kt
│           ├── viewmodel/
│           │   └── NuboViewModel.kt
│           └── ui/
│               ├── theme/
│               │   └── Theme.kt
│               └── screens/
│                   ├── EstadoScreen.kt
│                   ├── DiagnosticoScreen.kt
│                   ├── PronosticoScreen.kt
│                   ├── HistorialScreen.kt
│                   └── DispositivoScreen.kt
└── README.md
```

## Características Implementadas en Kotlin:

1. **EstadoScreen**:
   - Orbe biofílico central interactivo con `Canvas` y animación de progreso circular.
   - Temporizador de ventilación guiada de 15 minutos en Coroutines.
   - Selector de estancias (`Salón Principal`, `Dormitorio`, `Estudio`).
   - Balance de ambientes con telemetría de CO2 y temperatura.

2. **DiagnosticoScreen**:
   - Tarjetas de transparencia bioclimática.
   - Comparativa en tiempo real (Interior vs Exterior).
   - Acordeones interactivos para CO2, COVs y microclima exterior.
   - Temporizador de ventilación cruzada de 5 minutos con diagrama de flujo de presión.

3. **PronosticoScreen**:
   - Previsión horaria con tarjetas deslizables (`08:30 - 09:00 Recomendado`, `13:00 - 16:30 Evitar`, `19:30 - 20:00 Descanso`).
   - Switch de sincronización de halo LED del dispositivo Pebble.
   - Gráfico de progreso de meta diaria (42 / 45 min).

4. **HistorialScreen**:
   - Índice bioclimático de 92/100 con indicador circular en Canvas.
   - Gráfico semanal de barras de equilibrio diario (Lunes a Domingo).
   - Tarjetas de impacto en sueño, concentración y confort térmico.

5. **DispositivoScreen**:
   - Vista previa virtual del hardware NUBO-PE Pebble con anillo perimétrico LED y micro pantalla OLED.
   - Selector de modos de luz (`Brisa Ambiental`, `Modo Discreto`, `Modo Noche`).
   - Slider de intensidad lumínica (10% - 100%).
   - Botones de prueba de pulso lumínico y calibración NDIR.

6. **BleHardwareController**:
   - Comunicación Bluetooth Low Energy (GATT) con UUIDs personalizados para el sensor y el anillo LED.

## Cómo abrir y ejecutar en Android Studio:

1. Abre **Android Studio** (versión Hedgehog, Iguana o Ladybug).
2. Selecciona **File > New > Import Project...** o **Open...** y navega a la carpeta `android`.
3. Espera a que Gradle sincronice las dependencias (`Jetpack Compose BOM 2025.02.00`, `Material 3`, `Navigation Compose`).
4. Conecta tu teléfono Android físico con Depuración USB o inicia un emulador de Google Pixel con API 34 o 35.
5. Presiona **Run 'app'** (Shift + F10).
