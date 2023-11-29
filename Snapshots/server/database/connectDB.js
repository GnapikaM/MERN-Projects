import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_URL);
    console.log("Database Connected: ", connect.connection.host, connect.connection.name);
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  } 
};

export default connectDB;