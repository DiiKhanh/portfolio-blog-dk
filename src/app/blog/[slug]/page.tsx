import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
    getAllPosts,
    getPostBySlug,
    getCourseMetadata,
    extractHeadings,
    getRelatedPosts,
    getAdjacentPosts,
    type BlogPost,
} from "@/lib/blog";
import {
    GlassSidebar,
    MDXComponents,
    TableOfContents,
    ReadingProgress,
    AuthorBio,
    RelatedPosts,
    PostNav,
    ShareButtons,
    BackToTop,
} from "@/components/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

// Remark plugin: parse filename="..." from fenced code block meta strings
function remarkCodeFilename() {
    return (tree: unknown) => {
        function walk(node: Record<string, unknown>) {
            if (node.type === "code" && node.meta) {
                const match = (node.meta as string).match(/filename=["']?([^"'\s]+)["']?/);
                if (match) {
                    if (!node.data) node.data = {};
                    const data = node.data as Record<string, unknown>;
                    if (!data.hProperties) data.hProperties = {};
                    (data.hProperties as Record<string, unknown>)["data-filename"] = match[1];
                }
            }
            if (Array.isArray(node.children)) {
                (node.children as Record<string, unknown>[]).forEach(walk);
            }
        }
        walk(tree as Record<string, unknown>);
    };
}

const SITE_URL = "https://portfolio-blog-dk.vercel.app";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) return { title: "Post Not Found" };

    const postUrl = `${SITE_URL}/blog/${slug}`;

    return {
        title: post.title,
        description: post.description,
        keywords: post.tags,
        openGraph: {
            title: `${post.title} | Khanh Pham`,
            description: post.description,
            url: postUrl,
            type: "article",
            publishedTime: post.date,
            authors: ["Khanh Pham"],
            tags: post.tags,
            images: [{ url: "/og-image.png", width: 1200, height: 630, alt: post.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: ["/og-image.png"],
        },
        alternates: { canonical: postUrl },
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const [post, allPosts] = await Promise.all([getPostBySlug(slug), getAllPosts()]);

    if (!post) notFound();

    let courseMetadata = null;
    if (post.category === "courses" && post.course) {
        courseMetadata = await getCourseMetadata(post.course);
    }

    const hasSidebar = courseMetadata !== null;
    const headings = extractHeadings(post.content);
    const related = getRelatedPosts(post.slug, post.tags, allPosts, 2);
    const { prev, next } = getAdjacentPosts(post.slug, allPosts);
    const postUrl = `${SITE_URL}/blog/${slug}`;

    return (
        <main className="min-h-screen relative z-10">
            <ReadingProgress />
            <BackToTop />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        headline: post.title,
                        description: post.description,
                        author: { "@type": "Person", name: "Khanh Pham", url: SITE_URL },
                        datePublished: post.date,
                        url: postUrl,
                        keywords: post.tags?.join(", "),
                        image: `${SITE_URL}/og-image.png`,
                    }),
                }}
            />

            {hasSidebar && courseMetadata && (
                <GlassSidebar
                    courseTitle={courseMetadata.title}
                    courseSlug={post.course!}
                    chapters={courseMetadata.chapters}
                />
            )}

            {!hasSidebar ? (
                <div className="max-w-6xl mx-auto px-6 pt-28 pb-16 flex gap-10">
                    <article className="min-w-0 flex-1 max-w-none">
                        <PostContent
                            post={post}
                            slug={slug}
                            postUrl={postUrl}
                            related={related}
                            prev={prev}
                            next={next}
                        />
                    </article>
                    <TableOfContents headings={headings} />
                </div>
            ) : (
                <article className="blog-content pt-28">
                    <PostContent
                        post={post}
                        slug={slug}
                        postUrl={postUrl}
                        related={related}
                        prev={prev}
                        next={next}
                    />
                </article>
            )}
        </main>
    );
}

interface PostContentProps {
    post: BlogPost;
    slug: string;
    postUrl: string;
    related: BlogPost[];
    prev: BlogPost | null;
    next: BlogPost | null;
}

function PostContent({ post, slug, postUrl, related, prev, next }: PostContentProps) {
    return (
        <>
            {/* ── Back link ── */}
            <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-primary transition-colors duration-200 mb-10 group cursor-pointer"
            >
                <span className="group-hover:-translate-x-0.5 transition-transform duration-200">
                    <ArrowLeft size={16} />
                </span>
                All posts
            </Link>

            {/* ── Article header ── */}
            <header className="mb-10 pb-8 border-b border-glass-border">
                {/* Tags */}
                <div className="flex items-center gap-2 mb-5 flex-wrap">
                    {post.tags?.map((tag) => (
                        <Link
                            key={tag}
                            href={`/blog?tag=${encodeURIComponent(tag)}`}
                            className="text-[11px] border border-glass-border text-foreground-muted px-2.5 py-1 rounded-full hover:border-primary/40 hover:text-primary transition-colors duration-200 cursor-pointer"
                        >
                            {tag}
                        </Link>
                    ))}
                </div>

                {/* Title */}
                <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4">
                    {post.title}
                </h1>

                {/* Description */}
                <p className="text-lg text-foreground-muted leading-relaxed mb-6">
                    {post.description}
                </p>

                {/* Meta row */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4 text-sm text-foreground-muted">
                        <span className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            <time dateTime={post.date}>
                                {new Date(post.date).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </time>
                        </span>
                        <span className="w-px h-4 bg-glass-border" aria-hidden="true" />
                        <span className="flex items-center gap-1.5">
                            <Clock size={14} />
                            {post.readingTime}
                        </span>
                        <span className="w-px h-4 bg-glass-border" aria-hidden="true" />
                        <span className="text-foreground-muted/70">Khanh Pham</span>
                    </div>

                    {/* Share buttons */}
                    <ShareButtons url={postUrl} title={post.title} />
                </div>
            </header>

            {/* ── MDX Content ── */}
            <div className="prose-blog">
                <MDXRemote
                    source={post.content}
                    components={MDXComponents}
                    options={{ mdxOptions: { remarkPlugins: [remarkCodeFilename] } }}
                />
            </div>

            {/* ── Post footer ── */}
            <AuthorBio />
            <RelatedPosts posts={related} />
            <PostNav prev={prev} next={next} />
        </>
    );
}
