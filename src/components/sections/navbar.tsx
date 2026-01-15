"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";

const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string>("");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Track active section using IntersectionObserver
    useEffect(() => {
        const setupObserver = () => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveSection(`#${entry.target.id}`);
                        }
                    });
                },
                {
                    rootMargin: "-20% 0px -70% 0px",
                    threshold: 0,
                }
            );

            // Observe all sections
            navLinks.forEach((link) => {
                const sectionId = link.href.replace("#", "");
                const element = document.getElementById(sectionId);
                if (element) {
                    observer.observe(element);
                }
            });

            return observer;
        };

        // Delay to ensure sections are mounted after hydration
        const timeoutId = setTimeout(() => {
            const observer = setupObserver();
            return () => observer.disconnect();
        }, 100);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${isScrolled ? "top-2 left-2 right-2" : ""
                    }`}
            >
                <nav
                    className={`mx-auto max-w-6xl glass rounded-2xl px-6 py-4 transition-all duration-300 ${isScrolled ? "py-3" : ""
                        }`}
                >
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="font-heading text-xl font-bold gradient-text-animate"
                        >
                            DK.dev
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`relative py-2 text-sm font-medium transition-all duration-300 ${isActive
                                            ? "text-foreground"
                                            : "text-foreground-muted hover:text-foreground"
                                            }`}
                                    >
                                        {link.label}
                                        {isActive && (
                                            <>
                                                {/* Glow effect behind the line */}
                                                <motion.span
                                                    layoutId="activeTabGlow"
                                                    className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-8 h-4 bg-primary/40 blur-md rounded-full"
                                                    initial={{ opacity: 0, scale: 0.5 }}
                                                    animate={{
                                                        opacity: [0.4, 0.7, 0.4],
                                                        scale: [1, 1.2, 1],
                                                    }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 300,
                                                        damping: 25,
                                                        opacity: {
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            ease: "easeInOut",
                                                        },
                                                        scale: {
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            ease: "easeInOut",
                                                        },
                                                    }}
                                                />
                                                {/* Main animated underline */}
                                                <motion.span
                                                    layoutId="activeTab"
                                                    className="absolute left-0 right-0 -bottom-1 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 400,
                                                        damping: 25,
                                                    }}
                                                />
                                            </>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4">
                            <ThemeToggle />

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden w-10 h-10 rounded-full glass flex items-center justify-center cursor-pointer"
                                aria-label="Toggle menu"
                                aria-expanded={isMobileMenuOpen}
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-5 h-5" />
                                ) : (
                                    <Menu className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </nav>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-x-4 top-24 z-40 glass rounded-2xl p-6 md:hidden"
                    >
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link, index) => {
                                const isActive = activeSection === link.href;
                                return (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`block text-lg font-medium transition-colors py-2 pl-3 ${isActive
                                                ? "text-foreground border-l-2 border-primary"
                                                : "text-foreground-muted hover:text-foreground border-l-2 border-transparent"
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
                    />
                )}
            </AnimatePresence>
        </>
    );
}
