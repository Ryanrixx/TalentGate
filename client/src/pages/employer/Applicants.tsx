import React, { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { employerApplicants } from "../../services/job.service";

export function EmployerApplicants() {
    const [jobId, setJobId] = useState("");
    const [rows, setRows] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-semibold">Applicants</h1>

            <Card className="space-y-3">
                <div className="text-sm text-zinc-500">
                    Paste a Job ID to fetch applicants (simple MVP; later this becomes a nice pipeline UI).
                </div>

                <Input value={jobId} onChange={(e) => setJobId(e.target.value)} placeholder="Job ID..." />

                <Button
                    disabled={loading}
                    onClick={async () => {
                        setLoading(true);
                        try {
                            const out = await employerApplicants(jobId);
                            setRows(out.applicants || []);
                        } finally {
                            setLoading(false);
                        }
                    }}
                >
                    {loading ? "Loading..." : "Fetch Applicants"}
                </Button>
            </Card>

            {rows.length === 0 ? (
                <Card>No applicants loaded yet.</Card>
            ) : (
                <div className="grid gap-3">
                    {rows.map((a) => (
                        <Card key={a.id}>
                            <div className="text-sm text-zinc-300">
                                Applicant: <span className="text-zinc-100 font-medium">{a.seekerEmail}</span>
                            </div>
                            <div className="text-xs text-zinc-500 mt-1">{new Date(a.createdAt).toLocaleString()}</div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
