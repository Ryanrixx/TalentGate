import React, { useEffect, useState } from "react";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { getMyProfile, saveMyProfile } from "../../services/profile.service";

export function SeekerProfile() {
    const [headline, setHeadline] = useState("");
    const [skills, setSkills] = useState("react, node, mongodb");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const out = await getMyProfile();
                if (out?.profile?.headline) setHeadline(out.profile.headline);
                if (out?.profile?.skills?.length) setSkills(out.profile.skills.join(", "));
            } catch {}
        })();
    }, []);

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-semibold">Your Living Profile</h1>

            <Card className="space-y-3">
                <div className="space-y-2">
                    <label className="text-xs text-zinc-400">Headline</label>
                    <Input value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Full-stack + AI developer..." />
                </div>

                <div className="space-y-2">
                    <label className="text-xs text-zinc-400">Skills (comma separated)</label>
                    <Input value={skills} onChange={(e) => setSkills(e.target.value)} />
                </div>

                <Button
                    disabled={loading}
                    onClick={async () => {
                        setLoading(true);
                        try {
                            await saveMyProfile({
                                role: "jobseeker",
                                headline,
                                skills: skills.split(",").map((s: string) => s.trim()).filter(Boolean),
                            });
                        } finally {
                            setLoading(false);
                        }
                    }}
                >
                    {loading ? "Saving..." : "Save Profile"}
                </Button>
            </Card>
        </div>
    );
}
