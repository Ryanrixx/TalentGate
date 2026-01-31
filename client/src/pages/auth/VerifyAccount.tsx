import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { api } from "../../services/api";
import { useAuth } from "../../store/auth.store";

export function VerifyAccount() {
    const nav = useNavigate();
    const { user, setAuth } = useAuth();

    const [name, setName] = useState("");
    const [age, setAge] = useState<number>(18);
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState("");
    const [err, setErr] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    if (!user) return null;

    return (
        <div className="mx-auto max-w-md">
            <Card className="space-y-4">
                <div>
                    <h1 className="text-xl font-semibold">Verify your account</h1>
                    <p className="text-sm text-zinc-500">
                        Unverified users are <span className="text-zinc-200">read-only</span>. Verify to post/apply.
                    </p>
                </div>

                {err && (
                    <div className="rounded-xl border border-red-900 bg-red-950 px-3 py-2 text-sm text-red-200">
                        {err}
                    </div>
                )}

                <div className="grid gap-3">
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
                    <Input value={age} onChange={(e) => setAge(Number(e.target.value))} placeholder="Age" type="number" />
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
                </div>

                <Button
                    className="w-full"
                    disabled={loading}
                    onClick={async () => {
                        try {
                            setLoading(true);
                            setErr(null);
                            const out = await api<{ token: string; user: any }>("/verification/submit", {
                                method: "POST",
                                body: JSON.stringify({ name, age, email, phone }),
                            });
                            setAuth(out.token, out.user);
                            nav("/feed");
                        } catch (e: any) {
                            setErr(e.message || "Verification failed");
                        } finally {
                            setLoading(false);
                        }
                    }}
                >
                    {loading ? "Submitting..." : "Submit verification"}
                </Button>
            </Card>
        </div>
    );
}
