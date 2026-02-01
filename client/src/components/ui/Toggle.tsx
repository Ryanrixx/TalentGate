import React from "react";

export function Toggle({
                           checked,
                           onChange,
                           label,
                       }: {
    checked: boolean;
    onChange: (v: boolean) => void;
    label?: string;
}) {
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-200 hover:bg-zinc-900"
        >
      <span
          className={
              "relative inline-flex h-5 w-9 items-center rounded-full border border-zinc-800 transition " +
              (checked ? "bg-zinc-100" : "bg-zinc-900")
          }
      >
        <span
            className={
                "absolute left-0.5 h-4 w-4 rounded-full transition " +
                (checked ? "translate-x-4 bg-zinc-900" : "translate-x-0 bg-zinc-200")
            }
        />
      </span>
            {label ? <span className="text-zinc-400">{label}</span> : null}
        </button>
    );
}
