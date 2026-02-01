import React, { useEffect, useState } from "react";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { getMyProfile, saveMyProfile } from "../../services/profile.service";

export function EmployerProfile() {
    const [companyName, setCompanyName] = useState("");
    const [website, setWebsite] = useState("");
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const out = await getMyProfile();
                if (out?.profile?.companyName) setCompanyName(out.profile.companyName);
                if (out?.profile?.website) setWebsite(out.profile.website);
            } catch {}
        })();
    }, []);

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold">Company Profile</h1>
                    <p className="text-sm text-zinc-500">Build trust — verified employer identity + company details.</p>
                </div>
                <Badge>employer</Badge>
            </div>

            <Card className="space-y-3">
                <div className="space-y-2">
                    <label className="text-xs text-zinc-400">Company name</label>
                    <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Your company" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs text-zinc-400">Website</label>
                    <Input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://..." />
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        disabled={loading}
                        onClick={async () => {
                            setLoading(true);
                            setSaved(false);
                            try {
                                await saveMyProfile({ role: "employer", companyName, website });
                                setSaved(true);
                                setTimeout(() => setSaved(false), 1500);
                            } finally {
                                setLoading(false);
                            }
                        }}
                    >
                        {loading ? "Saving..." : "Save changes"}
                    </Button>
                    {saved ? (
                        <span className="text-sm text-emerald-300">Saved ✅</span>
                    ) : (
                        <span className="text-sm text-zinc-600">Keep it updated</span>
                    )}
                </div>
            </Card>
        </div>
    );
}
