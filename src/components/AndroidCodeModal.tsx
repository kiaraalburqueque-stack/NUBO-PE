import React, { useState } from 'react';

interface AndroidCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface KotlinFile {
  id: string;
  filename: string;
  path: string;
  language: string;
  description: string;
  code: string;
}

export const KOTLIN_FILES: KotlinFile[] = [
  {
    id: 'main_activity',
    filename: 'MainActivity.kt',
    path: 'app/src/main/java/com/nubo/pe/MainActivity.kt',
    language: 'kotlin',
    description: 'Punto de entrada principal con Jetpack Compose, Scaffold, TopBar y NavigationBar de Material 3.',
    code: `package com.nubo.pe

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.animation.*
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.navigation.compose.*
import com.nubo.pe.ui.screens.*
import com.nubo.pe.ui.theme.NuboTheme
import com.nubo.pe.viewmodel.NuboViewModel

class MainActivity : ComponentActivity() {
    private val viewModel: NuboViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            NuboTheme {
                NuboApp(viewModel = viewModel)
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NuboApp(viewModel: NuboViewModel) {
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route ?: "estado"

    Scaffold(
        topBar = {
            NuboTopBar(
                isBleConnected = viewModel.isBleConnected.collectAsState().value,
                onReconnectClick = { viewModel.reconnectBle() }
            )
        },
        bottomBar = {
            NuboBottomNavigation(
                currentRoute = currentRoute,
                onNavigate = { route ->
                    navController.navigate(route) {
                        popUpTo(navController.graph.startDestinationId) { saveState = true }
                        launchSingleTop = true
                        restoreState = true
                    }
                }
            )
        },
        containerColor = MaterialTheme.colorScheme.surface
    ) { paddingValues ->
        NavHost(
            navController = navController,
            startDestination = "estado",
            modifier = Modifier.padding(paddingValues)
        ) {
            composable("estado") { EstadoScreen(viewModel) }
            composable("diagnostico") { DiagnosticoScreen(viewModel) }
            composable("pronostico") { PronosticoScreen(viewModel) }
            composable("historial") { HistorialScreen(viewModel) }
            composable("dispositivo") { DispositivoScreen(viewModel) }
        }
    }
}`,
  },
  {
    id: 'estado_screen',
    filename: 'EstadoScreen.kt',
    path: 'app/src/main/java/com/nubo/pe/ui/screens/EstadoScreen.kt',
    language: 'kotlin',
    description: 'Pantalla Estado con el orbe central biofílico en Canvas, temporizador circular y telemetría de aire.',
    code: `package com.nubo.pe.ui.screens

import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.nubo.pe.viewmodel.NuboViewModel

@Composable
fun EstadoScreen(viewModel: NuboViewModel) {
    val scrollState = rememberScrollState()
    val secondsRemaining by viewModel.secondsRemaining.collectAsState()
    val isTimerRunning by viewModel.isTimerRunning.collectAsState()
    val currentRoom by viewModel.selectedRoom.collectAsState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Selector de Espacio Activo
        RoomSelectorRow(
            selectedRoom = currentRoom,
            onSelectRoom = { viewModel.selectRoom(it) }
        )

        // Orbe Biofílico Central
        BiofilicOrbCard(
            secondsRemaining = secondsRemaining,
            isTimerRunning = isTimerRunning,
            onToggleTimer = { viewModel.toggleTimer() },
            onMarkOpened = { viewModel.markWindowsOpened() }
        )

        // Balance de Ambientes (Interior vs Exterior)
        EnvironmentBalanceCard(
            co2 = currentRoom.co2,
            temp = currentRoom.temp,
            aqi = 22,
            extTemp = 18
        )

        // Modos Rápidos del Sensor
        QuickModesSection(
            activeMode = viewModel.quickMode.collectAsState().value,
            onSelectMode = { viewModel.setQuickMode(it) }
        )
    }
}

@Composable
fun BiofilicOrbCard(
    secondsRemaining: Int,
    isTimerRunning: Boolean,
    onToggleTimer: () -> Unit,
    onMarkOpened: () -> Unit
) {
    Card(
        shape = RoundedCornerShape(28.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Animated Dial Ring
            Box(
                contentAlignment = Alignment.Center,
                modifier = Modifier.size(200.dp)
            ) {
                val progress = secondsRemaining / (15f * 60f)
                val animatedProgress by animateFloatAsState(
                    targetValue = progress,
                    animationSpec = tween(durationMillis = 600)
                )

                Canvas(modifier = Modifier.fillMaxSize()) {
                    // Background Ring
                    drawCircle(
                        color = Color(0xFFD6ECF1),
                        style = Stroke(width = 16f, cap = StrokeCap.Round)
                    )
                    // Active Progress Ring
                    drawArc(
                        color = Color(0xFF006D40),
                        startAngle = -90f,
                        sweepAngle = 360f * animatedProgress,
                        useCenter = false,
                        style = Stroke(width = 18f, cap = StrokeCap.Round)
                    )
                }

                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Icon(
                        imageVector = Icons.Default.Air,
                        contentDescription = "Viento",
                        tint = Color(0xFF006D40),
                        modifier = Modifier.size(32.dp)
                    )
                    val minutes = secondsRemaining / 60
                    val seconds = secondsRemaining % 60
                    Text(
                        text = String.format("%02d:%02d", minutes, seconds),
                        fontSize = 32.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF005C59)
                    )
                    Text(
                        text = "Recomendado",
                        fontSize = 11.sp,
                        color = Color(0xFF3E4948)
                    )
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            Surface(
                color = Color(0xFF7AFBB1),
                shape = CircleShape,
                modifier = Modifier.padding(bottom = 8.dp)
            ) {
                Text(
                    text = "Momento Ideal para Ventilar",
                    color = Color(0xFF007444),
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(horizontal = 12.dp, vertical = 4.dp)
                )
            }

            Text(
                text = "Abre ventanas 15 minutos para renovar el aire",
                fontSize = 18.sp,
                fontWeight = FontWeight.Bold,
                textAlign = TextAlign.Center,
                color = Color(0xFF0A1E22)
            )

            Spacer(modifier = Modifier.height(16.dp))

            Button(
                onClick = onToggleTimer,
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF005C59)),
                shape = CircleShape,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(48.dp)
            ) {
                Icon(
                    imageVector = if (isTimerRunning) Icons.Default.Pause else Icons.Default.PlayArrow,
                    contentDescription = null
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(if (isTimerRunning) "Pausar ventilación" else "Iniciar ventilación guiada")
            }

            Spacer(modifier = Modifier.height(8.dp))

            OutlinedButton(
                onClick = onMarkOpened,
                shape = CircleShape,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(44.dp)
            ) {
                Icon(Icons.Default.Check, contentDescription = null, tint = Color(0xFF005C59))
                Spacer(modifier = Modifier.width(8.dp))
                Text("Ya he abierto las ventanas", color = Color(0xFF005C59))
            }
        }
    }
}`,
  },
  {
    id: 'diagnostico_screen',
    filename: 'DiagnosticoScreen.kt',
    path: 'app/src/main/java/com/nubo/pe/ui/screens/DiagnosticoScreen.kt',
    language: 'kotlin',
    description: 'Pantalla de Transparencia Inteligente, comparativa de aire y técnica de ventilación cruzada.',
    code: `package com.nubo.pe.ui.screens

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.nubo.pe.viewmodel.NuboViewModel

@Composable
fun DiagnosticoScreen(viewModel: NuboViewModel) {
    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Hero Context Card
        Card(
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = "TRANSPARENCIA INTELIGENTE",
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF005C59)
                )
                Text(
                    text = "¿Por qué ventilar ahora?",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF0A1E22)
                )
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = "Detectamos acumulación natural de CO₂ tras 2 horas de concentración. El exterior presenta condiciones idóneas para renovar el ambiente y revitalizar tu energía.",
                    fontSize = 13.sp,
                    color = Color(0xFF3E4948)
                )
            }
        }

        // Comparativa en tiempo real
        Card(
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                Text("Comparativa en tiempo real", fontSize = 16.sp, fontWeight = FontWeight.Bold)
                
                ComparisonRow(
                    metricName = "Calidad de Aire",
                    indoorValue = "Regular (890 ppm)",
                    outdoorValue = "Óptima y pura",
                    isIndoorWarning = true
                )
                ComparisonRow(
                    metricName = "Temperatura",
                    indoorValue = "23°C (Agradable)",
                    outdoorValue = "19°C (Refrescante)",
                    isIndoorWarning = false
                )
                ComparisonRow(
                    metricName = "Humedad",
                    indoorValue = "58% (Estable)",
                    outdoorValue = "48% (Equilibrada)",
                    isIndoorWarning = false
                )
            }
        }

        // Tarjeta Consejo de Ventilación Cruzada
        Card(
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF005C59)),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("CONSEJO DE VENTILACIÓN CRUZADA", fontSize = 10.sp, color = Color(0xFF80D5D1), fontWeight = FontWeight.Bold)
                Text("Corriente suave de 5 minutos", fontSize = 18.sp, color = Color.White, fontWeight = FontWeight.Bold)
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = "Abre la ventana del balcón y la puerta del pasillo para crear una corriente suave de 5 minutos.",
                    fontSize = 13.sp,
                    color = Color.White.copy(alpha = 0.9f)
                )
            }
        }
    }
}

@Composable
fun ComparisonRow(metricName: String, indoorValue: String, outdoorValue: String, isIndoorWarning: Boolean) {
    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
        Column(modifier = Modifier.weight(1f)) {
            Text(metricName, fontSize = 11.sp, color = Color.Gray)
            Text(indoorValue, fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = if (isIndoorWarning) Color(0xFF744800) else Color(0xFF0A1E22))
        }
        Column(modifier = Modifier.weight(1f)) {
            Text("Exterior", fontSize = 11.sp, color = Color(0xFF005C59))
            Text(outdoorValue, fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = Color(0xFF006D40))
        }
    }
}`,
  },
  {
    id: 'dispositivo_screen',
    filename: 'DispositivoScreen.kt',
    path: 'app/src/main/java/com/nubo/pe/ui/screens/DispositivoScreen.kt',
    language: 'kotlin',
    description: 'Control de Hardware Pebble: Bluetooth Low Energy, slider de brillo, modos de luz LED y calibración NDIR.',
    code: `package com.nubo.pe.ui.screens

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.nubo.pe.viewmodel.NuboViewModel

@Composable
fun DispositivoScreen(viewModel: NuboViewModel) {
    val scrollState = rememberScrollState()
    val brightness by viewModel.pebbleBrightness.collectAsState()
    val lightMode by viewModel.lightMode.collectAsState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Tarjeta Central Pebble Mockup
        Card(
            shape = RoundedCornerShape(24.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(
                modifier = Modifier.padding(20.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                // Virtual Pebble with LED Ring
                Box(contentAlignment = Alignment.Center, modifier = Modifier.size(160.dp)) {
                    Canvas(modifier = Modifier.fillMaxSize()) {
                        drawCircle(
                            color = Color(0xFF7AFBB1).copy(alpha = brightness / 100f),
                            radius = size.minDimension / 2f
                        )
                        drawCircle(
                            color = Color(0xFF006D40),
                            radius = size.minDimension / 2f - 4.dp.toPx(),
                            style = Stroke(width = 8f)
                        )
                    }

                    // Pebble center OLED
                    Box(
                        contentAlignment = Alignment.Center,
                        modifier = Modifier
                            .size(72.dp)
                            .clip(CircleShape)
                            .background(Color(0xFF203337))
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Icon(Icons.Default.Air, contentDescription = null, tint = Color(0xFF7AFBB1))
                            Text("15 min", color = Color(0xFFE2F8FC), fontSize = 10.sp, fontWeight = FontWeight.Bold)
                        }
                    }
                }

                Spacer(modifier = Modifier.height(12.dp))
                Text("NUBO-PE Pebble", fontSize = 18.sp, fontWeight = FontWeight.Bold)
                Text("Rev. 2.4 · Firmware v1.2.0 al día", fontSize = 11.sp, color = Color.Gray)
            }
        }

        // Slider de Brillo
        Card(
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = Color.White),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text("Intensidad luminosa", fontSize = 13.sp, fontWeight = FontWeight.SemiBold)
                    Text("\${brightness.toInt()}%", fontSize = 13.sp, fontWeight = FontWeight.Bold, color = Color(0xFF005C59))
                }
                Slider(
                    value = brightness,
                    onValueChange = { viewModel.setPebbleBrightness(it) },
                    valueRange = 10f..100f,
                    colors = SliderDefaults.colors(thumbColor = Color(0xFF005C59), activeTrackColor = Color(0xFF005C59))
                )
            }
        }

        // Acciones de prueba háptica y BLE
        Button(
            onClick = { viewModel.testLightPulse() },
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFE2F8FC)),
            shape = RoundedCornerShape(16.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Probar pulso de luz ahora", color = Color(0xFF005C59), fontWeight = FontWeight.Bold)
        }
    }
}`,
  },
  {
    id: 'view_model',
    filename: 'NuboViewModel.kt',
    path: 'app/src/main/java/com/nubo/pe/viewmodel/NuboViewModel.kt',
    language: 'kotlin',
    description: 'ViewModel arquitectónico con StateFlow, control de temporizadores Coroutine y llamadas Bluetooth LE.',
    code: `package com.nubo.pe.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.nubo.pe.ble.BleHardwareController
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

data class RoomModel(
    val id: String,
    val name: String,
    val co2: Int,
    val temp: Int,
    val status: String
)

class NuboViewModel(
    private val bleController: BleHardwareController = BleHardwareController()
) : ViewModel() {

    private val _isBleConnected = MutableStateFlow(true)
    val isBleConnected: StateFlow<Boolean> = _isBleConnected.asStateFlow()

    private val _secondsRemaining = MutableStateFlow(15 * 60)
    val secondsRemaining: StateFlow<Int> = _secondsRemaining.asStateFlow()

    private val _isTimerRunning = MutableStateFlow(false)
    val isTimerRunning: StateFlow<Boolean> = _isTimerRunning.asStateFlow()

    private val _pebbleBrightness = MutableStateFlow(45f)
    val pebbleBrightness: StateFlow<Float> = _pebbleBrightness.asStateFlow()

    private val _lightMode = MutableStateFlow("breeze")
    val lightMode: StateFlow<String> = _lightMode.asStateFlow()

    private val _quickMode = MutableStateFlow("eco")
    val quickMode: StateFlow<String> = _quickMode.asStateFlow()

    private val _selectedRoom = MutableStateFlow(
        RoomModel("salon", "Salón Principal", 890, 22, "Cargado")
    )
    val selectedRoom: StateFlow<RoomModel> = _selectedRoom.asStateFlow()

    private var timerJob: Job? = null

    fun toggleTimer() {
        if (_isTimerRunning.value) {
            pauseTimer()
        } else {
            startTimer()
        }
    }

    private fun startTimer() {
        _isTimerRunning.value = true
        timerJob?.cancel()
        timerJob = viewModelScope.launch {
            while (_secondsRemaining.value > 0 && _isTimerRunning.value) {
                delay(1000)
                _secondsRemaining.value -= 1
            }
            if (_secondsRemaining.value == 0) {
                _isTimerRunning.value = false
                bleController.sendHapticPulse()
            }
        }
    }

    private fun pauseTimer() {
        _isTimerRunning.value = false
        timerJob?.cancel()
    }

    fun markWindowsOpened() {
        _isTimerRunning.value = false
        _secondsRemaining.value = 0
        _selectedRoom.value = _selectedRoom.value.copy(co2 = 450, status = "Óptimo")
        bleController.sendGreenHaloNotice()
    }

    fun selectRoom(roomId: String) {
        // Switch active room telemetry
    }

    fun setPebbleBrightness(value: Float) {
        _pebbleBrightness.value = value
        bleController.updateLedBrightness(value.toInt())
    }

    fun setQuickMode(mode: String) {
        _quickMode.value = mode
    }

    fun reconnectBle() {
        viewModelScope.launch {
            _isBleConnected.value = false
            delay(1200)
            _isBleConnected.value = true
        }
    }

    fun testLightPulse() {
        bleController.sendTestPulse()
    }
}`,
  },
  {
    id: 'ble_controller',
    filename: 'BleHardwareController.kt',
    path: 'app/src/main/java/com/nubo/pe/ble/BleHardwareController.kt',
    language: 'kotlin',
    description: 'Controlador de Bluetooth Low Energy (GATT) con UUIDs del servicio LED y sensor NDIR de NUBO-PE.',
    code: `package com.nubo.pe.ble

import android.bluetooth.*
import android.util.Log
import java.util.UUID

class BleHardwareController {
    companion object {
        val SERVICE_UUID: UUID = UUID.fromString("0000FE40-0000-1000-8000-00805F9B34FB")
        val LED_RING_CHAR_UUID: UUID = UUID.fromString("0000FE41-0000-1000-8000-00805F9B34FB")
        val NDIR_SENSOR_CHAR_UUID: UUID = UUID.fromString("0000FE42-0000-1000-8000-00805F9B34FB")
    }

    fun updateLedBrightness(brightness: Int) {
        Log.d("NUBO-BLE", "Set LED Brightness: \$brightness%")
    }

    fun sendTestPulse() {
        Log.d("NUBO-BLE", "Sent 1-second Emerald Breath pulse to Pebble Ring")
    }

    fun sendHapticPulse() {
        Log.d("NUBO-BLE", "Haptic pulse triggered")
    }

    fun sendGreenHaloNotice() {
        Log.d("NUBO-BLE", "Green confirmation halo sent")
    }
}`,
  },
  {
    id: 'theme_file',
    filename: 'Theme.kt',
    path: 'app/src/main/java/com/nubo/pe/ui/theme/Theme.kt',
    language: 'kotlin',
    description: 'Tema Material 3 con la paleta de colores de Atmospheric Wellness de NUBO-PE.',
    code: `package com.nubo.pe.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

val NuboPrimary = Color(0xFF005C59)
val NuboPrimaryContainer = Color(0xFF0E7673)
val NuboSecondary = Color(0xFF006D40)
val NuboSecondaryContainer = Color(0xFF7AFBB1)
val NuboTertiary = Color(0xFF744800)
val NuboSurface = Color(0xFFEEFCFF)
val NuboOnSurface = Color(0xFF0A1E22)

private val LightColorScheme = lightColorScheme(
    primary = NuboPrimary,
    primaryContainer = NuboPrimaryContainer,
    secondary = NuboSecondary,
    secondaryContainer = NuboSecondaryContainer,
    tertiary = NuboTertiary,
    surface = NuboSurface,
    onSurface = NuboOnSurface,
    background = NuboSurface
)

@Composable
fun NuboTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = LightColorScheme,
        content = content
    )
}`,
  },
  {
    id: 'build_gradle',
    filename: 'build.gradle.kts',
    path: 'app/build.gradle.kts',
    language: 'kotlin',
    description: 'Script de construcción Gradle con dependencias de Jetpack Compose, Material 3, Navigation y Coroutines.',
    code: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

android {
    namespace = "com.nubo.pe"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.nubo.pe"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildFeatures {
        compose = true
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {
    implementation(platform("androidx.compose:compose-bom:2025.02.00"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.material:material-icons-extended")
    implementation("androidx.navigation:navigation-compose:2.8.8")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.7")
    implementation("androidx.activity:activity-compose:1.10.1")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.10.1")
}`,
  },
  {
    id: 'manifest',
    filename: 'AndroidManifest.xml',
    path: 'app/src/main/AndroidManifest.xml',
    language: 'xml',
    description: 'Manifiesto de Android con permisos de Bluetooth Low Energy (BLUETOOTH_SCAN, BLUETOOTH_CONNECT) y Notificaciones.',
    code: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <!-- Permisos para sincronización Bluetooth con NUBO-PE Pebble -->
    <uses-permission android:name="android.permission.BLUETOOTH" android:maxSdkVersion="30" />
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" android:maxSdkVersion="30" />
    <uses-permission android:name="android.permission.BLUETOOTH_SCAN" android:usesPermissionFlags="neverForLocation" />
    <uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="NUBO-PE"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.NuboPE">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@style/Theme.NuboPE">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`,
  },
];

export const AndroidCodeModal: React.FC<AndroidCodeModalProps> = ({ isOpen, onClose }) => {
  const [selectedFileId, setSelectedFileId] = useState<string>('main_activity');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const activeFile =
    KOTLIN_FILES.find((f) => f.id === selectedFileId) || KOTLIN_FILES[0];

  const handleCopy = () => {
    navigator.clipboard?.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#0f1f23] text-[#eefcff] rounded-3xl w-full max-w-4xl h-[90vh] flex flex-col shadow-2xl border border-[#005c59]/40 overflow-hidden">
        {/* Modal Header */}
        <div className="h-16 px-5 border-b border-[#005c59]/30 flex items-center justify-between shrink-0 bg-[#0a181b]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#005c59] flex items-center justify-center text-white shadow-md">
              <span className="material-symbols-outlined text-[20px]">android</span>
            </div>
            <div>
              <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-sm sm:text-base text-white flex items-center gap-2">
                <span>Código Kotlin Android Studio</span>
                <span className="px-2 py-0.5 rounded-full bg-[#7afbb1] text-[#002110] text-[10px] font-bold">
                  Jetpack Compose
                </span>
              </h2>
              <p className="font-['Inter'] text-[11px] text-[#80d5d1]">
                Arquitectura Clean / MVVM con Material 3 para Android Hedgehog / Ladybug
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#005c59] text-white text-xs font-semibold hover:bg-[#0e7673] active:scale-95 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? '¡Copiado!' : 'Copiar Archivo'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Descargar</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all ml-1"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Body Split: File sidebar + Code editor view */}
        <div className="flex-1 flex flex-col sm:flex-row min-h-0">
          {/* File Explorer Sidebar */}
          <div className="w-full sm:w-64 bg-[#0a181b]/70 border-b sm:border-b-0 sm:border-r border-[#005c59]/20 p-2.5 overflow-y-auto shrink-0 flex flex-row sm:flex-col gap-1">
            <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#80d5d1] hidden sm:block">
              Archivos del Proyecto Android
            </div>
            {KOTLIN_FILES.map((file) => {
              const isSelected = file.id === selectedFileId;
              return (
                <button
                  key={file.id}
                  onClick={() => setSelectedFileId(file.id)}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-left text-xs transition-all whitespace-nowrap sm:whitespace-normal shrink-0 ${
                    isSelected
                      ? 'bg-[#005c59] text-white font-bold shadow-sm'
                      : 'text-[#bdc9c7] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px] opacity-80">
                    {file.filename.endsWith('.xml')
                      ? 'description'
                      : file.filename.endsWith('.kts')
                      ? 'build'
                      : 'code'}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="truncate">{file.filename}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Code Viewer */}
          <div className="flex-1 flex flex-col min-h-0 bg-[#081215]">
            {/* File Path & Description bar */}
            <div className="px-4 py-2 bg-[#0d2227] border-b border-[#005c59]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
              <span className="font-['JetBrains_Mono'] text-[#7afbb1] text-[11px] truncate">
                {activeFile.path}
              </span>
              <span className="text-[#80d5d1] text-[11px] truncate">
                {activeFile.description}
              </span>
            </div>

            {/* Code content */}
            <div className="flex-1 overflow-auto p-4 font-['JetBrains_Mono'] text-[12px] leading-relaxed text-[#d1e6eb] selection:bg-[#005c59] selection:text-white">
              <pre className="whitespace-pre">
                <code>{activeFile.code}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Modal Footer Instructions */}
        <div className="h-12 px-4 bg-[#0a181b] border-t border-[#005c59]/20 flex items-center justify-between text-xs text-[#80d5d1]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#7afbb1]">
              check_circle
            </span>
            <span>
              Listo para compilar en <strong>Android Studio Hedgehog / Ladybug</strong>
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="text-xs text-white hover:underline font-bold"
          >
            Copiar al portapapeles
          </button>
        </div>
      </div>
    </div>
  );
};
