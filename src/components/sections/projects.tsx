"use client";

import { AnimatedSection, staggerContainer, staggerItem } from "@/components/ui/animated-section";
import { ProCard } from "@/components/ui/pro-card";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/lib/projects";

export function Projects() {
    return (
        <AnimatedSection className="section" id="projects">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="section-title">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        A selection of my recent work and side projects
                    </p>
                </div>

                {/* Projects Bento Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                    className="bento-grid"
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            variants={staggerItem}
                            className={`bento-item ${project.span}`}
                        >
                            <Link href={`/projects/${project.slug}`} className="block h-full group">
                                <ProCard className="h-full flex flex-col p-0 overflow-hidden">
                                    {/* Project Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                                        {/* Placeholder gradient pattern */}
                                        <div className="absolute inset-0 opacity-30">
                                            <div className="w-full h-full bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30" />
                                        </div>
                                    </div>

                                    {/* Project Content */}
                                    <div className="flex flex-col flex-1 p-6">
                                        <h3 className="font-heading text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>

                                        <p className="text-foreground-muted text-sm leading-relaxed mb-4 flex-1">
                                            {project.description}
                                        </p>

                                        {/* Tech Stack */}
                                        <div className="mt-auto flex flex-wrap gap-2 mb-4">
                                            {project.tech.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary font-medium hover:bg-primary/20 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Links */}
                                        {(project.github || project.demo) && (
                                            <div className="flex gap-3">
                                                {project.github && (
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
                                                        onClick={(e) => e.stopPropagation()}
                                                        aria-label={`View ${project.title} on GitHub`}
                                                    >
                                                        <Github className="w-4 h-4" />
                                                        Code
                                                    </a>
                                                )}
                                                {project.demo && (
                                                    <a
                                                        href={project.demo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 text-sm text-foreground-muted hover:text-primary transition-colors"
                                                        onClick={(e) => e.stopPropagation()}
                                                        aria-label={`View ${project.title} demo`}
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                        Demo
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </ProCard>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </AnimatedSection>
    );
}
