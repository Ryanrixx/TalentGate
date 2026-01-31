import type { Response, NextFunction } from "express";
import type { AuthedRequest } from "./auth.middleware";

export function verifiedMiddleware(req: AuthedRequest, res: Response, next: NextFunction) {
    if (!req.auth) return res.status(401).json({ message: "Unauthorized" });
    if (!req.auth.verified) return res.status(403).json({ message: "Account not verified" });
    return next();
}
