import AppShell from "../components/AppShell";
import { getUser } from "../lib/auth";

export default function JobSeekerProfile() {
    const user = getUser();
    return (
        <AppShell>
            <h1 className="text-2xl font-semibold">Job Seeker Profile</h1>
            <p className="muted mt-2">Single evolving profile — apply everywhere.</p>

            <div className="mt-6 grid gap-4">
                <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5">
                    <div className="text-sm text-zinc-400">Name</div>
                    <div className="mt-1 text-zinc-200">{user?.name ?? "—"}</div>
                </div>

                <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5">
                    <div className="text-sm text-zinc-400">Next</div>
                    <div className="mt-1 text-zinc-200">Skills, links, experience, resume builder.</div>
                </div>
            </div>
        </AppShell>
    );
}
