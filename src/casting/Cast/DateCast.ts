import Cast from "$src/casting/Cast/Cast.js";
import { isNumber, isString } from "$src/utils.js";

export default class DateCast extends Cast<Date> {
  private static toDate(value: unknown) {
    return (this.canBeConvertedToDate(value)) ? new Date(value) : new Date();
  }

  private static canBeConvertedToDate(value: unknown): value is number | string | Date {
    return isNumber(value) || isString(value) || value instanceof Date;
  }

  public readonly [Cast.castFnSymbol] = new Set([DateCast.toDate]);
}