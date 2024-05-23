"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRoutes = void 0;
// ------- internal and external import ----------
const express_1 = __importDefault(require("express"));
const orders_controller_1 = require("./orders.controller");
const router = express_1.default.Router();
// ------- api routes ------------
router.post("/", orders_controller_1.ordersController.createNewOrder);
router.get("/", orders_controller_1.ordersController.getAllorders); // also handle search query by email
exports.ordersRoutes = router;
