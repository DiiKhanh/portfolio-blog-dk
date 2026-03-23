import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
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

function IconCalendar() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
            <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
            <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function IconClock() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function IconArrowRight() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const { category = "", tag = "" } = await searchParams;
    const allPosts = await getAllPosts();

    const allTags = Array.from(
        new Set(allPosts.flatMap((p) => p.tags ?? []))
    ).sort();

    const posts = allPosts.filter((post) => {
        if (category && post.category !== category) return false;
        if (tag && !post.tags?.includes(tag)) return false;
        return true;
    });

    const [featured, ...rest] = posts;
    const isFiltered = category !== "" || tag !== "";

    return (
        <main className="min-h-screen relative z-10">
            {/* Hero header */}
            <header className="pt-32 pb-12 px-6">
                <div className="max-w-3xl mx-auto">
                    <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
                        Writing
                    </p>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Blog
                    </h1>
                    <p className="text-lg text-foreground-muted leading-relaxed max-w-xl">
                        Notes on software engineering — React, Next.js, TypeScript, Golang, and lessons from real projects.
                    </p>
                </div>
            </header>

            {/* Filter strip */}
            <div className="sticky top-16 z-20 bg-background/80 backdrop-blur-md border-b border-glass-border">
                <div className="max-w-3xl mx-auto px-6 py-3">
                    <Suspense fallback={null}>
                        <BlogFilter
                            allTags={allTags}
                            selectedCategory={category}
                            selectedTag={tag}
                        />
                    </Suspense>
                </div>
            </div>

            {/* Posts list */}
            <section className="py-10 px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Result count */}
                    <p className="text-xs text-foreground-muted mb-8 uppercase tracking-wider">
                        {posts.length === allPosts.length
                            ? `${posts.length} posts`
                            : `${posts.length} of ${allPosts.length} posts`}
                        {tag && <span> · tagged <strong className="text-foreground normal-case">{tag}</strong></span>}
                        {category && <span> · in <strong className="text-foreground normal-case capitalize">{category}</strong></span>}
                    </p>

                    {posts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-foreground-muted text-lg mb-4">No posts match your filters.</p>
                            <Link href="/blog" className="text-primary hover:underline text-sm">Clear filters</Link>
                        </div>
                    ) : (
                        <div className="space-y-0">
                            {/* Featured post (first, only when no filter) */}
                            {!isFiltered && featured && (
                                <Link
                                    href={`/blog/${featured.slug}`}
                                    className="group block mb-10"
                                >
                                    <article className="pro-card p-6 md:p-8 cursor-pointer">
                                        <div className="flex items-center gap-2 mb-4 flex-wrap">
                                            <span className="text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                                                Latest
                                            </span>
                                            {featured.level && <LevelBadge level={featured.level} />}
                                            {featured.tags?.slice(0, 2).map((t) => (
                                                <span key={t} className="clay-badge text-xs px-3 py-1">{t}</span>
                                            ))}
                                        </div>
                                        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors duration-200 leading-snug">
                                            {featured.title}
                                        </h2>
                                        <p className="text-foreground-muted leading-relaxed mb-6 line-clamp-3">
                                            {featured.description}
                                        </p>
                                        <div className="flex items-center justify-between flex-wrap gap-3">
                                            <div className="flex items-center gap-4 text-xs text-foreground-muted">
                                                <span className="flex items-center gap-1.5">
                                                    <IconCalendar />
                                                    {new Date(featured.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <IconClock />
                                                    {featured.readingTime}
                                                </span>
                                            </div>
                                            <span className="flex items-center gap-1.5 text-xs font-medium text-primary group-hover:gap-2.5 transition-all duration-200">
                                                Read article <IconArrowRight />
                                            </span>
                                        </div>
                                    </article>
                                </Link>
                            )}

                            {/* Remaining posts as clean list */}
                            <div className="divide-y divide-glass-border border-t border-glass-border">
                                {(isFiltered ? posts : rest).map((post) => (
                                    <Link
                                        key={post.slug}
                                        href={`/blog/${post.slug}`}
                                        className="group flex flex-col sm:flex-row sm:items-start gap-4 py-6 cursor-pointer"
                                    >
                                        {/* Date column */}
                                        <time
                                            dateTime={post.date}
                                            className="shrink-0 text-xs text-foreground-muted mt-1 sm:w-28 tabular-nums"
                                        >
                                            {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                        </time>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                                {post.level && <LevelBadge level={post.level} />}
                                                {post.tags?.slice(0, 2).map((t) => (
                                                    <span key={t} className="clay-badge text-xs px-2 py-0.5">{t}</span>
                                                ))}
                                            </div>
                                            <h2 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200 leading-snug mb-1 line-clamp-2">
                                                {post.title}
                                            </h2>
                                            <p className="text-sm text-foreground-muted line-clamp-2 leading-relaxed mb-2">
                                                {post.description}
                                            </p>
                                            <span className="text-xs text-foreground-muted flex items-center gap-1">
                                                <IconClock />
                                                {post.readingTime}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
