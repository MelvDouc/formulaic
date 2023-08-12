import Cast from "$src/casting/Cast/Cast.js";
import { CastingTypes } from "$src/types/types.js";

export default class NumberCast extends Cast<number> {
  private static toNumber(value: unknown) {
    return parseFloat(value as any);
  }

  public readonly [Cast.castFnSymbol] = new Set([NumberCast.toNumber]);

  public convertNaN(fallback: number): this {
    this[Cast.castFnSymbol].add((v: number) => isNaN(v) ? fallback : v);
    return this;
  }

  public round(roundFn: CastingTypes.RoundFnName): this {
    this[Cast.castFnSymbol].add(Math[roundFn]);
    return this;
  }
}