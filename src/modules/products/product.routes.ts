//  --------- all internal and external import  ---------
import express from "express";
import { productControllers } from "./product.controller";

const router = express.Router();

// --------- product api routes  ---------
router.post("/", productControllers.createNewProduct);
router.get("/", productControllers.getAllProducts); // also handle search query
router.get("/:productId", productControllers.getSingleProduct);
router.put("/:productId", productControllers.updateAProduct);
router.delete("/:productId", productControllers.deleteAProduct);

export const productRoutes = router;
