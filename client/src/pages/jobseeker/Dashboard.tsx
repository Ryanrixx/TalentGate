import React from "react";
import { Card } from "../../components/ui/Card";

export function SeekerDashboard() {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-semibold">Job Seeker Dashboard</h1>

            <Card>
                <p className="text-sm text-zinc-300">
                    Verified-only area. Later: ATS score, resume versions, quick apply, recommendations.
                </p>
            </Card>
        </div>
    );
}
