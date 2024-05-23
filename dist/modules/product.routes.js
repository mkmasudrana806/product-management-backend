"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
// handle all products
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
// routes
router.post("/", product_controller_1.productControllers.createNewProduct);
router.get("/", product_controller_1.productControllers.getAllProducts); // also handle search query
router.get("/:productId", product_controller_1.productControllers.getSingleProduct);
router.put("/:productId", product_controller_1.productControllers.updateAProduct);
router.delete("/:productId", product_controller_1.productControllers.deleteAProduct);
exports.productRoutes = router;
