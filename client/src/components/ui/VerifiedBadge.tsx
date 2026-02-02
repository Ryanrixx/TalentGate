import React from "react";

export function VerifiedBadge({ className = "" }: { className?: string }) {
    return (
        <span
            title="Verified"
            className={
                "inline-flex h-5 w-5 items-center justify-center rounded-full " +
                "bg-zinc-800/80 ring-1 ring-zinc-700 text-zinc-200 " +
                className
            }
        >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
    );
}
