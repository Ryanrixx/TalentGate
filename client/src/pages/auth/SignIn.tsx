import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service";
import { useAuth } from "../../store/auth.store";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export function SignIn() {
    const nav = useNavigate();
    const { setAuth } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    return (
        <div className="mx-auto max-w-md">
            <Card className="space-y-4">
                <div>
                    <h1 className="text-xl font-semibold">Sign in</h1>
                    <p className="text-sm text-zinc-500">
                        Access shared surfaces. Verify to unlock job actions.
                    </p>
                </div>

                {err && (
                    <div className="rounded-xl border border-red-900 bg-red-950 px-3 py-2 text-sm text-red-200">
                        {err}
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-xs text-zinc-400">Email</label>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs text-zinc-400">Password</label>
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" type="password" />
                </div>

                <Button
                    className="w-full"
                    disabled={loading}
                    onClick={async () => {
                        try {
                            setLoading(true);
                            setErr(null);
                            const out = await login(email, password);
                            setAuth(out.token, out.user);
                            if (!out.user.verified) nav("/auth/verify");
                            else nav("/feed");
                        } catch (e: any) {
                            setErr(e.message || "Failed to sign in");
                        } finally {
                            setLoading(false);
                        }
                    }}
                >
                    {loading ? "Signing in..." : "Sign in"}
                </Button>

                <p className="text-sm text-zinc-500">
                    No account?{" "}
                    <Link className="text-zinc-200 underline" to="/auth/create-account">
                        Create one
                    </Link>
                </p>
            </Card>
        </div>
    );
}
