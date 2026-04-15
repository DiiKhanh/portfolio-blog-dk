import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getAllPosts, type BlogPost } from "@/lib/blog";
import { BlogFilter } from "@/components/blog";
import { ArrowRight, Clock, Github, Rss } from "lucide-react";

const SITE_URL = "https://portfolio-blog-dk.vercel.app";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Notes on software engineering — React, Next.js, TypeScript, Golang, and lessons from real projects by Khanh Pham.",
    openGraph: {
        title: "Blog | Khanh Pham",
        description:
            "Notes on software engineering from a builder's perspective.",
        url: `${SITE_URL}/blog`,
        type: "website",
    },
    alternates: {
        canonical: `${SITE_URL}/blog`,
    },
};

interface BlogPageProps {
    searchParams: Promise<{ tag?: string }>;
}

function formatDate(dateStr: string, opts?: Intl.DateTimeFormatOptions) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        ...opts,
    });
}

function FeaturedPost({ post }: { post: BlogPost }) {
    return (
        <Link href={`/blog/${post.slug}`} className="group block mb-2">
            <article className="relative border-l-2 border-primary pl-5 py-6 hover:border-primary/80 transition-colors duration-200">
                {/* Labels */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                        Latest
                    </span>
                    {post.tags.slice(0, 3).map((t) => (
                        <span
                            key={t}
                            className="text-[11px] border border-glass-border text-foreground-muted px-2 py-0.5 rounded-full"
                        >
                            {t}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight leading-tight mb-2 group-hover:text-primary transition-colors duration-200">
                    {post.title}
                </h2>

                {/* Description */}
                <p className="text-foreground-muted text-sm leading-relaxed mb-4 line-clamp-2 max-w-xl">
                    {post.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-foreground-muted">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {post.readingTime}
                    </span>
                    <span className="ml-auto flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all duration-200">
                        Read post <ArrowRight size={13} />
                    </span>
                </div>
            </article>
        </Link>
    );
}

function PostRow({ post }: { post: BlogPost }) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group grid sm:grid-cols-[5rem_1fr] gap-2 sm:gap-5 py-5 border-b border-glass-border/50 last:border-0 cursor-pointer"
        >
            {/* Date */}
            <time
                dateTime={post.date}
                className="text-xs text-foreground-muted tabular-nums sm:pt-0.5 shrink-0"
            >
                {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                })}
            </time>

            {/* Content */}
            <div className="min-w-0">
                <h3 className="font-heading text-base font-semibold group-hover:text-primary transition-colors duration-200 leading-snug mb-1 line-clamp-1">
                    {post.title}
                    {post.series && (
                        <span className="ml-2 text-xs font-normal text-foreground-muted/60">
                            · {post.seriesTitle ?? post.series}
                        </span>
                    )}
                </h3>
                <p className="text-sm text-foreground-muted line-clamp-1 mb-2 leading-relaxed">
                    {post.description}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                    {post.tags.slice(0, 2).map((t) => (
                        <span
                            key={t}
                            className="text-[11px] border border-glass-border/60 text-foreground-muted/70 px-2 py-0.5 rounded-full"
                        >
                            {t}
                        </span>
                    ))}
                    <span className="ml-auto flex items-center gap-1 text-xs text-foreground-muted/60">
                        <Clock size={11} />
                        {post.readingTime}
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const { tag = "" } = await searchParams;
    const allPosts = await getAllPosts();

    const allTags = Array.from(
        new Set(allPosts.flatMap((p) => p.tags)),
    ).sort();

    const posts = allPosts.filter((post) => {
        if (tag && !post.tags.includes(tag)) return false;
        return true;
    });

    const isFiltered = tag !== "";
    const [featured, ...rest] = posts;

    // Group non-featured posts by year
    const listPosts = isFiltered ? posts : rest;
    const postsByYear = listPosts.reduce(
        (acc, post) => {
            const year = new Date(post.date).getFullYear();
            if (!acc[year]) acc[year] = [];
            acc[year].push(post);
            return acc;
        },
        {} as Record<number, BlogPost[]>,
    );
    const years = Object.keys(postsByYear)
        .map(Number)
        .sort((a, b) => b - a);

    return (
        <main className="min-h-screen relative z-10">
            {/* ── Author intro ── */}
            <header className="pt-32 pb-10 px-6">
                <div className="max-w-3xl mx-auto">
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">
                        Writing
                    </p>

                    <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Blog
                    </h1>

                    <p className="text-foreground-muted leading-relaxed max-w-lg mb-6">
                        Notes on software engineering from a builder&apos;s perspective — React, TypeScript, Go, and lessons from shipping real products.
                    </p>

                    {/* Author + links */}
                    <div className="flex items-center gap-4 text-sm text-foreground-muted">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary text-background text-[11px] font-bold shrink-0">
                                KP
                            </span>
                            <span className="font-medium text-foreground">Khanh Pham</span>
                            <span className="text-foreground-muted/50">·</span>
                            <span>Software Engineer</span>
                        </div>
                        <span className="w-px h-4 bg-glass-border" aria-hidden="true" />
                        <a
                            href="https://github.com/khanhpham-dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 hover:text-foreground transition-colors duration-200"
                            aria-label="GitHub"
                        >
                            <Github size={14} />
                            <span>GitHub</span>
                        </a>
                        <a
                            href="/blog/rss.xml"
                            className="flex items-center gap-1.5 hover:text-primary transition-colors duration-200"
                            aria-label="RSS Feed"
                        >
                            <Rss size={14} />
                            <span>RSS</span>
                        </a>
                    </div>
                </div>
            </header>

            {/* ── Tag filter ── */}
            <div className="sticky top-16 z-20 bg-background/80 backdrop-blur-md border-b border-glass-border">
                <div className="max-w-3xl mx-auto px-6 py-3">
                    <Suspense fallback={null}>
                        <BlogFilter allTags={allTags} selectedTag={tag} />
                    </Suspense>
                </div>
            </div>

            {/* ── Posts ── */}
            <section className="py-8 px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Result count */}
                    <p className="text-xs text-foreground-muted/60 uppercase tracking-wider mb-8">
                        {posts.length === allPosts.length
                            ? `${posts.length} ${posts.length === 1 ? "post" : "posts"}`
                            : `${posts.length} of ${allPosts.length} posts`}
                        {tag && (
                            <span>
                                {" "}· tagged{" "}
                                <strong className="text-foreground normal-case font-medium">
                                    {tag}
                                </strong>
                            </span>
                        )}
                    </p>

                    {posts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-foreground-muted text-lg mb-4">
                                No posts match this tag.
                            </p>
                            <Link
                                href="/blog"
                                className="text-primary hover:underline text-sm"
                            >
                                Clear filter
                            </Link>
                        </div>
                    ) : (
                        <div>
                            {/* Featured post (latest, unfiltered) */}
                            {!isFiltered && featured && (
                                <FeaturedPost post={featured} />
                            )}

                            {/* Year-grouped post list */}
                            {years.map((year) => (
                                <div key={year}>
                                    <p className="text-xs font-semibold uppercase tracking-widest text-foreground-muted/50 mt-10 mb-1 pb-3 border-b border-glass-border/40">
                                        {year}
                                    </p>
                                    {postsByYear[year].map((post) => (
                                        <PostRow key={post.slug} post={post} />
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
