import { isBigInt } from "$src/utils.js";
import NullableValidator, { errorCheckersSymbol } from "$src/validation/validators/NullableValidator.js";

export default class NumberValidator extends NullableValidator {
  constructor(invalidTypeError?: string) {
    super();
    this[errorCheckersSymbol].push({
      error: invalidTypeError,
      validateFn: isBigInt,
      continue: false
    });
  }


  min(minValue: bigint, error?: string): this {
    this[errorCheckersSymbol].push({
      error,
      validateFn: (int: bigint) => int >= minValue,
      continue: true
    });
    return this;
  }

  max(maxValue: bigint, error?: string): this {
    this[errorCheckersSymbol].push({
      error,
      validateFn: (int: bigint) => int <= maxValue,
      continue: true
    });
    return this;
  }

  divisibleBy(divisor: bigint, error?: string): this {
    this[errorCheckersSymbol].push({
      error,
      validateFn: (int: bigint) => int % divisor === 0n,
      continue: true
    });
    return this;
  }
}