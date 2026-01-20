"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ChevronDown, BookOpen, FileText } from "lucide-react";

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
    const [expandedChapters, setExpandedChapters] = useState<string[]>(() => {
        // Find which chapter contains the currently active lesson
        const activeChapterSlug = chapters.find((chapter) =>
            chapter.lessons.some((lesson) =>
                pathname.includes(`${courseSlug}-${lesson.slug}`)
            )
        )?.slug;
        return activeChapterSlug ? [activeChapterSlug] : [];
    });

    const toggleChapter = (chapterSlug: string) => {
        setExpandedChapters((prev) =>
            prev.includes(chapterSlug)
                ? prev.filter((slug) => slug !== chapterSlug)
                : [...prev, chapterSlug]
        );
    };

    const isChapterExpanded = (chapterSlug: string) =>
        expandedChapters.includes(chapterSlug);

    const isLessonActive = (lessonSlug: string) =>
        pathname.includes(`${courseSlug}-${lessonSlug}`);

    return (
        <nav className="p-4 space-y-2">
            {chapters.map((chapter, chapterIndex) => {
                const isExpanded = isChapterExpanded(chapter.slug);
                const hasActiveLesson = chapter.lessons.some((lesson) =>
                    isLessonActive(lesson.slug)
                );

                return (
                    <div key={chapter.slug} className="space-y-1">
                        {/* Chapter Header */}
                        <button
                            onClick={() => toggleChapter(chapter.slug)}
                            className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${hasActiveLesson
                                ? "text-primary bg-primary/10"
                                : "text-foreground hover:bg-glass-bg hover:text-foreground"
                                }`}
                        >
                            <span className="shrink-0 transition-transform duration-200">
                                {isExpanded ? (
                                    <ChevronDown size={16} />
                                ) : (
                                    <ChevronRight size={16} />
                                )}
                            </span>
                            <BookOpen size={16} className="shrink-0" />
                            <span className="flex-1 text-left truncate">
                                CHAPTER {chapterIndex + 1}
                            </span>
                        </button>

                        {/* Chapter Title (collapsed state) */}
                        {!isExpanded && (
                            <div className="pl-9 pr-3 py-1">
                                <span className="text-xs text-foreground-muted truncate block">
                                    {chapter.title}
                                </span>
                            </div>
                        )}

                        {/* Lessons (expanded state) */}
                        {isExpanded && (
                            <div className="space-y-1 pl-4">
                                {/* Chapter Title */}
                                <div className="px-3 py-1.5">
                                    <span className="text-sm font-semibold text-foreground">
                                        {chapter.title}
                                    </span>
                                </div>

                                {/* Lessons */}
                                {chapter.lessons.map((lesson) => {
                                    const isActive = isLessonActive(lesson.slug);
                                    const lessonHref = `/blog/${courseSlug}-${lesson.slug}`;

                                    return (
                                        <Link
                                            key={lesson.slug}
                                            href={lessonHref}
                                            className={`group flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 relative ${isActive
                                                ? "text-primary bg-primary/5 font-medium"
                                                : "text-foreground-muted hover:text-foreground hover:bg-glass-bg"
                                                }`}
                                        >
                                            {/* Active indicator */}
                                            {isActive && (
                                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-linear-to-b from-primary via-secondary to-accent rounded-full" />
                                            )}

                                            <FileText
                                                size={14}
                                                className={`shrink-0 ml-2 ${isActive ? "text-primary" : ""
                                                    }`}
                                            />
                                            <span className="flex-1 truncate">
                                                {lesson.title}
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
