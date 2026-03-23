"use client";

import { useEffect, useRef, useState } from "react";

export interface TocHeading {
    id: string;
    text: string;
    level: 2 | 3;
}

interface TableOfContentsProps {
    headings: TocHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (headings.length === 0) return;

        const headingIds = headings.map((h) => h.id);

        observerRef.current = new IntersectionObserver(
            (entries) => {
                // Find the topmost visible heading
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

                if (visible.length > 0) {
                    setActiveId(visible[0].target.id);
                }
            },
            {
                rootMargin: "-80px 0% -60% 0%",
                threshold: 0,
            }
        );

        headingIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observerRef.current!.observe(el);
        });

        return () => observerRef.current?.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <nav
            aria-label="Table of contents"
            className="hidden xl:block sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto w-64 shrink-0"
        >
            <p className="text-[11px] font-heading font-semibold uppercase tracking-widest text-foreground-muted mb-4">
                On this page
            </p>
            <ul className="space-y-0.5">
                {headings.map((heading) => (
                    <li key={heading.id} className={heading.level === 3 ? "pl-3" : ""}>
                        <a
                            href={`#${heading.id}`}
                            className={`
                                block text-[13px] leading-snug py-1.5 border-l-2 pl-3 transition-colors duration-150
                                ${
                                    activeId === heading.id
                                        ? "border-primary text-primary font-medium"
                                        : "border-transparent text-foreground-muted hover:text-foreground hover:border-foreground-muted/50"
                                }
                            `}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
