import { Value } from "./values.js";

type PrimitiveTypes<T> =
  T extends BooleanConstraint ? boolean
  : T extends StringConstraint ? string
  : T extends NumberConstraint ? number
  : T extends BigIntConstraint ? bigint
  : T extends DateConstraint ? Date
  : never;

export interface BooleanConstraint {
  type: "boolean";
};

export interface StringConstraint {
  type: "string";
  trim?: boolean;
};

export interface NumberConstraint {
  type: "number";
  convertNanTo?: number;
  roundFn?: typeof Math.ceil | typeof Math.floor | typeof Math.round | typeof Math.trunc;
};

export interface BigIntConstraint {
  type: "bigint";
  /** What to use if the value cannot be converted to `bigint`. Defaults to `0n`. */
  fallback?: bigint;
};

export type DateConstraint = {
  type: "date";
  fallback?: Date;
};

type Constraint = BooleanConstraint | NumberConstraint | StringConstraint | BigIntConstraint | DateConstraint;
export type TypedConstraint = Constraint & { ignoreIfAbsent?: boolean; };

export type Rule = { value: Value; } | TypedConstraint;
export type RulesRecord = Record<string, Rule>;

export type CastedRecord<RR extends RulesRecord> = {
  [K in keyof RR]: RR[K] extends { value: Value; } ? RR[K]["value"]
  : RR[K] extends TypedConstraint ? (RR[K]["ignoreIfAbsent"] extends true ? never : PrimitiveTypes<RR[K]>)
  : never
};