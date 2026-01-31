import bcrypt from "bcryptjs";

export async function hashPassword(raw: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(raw, salt);
}

export async function verifyPassword(raw: string, hashed: string) {
    return bcrypt.compare(raw, hashed);
}
