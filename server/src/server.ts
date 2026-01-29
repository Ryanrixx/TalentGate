import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import routes from "./routes.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { logger } from "./middleware/logger.js";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(logger);

connectDB();

app.get("/", (_req, res) => {
    res.send("TalentGate API is running ✅");
});

console.log("Mounting routes at /api/v1", typeof routes);

app.use("/api/v1", routes);
// DEBUG: show if router exists
console.log("✅ /api/v1 routes mounted");

// DEBUG: list routes if possible
// @ts-ignore
console.log("ROUTES STACK:", routes?.stack?.map((l: any) => l?.route?.path).filter(Boolean));

// 404 + error middleware (always at the end)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
