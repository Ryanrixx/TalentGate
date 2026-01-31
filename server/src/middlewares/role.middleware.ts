import type { Response, NextFunction } from "express";
import type { AuthedRequest } from "./auth.middleware";

export function roleMiddleware(role: "jobseeker" | "employer") {
    return (req: AuthedRequest, res: Response, next: NextFunction) => {
        if (!req.auth) return res.status(401).json({ message: "Unauthorized" });
        if (req.auth.role !== role) return res.status(403).json({ message: "Forbidden" });
        return next();
    };
}
