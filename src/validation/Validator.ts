import { ValidationTypes } from "$src/types/types.js";
import { optionalSymbol, nullableSymbol, errorCheckersSymbol } from "$src/validation/validators/symbols.js";

export default abstract class Validator {
  [errorCheckersSymbol]: ValidationTypes.ErrorChecker[] = [];
  [optionalSymbol] = false;

  optional(): this {
    this[optionalSymbol] = true;
    return this;
  }

  abstract getErrors<T>(value: T): ValidationTypes.ErrorRecord<any> | string[];
}

export { optionalSymbol, nullableSymbol, errorCheckersSymbol };