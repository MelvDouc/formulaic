import { errorCheckersSymbol, optionalSymbol } from "$src/symbols.js";

export default abstract class Validator {
  public [errorCheckersSymbol]: Validation.ErrorChecker[] = [];
  [optionalSymbol] = false;

  public optional(): Validator {
    const clone = this.clone();
    clone[optionalSymbol] = true;
    return clone;
  }

  public clone(): Validator {
    const clone = Reflect.construct(this.constructor, []);
    clone[errorCheckersSymbol] = [...this[errorCheckersSymbol]];
    clone[optionalSymbol] = this[optionalSymbol];
    return clone;
  }

  abstract getErrors<T>(value: T): string[];

  protected addErrorChecker(checker: Validation.ErrorChecker): this {
    this[errorCheckersSymbol].push(checker);
    return this;
  }
}