import { ValidationTypes } from "$src/types/types.js";

export default abstract class Validator {
  public static readonly errorCheckersSymbol = Symbol();

  // @ts-ignore
  public abstract readonly [Validator.errorCheckersSymbol]: ValidationTypes.ErrorChecker[];
}