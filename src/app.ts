import express, { Request, Response } from "express";
const app = express();
import cors from "cors";
import { productRoutes } from "./modules/products/product.routes";

// --------- parser -------------
app.use(express.json()); // parse JSON data sent in req body
app.use(cors()); // server allow all origin to access it's resources

// -------- api middlewares ---------
app.use("/api/products", productRoutes);

// ---------- server entry api route ----------
app.get("/", (req: Request, res: Response) => {
  res.send("Product management server is running!");
});

export default app;
