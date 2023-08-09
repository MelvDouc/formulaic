export type Value = string | number | boolean | Date;
export type SourceObject = Record<string, Value>;

export interface Constraint {
  /** The error message returned. */
  message: string;
}

export interface StringConstraint extends Constraint {
  minLength?: number;
  maxLength?: number;
  regex?: RegExp;
};

export interface NumberConstraint extends Constraint {
  min?: number;
  max?: number;
  /** If set to `false`, checks if the value is a float. */
  isInt?: boolean;
};

export interface BooleanConstraint extends Constraint {
  mustBeTrue: boolean;
}

export interface DateConstraint extends Constraint {
  isBefore?: Date;
  isAfter?: Date;
}

export type Rule<T extends Value> =
  T extends string ? StringConstraint
  : T extends number ? NumberConstraint
  : T extends boolean ? BooleanConstraint
  : T extends Date ? DateConstraint
  : never;

export type RulesRecord<T extends SourceObject> = {
  [K in keyof T]?: Rule<T[K]>[];
};