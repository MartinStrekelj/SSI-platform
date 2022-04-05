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
import { CUSTOM_NAVIGATION_THEME, CUSTOM_PAPER_THEME } from './shared/theme'

const Stack = createNativeStackNavigator()

const App = () => (
  <PaperProvider theme={CUSTOM_PAPER_THEME}>
    <NavigationContainer theme={CUSTOM_NAVIGATION_THEME}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerLargeTitle: true,
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 24,
            fontFamily: 'Rubik-SemiBold',
          },
        }}
      >
        <Stack.Screen name={Screens.CREDENTIALS} component={CredentialsScreen} options={{ title: 'Credentials' }} />
        <Stack.Screen name={Screens.WALLET} component={HomeScreen} options={{ title: 'Wallet' }} />
        <Stack.Screen name={Screens.SCANNER} component={ScanScreen} />
        <Stack.Screen
          name={Screens.PRESENTATION}
          component={PresentationScreen}
          options={{ title: 'Create presentation' }}
        />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name={Screens.MODAL} component={ModalScreen} options={{ title: 'Scan result' }} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  </PaperProvider>
)

export default App
