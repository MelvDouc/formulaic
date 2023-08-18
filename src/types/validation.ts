export type ErrorChecker = {
  validateFn: (str: any) => boolean;
  error?: string;
  continue: boolean;
};

export type Validator = import("$src/validation/Validator.js").default;
export type Schema = Record<string, Validator>;