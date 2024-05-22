import express, { Request, Response } from "express";
const app = express();
import cors from "cors";

// --------- parser -------------
app.use(express.json()); // parse JSON data sent in req body
app.use(cors()); // server allow all origin to access it's resources

// -------- api middlewares ---------

app.post("/", (req: Request, res: Response) => {
  console.log("passed data: ", req.body);
  res.send("Product management server is running!");
});

export default app;
