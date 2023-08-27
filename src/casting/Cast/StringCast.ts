import Cast from "$src/casting/Cast.js";
import { castFunctionsSymbol, cloneSymbol, defaultValueSymbol, optionalSymbol } from "$src/symbols.js";

export default class StringCast<O extends boolean> extends Cast<string, O> {
  private static convertToString(value: unknown): string {
    return (typeof value === "string") ? value
      : (value == null) ? ""
        : String(value);
  }

  constructor(defaultValue = "", optional = false) {
    super({
      castFunctions: [StringCast.convertToString],
      defaultValue,
      optional
    });
  }

  public [cloneSymbol](): StringCast<O> {
    const clone = new StringCast(this[defaultValueSymbol], this[optionalSymbol]);
    clone[castFunctionsSymbol] = this[castFunctionsSymbol];
    return clone;
  }

  public optional(): StringCast<true> {
    const clone = new StringCast(this[defaultValueSymbol], true);
    clone[castFunctionsSymbol] = this[castFunctionsSymbol];
    return clone;
  }

  public toUpperCase(): this {
    return this.addCastFn((value: string) => value.toLocaleUpperCase());
  }

  public toLowerCase(): this {
    return this.addCastFn((value: string) => value.toLocaleLowerCase());
  }

  public trim(): this {
    return this.addCastFn((value: string) => value.trim());
  }

  public substring(startIndex: number, endIndex?: number): this {
    return this.addCastFn((value: string) => value.slice(startIndex, endIndex));
  }
}