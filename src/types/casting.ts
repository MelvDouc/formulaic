export type Value = string | boolean | number | bigint | null | Date;
export type RoundFnName = "ceil" | "floor" | "round" | "trunc";

export type CastFn<T> = (value: any) => T;
export type Cast<T extends Value> = import("$src/casting/Cast/Cast.js").default<T>;

export type Schema = Record<string, Cast<any>>;
export type CastedObject<S extends Schema> = {
  [K in keyof S]: S[K] extends Cast<infer T> ? T : never
};
