import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { LevelBadge } from "@/components/blog";

export const metadata = {
    title: "Blog | Khanh Pham",
    description: "Tips, tutorials, and thoughts on software development",
};

export default async function BlogPage() {
    const posts = await getAllPosts();

    return (
        <main className="min-h-screen relative z-10">
            {/* Header with gradient background */}
            <header className="relative py-16 px-6 overflow-hidden">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" aria-hidden="true" />

                <div className="max-w-6xl mx-auto relative z-10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-foreground-muted hover:text-primary transition-colors mb-8 group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Home</span>
                    </Link>

                    <h1 className="brutalist-heading text-6xl md:text-7xl mb-4">Blog</h1>
                    <p className="text-xl text-foreground-muted max-w-3xl leading-relaxed">
                        Tips, tutorials, and deep dives into software development, React, and modern web technologies.
                    </p>
                </div>
            </header>

            {/* Posts Grid */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    {posts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-foreground-muted text-lg">
                                No posts yet. Check back soon!
                            </p>
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
                                        {post.tags?.slice(0, 2).map((tag) => (
                                            <span
                                                key={tag}
                                                className="clay-badge text-xs px-3 py-1"
                                            >
                                                {tag}
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
