import Cast from "$src/casting/Cast/Cast.js";

export default class StringCast extends Cast<string> {
  private static toString(value: unknown) {
    return (typeof value === "string") ? value
      : (typeof value === "number" && isNaN(value) || value == null) ? ""
        : String(value);
  }

  private static trim(value: string) {
    return value.trim();
  }

  public readonly [Cast.castFnSymbol] = new Set([StringCast.toString]);

  public trim(): this {
    this[Cast.castFnSymbol].add(StringCast.trim);
    return this;
  }
}