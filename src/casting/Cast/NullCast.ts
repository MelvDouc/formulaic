import Cast from "$src/casting/Cast/Cast.js";

export default class NullCast extends Cast<null> {
  private static toNull() {
    return null;
  }

  public readonly [Cast.castFnSymbol] = new Set([NullCast.toNull]);

  constructor() {
    super(null);
  }
}