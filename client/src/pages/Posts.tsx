import AppShell from "../components/AppShell";

export default function Posts() {
    return (
        <AppShell>
            <h1 className="text-2xl font-semibold">Posts</h1>
            <p className="muted mt-2">Short updates + hiring announcements.</p>
            <div className="mt-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5">
                <p className="text-sm text-zinc-300">Coming next: create post + comments.</p>
            </div>
        </AppShell>
    );
}
