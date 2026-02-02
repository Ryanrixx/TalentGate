import express from "express";
import cors from "cors";
import { ENV } from "./config/env";

import { authRoutes } from "./routes/auth.routes";
import { verificationRoutes } from "./routes/verification.routes";
import { jobRoutes } from "./routes/job.routes";
import { profilesRoutes } from "./routes/profiles.routes";
import { messagesRoutes } from "./routes/messages.routes";
import { notificationsRoutes } from "./routes/notifications.routes";

export function createApp() {
    const app = express();

    app.use(
        cors({
            origin: ENV.CORS_ORIGIN,
            credentials: true,
        })
    );

    // allow small base64 images (banner/avatar)
    app.use(express.json({ limit: "6mb" }));

    app.get("/api/health", (_req, res) => res.json({ ok: true }));

    app.use("/api/auth", authRoutes);
    app.use("/api/verification", verificationRoutes);
    app.use("/api/jobs", jobRoutes);
    app.use("/api/profiles", profilesRoutes);

    app.use("/api/messages", messagesRoutes);
    app.use("/api/notifications", notificationsRoutes);

    return app;
}
