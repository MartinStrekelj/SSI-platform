import { createAgent, IDIDManager, IResolver, IDataStore, IKeyManager, IMessageHandler } from '@veramo/core'

// Core identity manager plugin
import { DIDManager } from '@veramo/did-manager'

// Ethr did identity provider
import { EthrDIDProvider } from '@veramo/did-provider-ethr'

// Core key manager plugin
import { KeyManager } from '@veramo/key-manager'

// Custom key management system for RN
import { KeyManagementSystem, SecretBox } from '@veramo/kms-local'

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
  PrivateKeyStore,
  migrations,
  DataStore,
  DataStoreORM,
} from '@veramo/data-store'

// TypeORM is installed with `@veramo/data-store`
import { createConnection } from 'typeorm'
import { DIDComm, IDIDComm } from '@veramo/did-comm'
import { getDidKeyResolver } from '@veramo/did-provider-key'
import { CredentialIssuer, ICredentialIssuer } from '@veramo/credential-w3c'

// This will be the name for the local sqlite database for demo purposes
const DATABASE_FILE = 'database.sqlite'

const INFURA_PROJECT_ID = 'fafaa91460c845668f9a320ccb90a916'
const dbEncryptionKey = '34a89015e491a984bfe6e38e7623833209de9065a36124564aded4144ffb1291'

const dbConnection = createConnection({
  type: 'sqlite',
  database: DATABASE_FILE,
  synchronize: false,
  migrations,
  migrationsRun: true,
  logging: ['error', 'info', 'warn'],
  entities: Entities,
})

export const agent = createAgent<
  IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver & IDIDComm & IMessageHandler & ICredentialIssuer
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
      defaultProvider: 'did:ethr:rinkeby',
      providers: {
        'did:ethr:rinkeby': new EthrDIDProvider({
          defaultKms: 'local',
          network: 'rinkeby',
          rpcUrl: 'https://rinkeby.infura.io/v3/' + INFURA_PROJECT_ID,
        }),
      },
    }),
    new DIDResolverPlugin({
      resolver: new Resolver({
        ...ethrDidResolver({ infuraProjectId: INFURA_PROJECT_ID }),
        ...webDidResolver(),
        ...getDidKeyResolver(),
      }),
    }),
    new DIDComm(),
    new CredentialIssuer(),
    new DataStore(dbConnection),
    new DataStoreORM(dbConnection),
  ],
})
