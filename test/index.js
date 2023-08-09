// @ts-check

import { validate, cast } from "shape-and-form";

const productUpdate = cast({
  name: "  ",
  price: "0.5"
}, {
  name: { type: String, trim: true },
  price: { type: Number, roundFn: Math.floor },
  expiryDate: { value: new Date("1970-01-01") }
});

const errors = validate(productUpdate, {
  name: [
    { minLength: 1, message: "Name is too short." },
    { maxLength: 50, message: "Name is too long." },
  ],
  price: [
    { min: 1, message: "Price should be greater than or equal to 1." }
  ],
  expiryDate: [
    {
      isAfter: new Date(),
      message: "Expiry date should be after today at minimum."
    }
  ]
});

console.log(productUpdate, errors);