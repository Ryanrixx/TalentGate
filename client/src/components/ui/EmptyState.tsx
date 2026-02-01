import React from "react";
import { Button } from "./Button";

export function EmptyState({
                               title,
                               description,
                               actionLabel,
                               onAction,
                           }: {
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
}) {
    return (
        <div className="rounded-2xl border border-zinc-900 bg-zinc-950/60 px-6 py-8 text-center">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-zinc-900 text-zinc-100">
                ✦
            </div>
            <div className="text-base font-semibold">{title}</div>
            {description && (
                <div className="mt-1 text-sm text-zinc-500">{description}</div>
            )}
            {actionLabel && onAction && (
                <div className="mt-5 flex justify-center">
                    <Button variant="secondary" onClick={onAction}>
                        {actionLabel}
                    </Button>
                </div>
            )}
        </div>
    );
}
