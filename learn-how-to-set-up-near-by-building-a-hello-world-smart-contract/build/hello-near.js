function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object.keys(descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;
  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }
  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);
  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }
  if (desc.initializer === void 0) {
    Object.defineProperty(target, property, desc);
    desc = null;
  }
  return desc;
}

function call(target, key, descriptor) {}
function view(target, key, descriptor) {}
function NearBindgen(target) {
  return class extends target {
    static _init() {
      // @ts-ignore
      let args = target.deserializeArgs();
      let ret = new target(args);
      // @ts-ignore
      ret.init();
      // @ts-ignore
      ret.serialize();
      return ret;
    }
    static _get() {
      let ret = Object.create(target.prototype);
      return ret;
    }
  };
}

const U64_MAX = 2n ** 64n - 1n;
const EVICTED_REGISTER = U64_MAX - 1n;
function log(...params) {
  env.log(`${params.map(x => x === undefined ? 'undefined' : x) // Stringify undefined
  .map(x => typeof x === 'object' ? JSON.stringify(x) : x) // Convert Objects to strings
  .join(' ')}` // Convert to string
  );
}
function storageRead(key) {
  let ret = env.storage_read(key, 0);
  if (ret === 1n) {
    return env.read_register(0);
  } else {
    return null;
  }
}
function input() {
  env.input(0);
  return env.read_register(0);
}
var PromiseResult;
(function (PromiseResult) {
  PromiseResult[PromiseResult["NotReady"] = 0] = "NotReady";
  PromiseResult[PromiseResult["Successful"] = 1] = "Successful";
  PromiseResult[PromiseResult["Failed"] = 2] = "Failed";
})(PromiseResult || (PromiseResult = {}));
function storageWrite(key, value) {
  let exist = env.storage_write(key, value, EVICTED_REGISTER);
  if (exist === 1n) {
    return true;
  }
  return false;
}

class NearContract {
  deserialize() {
    const rawState = storageRead("STATE");
    if (rawState) {
      const state = JSON.parse(rawState);
      // reconstruction of the contract class object from plain object
      let c = this.default();
      Object.assign(this, state);
      for (const item in c) {
        if (c[item].constructor?.deserialize !== undefined) {
          this[item] = c[item].constructor.deserialize(this[item]);
        }
      }
    } else {
      throw new Error("Contract state is empty");
    }
  }
  serialize() {
    storageWrite("STATE", JSON.stringify(this));
  }
  static deserializeArgs() {
    let args = input();
    return JSON.parse(args || "{}");
  }
  static serializeReturn(ret) {
    return JSON.stringify(ret);
  }
  init() {}
}

var _class, _class2;
let MyContract = NearBindgen(_class = (_class2 = class MyContract extends NearContract {
  constructor() {
    super();
    this.message = "Hello world";
  }
  default() {
    return new MyContract();
  }
  getGreeting() {
    return this.message;
  }
  setGreeting({
    message
  }) {
    this.message = message;
    log(`Saving greeting to '${message}'`);
  }
}, (_applyDecoratedDescriptor(_class2.prototype, "getGreeting", [view], Object.getOwnPropertyDescriptor(_class2.prototype, "getGreeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setGreeting", [call], Object.getOwnPropertyDescriptor(_class2.prototype, "setGreeting"), _class2.prototype)), _class2)) || _class;
function init() {
  MyContract._init();
}
function setGreeting() {
  let _contract = MyContract._get();
  _contract.deserialize();
  let args = _contract.constructor.deserializeArgs();
  let ret = _contract.setGreeting(args);
  _contract.serialize();
  if (ret !== undefined) env.value_return(_contract.constructor.serializeReturn(ret));
}
function getGreeting() {
  let _contract = MyContract._get();
  _contract.deserialize();
  let args = _contract.constructor.deserializeArgs();
  let ret = _contract.getGreeting(args);
  if (ret !== undefined) env.value_return(_contract.constructor.serializeReturn(ret));
}

export { getGreeting, init, setGreeting };
//# sourceMappingURL=hello-near.js.map
