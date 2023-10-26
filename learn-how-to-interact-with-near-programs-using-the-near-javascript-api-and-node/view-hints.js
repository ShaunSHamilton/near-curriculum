import { Contract } from "near-api-js";
import { mainAccount, contractName } from "./my-accounts.js";

const contract = new Contract(mainAccount, contractName, {viewMethods: ['viewHints']});

const response = await contract.viewHints();
console.log(response);
