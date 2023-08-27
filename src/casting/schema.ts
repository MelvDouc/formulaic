import Cast from "$src/casting/Cast.js";
import BigIntCast from "$src/casting/Cast/BigIntCast.js";
import BooleanCast from "$src/casting/Cast/BooleanCast.js";
import DateCast from "$src/casting/Cast/DateCast.js";
import NullCast from "$src/casting/Cast/NullCast.js";
import NumberCast from "$src/casting/Cast/NumberCast.js";
import ObjectCast from "$src/casting/Cast/ObjectCast.js";
import StringCast from "$src/casting/Cast/StringCast.js";

export const Schema = {
  bigint: <O extends boolean = false>(defaultValue?: bigint) => new BigIntCast<O>(defaultValue),
  boolean: <O extends boolean = false>(defaultValue?: boolean) => new BooleanCast<O>(defaultValue),
  string: <O extends boolean = false>(defaultValue?: string) => new StringCast<O>(defaultValue),
  number: <O extends boolean = false>(defaultValue?: number) => new NumberCast<O>(defaultValue),
  date: <O extends boolean = false>(defaultValue?: Date) => new DateCast<O>(defaultValue),
  null: <O extends boolean = false>() => new NullCast<O>(),
  object: <
    O extends boolean = false,
    P extends boolean = false,
    Schema extends Record<string, Cast<unknown>> = {}
  >(schema: Schema) => new ObjectCast<O, P, Schema>(schema)
} as const;