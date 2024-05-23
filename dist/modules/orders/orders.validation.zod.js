"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
//  ----------- orders joz validation -----------
const OrderValidationSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: "email required",
        invalid_type_error: "email must be valid structure",
    })
        .email("email must be valid")
        .trim(),
    productId: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/),
    price: zod_1.z
        .number({
        required_error: "price is required",
        invalid_type_error: "price should be neumeric",
    })
        .nonnegative({ message: "price should be no negative" }),
    quantity: zod_1.z
        .number()
        .int("quanity should be integer value")
        .positive("quantity should be positive"),
});
exports.default = OrderValidationSchema;
