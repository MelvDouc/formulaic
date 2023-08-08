export default function validate<T extends TestObject>(source: T, rules: Rules<T>) {
  return Object.keys(rules).reduce<string[]>((acc, key) => {
    const value = source[key];
    const childRules = rules[key];

    switch (typeof value) {
      case "string":
        for (const error of stringErrors(value, childRules as WithError<StringRuleDetail>[]))
          acc.push(error);
        break;
      case "number":
        for (const error of numberErrors(value, childRules as WithError<NumericRuleDetail>[]))
          acc.push(error);
        break;
      case "object":
        if (value instanceof Date)
          for (const error of dateErrors(value, childRules as WithError<DateRuleDetail>[]))
            acc.push(error);
        break;
    }

    return acc;
  }, []);
}

function* stringErrors(value: string, childRules: WithError<StringRuleDetail>[]): Generator<string> {
  for (const { maxLength, minLength, regex, message } of childRules)
    if (
      typeof minLength === "number" && value.length < minLength
      || typeof maxLength === "number" && value.length > maxLength
      || regex instanceof RegExp && !regex.test(value)
    )
      yield message;
}

function* numberErrors(value: number, childRules: WithError<NumericRuleDetail>[]): Generator<string> {
  for (const { max, min, isInt, message } of childRules)
    if (
      typeof min === "number" && value < min
      || typeof max === "number" && value > max
      || isInt === true && !Number.isInteger(value)
      || isInt === false && Number.isInteger(value)
    )
      yield message;
}

function* dateErrors(value: Date, childRules: WithError<DateRuleDetail>[]): Generator<string> {
  for (const { isAfter, isBefore, message } of childRules)
    if (
      isBefore !== undefined && value.getTime() > isBefore.getTime()
      || isAfter !== undefined && value.getTime() < isAfter.getTime()
    )
      yield message;
}