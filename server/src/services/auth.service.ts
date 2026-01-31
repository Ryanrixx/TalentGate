import { User } from "../models/User.model";
import { hashPassword, verifyPassword } from "../utils/password";
import { signToken } from "../utils/jwt";

export async function register(email: string, password: string, role: "jobseeker" | "employer") {
    const existing = await User.findOne({ email });
    if (existing) throw new Error("Email already in use");

    const passwordHash = await hashPassword(password);
    const user = await User.create({ email, passwordHash, role, verified: false });

    const token = signToken({ userId: String(user._id), role: user.role, verified: user.verified });

    return {
        token,
        user: { id: String(user._id), email: user.email, role: user.role, verified: user.verified },
    };
}

export async function login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) throw new Error("Invalid credentials");

    const token = signToken({ userId: String(user._id), role: user.role, verified: user.verified });

    return {
        token,
        user: { id: String(user._id), email: user.email, role: user.role, verified: user.verified },
    };
}
