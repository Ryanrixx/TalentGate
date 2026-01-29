export type AuthedUser = {
    id: string;
    role: "jobseeker" | "employer";
    name: string;
    email: string;
};

export type AuthResponse = {
    message: string;
    token: string;
    user: AuthedUser;
};

const TOKEN_KEY = "tg_token";
const USER_KEY = "tg_user";

export function saveAuth(token: string, user: AuthedUser) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}

export function getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
}

export function getUser(): AuthedUser | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw) as AuthedUser;
    } catch {
        return null;
    }
}
