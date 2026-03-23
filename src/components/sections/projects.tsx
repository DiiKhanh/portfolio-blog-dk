"use client";

import { AnimatedSection, staggerContainer, staggerItem } from "@/components/ui/animated-section";
import { ProCard } from "@/components/ui/pro-card";
import { ProjectIllustration } from "@/components/ui/project-illustration";
import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/lib/projects";

function IconGithub() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.581 9.521 21.271 9.521 21.003C9.521 20.763 9.513 20.07 9.508 19.163C6.726 19.773 6.139 17.77 6.139 17.77C5.685 16.606 5.029 16.297 5.029 16.297C4.121 15.67 5.098 15.682 5.098 15.682C6.101 15.752 6.629 16.722 6.629 16.722C7.521 18.253 8.97 17.811 9.539 17.553C9.631 16.862 9.889 16.401 10.175 16.139C7.955 15.875 5.62 14.989 5.62 11.154C5.62 10.046 6.01 9.139 6.649 8.43C6.546 8.165 6.202 7.134 6.747 5.737C6.747 5.737 7.587 5.455 9.497 6.773C10.31 6.539 11.16 6.422 12.005 6.418C12.85 6.422 13.7 6.539 14.515 6.773C16.423 5.455 17.261 5.737 17.261 5.737C17.808 7.134 17.464 8.165 17.361 8.43C18.002 9.139 18.388 10.046 18.388 11.154C18.388 14.999 16.049 15.872 13.822 16.131C14.175 16.444 14.495 17.063 14.495 18.004C14.495 19.351 14.483 20.436 14.483 21.003C14.483 21.274 14.662 21.586 15.171 21.487C19.141 20.162 22.003 16.416 22.003 12C22.003 6.477 17.525 2 12 2Z" fill="currentColor" />
        </svg>
    );
}

function IconExternalLink() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 13V19C18 20.1046 17.1046 21 16 21H5C3.89543 21 3 20.1046 3 19V8C3 6.89543 3.89543 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function IconArrowRight() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

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

                {/* Projects Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                    className="flex flex-col gap-6"
                >
                    {projects.map((project, index) => {
                        const isReversed = index % 2 !== 0;
                        return (
                            <motion.div key={project.slug} variants={staggerItem}>
                                <Link href={`/projects/${project.slug}`} className="block group">
                                    <ProCard className="p-0 overflow-hidden">
                                        <div className={`grid grid-cols-1 lg:grid-cols-2 ${isReversed ? "lg:direction-rtl" : ""}`}>
                                            {/* Illustration */}
                                            <div className={`relative overflow-hidden ${isReversed ? "lg:order-2" : ""}`}>
                                                <ProjectIllustration
                                                    slug={project.slug}
                                                    className="w-full h-full min-h-[220px] lg:min-h-[320px]"
                                                />
                                                {/* Hover overlay */}
                                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                {/* Tag badge */}
                                                {project.tag && (
                                                    <div className="absolute top-4 left-4">
                                                        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm text-primary border border-primary/20">
                                                            {project.tag}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className={`flex flex-col justify-center p-6 md:p-8 lg:p-10 ${isReversed ? "lg:order-1" : ""}`}>
                                                <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
                                                    {project.title}
                                                </h3>

                                                {project.role && (
                                                    <p className="text-sm text-foreground-muted/70 mb-4 font-medium">
                                                        {project.role}
                                                    </p>
                                                )}

                                                <p className="text-foreground-muted leading-relaxed mb-6">
                                                    {project.description}
                                                </p>

                                                {/* Tech Stack */}
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {project.tech.map((tech) => (
                                                        <span
                                                            key={tech}
                                                            className="text-xs px-2.5 py-1 rounded-md bg-primary/8 text-primary/80 font-medium border border-primary/10"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center gap-4 mt-auto">
                                                    <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all duration-200 cursor-pointer">
                                                        View details
                                                        <IconArrowRight />
                                                    </span>
                                                    {project.github && (
                                                        <a
                                                            href={project.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            aria-label={`View ${project.title} on GitHub`}
                                                        >
                                                            <IconGithub />
                                                            Code
                                                        </a>
                                                    )}
                                                    {project.demo && (
                                                        <a
                                                            href={project.demo}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-primary transition-colors cursor-pointer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            aria-label={`View ${project.title} demo`}
                                                        >
                                                            <IconExternalLink />
                                                            Demo
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </ProCard>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </AnimatedSection>
    );
}
