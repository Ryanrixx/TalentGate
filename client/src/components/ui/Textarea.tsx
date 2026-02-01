import React from "react";

export function Textarea({
                             className = "",
                             ...props
                         }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            className={
                "w-full min-h-[120px] rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm " +
                "text-zinc-100 placeholder:text-zinc-600 outline-none " +
                "focus:ring-2 focus:ring-zinc-700 " +
                className
            }
            {...props}
        />
    );
}
