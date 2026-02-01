import React, { useMemo, useState, useEffect } from "react";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { Button } from "../../components/ui/Button";
import { Textarea } from "../../components/ui/Textarea";
import { Badge } from "../../components/ui/Badge";
import { createJob } from "../../services/job.service";
import type { JobDTO } from "../../types";
import { getDemoMode } from "../../utils/demo";

export function EmployerPostJob() {
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const handler = () => setTick((x) => x + 1);
        window.addEventListener("storage", handler);
        return () => window.removeEventListener("storage", handler);
    }, []);
    const demo = useMemo(() => getDemoMode(), [tick]);

    const [title, setTitle] = useState("Frontend Intern (React)");
    const [companyName, setCompanyName] = useState("TalentGate Official");
    const [location, setLocation] = useState("Remote");
    const [type, setType] = useState<JobDTO["type"]>("internship");
    const [description, setDescription] = useState(
        "We’re hiring a React intern to build app-like UI, ship components, and improve UX.\n\nRequirements:\n- React + TypeScript\n- Tailwind CSS\n- Basic API integration"
    );

    const [loading, setLoading] = useState(false);

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold">Post a Job</h1>
                    <p className="text-sm text-zinc-500">Create clean postings that attract real candidates.</p>
                </div>
                <Badge>employer</Badge>
            </div>

            {demo && (
                <div className="rounded-xl border border-zinc-900 bg-zinc-950/60 px-3 py-2 text-sm text-zinc-400">
                    Demo mode is ON — posting is disabled (for screenshots).
                </div>
            )}

            <Card className="space-y-3">
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job title" />
                <div className="grid gap-3 md:grid-cols-2">
                    <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company name" />
                    <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
                </div>

                <Select value={type} onChange={(e) => setType(e.target.value as JobDTO["type"])}>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="internship">Internship</option>
                    <option value="contract">Contract</option>
                </Select>

                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Job description" />

                <Button
                    disabled={loading || demo}
                    onClick={async () => {
                        setLoading(true);
                        try {
                            await createJob({ title, companyName, location, type, description });
                            alert("Posted ✅");
                        } finally {
                            setLoading(false);
                        }
                    }}
                >
                    {loading ? "Posting..." : "Post Job"}
                </Button>
            </Card>
        </div>
    );
}
