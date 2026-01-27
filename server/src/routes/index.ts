import { Router } from "express";
import { SystemModel } from "../models/System.model.js";

const router = Router();

router.get("/health", (_req, res) => {
    res.json({ status: "OK", service: "TalentGate API v1" });
});

// DB sanity check
router.get("/db-check", async (_req, res, next) => {
    try {
        const doc = await SystemModel.create({ name: "talentgate" });
        res.json({
            message: "DB write successful",
            id: doc._id,
        });
    } catch (err) {
        next(err);
    }
});

export default router;
