import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { AnimatedSection } from "@/components/ui/animated-section";
import { ProCard } from "@/components/ui/pro-card";
import { ClayBadge } from "@/components/ui/clay-badge";
import { ProjectIllustration } from "@/components/ui/project-illustration";
import { getProjectBySlug, projects } from "@/lib/projects";

const SITE_URL = "https://portfolio-blog-dk.vercel.app";

function IconArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconExternalLink() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 13V19C18 20.1046 17.1046 21 16 21H5C3.89543 21 3 20.1046 3 19V8C3 6.89543 3.89543 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconGithub() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.581 9.521 21.271 9.521 21.003C9.521 20.763 9.513 20.07 9.508 19.163C6.726 19.773 6.139 17.77 6.139 17.77C5.685 16.606 5.029 16.297 5.029 16.297C4.121 15.67 5.098 15.682 5.098 15.682C6.101 15.752 6.629 16.722 6.629 16.722C7.521 18.253 8.97 17.811 9.539 17.553C9.631 16.862 9.889 16.401 10.175 16.139C7.955 15.875 5.62 14.989 5.62 11.154C5.62 10.046 6.01 9.139 6.649 8.43C6.546 8.165 6.202 7.134 6.747 5.737C6.747 5.737 7.587 5.455 9.497 6.773C10.31 6.539 11.16 6.422 12.005 6.418C12.85 6.422 13.7 6.539 14.515 6.773C16.423 5.455 17.261 5.737 17.261 5.737C17.808 7.134 17.464 8.165 17.361 8.43C18.002 9.139 18.388 10.046 18.388 11.154C18.388 14.999 16.049 15.872 13.822 16.131C14.175 16.444 14.495 17.063 14.495 18.004C14.495 19.351 14.483 20.436 14.483 21.003C14.483 21.274 14.662 21.586 15.171 21.487C19.141 20.162 22.003 16.416 22.003 12C22.003 6.477 17.525 2 12 2Z" fill="currentColor" />
    </svg>
  );
}

function IconCheckCircle() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
          <div className="mb-8">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <IconArrowLeft />
              Back to projects
            </Link>
          </div>

          <div className="space-y-10 lg:space-y-12">
            {/* Hero: Showcase Illustration */}
            <ProCard className="p-0 overflow-hidden">
              <div className="grid gap-0 lg:grid-cols-[1fr_minmax(0,1.1fr)]">
                {/* Content side */}
                <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10 order-2 lg:order-1">
                  {project.tag && (
                    <ClayBadge className="inline-flex self-start px-3 py-1 mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] bg-primary/5 text-primary">
                      {project.tag}
                    </ClayBadge>
                  )}

                  <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4">
                    {project.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-foreground-muted mb-5">
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

                  <p className="text-foreground-muted leading-relaxed max-w-xl mb-6">
                    {project.description}
                  </p>

                  {(project.github || project.demo) && (
                    <div className="flex flex-wrap items-center gap-3">
                      {project.demo && (
                        <Link
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary inline-flex items-center gap-2 text-sm cursor-pointer"
                        >
                          <IconExternalLink />
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
                          <IconGithub />
                          <span>View code</span>
                        </Link>
                      )}
                    </div>
                  )}
                </div>

                {/* Illustration side */}
                <div className="relative overflow-hidden order-1 lg:order-2 min-h-[220px] lg:min-h-[360px]">
                  <ProjectIllustration
                    slug={project.slug}
                    className="w-full h-full"
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
                            <span className="mt-[2px] text-primary shrink-0">
                              <IconCheckCircle />
                            </span>
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
                          <IconGithub />
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
                          <IconExternalLink />
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
