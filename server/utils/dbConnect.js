import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function dbConnect() {
  try {
    const dbURL = process.env.MONGO_URL; // uses MONGO_URL from .env
    await mongoose.connect(dbURL);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log(error);
  }
}

dbConnect();