import mongoose from "mongoose";
import "dotenv/config";

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("Database connected successfully");
  } catch (error) {
    console.error(`ERROR IN DATABASE CONNECTION ${error.message}`);

    process.exit(1);
  }
}

export default connectDatabase;
