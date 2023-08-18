import Cast from "$src/casting/Cast.js";
import { isNumber, isString } from "$src/utils.js";

export default class DateCast extends Cast<Date> {
  private static canBeConvertedToDate(value: unknown): value is number | string | Date {
    return isNumber(value) || isString(value) || value instanceof Date;
  }

  protected toType(value: unknown): Date {
    return (DateCast.canBeConvertedToDate(value)) ? new Date(value) : new Date();
  }
}