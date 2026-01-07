"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Lesson {
    title: string;
    slug: string;
}

interface Chapter {
    title: string;
    slug: string;
    lessons: Lesson[];
}

interface TreeNavigationProps {
    courseSlug: string;
    chapters: Chapter[];
}

export function TreeNavigation({ courseSlug, chapters }: TreeNavigationProps) {
    const pathname = usePathname();
    const [expandedChapters, setExpandedChapters] = useState<string[]>(
        chapters.map((c) => c.slug) // All expanded by default
    );

    const toggleChapter = (slug: string) => {
        setExpandedChapters((prev) =>
            prev.includes(slug)
                ? prev.filter((s) => s !== slug)
                : [...prev, slug]
        );
    };

    const isActive = (lessonSlug: string) => {
        return pathname === `/blog/${courseSlug}-${lessonSlug}`;
    };

    return (
        <nav className="py-4">
            <ul className="space-y-1">
                {chapters.map((chapter, chapterIndex) => (
                    <li key={chapter.slug}>
                        {/* Chapter Header */}
                        <button
                            onClick={() => toggleChapter(chapter.slug)}
                            className="w-full flex items-center gap-2 px-3 py-2.5 text-left text-foreground-muted hover:text-foreground transition-colors duration-200 group cursor-pointer"
                        >
                            <motion.span
                                animate={{ rotate: expandedChapters.includes(chapter.slug) ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-foreground-muted group-hover:text-primary"
                            >
                                <ChevronRight size={16} />
                            </motion.span>
                            <span className="text-sm font-medium uppercase tracking-wider opacity-70">
                                Chapter {chapterIndex + 1}
                            </span>
                        </button>

                        {/* Chapter Title */}
                        <div className="px-3 pb-2">
                            <span className="text-base font-semibold text-foreground">
                                {chapter.title}
                            </span>
                        </div>

                        {/* Lessons */}
                        <AnimatePresence>
                            {expandedChapters.includes(chapter.slug) && (
                                <motion.ul
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    {chapter.lessons.map((lesson) => {
                                        const active = isActive(lesson.slug);
                                        return (
                                            <li key={lesson.slug} className="relative">
                                                {/* Active Indicator Line */}
                                                {active && (
                                                    <motion.div
                                                        layoutId="activeIndicator"
                                                        className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary rounded-r-full"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.2 }}
                                                    />
                                                )}

                                                <Link
                                                    href={`/blog/${courseSlug}-${lesson.slug}`}
                                                    className={`flex items-center gap-3 pl-8 pr-3 py-2.5 text-sm transition-all duration-200 ${active
                                                            ? "text-primary bg-primary/10 font-medium"
                                                            : "text-foreground-muted hover:text-foreground hover:bg-glass-bg"
                                                        }`}
                                                >
                                                    <FileText
                                                        size={14}
                                                        className={active ? "text-primary" : "opacity-50"}
                                                    />
                                                    <span>{lesson.title}</span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
