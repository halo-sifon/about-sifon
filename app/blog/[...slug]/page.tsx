import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { Post } from "@/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

// 动态设置页面的元数据
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const slug = (await params).slug.join("/");
  const post = getPostBySlug(slug);

  return {
    title: post?.title || "文章未找到",
    description: post?.description || "这是一篇精彩的文章",
  };
}

// 动态生成静态路径
export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map(post => ({
    slug: post.slug.split("/"), // 确保多级路径以数组形式传递
  }));
}

export default async function PostPage(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const slug = (await props.params).slug.join("/");
  const post: Partial<Post> | undefined = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .use(remarkGfm);

  const file = await processor.process(post.content);
  const contentHtml = file.toString();

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}
