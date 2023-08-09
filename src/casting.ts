import { Casting } from "./types/types.js";

export function cast<T extends {}, RR extends Casting.RulesRecord, CR = Casting.CastedRecord<RR>>(source: T, rules: RR): CR {
  const result = {} as any;

  for (const key in rules) {
    const rule = rules[key];

    if ("value" in rule) {
      result[key] = rule.value;
      continue;
    }

    if (rule.ignoreIfAbsent && !(key in source))
      continue;

    const value = source[key as unknown as keyof T];

    switch (rule.type) {
      case "boolean":
        result[key] = !!value;
        break;
      case "string":
        result[key] = convertToString(value, rule);
        break;
      case "number":
        result[key] = convertToNumber(value, rule);
        break;
      case "bigint":
        result[key] = convertToBigInt(value, rule);
        break;
      case "date":
        result[key] = convertToDate(value, rule);
        break;
    }
  }

  return result as CR;
}

function convertToString(value: unknown, { trim }: Casting.StringConstraint): string {
  const cast = (typeof value === "string") ? value
    : (typeof value === "number" && isNaN(value) || value == null) ? ""
      : String(value);
  return (trim) ? cast.trim() : cast;
}

function convertToNumber(value: unknown, { convertNanTo, roundFn }: Casting.NumberConstraint): number {
  const cast = (roundFn) ? roundFn(Number(value)) : Number(value);
  return (isNaN(cast) && typeof convertNanTo === "number") ? convertNanTo : cast;
}

function convertToBigInt(value: unknown, { fallback }: Casting.BigIntConstraint): bigint {
  return canBeConvertedToBigInt(value) ? BigInt(value) : (fallback ?? 0n);
}

function convertToDate(value: unknown, { fallback }: Casting.DateConstraint): Date {
  const cast = (canBeConvertedToDate(value)) ? new Date(value) : new Date();
  return (isNaN(cast.getTime()) && fallback instanceof Date) ? fallback : cast;
}

function canBeConvertedToBigInt(value: unknown): value is number | bigint | string | boolean {
  return typeof value === "number"
    || typeof value === "bigint"
    || typeof value === "string"
    || typeof value === "boolean";
}

function canBeConvertedToDate(value: unknown): value is number | string | Date {
  return typeof value === "number"
    || typeof value === "string"
    || value instanceof Date;
}