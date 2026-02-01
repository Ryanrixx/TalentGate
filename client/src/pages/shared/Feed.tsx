import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Divider } from "../../components/ui/Divider";
import { EmptyState } from "../../components/ui/EmptyState";
import { Skeleton } from "../../components/ui/Skeleton";
import { useAuth } from "../../store/auth.store";
import { getDemoMode } from "../../utils/demo";
import { ProfileMiniCard } from "../../components/cards/ProfileMiniCard";
import { TrendingMiniCard } from "../../components/cards/TrendingMiniCard";
import { IconHeart, IconComment, IconRepost } from "../../components/ui/Icons";


type Post = {
    id: string;
    author: string;
    role: string;
    time: string;
    text: string;
    tags?: string[];
    likes?: number;
    comments?: number;
    reposts?: number;
};

export function Feed() {
    const { user } = useAuth();
    const loc = useLocation();

    const [demoTick, setDemoTick] = useState(0);
    useEffect(() => {
        const handler = () => setDemoTick((x) => x + 1);
        window.addEventListener("storage", handler);
        return () => window.removeEventListener("storage", handler);
    }, []);

    const demo = useMemo(() => getDemoMode(), [demoTick]);

    const q = useMemo(() => {
        const p = new URLSearchParams(loc.search);
        return (p.get("q") || "").trim().toLowerCase();
    }, [loc.search]);

    const posts: Post[] = demo
        ? [
            {
                id: "1",
                author: "TalentGate Official",
                role: "employer",
                time: "Just now",
                text:
                    "Launching soon: one living profile + verified hiring.\n\nNo repeated forms. Real candidates. Real employers.",
                tags: ["launch", "verified"],
                likes: 124,
                comments: 18,
                reposts: 9,
            },
            {
                id: "2",
                author: "Ryan",
                role: "jobseeker",
                time: "2h",
                text:
                    "The layout is clean. Next: swipe apply + AI resume tweaks per job before applying.",
                tags: ["feedback"],
                likes: 62,
                comments: 7,
                reposts: 2,
            },
            {
                id: "3",
                author: "Nova Labs",
                role: "employer",
                time: "5h",
                text:
                    "We posted our first internship. Verified gate makes the platform feel trustworthy.",
                tags: ["hiring"],
                likes: 41,
                comments: 4,
                reposts: 1,
            },
        ]
        : [];

    const filtered = useMemo(() => {
        if (!q) return posts;
        return posts.filter(
            (p) =>
                p.author.toLowerCase().includes(q) ||
                p.text.toLowerCase().includes(q) ||
                (p.tags || []).some((t) => t.toLowerCase().includes(q))
        );
    }, [posts, q]);

    return (
        <div className="grid gap-4 lg:grid-cols-[280px_1fr_320px]">
            {/* Left sidebar */}
            <div className="hidden lg:block space-y-4">
                <ProfileMiniCard />
            </div>

            {/* Center feed */}
            <div className="space-y-4">
                <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold">Feed</h1>
                        <p className="text-sm text-zinc-500">
                            Shared social surface for seekers + employers.
                            {q ? (
                                <span className="ml-2 text-zinc-400">
                  • Search: <span className="text-zinc-200">{q}</span>
                </span>
                            ) : null}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        {user ? (
                            <>
                                <Badge>{user.role}</Badge>
                                <Badge
                                    className={
                                        user.verified
                                            ? ""
                                            : "text-amber-200 border-amber-900 bg-amber-950/30"
                                    }
                                >
                                    {user.verified ? "verified" : "read-only"}
                                </Badge>
                            </>
                        ) : (
                            <Badge>guest</Badge>
                        )}
                    </div>
                </div>

                {/* Composer card */}
                <Card className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <div className="text-sm font-semibold">Start a post</div>
                            <div className="text-sm text-zinc-500">
                                {user?.verified
                                    ? "Share updates, wins, or questions."
                                    : "Sign in and verify to post. You can browse in read-only mode."}
                            </div>
                        </div>
                        <Button
                            variant={user?.verified ? "primary" : "secondary"}
                            disabled={!user?.verified}
                            onClick={() => alert("Post composer UI comes next.")}
                        >
                            Create
                        </Button>
                    </div>

                    {!user?.verified && user ? (
                        <div className="rounded-xl border border-amber-900/40 bg-amber-950/20 px-3 py-2 text-sm text-amber-200">
                            You’re currently read-only. Verify to interact.
                        </div>
                    ) : null}
                </Card>

                {/* Feed list */}
                {!demo ? (
                    <EmptyState
                        title="No posts yet"
                        description="Toggle Demo mode in the navbar to show screenshot-ready content."
                    />
                ) : filtered.length === 0 ? (
                    <EmptyState
                        title="No results"
                        description="Try a different search keyword."
                    />
                ) : (
                    <div className="grid gap-3">
                        {filtered.length === 0 ? (
                            <Card className="space-y-3">
                                <Skeleton className="h-4 w-1/3" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </Card>
                        ) : (
                            filtered.map((p) => (
                                <Card key={p.id} className="space-y-3">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-2">
                                            <div className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-900 text-zinc-100">
                                                {p.author.slice(0, 1).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold">{p.author}</div>
                                                <div className="text-xs text-zinc-500">
                                                    {p.role} • {p.time}
                                                </div>
                                            </div>
                                        </div>

                                        <Badge>{p.tags?.[0] ?? "post"}</Badge>
                                    </div>

                                    <div className="whitespace-pre-line text-sm text-zinc-200 leading-relaxed">
                                        {p.text}
                                    </div>

                                    <Divider />

                                    {/* Actions row */}
                                    <div className="flex items-center justify-between text-xs text-zinc-500">
                                        <div className="flex items-center gap-5">
                                            <button className="inline-flex items-center gap-2 hover:text-zinc-200" disabled={!user?.verified}>
                                                <IconHeart /> {p.likes ?? 0}
                                            </button>
                                            <button className="inline-flex items-center gap-2 hover:text-zinc-200" disabled={!user?.verified}>
                                                <IconComment /> {p.comments ?? 0}
                                            </button>
                                            <button className="inline-flex items-center gap-2 hover:text-zinc-200" disabled={!user?.verified}>
                                                <IconRepost /> {p.reposts ?? 0}
                                            </button>
                                        </div>

                                        <div className="text-zinc-600">
                                            {user?.verified ? "interactions enabled" : "verify to interact"}
                                        </div>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Right sidebar */}
            <div className="hidden lg:block space-y-4">
                <TrendingMiniCard />
                <Card className="space-y-2">
                    <div className="text-sm font-semibold">Quick links</div>
                    <div className="text-sm text-zinc-500">
                        Trending and Profile cards are clickable for navigation.
                    </div>
                </Card>
            </div>
        </div>
    );
}
