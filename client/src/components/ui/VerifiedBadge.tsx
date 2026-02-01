import React from "react";

export function VerifiedBadge({ className = "" }: { className?: string }) {
    return (
        <span
            title="Verified"
            className={
                "inline-flex items-center justify-center rounded-full " +
                "h-7 w-7 " +
                className
            }
        >
      {/* X-style: scalloped badge + check */}
            <svg viewBox="0 0 24 24" className="h-6 w-6">
        {/* scalloped background */}
                <path
                    d="M12 2.4l1.4 1.1 1.8-.2.8 1.6 1.7.7-.2 1.8 1.1 1.4-1.1 1.4.2 1.8-1.7.7-.8 1.6-1.8-.2L12 21.6l-1.4-1.1-1.8.2-.8-1.6-1.7-.7.2-1.8L2.4 12l1.1-1.4-.2-1.8 1.7-.7.8-1.6 1.8.2L12 2.4Z"
                    fill="rgb(113 113 122)"  /* zinc-500 */
                    opacity="0.22"
                    stroke="rgb(161 161 170)" /* zinc-400 */
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                />
                {/* check */}
                <path
                    d="M8.2 12.2 10.6 14.6 15.8 9.4"
                    fill="none"
                    stroke="rgb(228 228 231)" /* zinc-200 */
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
      </svg>
    </span>
    );
}
