import mongoose from "mongoose";
import { getEnv } from "./env.js";

export const connectDB = async () => {
    try {
        const { MONGO_URI } = getEnv();
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error("❌ MongoDB connection failed", error);
        process.exit(1);
    }
};
