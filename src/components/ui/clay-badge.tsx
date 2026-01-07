"use client";

import { motion } from "framer-motion";

interface ClayBadgeProps {
    children: React.ReactNode;
    className?: string;
}

export function ClayBadge({ children, className = "" }: ClayBadgeProps) {
    return (
        <motion.span
            className={`clay-badge inline-flex items-center gap-2 ${className}`}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
        >
            {children}
        </motion.span>
    );
}
