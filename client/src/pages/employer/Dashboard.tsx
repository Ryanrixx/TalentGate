import React, { useEffect, useMemo, useState } from "react";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Divider } from "../../components/ui/Divider";
import { getDemoMode } from "../../utils/demo";

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl border border-zinc-900 bg-zinc-950 px-4 py-4">
            <div className="text-xs text-zinc-500">{label}</div>
            <div className="mt-1 text-xl font-semibold">{value}</div>
        </div>
    );
}

export function EmployerDashboard() {
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const handler = () => setTick((x) => x + 1);
        window.addEventListener("storage", handler);
        return () => window.removeEventListener("storage", handler);
    }, []);
    const demo = useMemo(() => getDemoMode(), [tick]);

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold">Dashboard</h1>
                    <p className="text-sm text-zinc-500">Verified hiring workspace — clean pipeline incoming.</p>
                </div>
                <Badge>employer</Badge>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
                <Stat label="Jobs posted" value={demo ? "3" : "—"} />
                <Stat label="Applicants" value={demo ? "18" : "—"} />
                <Stat label="Shortlisted" value={demo ? "5" : "—"} />
            </div>

            <Card className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <div className="text-sm font-semibold">Next best actions</div>
                        <div className="text-sm text-zinc-500">Create jobs and review applicants faster.</div>
                    </div>
                    <Button variant="secondary" onClick={() => alert("Swipe review UI tomorrow (UI Day 2).")}>
                        Swipe review
                    </Button>
                </div>
                <Divider />
                <div className="grid gap-2 text-sm text-zinc-300">
                    <div>• Post 1 internship with clear requirements.</div>
                    <div>• Review applicants and shortlist top 5.</div>
                    <div>• Add company profile for trust.</div>
                </div>
            </Card>
        </div>
    );
}
