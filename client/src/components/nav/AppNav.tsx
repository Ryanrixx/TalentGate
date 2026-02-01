import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth.store";
import { Badge } from "../ui/Badge";
import { Toggle } from "../ui/Toggle";
import { getDemoMode, setDemoMode } from "../../utils/demo";

function Item({ to, label }: { to: string; label: string }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                "rounded-xl px-3 py-2 text-sm transition " +
                (isActive
                    ? "bg-zinc-100 text-zinc-900"
                    : "text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100")
            }
        >
            {label}
        </NavLink>
    );
}

export function AppNav() {
    const nav = useNavigate();
    const { user, logout } = useAuth();
    const [demo, setDemo] = useState(getDemoMode());

    useEffect(() => {
        setDemoMode(demo);
        // quick UI refresh for pages reading demo mode
        window.dispatchEvent(new Event("storage"));
    }, [demo]);

    const roleItems = useMemo(() => {
        if (user?.role === "jobseeker") {
            return (
                <>
                    <Item to="/jobseeker/dashboard" label="Dashboard" />
                    <Item to="/jobseeker/jobs" label="Jobs" />
                    <Item to="/jobseeker/applications" label="Applications" />
                    <Item to="/jobseeker/profile" label="Profile" />
                </>
            );
        }
        if (user?.role === "employer") {
            return (
                <>
                    <Item to="/employer/dashboard" label="Dashboard" />
                    <Item to="/employer/post-job" label="Post Job" />
                    <Item to="/employer/applicants" label="Applicants" />
                    <Item to="/employer/profile" label="Profile" />
                </>
            );
        }
        return null;
    }, [user?.role]);

    return (
        <header className="sticky top-0 z-50 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
                <button
                    className="flex items-center gap-3 rounded-2xl px-2 py-1 hover:bg-zinc-900/60"
                    onClick={() => nav("/feed")}
                >
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-100 text-zinc-900 font-black">
                        TG
                    </div>
                    <div className="text-left leading-tight">
                        <div className="text-sm font-semibold">TalentGate</div>
                        <div className="text-xs text-zinc-500">verified hiring • living profile</div>
                    </div>
                </button>

                <nav className="hidden lg:flex items-center gap-1">
                    <Item to="/feed" label="Feed" />
                    <Item to="/trending" label="Trending" />
                    <Item to="/communities" label="Communities" />
                    {roleItems}
                </nav>

                <div className="flex items-center gap-3">
                    <Toggle checked={demo} onChange={setDemo} label="Demo" />

                    {user ? (
                        <>
                            <div className="hidden sm:flex items-center gap-2">
                                <Badge>{user.role}</Badge>
                                <Badge className={user.verified ? "" : "text-amber-200 border-amber-900 bg-amber-950/30"}>
                                    {user.verified ? "verified" : "read-only"}
                                </Badge>
                            </div>

                            <button
                                onClick={() => {
                                    logout();
                                    nav("/auth/sign-in");
                                }}
                                className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-900"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => nav("/auth/sign-in")}
                            className="rounded-xl bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-white"
                        >
                            Sign in
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
