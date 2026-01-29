import { useState } from "react";
import { Link } from "react-router-dom";
import AuthShell from "../components/AuthShell.tsx";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../lib/api";
import { saveAuth, type AuthResponse } from "../lib/auth";

type Role = "jobseeker" | "employer";

export default function CreateAccount() {
    const [role, setRole] = useState<Role>("jobseeker");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await apiPost<AuthResponse, { role: Role; name: string; email: string; password: string }>(
                "/auth/signup",
                { role, name, email, password }
            );

            saveAuth(data.token, data.user);

            // Temporary redirects (we'll create real dashboards later)
            navigate(data.user.role === "employer" ? "/employer" : "/jobseeker");
        } catch (err: any) {
            setError(err?.message || "Signup failed");
        }
    }

    return (
        <AuthShell title="Create account" subtitle="Choose a role — job seeker or employer — then continue.">
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-2">
                    <div className="grid grid-cols-2 gap-2">
                        <RoleBtn active={role === "jobseeker"} onClick={() => setRole("jobseeker")}>
                            Job Seeker
                        </RoleBtn>
                        <RoleBtn active={role === "employer"} onClick={() => setRole("employer")}>
                            Employer
                        </RoleBtn>
                    </div>
                </div>

                <Field label={role === "employer" ? "Company / Name" : "Full Name"}>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        required
                        className="input"
                        placeholder={role === "employer" ? "Corta, TalentGate Labs..." : "Ryan Rixx"}
                    />
                </Field>

                <Field label="Email">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                        className="input"
                        placeholder="you@example.com"
                    />
                </Field>

                <Field label="Password">
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        required
                        className="input"
                        placeholder="Create a strong password"
                    />
                </Field>

                {error ? (
                    <div className="rounded-xl border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-200">
                        {error}
                    </div>
                ) : null}

                <button
                    disabled={loading}
                    className="btn btn-primary w-full py-3 disabled:opacity-60"
                >
                    {loading ? "Creating..." : "Create account"}
                </button>

                <div className="text-sm text-zinc-400">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-zinc-200 hover:underline">
                        Sign in
                    </Link>
                </div>
            </form>
        </AuthShell>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <label className="block">
            <div className="mb-2 text-xs font-medium text-zinc-300">{label}</div>
            {children}
        </label>
    );
}

function RoleBtn({
                     active,
                     onClick,
                     children,
                 }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "btn btn-primary w-full py-3 disabled:opacity-60",
                active ? "bg-white text-zinc-950" : "bg-zinc-950/40 text-zinc-200 hover:bg-zinc-900/60",
            ].join(" ")}
        >
            {children}
        </button>
    );
}
