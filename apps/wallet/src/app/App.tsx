import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  View,
  TouchableOpacity,
} from 'react-native';
import { Button } from './components/Button';
import { LoginAttemptModal } from './components/modals/LoginAttemptModal';

import t from './shared/theme';

const App = () => {
  const [receivedMessage, setMessage] = useState<any | null>(null);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={[t.pX4]}>
        <Text
          style={[
            t.text5xl,
            t.textPrimary,
            t.pY5,
            t.fontSansBold,
            t.textCenter,
          ]}
        >
          SSI-Mobile wallet
        </Text>
        <View
          style={[t.pX4, t.flex, t.flexRow, t.justifyCenter, t.itemsCenter]}
        >
          <Text style={[t.textXl, t.fontMonoBold, t.pR1]}>DID:</Text>
          <Text style={[t.textLg]}>
            did:ethr: holder_decentralised_identificator
          </Text>
        </View>
        <Button label="credentials" />
        {/* Message if someone wants to log in to the platform */}
        <LoginAttemptModal open={true} loginAttemptMessage={'foo'} />
      </SafeAreaView>
    </>
  );
};

export default App;
