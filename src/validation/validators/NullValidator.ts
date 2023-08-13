import Validator from "$src/validation/Validator.js";

export default class NullValidator extends Validator {
  constructor(invalidTypeError: string) {
    super();
    this._errorCheckers.push({
      error: invalidTypeError,
      validateFn: (value) => value === null,
      continue: false
    });
  }

  getErrors<T>(value: T): string[] {
    const errors: string[] = [];

    if (this._optional && value === void 0)
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