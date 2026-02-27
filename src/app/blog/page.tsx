import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Clock, Calendar, Tag } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { LevelBadge, BlogFilter } from "@/components/blog";

const SITE_URL = "https://portfolio-blog-dk.vercel.app";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Tips, tutorials, and deep dives into React, Next.js, TypeScript, Golang, and modern software development by Khanh Pham.",
    openGraph: {
        title: "Blog | Khanh Pham",
        description:
            "Tips, tutorials, and deep dives into React, Next.js, TypeScript, Golang, and modern software development.",
        url: `${SITE_URL}/blog`,
        type: "website",
    },
    alternates: {
        canonical: `${SITE_URL}/blog`,
    },
};

interface BlogPageProps {
    searchParams: Promise<{ category?: string; tag?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const { category = "", tag = "" } = await searchParams;
    const allPosts = await getAllPosts();

    // Collect all unique tags
    const allTags = Array.from(
        new Set(allPosts.flatMap((p) => p.tags ?? []))
    ).sort();

    // Filter posts
    const posts = allPosts.filter((post) => {
        if (category && post.category !== category) return false;
        if (tag && !post.tags?.includes(tag)) return false;
        return true;
    });

    return (
        <main className="min-h-screen relative z-10">
            {/* Header */}
            <header className="relative py-16 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" aria-hidden="true" />
                <div className="max-w-6xl mx-auto relative z-10 mt-10">
                    <h1 className="brutalist-heading text-6xl md:text-7xl mb-4">Blog</h1>
                    <p className="text-xl text-foreground-muted max-w-3xl leading-relaxed mb-8">
                        Tips, tutorials, and deep dives into software development, React, and modern web technologies.
                    </p>

                    {/* Filter controls */}
                    <Suspense fallback={null}>
                        <BlogFilter
                            allTags={allTags}
                            selectedCategory={category}
                            selectedTag={tag}
                        />
                    </Suspense>
                </div>
            </header>

            {/* Posts Grid */}
            <section className="py-8 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Result count */}
                    <p className="text-sm text-foreground-muted mb-6">
                        {posts.length === allPosts.length
                            ? `${posts.length} posts`
                            : `${posts.length} of ${allPosts.length} posts`}
                        {tag && <span> tagged <strong className="text-foreground">{tag}</strong></span>}
                        {category && <span> in <strong className="text-foreground capitalize">{category}</strong></span>}
                    </p>

                    {posts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-foreground-muted text-lg mb-4">
                                No posts match your filters.
                            </p>
                            <Link href="/blog" className="text-primary hover:underline text-sm">
                                Clear filters
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                            {posts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="pro-card p-6 cursor-pointer group"
                                >
                                    {/* Meta info */}
                                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                                        {post.level && <LevelBadge level={post.level} />}
                                        {post.tags?.slice(0, 2).map((t) => (
                                            <span
                                                key={t}
                                                className="clay-badge text-xs px-3 py-1"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-2xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>

                                    {/* Description */}
                                    <p className="text-foreground-muted mb-5 line-clamp-3 leading-relaxed">
                                        {post.description}
                                    </p>

                                    {/* Footer meta */}
                                    <div className="flex items-center gap-4 text-sm text-foreground-muted pt-4 border-t border-glass-border">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar size={16} />
                                            {new Date(post.date).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock size={16} />
                                            {post.readingTime}
                                        </span>
                                        {post.course && (
                                            <span className="flex items-center gap-1.5 ml-auto">
                                                <Tag size={16} />
                                                {post.course}
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
