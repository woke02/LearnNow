import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import IconButton from './components/ui/IconButton';
import Home from './screens/Home';
import { useFonts } from 'expo-font'
import LoadingOverlay from './components/ui/LoadingOverlay';
import Chapter from './screens/Chapter';
import AppContextProvider, { AppContext } from './store/app-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: 'source-sans-bold',
          fontSize: 26,
        },
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const {logout} = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontFamily: 'source-sans-bold',
          fontSize: 26,
        },
        headerTitleAlign: "center",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name='Home'
        component={Home}
        options={{
          title: 'LearnNow',
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={logout}
            />
          ),
        }}
      />
      <Stack.Screen
        name='Chapter'
        component={Chapter}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { initialNavigationState } = useContext(AppContext)
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <NavigationContainer initialState={initialNavigationState} onStateChange={(state) => AsyncStorage.setItem('navigationState', JSON.stringify(state))}>
      {isAuthenticated ?
        <AuthenticatedStack /> :
        <AuthStack />
      }
    </NavigationContainer>
  );
}


export default function App() {
  const [fontsLoaded] = useFonts({
    'source-sans': require('./assets/fonts/SourceSansPro-Regular.ttf'),
    'source-sans-semi': require('./assets/fonts/SourceSansPro-SemiBold.ttf'),
    'source-sans-bold': require('./assets/fonts/SourceSansPro-Bold.ttf'),
    'source-sans-light': require('./assets/fonts/SourceSansPro-Light.ttf'),
  })
  if (!fontsLoaded) {
    return <LoadingOverlay />
  }
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <AppContextProvider>
          <Navigation />
        </AppContextProvider>
      </AuthContextProvider>
    </>
  );
}