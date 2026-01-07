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
            {/* Header */}
            <header className="py-8 px-6">
                <div className="max-w-5xl mx-auto">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-foreground-muted hover:text-primary transition-colors mb-8"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Portfolio</span>
                    </Link>

                    <h1 className="brutalist-heading">Blog</h1>
                    <p className="text-xl text-foreground-muted max-w-2xl">
                        Tips, tutorials, and deep dives into software development, React, and modern web technologies.
                    </p>
                </div>
            </header>

            {/* Posts Grid */}
            <section className="py-12 px-6">
                <div className="max-w-5xl mx-auto">
                    {posts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-foreground-muted text-lg">
                                No posts yet. Check back soon!
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2">
                            {posts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="blog-card group"
                                >
                                    {/* Meta info */}
                                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                                        {post.level && <LevelBadge level={post.level} />}
                                        {post.tags?.slice(0, 2).map((tag) => (
                                            <span
                                                key={tag}
                                                className="clay-badge text-xs"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h2>

                                    {/* Description */}
                                    <p className="text-foreground-muted mb-4 line-clamp-2">
                                        {post.description}
                                    </p>

                                    {/* Footer meta */}
                                    <div className="flex items-center gap-4 text-sm text-foreground-muted">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            {new Date(post.date).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={14} />
                                            {post.readingTime}
                                        </span>
                                        {post.course && (
                                            <span className="flex items-center gap-1">
                                                <Tag size={14} />
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
