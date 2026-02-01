import React from "react";

export function Select({
                           className = "",
                           children,
                           ...props
                       }: React.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <select
            className={
                "w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm " +
                "text-zinc-100 outline-none focus:ring-2 focus:ring-zinc-700 " +
                className
            }
            {...props}
        >
            {children}
        </select>
    );
}
