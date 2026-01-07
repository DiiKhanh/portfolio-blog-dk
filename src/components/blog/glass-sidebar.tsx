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
    return (
        <aside className="sidebar-glass">
            {/* Course Title */}
            <div className="p-4 border-b border-glass-border">
                <h2 className="font-heading font-bold text-lg text-foreground">
                    {courseTitle}
                </h2>
                <p className="text-xs text-foreground-muted mt-1">
                    {chapters.length} chapters • {chapters.reduce((acc, c) => acc + c.lessons.length, 0)} lessons
                </p>
            </div>

            {/* Tree Navigation */}
            <div className="overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-thin">
                <TreeNavigation courseSlug={courseSlug} chapters={chapters} />
            </div>
        </aside>
    );
}
