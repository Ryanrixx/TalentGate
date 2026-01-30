import { useEffect, useState } from "react";
import { apiGet } from "../lib/api";
import { Link } from "react-router-dom";

type Job = {
    _id: string;
    title: string;
    company: string;
    location?: string;
    type?: string;
    tags?: string[];
    createdAt?: string;
};

type JobsResponse = {
    count: number;
    jobs: Job[];
};

export default function Jobs() {
    const [data, setData] = useState<JobsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                const res = await apiGet<JobsResponse>("/jobs");
                if (!mounted) return;
                setData(res);
            } catch (e: any) {
                if (!mounted) return;
                setError(e?.message || "Failed to load jobs");
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <div className="mx-auto max-w-6xl px-6 py-12">
                <div className="card card-inner">
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold">Jobs</h1>
                            <p className="muted mt-2">Browse roles posted on TalentGate.</p>
                        </div>
                        <Link to="/" className="btn btn-ghost">
                            Home
                        </Link>
                    </div>

                    {loading ? <p className="muted mt-6">Loading jobs…</p> : null}

                    {error ? (
                        <div className="mt-6 rounded-xl border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-200">
                            {error}
                        </div>
                    ) : null}

                    {!loading && !error && data ? (
                        <div className="mt-6 grid gap-3">
                            {data.jobs.length === 0 ? (
                                <p className="muted">No jobs posted yet.</p>
                            ) : (
                                data.jobs.map((j) => (
                                    <div key={j._id} className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-5">
                                        <div className="flex flex-wrap items-start justify-between gap-3">
                                            <div>
                                                <div className="text-sm font-semibold">{j.title}</div>
                                                <div className="mt-1 text-sm text-zinc-400">
                                                    {j.company} • {j.location || "Remote"} • {j.type || "full-time"}
                                                </div>
                                            </div>

                                            <Link className="btn btn-primary" to={`/jobs/${j._id}`}>
                                                View
                                            </Link>
                                        </div>

                                        {j.tags?.length ? (
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {j.tags.slice(0, 6).map((t) => (
                                                    <span
                                                        key={t}
                                                        className="rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-1 text-xs text-zinc-300"
                                                    >
                            {t}
                          </span>
                                                ))}
                                            </div>
                                        ) : null}
                                    </div>
                                ))
                            )}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
