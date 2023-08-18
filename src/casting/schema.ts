import BigIntCast from "$src/casting/Cast/BigIntCast.js";
import BooleanCast from "$src/casting/Cast/BooleanCast.js";
import DateCast from "$src/casting/Cast/DateCast.js";
import NullCast from "$src/casting/Cast/NullCast.js";
import NumberCast from "$src/casting/Cast/NumberCast.js";
import ObjectCast from "$src/casting/Cast/ObjectCast.js";
import StringCast from "$src/casting/Cast/StringCast.js";
import { CastingTypes } from "$src/types/types.js";


export const Schema = {
  bigint: (defaultValue = 0n) => new BigIntCast(defaultValue),
  boolean: (defaultValue = false) => new BooleanCast(defaultValue),
  string: (defaultValue = "") => new StringCast(defaultValue),
  number: (defaultValue = 0) => new NumberCast(defaultValue),
  date: (defaultValue = new Date()) => new DateCast(defaultValue),
  null: () => new NullCast(),
  object: <S extends CastingTypes.Schema>(schema: S) => new ObjectCast<S>(schema, {} as CastingTypes.CastedObject<S>)
} as const;