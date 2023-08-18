import Cast, { castFnSymbol } from "$src/casting/Cast.js";
import { CastingTypes } from "$src/types/types.js";

export default class NumberCast extends Cast<number> {
  protected toType(value: unknown): number {
    const number = (typeof value === "string") ? parseFloat(value) : Number(value);
    return (isNaN(number)) ? 0 : number;
  }

  public round(roundFn: CastingTypes.RoundFnName): this {
    this[castFnSymbol].add(Math[roundFn]);
    return this;
  }
}