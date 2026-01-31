import React from "react";
import { Card } from "../../components/ui/Card";

export function Trending() {
    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-semibold">Trending</h1>
                <p className="text-sm text-zinc-500">Shared surface (both roles).</p>
            </div>

            <Card>
                <p className="text-sm text-zinc-300">
                    Trending topics and posts will appear here.
                </p>
            </Card>
        </div>
    );
}
