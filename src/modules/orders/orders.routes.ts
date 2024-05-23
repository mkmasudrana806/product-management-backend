// ------- internal and external import ----------
import express from "express";
import { ordersController } from "./orders.controller";

const router = express.Router();

// ------- api routes ------------
router.post("/", ordersController.createNewOrder);
router.get("/", ordersController.getAllorders); // also handle search query by email

export const ordersRoutes = router;
