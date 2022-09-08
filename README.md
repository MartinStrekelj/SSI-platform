# SSI Platform

An IT solution that will digitize securely the procedures of issuing, holding, and verifying verifiable credentials issued and accepted by different organizations.

## Start local environment :computer:

Tested with:

- node v16.16.0
- npm 8.3.1

### Set env variables and create extra tables

1. Set Supabase
   1. Sign in and create a new database project
   2. Create the following tables

![Employee data](/readme/supabase-policy.png?raw=true 'Employee Data title')

![Employee data](/readme/supabase-revoked.png?raw=true 'Employee Data title')

![Employee data](/readme/supabase-schemas.png?raw=true 'Employee Data title')

2. Create a project on [Infura](https://infura.io/)

3. Update env file with credentials from (1.) and (2.)

### Start platform web app and backend

```bash
npm install
```

```bash
npx nx run-many --parallel --target=serve --projects=ssi-platform,backend
```

After the backend has succesfully started, you should get a console.log in the terminal with aurhority identifiers

```ts
[
  ...,
  Identifier {
    did: '<some-did>',
    provider: 'did:ethr:rinkeby',
    alias: 'OKS',
    controllerKeyId: '046bf71fa0ce82df0262d076d17835e196ac0c86eb246ed955940d367ba2ae68dc0cb966d87533d53757779d996c56f387431b4b3494c796d20d7876476125f625',
    keys: [ [Key] ],
    services: []
  },
  ...
  ]
```

You can copy any `Identifier.did` to login to the dashboard
