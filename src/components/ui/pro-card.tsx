"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

interface ProCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    gradient?: boolean;
}

export const ProCard = forwardRef<HTMLDivElement, ProCardProps>(
    ({ children, className = "", hover = true, gradient = false, ...props }, ref) => {
        if (gradient) {
            return (
                <motion.div
                    ref={ref}
                    className={`pro-card-gradient ${className}`}
                    whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    {...props}
                >
                    <div className="pro-card-inner p-6">
                        {children}
                    </div>
                </motion.div>
            );
        }

        return (
            <motion.div
                ref={ref}
                className={`pro-card p-6 ${className}`}
                whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

ProCard.displayName = "ProCard";
