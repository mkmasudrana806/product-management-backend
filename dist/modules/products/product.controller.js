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
exports.productControllers = void 0;
const product_services_1 = require("./product.services");
const product_validation_zod_1 = __importDefault(require("./product.validation.zod"));
// --------- create a new product ---------
const createNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        // zod validation schema
        const zodParseData = product_validation_zod_1.default.parse(productData);
        // save data to database
        const result = yield product_services_1.productServices.createProductIntoDB(zodParseData);
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            error: error,
        });
    }
});
// ---------  get all products or search products ---------
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // extract search query
        const searchTerm = req.query.searchTerm;
        let results;
        // handle products when search query exists
        if (searchTerm) {
            results = yield product_services_1.productServices.searchProductFromDB(searchTerm);
            res.status(200).json({
                success: true,
                message: `Products ${searchTerm ? `matching search term '${searchTerm}'` : ""} fetched successfully!`,
                data: results,
            });
            // handle when no search query
        }
        else {
            results = yield product_services_1.productServices.getAllProductsFromDB();
            res.status(200).json({
                success: true,
                message: "Products fetched successfully!",
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
//  --------- get a single product by id ---------
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_services_1.productServices.getSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong to fetch single product",
            error: error,
        });
    }
});
//  --------- update a product ---------
const updateAProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const product = req.body;
        const result = yield product_services_1.productServices.updateAProductFromDB(productId, product);
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            error: error,
        });
    }
});
//  --------- get a single product ---------
const deleteAProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_services_1.productServices.deleteAProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            error: error,
        });
    }
});
//  --------- export all controllers ---------
exports.productControllers = {
    createNewProduct,
    getAllProducts,
    getSingleProduct,
    updateAProduct,
    deleteAProduct,
};
