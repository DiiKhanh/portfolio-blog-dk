"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { ProCard } from "@/components/ui/pro-card";
import { Code, Briefcase, Coffee, MapPin } from "lucide-react";


const stats = [
    { icon: Code, value: "1+", label: "Years Coding Experience" },
    { icon: Briefcase, value: "8+", label: "Real Projects Shipped" },
    { icon: Coffee, value: "∞", label: "Late-night Debug Sessions" },
];

export function About() {
    return (
        <AnimatedSection className="section" id="about">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="section-title">
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        Junior engineer blending frontend, mobile and backend to ship real-world products
                    </p>
                </div>

                {/* Bento Grid Layout - 2 Rows Desktop */}
                <div className="bento-grid">
                    {/* Row 1: Profile + Bio */}
                    {/* Profile Card - Large */}
                    <ProCard className="bento-item span-2 flex flex-col items-center justify-center text-center p-8">
                        <div className="relative w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-glass-border transition-all duration-300 hover:scale-105 hover:border-primary hover:shadow-xl hover:shadow-primary/30 group cursor-pointer">
                            {/* Rotating gradient border effect on hover */}
                            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-r from-primary via-accent to-secondary animate-spin-slow" style={{ padding: '4px' }}>
                                <div className="absolute inset-[4px] rounded-full bg-background" />
                            </div>
                            {/* Avatar content */}
                            <div className="absolute inset-0 bg-linear-to-br from-primary/40 via-accent/30 to-secondary/40 z-10" />
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <span className="text-5xl font-heading font-bold text-white/80">KP</span>
                            </div>
                            {/* Online indicator - top right */}
                            <div className="absolute top-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background z-30 animate-pulse" />
                        </div>
                        <h3 className="font-heading text-2xl font-bold mb-2">
                            Khanh Pham
                        </h3>
                        <p className="text-foreground-muted mb-4">
                            Full Stack Developer
                        </p>
                        <div className="flex items-center gap-2 text-sm text-foreground-muted">
                            <MapPin className="w-4 h-4" />
                            <span>Ho Chi Minh City, Vietnam</span>
                        </div>
                    </ProCard>

                    {/* Bio Card */}
                    <ProCard className="bento-item span-2 p-8">
                        <h3 className="font-heading text-xl font-semibold mb-4">
                            My Journey
                        </h3>
                        <p className="text-foreground-muted leading-relaxed">
                            I&apos;m a Junior Software Engineer working across frontend, mobile and backend, with a strong
                            interest in designing robust workflows, role-based access control (RBAC) and performance-friendly
                            architectures. I&apos;m gradually expanding into DevOps (Docker, CI/CD) to better support scalable
                            systems in production. I graduated in Information Systems from the University of Information Technology
                            (UIT – VNUHCM) with a 3.5/4.0 GPA and have received multiple awards for student research and competitions.
                        </p>
                    </ProCard>

                    {/* Row 2: Compact Stats + Philosophy */}
                    <ProCard className="bento-item span-2 p-5 md:p-6 flex flex-col gap-4">
                        <div className="flex items-center justify-between gap-3">
                            <h3 className="font-heading text-sm font-semibold tracking-wide text-foreground-muted uppercase">
                                Quick stats
                            </h3>
                            <span className="text-xs rounded-full px-2 py-1 bg-primary/5 text-primary border border-primary/10">
                                Early–career, real-world impact
                            </span>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-between">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="flex flex-1 items-center gap-3 rounded-lg bg-background/60 border border-border/60 px-3 py-2.5 sm:px-3.5 sm:py-3"
                                >
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <stat.icon className="w-4 h-4" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-heading text-lg font-semibold leading-tight gradient-text">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs text-foreground-muted leading-snug">
                                            {stat.label}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ProCard>

                    {/* Philosophy Card */}
                    <ProCard className="bento-item span-2 p-8">
                        <h3 className="font-heading text-xl font-semibold mb-4">
                            What Drives Me
                        </h3>
                        <p className="text-foreground-muted leading-relaxed">
                            I love turning messy real-world requirements into clear, reliable flows. For me,
                            good engineering is a balance between clean architecture, pragmatic trade-offs
                            and empathy for end users and teammates. Every project is a chance to learn,
                            communicate better and raise the bar for quality.
                        </p>
                    </ProCard>
                </div>
            </div>
        </AnimatedSection>
    );
}
