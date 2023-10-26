import { NearBindgen, initialize, view, call, near, Vector } from "near-sdk-js";

@NearBindgen({
  requireInit: true
})
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = new Vector('hints');
    this.guesses = new Vector('guesses');
  }

  @initialize({})
  init({secretWord}) {
    this.secretWord = secretWord;
    return `The secret word has been set to '${secretWord}'`;
  }

  @call({
    privateFunction: true
  })
  viewSecretWord() {
    return `The secret word is '${this.secretWord}'`;
  }

  @call({
    privateFunction: true
  })
  addHint({hint}) {
    this.hints.push(hint);
    return `Your hint was added`;
  }

  @view({})
  viewHints() {
    return this.hints.toArray();
  }

  @view({})
  viewGuesses() {
    return this.guesses.toArray();
  }

  @call({})
  makeGuess({guess}) {
    const lastGuess = this.guesses.get(this.guesses.length-1);
    if (lastGuess?.guess === this.secretWord) {
      return `This game is finished. The secret word, '${this.secretWord}', was guessed by ${lastGuess.guesser}`;
    } else {
      const guesser = near.predecessorAccountId();
      near.log(`\nguesser = ${guesser}`);
      near.log(`\nguess = ${guess}`);
      this.guesses.push({guesser, guess});
      if (guess === this.secretWord) {
        return `You got it! The secret word is '${this.secretWord}'`;
      } else {
        return `Sorry, '${guess}' is not the secret word`;
      }
    }
  }
}