import { Value, ValueConstructor } from "./values.js";

export type StringConstraint = {
  type: StringConstructor;
  trim?: boolean;
};

export type NumberConstraint = {
  type: NumberConstructor;
  convertNanTo?: number;
  roundFn?: typeof Math.ceil | typeof Math.floor | typeof Math.round | typeof Math.trunc;
};

export type TypedConstraint<T extends ValueConstructor> = T extends StringConstructor ? StringConstraint : NumberConstraint;
export type Rule<T extends Value | ValueConstructor> =
  T extends Value ? { value: T; }
  : T extends ValueConstructor ? TypedConstraint<T>
  : never;
export type RulesRecord = Record<string, Rule<Value | ValueConstructor>>;

export type CastedRecord<RR extends RulesRecord> = {
  [K in keyof RR]: RR[K] extends { value: Value; } ? RR[K]["value"]
  : RR[K] extends StringConstraint ? string
  : RR[K] extends NumberConstraint ? number
  : never
};