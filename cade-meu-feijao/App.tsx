import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListaRefeicoes from './src/screens/ListaRefeicoes';
import AdicionarPrato from './src/screens/AdicionarPrato';
import AdicionarItem from './src/screens/AdicionarItem';
import Login from './src/screens/Login';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="ListaRefeicoes" component={ListaRefeicoes} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="AdicionarPrato" component={AdicionarPrato} />
          <Stack.Screen name="AdicionarItem" component={AdicionarItem} />
        </Stack.Navigator>
        <StatusBar hidden={true}/>
      </NavigationContainer>
    </PaperProvider>
  )
}