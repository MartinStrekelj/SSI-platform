import { LZW_decode } from '@ssi-ms/utils';
import React, { useState, useEffect } from 'react';

import { SafeAreaView, Text, StatusBar, View, ScrollView } from 'react-native';
import { Screens } from '../App';
import { Button } from '../components/Button';
import { LoginAttemptModal } from '../components/modals/LoginAttemptModal';

// Import agent from setup
import { agent } from '../shared/setup';

import t from '../shared/theme';

interface Identifier {
  did: string;
}

const MESSAGE = {
  message:
    '{"protected":"eyJ0eXAiOiJhcHBsaWNhdGlvbi9kaWRjb21tLWVuY3J5cHRlZCtqc29uIiwiZW5jIjoiWEMyMFAifQ","iv":"iRuhGMgsDzX6ofDIcHH6fB_-p5hE71I3","ciphertext":"mgnAg1QGglRNRnRwiaoY42eYulbjCtrYWfqm3-jfUVZOTqQFaZ2HigDR3bHAKFUlCpncwq1lr6qK1wfGevZA5H875fsKFBV3yN6B2Z89HueAdZoXuC2GO01MY4idRpeTOyFOfdgDBUqV3_Qjxwmab0yD_xQYO5FWlB345wRmOEkk3YmisSkzNjk","tag":"ddqsGKrOqG2WARhDFRlDHg","recipients":[{"encrypted_key":"E6BAKt1FHS7qhetrr3rBmFJ4Rz6E8isuOIvkftCu5RE","header":{"alg":"ECDH-ES+XC20PKW","iv":"navnwoYgkX3r1jHJarYL7eo0JYlQKjZF","tag":"c6PeIAS0MhtD348mvOe_Yg","epk":{"kty":"OKP","crv":"X25519","x":"dQ_jfXsekitkNulDNnI8MM3bKZULO6tWOWVy3K3iyHI"},"kid":"did:key:z6MkrUW4hXEH91gWcPD9Ueuq5ud6XvFsizE2f5Xm3ESJ1Ydp#z6LSnWiDurV2vreWwErF2UpwALdNU2tMEsuXsrGkkivGC9Si"}}]}',
};
const decodeMessage = async (messageRaw: string) => {
  // const lzw_decoded = LZW_decode(messageRaw);
  // const packedMessage = JSON.parse(lzw_decoded);
  // console.log(packedMessage);
  const a = await agent.didManagerGetByAlias({ alias: 'holder' });
  console.debug({ did: a.did });
  const resolved = await agent.resolveDid({ didUrl: a.did });
  console.log({ resolved });
  const decoded = await agent.unpackDIDCommMessage(MESSAGE);
  console.log(decoded);
  // const decoded = await agent.handleMessage({ raw: MESSAGE.message });
  // console.log({ decoded });
};

const HomeScreen = ({ route, navigation }: any) => {
  if (route.params) {
    decodeMessage(route.params.message);
  }

  const [receivedMessage, setMessage] = useState<any | null>(null);
  const [identifiers, setIdentifiers] = useState<Identifier[]>([]);

  const createIdentifier = async () => {
    console.log('Creating a holder');
    const holder = await agent.didManagerCreate({ alias: 'holder' });
    console.log(
      `Holder with alias: ${holder.alias} | DID: ${holder.did} | created`
    );
    console.log('Creating a key agreement key!');

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
        <Button
          onPress={() => navigation.navigate(Screens.SCANNER)}
          label="scan"
        />

        {/* WORKS!! */}
        {/* <QRCodeScanner
            onRead={onScan}
            topContent={
              <Text>
                Go to <Text>wikipedia.org/wiki/QR_code</Text> on your computer and
                scan the QR code.
              </Text>
            }
          /> */}

        {/* Message if someone wants to log in to the platform */}
        <LoginAttemptModal open={receivedMessage} loginAttemptMessage={'foo'} />
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
