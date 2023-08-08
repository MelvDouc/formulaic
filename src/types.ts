export interface StringCriteria {
  minLength?: number;
  maxLength?: number;
  regex?: RegExp;
};

export interface NumberCriteria {
  min?: number;
  max?: number;
  /** If set to `false`, checks if the value is a float. */
  isInt?: boolean;
};

export interface DateCriteria {
  isBefore?: Date;
  isAfter?: Date;
}

export type Criteria<T extends Value> = (
  T extends string ? StringCriteria
  : T extends number ? NumberCriteria
  : T extends Date ? DateCriteria
  : never
);

export type Rule<T extends Value> = Criteria<T> & {
  /** The error message returned. */
  message: string;
};

export type RulesRecord<T extends SourceObject> = {
  [K in keyof T]?: Rule<T[K]>[];
};

export type Value = string | number | boolean | Date;
export type SourceObject = Record<string, Value>;