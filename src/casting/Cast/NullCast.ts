import Cast from "$src/casting/Cast/Cast.js";

export default class NullCaster extends Cast<null> {
  private static toNull() {
    return null;
  }

  public readonly [Cast.castFnSymbol] = new Set([NullCaster.toNull]);
}