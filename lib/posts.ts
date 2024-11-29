import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/types";

const postsDirectory = path.join(process.cwd(), "posts");

// 递归获取指定目录及其子目录下的所有 .md 文件路径
function getAllMarkdownFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = entries.flatMap(entry => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? getAllMarkdownFiles(fullPath) : fullPath;
  });
  return files.filter(file => file.endsWith(".md"));
}

export function getAllPosts() {
  const markdownFiles = getAllMarkdownFiles(postsDirectory);

  return markdownFiles.map(filePath => {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug: path.relative(postsDirectory, filePath).replace(/\.md$/, ""),
      ...data, // 包括标题、日期、分类等元数据
    };
  });
}

// 根据 Slug 获取单篇文章
export function getPostBySlug(slug: string): Partial<Post> {
  const targetPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(targetPath)) {
    throw new Error(`Post with slug "${slug}" not found.`);
  }
  const fileContents = fs.readFileSync(targetPath, "utf8");
  const { data, content } = matter(fileContents);

  return { slug, ...data, content };
}
