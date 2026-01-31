import AppShell from "../components/AppShell";

export default function Trending() {
    return (
        <AppShell>
            <h1 className="text-2xl font-semibold">Trending</h1>
            <p className="muted mt-2">What’s hot across jobs, communities, and posts.</p>
            <div className="mt-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5">
                <p className="text-sm text-zinc-300">Coming next: tags + ranking.</p>
            </div>
        </AppShell>
    );
}
