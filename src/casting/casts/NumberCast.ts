import Cast from "./Cast.js";
import { Casting } from "../../types/types.js";

export default class NumberCast extends Cast<number> {
  private static toNumber(value: unknown) {
    return parseFloat(value as any);
  }

  public readonly [Cast.sym] = new Set([NumberCast.toNumber]);

  public convertNaN(fallback: number): this {
    this[Cast.sym].add((v: number) => isNaN(v) ? fallback : v);
    return this;
  }

  public round(roundFn: Casting.RoundFnName): this {
    this[Cast.sym].add(Math[roundFn]);
    return this;
  }
}