"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ---------- internal import ----------------
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
// ------------ external import -------------
const product_routes_1 = require("./modules/products/product.routes");
const orders_routes_1 = require("./modules/orders/orders.routes");
// --------- parser -------------
app.use(express_1.default.json()); // parse JSON data sent in req body
app.use((0, cors_1.default)()); // server allow all origin to access it's resources
// -------- api middlewares ---------
app.use("/api/products", product_routes_1.productRoutes);
app.use("/api/orders", orders_routes_1.ordersRoutes);
// ---------- server entry api route ----------
app.get("/", (req, res) => {
    res.send("Product management server is running!");
});
// random api route
app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
exports.default = app;
