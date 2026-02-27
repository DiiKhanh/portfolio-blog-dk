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
        <div className="space-y-4">
            {/* Category filter */}
            <div className="flex items-center gap-2 flex-wrap">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.value}
                        onClick={() => updateFilter("category", cat.value)}
                        className={`
                            px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border
                            ${
                                selectedCategory === cat.value
                                    ? "bg-primary text-background border-primary shadow-[0_0_12px_var(--color-primary)]"
                                    : "border-glass-border text-foreground-muted hover:border-primary/50 hover:text-foreground"
                            }
                        `}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Tag filter */}
            {allTags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-foreground-muted uppercase tracking-wider font-medium">
                        Tags:
                    </span>
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() =>
                                updateFilter("tag", selectedTag === tag ? "" : tag)
                            }
                            className={`
                                clay-badge text-xs px-3 py-1 transition-all duration-200
                                ${
                                    selectedTag === tag
                                        ? "ring-2 ring-primary/60 text-primary"
                                        : "opacity-70 hover:opacity-100"
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
