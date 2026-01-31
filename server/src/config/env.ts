import dotenv from "dotenv";
dotenv.config();

function required(name: string): string {
    const v = process.env[name];
    if (!v) throw new Error(`Missing env var: ${name}`);
    return v;
}

export const ENV = {
    NODE_ENV: process.env.NODE_ENV ?? "development",
    PORT: Number(process.env.PORT ?? 5000),
    MONGO_URI: required("MONGO_URI"),
    JWT_SECRET: required("JWT_SECRET"),
    CORS_ORIGIN: process.env.CORS_ORIGIN ?? "http://localhost:5173",
};
