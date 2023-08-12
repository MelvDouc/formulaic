import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { Schema } from "$src/casting/schema.js";

describe("Casting", () => {
  it("should work with forced casting", () => {
    const product = {
      price: "abc"
    };
    const schema = Schema.object({
      name: Schema.string("product name"),
      price: Schema.number().convertNaN(0)
    });
    const casted = schema.cast(product);
    strictEqual(casted.name, "product name");
    strictEqual(casted.price, 0);
  });

  it("should implement string trimming", () => {
    const test = { name: " abc   " };
    const schema = Schema.object({
      name: Schema.string().trim()
    });
    const casted = schema.cast(test);
    strictEqual(casted.name, "abc");
  });
});