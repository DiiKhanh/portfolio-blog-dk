"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { highlight } from "sugar-high";

interface CodeBlockProps {
    children: string;
    language?: string;
    filename?: string;
}

function IconTerminal() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 17L10 11L4 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 19H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function IconCopy() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 3.89543 15 5V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function IconCheck() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function CodeBlock({ children, language = "tsx", filename }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const rawCode = typeof children === "string" ? children : String(children ?? "");

    const handleCopy = async () => {
        await navigator.clipboard.writeText(rawCode.trim());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const highlighted = highlight(rawCode);

    return (
        <div className="code-terminal group my-6">
            {/* Header */}
            <div className="terminal-header">
                <div className="terminal-dots">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                </div>

                <div className="flex items-center gap-1.5 text-foreground-muted">
                    <IconTerminal />
                    <span className="text-xs font-mono">{filename || language}</span>
                </div>

                <button
                    onClick={handleCopy}
                    className="copy-button"
                    aria-label={copied ? "Copied!" : "Copy code"}
                >
                    <AnimatePresence mode="wait">
                        {copied ? (
                            <motion.span
                                key="check"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="text-green-400"
                            >
                                <IconCheck />
                            </motion.span>
                        ) : (
                            <motion.span
                                key="copy"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                            >
                                <IconCopy />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Code */}
            <div className="terminal-content">
                <pre className="overflow-x-auto">
                    <code
                        className={`sh-code language-${language}`}
                        dangerouslySetInnerHTML={{ __html: highlighted }}
                    />
                </pre>
            </div>
        </div>
    );
}
