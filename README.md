# Formulaic

A lightweight form validator.

## Examples

```javascript
import { validate } from "formulaic";

const productUpdate = {
  name: String(req.body.email ?? "").trim(),
  price: parseInt(req.body.price),
  expiryDate: new Date(req.body.date ?? "")
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

if (errors.length > 0)
  return res.json({ errors });
```