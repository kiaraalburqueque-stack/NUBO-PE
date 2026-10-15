package com.nubo.pe

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
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
        bottomBar = {
            NuboBottomNavigationBar(
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
}
