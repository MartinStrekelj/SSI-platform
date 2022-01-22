import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StatusBar, View, ScrollView } from 'react-native';
import { Button } from './components/Button';
import { LoginAttemptModal } from './components/modals/LoginAttemptModal';

import t from './shared/theme';

// Import agent from setup
import { agent } from './shared/setup';

interface Identifier {
  did: string;
}

const App = () => {
  const [receivedMessage, setMessage] = useState<any | null>(null);

  const [identifiers, setIdentifiers] = useState<Identifier[]>([]);

  const createIdentifier = async () => {
    console.log('Creating a holder');
    const holder = await agent.didManagerCreate({ alias: 'holder' });
    console.log(
      `Holder with alias: ${holder.alias} | DID: ${holder.did} | created`
    );
    console.log('Creating a key agreement key!');
    // const newKey = await agent.keyManagerCreate({
    //   kms: 'local',
    //   type: 'X25519',
    // });

    // console.log(`Created a new key ~~ ${newKey.publicKeyHex} `);

    // console.log('Add key to manager');
    // const result = await agent.didManagerAddKey({
    //   did: holder.did,
    //   key: newKey,
    // });

    // console.log(`Key added ${result}`);

    setIdentifiers((s) => s.concat([holder]));
  };

  const deleteIdentifiers = async () => {
    console.warn('presesd delete indentifiers');
    identifiers.map((identifier) => {
      agent.didManagerDelete({ did: identifier.did });
    });
  };

  useEffect(() => {
    const getIdentifiers = async () => {
      const _ids = await agent.didManagerFind();
      console.log(_ids);
      setIdentifiers(_ids);
    };

    getIdentifiers();
  }, []);

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

          <ScrollView>
            {identifiers.map((ident) => (
              <Text key={ident.did} style={[t.textLg]}>
                {ident.did}
              </Text>
            ))}
          </ScrollView>
        </View>
        <Button onPress={createIdentifier} label="create" />
        <Button onPress={deleteIdentifiers} label="delete" />

        {/* Message if someone wants to log in to the platform */}
        <LoginAttemptModal open={receivedMessage} loginAttemptMessage={'foo'} />
      </SafeAreaView>
    </>
  );
};

export default App;
