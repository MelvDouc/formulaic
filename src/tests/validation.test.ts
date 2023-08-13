import { strictEqual, strict } from "node:assert";
import { describe, it } from "node:test";
import { Schema } from "$src/validation/schema.js";

describe("Validation schema", () => {
  it("primitives", () => {
    const product = {
      name: "product 1",
    };
    const productSchema = Schema.object({
      name: Schema
        .string("Name should be a string.")
        .minLength(1e9, "error #2")
    }, "");

    const errors = productSchema.getErrors(product);
    strict(Array.isArray(errors.name));
    strictEqual(errors.name[0], "error #2");
  });

  it("nesting", () => {
    const person = {
      a: {
        b: null
      }
    };
    const personSchema = Schema.object({
      a: Schema.object({
        b: Schema.string("a.b should be a string")
      }, "")
    }, "");
    const errors = personSchema.getErrors(person);

    strictEqual(errors.a?.b?.at(0), "a.b should be a string");
  });
});