import React from "react";

export function Avatar({
                           src,
                           name,
                           size = 40,
                           className = "",
                       }: {
    src?: string;
    name?: string;
    size?: number;
    className?: string;
}) {
    const letter = (name || "T").slice(0, 1).toUpperCase();

    return (
        <div
            className={
                "grid place-items-center overflow-hidden rounded-full border border-zinc-800 bg-zinc-950 text-zinc-100 " +
                className
            }
            style={{ width: size, height: size }}
        >
            {src ? (
                <img
                    src={src}
                    alt="avatar"
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                />
            ) : (
                <span className="text-sm font-semibold">{letter}</span>
            )}
        </div>
    );
}
