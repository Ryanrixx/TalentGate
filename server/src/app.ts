import express from "express";
import cors from "cors";
import { ENV } from "./config/env";

import { authRoutes } from "./routes/auth.routes";
import { verificationRoutes } from "./routes/verification.routes";
import { jobRoutes } from "./routes/job.routes";
import { profilesRoutes } from "./routes/profiles.routes";

export function createApp() {
    const app = express();

    app.use(
        cors({
            origin: ENV.CORS_ORIGIN,
            credentials: true,
        })
    );

    app.use(express.json());

    app.get("/api/health", (_req, res) => res.json({ ok: true }));

    app.use("/api/auth", authRoutes);
    app.use("/api/verification", verificationRoutes);
    app.use("/api/jobs", jobRoutes);
    app.use("/api/profiles", profilesRoutes);

    return app;
}
