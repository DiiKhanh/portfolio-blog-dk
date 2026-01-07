"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center section pt-32">
            <div className="max-w-5xl mx-auto text-center">
                {/* Status Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-8"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-foreground-muted">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        Available for new opportunities
                    </span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="font-heading text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[1.1] tracking-tight mb-6"
                >
                    Hi, I&apos;m{" "}
                    <span className="gradient-text-animate">Khanh Pham</span>
                    <br />
                    <span className="text-foreground-muted">Software Engineer</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    I craft exceptional digital experiences with modern web technologies.
                    Passionate about building products that make a difference.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-wrap items-center justify-center gap-4 mb-16"
                >
                    <Link href="#contact" className="btn-primary">
                        <Mail className="w-5 h-5" />
                        Get in Touch
                    </Link>
                    <Link href="#projects" className="btn-secondary">
                        View My Work
                    </Link>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex items-center justify-center gap-4"
                >
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full glass flex items-center justify-center text-foreground-muted hover:text-primary transition-colors cursor-pointer"
                        aria-label="GitHub"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full glass flex items-center justify-center text-foreground-muted hover:text-primary transition-colors cursor-pointer"
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                        href="mailto:hello@example.com"
                        className="w-12 h-12 rounded-full glass flex items-center justify-center text-foreground-muted hover:text-primary transition-colors cursor-pointer"
                        aria-label="Email"
                    >
                        <Mail className="w-5 h-5" />
                    </a>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ArrowDown className="w-6 h-6 text-foreground-muted" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
