import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../store/auth.store";
import { Toggle } from "../ui/Toggle";
import { getDemoMode, setDemoMode } from "../../utils/demo";
import { Input } from "../ui/Input";
import {
    IconApplications,
    IconCommunities,
    IconDashboard,
    IconFeed,
    IconJobs,
    IconProfile,
    IconSearch,
    IconTrending,
} from "../ui/Icons";
import { VerifiedBadge } from "../ui/VerifiedBadge";

function IconItem({
                      to,
                      label,
                      icon,
                  }: {
    to: string;
    label: string;
    icon: React.ReactNode;
}) {
    return (
        <NavLink
            to={to}
            title={label}
            className={({ isActive }) =>
                "grid h-10 w-10 place-items-center rounded-xl transition " +
                (isActive
                    ? "bg-zinc-100 text-zinc-900"
                    : "text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100")
            }
        >
            {icon}
        </NavLink>
    );
}

export function AppNav() {
    const nav = useNavigate();
    const loc = useLocation();
    const { user, logout } = useAuth();

    const [demo, setDemo] = useState(getDemoMode());
    const [q, setQ] = useState("");

    useEffect(() => {
        setDemoMode(demo);
        window.dispatchEvent(new Event("storage"));
    }, [demo]);

    const profilePath =
        user?.role === "jobseeker"
            ? "/jobseeker/profile"
            : user?.role === "employer"
                ? "/employer/profile"
                : "/auth/sign-in";

    const roleIcons = useMemo(() => {
        if (user?.role === "jobseeker") {
            return (
                <>
                    <IconItem to="/jobseeker/dashboard" label="Dashboard" icon={<IconDashboard />} />
                    <IconItem to="/jobseeker/jobs" label="Jobs" icon={<IconJobs />} />
                    <IconItem to="/jobseeker/applications" label="Applications" icon={<IconApplications />} />
                    <IconItem to="/jobseeker/profile" label="Profile" icon={<IconProfile />} />
                </>
            );
        }
        if (user?.role === "employer") {
            return (
                <>
                    <IconItem to="/employer/dashboard" label="Dashboard" icon={<IconDashboard />} />
                    <IconItem to="/employer/post-job" label="Post Job" icon={<IconJobs />} />
                    <IconItem to="/employer/applicants" label="Applicants" icon={<IconApplications />} />
                    <IconItem to="/employer/profile" label="Profile" icon={<IconProfile />} />
                </>
            );
        }
        return null;
    }, [user?.role]);

    function onSearchSubmit(e: React.FormEvent) {
        e.preventDefault();
        const s = q.trim();
        if (!s) return;
        nav(`/feed?q=${encodeURIComponent(s)}`);
    }

    useEffect(() => {
        const params = new URLSearchParams(loc.search);
        setQ(params.get("q") || "");
    }, [loc.search]);

    const avatarLetter = (user?.name || user?.email || "T").slice(0, 1).toUpperCase();
    const avatarUrl = (user as any)?.avatarUrl as string | undefined;

    return (
        <header className="sticky top-0 z-50 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3">
                {/* Logo */}
                <button
                    className="flex items-center gap-3 rounded-2xl px-2 py-1 hover:bg-zinc-900/60"
                    onClick={() => nav("/feed")}
                    title="TalentGate"
                >
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-zinc-100 text-zinc-900 font-black shadow-sm">
                        TG
                    </div>
                    <div className="hidden sm:block text-left leading-tight">
                        <div className="text-sm font-semibold">TalentGate</div>
                        <div className="text-xs text-zinc-500">verified hiring • living profile</div>
                    </div>
                </button>

                {/* Search */}
                <form onSubmit={onSearchSubmit} className="flex-1">
                    <div className="relative mx-auto max-w-[620px]">
                        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
                            <IconSearch className="h-4 w-4" />
                        </div>
                        <Input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search people, posts, jobs..."
                            className="pl-9"
                        />
                    </div>
                </form>

                {/* Icon nav */}
                <nav className="hidden lg:flex items-center gap-1">
                    <IconItem to="/feed" label="Feed" icon={<IconFeed />} />
                    <IconItem to="/trending" label="Trending" icon={<IconTrending />} />
                    <IconItem to="/communities" label="Communities" icon={<IconCommunities />} />
                    {roleIcons}
                </nav>

                {/* Right controls */}
                <div className="flex items-center gap-3">
                    <Toggle checked={demo} onChange={setDemo} label="Demo" />

                    {user ? (
                        <>
                            {/* Avatar (image if exists) */}
                            <button
                                onClick={() => nav(profilePath)}
                                title="Profile"
                                className="grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-zinc-800 bg-zinc-950 text-zinc-100 hover:bg-zinc-900"
                            >
                                {avatarUrl ? (
                                    <img
                                        src={avatarUrl}
                                        alt="avatar"
                                        className="h-full w-full object-cover"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <span className="text-sm font-semibold">{avatarLetter}</span>
                                )}
                            </button>

                            {user.verified ? <VerifiedBadge /> : null}

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
