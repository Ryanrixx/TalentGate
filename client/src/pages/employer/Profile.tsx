import React, { useEffect, useState } from "react";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { getMyProfile, saveMyProfile } from "../../services/profile.service";

export function EmployerProfile() {
    const [companyName, setCompanyName] = useState("");
    const [website, setWebsite] = useState("");
    const [loading, setLoading] = useState(false);

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
            <h1 className="text-2xl font-semibold">Company Profile</h1>

            <Card className="space-y-3">
                <div className="space-y-2">
                    <label className="text-xs text-zinc-400">Company name</label>
                    <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Your company" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs text-zinc-400">Website</label>
                    <Input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://..." />
                </div>

                <Button
                    disabled={loading}
                    onClick={async () => {
                        setLoading(true);
                        try {
                            await saveMyProfile({ role: "employer", companyName, website });
                        } finally {
                            setLoading(false);
                        }
                    }}
                >
                    {loading ? "Saving..." : "Save"}
                </Button>
            </Card>
        </div>
    );
}
