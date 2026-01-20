"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Briefcase, Users } from "lucide-react";
import Link from "next/link";
import { TerminalCode } from "@/components/ui/terminal-code";

const codeLines = [
    "const developer = {",
    "  name: 'Khanh Pham',",
    "  role: 'Software Engineer',",
    "  skills: ['React', 'Next.js', 'TypeScript'],",
    "  passion: 'Building amazing products ✨'",
    "};",
];

const skills = [
    "React & Next.js",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "Framer Motion",
    "Clean Architecture"
];

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center section pt-32 pb-20">
            <div className="max-w-6xl mx-auto w-full">
                {/* 2-Column Grid Layout */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Column: Content */}
                    <div>
                        {/* Status Badge with Avatar placeholder */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-8 flex items-center gap-3"
                        >
                            {/* Avatar */}
                            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30">
                                <div className="absolute inset-0 bg-linear-to-br from-primary/40 via-accent/30 to-secondary/40" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xl font-heading font-bold text-white/80">KP</span>
                                </div>
                                {/* Online indicator */}
                                <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                            </div>
                            {/* Badge */}
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-foreground-muted">
                                5+ Years Building Digital Excellence
                            </span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
                        >
                            Hi, I'm <span className="gradient-text-animate">Khanh Pham</span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-xl md:text-2xl text-foreground-muted font-medium mb-3"
                        >
                            Software Engineer, Tech Enthusiast
                        </motion.p>

                        {/* Small tagline */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.45 }}
                            className="text-base text-foreground-muted/70 mb-6 italic"
                        >
                            I craft solutions that scale
                        </motion.p>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="text-lg text-foreground-muted mb-8 leading-relaxed"
                        >
                            Proven Full Stack Developer – From building scalable web applications
                            to crafting exceptional user experiences for thousands of users
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-wrap items-center gap-4 mb-8"
                        >
                            <Link href="#projects" className="btn-primary">
                                View My Work
                            </Link>
                            <Link href="#contact" className="btn-secondary">
                                Get in Touch
                            </Link>
                        </motion.div>

                        {/* Stats Badges */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="flex flex-wrap items-center gap-4 mb-8"
                        >
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass">
                                <Briefcase className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">5+ Years Experience</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass">
                                <Users className="w-4 h-4 text-accent" />
                                <span className="text-sm font-medium">30+ Projects Delivered</span>
                            </div>
                        </motion.div>

                        {/* Skills Tags */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="flex flex-wrap gap-2"
                        >
                            {skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                                >
                                    {skill}
                                </span>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Column: Terminal Code */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="hidden lg:block"
                    >
                        <TerminalCode title="DanTech.kt" lines={codeLines} />
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ArrowDown className="w-6 h-6 text-foreground-muted" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
