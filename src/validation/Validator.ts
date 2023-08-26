import { cloneSymbol, errorCheckersSymbol, nullableSymbol, optionalSymbol } from "$src/symbols.js";
import { ValidationTypes } from "$src/types/types.js";

export default abstract class Validator {
  public [errorCheckersSymbol]: ValidationTypes.ErrorChecker[] = [];
  [optionalSymbol] = false;

  optional(): Validator {
    const clone = this[cloneSymbol]();
    clone[optionalSymbol] = true;
    return clone;
  }

  [cloneSymbol](): Validator {
    const clone = Reflect.construct(this.constructor, []);
    clone[errorCheckersSymbol] = [...this[errorCheckersSymbol]];
    clone[optionalSymbol] = this[optionalSymbol];
    return clone;
  }

  abstract getErrors<T>(value: T): string[];
}

export { cloneSymbol, errorCheckersSymbol, nullableSymbol, optionalSymbol };
