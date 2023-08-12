import Cast from "./Cast.js";

export default class BooleanCast extends Cast<boolean> {
  private static toBoolean(value: unknown) {
    return !!value;
  }

  public readonly [Cast.sym] = new Set([BooleanCast.toBoolean]);
}
