import React from "react";

type SvgProps = {
    className?: string;
};

function Svg({ children, className = "" }: React.PropsWithChildren<SvgProps>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            className={"h-5 w-5 " + className}
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {children}
        </svg>
    );
}

// Top / nav icons
export function IconSearch(p: SvgProps) {
    return (
        <Svg {...p}>
            <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
            <path d="M16.6 16.6 21 21" />
        </Svg>
    );
}

export function IconBell(p: SvgProps) {
    return (
        <Svg {...p}>
            <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z" />
            <path d="M10 19a2 2 0 0 0 4 0" />
        </Svg>
    );
}

export function IconMessage(p: SvgProps) {
    return (
        <Svg {...p}>
            <path d="M21 14a4 4 0 0 1-4 4H9l-4 3V6a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8Z" />
        </Svg>
    );
}

// Sidebar/nav section icons
export function IconFeed(p: SvgProps) {
    return (
        <Svg {...p}>
            <path d="M4 4h16v16H4z" />
            <path d="M8 8h8" />
            <path d="M8 12h8" />
            <path d="M8 16h5" />
        </Svg>
    );
}

export function IconTrending(p: SvgProps) {
    return (
        <Svg {...p}>
            <path d="M3 17l6-6 4 4 7-7" />
            <path d="M14 8h6v6" />
        </Svg>
    );
}

export function IconCommunities(p: SvgProps) {
    return (
        <Svg {...p}>
            <path d="M16 11a4 4 0 1 0-8 0" />
            <path d="M4 21a8 8 0 0 1 16 0" />
            <path d="M18.5 8.5a3 3 0 1 1 0 5.5" />
        </Svg>
    );
}

export function IconDashboard(p: SvgProps) {
    return (
        <Svg {...p}>
            <path d="M4 13h7V4H4v9Z" />
            <path d="M13 20h7V11h-7v9Z" />
            <path d="M13 4h7v5h-7V4Z" />
            <path d="M4 20h7v-5H4v5Z" />
        </Svg>
    );
}

export function IconJobs(p: SvgProps) {
    return (
        <Svg {...p}>
            <path d="M8 7V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
            <path d="M4 7h16v13H4V7Z" />
            <path d="M9 11h6" />
        </Svg>
    );
}

export function IconApplications(p: SvgProps) {
    return (
        <Svg {...p}>
            <path d="M7 3h10v4H7V3Z" />
            <path d="M6 7h12v14H6V7Z" />
            <path d="M9 11h6" />
            <path d="M9 15h6" />
        </Svg>
    );
}

export function IconProfile(p: SvgProps) {
    return (
        <Svg {...p}>
            <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
            <path d="M4 21a8 8 0 0 1 16 0" />
        </Svg>
    );
}

// Post action icons (fixes your Feed.tsx TS2305)
export function IconHeart(p: SvgProps) {
    return (
        <Svg {...p}>
            <path d="M12 21s-7-4.6-9.2-9A5.6 5.6 0 0 1 12 6.2 5.6 5.6 0 0 1 21.2 12C19 16.4 12 21 12 21Z" />
        </Svg>
    );
}

export function IconComment(p: SvgProps) {
    return (
        <Svg {...p}>
            <path d="M21 14a4 4 0 0 1-4 4H9l-4 3V6a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8Z" />
        </Svg>
    );
}

export function IconRepost(p: SvgProps) {
    return (
        <Svg {...p}>
            <path d="M7 7h11l-2-2" />
            <path d="M18 7a5 5 0 0 1-5 5H6" />
            <path d="M17 17H6l2 2" />
            <path d="M6 17a5 5 0 0 1 5-5h7" />
        </Svg>
    );
}
