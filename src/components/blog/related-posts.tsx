import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

interface RelatedPostsProps {
    posts: BlogPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
    if (posts.length === 0) return null;

    return (
        <aside className="mt-12">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground-muted mb-5">
                Related Posts
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group glass rounded-xl p-4 hover:border-primary/20 transition-all duration-200 cursor-pointer"
                    >
                        {/* Tags */}
                        <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                            {post.tags.slice(0, 2).map((t) => (
                                <span
                                    key={t}
                                    className="text-[10px] border border-glass-border text-foreground-muted/70 px-1.5 py-0.5 rounded-full"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <p className="font-heading font-semibold text-sm leading-snug group-hover:text-primary transition-colors duration-200 mb-1 line-clamp-2">
                            {post.title}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center gap-3 text-xs text-foreground-muted mt-2">
                            <span className="flex items-center gap-1">
                                <Clock size={11} />
                                {post.readingTime}
                            </span>
                            <span className="ml-auto flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                Read <ArrowRight size={11} />
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </aside>
    );
}
