import { PaperProvider, MD3LightTheme as DefaultTheme,
} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListaRefeicoes from './src/screens/ListaRefeicoes';
import AdicionarPrato from './src/screens/AdicionarPrato';
import AdicionarItem from './src/screens/AdicionarItem';
import Login from './src/screens/Login';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

const Stack = createStackNavigator()
export default function App() {
/*
#B55C3D
#010101
#613029
#FDFCFC
#9A3824
*/
  const yourGeneratedLightOrDarkScheme = {
    "colors": {
      "primary": "#B55C3D",
      "onPrimary": "rgb(255, 255, 255)",
      "primaryContainer": "rgb(255, 219, 208)",
      "onPrimaryContainer": "rgb(57, 12, 0)",
      "secondary": "#613029",
      "onSecondary": "rgb(255, 255, 255)",
      "secondaryContainer": "rgb(255, 218, 211)",
      "onSecondaryContainer": "rgb(62, 5, 0)",
      "tertiary": "#9A3824",
      "onTertiary": "rgb(255, 255, 255)",
      "tertiaryContainer": "rgb(255, 218, 213)",
      "onTertiaryContainer": "rgb(65, 0, 0)",
      "error": "rgb(186, 26, 26)",
      "onError": "rgb(255, 255, 255)",
      "errorContainer": "rgb(255, 218, 214)",
      "onErrorContainer": "rgb(65, 0, 2)",
      "background": "rgb(255, 251, 255)",
      "onBackground": "rgb(32, 26, 24)",
      "surface": "rgb(255, 251, 255)",
      "onSurface": "rgb(32, 26, 24)",
      "surfaceVariant": "rgb(245, 222, 215)",
      "onSurfaceVariant": "rgb(83, 67, 63)",
      "outline": "rgb(133, 115, 110)",
      "outlineVariant": "rgb(216, 194, 187)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(54, 47, 45)",
      "inverseOnSurface": "rgb(251, 238, 234)",
      "inversePrimary": "rgb(255, 181, 157)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(250, 242, 244)",
        "level2": "rgb(247, 236, 238)",
        "level3": "rgb(244, 231, 231)",
        "level4": "rgb(243, 229, 229)",
        "level5": "rgb(241, 225, 225)"
      },
      "surfaceDisabled": "rgba(32, 26, 24, 0.12)",
      "onSurfaceDisabled": "rgba(32, 26, 24, 0.38)",
      "backdrop": "rgba(59, 45, 41, 0.4)",
      "custom0": "rgb(120, 69, 172)",
      "onCustom0": "rgb(255, 255, 255)",
      "custom0Container": "rgb(240, 219, 255)",
      "onCustom0Container": "rgb(44, 0, 81)"
    }
  }

  const theme = {
    ...DefaultTheme,
    colors: yourGeneratedLightOrDarkScheme.colors, // Copy it from the color codes scheme and then use it here
  }

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ListaRefeicoes" component={ListaRefeicoes} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="AdicionarPrato" component={AdicionarPrato} />
            <Stack.Screen name="AdicionarItem" component={AdicionarItem} />
          </Stack.Navigator>
          <StatusBar hidden={true}/>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  )
}