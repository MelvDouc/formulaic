import { ValidationTypes } from "$src/types/types.js";
import Validator from "$src/validation/Validator.js";

export default abstract class NullableValidator extends Validator {
  _nullable = false;

  nullable(): this {
    this._nullable = true;
    return this;
  }

  getErrors<T>(value: T): ValidationTypes.ErrorRecord<any> | string[] {
    const errors: string[] = [];

    if (
      this._nullable && value === null
      || this._optional && value === void 0
    )
      return errors;

    for (const { error, validateFn, continue: c } of this._errorCheckers) {
      if (!validateFn(value)) {
        errors.push(error);
        if (!c) break;
      }
    }

    return errors;
  }
}