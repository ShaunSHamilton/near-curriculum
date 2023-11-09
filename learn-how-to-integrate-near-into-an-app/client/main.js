import { Wallet } from "./wallet.js";
import {Buffer} from "buffer";

window.Buffer = Buffer;
window.global = {
  Buffer: Buffer,
  fetch: (...args) => fetch(...args)
}

import './style.css'

const wallet = new Wallet();

window.onload = async () => {
  let isSignedIn = wallet.isSignedIn();

  if (isSignedIn) {
    connectWalletBtn.innerHTML = "Disconnect Wallet";
  } else {
  }
  
  // Get guesses
  const guesses = await wallet.call({method: 'viewGuesses'});
  console.log(guesses);
  for (const guess of guesses) {
    const li = document.createElement('li');
    li.innerText = `${guess.guesser} guessed '${guess.guess}'`;
    guessesOl.append(li);
  }
};




const guessIn = document.querySelector("#guess");
const hintsOl = document.querySelector("#hints");
const guessBtn = document.querySelector("#guess-btn");
const guessesOl = document.querySelector("#guesses");
const connectWalletBtn = document.querySelector("#connect-wallet");
const responseP = document.querySelector('#response');
const hintsBtn = document.querySelector("#hints-btn");

connectWalletBtn.addEventListener('click', () => {
  const isSignedIn = wallet.isSignedIn();
  if (isSignedIn) {
    wallet.signOut();
    connectWalletBtn.innerHTML = "Connect Wallet";
  } else {
    wallet.signIn();
    connectWalletBtn.innerHTML = "Disconnect Wallet";
  }
});

guessBtn.addEventListener('click', async () => {
  const guess = guessIn.value;
  const resp = await wallet.call({method: "makeGuess", args: {guess}});
  console.log("response: ", resp);
  responseP.innerText = resp;
});

hintsBtn.addEventListener('click', async () => {
  const hints = await wallet.call({method: "viewHints"});
  for (const hint of hints) {
    const li = document.createElement("li");
    li.innerText = hint;
    hintsOl.append(li);
  }
});