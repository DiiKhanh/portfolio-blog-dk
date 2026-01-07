"use client";

import { useState, useRef } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CodeBlockProps {
    children: string;
    language?: string;
    filename?: string;
}

export function CodeBlock({ children, language = "tsx", filename }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const codeRef = useRef<HTMLPreElement>(null);

    const handleCopy = async () => {
        const code = codeRef.current?.textContent || children;
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="code-terminal group my-6">
            {/* Terminal Header */}
            <div className="terminal-header">
                <div className="terminal-dots">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                </div>

                <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-foreground-muted" />
                    <span className="text-xs text-foreground-muted font-mono">
                        {filename || language}
                    </span>
                </div>

                {/* Copy Button */}
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
                                <Check size={14} />
                            </motion.span>
                        ) : (
                            <motion.span
                                key="copy"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                            >
                                <Copy size={14} />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Code Content */}
            <div className="terminal-content">
                <pre ref={codeRef} className="overflow-x-auto">
                    <code className={`language-${language}`}>
                        {children}
                    </code>
                </pre>
            </div>
        </div>
    );
}
