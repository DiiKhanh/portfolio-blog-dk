"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 500);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 w-10 h-10 rounded-full glass flex items-center justify-center text-foreground-muted hover:text-primary hover:border-primary/30 transition-all duration-200 cursor-pointer shadow-lg"
            aria-label="Back to top"
        >
            <ArrowUp size={16} />
        </button>
    );
}
