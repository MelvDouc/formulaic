import { Casting } from "./types/types.js";

export function cast<T extends {}, RR extends Casting.RulesRecord, CR = Casting.CastedRecord<RR>>(source: T, rules: RR): CR {
  const result = {} as any;

  for (const key in rules) {
    const rule = rules[key];

    if ("value" in rule) {
      result[key] = rule.value;
      continue;
    }

    const value = source[key as unknown as keyof T];

    switch (rule.type) {
      case String:
        result[key] = convertToString(value, rule as Casting.StringConstraint);
        break;
      case Number:
        result[key] = convertToNumber(value, rule as Casting.NumberConstraint);
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