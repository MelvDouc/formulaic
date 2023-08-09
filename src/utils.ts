export function isObject(arg: unknown): arg is object {
  return typeof arg === "object" && arg !== null;
}