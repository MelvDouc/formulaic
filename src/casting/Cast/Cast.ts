import { CastingTypes } from "$src/types/types.js";

export default abstract class Cast<T extends CastingTypes.Value> {
  public static readonly castFnSymbol = Symbol();

  // @ts-ignore
  public abstract readonly [Cast.castFnSymbol]: Set<CastingTypes.CastFn<T>>;
  protected readonly defaultValue?: T;

  constructor(defaultValue?: T) {
    this.defaultValue = defaultValue;
  }

  public getValue(sourceValue: T): T | undefined {
    if (sourceValue === undefined)
      return this.defaultValue;
    return [...this[Cast.castFnSymbol]].reduce((acc, fn) => fn(acc), sourceValue);
  }
}