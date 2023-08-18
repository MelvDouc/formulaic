import Cast from "$src/casting/Cast.js";

export default class BooleanCast extends Cast<boolean> {
  protected toType(value: unknown): boolean {
    return !!value;
  }
}