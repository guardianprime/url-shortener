import mongoose from "mongoose";
import { MONGO_URI } from "./configs/env.config.js";

const CONNECTION_URL = MONGO_URI;

function connectToMongoDB() {
  mongoose.connect(CONNECTION_URL);

  mongoose.connection.on("connected", () => {
    console.log("successfuly connected to mongodb");
  });

  mongoose.connection.on("error", () => {
    console.log("failed to connect to mongodb");
    process.exit(1);
  });
}

export default connectToMongoDB;
