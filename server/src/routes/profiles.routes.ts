import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { verifiedMiddleware } from "../middlewares/verified.middleware";
import * as profileSvc from "../services/profile.service";

export const profilesRoutes = Router();

profilesRoutes.get("/me", authMiddleware, verifiedMiddleware, async (req: any, res) => {
    const profile = await profileSvc.getProfile(req.auth.userId, req.auth.role);
    res.json({ profile });
});

profilesRoutes.put("/me", authMiddleware, verifiedMiddleware, async (req: any, res) => {
    const profile = await profileSvc.saveProfile(req.auth.userId, req.auth.role, req.body);
    res.json({ profile });
});
