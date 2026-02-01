import React, { useEffect, useMemo, useState } from "react";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Divider } from "../../components/ui/Divider";
import { EmptyState } from "../../components/ui/EmptyState";
import { Skeleton } from "../../components/ui/Skeleton";
import { useAuth } from "../../store/auth.store";
import { getDemoMode } from "../../utils/demo";

type Post = { id: string; author: string; role: string; time: string; text: string; tags?: string[] };

export function Feed() {
    const { user } = useAuth();
    const [demoTick, setDemoTick] = useState(0);

    useEffect(() => {
        const handler = () => setDemoTick((x) => x + 1);
        window.addEventListener("storage", handler);
        return () => window.removeEventListener("storage", handler);
    }, []);

    const demo = useMemo(() => getDemoMode(), [demoTick]);

    const posts: Post[] = demo
        ? [
            { id: "1", author: "TalentGate Official", role: "employer", time: "Just now", text: "Launching soon: one living profile + verified hiring. No repeated forms.", tags: ["launch", "verified"] },
            { id: "2", author: "Ryan", role: "jobseeker", time: "2h", text: "The apply flow feels clean. Waiting for swipe apply + AI resume tweaks.", tags: ["feedback"] },
            { id: "3", author: "Nova Labs", role: "employer", time: "5h", text: "Posted our first internship. Applicants look real. Love the read-only gate.", tags: ["hiring"] },
        ]
        : [];

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold">Feed</h1>
                    <p className="text-sm text-zinc-500">Shared social surface for seekers + employers.</p>
                </div>
                <div className="flex items-center gap-2">
                    {user ? (
                        <>
                            <Badge>{user.role}</Badge>
                            <Badge className={user.verified ? "" : "text-amber-200 border-amber-900 bg-amber-950/30"}>
                                {user.verified ? "verified" : "read-only"}
                            </Badge>
                        </>
                    ) : (
                        <Badge>guest</Badge>
                    )}
                </div>
            </div>

            <Card className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <div className="text-sm font-semibold">Create a post</div>
                        <div className="text-sm text-zinc-500">
                            {user?.verified
                                ? "Share updates, wins, or questions."
                                : "Sign in and verify to post. You can browse in read-only mode."}
                        </div>
                    </div>
                    <Button
                        variant={user?.verified ? "primary" : "secondary"}
                        disabled={!user?.verified}
                        onClick={() => alert("Post composer coming tomorrow (UI Day 2).")}
                    >
                        New Post
                    </Button>
                </div>
                {!user?.verified && user && (
                    <div className="rounded-xl border border-amber-900/40 bg-amber-950/20 px-3 py-2 text-sm text-amber-200">
                        You’re currently read-only. Verify to interact.
                    </div>
                )}
            </Card>

            {!demo ? (
                <EmptyState
                    title="No posts yet"
                    description="Toggle Demo mode in the navbar to show screenshot-ready content."
                />
            ) : (
                <div className="grid gap-3">
                    {posts.length === 0 ? (
                        <Card className="space-y-3">
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </Card>
                    ) : (
                        posts.map((p) => (
                            <Card key={p.id} className="space-y-3">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <div className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-900 text-zinc-100">
                                            {p.author.slice(0, 1).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold">{p.author}</div>
                                            <div className="text-xs text-zinc-500">{p.role} • {p.time}</div>
                                        </div>
                                    </div>
                                    <Badge>{p.tags?.[0] ?? "post"}</Badge>
                                </div>

                                <div className="text-sm text-zinc-200 leading-relaxed">{p.text}</div>

                                <Divider />

                                <div className="flex items-center justify-between text-xs text-zinc-500">
                                    <div className="flex gap-3">
                                        <button className="hover:text-zinc-200" disabled={!user?.verified}>Like</button>
                                        <button className="hover:text-zinc-200" disabled={!user?.verified}>Comment</button>
                                        <button className="hover:text-zinc-200" disabled={!user?.verified}>Share</button>
                                    </div>
                                    <div>{user?.verified ? "interactions enabled" : "verify to interact"}</div>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
