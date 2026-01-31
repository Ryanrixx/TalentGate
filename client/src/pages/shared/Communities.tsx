import React from "react";
import { Card } from "../../components/ui/Card";

export function Communities() {
    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-semibold">Communities</h1>
                <p className="text-sm text-zinc-500">Shared groups for both roles.</p>
            </div>

            <Card>
                <p className="text-sm text-zinc-300">
                    Communities, channels, and discussion threads will live here.
                </p>
            </Card>
        </div>
    );
}
