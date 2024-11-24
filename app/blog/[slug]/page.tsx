import { getAllPosts, getPostBySlug } from "../../../lib/posts";
import { remark } from "remark";
import html from "remark-html";

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map(post => ({
    slug: post.slug,
  }));
}

interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
}

export default async function PostPage(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;
  const { slug } = params;
  const post: Partial<Post> | undefined = getPostBySlug(slug);

  if (!post) {
    return <p>Post not found</p>;
  }

  const processedContent = await remark().use(html).process(post.content);
  const contentHtml = processedContent.toString();

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}
