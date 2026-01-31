import type { Request, Response } from "express";
import { login, register } from "../services/auth.service";
import { User } from "../models/User.model";
import type { AuthedRequest } from "../middlewares/auth.middleware";

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
            user: { id: String(user._id), email: user.email, role: user.role, verified: user.verified },
        });
    } catch (e: any) {
        return res.status(400).json({ message: e.message || "Failed" });
    }
}
