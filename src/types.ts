type StringRuleDetail = {
  minLength?: number;
  maxLength?: number;
  regex?: RegExp;
};

type NumericRuleDetail = {
  min?: number;
  max?: number;
  /** If set to `false`, checks if the value is a float. */
  isInt?: boolean;
};

interface DateRuleDetail {
  isBefore?: Date;
  isAfter?: Date;
}

type ExpectedTypeRule<T extends Value> = WithError<(
  T extends string ? StringRuleDetail
  : T extends number ? NumericRuleDetail
  : T extends Date ? DateRuleDetail
  : never
)>;

type Rules<T extends TestObject> = {
  [K in keyof T]?: ExpectedTypeRule<T[K]>[];
};

type WithError<T> = T & { message: string; };
type Value = string | number | boolean | Date;
type TestObject = Record<string, Value>;