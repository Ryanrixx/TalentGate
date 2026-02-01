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

export function SeekerDashboard() {
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
                    <p className="text-sm text-zinc-500">Your verified workspace — optimized for fast applications.</p>
                </div>
                <Badge>job seeker</Badge>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
                <Stat label="Profile completeness" value={demo ? "82%" : "—"} />
                <Stat label="Applications" value={demo ? "7" : "—"} />
                <Stat label="Shortlisted" value={demo ? "2" : "—"} />
            </div>

            <Card className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <div className="text-sm font-semibold">Next best actions</div>
                        <div className="text-sm text-zinc-500">Keep your living profile fresh for 1-click applies.</div>
                    </div>
                    <Button variant="secondary" onClick={() => alert("Resume builder UI tomorrow.")}>
                        Resume tools
                    </Button>
                </div>
                <Divider />
                <div className="grid gap-2 text-sm text-zinc-300">
                    <div>• Add 3 more skills to increase match signals.</div>
                    <div>• Upload latest resume version.</div>
                    <div>• Apply to 5 new internships this week.</div>
                </div>
            </Card>
        </div>
    );
}
