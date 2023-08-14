import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { Schema } from "$src/validation/schema.js";

const testObject = {
  isVerified: false,
  age: 35,
  bigInteger: BigInt(1e15),
  email: "invalid@email@com",
  birthDate: new Date("2100-01-01"),
  nested: {
    property: null
  }
};

describe("primitives", () => {
  it("boolean", () => {
    const schema = Schema.object({
      isVerified: Schema.boolean("err1"),
      isVerified2: Schema.boolean("err2")
    }, "");
    const errors = schema.getErrors(testObject);

    strictEqual(errors.isVerified, void 0);
    strictEqual(errors.isVerified2?.at(0), "err2");
  });

  it("number", () => {
    const schema = Schema.object({
      age: Schema.number("").min(0, "").max(testObject.age - 1, "err1")
    }, "");
    const errors = schema.getErrors(testObject);

    strictEqual(errors.age?.at(0), "err1");
  });

  it("bigint", () => {
    const schema = Schema.object({
      bigInteger: Schema.bigint("").divisibleBy(BigInt(1e15 - 1), "err1")
    }, "");
    const errors = schema.getErrors(testObject);

    strictEqual(errors.bigInteger?.at(0), "err1");
  });

  it("date", () => {
    const schema = Schema.object({
      birthDate: Schema.date("").before(new Date(), "err1")
    }, "");
    const errors = schema.getErrors(testObject);

    strictEqual(errors.birthDate?.at(0), "err1");
  });

  it("string", () => {
    const schema = Schema.object({
      email: Schema.string("").email("err1")
    }, "");
    const errors = schema.getErrors(testObject);

    strictEqual(errors.email?.at(0), "err1");
  });
});

describe("object", () => {
  it("nesting", () => {
    const schema = Schema.object({
      nested: Schema.object({
        property: Schema.null("")
      }, "")
    }, "");
    const errors = schema.getErrors(testObject);

    strictEqual(errors.nested?.property, void 0);
  });
});