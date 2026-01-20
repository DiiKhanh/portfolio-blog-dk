"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { ProCard } from "@/components/ui/pro-card";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
    { icon: Github, href: "https://github.com/DiiKhanh", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/duykhanh030803", label: "LinkedIn" },
];

export function Contact() {
    return (
        <AnimatedSection className="section" id="contact">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="section-title">
                        Get in <span className="gradient-text">Touch</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        Have a project in mind? Let&apos;s work together!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <ProCard className="p-8" hover={false}>
                        <h3 className="font-heading text-2xl font-semibold mb-6">
                            Let&apos;s Connect
                        </h3>
                        <p className="text-foreground-muted mb-8 leading-relaxed">
                            I&apos;m always open to discussing new projects, creative ideas, or
                            opportunities to be part of your vision. Feel free to reach out!
                        </p>

                        {/* Email */}
                        <a
                            href="mailto:duykhanh.030803@gmail.com"
                            className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors mb-6 group cursor-pointer"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Mail className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-foreground-muted">Email</p>
                                <p className="font-medium group-hover:text-primary transition-colors">
                                    duykhanh.030803@gmail.com
                                </p>
                            </div>
                        </a>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-xl glass flex items-center justify-center text-foreground-muted hover:text-primary transition-colors cursor-pointer"
                                    whileHover={{ y: -2 }}
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </ProCard>

                    {/* Contact Form */}
                    <ProCard className="p-8" hover={false}>
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <motion.button
                                type="submit"
                                className="btn-primary w-full"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Send className="w-5 h-5" />
                                Send Message
                            </motion.button>
                        </form>
                    </ProCard>
                </div>
            </div>
        </AnimatedSection>
    );
}
