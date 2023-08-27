import Cast from "$src/casting/Cast.js";
import { castFunctionsSymbol, cloneSymbol, defaultValueSymbol, optionalSymbol } from "$src/symbols.js";
import { isBigInt, isBoolean, isNumber, isString } from "$src/utils.js";

export default class BigIntCast<O extends boolean = false> extends Cast<bigint, O> {
  private static readonly falsyDefault = 0n;

  private static canBeConvertedToBigInt(value: unknown): value is number | bigint | string | boolean {
    return isNumber(value)
      || isBigInt(value)
      || isString(value)
      || isBoolean(value);
  }

  private static toBigInt(value: unknown) {
    try {
      if (BigIntCast.canBeConvertedToBigInt(value))
        return BigInt(value);
      return BigIntCast.falsyDefault;
    } catch {
      return BigIntCast.falsyDefault;
    }
  }

  constructor(defaultValue = BigIntCast.falsyDefault, optional = false) {
    super({
      castFunctions: [BigIntCast.toBigInt],
      defaultValue,
      optional
    });
  }

  public [cloneSymbol](): BigIntCast<O> {
    const clone = new BigIntCast(this[defaultValueSymbol], this[optionalSymbol]);
    clone[castFunctionsSymbol] = this[castFunctionsSymbol];
    return clone;
  }

  public optional(): BigIntCast<true> {
    const clone = new BigIntCast(this[defaultValueSymbol], true);
    clone[castFunctionsSymbol] = this[castFunctionsSymbol];
    return clone;
  }
}