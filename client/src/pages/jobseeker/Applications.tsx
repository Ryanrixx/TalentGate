import React, { useEffect, useMemo, useState } from "react";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { EmptyState } from "../../components/ui/EmptyState";
import { Skeleton } from "../../components/ui/Skeleton";
import { myApplications } from "../../services/job.service";
import { getDemoMode } from "../../utils/demo";

export function SeekerApplications() {
    const [apps, setApps] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const handler = () => setTick((x) => x + 1);
        window.addEventListener("storage", handler);
        return () => window.removeEventListener("storage", handler);
    }, []);
    const demo = useMemo(() => getDemoMode(), [tick]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                if (demo) {
                    setApps([
                        { id: "a1", jobTitle: "Frontend Intern (React)", companyName: "TalentGate Official", createdAt: new Date().toISOString(), status: "pending" },
                        { id: "a2", jobTitle: "Backend Intern (Node)", companyName: "Nova Labs", createdAt: new Date(Date.now() - 86400000).toISOString(), status: "shortlisted" },
                    ]);
                    return;
                }
                const out = await myApplications();
                setApps(out.applications || []);
            } finally {
                setLoading(false);
            }
        })();
    }, [demo]);

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold">Applications</h1>
                    <p className="text-sm text-zinc-500">Track your job applications and outcomes.</p>
                </div>
                <Badge>job seeker</Badge>
            </div>

            {loading ? (
                <div className="grid gap-3">
                    <Card className="space-y-3">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/3" />
                    </Card>
                    <Card className="space-y-3">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/3" />
                    </Card>
                </div>
            ) : apps.length === 0 ? (
                <EmptyState
                    title="No applications yet"
                    description="Go to Jobs and apply. Toggle Demo mode for screenshot-ready history."
                />
            ) : (
                <div className="grid gap-3">
                    {apps.map((a) => (
                        <Card key={a.id} className="flex items-start justify-between gap-3">
                            <div>
                                <div className="text-sm font-semibold">{a.jobTitle}</div>
                                <div className="text-sm text-zinc-500">{a.companyName}</div>
                                <div className="mt-2 text-xs text-zinc-600">
                                    {new Date(a.createdAt).toLocaleString()}
                                </div>
                            </div>
                            <Badge className={a.status === "shortlisted" ? "text-emerald-200 border-emerald-900 bg-emerald-950/20" : ""}>
                                {a.status ?? "submitted"}
                            </Badge>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
