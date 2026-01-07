import { ComponentProps, ReactNode, createElement } from "react";
import { CodeBlock } from "./code-block";
import { LevelBadge } from "./level-badge";

// Custom heading with anchor
function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
    const tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    const classNames: Record<number, string> = {
        1: "brutalist-heading",
        2: "text-3xl font-heading font-bold mt-12 mb-4 text-foreground",
        3: "text-2xl font-heading font-semibold mt-8 mb-3 text-foreground",
        4: "text-xl font-heading font-semibold mt-6 mb-2 text-foreground",
        5: "text-lg font-heading font-medium mt-4 mb-2 text-foreground",
        6: "text-base font-heading font-medium mt-4 mb-2 text-foreground-muted",
    };

    return function Heading({ children, ...props }: ComponentProps<"h1">) {
        return createElement(tag, { className: classNames[level], ...props }, children);
    };
}

// Paragraph
function P({ children }: { children: ReactNode }) {
    return (
        <p className="text-foreground/90 leading-relaxed mb-4">
            {children}
        </p>
    );
}

// Strong/Bold
function Strong({ children }: { children: ReactNode }) {
    return <strong className="font-semibold text-foreground">{children}</strong>;
}

// Emphasis/Italic
function Em({ children }: { children: ReactNode }) {
    return <em className="italic text-foreground/80">{children}</em>;
}

// Links
function A({ href, children }: { href?: string; children: ReactNode }) {
    return (
        <a
            href={href}
            className="text-primary hover:text-primary-hover underline underline-offset-4 transition-colors"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        >
            {children}
        </a>
    );
}

// Unordered list
function Ul({ children }: { children: ReactNode }) {
    return (
        <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90 ml-4">
            {children}
        </ul>
    );
}

// Ordered list
function Ol({ children }: { children: ReactNode }) {
    return (
        <ol className="list-decimal list-inside space-y-2 mb-4 text-foreground/90 ml-4">
            {children}
        </ol>
    );
}

// List item
function Li({ children }: { children: ReactNode }) {
    return <li className="leading-relaxed">{children}</li>;
}

// Blockquote
function Blockquote({ children }: { children: ReactNode }) {
    return (
        <blockquote className="border-l-4 border-primary pl-4 py-2 my-6 bg-primary/5 rounded-r-lg italic text-foreground/80">
            {children}
        </blockquote>
    );
}

// Inline code
function InlineCode({ children }: { children: ReactNode }) {
    return (
        <code className="inline-code">
            {children}
        </code>
    );
}

// Pre/Code block wrapper
interface PreProps extends ComponentProps<"pre"> {
    children?: React.ReactElement<{ children?: string; className?: string }>;
}

function Pre({ children }: PreProps) {
    // Extract text content and language from children
    const code = children?.props?.children || "";
    const className = children?.props?.className || "";
    const language = className.replace("language-", "") || "plaintext";

    return <CodeBlock language={language}>{code}</CodeBlock>;
}

// Horizontal rule
function Hr() {
    return (
        <hr className="my-8 border-t border-glass-border" />
    );
}

// Table components
function Table({ children }: { children: ReactNode }) {
    return (
        <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse">
                {children}
            </table>
        </div>
    );
}

function Th({ children }: { children: ReactNode }) {
    return (
        <th className="text-left p-3 bg-glass-bg border border-glass-border font-heading font-semibold text-foreground">
            {children}
        </th>
    );
}

function Td({ children }: { children: ReactNode }) {
    return (
        <td className="p-3 border border-glass-border text-foreground/90">
            {children}
        </td>
    );
}

// Image
function Img({ src, alt }: { src?: string; alt?: string }) {
    return (
        <figure className="my-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt={alt || ""}
                className="rounded-lg border border-glass-border max-w-full"
            />
            {alt && (
                <figcaption className="text-center text-sm text-foreground-muted mt-2">
                    {alt}
                </figcaption>
            )}
        </figure>
    );
}

// Export all MDX components mapping
export const MDXComponents = {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    p: P,
    strong: Strong,
    em: Em,
    a: A,
    ul: Ul,
    ol: Ol,
    li: Li,
    blockquote: Blockquote,
    code: InlineCode,
    pre: Pre,
    hr: Hr,
    table: Table,
    th: Th,
    td: Td,
    img: Img,
    // Custom components available in MDX
    CodeBlock,
    LevelBadge,
};
