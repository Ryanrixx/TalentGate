import { Request, Response, NextFunction } from "express";

export function errorHandler(
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        message: err?.message || "Something went wrong",
        stack: process.env.NODE_ENV === "production" ? "🥷 hidden" : err?.stack,
    });
}
