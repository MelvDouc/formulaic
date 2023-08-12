export const isNumber = (value: unknown): value is number => {
  return typeof value === "number";
};

export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === "boolean";
};

export const isBigInt = (value: unknown): value is bigint => {
  return typeof value === "bigint";
};