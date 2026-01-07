"use client";

import { AnimatedSection, staggerContainer, staggerItem } from "@/components/ui/animated-section";
import { ClayBadge } from "@/components/ui/clay-badge";
import { motion } from "framer-motion";

const skillCategories = [
    {
        title: "Frontend",
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vue.js"],
    },
    {
        title: "Backend",
        skills: ["Node.js", "Express", "NestJS", "Python", "PostgreSQL", "MongoDB"],
    },
    {
        title: "Mobile",
        skills: ["React Native", "Flutter", "iOS", "Android", "Expo"],
    },
    {
        title: "DevOps & Tools",
        skills: ["Docker", "AWS", "Git", "CI/CD", "Vercel", "Firebase"],
    },
];

export function Skills() {
    return (
        <AnimatedSection className="section" id="skills">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="section-title">
                        Tech <span className="gradient-text">Stack</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        Technologies and tools I work with daily
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.title}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={staggerContainer}
                            className="glass-card p-6 md:p-8"
                        >
                            <h3 className="font-heading text-xl font-semibold mb-6 text-primary">
                                {category.title}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {category.skills.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skill}
                                        variants={staggerItem}
                                        custom={skillIndex}
                                    >
                                        <ClayBadge>{skill}</ClayBadge>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
}
