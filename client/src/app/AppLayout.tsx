import { Outlet } from "react-router-dom";
import { AppNav } from "../components/nav/AppNav";

export function AppLayout() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <AppNav />
            <main className="mx-auto w-full max-w-6xl px-4 py-6">
                <Outlet />
            </main>
        </div>
    );
}
