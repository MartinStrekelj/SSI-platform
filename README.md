# SSI Platform

An IT solution that will digitize securely the procedures of issuing, holding, and verifying verifiable credentials issued and accepted by different organizations.

## Locally run web application environment :computer:

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

After the backend has succesfully started, you should get a console.log in the terminal with authority identifiers

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

You can copy any `Identifier.did` to login to the dashboard as authority (issuer & verifier) user

## Locally run wallet application environment :iphone:

This could also be done for OSX based device, but below example is for Android development.

### Android studio

To run Android Studio, you'll first need a Java Development Kit. Linux users can install OpenJDK and Android Studio with the following two commands:

```bash
sudo apt install openjdk-8-jdk
sudo snap install android-studio --classic
```

One thing you'll probably want to do is configure a hardware accelerator for your virtual machine. The Android developer page provides [detailed instructions](https://developer.android.com/studio/run/emulator-acceleration?utm_source=android-studio) for how to do that on Mac, Windows, or Linux. Android Studio can really slow your computer down without an accelerator.

Once it's fully installed, running the command `android-studio` in your terminal will bring up a welcome window.

Click configure on the bottom right and choose "AVD Manager" to set up your Android Virtual Device. One may already be created for you, or you may need to make your own. I created a Pixel 2. Once it's created, you should have a line in your window displaying its name, resolution properties, and some other attributes. All the way to the right of the line are the actions. If everything is configured right, hitting the play button in actions launches your virtual machine.

### Run wallet application locally

Once you set up wallet install dependecies (if you didn't do it before)

```bash
npm install
```

and run the application with:

```bash
npx nx run-android wallet
```

Emulator should open and application should load inside of it. To troubleshoot you can try to reload the app by pressing "r" inside wallet terminal.

### Login to web application with wallet

In the buttom right menu select `wallet information`.

![wallet information](/readme/wallet.png?raw=true)

In the terminal the wallet will print out a DID (eg. `{"holder": "<some-did>"}`) you can copy and paste in the web application to start the 2FA login.
