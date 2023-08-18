import Validator, {
  errorCheckersSymbol,
  nullableSymbol,
  optionalSymbol
} from "$src/validation/Validator.js";

export default abstract class NullableValidator extends Validator {
  [nullableSymbol] = false;

  nullable(): this {
    this[nullableSymbol] = true;
    return this;
  }

  getErrors<T>(value: T): string[] {
    const errors: string[] = [];

    if (
      this[nullableSymbol] && value === null
      || this[optionalSymbol] && value === void 0
    )
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

export { errorCheckersSymbol, nullableSymbol, optionalSymbol };