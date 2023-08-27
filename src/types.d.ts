type Cast<T, O> = import("$src/casting/Cast.js").default<T, O>;
type ObjectCast<O, P, S> = import("$src/casting/Cast/ObjectCast.js").default<O, P, S>;

declare global {
  namespace Casting {
    type CastFn<T> = (value: any) => T;
    type Schema = Record<string, Cast<unknown, boolean>>;

    type Value<V, O extends boolean> = O extends true
      ? (V | undefined)
      : V;

    type RequiredCasted<S extends Schema> = {
      [K in keyof S]:
      S[K] extends ObjectCast<infer O, infer P, infer S>
      ? Value<Casted<S, P>, O>
      : S[K] extends Cast<infer T, infer O>
      ? Value<T, O>
      : never
    };

    type Casted<S extends Schema, P extends boolean> = P extends true
      ? Partial<RequiredCasted<S>>
      : RequiredCasted<S>;
  }

  namespace Validation {
    type ErrorChecker = {
      validateFn: (str: any) => boolean;
      error?: string;
      continue: boolean;
    };

    type Schema = Record<string, import("$src/validation/Validator.js").default>;
  }
}

export { };
