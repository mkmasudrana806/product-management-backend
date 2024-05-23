import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import config from "./app/index";

// ---------- database and server connection ------------
let server: Server;
main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Database Connected!");
    server = app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  } catch (error) {
    console.log("Error while connecting to database!");
  }
}
