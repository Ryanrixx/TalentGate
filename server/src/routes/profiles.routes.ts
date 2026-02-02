import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { verifiedMiddleware } from "../middlewares/verified.middleware";
import * as profileSvc from "../services/profile.service";
import { User } from "../models/User.model";

export const profilesRoutes = Router();

profilesRoutes.get("/me", authMiddleware, verifiedMiddleware, async (req: any, res) => {
    const profile = await profileSvc.getProfile(req.auth.userId, req.auth.role);
    res.json({ profile });
});

profilesRoutes.put("/me", authMiddleware, verifiedMiddleware, async (req: any, res) => {
    const profile = await profileSvc.saveProfile(req.auth.userId, req.auth.role, req.body);
    res.json({ profile });
});

// media update
profilesRoutes.patch("/me/media", authMiddleware, async (req: any, res) => {
    const { avatarUrl, bannerUrl } = req.body || {};
    const user = await User.findById(req.auth.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (typeof avatarUrl === "string") user.avatarUrl = avatarUrl;
    if (typeof bannerUrl === "string") user.bannerUrl = bannerUrl;

    await user.save();

    res.json({
        user: {
            id: String(user._id),
            name: user.verification?.name || String(user.email).split("@")[0],
            email: user.email,
            role: user.role,
            verified: user.verified,
            avatarUrl: user.avatarUrl || "",
            bannerUrl: user.bannerUrl || "",
        },
    });
});
