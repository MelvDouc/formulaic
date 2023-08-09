import { describe, it } from "node:test";
import { validate } from "../validate.js";
import { strictEqual } from "node:assert";

describe("validate", () => {
  const errorMessages = {
    INVALID_EMAIL: "Invalid email.",
    USERNAME_TOO_SHORT: "Username is too short.",
    USERNAME_TOO_LONG: "Username is too long.",
  } as const;

  it("should verify string lengths", () => {
    const newUser = {
      username: "abc"
    } as const;

    const errors = validate(newUser, {
      username: [
        { minLength: 5, message: errorMessages.USERNAME_TOO_SHORT },
        { maxLength: 10, message: errorMessages.USERNAME_TOO_LONG }
      ]
    });

    strictEqual(errors.length, 1);
    strictEqual(errors[0], errorMessages.USERNAME_TOO_SHORT);
  });

  it("should handle regular expressions", () => {
    const user = { email: "example@email.com" } as const;
    const errors = validate(user, {
      email: [
        { regex: /^[^@]+@[^@.]+\.[^@.]+$/, message: errorMessages.INVALID_EMAIL }
      ]
    });

    strictEqual(errors.length, 0);
  });
});