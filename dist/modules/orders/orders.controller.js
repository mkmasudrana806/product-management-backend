"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersController = void 0;
const orders_services_1 = require("./orders.services");
const orders_validation_zod_1 = __importDefault(require("./orders.validation.zod"));
const product_model_1 = __importDefault(require("../products/product.model"));
const product_services_1 = require("../products/product.services");
// ---------- create a new order -------------
const createNewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        // check ordered product available or not
        const isAvailable = yield product_services_1.productServices.getSingleProductFromDB(orderData.productId);
        if (!isAvailable) {
            res.status(500).json({
                success: false,
                message: "Order not found",
            });
        }
        // if order product inventory isStock, then update quantity and create order
        else if (yield product_model_1.default.isProductQuantityAvailable(orderData.productId)) {
            // zod validation schema
            const zodParseData = orders_validation_zod_1.default.parse(orderData);
            // save data to database
            const result = yield orders_services_1.ordersServices.createOrderIntoDB(zodParseData);
            res.status(200).json({
                success: true,
                message: "Order created successfully!",
                data: result,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Insufficient quantity available in inventory",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            error: error,
        });
    }
});
// ------------ get all orders or get orders by email -------------
const getAllorders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // extract query parameter
        const email = req.query.email;
        let results;
        // handle orders when email query exists
        if (email) {
            results = yield orders_services_1.ordersServices.searchOrdersFromDB(email);
            res.status(200).json({
                success: true,
                message: `Products ${email ? `Orders fetched successfully for user '${email}'!` : ""}`,
                data: results,
            });
            // handle when no email query
        }
        else {
            results = yield orders_services_1.ordersServices.getAllOrdersFromDB();
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully!",
                data: results,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            error: error,
        });
    }
});
// --------------- export all controllers -------------
exports.ordersController = {
    createNewOrder,
    getAllorders,
};
