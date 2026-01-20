"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { ProCard } from "@/components/ui/pro-card";
import { Code, Briefcase, Coffee, MapPin } from "lucide-react";


const stats = [
    { icon: Code, value: "5+", label: "Years Experience" },
    { icon: Briefcase, value: "30+", label: "Projects Completed" },
    { icon: Coffee, value: "1000+", label: "Cups of Coffee" },
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
                        A passionate developer who loves building things for the web
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
                            I&apos;m a passionate Full Stack Developer with 5+ years of experience
                            building web and mobile applications. I specialize in React, Next.js,
                            and Node.js, with a strong focus on creating intuitive user experiences
                            and scalable architectures.
                        </p>
                    </ProCard>

                    {/* Row 2: Stats Cards + Philosophy */}
                    {stats.map((stat, index) => (
                        <ProCard key={index} className="bento-item p-6 text-center">
                            <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                            <div className="font-heading text-3xl font-bold mb-1 gradient-text">
                                {stat.value}
                            </div>
                            <div className="text-sm text-foreground-muted">{stat.label}</div>
                        </ProCard>
                    ))}

                    {/* Philosophy Card */}
                    <ProCard className="bento-item p-8">
                        <h3 className="font-heading text-xl font-semibold mb-4">
                            What Drives Me
                        </h3>
                        <p className="text-foreground-muted leading-relaxed">
                            I believe in writing clean, maintainable code and building products
                            that genuinely help people. Every project is an opportunity to learn
                            something new and push the boundaries of what&apos;s possible on the web.
                        </p>
                    </ProCard>
                </div>
            </div>
        </AnimatedSection>
    );
}
