import Cast from "$src/casting/Cast.js";
import { cloneSymbol, defaultValueSymbol, optionalSymbol, partialSymbol } from "$src/symbols.js";
import { isObject } from "$src/utils.js";

export default class ObjectCast<
  Optional extends boolean,
  P extends boolean,
  Schema extends Casting.Schema,
  Casted = Casting.Casted<Schema, P>,
> extends Cast<Casted, Optional> {
  private readonly schema: Schema;
  private readonly [partialSymbol]: boolean;

  constructor(schema: Schema, optional = false, partial = false) {
    super({
      castFunctions: [],
      defaultValue: {} as Casted,
      optional
    });
    this.schema = schema;
    this[partialSymbol] = partial;
  }

  private cloneSchema() {
    return Object.entries(this.schema).reduce((acc, [key, value]) => {
      acc[key as keyof Schema] = value[cloneSymbol]() as Schema[keyof Schema];
      return acc;
    }, {} as Schema);
  }

  public [cloneSymbol](): ObjectCast<Optional, P, Schema, Casted> {
    return new ObjectCast(this.cloneSchema(), this[optionalSymbol], this[partialSymbol]);
  }

  public optional(): ObjectCast<true, P, Schema, Casted> {
    return new ObjectCast(this.cloneSchema(), true, this[partialSymbol]);
  }

  public partial(): ObjectCast<Optional, true, Schema, Casted> {
    return new ObjectCast(this.cloneSchema(), this[optionalSymbol], true);
  }

  public cast(value: unknown) {
    const obj = isObject(value) ? value : this[defaultValueSymbol] as object;

    return Object.entries(this.schema).reduce((acc, [key, c]) => {
      if (!Object.hasOwn(obj, key) && (c[optionalSymbol] || this[partialSymbol])) {
        return acc;
      }

      acc[key as keyof Casted] = c.cast(obj[key as keyof object]) as Casted[keyof Casted];
      return acc;
    }, {} as Casted);
  }
}