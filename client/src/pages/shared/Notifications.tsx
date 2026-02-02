import React, { useMemo } from "react";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";

type Notif = { id: string; title: string; body: string; time: string; tag?: string };

export function Notifications(): React.ReactElement {
    const items: Notif[] = useMemo(
        () => [
            { id: "n1", title: "New job match", body: "Frontend Intern • Remote • 92% match (demo)", time: "now", tag: "jobs" },
            { id: "n2", title: "Someone liked your post", body: "TalentGate Official liked your update.", time: "1h", tag: "feed" },
            { id: "n3", title: "Community invite", body: "You were invited to: Builders • India (demo).", time: "1d", tag: "community" },
        ],
        []
    );

    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-6">
            <div className="mb-4">
                <h1 className="text-2xl font-semibold text-zinc-100">Notifications</h1>
                <p className="text-sm text-zinc-400">Activity across jobs, feed, and communities.</p>
            </div>

            <div className="space-y-3">
                {items.map((n) => (
                    <Card key={n.id} className="p-4">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className="text-sm font-semibold text-zinc-100">{n.title}</div>
                                    {n.tag ? <Badge>{n.tag}</Badge> : null}
                                </div>
                                <div className="mt-1 text-sm text-zinc-300">{n.body}</div>
                                <div className="mt-2 text-xs text-zinc-500">{n.time}</div>
                            </div>
                            <button className="text-xs text-zinc-400 hover:text-zinc-200">Mark read</button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
