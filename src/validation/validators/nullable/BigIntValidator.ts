import { isBigInt } from "$src/utils.js";
import NullableValidator from "$src/validation/validators/NullableValidator.js";

export default class NumberValidator extends NullableValidator {
  constructor(invalidTypeError?: string) {
    super();
    this.addErrorChecker({
      error: invalidTypeError,
      validateFn: isBigInt,
      continue: false
    });
  }

  min(minValue: bigint, error?: string): this {
    return this.addErrorChecker({
      error,
      validateFn: (int: bigint) => int >= minValue,
      continue: true
    });
  }

  max(maxValue: bigint, error?: string): this {
    return this.addErrorChecker({
      error,
      validateFn: (int: bigint) => int <= maxValue,
      continue: true
    });
  }

  divisibleBy(divisor: bigint, error?: string): this {
    return this.addErrorChecker({
      error,
      validateFn: (int: bigint) => int % divisor === 0n,
      continue: true
    });
  }
}