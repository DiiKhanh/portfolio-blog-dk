import Link from "next/link";
import { Github, Twitter, ArrowRight } from "lucide-react";

export function AuthorBio() {
    return (
        <aside className="mt-16 pt-10 border-t border-glass-border">
            <div className="glass rounded-2xl p-6 flex flex-col sm:flex-row gap-4 items-start">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-background font-bold text-sm">
                        KP
                    </div>
                </div>

                {/* Bio */}
                <div className="flex-1 min-w-0">
                    <p className="font-heading font-semibold text-foreground mb-1">
                        Khanh Pham
                    </p>
                    <p className="text-sm text-foreground-muted leading-relaxed mb-4">
                        Software engineer building products with React, TypeScript, and Go.
                        I write about lessons learned shipping real software — the messy,
                        honest version.
                    </p>
                    <div className="flex items-center gap-4 flex-wrap">
                        <Link
                            href="/about"
                            className="inline-flex items-center gap-1.5 text-sm text-primary hover:gap-2.5 transition-all duration-200 font-medium"
                        >
                            About me <ArrowRight size={13} />
                        </Link>
                        <a
                            href="https://github.com/khanhpham-dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors duration-200"
                            aria-label="GitHub profile"
                        >
                            <Github size={14} />
                            GitHub
                        </a>
                        <a
                            href="https://x.com/khanhpham"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors duration-200"
                            aria-label="X / Twitter profile"
                        >
                            <Twitter size={14} />
                            Twitter
                        </a>
                    </div>
                </div>
            </div>
        </aside>
    );
}
