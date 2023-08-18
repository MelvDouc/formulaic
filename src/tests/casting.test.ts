import { Schema } from "$src/casting/schema.js";
import { strictEqual } from "node:assert";
import { describe, it } from "node:test";

describe("String", () => {
  it("default value", () => {
    strictEqual(Schema.string("default").cast(void 0), "default");
  });

  it("number parsing", () => {
    const test = Schema.string().cast(123);
    strictEqual(test, "123");
  });

  it("nullish conversion", () => {
    strictEqual(Schema.string().cast(null), "");
    strictEqual(Schema.string().cast(void 0), "");
    strictEqual(Schema.string().cast(false), "false");
  });

  it("trimming", () => {
    strictEqual(Schema.string().trim().cast("   abc   "), "abc");
  });
});

describe("Number", () => {
  it("default value", () => {
    strictEqual(Schema.number(123).cast(void 0), 123);
  });

  it("string parsing", () => {
    strictEqual(Schema.number().cast("123"), 123);
  });

  it("falsy conversion", () => {
    strictEqual(Schema.number().cast(null), 0);
    strictEqual(Schema.number().cast(void 0), 0);
    strictEqual(Schema.number().cast(false), 0);
  });

  it("trimming", () => {
    strictEqual(Schema.number().round("round").cast(Math.PI), 3);
  });
});

describe("BigInt", () => {
  it("falsy conversion", () => {
    strictEqual(Schema.bigint().cast(null), 0n);
    strictEqual(Schema.bigint().cast(void 0), 0n);
    strictEqual(Schema.bigint().cast(false), 0n);
  });
});

describe("Object", () => {
  it("primitives", () => {
    const s = Schema.object({
      name: Schema.string(" abc ").trim(),
      age: Schema.number().round("floor"),
      isVerified: Schema.boolean(false).optional()
    });
    const test = s.cast({
      age: -Math.PI,
    });

    strictEqual(test.name, " abc ");
    strictEqual(test.age, -4);
    strictEqual("isVerified" in test, false);
  });

  it("nested", () => {
    const s = Schema.object({
      nested: Schema.object({
        value: Schema.null()
      })
    });
    const test = s.cast({});

    strictEqual(test.nested?.value, null);
  });

  it("partial", () => {
    const s = Schema.object({
      nested: Schema
        .object({
          value: Schema.null()
        })
        .partial()
    });
    const test = s.cast({});

    strictEqual(Object.keys(test.nested).length, 0);
  });
});