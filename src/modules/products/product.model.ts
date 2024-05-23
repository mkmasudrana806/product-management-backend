import mongoose, { Schema, Document } from "mongoose";
import { IProduct, IProductModel } from "./product.interface";

const VariantSchema: Schema = new Schema({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const InventorySchema: Schema = new Schema({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

//  --------- product schema ---------
const ProductSchema = new Schema<IProduct, IProductModel>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [VariantSchema], required: true },
  inventory: { type: InventorySchema, required: true },
});

// ------------ implementation of static methods ------------
ProductSchema.statics.isProductQuantityAvailable = async function (id: string) {
  const product = await this.findById(id);
  if (!product) {
    return false;
  }

  if (product.inventory.quantity > 0) {
    const newQuantity = product.inventory.quantity - 1;
    const inStock = newQuantity > 0;

    // Update only the `quantity` and `inStock` fields in the `inventory` subdocument
    await this.findByIdAndUpdate(id, {
      $set: {
        "inventory.quantity": newQuantity,
      },
    });

    return true;
  } else {
    await this.findByIdAndUpdate(id, {
      $set: {
        "inventory.inStock": false,
      },
    });
    return false;
  }
};

// ---------- product model -----------
const Product = mongoose.model<IProduct, IProductModel>(
  "Product",
  ProductSchema
);

export default Product;
