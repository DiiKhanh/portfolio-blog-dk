import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  level?: "beginner" | "intermediate" | "advanced";
  tags: string[];
  readingTime: string;
  wordCount: number;
  // Series support
  series?: string;
  seriesTitle?: string;
  seriesOrder?: number;
  // Flags
  draft?: boolean;
  featured?: boolean;
  // Legacy course support
  course?: string;
  courseChapter?: string;
  content: string;
}

export interface CourseMetadata {
  title: string;
  description: string;
  chapters: {
    title: string;
    slug: string;
    lessons: {
      title: string;
      slug: string;
    }[];
  }[];
}

const BLOG_PATH = path.join(process.cwd(), "src/content/blog");

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];

  // Read tips posts
  const tipsPath = path.join(BLOG_PATH, "tips");
  if (fs.existsSync(tipsPath)) {
    const tipFiles = fs
      .readdirSync(tipsPath)
      .filter((file) => file.endsWith(".mdx"));
    for (const file of tipFiles) {
      const post = await getPostBySlug(file.replace(".mdx", ""), "tips");
      if (post) posts.push(post);
    }
  }

  // Read course posts
  const coursesPath = path.join(BLOG_PATH, "courses");
  if (fs.existsSync(coursesPath)) {
    const courses = fs.readdirSync(coursesPath);
    for (const course of courses) {
      const coursePath = path.join(coursesPath, course);
      if (fs.statSync(coursePath).isDirectory()) {
        const lessonFiles = fs
          .readdirSync(coursePath)
          .filter((file) => file.endsWith(".mdx"));
        for (const file of lessonFiles) {
          const post = await getPostBySlug(
            `${course}/${file.replace(".mdx", "")}`,
            "courses",
          );
          if (post) posts.push(post);
        }
      }
    }
  }

  // Filter drafts in production
  const isDev = process.env.NODE_ENV === "development";
  const visible = isDev ? posts : posts.filter((p) => !p.draft);

  // Sort by date, newest first
  return visible.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getPostBySlug(
  slug: string,
  category?: "tips" | "courses",
): Promise<BlogPost | null> {
  let filePath = "";
  let postCategory = "tips";

  if (category) {
    filePath = path.join(BLOG_PATH, category, `${slug}.mdx`);
    postCategory = category;
  } else {
    const tipsPath = path.join(BLOG_PATH, "tips", `${slug}.mdx`);
    if (fs.existsSync(tipsPath)) {
      filePath = tipsPath;
      postCategory = "tips";
    } else {
      const coursesPath = path.join(BLOG_PATH, "courses");
      if (fs.existsSync(coursesPath)) {
        const courses = fs.readdirSync(coursesPath);
        for (const course of courses) {
          const coursePath = path.join(coursesPath, course);
          if (
            fs.statSync(coursePath).isDirectory() &&
            slug.startsWith(course + "-")
          ) {
            const lessonSlug = slug.slice(course.length + 1);
            const tryPath = path.join(coursePath, `${lessonSlug}.mdx`);
            if (fs.existsSync(tryPath)) {
              filePath = tryPath;
              postCategory = "courses";
              break;
            }
          }
        }
      }
      if (!filePath) {
        filePath = path.join(BLOG_PATH, "courses", `${slug}.mdx`);
        postCategory = "courses";
      }
    }
  }

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);
  const stats = readingTime(content);

  return {
    slug: slug.replace("/", "-"),
    title: data.title || "Untitled",
    description: data.description || "",
    date: data.date || new Date().toISOString().split("T")[0],
    category: data.category || postCategory,
    level: data.level,
    tags: data.tags || [],
    readingTime: stats.text,
    wordCount: stats.words,
    series: data.series,
    seriesTitle: data.seriesTitle,
    seriesOrder: data.seriesOrder,
    draft: data.draft,
    featured: data.featured,
    course: data.course,
    courseChapter: data.courseChapter,
    content,
  };
}

/** Returns posts sharing at least one tag, scored by overlap, excluding self. */
export function getRelatedPosts(
  currentSlug: string,
  currentTags: string[],
  allPosts: BlogPost[],
  limit = 3,
): BlogPost[] {
  return allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => currentTags.includes(t)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}

/**
 * Returns the previous (older) and next (newer) posts.
 * allPosts must be sorted newest-first (default from getAllPosts).
 */
export function getAdjacentPosts(
  slug: string,
  allPosts: BlogPost[],
): { prev: BlogPost | null; next: BlogPost | null } {
  const idx = allPosts.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    next: idx > 0 ? allPosts[idx - 1] : null,          // newer
    prev: idx < allPosts.length - 1 ? allPosts[idx + 1] : null, // older
  };
}

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function extractHeadings(content: string): TocHeading[] {
  const lines = content.split("\n");
  const headings: TocHeading[] = [];

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)$/);
    const h3Match = line.match(/^###\s+(.+)$/);

    if (h3Match) {
      const text = h3Match[1].trim();
      headings.push({ id: slugify(text), text, level: 3 });
    } else if (h2Match) {
      const text = h2Match[1].trim();
      headings.push({ id: slugify(text), text, level: 2 });
    }
  }

  return headings;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export async function getCourseMetadata(
  courseName: string,
): Promise<CourseMetadata | null> {
  const metaPath = path.join(BLOG_PATH, "courses", courseName, "_meta.json");

  if (!fs.existsSync(metaPath)) {
    return null;
  }

  const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
  return meta;
}
