import type { Request, Response } from "express";
import { login, register } from "../services/auth.service";
import { User } from "../models/User.model";
import type { AuthedRequest } from "../middlewares/auth.middleware";

function displayName(user: any) {
    const n = user?.verification?.name;
    if (n) return n;
    return String(user.email || "User").split("@")[0];
}

export async function registerController(req: Request, res: Response) {
    try {
        const { email, password, role } = req.body;
        const out = await register(email, password, role);
        return res.json(out);
    } catch (e: any) {
        return res.status(400).json({ message: e.message || "Register failed" });
    }
}

export async function loginController(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const out = await login(email, password);
        return res.json(out);
    } catch (e: any) {
        return res.status(400).json({ message: e.message || "Login failed" });
    }
}

export async function meController(req: AuthedRequest, res: Response) {
    try {
        const user = await User.findById(req.auth!.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        return res.json({
            user: {
                id: String(user._id),
                name: displayName(user),
                email: user.email,
                role: user.role,
                verified: user.verified,
                avatarUrl: user.avatarUrl || "",
                bannerUrl: user.bannerUrl || "",
            },
        });
    } catch (e: any) {
        return res.status(400).json({ message: e.message || "Failed" });
    }
}

export async function listUsersController(req: AuthedRequest, res: Response) {
    try {
        const q = String((req.query as any).q || "").trim().toLowerCase();
        const meId = req.auth!.userId;

        const where: any = { _id: { $ne: meId } };
        const users = await User.find(where).limit(50);

        let out = users.map((u) => ({
            id: String(u._id),
            name: displayName(u),
            role: u.role,
            verified: u.verified,
            avatarUrl: u.avatarUrl || "",
        }));

        if (q) {
            out = out.filter((u) => u.name.toLowerCase().includes(q));
        }

        return res.json({ users: out });
    } catch (e: any) {
        return res.status(400).json({ message: e.message || "Failed" });
    }
}
