import Validator, { errorCheckersSymbol, optionalSymbol } from "$src/validation/Validator.js";

export default class NullValidator extends Validator {
  constructor(invalidTypeError?: string) {
    super();
    this[errorCheckersSymbol].push({
      error: invalidTypeError,
      validateFn: (value) => value === null,
      continue: false
    });
  }

  getErrors<T>(value: T): string[] {
    const errors: string[] = [];

    if (this[optionalSymbol] && value === void 0)
      return errors;

    for (const { error, validateFn, continue: c } of this[errorCheckersSymbol]) {
      if (!validateFn(value) && error) {
        errors.push(error);
        if (!c) break;
      }
    }

    return errors;
  }
}