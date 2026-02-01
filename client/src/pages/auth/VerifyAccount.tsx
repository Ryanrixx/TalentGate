import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
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
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h1 className="text-xl font-semibold">Verify account</h1>
                        <p className="mt-1 text-sm text-zinc-500">
                            Verification unlocks posting/applying + interactions.
                        </p>
                    </div>
                    <Badge className="text-amber-200 border-amber-900 bg-amber-950/30">
                        read-only
                    </Badge>
                </div>

                {err && (
                    <div className="rounded-xl border border-red-900 bg-red-950/40 px-3 py-2 text-sm text-red-200">
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
                            const out = await api<{ token: string; user: any }>(
                                "/verification/submit",
                                { method: "POST", body: JSON.stringify({ name, age, email, phone }) }
                            );
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

                <p className="text-xs text-zinc-600">
                    Later: OTP/email verification + one account per person/company.
                </p>
            </Card>
        </div>
    );
}
