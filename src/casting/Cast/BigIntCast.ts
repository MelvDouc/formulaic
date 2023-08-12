import Cast from "$src/casting/Cast/Cast.js";
import { isBigInt, isBoolean, isNumber, isString } from "$src/utils.js";

export default class NumberCast extends Cast<bigint> {
  private static toBigInt(value: unknown): bigint {
    return (this.canBeConvertedToBigInt(value))
      ? BigInt(value)
      : BigInt(0);
  }

  private static canBeConvertedToBigInt(value: unknown): value is number | bigint | string | boolean {
    return isNumber(value)
      || isBigInt(value)
      || isString(value)
      || isBoolean(value);
  }

  public readonly [Cast.castFnSymbol] = new Set([NumberCast.toBigInt]);
}