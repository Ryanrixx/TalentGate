import React from "react";

export function IconButton({
                               children,
                               active,
                               onClick,
                               disabled,
                               title,
                               className = "",
                           }: {
    children: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    title?: string;
    className?: string;
}) {
    return (
        <button
            type="button"
            title={title}
            disabled={disabled}
            onClick={onClick}
            className={
                "inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs " +
                "text-zinc-200 hover:bg-zinc-900 transition disabled:opacity-60 disabled:cursor-not-allowed " +
                (active ? "ring-2 ring-zinc-700" : "") +
                " " +
                className
            }
        >
            {children}
        </button>
    );
}
