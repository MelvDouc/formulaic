import { strictEqual } from "node:assert";
import { describe, it } from "node:test";
import { Schema } from "$src/casting/schema.js";

describe("Casting", () => {
  it("should work with forced casting", () => {
    const product = {
      price: "abc"
    };
    const productSchema = Schema.object({
      name: Schema.string("product 1"),
      price: Schema.number(1),
      description: Schema.object({
        isAvailable: Schema.boolean(false)
      })
    });
    const casted = productSchema.cast(product);

    strictEqual(casted.name, "product 1");
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