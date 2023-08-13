import { isBoolean } from "$src/utils.js";
import NullableValidator from "$src/validation/validators/NullableValidator.js";

export default class BooleanValidator extends NullableValidator {
  constructor(invalidTypeError: string) {
    super();
    this._errorCheckers.push({
      error: invalidTypeError,
      validateFn: isBoolean,
      continue: false
    });
  }
}