"use client";

import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Twitter, Heart } from "lucide-react";
import Link from "next/link";

const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative z-10 border-t border-border">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Logo & Copyright */}
                    <div className="text-center md:text-left">
                        <Link
                            href="/"
                            className="font-heading text-2xl font-bold gradient-text-animate inline-block mb-2"
                        >
                            DK.dev
                        </Link>
                        <p className="text-sm text-foreground-muted flex items-center gap-1 justify-center md:justify-start">
                            Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> by Khanh Nguyen
                        </p>
                        <p className="text-sm text-foreground-muted mt-1">
                            © {new Date().getFullYear()} All rights reserved.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground-muted hover:text-primary transition-colors cursor-pointer"
                                whileHover={{ y: -2 }}
                                aria-label={social.label}
                            >
                                <social.icon className="w-5 h-5" />
                            </motion.a>
                        ))}
                    </div>

                    {/* Back to Top */}
                    <motion.button
                        onClick={scrollToTop}
                        className="w-12 h-12 rounded-full glass flex items-center justify-center text-foreground-muted hover:text-primary transition-colors cursor-pointer"
                        whileHover={{ y: -2 }}
                        aria-label="Back to top"
                    >
                        <ArrowUp className="w-5 h-5" />
                    </motion.button>
                </div>
            </div>
        </footer>
    );
}
