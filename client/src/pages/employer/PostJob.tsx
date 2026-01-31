import React, { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { Button } from "../../components/ui/Button";
import { createJob } from "../../services/job.service";
import type { JobDTO } from "../../types";

export function EmployerPostJob() {
    const [title, setTitle] = useState("Frontend Intern");
    const [companyName, setCompanyName] = useState("TalentGate Inc.");
    const [location, setLocation] = useState("Remote");
    const [type, setType] = useState<JobDTO["type"]>("internship");
    const [description, setDescription] = useState("Build UI components, improve UX, and ship features.");

    const [loading, setLoading] = useState(false);

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-semibold">Post a Job</h1>

            <Card className="space-y-3">
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job title" />
                <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company name" />
                <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />

                <Select value={type} onChange={(e) => setType(e.target.value as JobDTO["type"])}>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="internship">Internship</option>
                    <option value="contract">Contract</option>
                </Select>

                <textarea
                    className="w-full min-h-[120px] rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:ring-2 focus:ring-zinc-600"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Job description"
                />

                <Button
                    disabled={loading}
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
