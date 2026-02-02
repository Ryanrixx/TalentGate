import type { Response } from "express";
import { User } from "../models/User.model";
import { signToken } from "../utils/jwt";
import type { AuthedRequest } from "../middlewares/auth.middleware";

function displayName(user: any) {
    const n = user?.verification?.name;
    if (n) return n;
    return String(user.email || "User").split("@")[0];
}

export async function submitVerificationController(req: AuthedRequest, res: Response) {
    try {
        const { name, age, email, phone } = req.body;

        const user = await User.findById(req.auth!.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.verification = { name, age, email, phone };
        user.verified = true;
        await user.save();

        const token = signToken({ userId: String(user._id), role: user.role, verified: true });

        return res.json({
            token,
            user: {
                id: String(user._id),
                name: displayName(user),
                email: user.email,
                role: user.role,
                verified: true,
                avatarUrl: user.avatarUrl || "",
                bannerUrl: user.bannerUrl || "",
            },
        });
    } catch (e: any) {
        return res.status(400).json({ message: e.message || "Verification failed" });
    }
}
