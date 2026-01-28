import { Router } from "express";
import { SystemModel } from "./models/System.model.js";
import jobsRouter from "./routes/jobs.routes.js";
import authRouter from "./routes/auth.routes.js";

const router = Router();

// Health check
router.get("/health", (_req, res) => {
    res.json({
        status: "OK",
        service: "talentgate-api",
        ts: new Date().toISOString(),
    });
});

// Auth
router.use("/auth", authRouter);

// DB sanity check (optional)
router.get("/db-check", async (_req, res, next) => {
    try {
        const doc = await SystemModel.create({ name: "talentgate" });
        res.json({ message: "DB write successful", id: doc._id });
    } catch (err) {
        next(err);
    }
});

// Jobs
router.use("/jobs", jobsRouter);

export default router;
