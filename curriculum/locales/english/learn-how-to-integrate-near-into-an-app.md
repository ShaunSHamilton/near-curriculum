# NEAR - Learn How to Integrate NEAR into an App

## 1

### --description--

For the duration of this project, you will be working in the `learn-how-to-integrate-near-into-an-app/` directory. Start by changing into that directory in the terminal.

If the tests don't run automatically, trash the terminal labeled `bash` and open a new bash terminal.

### --tests--

You should use the change directory command (`cd`) in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
assert.match(lastCommand, /^\s*cd/);
```

You should be in the `learn-how-to-integrate-near-into-an-app` directory in your terminal

```js
await new Promise(res => setTimeout(res, 1000));
const cwdFile = await __helpers.getCWD();
const cwd = cwdFile.split('\n').filter(Boolean).pop();
assert.include(cwd, 'learn-how-to-integrate-near-into-an-app');
```

## --fcc-end--