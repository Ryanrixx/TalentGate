import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../store/auth.store";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Divider } from "../../components/ui/Divider";

export default function SignIn() {
    const nav = useNavigate();
    const { login, user } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSignIn() {
        try {
            setLoading(true);
            setError(null);

            await login(email, password);

            // redirect after login
            if (!user?.verified) {
                nav("/auth/verify");
            } else {
                nav("/feed");
            }
        } catch (e: any) {
            setError(e.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
            <Card className="w-full max-w-md space-y-5">
                <div>
                    <h1 className="text-xl font-semibold">Sign in</h1>
                    <p className="text-sm text-zinc-500">
                        Welcome back to TalentGate
                    </p>
                </div>

                {error && (
                    <div className="rounded-xl border border-red-900 bg-red-950/40 px-3 py-2 text-sm text-red-200">
                        {error}
                    </div>
                )}

                <Input
                    label="Email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                    className="w-full"
                    disabled={loading}
                    onClick={handleSignIn}
                >
                    {loading ? "Signing in..." : "Sign In"}
                </Button>

                <Divider />

                <p className="text-sm text-zinc-500 text-center">
                    Don’t have an account?{" "}
                    <Link
                        to="/auth/create-account"
                        className="text-zinc-200 underline"
                    >
                        Create one
                    </Link>
                </p>
            </Card>
        </div>
    );
}
