import { Router } from "express";
import { SystemModel } from "../models/system.model.js";
import jobsRouter from "./jobs.routes.js";
import authRouter from "./auth.routes.js";

const router = Router();

router.get("/health", (_req, res) => {
    res.json({
        status: "OK",
        service: "talentgate-api",
        ts: new Date().toISOString(),
    });
});

router.use("/auth", authRouter);

router.get("/db-check", async (_req, res, next) => {
    try {
        const doc = await SystemModel.create({ name: "talentgate" });
        res.json({ message: "DB write successful", id: doc._id });
    } catch (err) {
        next(err);
    }
});

router.use("/jobs", jobsRouter);

export default router;
