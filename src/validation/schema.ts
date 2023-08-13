import { ValidationTypes } from "$src/types/types.js";
import ObjectValidator from "$src/validation/Validator/ObjectValidator.js";
import StringValidator from "$src/validation/Validator/StringValidator.js";

export const Schema = {
  string: (invalidTypeError: string) => new StringValidator(invalidTypeError),
  object: <S extends ValidationTypes.Schema>(schema: S, invalidTypeError: string) => new ObjectValidator(schema, invalidTypeError)
};