import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";

export const metadata: Metadata = {
    other: {
        "application/rss+xml": "/blog/rss.xml",
    },
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <link
                rel="alternate"
                type="application/rss+xml"
                title="Khanh Pham Blog"
                href="/blog/rss.xml"
            />
            <Navbar />
            {children}
        </>
    );
}
