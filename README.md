# shape-and-form

A lightweight form validator.

## Examples

### Casting

```javascript
import { cast } from "shape-and-form";

const productSchema = Cast.object({
  name: Cast.string("product 1"),
  price: Cast.number().round("floor"),
  description: Cast.object({
    isAvailable: Cast.boolean(false)
  })
});

const product = productSchema.cast({ incomplete: "data" });
console.log(product);

/*
{
  name: "product 1",
  price: 1,
  description: {
    isAvailable: false
  }
}
*/
```

### Validating

```javascript
import { Validation } from "shape-and-form";

const productSchema = Validation.object({
  name: Validation
    .string("Name is required.")
    .minLength(1, "Name is too short.")
    .maxLength(100, "Name is too long."),
  price: Validation
    .number("Price must be a number.")
    .min(0.01, "Price must be a positive number."),
  description: Validation.object({
    isAvailable: Validation.boolean("Availability must be specified.").optional()
  }, "Description missing.")
});

const errors = productSchema.getErrors({ incomplete: "data" });
console.log(errors);

/*
{
  name: "Name is required.",
  price: "Price must be a number.",
  description: "Description missing."
}
*/
```
