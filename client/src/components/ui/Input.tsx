import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    hint?: string;
};

export function Input({ className = "", label, hint, ...props }: Props) {
    const inputEl = (
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

    // Backward compatible: if no label/hint, return raw input (like before)
    if (!label && !hint) return inputEl;

    return (
        <div className="space-y-2">
            {label ? <label className="text-xs text-zinc-400">{label}</label> : null}
            {inputEl}
            {hint ? <p className="text-xs text-zinc-600">{hint}</p> : null}
        </div>
    );
}
