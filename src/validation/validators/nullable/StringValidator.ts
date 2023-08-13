import { isString } from "$src/utils.js";
import NullableValidator from "$src/validation/validators/NullableValidator.js";

export default class StringValidator extends NullableValidator {
  private static emailRegex = /^[^@]+@[^@.]+(\.[^@.]+)+$/;

  constructor(invalidTypeError: string) {
    super();
    this._errorCheckers.push({
      error: invalidTypeError,
      validateFn: isString,
      continue: false
    });
  }

  public minLength(min: number, error: string) {
    this._errorCheckers.push({
      validateFn: (str: string) => str.length >= min,
      error,
      continue: true
    });
    return this;
  }

  public maxLength(max: number, error: string) {
    this._errorCheckers.push({
      validateFn: (str: string) => str.length <= max,
      error,
      continue: true
    });
    return this;
  }

  public email(error: string) {
    this._errorCheckers.push({
      validateFn: (str: string) => StringValidator.emailRegex.test(str),
      error,
      continue: true
    });
    return this;
  }
}
