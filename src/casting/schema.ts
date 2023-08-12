import BigIntCast from "$src/casting/Cast/BigIntCast.js";
import BooleanCast from "$src/casting/Cast/BooleanCast.js";
import StringCast from "$src/casting/Cast/StringCast.js";
import NumberCast from "$src/casting/Cast/NumberCast.js";
import DateCast from "$src/casting/Cast/DateCast.js";
import { CastingTypes } from "$src/types/types.js";

const object = (schema: CastingTypes.Schema) => {
  const cast = (source: Record<string, any>) => {
    return Object.entries(schema).reduce((acc, [key, cast]) => {
      const value = cast.getValue(source[key]);
      if (value !== undefined)
        acc[key] = value;
      return acc;
    }, {} as CastingTypes.CastedObject<CastingTypes.Schema>);
  };
  return { cast };
};

export const Schema = {
  bigint: (defaultValue?: bigint) => new BigIntCast(defaultValue),
  boolean: (defaultValue?: boolean) => new BooleanCast(defaultValue),
  string: (defaultValue?: string) => new StringCast(defaultValue),
  number: (defaultValue?: number) => new NumberCast(defaultValue),
  date: (defaultValue?: Date) => new DateCast(defaultValue),
  null: () => new NumberCast(),
  object
} as const;