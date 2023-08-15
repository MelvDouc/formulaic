import { isBoolean } from "$src/utils.js";
import NullableValidator, { errorCheckersSymbol } from "$src/validation/validators/NullableValidator.js";

export default class BooleanValidator extends NullableValidator {
  constructor(invalidTypeError?: string) {
    super();
    this[errorCheckersSymbol].push({
      error: invalidTypeError,
      validateFn: isBoolean,
      continue: false
    });
  }
}