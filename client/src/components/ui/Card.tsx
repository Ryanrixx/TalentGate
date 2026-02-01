import React from "react";

export function Card({
                         children,
                         className = "",
                     }: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={
                "rounded-2xl border border-zinc-900 bg-zinc-950/60 " +
                "shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur " +
                "px-5 py-4 " +
                className
            }
        >
            {children}
        </div>
    );
}
