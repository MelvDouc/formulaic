type Cast<T, O> = import("$src/casting/Cast.js").default<T, O>;
type ObjectCast<O, P, S> = import("$src/casting/Cast/ObjectCast.js").default<O, P, S>;

declare global {
  type CastFunction<T> = (value: any) => T;
  type CastSchema = Record<string, Cast<unknown, boolean>>;

  type CastedValue<V, O extends boolean> = O extends true
    ? (V | undefined)
    : V;

  type RequiredCastedObject<S extends CastSchema> = {
    [K in keyof S]:
    S[K] extends ObjectCast<infer O, infer P, infer S>
    ? CastedValue<CastedObject<S, P>, O>
    : S[K] extends Cast<infer T, infer O>
    ? CastedValue<T, O>
    : never
  };

  type CastedObject<S extends CastSchema, P extends boolean> =
    P extends true
    ? Partial<RequiredCastedObject<S>>
    : RequiredCastedObject<S>;
}

export { };
