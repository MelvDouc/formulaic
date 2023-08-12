import { Casting } from "../types/types.js";
import Cast from "./casts/Cast.js";
import BooleanCast from "./casts/BooleanCast.js";
import StringCast from "./casts/StringCast.js";
import NumberCast from "./casts/NumberCast.js";

const object = (schema: Casting.Schema) => {
  const cast = (source: Record<string, any>) => {
    return Object.entries(schema).reduce((acc, [key, value]) => {
      acc[key] = [...value[Cast.sym]].reduce((acc, fn) => fn(acc), source[key]);
      return acc;
    }, {} as Casting.CastedObject<Casting.Schema>);
  };
  return { cast };
};

export const Schema = {
  boolean: () => new BooleanCast(),
  string: () => new StringCast(),
  number: () => new NumberCast(),
  object
} as const;