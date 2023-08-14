import { CastingTypes, Value } from "$src/types/types.js";

export default abstract class Cast<T extends Value> {
  public static readonly castFnSymbol = Symbol();

  // @ts-ignore
  public abstract readonly [Cast.castFnSymbol]: Set<CastingTypes.CastFn<T>>;
  protected readonly defaultValue: T;

  constructor(defaultValue: T) {
    this.defaultValue = defaultValue;
  }

  public cast(sourceValue: any): T {
    if (sourceValue !== void 0)
      return [...this[Cast.castFnSymbol]].reduce((acc, fn) => fn(acc), sourceValue);
    return this.defaultValue;
  }
}