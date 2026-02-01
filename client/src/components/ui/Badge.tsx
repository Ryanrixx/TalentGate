import React from "react";

export function Badge({
                          children,
                          className = "",
                      }: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <span
            className={
                "inline-flex items-center rounded-full border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-xs text-zinc-200 " +
                className
            }
        >
      {children}
    </span>
    );
}
