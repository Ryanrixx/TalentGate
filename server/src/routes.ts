import { Router } from "express";
import { SystemModel } from "./models/system.model.js";
import jobsRouter from "./routes/jobs.routes.js";
import authRouter from "./routes/auth.routes.js";
import { requireAuth } from "./middleware/requireAuth.js";
import devRouter from "./routes/dev.routes.js";


const router = Router();

// Health check
router.get("/health", (_req, res) => {
    res.json({
        status: "OK",
        service: "talentgate-api",
        ts: new Date().toISOString(),
    });
});
router.get("/me", requireAuth, (req: any, res) => {
    res.json({ ok: true, user: req.user });
});


// Auth
router.use("/auth", authRouter);

// DB sanity check
router.get("/db-check", async (_req, res, next) => {
    try {
        const doc = await SystemModel.create({ name: "talentgate" });
        res.json({ message: "DB write successful", id: doc._id });
    } catch (err) {
        next(err);
    }
});

if (process.env.NODE_ENV !== "production") {
    router.use("/dev", devRouter);
}

// Jobs route
router.use("/jobs", jobsRouter);


export default router;
