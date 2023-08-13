import { Value } from "$src/types/values.js";

export type ErrorChecker = {
  validateFn: (str: string) => boolean;
  error: string;
  continue: boolean;
};

export type Validator<T extends Value> = import("$src/validation/Validator/Validator.js").default<T>;
type ObjectValidator<S extends Schema> = import("$src/validation/Validator/ObjectValidator.js").default<S>;
export type Schema = Record<string, Validator<any>>;
export type ErrorRecord<S extends Schema> = {
  [K in keyof S]?: S[K] extends ObjectValidator<infer S2> ? ErrorRecord<S2> : string[]
};