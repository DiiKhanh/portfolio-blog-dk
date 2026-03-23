"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { ProCard } from "@/components/ui/pro-card";

function IconCode() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 18L2 12L8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 6L22 12L16 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 4L10 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
    );
}

function IconRocket() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 16.5C3 18 3 21 3 21C3 21 6 21 7.5 19.5C8.32 18.68 8.32 17.32 7.5 16.5C6.68 15.68 5.32 15.68 4.5 16.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14.5 4C14.5 4 18 2 21.5 2.5C22 6 20 9.5 20 9.5L12.5 17L7 11.5L14.5 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 9C15.5523 9 16 8.55228 16 8C16 7.44772 15.5523 7 15 7C14.4477 7 14 7.44772 14 8C14 8.55228 14.4477 9 15 9Z" fill="currentColor" />
            <path d="M12.5 17L17 19.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 11.5L4.5 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function IconCoffee() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 8H18C19.1046 8 20 8.89543 20 10V11C20 12.1046 19.1046 13 18 13H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 8H17V14C17 16.2091 15.2091 18 13 18H7C4.79086 18 3 16.2091 3 14V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 1V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
            <path d="M10 1V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
            <path d="M14 1V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
            <line x1="2" y1="21" x2="18" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function IconMapPin() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
        </svg>
    );
}

const stats = [
    {
        icon: IconCode,
        value: "1+",
        label: "Years Coding",
        color: "var(--primary)",
        bgColor: "rgba(0, 217, 255, 0.08)",
        borderColor: "rgba(0, 217, 255, 0.15)",
    },
    {
        icon: IconRocket,
        value: "8+",
        label: "Projects Shipped",
        color: "var(--accent)",
        bgColor: "rgba(16, 185, 129, 0.08)",
        borderColor: "rgba(16, 185, 129, 0.15)",
    },
    {
        icon: IconCoffee,
        value: "999+",
        label: "Cups of Coffee",
        color: "var(--secondary)",
        bgColor: "rgba(14, 165, 233, 0.08)",
        borderColor: "rgba(14, 165, 233, 0.15)",
    },
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

                {/* Bento Grid Layout */}
                <div className="bento-grid">
                    {/* Row 1: Profile + Bio */}
                    <ProCard className="bento-item span-2 flex flex-col items-center justify-center text-center p-8">
                        <div className="relative w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-glass-border transition-all duration-300 hover:scale-105 hover:border-primary hover:shadow-xl hover:shadow-primary/30 group cursor-pointer">
                            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-r from-primary via-accent to-secondary animate-spin-slow" style={{ padding: '4px' }}>
                                <div className="absolute inset-[4px] rounded-full bg-background" />
                            </div>
                            <div className="absolute inset-0 bg-linear-to-br from-primary/40 via-accent/30 to-secondary/40 z-10" />
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <span className="text-5xl font-heading font-bold text-white/80">KP</span>
                            </div>
                            <div className="absolute top-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background z-30 animate-pulse" />
                        </div>
                        <h3 className="font-heading text-2xl font-bold mb-2">
                            Khanh Pham
                        </h3>
                        <p className="text-foreground-muted mb-4">
                            Full Stack Developer
                        </p>
                        <div className="flex items-center gap-2 text-sm text-foreground-muted">
                            <IconMapPin />
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

                    {/* Row 2: Quick Stats */}
                    <div className="bento-item col-span-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {stats.map((stat, index) => {
                            const StatIcon = stat.icon;
                            return (
                                <ProCard
                                    key={index}
                                    className="p-6 flex flex-col items-center justify-center text-center !rounded-2xl"
                                    style={{
                                        background: stat.bgColor,
                                        borderColor: stat.borderColor,
                                    }}
                                >
                                    <div
                                        className="flex h-14 w-14 items-center justify-center rounded-2xl mb-4"
                                        style={{
                                            background: `linear-gradient(135deg, ${stat.borderColor}, transparent)`,
                                            color: stat.color,
                                        }}
                                    >
                                        <StatIcon />
                                    </div>
                                    <div
                                        className="font-heading text-3xl font-bold mb-1"
                                        style={{
                                            background: `linear-gradient(135deg, ${stat.color}, var(--foreground))`,
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            backgroundClip: "text",
                                        }}
                                    >
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-foreground-muted font-medium">
                                        {stat.label}
                                    </div>
                                </ProCard>
                            );
                        })}
                    </div>

                    {/* Philosophy Card */}
                    <ProCard className="bento-item col-span-full p-8">
                        <h3 className="font-heading text-xl font-semibold mb-4">
                            What Drives Me
                        </h3>
                        <p className="text-foreground-muted leading-relaxed max-w-3xl">
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
