import Cast, { castFnSymbol } from "$src/casting/Cast.js";

export default class StringCast extends Cast<string> {
  protected toType(value: unknown): string {
    return (typeof value === "string") ? value
      : (typeof value === "number" && isNaN(value) || value == null) ? ""
        : String(value);
  }

  public trim(): this {
    this[castFnSymbol].add((value: string) => value.trim());
    return this;
  }
}