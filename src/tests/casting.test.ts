import { describe, it } from "node:test";
import { cast } from "../casting.js";
import { strictEqual } from "node:assert";

describe("Casting", () => {
  it("should work with forced casting", () => {
    const product = {
      name: null,
      price: "abc"
    };
    const casted = cast(product, {
      name: { value: "product name" },
      price: { value: 0 }
    });
    strictEqual(casted.name, "product name");
    strictEqual(casted.price, 0);
  });

  it("should implement string trimming", () => {
    const test = { name: " abc   " };
    const casted = cast(test, {
      name: { type: String, trim: true }
    });
    strictEqual(casted.name, "abc");
  });
});