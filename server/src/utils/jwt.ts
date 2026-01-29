import jwt from "jsonwebtoken";

export function signToken(payload: object) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET not configured");
    }

    const token = jwt.sign(payload, secret, {
        expiresIn: "7d",
    });

}
