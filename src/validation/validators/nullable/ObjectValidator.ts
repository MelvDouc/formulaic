import { ValidationTypes } from "$src/types/types.js";
import { isObject } from "$src/utils.js";
import NullableValidator, {
  errorCheckersSymbol,
  nullableSymbol,
  optionalSymbol
} from "$src/validation/validators/NullableValidator.js";

export default class ObjectValidator<S extends ValidationTypes.Schema> extends NullableValidator {
  private readonly schema: S;

  constructor(schema: S, invalidTypeError?: string) {
    super();
    this[errorCheckersSymbol].push({
      error: invalidTypeError,
      validateFn: isObject,
      continue: false
    });
    this.schema = schema;
  }

  getErrors<T>(source: T): string[] {
    const errors = super.getErrors(source);

    if (!errors.length) {
      Object.entries(this.schema).forEach(([key, validator]) => {
        if (validator[optionalSymbol] && !Object.hasOwn(source as object, key))
          return;

        const value = (source as Record<string, any>)[key];

        if ((validator as NullableValidator)[nullableSymbol] && value === null)
          return;

        errors.push(...validator.getErrors(value));
      });
    }

    return errors;
  }
}
