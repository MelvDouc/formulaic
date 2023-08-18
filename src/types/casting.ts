import type Cast from "$src/casting/Cast.js";
import { Value } from "$src/types/values.js";

export type ValueRecord = {
  [key: string]: Value | ValueRecord;
};

export type RoundFnName = "ceil" | "floor" | "round" | "trunc";
export type CastFn<T extends Value | ValueRecord> = (value: any) => T;
export { type Cast };

export type Schema = Record<string, Cast<any>>;

export type CastedObject<S extends Schema> = {
  [K in keyof S]: S[K] extends Cast<infer S2> ? S2 : never
};