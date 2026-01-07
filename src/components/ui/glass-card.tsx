"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
    ({ children, className = "", hover = true, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                className={`glass-card p-6 ${className}`}
                whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
                transition={{ duration: 0.3, ease: "easeOut" }}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

GlassCard.displayName = "GlassCard";
