"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        function updateProgress() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setProgress(Math.min(100, Math.max(0, pct)));
        }

        window.addEventListener("scroll", updateProgress, { passive: true });
        updateProgress();

        return () => window.removeEventListener("scroll", updateProgress);
    }, []);

    return (
        <div
            className="fixed top-0 left-0 right-0 z-50 h-[3px] pointer-events-none"
            aria-hidden="true"
        >
            <div
                className="h-full bg-linear-to-r from-primary to-accent transition-[width] duration-100"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
