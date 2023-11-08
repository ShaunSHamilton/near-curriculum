# NEAR - Learn How to Integrate NEAR into an App

## 1

### --description--

For the duration of this project, you will be working in the `learn-how-to-integrate-near-into-an-app/` directory. Start by changing into that directory in the terminal.

If the tests don't run automatically, trash the terminal labeled `bash` and open a new bash terminal.

### --tests--

You should use the change directory command (`cd`) in the terminal.

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
assert.match(lastCommand, /^\s*cd/);
```

You should be in the `learn-how-to-integrate-near-into-an-app` directory in your terminal.

```js
await new Promise(res => setTimeout(res, 1000));
const cwdFile = await __helpers.getCWD();
const cwd = cwdFile.split('\n').filter(Boolean).pop();
assert.include(cwd, project.dashedName);
```

## 2

### --description--

You will be adding NEAR to the web app defined in `client/`. There are some dependencies that need to be installed first. Run `npm install` to install them.

### --tests--

You should run `npm install` in the terminal.

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
assert.match(lastCommand, /^npm\s+(i|install)$/);
```

You should have a `node_modules/near-sdk-js` folder as a result of installing the dependencies.

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory(`${project.dashedName}/node_modules`);
assert.include(dir, 'near-sdk-js');
```

You should have a `node_modules/ts-morph` folder as a result of installing the dependencies.

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory(`${project.dashedName}/node_modules`);
assert.include(dir, 'ts-morph');
```

You should have a `node_modules/near-api-js` folder as a result of installing the dependencies.

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory(`${project.dashedName}/node_modules`);
assert.include(dir, 'near-api-js');
```

## 3

### --description--

Run `npm run build:word-guess` to build the word guessing game smart contract from the previous project.

### --tests--


You should run `npm run build:word-guess` in the terminal.

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
assert.match(lastCommand, /^npm\s+run\s+build:word-guess$/);
```

You should have a `build/word-guess.wasm` file as a result of building the contract.

```js
await new Promise(res => setTimeout(res, 1000));
const fileExists = await __helpers.fileExists(`${project.dashedName}/build/word-guess.wasm`);
assert.isTrue(fileExists);
```

The terminal should print `Generated build/word-guess.wasm contract successfully!`

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('Doing account.functionCall()');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /Generated build\/word-guess\.wasm contract successfully!\s*$/);
```

## 4

### --description--

Use the `dev-deploy` command to deploy the WASM file you just created to the testnet.

### --tests--

You should run `near dev-deploy build/word-guess.wasm` in the terminal.

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
assert.match(lastCommand, /near\s+dev-deploy\s+build\/word-guess\.wasm/);
```

You should have a `neardev` folder as a result of deploying the contract.

```js
await new Promise(res => setTimeout(res, 1000));
const learnDir = await __helpers.getDirectory(project.dashedName)
assert.include(learnDir, 'neardev');
```

The terminal output should include `Done deploying to <contract_name>`, where the contract name matches what's in the `neardev` folder.

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile(`${project.dashedName}/neardev/dev-account`);
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('near dev-deploy build/word-guess.wasm');
const lastOutput = splitOutput[splitOutput.length - 1];
const re = new RegExp(`Done deploying to ${id}\\s*$`);
assert.match(lastOutput, re);
```

## 5

### --description--

Within the `client/` directory, create a `wallet.js` file. This file will contain the code to connect to a NEAR wallet.

### --tests--

You should create a `client/wallet.js` file.

```js
const { access, constants } = await import('fs.promises');
const fileExists = await access(`${project.dashedName}/client/wallet.js`, constants.F_OK)
assert.isTrue(fileExists);
```

## 6

### --description--

In a previous project, you used the `UnencryptedFileSystemKeyStore` to create a key store. This time, use the `BrowserLocalStorageKeyStore` to create a key store in `client/wallet.js`:

```js
const keyStore = new keyStores.BrowserLocalStorageKeyStore();
```

### --tests--

You should have `const keyStore = new keyStores.BrowserLocalStorageKeyStore();` in `client/wallet.js`.

```js

```

You should import `keyStores` from `near-api-js` in `client/wallet.js`.

```js

```

## 7

### --description--

Below that, create a `const connectionConfig` variable. Set it to an empty object literal for now.

### --tests--

You should have `const connectionConfig = {}` at the bottom of your `wallet.js` file.

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile(join(project.dashedName,'client/wallet.js'));
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'connectionConfig');
const recreatedCode = babelised?.generateCode(testCode, { compact: true });
assert.match(recreatedCode, /const connectionConfig={};/);
```

## 8

### --description--

The connection needs a few things, a `networkId`, a `keyStore` if you want to sign transactions, and a `nodeUrl` that points to the network you want to connect to.

Add these three things to your `connectionConfig`. Set the `networkId` to `"testnet"`, the `keyStore` to your `keyStore` variable, and the `nodeUrl` to `"https://rpc.testnet.near.org"`.

