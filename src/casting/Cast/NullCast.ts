import Cast from "$src/casting/Cast.js";

export default class NullCast extends Cast<null> {
  protected toType(): null {
    return null;
  }

  constructor() {
    super(null);
  }
}