import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, CheckCircle2 } from "lucide-react";

import { AnimatedSection } from "@/components/ui/animated-section";
import { ProCard } from "@/components/ui/pro-card";
import { ClayBadge } from "@/components/ui/clay-badge";
import { getProjectBySlug, projects } from "@/lib/projects";

const SITE_URL = "https://portfolio-blog-dk.vercel.app";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const projectUrl = `${SITE_URL}/projects/${slug}`;

  return {
    title: project.title,
    description: project.description,
    keywords: project.tech,
    openGraph: {
      title: `${project.title} | Khanh Pham`,
      description: project.description,
      url: projectUrl,
      type: "article",
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.image],
    },
    alternates: {
      canonical: projectUrl,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return notFound();
  }

  return (
    <main className="relative">
      <AnimatedSection className="section pt-32 pb-24">
        <div className="max-w-5xl lg:max-w-6xl mx-auto">
          {/* Back link */}
          <div className="mb-6">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-xs md:text-sm text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to projects
            </Link>
          </div>

          <div className="space-y-10 lg:space-y-12">
            {/* Hero: title + meta + preview */}
            <ProCard className="p-6 md:p-8 lg:p-10 overflow-hidden">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-center">
                <div className="space-y-5">
                  {project.tag && (
                    <ClayBadge className="inline-flex px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] bg-primary/5 text-primary">
                      {project.tag}
                    </ClayBadge>
                  )}

                  <div className="space-y-3">
                    <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                      {project.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-foreground-muted">
                      {project.role && (
                        <span className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1">
                          {project.role}
                        </span>
                      )}
                      {project.context && (
                        <span className="text-xs uppercase tracking-[0.18em] text-foreground-muted/70">
                          {project.context}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-foreground-muted leading-relaxed max-w-xl">
                    {project.description}
                  </p>

                  {(project.github || project.demo) && (
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      {project.demo && (
                        <Link
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary inline-flex items-center gap-2 text-sm cursor-pointer"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>View live demo</span>
                        </Link>
                      )}
                      {project.github && (
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors cursor-pointer"
                        >
                          <Github className="w-4 h-4" />
                          <span>View code</span>
                        </Link>
                      )}
                    </div>
                  )}
                </div>

                <div className="relative h-52 md:h-64 lg:h-72 rounded-2xl overflow-hidden bg-secondary/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 480px, 100vw"
                    priority
                  />
                </div>
              </div>
            </ProCard>

            {/* Layout: main content + sidebar */}
            <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              {/* Main narrative */}
              <ProCard className="p-6 md:p-7 lg:p-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="font-heading text-lg md:text-xl font-semibold tracking-tight">
                      Project overview
                    </h2>
                    <p className="text-foreground-muted leading-relaxed">
                      {project.longDescription}
                    </p>
                  </div>

                  {project.highlights.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-heading text-xs font-semibold tracking-[0.2em] text-foreground-muted uppercase">
                        What I contributed
                      </h3>
                      <ul className="space-y-2.5">
                        {project.highlights.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-foreground-muted leading-snug"
                          >
                            <CheckCircle2 className="mt-[2px] w-4 h-4 text-primary shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </ProCard>

              {/* Sidebar: tech + meta */}
              <div className="space-y-4">
                <ProCard className="p-5 md:p-6">
                  <h3 className="font-heading text-xs font-semibold mb-3 tracking-[0.18em] text-foreground-muted uppercase">
                    Tech stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1.5 rounded-full bg-primary/10 text-primary font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </ProCard>

                {(project.role || project.context || project.tag) && (
                  <ProCard className="p-5 md:p-6">
                    <h3 className="font-heading text-xs font-semibold mb-3 tracking-[0.18em] text-foreground-muted uppercase">
                      Project details
                    </h3>
                    <div className="space-y-2 text-sm text-foreground-muted">
                      {project.role && (
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.16em] text-foreground-muted/70">
                            Role
                          </p>
                          <p>{project.role}</p>
                        </div>
                      )}
                      {project.context && (
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.16em] text-foreground-muted/70">
                            Context
                          </p>
                          <p>{project.context}</p>
                        </div>
                      )}
                      {project.tag && (
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.16em] text-foreground-muted/70">
                            Project type
                          </p>
                          <p>{project.tag}</p>
                        </div>
                      )}
                    </div>
                  </ProCard>
                )}

                {(project.github || project.demo) && (
                  <ProCard className="p-5 md:p-6">
                    <h3 className="font-heading text-xs font-semibold mb-3 tracking-[0.18em] text-foreground-muted uppercase">
                      Links
                    </h3>
                    <div className="flex flex-col gap-2">
                      {project.github && (
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
                        >
                          <Github className="w-4 h-4" />
                          <span>View code on GitHub</span>
                        </Link>
                      )}
                      {project.demo && (
                        <Link
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-primary transition-colors cursor-pointer"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>View live demo</span>
                        </Link>
                      )}
                    </div>
                  </ProCard>
                )}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
}

