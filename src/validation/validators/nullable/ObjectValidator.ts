import NullableValidator from "$src/validation/validators/NullableValidator.js";
import { ValidationTypes } from "$src/types/types.js";

export default class ObjectValidator<S extends ValidationTypes.Schema> extends NullableValidator {
  private readonly schema: S;

  constructor(schema: S, invalidTypeError: string) {
    super();
    this._errorCheckers.push({
      error: invalidTypeError,
      validateFn: (value) => typeof value === "object" && value !== null,
      continue: false
    });
    this.schema = schema;
  }

  getErrors<T>(source: T): ValidationTypes.ErrorRecord<S> {
    const acc = {} as ValidationTypes.ErrorRecord<S>;

    if (
      this._nullable && source === null
      || this._optional && source === void 0
    )
      return acc;

    return Object.entries(this.schema).reduce((acc, [key, validator]) => {
      const value = (source as Record<string, any>)[key];

      if (validator instanceof ObjectValidator) {
        const errors = validator.getErrors(value);
        if (Object.keys(errors).length)
          acc[key as keyof S] = errors as any;
        return acc;
      }

      const errors = validator.getErrors(value);

      if (errors.length)
        acc[key as keyof S] = errors as any;

      return acc;
    }, acc);
  }
}
