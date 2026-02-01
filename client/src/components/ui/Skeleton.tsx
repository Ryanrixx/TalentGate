import React from "react";

export function Skeleton({ className = "" }: { className?: string }) {
    return (
        <div
            className={
                "animate-pulse rounded-xl bg-zinc-900/60 border border-zinc-900 " +
                className
            }
        />
    );
}
