import AppShell from "../components/AppShell";

export default function Communities() {
    return (
        <AppShell>
            <h1 className="text-2xl font-semibold">Communities</h1>
            <p className="muted mt-2">Groups like “React”, “MERN Interns”, “DSA Grind”.</p>
            <div className="mt-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5">
                <p className="text-sm text-zinc-300">Coming next: join/leave + feed.</p>
            </div>
        </AppShell>
    );
}
