import React from "react";

export function Input({
                          className = "",
                          ...props
                      }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className={
                "w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm " +
                "text-zinc-100 placeholder:text-zinc-600 outline-none " +
                "focus:ring-2 focus:ring-zinc-700 " +
                className
            }
            {...props}
        />
    );
}
