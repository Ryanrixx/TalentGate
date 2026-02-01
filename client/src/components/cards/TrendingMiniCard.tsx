import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { getDemoMode } from "../../utils/demo";

export function TrendingMiniCard() {
    const nav = useNavigate();
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const handler = () => setTick((x) => x + 1);
        window.addEventListener("storage", handler);
        return () => window.removeEventListener("storage", handler);
    }, []);

    const demo = useMemo(() => getDemoMode(), [tick]);

    const items = demo
        ? [
            { title: "Verified-only hiring", meta: "Top story • today" },
            { title: "Living profile auto-fill", meta: "Trending • today" },
            { title: "Internships (Remote)", meta: "Hot • today" },
            { title: "React + TypeScript", meta: "Rising • today" },
        ]
        : [];

    return (
        <Card className="space-y-3">
            <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Trending</div>
                <button
                    onClick={() => nav("/trending")}
                    className="text-xs text-zinc-500 hover:text-zinc-200"
                >
                    View all →
                </button>
            </div>

            {!demo ? (
                <div className="text-sm text-zinc-500">
                    Toggle <span className="text-zinc-200">Demo</span> for screenshot-ready trending.
                </div>
            ) : (
                <div className="space-y-2">
                    {items.map((x, i) => (
                        <button
                            key={i}
                            onClick={() => nav("/trending")}
                            className="w-full rounded-xl border border-zinc-900 bg-zinc-950 px-3 py-2 text-left hover:bg-zinc-900/60"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div className="text-sm text-zinc-200">{x.title}</div>
                                <Badge>hot</Badge>
                            </div>
                            <div className="mt-1 text-xs text-zinc-600">{x.meta}</div>
                        </button>
                    ))}
                </div>
            )}
        </Card>
    );
}
