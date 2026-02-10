"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { ProCard } from "@/components/ui/pro-card";
import { motion } from "framer-motion";
import { Building2, Calendar } from "lucide-react";

const experiences = [
    {
        company: "StackTech",
        role: "Software Engineer",
        period: "06/2025 – Present",
        description:
            "Designing and implementing CRM dashboards and real-time communication features for thousands of users using Flutter Web and modern web technologies.",
        highlights: [
            "Architected CRM admin dashboard with Clean Architecture and BLoC",
            "Integrated Centrifugo and chat SDK for real-time messaging",
            "Set up automated testing with Vitest (integration) and Cypress (E2E)",
        ],
    },
    {
        company: "TGL Solutions",
        role: "Software Engineer (Fresher)",
        period: "6 months",
        description:
            "Worked on a housing service management ecosystem including a React Native mobile app and an internal admin web portal.",
        highlights: [
            "Built repair request workflows with real-time status tracking",
            "Implemented push notification flows for maintenance schedules",
            "Helped design .NET 6 APIs and error-handling conventions",
        ],
    },
    {
        company: "GEEK Up",
        role: "Product Frontend Intern",
        period: "06/2024 – 08/2024",
        description:
            "Joined a cross-functional product team to deliver a skills-support platform for Gen Z using modern React tooling and agile practices.",
        highlights: [
            "Developed reusable UI components with React, Refine and React Query",
            "Participated in Design Sprints and product discovery",
            "Delivered both admin panel and end-user web experience",
        ],
    },
];

export function Experience() {
    return (
        <AnimatedSection className="section" id="experience">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="section-title">
                        Work <span className="gradient-text">Experience</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        My professional journey and achievements
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary/50 via-secondary/30 to-accent/50 transform md:-translate-x-1/2" />

                    {/* Experience Items */}
                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.company}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Timeline Dot */}
                                {/* <div className="absolute left-0 md:left-1/2 w-3 h-3 rounded-full bg-primary/60 border-2 border-background shadow-[0_0_12px_rgba(0,217,255,0.5)] transform -translate-x-1/2 md:-translate-x-1/2 z-10" /> */}

                                {/* Content */}
                                <div className={`flex-1 pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                                    <ProCard className="p-6">
                                        <div className={`flex items-start gap-4 mb-4 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                                <Building2 className="w-6 h-6 text-primary" />
                                            </div>
                                            <div className={`${index % 2 === 0 ? "md:text-right" : ""}`}>
                                                <h3 className="font-heading text-xl font-semibold">{exp.role}</h3>
                                                <p className="text-primary font-medium">{exp.company}</p>
                                            </div>
                                        </div>

                                        {/* Period */}
                                        <div className={`flex items-center gap-2 text-sm text-foreground-muted mb-4 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                                            <Calendar className="w-4 h-4" />
                                            {exp.period}
                                        </div>

                                        {/* Description */}
                                        <p className="text-foreground-muted mb-4 leading-relaxed">
                                            {exp.description}
                                        </p>

                                        {/* Highlights */}
                                        <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                                            {exp.highlights.map((highlight) => (
                                                <span
                                                    key={highlight}
                                                    className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium"
                                                >
                                                    {highlight}
                                                </span>
                                            ))}
                                        </div>
                                    </ProCard>
                                </div>

                                {/* Spacer for alternating layout */}
                                <div className="hidden md:block flex-1" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}
