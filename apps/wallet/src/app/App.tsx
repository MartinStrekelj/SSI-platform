import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Colors, Provider as PaperProvider } from 'react-native-paper'

import HomeScreen from './screens/HomeScreen'
import ScanScreen from './screens/ScanScreen'
import CredentialsScreen from './screens/CredentialsScreen'

export enum Screens {
  WALLET = 'Wallet',
  SCANNER = 'Scanner',
  CREDENTIALS = 'Credentials',
}

const Stack = createNativeStackNavigator()

const App = () => (
  <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={Screens.WALLET} component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name={Screens.SCANNER} component={ScanScreen} />
        <Stack.Screen name={Screens.CREDENTIALS} component={CredentialsScreen} options={{ title: 'My credentials' }} />
      </Stack.Navigator>
    </NavigationContainer>
  </PaperProvider>
)

export default App
