"use client";

import { useState } from "react";
import { Link2, Twitter, Linkedin, Check } from "lucide-react";

interface ShareButtonsProps {
    url: string;
    title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const handleCopyLink = async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const twitterUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

    return (
        <div className="flex items-center gap-2" aria-label="Share this post">
            {/* Copy link */}
            <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-glass-border text-xs text-foreground-muted hover:text-foreground hover:border-glass-border/80 transition-all duration-200 cursor-pointer"
                aria-label="Copy link to clipboard"
            >
                {copied ? (
                    <Check size={12} className="text-accent" />
                ) : (
                    <Link2 size={12} />
                )}
                <span>{copied ? "Copied!" : "Copy"}</span>
            </button>

            {/* X / Twitter */}
            <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-glass-border text-xs text-foreground-muted hover:text-foreground hover:border-glass-border/80 transition-all duration-200"
                aria-label="Share on X / Twitter"
            >
                <Twitter size={12} />
                <span>X</span>
            </a>

            {/* LinkedIn */}
            <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-glass-border text-xs text-foreground-muted hover:text-foreground hover:border-glass-border/80 transition-all duration-200"
                aria-label="Share on LinkedIn"
            >
                <Linkedin size={12} />
                <span>LinkedIn</span>
            </a>
        </div>
    );
}
