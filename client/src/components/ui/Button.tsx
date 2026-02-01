import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium " +
    "transition active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
    primary: "bg-zinc-100 text-zinc-900 hover:bg-white",
    secondary:
        "bg-zinc-900 text-zinc-100 border border-zinc-800 hover:bg-zinc-800",
    ghost: "bg-transparent text-zinc-200 hover:bg-zinc-900",
    danger:
        "bg-red-600/90 text-white hover:bg-red-600 border border-red-500/30",
};

export function Button({
                           variant = "primary",
                           className = "",
                           ...props
                       }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
    return (
        <button
            className={`${base} ${variants[variant]} ${className}`}
            {...props}
        />
    );
}
