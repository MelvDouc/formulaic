// @ts-check

import { validate } from "formulaic";

const productUpdate = {
  name: "",
  price: 0,
  expiryDate: new Date("1970-01-01")
};

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

console.log(errors);