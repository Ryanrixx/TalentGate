import React, { useEffect, useState } from "react";
import { Card } from "../../components/ui/Card";
import { myApplications } from "../../services/job.service";

export function SeekerApplications() {
    const [apps, setApps] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const out = await myApplications();
                setApps(out.applications || []);
            } catch {}
        })();
    }, []);

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-semibold">Applications</h1>
            {apps.length === 0 ? (
                <Card>No applications yet.</Card>
            ) : (
                <div className="grid gap-3">
                    {apps.map((a) => (
                        <Card key={a.id}>
                            <div className="text-sm text-zinc-300">
                                Applied to <span className="text-zinc-100 font-medium">{a.jobTitle}</span>{" "}
                                at <span className="text-zinc-100 font-medium">{a.companyName}</span>
                            </div>
                            <div className="text-xs text-zinc-500 mt-1">{new Date(a.createdAt).toLocaleString()}</div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
