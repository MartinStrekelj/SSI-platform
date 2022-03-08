import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper'

import HomeScreen from './screens/HomeScreen'
import ScanScreen from './screens/ScanScreen'
import CredentialsScreen from './screens/CredentialsScreen'
import PresentationScreen from './screens/PresentationScreen'
import ModalScreen from './screens/ModalScreen'
import { Screens } from './types'
import PresentationCreateContextProvider from './shared/lib/PresentationCreateContext'

const PAPER_THEME = {
  ...DefaultTheme,
  dark: false,
}

const Stack = createNativeStackNavigator()

const App = () => (
  <PaperProvider theme={PAPER_THEME}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={Screens.CREDENTIALS} component={CredentialsScreen} options={{ title: null }} />
        <Stack.Screen name={Screens.WALLET} component={HomeScreen} options={{ title: 'My wallet information' }} />
        <Stack.Screen name={Screens.SCANNER} component={ScanScreen} />
        <Stack.Screen name={Screens.PRESENTATION} component={PresentationScreen} options={{ title: null }} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name={Screens.MODAL} component={ModalScreen} options={{ title: 'Scan result' }} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  </PaperProvider>
)

export default App
