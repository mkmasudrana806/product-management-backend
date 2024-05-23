import { z } from "zod";

const VariantSchema = z.object({
  type: z.string().min(1, "Variant type is required"),
  value: z.string().min(1, "Variant value is required"),
});

const InventorySchema = z.object({
  quantity: z
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .int("Quantity must be an integer")
    .nonnegative("quantity must be non negative value"),
  inStock: z.boolean({
    required_error: "In-stock status is required",
    invalid_type_error: "In-stock status must be a boolean",
  }),
});

//  --------- product validation schema  ---------
const ProductValidationSchema = z.object({
  name: z.string().trim().min(1, "Product name is required"),
  description: z.string().trim().min(1, "Product description is required"),
  price: z.number({
    required_error: "Price is required",
    invalid_type_error: "Price must be a number",
  }),
  category: z.string().trim().min(1, "Category is required"),
  tags: z
    .array(z.string().min(1, "Tag cannot be empty"), {
      required_error: "Tags are required",
      invalid_type_error: "Tags must be an array of strings",
    })
    .min(1, "There must be at least one tag"),
  variants: z
    .array(VariantSchema, {
      required_error: "Variants are required",
      invalid_type_error: "Variants must be an array of variant objects",
    })
    .min(1, "There must be at least one variant"),
  inventory: InventorySchema,
});

export default ProductValidationSchema;
