//  ----------- internal and external import  -----------
import mongoose, { Schema } from "mongoose";
import { IOrders } from "./orders.interface";

// ----------- orders schema -----------
const OrderSchema: Schema = new Schema({
  email: { type: String, required: true },
  // as no mention about ref. so i have ignored referencing
  productId: { type: Schema.Types.ObjectId, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// ----------- model -----------
const Orders = mongoose.model<IOrders>("Order", OrderSchema);
export default Orders;
