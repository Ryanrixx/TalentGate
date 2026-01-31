import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

export type JwtPayload = {
    userId: string;
    role: "jobseeker" | "employer";
    verified: boolean;
};

export function signToken(payload: JwtPayload) {
    return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtPayload {
    return jwt.verify(token, ENV.JWT_SECRET) as JwtPayload;
}
