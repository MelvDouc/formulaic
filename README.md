# shape-and-form

A lightweight form validator.

## Examples

### Casting

```javascript
import { cast } from "shape-and-form";

const rawData = {
  name: "  ",
  price: "0.5"
};

const productUpdate = cast(rawData, {
  name: {
    type: "string",
    trim: true
  },
  price: {
    type: "number",
    roundFn: Math.trunc
  },
  expiryDate: {
    type: "date",
    fallback: new Date("1970-01-01")
  },
  missingProp: {
    type: "string",
    ignoreIfAbsent: true
  }
});

console.log(productUpdate);
/*
{
  name: "",
  price: 0,
  expiryDate: 1970-01-01T00:00:00.000Z
}
*/
```

### Validating

```javascript
import { validate } from "shape-and-form";

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