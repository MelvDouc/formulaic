import NullableValidator from "$src/validation/validators/NullableValidator.js";

export default class DateValidator extends NullableValidator {
  constructor(invalidTypeError?: string) {
    super();
    this.addErrorChecker({
      error: invalidTypeError,
      validateFn: (value) => value instanceof Date,
      continue: false
    });
  }

  valid(error?: string): this {
    return this.addErrorChecker({
      error,
      validateFn: (value: Date) => !isNaN(value.getTime()),
      continue: false
    });
  }

  before(date: Date, error?: string): this {
    return this.addErrorChecker({
      error,
      validateFn: (value: Date) => value.getTime() < date.getTime(),
      continue: true
    });
  }

  after(date: Date, error?: string): this {
    return this.addErrorChecker({
      error,
      validateFn: (value: Date) => value.getTime() > date.getTime(),
      continue: true
    });
  }
}