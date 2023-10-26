import {join} from "path";
import os from 'os';
import { keyStores, connect } from "near-api-js";

const credentialsPath = join(os.homedir(), '.near-credentials');
const myKeys = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);

const connectionConfig = {networkId: 'testnet', keyStore: myKeys, nodeUrl: 'https://rpc.testnet.near.org'};

export const nearConnection = await connect(connectionConfig);
