import { NearContract, NearBindgen, view, call, near } from "near-sdk-js";

@NearBindgen
class MyContract extends NearContract{
  message: string;
  constructor() {
    super();
    this.message = "Hello world";
  }

  default() {
    return new MyContract();
  }

  @view
  getGreeting(): string {
    return this.message;
  }

  @call
  setGreeting({message}: {message: string}) {
    this.message = message;
    near.log(`Saving greeting to '${message}'`);
  }
}
