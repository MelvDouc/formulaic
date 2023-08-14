import Cast from "$src/casting/Cast/Cast.js";
import { CastingTypes } from "$src/types/types.js";

export default class NumberCast extends Cast<number> {
  private static toNumber(value: unknown) {
    const number = (typeof value === "string") ? parseFloat(value) : Number(value);
    return (isNaN(number)) ? 0 : number;
  }

  public readonly [Cast.castFnSymbol] = new Set([NumberCast.toNumber]);

  public round(roundFn: CastingTypes.RoundFnName): this {
    this[Cast.castFnSymbol].add(Math[roundFn]);
    return this;
  }
}