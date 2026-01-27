import { useState } from "react";
import { Link } from "react-router-dom";
import AuthShell from "../components/AuthShell";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Backend will be connected later (Phase: server auth)
            await new Promise((r) => setTimeout(r, 500));
            alert("Frontend works ✅ (backend auth next)");
        } catch (err: any) {
            setError(err?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthShell title="Sign in" subtitle="Access your job seeker or employer dashboard.">
            <form onSubmit={onSubmit} className="space-y-4">
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
                        placeholder="••••••••"
                    />
                </Field>

                {error ? (
                    <div className="rounded-xl border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-200">
                        {error}
                    </div>
                ) : null}

                <button
                    disabled={loading}
                    className="btn btn-primary w-full py-3"
                >
                    {loading ? "Signing in..." : "Sign in"}
                </button>

                <div className="flex items-center justify-between text-sm text-zinc-400">
          <span>
            New here?{" "}
              <Link to="/signup" className="text-zinc-200 hover:underline">
              Create account
            </Link>
          </span>

                    <button
                        type="button"
                        className="text-zinc-200 hover:underline"
                        onClick={() => alert("We’ll add Forgot Password later")}
                    >
                        Forgot password?
                    </button>
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
