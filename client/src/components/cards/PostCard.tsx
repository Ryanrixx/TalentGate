import React, { useMemo, useState } from "react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Divider } from "../ui/Divider";
import { IconButton } from "../ui/IconButton";

type Post = {
    id: string;
    author: string;
    role: "jobseeker" | "employer";
    time: string;
    text: string;
    tags?: string[];
    imageUrl?: string;
    stats?: { likes: number; comments: number; shares: number };
};

function Avatar({ name }: { name: string }) {
    const letter = (name?.trim()?.[0] || "T").toUpperCase();
    return (
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100">
            {letter}
        </div>
    );
}

function HeartIcon({ filled }: { filled?: boolean }) {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12 21s-7-4.35-9.33-8.33C.42 9.42 2.33 6 6 6c2.05 0 3.24 1.11 4 2 0.76-0.89 1.95-2 4-2 3.67 0 5.58 3.42 3.33 6.67C19 16.65 12 21 12 21z"
                stroke="currentColor"
                strokeWidth="1.5"
            />
        </svg>
    );
}

function CommentIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 18l-3 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H7z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

function ShareIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16 6l-4-4-4 4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 2v14" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

export function PostCard({
                             post,
                             canInteract,
                         }: {
    post: Post;
    canInteract: boolean;
}) {
    const baseStats = useMemo(
        () => post.stats || { likes: 0, comments: 0, shares: 0 },
        [post.stats]
    );

    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(baseStats.likes);
    const [comments] = useState(baseStats.comments);
    const [shares, setShares] = useState(baseStats.shares);

    return (
        <Card className="space-y-3">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                    <Avatar name={post.author} />
                    <div>
                        <div className="text-sm font-semibold">{post.author}</div>
                        <div className="text-xs text-zinc-500">
                            {post.role} • {post.time}
                        </div>
                    </div>
                </div>
                <Badge>{post.tags?.[0] ?? "post"}</Badge>
            </div>

            <div className="text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap">
                {post.text}
            </div>

            {post.imageUrl ? (
                <div className="overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950">
                    <img
                        src={post.imageUrl}
                        alt="post"
                        className="w-full max-h-[420px] object-cover"
                        loading="lazy"
                    />
                </div>
            ) : null}

            <Divider />

            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex gap-2">
                    <IconButton
                        title="Like"
                        active={liked}
                        disabled={!canInteract}
                        onClick={() => {
                            if (!canInteract) return;
                            setLiked((v) => !v);
                            setLikes((n) => (liked ? Math.max(0, n - 1) : n + 1));
                        }}
                    >
            <span className={liked ? "text-rose-300" : ""}>
              <HeartIcon filled={liked} />
            </span>
                        <span>{likes}</span>
                    </IconButton>

                    <IconButton
                        title="Comment"
                        disabled={!canInteract}
                        onClick={() => canInteract && alert("Comment UI tomorrow (UI Day 2).")}
                    >
                        <CommentIcon />
                        <span>{comments}</span>
                    </IconButton>

                    <IconButton
                        title="Share"
                        disabled={!canInteract}
                        onClick={() => {
                            if (!canInteract) return;
                            setShares((n) => n + 1);
                            alert("Share UI tomorrow (UI Day 2).");
                        }}
                    >
                        <ShareIcon />
                        <span>{shares}</span>
                    </IconButton>
                </div>

                <div className="text-xs text-zinc-600">
                    {canInteract ? "interactions enabled" : "verify to interact"}
                </div>
            </div>
        </Card>
    );
}
