import mongoose from "mongoose";

async function connectDatabase() {
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
  console.log("Database connected successfully");
}

export default connectDatabase;
