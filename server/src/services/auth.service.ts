import { User } from "../models/User.model";
import { hashPassword, verifyPassword } from "../utils/password";
import { signToken } from "../utils/jwt";

function displayName(user: any) {
    const n = user?.verification?.name;
    if (n) return n;
    return String(user.email || "User").split("@")[0];
}

export async function register(email: string, password: string, role: "jobseeker" | "employer") {
    const existing = await User.findOne({ email });
    if (existing) throw new Error("Email already in use");

    const passwordHash = await hashPassword(password);
    const user = await User.create({ email, passwordHash, role, verified: false });

    const token = signToken({ userId: String(user._id), role: user.role, verified: user.verified });

    return {
        token,
        user: {
            id: String(user._id),
            name: displayName(user),
            email: user.email,
            role: user.role,
            verified: user.verified,
            avatarUrl: user.avatarUrl || "",
            bannerUrl: user.bannerUrl || "",
        },
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
        user: {
            id: String(user._id),
            name: displayName(user),
            email: user.email,
            role: user.role,
            verified: user.verified,
            avatarUrl: user.avatarUrl || "",
            bannerUrl: user.bannerUrl || "",
        },
    };
}
