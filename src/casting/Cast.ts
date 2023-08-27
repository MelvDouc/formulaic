import { castFunctionsSymbol, cloneSymbol, defaultValueSymbol, optionalSymbol, } from "$src/symbols.js";

export default abstract class Cast<T, Optional extends boolean = false> {
  public [defaultValueSymbol]: T;
  public [castFunctionsSymbol]: Casting.CastFn<T>[];
  public [optionalSymbol]: boolean;

  constructor({ castFunctions, defaultValue, optional }: {
    castFunctions: Casting.CastFn<T>[];
    defaultValue: T;
    optional: boolean;
  }) {
    this[castFunctionsSymbol] = castFunctions;
    this[defaultValueSymbol] = defaultValue;
    this[optionalSymbol] = optional;
  }

  public abstract [cloneSymbol](): Cast<T, Optional>;
  public abstract optional(): Cast<T, true>;

  protected addCastFn(castFn: Casting.CastFn<T>): this {
    this[castFunctionsSymbol].push(castFn);
    return this;
  }

  public cast(value: unknown): T {
    if (value === void 0)
      return this[defaultValueSymbol];

    return this[castFunctionsSymbol].reduce((acc, fn) => fn(acc), value as T);
  }
}