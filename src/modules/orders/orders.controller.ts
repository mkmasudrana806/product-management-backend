// ----------- internal and external import  -----------
import { Request, Response } from "express";
import { ordersServices } from "./orders.services";
import OrderValidationSchema from "./orders.validation.zod";
import Product from "../products/product.model";
import { productServices } from "../products/product.services";

// ---------- create a new order -------------
const createNewOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    // check ordered product available or not
    const isAvailable = await productServices.getSingleProductFromDB(
      orderData.productId
    );

    console.log(isAvailable);
    if (!isAvailable) {
      res.status(500).json({
        success: false,
        message: "Order not found",
      });
    }

    // if order product inventory isStock, then update quantity and create order
    else if (await Product.isProductQuantityAvailable(orderData.productId)) {
      // zod validation schema
      const zodParseData = OrderValidationSchema.parse(orderData);
      // save data to database
      const result = await ordersServices.createOrderIntoDB(zodParseData);
      res.status(200).json({
        success: true,
        message: "Order created successfully!",
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error: error,
    });
  }
};

// ------------ get all orders or get orders by email -------------
const getAllorders = async (req: Request, res: Response) => {
  try {
    // extract query parameter
    const email = req.query.email as string;
    let results;
    // handle orders when email query exists
    if (email) {
      results = await ordersServices.searchOrdersFromDB(email);
      res.status(200).json({
        success: true,
        message: `Products ${
          email ? `Orders fetched successfully for user '${email}'!` : ""
        }`,
        data: results,
      });
      // handle when no email query
    } else {
      results = await ordersServices.getAllOrdersFromDB();
      res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        data: results,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error: error,
    });
  }
};

// --------------- export all controllers -------------
export const ordersController = {
  createNewOrder,
  getAllorders,
};
