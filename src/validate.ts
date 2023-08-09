import { Validation } from "./types/types.js";

/**
 * Extract a list of errors from an object for each property that doesn't match a list of given conditions.
 * @param source The object to extract errors from.
 * @param rules The conditions that must be met by the source object.
 * @returns An array of error messages.
 */
export function validate<T extends Validation.SourceObject>(source: T, rules: Validation.RulesRecord<T>): string[] {
  return Object.keys(rules).reduce<string[]>((acc, key) => {
    const value = source[key];
    const childRules = rules[key];

    switch (typeof value) {
      case "string":
        for (const error of stringErrors(value, childRules as Validation.Rule<string>[]))
          acc.push(error);
        break;
      case "number":
        for (const error of numberErrors(value, childRules as Validation.Rule<number>[]))
          acc.push(error);
        break;
      case "boolean":
        for (const error of booleanErrors(value, childRules as Validation.Rule<boolean>[]))
          acc.push(error);
        break;
      case "object":
        if (value instanceof Date)
          for (const error of dateErrors(value, childRules as Validation.Rule<Date>[]))
            acc.push(error);
        break;
    }

    return acc;
  }, []);
}

export function createValidator<T extends Validation.SourceObject>(rules: Validation.RulesRecord<T>) {
  return (source: T) => validate(source, rules);
}

function* stringErrors(value: string, childRules: Validation.Rule<string>[]): Generator<string> {
  for (const { maxLength, minLength, regex, message } of childRules)
    if (
      typeof minLength === "number" && value.length < minLength
      || typeof maxLength === "number" && value.length > maxLength
      || regex instanceof RegExp && !regex.test(value)
    )
      yield message;
}

function* numberErrors(value: number, childRules: Validation.Rule<number>[]): Generator<string> {
  for (const { max, min, isInt, message } of childRules)
    if (
      typeof min === "number" && value < min
      || typeof max === "number" && value > max
      || isInt === true && !Number.isInteger(value)
      || isInt === false && Number.isInteger(value)
    )
      yield message;
}

function* booleanErrors(value: boolean, childRules: Validation.Rule<boolean>[]): Generator<string> {
  for (const { mustBeTrue, message } of childRules)
    if (value !== mustBeTrue)
      yield message;
}

function* dateErrors(value: Date, childRules: Validation.Rule<Date>[]): Generator<string> {
  for (const { isAfter, isBefore, message } of childRules)
    if (
      isBefore !== undefined && value.getTime() > isBefore.getTime()
      || isAfter !== undefined && value.getTime() < isAfter.getTime()
    )
      yield message;
}