"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

interface BlogFilterProps {
    allTags: string[];
    selectedCategory: string;
    selectedTag: string;
}

const CATEGORIES = [
    { value: "", label: "All" },
    { value: "tips", label: "Tips" },
    { value: "courses", label: "Courses" },
];

export function BlogFilter({ allTags, selectedCategory, selectedTag }: BlogFilterProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateFilter = useCallback(
        (key: "category" | "tag", value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
            // Reset the other filter when switching category, keep tag when switching tag
            if (key === "category") params.delete("tag");
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        },
        [router, pathname, searchParams]
    );

    return (
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-none pb-0.5">
            {/* Category pills */}
            <div className="flex items-center gap-1.5 shrink-0">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.value}
                        onClick={() => updateFilter("category", cat.value)}
                        className={`
                            px-3.5 py-1 rounded-full text-sm font-medium transition-all duration-200 border whitespace-nowrap cursor-pointer
                            ${
                                selectedCategory === cat.value
                                    ? "bg-primary text-background border-primary"
                                    : "border-glass-border text-foreground-muted hover:border-primary/50 hover:text-foreground"
                            }
                        `}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Divider */}
            {allTags.length > 0 && (
                <span className="w-px h-4 bg-glass-border shrink-0" aria-hidden="true" />
            )}

            {/* Tag pills — horizontal scroll */}
            {allTags.length > 0 && (
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() =>
                                updateFilter("tag", selectedTag === tag ? "" : tag)
                            }
                            className={`
                                clay-badge text-xs px-2.5 py-1 transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0
                                ${
                                    selectedTag === tag
                                        ? "ring-1 ring-primary/60 text-primary opacity-100"
                                        : "opacity-60 hover:opacity-100"
                                }
                            `}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
