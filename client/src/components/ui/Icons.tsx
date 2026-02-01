import React from "react";

type Props = { className?: string };

export function IconSearch({ className = "h-4 w-4" }: Props) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <path
                d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                stroke="currentColor"
                strokeWidth="1.8"
            />
            <path
                d="M16.2 16.2 21 21"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function IconFeed({ className = "h-5 w-5" }: Props) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <path
                d="M4 10.5V20h16v-9.5l-8-6-8 6Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
            <path
                d="M9.5 20v-6h5v6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function IconTrending({ className = "h-5 w-5" }: Props) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <path
                d="M4 16l6-6 4 4 6-8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M20 6v6h-6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function IconCommunities({ className = "h-5 w-5" }: Props) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <path
                d="M16.5 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3Z"
                stroke="currentColor"
                strokeWidth="1.8"
            />
            <path
                d="M7.5 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3Z"
                stroke="currentColor"
                strokeWidth="1.8"
            />
            <path
                d="M4 20a5.5 5.5 0 0 1 7-5.2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <path
                d="M13 20a5.5 5.5 0 0 1 7-5.2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function IconDashboard({ className = "h-5 w-5" }: Props) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <path
                d="M4 4h7v7H4V4Zm9 0h7v4h-7V4ZM13 10h7v10h-7V10ZM4 13h7v7H4v-7Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function IconJobs({ className = "h-5 w-5" }: Props) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <path
                d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <path
                d="M4 8h16v12H4V8Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
            <path
                d="M4 12h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function IconApplications({ className = "h-5 w-5" }: Props) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <path
                d="M7 3h10v18H7V3Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
            <path
                d="M9 7h6M9 11h6M9 15h4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function IconProfile({ className = "h-5 w-5" }: Props) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <path
                d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
                stroke="currentColor"
                strokeWidth="1.8"
            />
            <path
                d="M4 21a8 8 0 0 1 16 0"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function IconHeart({ className = "h-4 w-4" }: Props) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <path
                d="M12 21s-7-4.4-9.2-9A5.4 5.4 0 0 1 12 6a5.4 5.4 0 0 1 9.2 6c-2.2 4.6-9.2 9-9.2 9Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function IconComment({ className = "h-4 w-4" }: Props) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <path
                d="M20 15a4 4 0 0 1-4 4H8l-4 3V7a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function IconRepost({ className = "h-4 w-4" }: Props) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <path
                d="M7 7h11l-2.5-2.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M17 17H6l2.5 2.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6 7v4a3 3 0 0 0 3 3h2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <path
                d="M18 17v-4a3 3 0 0 0-3-3h-2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function IconVerified({ className = "h-4 w-4" }: Props) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <path
                d="M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9Z"
                stroke="currentColor"
                strokeWidth="1.8"
            />
            <path
                d="M8.3 12.2 10.6 14.5 15.8 9.3"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
