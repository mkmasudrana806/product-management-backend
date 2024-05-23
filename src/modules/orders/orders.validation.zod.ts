import { z } from "zod";

//  ----------- orders joz validation -----------
const OrderValidationSchema = z.object({
  email: z
    .string({
      required_error: "email required",
      invalid_type_error: "email must be valid structure",
    })
    .email("email must be valid")
    .trim(),
  productId: z.string().regex(/^[0-9a-fA-F]{24}$/),
  price: z
    .number({
      required_error: "price is required",
      invalid_type_error: "price should be neumeric",
    })
    .nonnegative({ message: "price should be no negative" }),
  quantity: z
    .number()
    .int("quanity should be integer value")
    .positive("quantity should be positive"),
});

export default OrderValidationSchema;
