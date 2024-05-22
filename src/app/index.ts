import dotenv from "dotenv";
import path from "path";

// setup path to dotenv.config file as this is not root file
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};
