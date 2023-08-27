import { isNumber } from "$src/utils.js";
import NullableValidator from "$src/validation/validators/NullableValidator.js";

export default class NumberValidator extends NullableValidator {
  constructor(invalidTypeError?: string) {
    super();
    this.addErrorChecker({
      error: invalidTypeError,
      validateFn: (value) => isNumber(value) && !isNaN(value),
      continue: false
    });
  }

  integer(error?: string): this {
    return this.addErrorChecker({
      error,
      validateFn: Number.isInteger,
      continue: true
    });
  }

  float(error?: string): this {
    return this.addErrorChecker({
      error,
      validateFn: (number: number) => !Number.isInteger(number),
      continue: true
    });
  }

  min(minValue: number, error?: string): this {
    return this.addErrorChecker({
      error,
      validateFn: (number: number) => number >= minValue,
      continue: true
    });
  }

  max(maxValue: number, error?: string): this {
    return this.addErrorChecker({
      error,
      validateFn: (number: number) => number <= maxValue,
      continue: true
    });
  }

  divisibleBy(divisor: number, error?: string): this {
    return this.addErrorChecker({
      error,
      validateFn: (number: number) => number % divisor === 0,
      continue: true
    });
  }
}