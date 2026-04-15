import { getAllPosts } from "@/lib/blog";

const SITE_URL = "https://portfolio-blog-dk.vercel.app";
const AUTHOR = "Khanh Pham";

export async function GET() {
    const posts = await getAllPosts();

    const items = posts
        .map((post) => {
            const postUrl = `${SITE_URL}/blog/${post.slug}`;
            const pubDate = new Date(post.date).toUTCString();

            return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>khanh.pham@stacktech.org (${AUTHOR})</author>
      ${post.tags.map((t) => `<category>${t}</category>`).join("\n      ")}
    </item>`.trim();
        })
        .join("\n\n    ");

    const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${AUTHOR} — Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Notes on software engineering — React, TypeScript, Go, and lessons from shipping real products.</description>
    <language>en</language>
    <managingEditor>khanh.pham@stacktech.org (${AUTHOR})</managingEditor>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

    return new Response(feed, {
        headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        },
    });
}
