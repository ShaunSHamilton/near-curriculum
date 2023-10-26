import { NearBindgen, call, view, Vector, near, initialize } from "near-sdk-js";

@NearBindgen({
  requireInit: true
})
export class SentenceMaker {
  constructor() {
    this.sentence = '';
    this.authors = new Vector('authors');
  }

  @initialize({}) 
  init({word}) {
    this.sentence += word;
    const id = near.predecessorAccountId();
    this.authors.push({id, word})
    return `Sentence initialized with '${word}'`;
  }

  @call({})
  addWord({word}) {
    if (word.includes(' ')) {
      return `You cannot add anything with spaces`;
    }
    if (complete(this.sentence)) {
      return `The sentence is complete, more words cannot be added`;
    }
    const id = near.predecessorAccountId();
    const previousId = this.authors.get(-1)?.id;
    near.log(previousId);
    if(id === previousId) {
      return "You cannot add two words in a row";
    }

    this.authors.push({id, word})

    this.sentence += ` ${word}`;

    return "Your word was added";
  }

  @view({})
  viewSentence() {
    return this.sentence;
  }

  @call({
    privateFunction: true
  })
  viewWords() {
    return this.authors.toArray();
  }
}

function complete(str) {
  return str.endsWith('.') || str.endsWith('?') || str.endsWith('!');
}