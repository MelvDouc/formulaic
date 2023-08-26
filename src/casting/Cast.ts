import { castFnSymbol, cloneSymbol, optionalSymbol, partialSymbol } from "$src/symbols.js";
import { CastingTypes, Value } from "$src/types/types.js";

export default abstract class Cast<T extends Value | CastingTypes.ValueRecord> {
  protected readonly defaultValue: T;
  public readonly [castFnSymbol] = new Set<CastingTypes.CastFn<T>>();
  public [optionalSymbol] = false;

  constructor(defaultValue: T) {
    this.defaultValue = defaultValue;
    this[castFnSymbol].add(this.toType);
  }

  public [cloneSymbol](): Cast<T> {
    return Reflect.construct(this.constructor, [this.defaultValue]);
  }

  protected abstract toType(value: unknown): T;

  public cast(sourceValue: any): T {
    if (sourceValue !== void 0)
      return [...this[castFnSymbol]].reduce((acc, fn) => fn(acc), sourceValue);
    return this.defaultValue;
  }

  public optional(): this {
    this[optionalSymbol] = true;
    return this;
  }
}

export { castFnSymbol, cloneSymbol, optionalSymbol, partialSymbol };
