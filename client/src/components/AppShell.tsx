import type {ReactNode} from "react";
import { Link, NavLink } from "react-router-dom";
import { getUser, clearAuth } from "../lib/auth";
import { useNavigate } from "react-router-dom";

function Item({ to, label }: { to: string; label: string }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                [
                    "block rounded-xl px-3 py-2 text-sm transition",
                    isActive ? "bg-white text-zinc-950" : "text-zinc-200 hover:bg-zinc-900/60",
                ].join(" ")
            }
        >
            {label}
        </NavLink>
    );
}

export default function AppShell({ children }: { children: ReactNode }) {
    const user = getUser();
    const navigate = useNavigate();

    return (
        <div className="page">
            <div className="bg-decor">
                <div className="bg-decor-1" />
                <div className="bg-decor-2" />
            </div>

            <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur">
                <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-4">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="grid h-9 w-9 place-items-center rounded-xl bg-white text-zinc-950 font-bold">
                            TG
                        </div>
                        <div className="leading-tight">
                            <div className="font-semibold">TalentGate</div>
                            <div className="text-xs text-zinc-400">Hiring • Matching • Swipe</div>
                        </div>
                    </Link>

                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                        <span className="text-zinc-400">{user?.role ?? "guest"}</span>
                        {user ? (
                            <button
                                className="btn btn-ghost"
                                onClick={() => {
                                    clearAuth();
                                    navigate("/signin");
                                }}
                            >
                                Log out
                            </button>
                        ) : (
                            <Link className="btn btn-ghost" to="/signin">
                                Sign in
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            <main className="mx-auto grid max-w-screen-2xl grid-cols-12 gap-6 px-6 py-10">
                <aside className="col-span-12 md:col-span-3">
                    <div className="card card-inner">
                        <div className="text-xs font-semibold text-zinc-400">Navigation</div>
                        <div className="mt-3 space-y-1">
                            <Item to="/jobs" label="Jobs" />
                            <Item to="/trending" label="Trending" />
                            <Item to="/communities" label="Communities" />
                            <Item to="/posts" label="Posts" />
                            <div className="mt-3 border-t border-zinc-900 pt-3" />
                            <Item to="/jobseeker" label="Job Seeker Dashboard" />
                            <Item to="/jobseeker/profile" label="Job Seeker Profile" />
                            <Item to="/employer" label="Employer Dashboard" />
                            <Item to="/employer/profile" label="Employer Profile" />
                        </div>
                    </div>
                </aside>

                <section className="col-span-12 md:col-span-9">
                    <div className="card card-inner">{children}</div>
                </section>
            </main>

            <footer className="pb-10 text-center text-xs text-zinc-500">
                © {new Date().getFullYear()} TalentGate
            </footer>
        </div>
    );
}
