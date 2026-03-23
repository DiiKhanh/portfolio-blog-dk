import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug, getCourseMetadata, extractHeadings } from "@/lib/blog";
import { GlassSidebar, LevelBadge, MDXComponents, TableOfContents, ReadingProgress } from "@/components/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
// Remark plugin: parse filename="..." from fenced code block meta strings
// and expose it as a data-filename HTML attribute on the <code> element.
function remarkCodeFilename() {
    return (tree: any) => {
        function walk(node: any) {
            if (node.type === "code" && node.meta) {
                const match = (node.meta as string).match(/filename=["']?([^"'\s]+)["']?/);
                if (match) {
                    if (!node.data) node.data = {};
                    if (!node.data.hProperties) node.data.hProperties = {};
                    node.data.hProperties["data-filename"] = match[1];
                }
            }
            if (node.children) {
                (node.children as any[]).forEach(walk);
            }
        }
        walk(tree);
    };
}

const SITE_URL = "https://portfolio-blog-dk.vercel.app";

interface PageProps {
    params: Promise<{ slug: string }>;
}

function IconArrowLeft() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
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
            title: `${post.title} | Khanh Pham Blog`,
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
    const post = await getPostBySlug(slug);

    if (!post) notFound();

    let courseMetadata = null;
    if (post.category === "courses" && post.course) {
        courseMetadata = await getCourseMetadata(post.course);
    }

    const hasSidebar = courseMetadata !== null;
    const headings = extractHeadings(post.content);

    return (
        <main className="min-h-screen relative z-10">
            <ReadingProgress />

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
                        url: `${SITE_URL}/blog/${slug}`,
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
                        <PostContent post={post} slug={slug} />
                    </article>
                    <TableOfContents headings={headings} />
                </div>
            ) : (
                <article className="blog-content pt-28">
                    <PostContent post={post} slug={slug} />
                </article>
            )}
        </main>
    );
}

function PostContent({
    post,
    slug,
}: {
    post: Awaited<ReturnType<typeof getPostBySlug>>;
    slug: string;
}) {
    if (!post) return null;

    return (
        <>
            {/* Back */}
            <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-primary transition-colors mb-10 group cursor-pointer"
            >
                <span className="group-hover:-translate-x-0.5 transition-transform duration-200">
                    <IconArrowLeft />
                </span>
                All posts
            </Link>

            {/* Article header */}
            <header className="mb-10 pb-8 border-b border-glass-border">
                {/* Badges */}
                <div className="flex items-center gap-2 mb-5 flex-wrap">
                    {post.level && <LevelBadge level={post.level} />}
                    {post.tags?.map((tag) => (
                        <span key={tag} className="clay-badge text-xs">
                            {tag}
                        </span>
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
                <div className="flex items-center gap-5 text-sm text-foreground-muted">
                    <span className="flex items-center gap-1.5">
                        <IconCalendar />
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
                        <IconClock />
                        {post.readingTime}
                    </span>
                    <span className="w-px h-4 bg-glass-border" aria-hidden="true" />
                    <span className="text-foreground-muted/70">Khanh Pham</span>
                </div>
            </header>

            {/* MDX Content */}
            <div className="prose-blog">
                <MDXRemote
                    source={post.content}
                    components={MDXComponents}
                    options={{ mdxOptions: { remarkPlugins: [remarkCodeFilename] } }}
                />
            </div>
        </>
    );
}
