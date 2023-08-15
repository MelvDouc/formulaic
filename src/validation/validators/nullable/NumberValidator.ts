import { isNumber } from "$src/utils.js";
import NullableValidator, { errorCheckersSymbol } from "$src/validation/validators/NullableValidator.js";

export default class NumberValidator extends NullableValidator {
  constructor(invalidTypeError?: string) {
    super();
    this[errorCheckersSymbol].push({
      error: invalidTypeError,
      validateFn: (value) => isNumber(value) && !isNaN(value),
      continue: false
    });
  }

  integer(error?: string): this {
    this[errorCheckersSymbol].push({
      error,
      validateFn: Number.isInteger,
      continue: true
    });
    return this;
  }

  float(error?: string): this {
    this[errorCheckersSymbol].push({
      error,
      validateFn: (number: number) => !Number.isInteger(number),
      continue: true
    });
    return this;
  }

  min(minValue: number, error?: string): this {
    this[errorCheckersSymbol].push({
      error,
      validateFn: (number: number) => number >= minValue,
      continue: true
    });
    return this;
  }

  max(maxValue: number, error?: string): this {
    this[errorCheckersSymbol].push({
      error,
      validateFn: (number: number) => number <= maxValue,
      continue: true
    });
    return this;
  }

  divisibleBy(divisor: number, error?: string): this {
    this[errorCheckersSymbol].push({
      error,
      validateFn: (number: number) => number % divisor === 0,
      continue: true
    });
    return this;
  }
}