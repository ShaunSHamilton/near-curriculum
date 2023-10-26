import { Contract } from "near-api-js";
import { contractAccount, contractName } from "./my-accounts.js";

const contract = new Contract(contractAccount, contractName, {changeMethods:['addHint']});

const hint = process.argv[2];

const response = await contract.addHint({"hint": hint});
console.log(response);

