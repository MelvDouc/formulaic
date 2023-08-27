import { isString } from "$src/utils.js";
import NullableValidator from "$src/validation/validators/NullableValidator.js";

export default class StringValidator extends NullableValidator {
  private static emailRegex = /^[^@]+@[^@.]+(\.[^@.]+)+$/;

  constructor(invalidTypeError?: string) {
    super();
    this.addErrorChecker({
      error: invalidTypeError,
      validateFn: isString,
      continue: false
    });
  }

  public minLength(min: number, error?: string) {
    return this.addErrorChecker({
      validateFn: (str: string) => str.length >= min,
      error,
      continue: true
    });
  }

  public maxLength(max: number, error?: string) {
    return this.addErrorChecker({
      validateFn: (str: string) => str.length <= max,
      error,
      continue: true
    });
  }

  public email(error?: string) {
    return this.addErrorChecker({
      validateFn: (str: string) => StringValidator.emailRegex.test(str),
      error,
      continue: true
    });
  }

  public regex(regex: RegExp, error?: string) {
    return this.addErrorChecker({
      validateFn: (str: string) => regex.test(str),
      error,
      continue: true
    });
  }
}
