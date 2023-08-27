import Cast from "$src/casting/Cast.js";
import { castFunctionsSymbol, cloneSymbol, defaultValueSymbol, optionalSymbol } from "$src/symbols.js";

export default class NumberCast<O extends boolean> extends Cast<number, O> {
  private static toNumber(value: unknown): number {
    const number = (typeof value === "string") ? parseFloat(value) : Number(value);
    return isNaN(number) ? 0 : number;
  }
  constructor(defaultValue = 0, optional = false) {
    super({
      castFunctions: [NumberCast.toNumber],
      defaultValue,
      optional
    });
  }

  public [cloneSymbol](): NumberCast<O> {
    const clone = new NumberCast(this[defaultValueSymbol], this[optionalSymbol]);
    clone[castFunctionsSymbol] = this[castFunctionsSymbol];
    return clone;
  }

  public optional(): NumberCast<true> {
    const clone = new NumberCast(this[defaultValueSymbol], true);
    clone[castFunctionsSymbol] = this[castFunctionsSymbol];
    return clone;
  }

  public round(roundFn: "ceil" | "floor" | "round" | "trunc" = "trunc"): this {
    return this.addCastFn(Math[roundFn]);
  }
}