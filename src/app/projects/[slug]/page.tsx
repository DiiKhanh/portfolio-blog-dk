import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

import { AnimatedSection } from "@/components/ui/animated-section";
import { ProCard } from "@/components/ui/pro-card";
import { ClayBadge } from "@/components/ui/clay-badge";
import { getProjectBySlug, projects } from "@/lib/projects";

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

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return notFound();
  }

  return (
    <main className="relative">
      <AnimatedSection className="section pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <div className="mb-6">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to projects
            </Link>
          </div>

          {/* Header */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-1">
                  {project.title}
                </h1>
                {project.role && (
                  <p className="text-sm text-foreground-muted">{project.role}</p>
                )}
              </div>
              {project.tag && (
                <ClayBadge className="px-3 py-1 text-xs font-semibold">
                  {project.tag}
                </ClayBadge>
              )}
            </div>

            {project.context && (
              <p className="text-xs uppercase tracking-[0.18em] text-foreground-muted/70">
                {project.context}
              </p>
            )}
          </div>

          {/* Layout: main content + sidebar */}
          <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            {/* Main narrative */}
            <ProCard className="p-6 md:p-7">
              <h2 className="font-heading text-lg md:text-xl font-semibold mb-3">
                Project overview
              </h2>
              <p className="text-foreground-muted leading-relaxed mb-5">
                {project.longDescription}
              </p>

              {project.highlights.length > 0 && (
                <div>
                  <h3 className="font-heading text-sm font-semibold mb-2 tracking-wide text-foreground-muted uppercase">
                    What I contributed
                  </h3>
                  <ul className="space-y-2">
                    {project.highlights.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-foreground-muted leading-snug"
                      >
                        <span className="text-primary mr-1.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </ProCard>

            {/* Sidebar: tech + links */}
            <div className="space-y-4">
              <ProCard className="p-5">
                <h3 className="font-heading text-sm font-semibold mb-3 tracking-wide text-foreground-muted uppercase">
                  Tech stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1.5 rounded-md bg-primary/10 text-primary font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </ProCard>

              {(project.github || project.demo) && (
                <ProCard className="p-5">
                  <h3 className="font-heading text-sm font-semibold mb-3 tracking-wide text-foreground-muted uppercase">
                    Links
                  </h3>
                  <div className="flex flex-col gap-2">
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
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
                        className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-primary transition-colors"
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
      </AnimatedSection>
    </main>
  );
}

