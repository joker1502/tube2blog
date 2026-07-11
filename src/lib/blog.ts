import fs from "node:fs";
import path from "node:path";

const contentDir = path.join(process.cwd(), "src/content/blog");

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
  readTime: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
  readTime: string;
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(contentDir)) return [];
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const post = getPost(slug);
      if (!post) return null;
      const { content: _, ...meta } = post;
      return meta;
    })
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function formatTag(tag: string): string {
  return tag
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getPost(slug: string): BlogPost | null {
  try {
    const filePath = path.join(contentDir, `${slug}.mdx`);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = parseFrontmatter(raw);
    const words = content.split(/\s+/).length;
    const readTime = Math.max(1, Math.round(words / 200));

    const tags = Array.isArray(data.tags)
      ? data.tags
      : data.tags
        ? [data.tags]
        : undefined;

    return {
      slug,
      title: (data.title as string) ?? slug,
      date: (data.date as string) ?? "",
      description: (data.description as string) ?? "",
      tags,
      content,
      readTime: `${readTime} min read`,
    } as BlogPost;
  } catch {
    return null;
  }
}

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {} as Record<string, string | string[]>, content: raw };
  const data: Record<string, string | string[]> = {};
  const lines = match[1].split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const listMatch = line.match(/^\s*-\s+(.+)$/);
    if (listMatch) {
      continue;
    }
    const sep = line.indexOf(":");
    if (sep === -1) continue;
    const key = line.slice(0, sep).trim();
    let value: string | string[] = line.slice(sep + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (value.startsWith("[")) {
      try { value = JSON.parse(value.replace(/'/g, '"')); } catch { /* keep as string */ }
    }
    if (value === "" || value === "[]") {
      const items: string[] = [];
      for (let j = i + 1; j < lines.length; j++) {
        const nextLine = lines[j].match(/^\s*-\s+(.+)$/);
        if (nextLine) {
          items.push(nextLine[1]);
        } else {
          break;
        }
      }
      if (items.length > 0) value = items;
    }
    data[key] = value;
  }
  return { data, content: match[2] };
}
