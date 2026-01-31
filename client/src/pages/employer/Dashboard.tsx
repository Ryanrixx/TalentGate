import React from "react";
import { Card } from "../../components/ui/Card";

export function EmployerDashboard() {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-semibold">Employer Dashboard</h1>
            <Card>
                <p className="text-sm text-zinc-300">
                    Verified-only area. Later: pipeline analytics, AI match signals, swipe shortlist.
                </p>
            </Card>
        </div>
    );
}
