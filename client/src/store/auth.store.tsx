import React, { createContext, useContext, useMemo, useState } from "react";
import type { UserDTO, UserRole } from "../types";
import * as authSvc from "../services/auth.service";

type AuthContextValue = {
    token: string | null;
    user: UserDTO | null;

    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, role: UserRole) => Promise<void>;
    refreshMe: () => Promise<void>;

    // ✅ NEW
    updateUser: (patch: Partial<UserDTO>) => void;

    logout: () => void;
    setAuth: (token: string, user: UserDTO) => void;
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

    const setAuth = (t: string, u: UserDTO) => {
        localStorage.setItem(TOKEN_KEY, t);
        localStorage.setItem(USER_KEY, JSON.stringify(u));
        setToken(t);
        setUser(u);
    };

    const updateUser = (patch: Partial<UserDTO>) => {
        setUser((prev) => {
            if (!prev) return prev;
            const next = { ...prev, ...patch };
            localStorage.setItem(USER_KEY, JSON.stringify(next));
            return next;
        });
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
    };

    const value = useMemo<AuthContextValue>(
        () => ({
            token,
            user,
            setAuth,
            updateUser,
            logout,

            login: async (email: string, password: string) => {
                const out = await authSvc.login(email, password);
                setAuth(out.token, out.user);
            },

            register: async (email: string, password: string, role: UserRole) => {
                const out = await authSvc.register(email, password, role);
                setAuth(out.token, out.user);
            },

            refreshMe: async () => {
                if (!localStorage.getItem(TOKEN_KEY)) return;
                const out = await authSvc.me();
                const t = localStorage.getItem(TOKEN_KEY)!;
                setAuth(t, out.user);
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
