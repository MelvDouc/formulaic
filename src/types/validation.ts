export type ErrorChecker = {
  validateFn: (str: string) => boolean;
  error: string;
  continue: boolean;
};

export type Validator = import("$src/validation/Validator/Validator.js").default;
type ObjectValidator<S extends Schema> = import("$src/validation/Validator/ObjectValidator.js").default<S>;
export type Schema = Record<string, Validator>;
export type ErrorRecord<S extends Schema> = {
  [K in keyof S]?: S[K] extends ObjectValidator<infer S2> ? ErrorRecord<S2> : string[]
};