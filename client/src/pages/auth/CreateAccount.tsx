import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/auth.service";
import { useAuth } from "../../store/auth.store";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Select } from "../../components/ui/Select";
import { Divider } from "../../components/ui/Divider";
import type { UserRole } from "../../types";

export function CreateAccount() {
    const nav = useNavigate();
    const { setAuth } = useAuth();

    const [role, setRole] = useState<UserRole>("jobseeker");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    return (
        <div className="mx-auto max-w-md">
            <Card className="space-y-4">
                <div>
                    <h1 className="text-xl font-semibold">Create account</h1>
                    <p className="mt-1 text-sm text-zinc-500">
                        Pick a role now. Verification unlocks full access.
                    </p>
                </div>

                {err && (
                    <div className="rounded-xl border border-red-900 bg-red-950/40 px-3 py-2 text-sm text-red-200">
                        {err}
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-xs text-zinc-400">Role</label>
                    <Select
                        value={role}
                        onChange={(e) => setRole(e.target.value as UserRole)}
                    >
                        <option value="jobseeker">Job Seeker</option>
                        <option value="employer">Employer</option>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs text-zinc-400">Email</label>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@email.com"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs text-zinc-400">Password</label>
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min 8 chars"
                        type="password"
                    />
                </div>

                <Button
                    className="w-full"
                    disabled={loading}
                    onClick={async () => {
                        try {
                            setLoading(true);
                            setErr(null);
                            const out = await register(email, password, role);
                            setAuth(out.token, out.user);
                            nav("/auth/verify");
                        } catch (e: any) {
                            setErr(e.message || "Failed to create account");
                        } finally {
                            setLoading(false);
                        }
                    }}
                >
                    {loading ? "Creating..." : "Create"}
                </Button>

                <Divider />

                <p className="text-sm text-zinc-500">
                    Already have an account?{" "}
                    <Link className="text-zinc-200 underline" to="/auth/sign-in">
                        Sign in
                    </Link>
                </p>
            </Card>
        </div>
    );
}
