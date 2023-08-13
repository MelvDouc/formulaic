import { ValidationTypes } from "$src/types/types.js";

export default abstract class Validator {
  _errorCheckers: ValidationTypes.ErrorChecker[] = [];
  _optional = false;

  optional(): this {
    this._optional = true;
    return this;
  }

  abstract getErrors<T>(value: T): ValidationTypes.ErrorRecord<any> | string[];
}