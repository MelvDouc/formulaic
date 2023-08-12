import { Casting } from "../../types/types.js";

export default abstract class Caster<T extends Casting.Value> {
  public static readonly sym = Symbol();

  // @ts-ignore
  public abstract readonly [Caster.sym]: Set<Casting.CastFn<T>>;
}