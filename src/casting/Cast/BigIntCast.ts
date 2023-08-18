import Cast from "$src/casting/Cast.js";
import { isBigInt, isBoolean, isNumber, isString } from "$src/utils.js";

export default class NumberCast extends Cast<bigint> {
  private static canBeConvertedToBigInt(value: unknown): value is number | bigint | string | boolean {
    return isNumber(value)
      || isBigInt(value)
      || isString(value)
      || isBoolean(value);
  }

  protected toType(value: unknown): bigint {
    try {
      return (NumberCast.canBeConvertedToBigInt(value))
        ? BigInt(value)
        : BigInt(0);
    } catch {
      return BigInt(0);
    }
  }
}