import { ValidationTypes, Value } from "$src/types/types.js";

export default abstract class Validator<T extends Value> {
  public static readonly errorCheckersSymbol = Symbol();

  // @ts-ignore
  public abstract readonly [Validator.errorCheckersSymbol]: ValidationTypes.ErrorChecker[];

  constructor(invalidTypeError: string) {
    this[Validator.errorCheckersSymbol] = [
      {
        error: invalidTypeError,
        validateFn: this.isType,
        continue: false
      }
    ];
  }

  protected abstract isType(value: unknown): value is T;
}