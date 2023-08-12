import Cast from "./Cast.js";

export default class StringCast extends Cast<string> {
  private static toString(value: unknown) {
    return (typeof value === "string") ? value
      : (typeof value === "number" && isNaN(value) || value == null) ? ""
        : String(value);
  }

  private static trim(value: string) {
    return value.trim();
  }

  public readonly [Cast.sym] = new Set([StringCast.toString]);

  public trim(): this {
    this[Cast.sym].add(StringCast.trim);
    return this;
  }
}