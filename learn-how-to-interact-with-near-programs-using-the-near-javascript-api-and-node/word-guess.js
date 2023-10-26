import { Contract } from "near-api-js";
import { contractAccount, contractName } from "./my-accounts.js";

const method = process.argv[2];

const args = process.argv[3] ? JSON.parse(process.argv[3]) : {};

const contract = new Contract(contractAccount,contractName, {viewMethods: ['viewHints', 'viewGuesses'], changeMethods: ['addHint','makeGuess', 'viewSecretWord']});

const response = await contract[method](args);
console.log(response);
