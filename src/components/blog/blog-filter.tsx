"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

interface BlogFilterProps {
    allTags: string[];
    selectedTag: string;
}

export function BlogFilter({ allTags, selectedTag }: BlogFilterProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const setTag = useCallback(
        (tag: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (tag) {
                params.set("tag", tag);
            } else {
                params.delete("tag");
            }
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        },
        [router, pathname, searchParams],
    );

    return (
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {/* All posts reset */}
            <button
                onClick={() => setTag("")}
                className={`
                    px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap cursor-pointer border
                    ${selectedTag === ""
                        ? "bg-primary/10 border-primary/40 text-primary"
                        : "border-glass-border text-foreground-muted hover:text-foreground hover:border-glass-border/80"
                    }
                `}
            >
                All
            </button>

            {allTags.map((tag) => (
                <button
                    key={tag}
                    onClick={() => setTag(selectedTag === tag ? "" : tag)}
                    className={`
                        px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap cursor-pointer border shrink-0
                        ${selectedTag === tag
                            ? "bg-primary/10 border-primary/40 text-primary"
                            : "border-glass-border text-foreground-muted hover:text-foreground hover:border-glass-border/80"
                        }
                    `}
                >
                    {tag}
                </button>
            ))}
        </div>
    );
}
