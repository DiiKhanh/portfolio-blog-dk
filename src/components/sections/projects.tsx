"use client";

import { AnimatedSection, staggerContainer, staggerItem } from "@/components/ui/animated-section";
import { ProCard } from "@/components/ui/pro-card";
import { ClayBadge } from "@/components/ui/clay-badge";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
    {
        title: "Neural Parking",
        description:
            "Smart parking management system using Computer Vision (YOLOv8) to detect license plates and track available slots in real time.",
        image: "/project-neural-parking.jpg",
        tech: ["Golang API", "React Native", "Flask", "YOLOv8", "Docker", "Nginx"],
        github: "",
        demo: "",
        span: "span-2",
    },
    {
        title: "Taseven",
        description:
            "Task management and real-time event tracking application with Google Maps integration, designed and led as a team project.",
        image: "/project-taseven.jpg",
        tech: ["React Native", "Express", "MongoDB", "Firebase", "Google Maps API"],
        github: "",
        demo: "",
        span: "",
    },
    {
        title: "Housing Service Management Portal",
        description:
            "Admin web portal for managing housing service requests, RBAC-based agent access and large data tables with filtering and pagination.",
        image: "/project-housing-portal.jpg",
        tech: ["React", "RBAC", "REST APIs", "Agile"],
        github: "",
        demo: "",
        span: "",
    },
    {
        title: "Gen Z Skills Support Website",
        description:
            "Web platform to support Gen Z skills development, including an admin panel and user-facing experience, built during my internship at GEEK Up.",
        image: "/project-genz.jpg",
        tech: ["React", "Refine", "React Query", "TypeScript"],
        github: "",
        demo: "",
        span: "span-2",
    },
];

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
                            <ProCard className="h-full flex flex-col p-0 overflow-hidden group">
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
                                    <p className="text-foreground-muted text-sm mb-4 flex-1 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 mb-4">
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
                                    <div className="flex gap-3">
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
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
                                                aria-label={`View ${project.title} demo`}
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </ProCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </AnimatedSection>
    );
}
