import { api } from "./api";
import type { UserDTO, UserRole } from "../types";

export type AuthResponse = {
    token: string;
    user: UserDTO;
};

export function register(email: string, password: string, role: UserRole) {
    return api<AuthResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password, role }),
    });
}

export function login(email: string, password: string) {
    return api<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

export function me() {
    return api<{ user: UserDTO }>("/auth/me", { method: "GET" });
}
