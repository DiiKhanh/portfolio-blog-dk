import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { getAllPosts, getPostBySlug, getCourseMetadata } from "@/lib/blog";
import { GlassSidebar, LevelBadge, MDXComponents } from "@/components/blog";
import { MDXRemote } from "next-mdx-remote/rsc";

const SITE_URL = "https://portfolio-blog-dk.vercel.app";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    const postUrl = `${SITE_URL}/blog/${slug}`;

    return {
        title: post.title,
        description: post.description,
        keywords: post.tags,
        openGraph: {
            title: `${post.title} | Khanh Pham Blog`,
            description: post.description,
            url: postUrl,
            type: "article",
            publishedTime: post.date,
            authors: ["Khanh Pham"],
            tags: post.tags,
            images: [
                {
                    url: "/og-image.png",
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: ["/og-image.png"],
        },
        alternates: {
            canonical: postUrl,
        },
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // Check if this is a course post and get course metadata
    let courseMetadata = null;
    if (post.category === "courses" && post.course) {
        courseMetadata = await getCourseMetadata(post.course);
    }

    const hasSidebar = courseMetadata !== null;

    return (
        <main className="min-h-screen relative z-10">
            {/* Article JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        headline: post.title,
                        description: post.description,
                        author: {
                            "@type": "Person",
                            name: "Khanh Pham",
                            url: SITE_URL,
                        },
                        datePublished: post.date,
                        url: `${SITE_URL}/blog/${slug}`,
                        keywords: post.tags?.join(", "),
                        image: `${SITE_URL}/og-image.png`,
                    }),
                }}
            />
            {/* Sidebar for course posts */}
            {hasSidebar && courseMetadata && (
                <GlassSidebar
                    courseTitle={courseMetadata.title}
                    courseSlug={post.course!}
                    chapters={courseMetadata.chapters}
                />
            )}

            {/* Main Content */}
            <article className={hasSidebar ? "blog-content pt-28" : "max-w-6xl mx-auto px-6 pt-28 pb-12"}>
                {/* Back link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-foreground-muted hover:text-primary transition-colors mb-8 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Blog</span>
                </Link>

                {/* Post Header */}
                <header className="mb-12">
                    {/* Meta badges */}
                    <div className="flex items-center gap-3 mb-6 flex-wrap">
                        {post.level && <LevelBadge level={post.level} />}
                        {post.tags?.map((tag) => (
                            <span key={tag} className="clay-badge text-xs">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h1 className="brutalist-heading">{post.title}</h1>

                    {/* Description */}
                    <p className="text-xl text-foreground-muted mb-6">
                        {post.description}
                    </p>

                    {/* Meta info */}
                    <div className="flex items-center gap-6 text-foreground-muted border-t border-glass-border pt-6">
                        <span className="flex items-center gap-2">
                            <Calendar size={16} />
                            {new Date(post.date).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock size={16} />
                            {post.readingTime}
                        </span>
                    </div>
                </header>

                {/* MDX Content */}
                <div className="prose-blog">
                    <MDXRemote source={post.content} components={MDXComponents} />
                </div>
            </article>
        </main>
    );
}
