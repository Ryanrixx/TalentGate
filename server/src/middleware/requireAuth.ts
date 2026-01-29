import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export type AuthPayload = {
    userId: string;
    role: "jobseeker" | "employer";
    iat?: number;
    exp?: number;
};

export interface AuthedRequest extends Request {
    auth?: AuthPayload;
}

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
    const header = req.headers.authorization;

    if (!header?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Missing Authorization header" });
    }

    const token = header.slice("Bearer ".length);
    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).json({ message: "Server misconfigured" });

    try {
        const payload = jwt.verify(token, secret) as AuthPayload;
        req.auth = payload;
        next();
    } catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
