import Cast, { optionalSymbol, partialSymbol } from "$src/casting/Cast.js";
import { CastingTypes } from "$src/types/types.js";
import { isObject } from "$src/utils.js";

export default class ObjectCast<S extends CastingTypes.Schema> extends Cast<CastingTypes.CastedObject<S>> {
  private readonly schema: S;
  protected readonly [partialSymbol]: boolean;

  constructor(schema: S, defaultValue: CastingTypes.CastedObject<S>, partial = false) {
    super(defaultValue);
    this.schema = schema;
    this[partialSymbol] = partial;
  }

  protected toType(value: unknown): CastingTypes.CastedObject<S> {
    return (isObject(value))
      ? value as CastingTypes.CastedObject<S>
      : {} as CastingTypes.CastedObject<S>;
  }

  public partial(): ObjectCast<S> {
    return new ObjectCast(
      structuredClone(this.schema),
      this.defaultValue,
      true
    );
  }

  public cast(sourceValue: any) {
    const obj = sourceValue ? this.toType(sourceValue) : this.defaultValue;

    return Object.entries(this.schema).reduce((acc, [key, c]) => {
      if ((c[optionalSymbol] || this[partialSymbol]) && !Object.hasOwn(obj, key))
        return acc;

      acc[key as keyof typeof acc] = c.cast(obj[key]);
      return acc;
    }, {} as CastingTypes.CastedObject<S>);
  }
}