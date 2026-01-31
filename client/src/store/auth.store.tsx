import React, { createContext, useContext, useMemo, useState } from "react";
import type { UserDTO } from "../types";

type AuthContextValue = {
    token: string | null;
    user: UserDTO | null;
    setAuth: (token: string, user: UserDTO) => void;
    logout: () => void;
};

const AuthCtx = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = "tg_token";
const USER_KEY = "tg_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(() =>
        localStorage.getItem(TOKEN_KEY)
    );
    const [user, setUser] = useState<UserDTO | null>(() => {
        const raw = localStorage.getItem(USER_KEY);
        return raw ? (JSON.parse(raw) as UserDTO) : null;
    });

    const value = useMemo<AuthContextValue>(
        () => ({
            token,
            user,
            setAuth: (t, u) => {
                localStorage.setItem(TOKEN_KEY, t);
                localStorage.setItem(USER_KEY, JSON.stringify(u));
                setToken(t);
                setUser(u);
            },
            logout: () => {
                localStorage.removeItem(TOKEN_KEY);
                localStorage.removeItem(USER_KEY);
                setToken(null);
                setUser(null);
            },
        }),
        [token, user]
    );

    return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthCtx);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}
