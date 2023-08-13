import NullableValidator from "$src/validation/validators/NullableValidator.js";

export default class DateValidator extends NullableValidator {
  constructor(invalidTypeError: string) {
    super();
    this._errorCheckers.push({
      error: invalidTypeError,
      validateFn: (value) => value instanceof Date,
      continue: false
    });
  }

  valid(error: string): this {
    this._errorCheckers.push({
      error,
      validateFn: (value: Date) => !isNaN(value.getTime()),
      continue: false
    });
    return this;
  }

  before(date: Date, error: string): this {
    this._errorCheckers.push({
      error,
      validateFn: (value: Date) => value.getTime() < date.getTime(),
      continue: true
    });
    return this;
  }

  after(date: Date, error: string): this {
    this._errorCheckers.push({
      error,
      validateFn: (value: Date) => value.getTime() > date.getTime(),
      continue: true
    });
    return this;
  }
}