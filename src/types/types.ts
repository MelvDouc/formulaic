import type * as ValidationTypes from "./validation.js";
import { Value } from "./values.js";

type CastFn<T> = (value: any) => T;

export {
  CastFn,
  ValidationTypes,
  Value
};
