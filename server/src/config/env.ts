export function getEnv() {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) throw new Error("Missing MONGO_URI in .env");

    const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
    const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
    const NODE_ENV = process.env.NODE_ENV || "development";

    return { MONGO_URI, PORT, CLIENT_URL, NODE_ENV };
}
