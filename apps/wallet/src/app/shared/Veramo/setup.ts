// Core interfaces
import { createAgent, IDIDManager, IResolver, IDataStore, IKeyManager, IMessageHandler } from '@veramo/core'

import { MessageHandler } from '@veramo/message-handler'
import { DIDComm, DIDCommMessageHandler, IDIDComm } from '@veramo/did-comm'

// Core identity manager plugin
import { DIDManager } from '@veramo/did-manager'

// Ethr did identity provider
import { KeyDIDProvider, getDidKeyResolver } from '@veramo/did-provider-key'

// Core key manager plugin
import { KeyManager } from '@veramo/key-manager'

// Custom key management system for RN
import { KeyManagementSystem, SecretBox } from '@veramo/kms-local'

// Custom resolver
// Custom resolvers
import { DIDResolverPlugin } from '@veramo/did-resolver'
import { Resolver } from 'did-resolver'
import { getResolver as ethrDidResolver } from 'ethr-did-resolver'
import { getResolver as webDidResolver } from 'web-did-resolver'

// Storage plugin using TypeOrm
import {
  Entities,
  KeyStore,
  DIDStore,
  IDataStoreORM,
  migrations,
  PrivateKeyStore,
  DataStore,
  DataStoreORM,
} from '@veramo/data-store'

// TypeORM is installed with '@veramo/data-store'
import { createConnection } from 'typeorm'

const INFURA_PROJECT_ID = 'fafaa91460c845668f9a320ccb90a916'
const dbEncryptionKey = '34a89015e491a984bfe6e38e7623833209de9065a36124564aded4144ffb1291'

const dbConnection = createConnection({
  type: 'react-native',
  database: 'veramo.sqlite',
  location: 'veramo',
  migrations: migrations,
  migrationsRun: true,
  logging: ['error', 'info', 'warn'],
  entities: Entities,
})

export const agent = createAgent<
  IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver & IMessageHandler & IDIDComm
>({
  plugins: [
    new KeyManager({
      store: new KeyStore(dbConnection),
      kms: {
        local: new KeyManagementSystem(new PrivateKeyStore(dbConnection, new SecretBox(dbEncryptionKey))),
      },
    }),
    new DIDManager({
      store: new DIDStore(dbConnection),
      defaultProvider: 'did:key:provider',
      providers: {
        'did:key:provider': new KeyDIDProvider({
          defaultKms: 'local',
        }),
      },
    }),
    new MessageHandler({
      messageHandlers: [new DIDCommMessageHandler()],
    }),
    new DIDResolverPlugin({
      resolver: new Resolver({
        ...ethrDidResolver({ infuraProjectId: INFURA_PROJECT_ID }),
        ...webDidResolver(),
        ...getDidKeyResolver(),
      }),
    }),
    new DIDComm(),
    new DataStore(dbConnection),
    new DataStoreORM(dbConnection),
  ],
})
