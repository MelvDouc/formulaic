import { isString } from "$src/utils.js";
import Validator from "$src/validation/Validator/Validator.js";
import { ValidationTypes } from "$src/types/types.js";

export default class StringValidator extends Validator {
  private static emailRegex = /^[^@]+@[^@.]+(\.[^@.]+)+$/;

  public readonly [Validator.errorCheckersSymbol]: ValidationTypes.ErrorChecker[] = [];

  constructor(invalidTypeError: string) {
    super();
    this[Validator.errorCheckersSymbol].push({
      error: invalidTypeError,
      validateFn: isString,
      continue: false
    });
  }

  public minLength(min: number, error: string) {
    this[Validator.errorCheckersSymbol].push({
      validateFn: (str: string) => str.length >= min,
      error,
      continue: true
    });
    return this;
  }

  public maxLength(max: number, error: string) {
    this[Validator.errorCheckersSymbol].push({
      validateFn: (str: string) => str.length <= max,
      error,
      continue: true
    });
    return this;
  }

  public email(error: string) {
    this[Validator.errorCheckersSymbol].push({
      validateFn: (str: string) => StringValidator.emailRegex.test(str),
      error,
      continue: true
    });
    return this;
  }
}
