import React from "react";

export function Divider({ className = "" }: { className?: string }) {
    return <div className={`h-px w-full bg-zinc-900 ${className}`} />;
}
