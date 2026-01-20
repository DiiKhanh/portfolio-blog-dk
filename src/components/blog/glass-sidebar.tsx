"use client";

import { ReactNode } from "react";
import { TreeNavigation } from "./tree-navigation";

interface Chapter {
    title: string;
    slug: string;
    lessons: {
        title: string;
        slug: string;
    }[];
}

interface GlassSidebarProps {
    courseTitle: string;
    courseSlug: string;
    chapters: Chapter[];
    children?: ReactNode;
}

export function GlassSidebar({
    courseTitle,
    courseSlug,
    chapters
}: GlassSidebarProps) {
    const totalLessons = chapters.reduce((acc, c) => acc + c.lessons.length, 0);

    return (
        <aside className="sidebar-glass sticky top-20">
            {/* Course Title Header */}
            <div className="p-6 border-b border-glass-border bg-linear-to-br from-primary/5 to-transparent">
                <h2 className="font-heading font-bold text-xl text-foreground mb-2 leading-tight">
                    {courseTitle}
                </h2>
                <p className="text-xs text-foreground-muted flex items-center gap-2">
                    <span className="inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {chapters.length} chapters
                    </span>
                    <span className="text-foreground-muted/50">•</span>
                    <span className="inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {totalLessons} lessons
                    </span>
                </p>
            </div>

            {/* Tree Navigation */}
            <div className="overflow-y-auto max-h-[calc(100vh-220px)] scrollbar-thin">
                <TreeNavigation courseSlug={courseSlug} chapters={chapters} />
            </div>
        </aside>
    );
}
