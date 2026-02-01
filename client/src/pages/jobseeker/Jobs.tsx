import React, { useEffect, useMemo, useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { EmptyState } from "../../components/ui/EmptyState";
import { Skeleton } from "../../components/ui/Skeleton";
import { listJobs, applyToJob } from "../../services/job.service";
import type { JobDTO } from "../../types";
import { getDemoMode } from "../../utils/demo";

export function SeekerJobs() {
    const [jobs, setJobs] = useState<JobDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);

    const [q, setQ] = useState("");
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const handler = () => setTick((x) => x + 1);
        window.addEventListener("storage", handler);
        return () => window.removeEventListener("storage", handler);
    }, []);
    const demo = useMemo(() => getDemoMode(), [tick]);

    async function load() {
        setLoading(true);
        setErr(null);
        try {
            if (demo) {
                setJobs([
                    {
                        id: "d1",
                        title: "Frontend Intern (React)",
                        companyName: "TalentGate Official",
                        location: "Remote",
                        type: "internship",
                        description: "Build app-like UI, ship components, improve UX. Tailwind + React.",
                        createdAt: new Date().toISOString(),
                    },
                    {
                        id: "d2",
                        title: "Backend Intern (Node/Express)",
                        companyName: "Nova Labs",
                        location: "Bengaluru",
                        type: "internship",
                        description: "APIs, MongoDB, auth, and scalable services. Build real product features.",
                        createdAt: new Date().toISOString(),
                    },
                ]);
                return;
            }

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [demo]);

    const filtered = useMemo(() => {
        const s = q.trim().toLowerCase();
        if (!s) return jobs;
        return jobs.filter(
            (j) =>
                j.title.toLowerCase().includes(s) ||
                j.companyName.toLowerCase().includes(s) ||
                j.location.toLowerCase().includes(s)
        );
    }, [jobs, q]);

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold">Jobs</h1>
                    <p className="text-sm text-zinc-500">Apply now — later we’ll do swipe apply + AI resume tweaks.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" onClick={load}>Refresh</Button>
                </div>
            </div>

            <Card className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2">
                    <Badge>filters</Badge>
                    <div className="text-sm text-zinc-500">Search by title/company/location</div>
                </div>
                <div className="w-full md:w-[420px]">
                    <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search jobs..." />
                </div>
            </Card>

            {err && (
                <div className="rounded-xl border border-red-900 bg-red-950/40 px-3 py-2 text-sm text-red-200">
                    {err}
                </div>
            )}

            {loading ? (
                <div className="grid gap-3">
                    <Card className="space-y-3">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-20 w-full" />
                    </Card>
                    <Card className="space-y-3">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-20 w-full" />
                    </Card>
                </div>
            ) : filtered.length === 0 ? (
                <EmptyState
                    title="No matching jobs"
                    description="Try a different keyword or toggle Demo mode for screenshot-ready jobs."
                />
            ) : (
                <div className="grid gap-3">
                    {filtered.map((j) => (
                        <Card key={j.id} className="space-y-3">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                    <div className="text-lg font-semibold">{j.title}</div>
                                    <div className="text-sm text-zinc-500">
                                        {j.companyName} • {j.location}
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        <Badge>{j.type}</Badge>
                                        <Badge>verified hiring</Badge>
                                    </div>
                                </div>
                                <Button
                                    onClick={async () => {
                                        if (demo) return alert("Demo mode: apply is disabled.");
                                        await applyToJob(j.id);
                                        alert("Applied ✅");
                                    }}
                                >
                                    Apply
                                </Button>
                            </div>
                            <div className="text-sm text-zinc-300 leading-relaxed">
                                {j.description}
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
