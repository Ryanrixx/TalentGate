import { api } from "./api";
import type { UserLiteDTO } from "../types";

export function listUsers(q?: string) {
    const qs = q ? `?q=${encodeURIComponent(q)}` : "";
    return api<{ users: UserLiteDTO[] }>(`/auth/users${qs}`, { method: "GET" });
}
