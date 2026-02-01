import React, { useEffect, useMemo, useState } from "react";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { EmptyState } from "../../components/ui/EmptyState";
import { getDemoMode } from "../../utils/demo";

export function Trending() {
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const handler = () => setTick((x) => x + 1);
        window.addEventListener("storage", handler);
        return () => window.removeEventListener("storage", handler);
    }, []);
    const demo = useMemo(() => getDemoMode(), [tick]);

    const tags = demo ? ["internships", "react", "node", "ai-resume", "verified-hiring"] : [];
    const items = demo
        ? [
            { id: "t1", title: "Verified-only hiring is becoming the default", meta: "3.2k views • today" },
            { id: "t2", title: "How a living profile removes repeated application forms", meta: "1.1k views • today" },
            { id: "t3", title: "Swipe-style apply & review: what actually works", meta: "860 views • today" },
        ]
        : [];

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold">Trending</h1>
                    <p className="text-sm text-zinc-500">Signals, topics, and momentum across TalentGate.</p>
                </div>
                <Badge>community pulse</Badge>
            </div>

            {!demo ? (
                <EmptyState
                    title="Trending is empty"
                    description="Toggle Demo mode in the navbar to show trending topics for screenshots."
                />
            ) : (
                <>
                    <Card className="space-y-3">
                        <div className="text-sm font-semibold">Hot tags</div>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((t) => (
                                <Badge key={t} className="text-zinc-300">{t}</Badge>
                            ))}
                        </div>
                    </Card>

                    <div className="grid gap-3">
                        {items.map((it) => (
                            <Card key={it.id} className="flex items-start justify-between gap-3">
                                <div>
                                    <div className="text-sm font-semibold">{it.title}</div>
                                    <div className="text-xs text-zinc-500 mt-1">{it.meta}</div>
                                </div>
                                <Badge>trending</Badge>
                            </Card>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
