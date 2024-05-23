import { IOrders } from "./orders.interface";
import Orders from "./orders.model";

// ----------- create Order into db -----------
const createOrderIntoDB = async (order: IOrders) => {
  const result = await Orders.create(order);
  return result;
};

// ----------- get all orders from DB. -----------
const getAllOrdersFromDB = async () => {
  const result = await Orders.find();
  return result;
};

// ----------- search orders by email -----------
const searchOrdersFromDB = async (email: string) => {
  const result = await Orders.find({ email });
  return result;
};

// ----------- export all orders services -----------
export const ordersServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  searchOrdersFromDB,
};
