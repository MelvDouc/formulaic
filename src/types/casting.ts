export type Value = string | boolean | number | Date;
export type RoundFnName = "ceil" | "floor" | "round" | "trunc";

export type Cast<T extends Value> = import("../casting/casts/Cast.js").default<T>;
export type Schema = Record<string, Cast<any>>;
export type CastedObject<S extends Schema> = {
  [K in keyof S]: S[K] extends Cast<infer T> ? T : never
};

export type CastFn<T> = (value: any) => T;