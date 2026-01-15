import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    category: "tips" | "courses";
    level?: "beginner" | "intermediate" | "advanced";
    tags?: string[];
    readingTime: string;
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
        const tipFiles = fs.readdirSync(tipsPath).filter(file => file.endsWith(".mdx"));
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
                const lessonFiles = fs.readdirSync(coursePath).filter(file => file.endsWith(".mdx"));
                for (const file of lessonFiles) {
                    const post = await getPostBySlug(`${course}/${file.replace(".mdx", "")}`, "courses");
                    if (post) posts.push(post);
                }
            }
        }
    }

    // Sort by date, newest first
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string, category?: "tips" | "courses"): Promise<BlogPost | null> {
    let filePath: string = "";
    let postCategory: "tips" | "courses" = "tips";

    if (category) {
        filePath = path.join(BLOG_PATH, category, `${slug}.mdx`);
        postCategory = category;
    } else {
        // Try tips first
        const tipsPath = path.join(BLOG_PATH, "tips", `${slug}.mdx`);
        if (fs.existsSync(tipsPath)) {
            filePath = tipsPath;
            postCategory = "tips";
        } else {
            // Try courses - convert slug format (course-name-lesson) to path (course-name/lesson)
            // Try to find the course by matching the beginning of the slug
            const coursesPath = path.join(BLOG_PATH, "courses");
            if (fs.existsSync(coursesPath)) {
                const courses = fs.readdirSync(coursesPath);
                for (const course of courses) {
                    const coursePath = path.join(coursesPath, course);
                    if (fs.statSync(coursePath).isDirectory() && slug.startsWith(course + "-")) {
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
            // Fallback to direct path in courses folder
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
        category: postCategory,
        level: data.level,
        tags: data.tags || [],
        readingTime: stats.text,
        course: data.course,
        courseChapter: data.courseChapter,
        content,
    };
}

export async function getCourseMetadata(courseName: string): Promise<CourseMetadata | null> {
    const metaPath = path.join(BLOG_PATH, "courses", courseName, "_meta.json");

    if (!fs.existsSync(metaPath)) {
        return null;
    }

    const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
    return meta;
}
