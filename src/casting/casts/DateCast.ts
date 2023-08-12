import { isNumber, isString } from "../../utils.js";
import Cast from "./Cast.js";

export default class DateCast extends Cast<Date> {
  private static toDate(value: unknown) {
    return (this.canBeConvertedToDate(value)) ? new Date(value) : new Date();
  }

  private static canBeConvertedToDate(value: unknown): value is number | string | Date {
    return isNumber(value) || isString(value) || value instanceof Date;
  }

  public readonly [Cast.sym] = new Set([DateCast.toDate]);

}