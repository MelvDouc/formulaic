import { cloneSymbol, partialSymbol } from "$src/symbols.js";
import { ValidationTypes } from "$src/types/types.js";
import { isObject } from "$src/utils.js";
import NullableValidator, {
  errorCheckersSymbol,
  nullableSymbol,
  optionalSymbol
} from "$src/validation/validators/NullableValidator.js";

export default class ObjectValidator<S extends ValidationTypes.Schema> extends NullableValidator {
  private readonly schema: S;
  public readonly [partialSymbol]: boolean;

  constructor(schema: S, invalidTypeError?: string, partial?: boolean) {
    super();
    this[errorCheckersSymbol].push({
      error: invalidTypeError,
      validateFn: isObject,
      continue: false
    });
    this.schema = schema;
    this[partialSymbol] = !!partial;
  }

  private cloneSchema(): S {
    return Object.entries(this.schema).reduce((acc, [key, value]) => {
      acc[key as keyof S] = value[cloneSymbol]() as S[keyof S];
      return acc;
    }, {} as S);
  }

  [cloneSymbol]() {
    const clone = new ObjectValidator(this.cloneSchema(), void 0, this[partialSymbol]);
    clone[errorCheckersSymbol] = [...this[errorCheckersSymbol]];
    clone[optionalSymbol] = this[optionalSymbol];
    return clone;
  }

  partial() {
    const clone = new ObjectValidator(this.cloneSchema(), void 0, true);
    clone[errorCheckersSymbol] = [...this[errorCheckersSymbol]];
    clone[optionalSymbol] = this[optionalSymbol];
    return clone;
  }

  getErrors<T>(source: T): string[] {
    const errors = super.getErrors(source);

    if (!errors.length) {
      Object.entries(this.schema).forEach(([key, validator]) => {
        if (
          !Object.hasOwn(source as object, key)
          && (this[partialSymbol] || validator[optionalSymbol])
        )
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
