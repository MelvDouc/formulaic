import Cast from "$src/casting/Cast/Cast.js";

export default class BooleanCast extends Cast<boolean> {
  private static toBoolean(value: unknown) {
    return !!value;
  }

  public readonly [Cast.castFnSymbol] = new Set([BooleanCast.toBoolean]);
}
