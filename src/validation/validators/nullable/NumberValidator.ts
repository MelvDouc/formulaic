import { isNumber } from "$src/utils.js";
import NullableValidator from "$src/validation/validators/NullableValidator.js";

export default class NumberValidator extends NullableValidator {
  constructor(invalidTypeError: string) {
    super();
    this._errorCheckers.push({
      error: invalidTypeError,
      validateFn: isNumber,
      continue: false
    });
  }

  notNaN(error: string): this {
    this._errorCheckers.push({
      error,
      validateFn: (number: number) => !isNaN(number),
      continue: true
    });
    return this;
  }

  integer(error: string): this {
    this._errorCheckers.push({
      error,
      validateFn: Number.isInteger,
      continue: true
    });
    return this;
  }

  float(error: string): this {
    this._errorCheckers.push({
      error,
      validateFn: (number: number) => !Number.isInteger(number),
      continue: true
    });
    return this;
  }

  min(minValue: number, error: string): this {
    this._errorCheckers.push({
      error,
      validateFn: (number: number) => number >= minValue,
      continue: true
    });
    return this;
  }

  max(maxValue: number, error: string): this {
    this._errorCheckers.push({
      error,
      validateFn: (number: number) => number <= maxValue,
      continue: true
    });
    return this;
  }

  divisibleBy(divisor: number, error: string): this {
    this._errorCheckers.push({
      error,
      validateFn: (number: number) => number % divisor === 0,
      continue: true
    });
    return this;
  }
}