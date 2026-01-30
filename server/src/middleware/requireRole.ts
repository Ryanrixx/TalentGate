import type { Request, Response, NextFunction } from "express";

export function requireRole(role: "jobseeker" | "employer") {
    return (req: Request, res: Response, next: NextFunction) => {
        // requireAuth should have already attached req.user
        const user = (req as any).user;

        if (!user) return res.status(401).json({ message: "Not authenticated" });
        if (user.role !== role) return res.status(403).json({ message: "Forbidden" });

        next();
    };
}
