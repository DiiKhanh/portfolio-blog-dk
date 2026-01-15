"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { ProCard } from "@/components/ui/pro-card";
import { motion } from "framer-motion";
import { Building2, Calendar } from "lucide-react";

const experiences = [
    {
        company: "Tech Company A",
        role: "Senior Software Engineer",
        period: "2022 - Present",
        description: "Leading frontend development for enterprise SaaS products. Architecting scalable React applications and mentoring junior developers.",
        highlights: ["Led team of 5 engineers", "Improved performance by 40%", "Launched 3 major features"],
    },
    {
        company: "Startup B",
        role: "Full Stack Developer",
        period: "2020 - 2022",
        description: "Built and maintained multiple web applications from scratch. Worked closely with product team to deliver user-centric solutions.",
        highlights: ["Built MVP in 3 months", "Handled 100K+ users", "Integrated 10+ third-party APIs"],
    },
    {
        company: "Agency C",
        role: "Frontend Developer",
        period: "2019 - 2020",
        description: "Developed responsive websites and web applications for various clients across different industries.",
        highlights: ["Delivered 20+ projects", "Client satisfaction 98%", "Reduced load time by 50%"],
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
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2" />

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
                                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background transform -translate-x-1/2 md:-translate-x-1/2 z-10" />

                                {/* Content */}
                                <div className={`flex-1 pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                                    <ProCard className="p-6">
                                        {/* Header */}
                                        <div className={`flex items-start gap-4 mb-4 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
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
