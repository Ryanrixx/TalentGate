import AppShell from "../components/AppShell";
import { getUser } from "../lib/auth";

export default function EmployerProfile() {
    const user = getUser();
    return (
        <AppShell>
            <h1 className="text-2xl font-semibold">Employer Profile</h1>
            <p className="muted mt-2">Company identity + verification later.</p>

            <div className="mt-6 rounded-2xl border border-zinc-900 bg-zinc-950/40 p-5">
                <div className="text-sm text-zinc-400">Company / Name</div>
                <div className="mt-1 text-zinc-200">{user?.name ?? "—"}</div>
            </div>
        </AppShell>
    );
}
