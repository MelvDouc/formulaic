import Cast from "$src/casting/Cast.js";
import { castFunctionsSymbol, cloneSymbol, defaultValueSymbol, optionalSymbol } from "$src/symbols.js";

export default class BooleanCast<O extends boolean> extends Cast<boolean, O> {
  constructor(defaultValue = false, optional = false) {
    super({
      castFunctions: [Boolean],
      defaultValue,
      optional
    });
  }

  public [cloneSymbol](): BooleanCast<O> {
    const clone = new BooleanCast(this[defaultValueSymbol], this[optionalSymbol]);
    clone[castFunctionsSymbol] = this[castFunctionsSymbol];
    return clone;
  }

  public optional(): BooleanCast<true> {
    const clone = new BooleanCast(this[defaultValueSymbol], true);
    clone[castFunctionsSymbol] = this[castFunctionsSymbol];
    return clone;
  }
}