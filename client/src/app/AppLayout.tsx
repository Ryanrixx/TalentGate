import React from "react";
import { Outlet } from "react-router-dom";
import { AppNav } from "../components/nav/AppNav";

export function AppLayout() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <div className="pointer-events-none fixed inset-0 opacity-60">
                <div className="absolute -top-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-zinc-800/30 blur-3xl" />
                <div className="absolute top-40 right-[-120px] h-[320px] w-[320px] rounded-full bg-zinc-700/20 blur-3xl" />
            </div>

            <AppNav />

            <main className="relative mx-auto w-full max-w-6xl px-4 py-6">
                <Outlet />
            </main>
        </div>
    );
}
