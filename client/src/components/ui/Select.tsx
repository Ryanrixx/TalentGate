import React from "react";

type Option = { label: string; value: string };

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string;
    hint?: string;
    options?: Option[];
};

export function Select({
                           className = "",
                           children,
                           label,
                           hint,
                           options,
                           ...props
                       }: Props) {
    const selectEl = (
        <select
            className={
                "w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm " +
                "text-zinc-100 outline-none focus:ring-2 focus:ring-zinc-700 " +
                className
            }
            {...props}
        >
            {options
                ? options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))
                : children}
        </select>
    );

    // Backward compatible: if no label/hint, return raw select (like before)
    if (!label && !hint) return selectEl;

    return (
        <div className="space-y-2">
            {label ? <label className="text-xs text-zinc-400">{label}</label> : null}
            {selectEl}
            {hint ? <p className="text-xs text-zinc-600">{hint}</p> : null}
        </div>
    );
}
