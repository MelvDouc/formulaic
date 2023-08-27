import Cast from "$src/casting/Cast.js";
import { cloneSymbol, optionalSymbol } from "$src/symbols.js";

export default class NullCast<O extends boolean> extends Cast<null, O> {
  constructor(optional = false) {
    super({
      castFunctions: [() => null],
      defaultValue: null,
      optional
    });
  }

  public [cloneSymbol](): NullCast<O> {
    return new NullCast(this[optionalSymbol]);
  }

  public optional(): NullCast<true> {
    return new NullCast(true);
  }
}