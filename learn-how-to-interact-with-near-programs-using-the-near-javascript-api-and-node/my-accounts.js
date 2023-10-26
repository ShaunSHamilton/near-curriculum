import { nearConnection } from "./near-connection.js";

export const mainAccount = await nearConnection.account('tshaun.testnet');

export const contractAccount = await nearConnection.account('word-guess.tshaun.testnet');

export const contractName = "word-guess.tshaun.testnet";
