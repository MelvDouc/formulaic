import { Value } from "$src/types/values.js";
import type Cast from "$src/casting/Cast/Cast.js";

export type RoundFnName = "ceil" | "floor" | "round" | "trunc";
export type CastFn<T extends Value> = (value: any) => T;
export { type Cast };

export type Schema = Record<string, Cast<any>>;
export type CastedObject<S extends Schema> = {
  [K in keyof S]: S[K] extends Cast<any>
  ? ReturnType<S[K]["cast"]>
  : never
};