import React, { useEffect, useMemo, useState } from "react";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { useAuth } from "../../store/auth.store";
import { getDemoMode } from "../../utils/demo";

export function Communities() {
    const { user } = useAuth();
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const handler = () => setTick((x) => x + 1);
        window.addEventListener("storage", handler);
        return () => window.removeEventListener("storage", handler);
    }, []);

    const demo = useMemo(() => getDemoMode(), [tick]);

    const communities = demo
        ? [
            { id: "c1", name: "TalentGate Launch Community", members: "1.2k", desc: "Updates, roadmap, and early access.", tag: "official" },
            { id: "c2", name: "Internships India", members: "8.4k", desc: "Daily internship postings + referral threads.", tag: "jobs" },
            { id: "c3", name: "Full-stack Builders", members: "5.1k", desc: "Ship projects, get reviews, meet builders.", tag: "builders" },
        ]
        : [];

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold">Communities</h1>
                    <p className="text-sm text-zinc-500">Shared groups for both roles.</p>
                </div>
                <Button
                    variant="secondary"
                    disabled={!user?.verified}
                    onClick={() => alert("Create community UI tomorrow (UI Day 2).")}
                >
                    Create
                </Button>
            </div>

            {!demo ? (
                <EmptyState
                    title="No communities yet"
                    description="Toggle Demo mode to show communities for screenshots."
                />
            ) : (
                <div className="grid gap-3 md:grid-cols-2">
                    {communities.map((c) => (
                        <Card key={c.id} className="space-y-3">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <div className="text-sm font-semibold">{c.name}</div>
                                    <div className="text-xs text-zinc-500">{c.members} members</div>
                                </div>
                                <Badge>{c.tag}</Badge>
                            </div>
                            <div className="text-sm text-zinc-300">{c.desc}</div>
                            <div className="flex gap-2">
                                <Button variant="secondary" onClick={() => alert("Community page tomorrow.")}>
                                    View
                                </Button>
                                <Button
                                    variant="ghost"
                                    disabled={!user?.verified}
                                    onClick={() => alert("Join action later (needs backend).")}
                                >
                                    Join
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {!user?.verified && user && (
                <div className="text-xs text-zinc-600">
                    You can browse communities in read-only mode. Verify to create/join/post.
                </div>
            )}
        </div>
    );
}
