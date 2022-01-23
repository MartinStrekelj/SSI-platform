import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import ScanScreen from './screens/ScanScreen';

export enum Screens {
  WALLET = 'Wallet',
  SCANNER = 'Scanner',
}

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Wallet" component={HomeScreen} />
      <Stack.Screen name="Scanner" component={ScanScreen} />
      {/* <Stack.Screen name="Credentials" component={HomeScreen} /> */}
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