### --tests--

You should have `networkId: "testnet"` in your `connectionConfig` object.

```js
await new Promise(res => setTimeout(res, 1000));
const testCode = __babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'connectionConfig');
const props = testCode?.declarations?.[0]?.init?.properties;
const networkId = props.find(p => p.key.name === 'networkId' && p.value?.value === 'testnet');
assert.exists(networkId);
```

You should have `keyStore` in your `connectionConfig` object.

```js
const testCode = __babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'connectionConfig');
const props = testCode?.declarations?.[0]?.init?.properties;
const keyStore = props.find(p => p.key.name === 'keyStore' && p.value?.name === 'keyStore');
assert.exists(keyStore);
```

You should have `nodeUrl: "https://rpc.testnet.near.org"` in your `connectionConfig` object.

```js
await new Promise(res => setTimeout(res, 1000));
const testCode = __babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'connectionConfig');
const props = testCode?.declarations?.[0]?.init?.properties;
const nodeUrl = props.find(p => p.key.name === 'nodeUrl' && p.value?.value === 'https://rpc.testnet.near.org');
assert.exists(nodeUrl);
```

### --before-all--

```js
const file = await __helpers.getFile(join(project.dashedName,'client/wallet.js'));
global.__babelised = await __helpers.babeliser(file);
```

### --after-all--

```js
delete global.__babelised;
```

## 9

### --description--

Time to connect to the network. At the top of the file, import `connect` from the `near-api-js` with the other import.

### --tests--

You should have `import { keyStores, connect } from 'near-api-js';` in your `client/wallet.js` file.

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile(
  join(project.dashedName, 'client/wallet.js')
);
const babelised = await __helpers.babeliser(code);
const imports = babelised?.getImportDeclarations().find(i => i.source?.value === 'near-api-js');
const method = imports?.specifiers?.find(s => s.local?.name === 'connect');
assert.exists(method);
```

## 10

### --description--

At the bottom of the file, create a `const nearConnection` variable. Set the value to await `connect(connectionConfig)`.

### --tests--

You should have `const nearConnection = await connect(connectionConfig);` at the bottom of your `client/wallet.js` file.

```js
const projectLoc = join(project.dashedName, 'client/wallet.js');
const code = await __helpers.getFile(projectLoc);
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'nearConnection');
const recreatedCode = babelised?.generateCode(testCode, { compact: true });
assert.match(recreatedCode, /const nearConnection=await connect\(connectionConfig\);/);
```

## 11

### --description--

You will be using the testnet account you created in the last project. Create a `<account>.testnet` file, with the name of your account. This will be used for tests.

If you don't have an account, you can learn how to create one in the `Learn NEAR Accounts by Creating a Named Testnet Account` project.

### --tests--

You should have an `<account>.testnet` file.

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory(project.dashedName);
const file = dir.find(file => file.endsWith('.testnet'));
assert.exists(file);
```

Running `near state <your_account>` should print your account information.

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory(project.dashedName);
const file = dir.find(file => file.endsWith('.testnet'));
const output = await __helpers.getCommandOutput(`NEAR_ENV=testnet near state ${file}`, project.dashedName);
const re = new RegExp(`Account\\s+${file}\\s*{\\s*amount`, 'g');
assert.match(output?.stdout, re);
```

You should only have one file ending with `.testnet` in the project folder.

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory(project.dashedName);
const files = dir.filter(file => file.endsWith('.testnet'));
assert.lengthOf(files, 1);
```

## 12

### --description--

The word guess contract is in the `src` folder, run `npm run build:word-guess` to build it.

### --tests--

You should run `npm run build:word-guess` in the terminal.

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
assert.match(lastCommand, /^npm\s+run\s+build:word-guess$/);
```

You should have a `build/word-guess.wasm` file as a result of building the contract.

```js
await new Promise(res => setTimeout(res, 1000));
const fileExists = await __helpers.fileExists(join(project.dashedName, '/build/word-guess.wasm'));
assert.isTrue(fileExists);
```

The terminal should print `Generated build/word-guess.wasm contract successfully!`.

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('Doing account.functionCall()');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /Generated build\/word-guess\.wasm contract successfully!\s*$/);
```

## 13

### --description--

Run the `deploy-contract.js` file to deploy the contract.

### --tests--

You should run `node deploy-contract.js` in the terminal.

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^\\s*node deploy-contract\.js\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print that the deployment was successful.

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('node deploy-contract.js');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /{\s*receipts_outcome/);
```

## 14

### --description--

Run the `init-contract.js` file to initialize the contract.

### --tests--

You should run `node init-contract.js` in the terminal.

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^\\s*node init-contract\.js\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print that the contract was initialized.

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('node init-contract.js');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /The secret word has been set/);
```

## --fcc-end--