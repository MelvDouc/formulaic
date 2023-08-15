import { ValidationTypes } from "$src/types/types.js";
import BigIntValidator from "$src/validation/validators/nullable/BigIntValidator.js";
import BooleanValidator from "$src/validation/validators/nullable/BooleanValidator.js";
import DateValidator from "$src/validation/validators/nullable/DateValidator.js";
import NullValidator from "$src/validation/validators/NullValidator.js";
import NumberValidator from "$src/validation/validators/nullable/NumberValidator.js";
import ObjectValidator from "$src/validation/validators/nullable/ObjectValidator.js";
import StringValidator from "$src/validation/validators/nullable/StringValidator.js";

export const Schema = {
  bigint: (invalidTypeError?: string) => new BigIntValidator(invalidTypeError),
  boolean: (invalidTypeError?: string) => new BooleanValidator(invalidTypeError),
  date: (invalidTypeError?: string) => new DateValidator(invalidTypeError),
  null: (invalidTypeError?: string) => new NullValidator(invalidTypeError),
  number: (invalidTypeError?: string) => new NumberValidator(invalidTypeError),
  string: (invalidTypeError?: string) => new StringValidator(invalidTypeError),
  object: <S extends ValidationTypes.Schema>(schema: S, invalidTypeError?: string) => new ObjectValidator(schema, invalidTypeError)
};