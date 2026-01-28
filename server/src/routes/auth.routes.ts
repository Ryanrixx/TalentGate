import { Router } from "express";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/User.model.js";
import { signToken } from "../utils/jwt.js";

const router = Router();

/**
 * POST /api/v1/auth/signup
 * body: { role, name, email, password }
 */
router.post("/signup", async (req, res, next) => {
    try {
        const { role, name, email, password } = req.body as {
            role: "jobseeker" | "employer";
            name: string;
            email: string;
            password: string;
        };

        // Basic validation (simple now; we can upgrade later)
        if (!role || !name || !email || !password) {
            return res.status(400).json({ message: "role, name, email, password are required" });
        }

        if (!["jobseeker", "employer"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }

        const existing = await UserModel.findOne({ email }).lean();
        if (existing) {
            return res.status(409).json({ message: "Email already in use" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await UserModel.create({
            role,
            name,
            email,
            passwordHash,
        });

        const token = signToken({ userId: user._id, role: user.role });

        return res.status(201).json({
            message: "Signup successful",
            token,
            user: {
                id: user._id,
                role: user.role,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        next(err);
    }
});

/**
 * POST /api/v1/auth/login
 * body: { email, password }
 */
router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body as { email: string; password: string };

        if (!email || !password) {
            return res.status(400).json({ message: "email and password are required" });
        }

        // IMPORTANT: passwordHash is select:false, so we must explicitly select it
        const user = await UserModel.findOne({ email }).select("+passwordHash");
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = signToken({ userId: user._id, role: user.role });

        return res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                role: user.role,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        next(err);
    }
});

export default router;
