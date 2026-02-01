import React, { useEffect, useMemo, useState } from "react";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Select } from "../../components/ui/Select";
import { EmptyState } from "../../components/ui/EmptyState";
import { Skeleton } from "../../components/ui/Skeleton";
import { employerApplicants, listJobs } from "../../services/job.service";
import type { JobDTO } from "../../types";
import { getDemoMode } from "../../utils/demo";

export function EmployerApplicants() {
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const handler = () => setTick((x) => x + 1);
        window.addEventListener("storage", handler);
        return () => window.removeEventListener("storage", handler);
    }, []);
    const demo = useMemo(() => getDemoMode(), [tick]);

    const [jobs, setJobs] = useState<JobDTO[]>([]);
    const [jobId, setJobId] = useState<string>("");
    const [rows, setRows] = useState<any[]>([]);
    const [loadingJobs, setLoadingJobs] = useState(true);
    const [loadingRows, setLoadingRows] = useState(false);

    useEffect(() => {
        (async () => {
            setLoadingJobs(true);
            try {
                if (demo) {
                    const j = [
                        { id: "d1", title: "Frontend Intern (React)", companyName: "TalentGate Official", location: "Remote", type: "internship", description: "", createdAt: "" },
                        { id: "d2", title: "Backend Intern (Node)", companyName: "Nova Labs", location: "Bengaluru", type: "internship", description: "", createdAt: "" },
                    ] as JobDTO[];
                    setJobs(j);
                    setJobId(j[0].id);
                    return;
                }
                const out = await listJobs();
                setJobs(out.jobs);
                if (out.jobs?.[0]?.id) setJobId(out.jobs[0].id);
            } finally {
                setLoadingJobs(false);
            }
        })();
    }, [demo]);

    async function fetchApplicants() {
        if (!jobId) return;
        setLoadingRows(true);
        try {
            if (demo) {
                setRows([
                    { id: "x1", seekerEmail: "seeker@talentgate.com", createdAt: new Date().toISOString() },
                    { id: "x2", seekerEmail: "arun.dev@domain.com", createdAt: new Date(Date.now() - 3600_000).toISOString() },
                ]);
                return;
            }
            const out = await employerApplicants(jobId);
            setRows(out.applicants || []);
        } finally {
            setLoadingRows(false);
        }
    }

    useEffect(() => {
        fetchApplicants();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jobId, demo]);

    const selectedJob = jobs.find((j) => j.id === jobId);

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold">Applicants</h1>
                    <p className="text-sm text-zinc-500">Review candidates — swipe shortlist UI tomorrow.</p>
                </div>
                <Badge>employer</Badge>
            </div>

            <Card className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="text-sm text-zinc-500">
                    Select a job to view applicants
                </div>
                <div className="flex w-full gap-2 md:w-[520px]">
                    {loadingJobs ? (
                        <Skeleton className="h-10 w-full" />
                    ) : (
                        <Select value={jobId} onChange={(e) => setJobId(e.target.value)}>
                            {jobs.map((j) => (
                                <option key={j.id} value={j.id}>
                                    {j.title} — {j.companyName}
                                </option>
                            ))}
                        </Select>
                    )}
                    <Button variant="secondary" onClick={fetchApplicants} disabled={loadingRows || !jobId}>
                        {loadingRows ? "Loading..." : "Refresh"}
                    </Button>
                </div>
            </Card>

            {selectedJob && (
                <Card className="space-y-1">
                    <div className="text-sm font-semibold">{selectedJob.title}</div>
                    <div className="text-sm text-zinc-500">
                        {selectedJob.companyName} • {selectedJob.location}
                    </div>
                </Card>
            )}

            {loadingRows ? (
                <div className="grid gap-3">
                    <Card className="space-y-3">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-4 w-2/3" />
                    </Card>
                    <Card className="space-y-3">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-4 w-2/3" />
                    </Card>
                </div>
            ) : rows.length === 0 ? (
                <EmptyState
                    title="No applicants yet"
                    description="When seekers apply, they appear here. Toggle Demo for screenshot-ready applicants."
                />
            ) : (
                <div className="grid gap-3">
                    {rows.map((a) => (
                        <Card key={a.id} className="flex items-center justify-between gap-3">
                            <div>
                                <div className="text-sm font-semibold">{a.seekerEmail}</div>
                                <div className="text-xs text-zinc-600 mt-1">
                                    Applied {new Date(a.createdAt).toLocaleString()}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="secondary" onClick={() => alert("Shortlist logic tomorrow (UI Day 2).")}>
                                    Shortlist
                                </Button>
                                <Button variant="ghost" onClick={() => alert("Reject logic tomorrow (UI Day 2).")}>
                                    Reject
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
