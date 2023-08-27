import Cast from "$src/casting/Cast.js";
import { castFunctionsSymbol, cloneSymbol, defaultValueSymbol, optionalSymbol } from "$src/symbols.js";
import { isNumber, isString } from "$src/utils.js";

export default class DateCast<O extends boolean> extends Cast<Date, O> {
  private static canBeConvertedToDate(value: unknown): value is number | string | Date {
    return isNumber(value) || isString(value) || value instanceof Date;
  }

  private static toDate(value: unknown): Date {
    return (DateCast.canBeConvertedToDate(value)) ? new Date(value) : new Date();
  }

  constructor(defaultValue?: Date, optional = false) {
    super({
      castFunctions: [DateCast.toDate],
      defaultValue: defaultValue ?? new Date(),
      optional
    });
  }

  public [cloneSymbol](): DateCast<O> {
    const clone = new DateCast(this[defaultValueSymbol], this[optionalSymbol]);
    clone[castFunctionsSymbol] = this[castFunctionsSymbol];
    return clone;
  }

  public optional(): DateCast<true> {
    const clone = new DateCast(this[defaultValueSymbol], true);
    clone[castFunctionsSymbol] = this[castFunctionsSymbol];
    return clone;
  }

  public time(hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
    return this.addCastFn((value: Date) => {
      return new Date(value.getFullYear(), value.getMonth(), value.getDate(), hours, minutes, seconds, milliseconds);
    });
  }
}