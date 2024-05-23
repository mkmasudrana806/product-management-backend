"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const VariantSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, "Variant type is required"),
    value: zod_1.z.string().min(1, "Variant value is required"),
});
const InventorySchema = zod_1.z.object({
    quantity: zod_1.z
        .number({
        required_error: "Quantity is required",
        invalid_type_error: "Quantity must be a number",
    })
        .int("Quantity must be an integer")
        .nonnegative("quantity must be non negative value"),
    inStock: zod_1.z.boolean({
        required_error: "In-stock status is required",
        invalid_type_error: "In-stock status must be a boolean",
    }),
});
//  --------- product validation schema  ---------
const ProductValidationSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(1, "Product name is required"),
    description: zod_1.z.string().trim().min(1, "Product description is required"),
    price: zod_1.z.number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
    }),
    category: zod_1.z.string().trim().min(1, "Category is required"),
    tags: zod_1.z
        .array(zod_1.z.string().min(1, "Tag cannot be empty"), {
        required_error: "Tags are required",
        invalid_type_error: "Tags must be an array of strings",
    })
        .min(1, "There must be at least one tag"),
    variants: zod_1.z
        .array(VariantSchema, {
        required_error: "Variants are required",
        invalid_type_error: "Variants must be an array of variant objects",
    })
        .min(1, "There must be at least one variant"),
    inventory: InventorySchema,
});
exports.default = ProductValidationSchema;
