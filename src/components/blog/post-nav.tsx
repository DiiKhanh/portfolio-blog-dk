import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

interface PostNavProps {
    prev: BlogPost | null; // older post
    next: BlogPost | null; // newer post
}

export function PostNav({ prev, next }: PostNavProps) {
    if (!prev && !next) return null;

    return (
        <nav
            className="mt-10 pt-6 border-t border-glass-border grid grid-cols-2 gap-4"
            aria-label="Post navigation"
        >
            {/* ← Older */}
            <div>
                {prev && (
                    <Link
                        href={`/blog/${prev.slug}`}
                        className="group flex flex-col gap-1 cursor-pointer"
                    >
                        <span className="flex items-center gap-1.5 text-xs text-foreground-muted uppercase tracking-wider group-hover:text-primary transition-colors duration-200">
                            <ArrowLeft size={12} />
                            Older
                        </span>
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-snug">
                            {prev.title}
                        </span>
                    </Link>
                )}
            </div>

            {/* → Newer */}
            <div className="text-right">
                {next && (
                    <Link
                        href={`/blog/${next.slug}`}
                        className="group flex flex-col gap-1 items-end cursor-pointer"
                    >
                        <span className="flex items-center gap-1.5 text-xs text-foreground-muted uppercase tracking-wider group-hover:text-primary transition-colors duration-200">
                            Newer
                            <ArrowRight size={12} />
                        </span>
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-snug">
                            {next.title}
                        </span>
                    </Link>
                )}
            </div>
        </nav>
    );
}
