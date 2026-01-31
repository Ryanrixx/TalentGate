import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth.store";
import { Badge } from "../ui/Badge";

function NavItem({ to, label }: { to: string; label: string }) {
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

    return (
        <header className="sticky top-0 z-50 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-100 text-zinc-900 font-black">
                        TG
                    </div>
                    <div className="leading-tight">
                        <div className="text-sm font-semibold">TalentGate</div>
                        <div className="text-xs text-zinc-500">roles • verification • jobs</div>
                    </div>
                </div>

                <nav className="hidden md:flex items-center gap-1">
                    <NavItem to="/feed" label="Feed" />
                    <NavItem to="/trending" label="Trending" />
                    <NavItem to="/communities" label="Communities" />

                    {user?.role === "jobseeker" && (
                        <>
                            <NavItem to="/jobseeker/dashboard" label="Dashboard" />
                            <NavItem to="/jobseeker/jobs" label="Jobs" />
                            <NavItem to="/jobseeker/applications" label="Applications" />
                            <NavItem to="/jobseeker/profile" label="Profile" />
                        </>
                    )}

                    {user?.role === "employer" && (
                        <>
                            <NavItem to="/employer/dashboard" label="Dashboard" />
                            <NavItem to="/employer/post-job" label="Post Job" />
                            <NavItem to="/employer/applicants" label="Applicants" />
                            <NavItem to="/employer/profile" label="Profile" />
                        </>
                    )}
                </nav>

                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <div className="hidden sm:flex items-center gap-2">
                                <Badge>{user.role}</Badge>
                                <Badge>{user.verified ? "verified" : "read-only"}</Badge>
                            </div>
                            <button
                                onClick={() => {
                                    logout();
                                    nav("/auth/sign-in");
                                }}
                                className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800"
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
