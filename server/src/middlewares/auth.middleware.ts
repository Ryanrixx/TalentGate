import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export type AuthedRequest = Request & {
    auth?: { userId: string; role: "jobseeker" | "employer"; verified: boolean };
};

export function authMiddleware(req: AuthedRequest, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Missing token" });
    }

    const token = header.slice("Bearer ".length);
    try {
        req.auth = verifyToken(token);
        return next();
    } catch {
        return res.status(401).json({ message: "Invalid token" });
    }
}
