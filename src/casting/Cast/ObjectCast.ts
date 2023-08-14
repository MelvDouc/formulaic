import Cast from "$src/casting/Cast/Cast.js";
import { CastingTypes } from "$src/types/types.js";

export default class ObjectCast<S extends CastingTypes.Schema> extends Cast<Record<string, any>> {
  public readonly [Cast.castFnSymbol] = new Set([]);
  private readonly schema: S;

  constructor(schema: S, defaultValue: Record<string, any>) {
    super(defaultValue);
    this.schema = schema;
  }

  public cast(source: Record<string, any>): CastingTypes.CastedObject<S> {
    if (!source)
      return (this.defaultValue || {}) as CastingTypes.CastedObject<S>;

    return Object.entries(this.schema).reduce((acc, [key, c]) => {
      const value = c.cast(source[key]);
      if (value !== void 0)
        acc[key as keyof S] = value as any;
      return acc;
    }, {} as CastingTypes.CastedObject<S>);
  }
}