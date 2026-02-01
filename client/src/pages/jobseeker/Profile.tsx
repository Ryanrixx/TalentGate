import React, { useEffect, useState } from "react";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { getMyProfile, saveMyProfile } from "../../services/profile.service";

export function SeekerProfile() {
    const [headline, setHeadline] = useState("");
    const [skills, setSkills] = useState("react, node, mongodb");
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

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
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold">Living Profile</h1>
                    <p className="text-sm text-zinc-500">This profile auto-fills job applications later.</p>
                </div>
                <Badge>job seeker</Badge>
            </div>

            <Card className="space-y-3">
                <div className="space-y-2">
                    <label className="text-xs text-zinc-400">Headline</label>
                    <Input
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        placeholder="Full-stack + AI developer..."
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs text-zinc-400">Skills (comma separated)</label>
                    <Input value={skills} onChange={(e) => setSkills(e.target.value)} />
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="primary"
                        disabled={loading}
                        onClick={async () => {
                            setLoading(true);
                            setSaved(false);
                            try {
                                await saveMyProfile({
                                    role: "jobseeker",
                                    headline,
                                    skills: skills
                                        .split(",")
                                        .map((s: string) => s.trim())
                                        .filter(Boolean),
                                });
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
                        <span className="text-sm text-zinc-600">Autosave later</span>
                    )}
                </div>
            </Card>

            <Card className="space-y-2">
                <div className="text-sm font-semibold">Resume versions</div>
                <div className="text-sm text-zinc-500">
                    Upload + manage versions tomorrow (UI Day 2).
                </div>
                <Button variant="secondary" onClick={() => alert("Resume upload UI tomorrow.")}>
                    Upload resume
                </Button>
            </Card>
        </div>
    );
}
