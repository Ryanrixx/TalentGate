import React, { useEffect, useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { listJobs, applyToJob } from "../../services/job.service";
import type { JobDTO } from "../../types";

export function SeekerJobs() {
    const [jobs, setJobs] = useState<JobDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);

    async function load() {
        setLoading(true);
        setErr(null);
        try {
            const out = await listJobs();
            setJobs(out.jobs);
        } catch (e: any) {
            setErr(e.message || "Failed to load jobs");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <div className="space-y-4">
            <div className="flex items-end justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold">Jobs</h1>
                    <p className="text-sm text-zinc-500">Apply using your living profile (auto-fill later).</p>
                </div>
                <Button onClick={load} className="bg-zinc-900 text-zinc-100 border border-zinc-800 hover:bg-zinc-800">
                    Refresh
                </Button>
            </div>

            {err && (
                <div className="rounded-xl border border-red-900 bg-red-950 px-3 py-2 text-sm text-red-200">
                    {err}
                </div>
            )}

            {loading ? (
                <Card>Loading jobs...</Card>
            ) : jobs.length === 0 ? (
                <Card>No jobs yet. Ask an employer account to post one.</Card>
            ) : (
                <div className="grid gap-3">
                    {jobs.map((j) => (
                        <Card key={j.id} className="space-y-2">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <div className="text-lg font-semibold">{j.title}</div>
                                    <div className="text-sm text-zinc-500">{j.companyName} • {j.location}</div>
                                </div>
                                <Button
                                    className="shrink-0"
                                    onClick={async () => {
                                        await applyToJob(j.id);
                                        alert("Applied ✅");
                                    }}
                                >
                                    Apply
                                </Button>
                            </div>
                            <p className="text-sm text-zinc-300 line-clamp-3">{j.description}</p>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
