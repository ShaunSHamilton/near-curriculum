import { WalletConnection, keyStores, connect, Contract } from "near-api-js";

const keyStore = new keyStores.BrowserLocalStorageKeyStore();

const connectionConfig = {
  keyStore,
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: "https://testnet.mynearwallet.com"
};

const nearConnection = await connect(connectionConfig);

const contractName = "word-guess.tshaun.testnet";

const contractAccount = await nearConnection.account(contractName);

export class Wallet {
  walletConnection;
  contract;
  constructor() {
    this.walletConnection = new WalletConnection(nearConnection, "word-guess");
    this.contract = new Contract(contractAccount, contractName, {
      viewMethods: ['viewHints', 'viewGuesses'],
      changeMethods: ['makeGuess']
    });
  }

  signIn() {
    this.walletConnection.requestSignIn({
      contractId: contractName,
    });
  }

  isSignedIn() {
    return this.walletConnection.isSignedIn();
  }

  signOut() {
    this.walletConnection.signOut();
  }

  async viewMethod({ method, args = {} }) {
    const response = await this.contract[method](args);
    return response;
  }

  async callMethod({ method, args = {} }) {
    const response = await this.contract[method](args);
    return response;
  }
}